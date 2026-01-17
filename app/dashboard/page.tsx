'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'

/* ================== CONSTANTS ================== */
const START_YEAR = 2026
const END_YEAR = new Date().getFullYear()

const monthNames = [
  'Jan','Feb','Mar','Apr','May','Jun',
  'Jul','Aug','Sep','Oct','Nov','Dec'
]

const dayNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']

/* ================== DATE HELPERS (LOCAL SAFE) ================== */

const DAY_MS = 24 * 60 * 60 * 1000

const startOfDay = (d: Date) =>
  new Date(d.getFullYear(), d.getMonth(), d.getDate())

const formatLocalDate = (d: Date) => {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

/* ================== HEATMAP CALENDAR LOGIC ================== */

type HeatmapCell = {
  date: string | null
  count: number
  month: number | null
}

const getCalendarStart = (year: number) => {
  const jan1 = new Date(year, 0, 1)
  const d = startOfDay(jan1)
  d.setDate(d.getDate() - d.getDay()) // Sunday on/before Jan 1
  return d
}

const getCalendarEnd = (year: number) => {
  const dec31 = new Date(year, 11, 31)
  const d = startOfDay(dec31)
  d.setDate(d.getDate() + (6 - d.getDay())) // Saturday on/after Dec 31
  return d
}

const buildHeatmapWeeks = (
  year: number,
  data: { date: string; count: number }[]
) => {
  const map = new Map(data.map(d => [d.date, d.count]))

  const yearStart = new Date(year, 0, 1)
  const yearEnd = new Date(year, 11, 31)

  const calendarStart = getCalendarStart(year)
  const calendarEnd = getCalendarEnd(year)

  const cells: HeatmapCell[] = []

  for (
    let t = calendarStart.getTime();
    t <= calendarEnd.getTime();
    t += DAY_MS
  ) {
    const d = new Date(t)

    if (d < yearStart || d > yearEnd) {
      cells.push({ date: null, count: 0, month: null })
    } else {
      const iso = formatLocalDate(d)
      cells.push({
        date: iso,
        count: map.get(iso) ?? 0,
        month: d.getMonth(),
      })
    }
  }

  const weeks: HeatmapCell[][] = []
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7))
  }

  return weeks
}

/* ================== COLORS ================== */

const getHeatColor = (count: number) => {
  if (count >= 5) return 'bg-green-700'
  if (count >= 3) return 'bg-green-600'
  if (count >= 1) return 'bg-green-500'
  return 'bg-neutral-800'
}

/* ================== TYPES ================== */

type Task = {
  id: string
  text: string
  completed: boolean
}

/* ================== PAGE ================== */

export default function DashboardPage() {
  const router = useRouter()

  const [loading, setLoading] = useState(true)
  const [entryId, setEntryId] = useState<string | null>(null)
  const [tasks, setTasks] = useState<Task[]>([])
  const [reflection, setReflection] = useState('')
  const [completed, setCompleted] = useState(false)
  const [streak, setStreak] = useState(0)

  const [year, setYear] = useState(new Date().getFullYear())
  const [heatmapData, setHeatmapData] = useState<{ date: string; count: number }[]>([])

  const todayISO = formatLocalDate(new Date())

  /* ================== LOAD DATA ================== */

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
        return
      }

      const userId = user.id

      /* ---- TODAY ENTRY ---- */

      let { data: entry } = await supabase
        .from('daily_entries')
        .select('*')
        .eq('user_id', userId)
        .eq('date', todayISO)
        .single()

      if (!entry) {
        const { data: newEntry } = await supabase
          .from('daily_entries')
          .insert({ user_id: userId, date: todayISO })
          .select()
          .single()
        entry = newEntry
      }

      setEntryId(entry.id)
      setReflection(entry.reflection || '')
      setCompleted(entry.completed)

      const { data: taskData } = await supabase
        .from('tasks')
        .select('*')
        .eq('daily_entry_id', entry.id)

      setTasks(taskData || [])

      /* ---- STREAK ---- */

      const { data: streakData } = await supabase
        .from('daily_entries')
        .select('date, completed')
        .eq('user_id', userId)
        .order('date', { ascending: false })

      let count = 0
      let expected = startOfDay(new Date())

      for (const e of streakData || []) {
        const d = startOfDay(new Date(e.date))
        if (e.completed && d.getTime() === expected.getTime()) {
          count++
          expected.setDate(expected.getDate() - 1)
        } else break
      }

      setStreak(count)

      /* ---- HEATMAP DATA ---- */

      const { data: entries } = await supabase
        .from('daily_entries')
        .select('id, date')
        .eq('user_id', userId)
        .gte('date', `${year}-01-01`)
        .lte('date', `${year}-12-31`)

      const { data: allTasks } = await supabase
        .from('tasks')
        .select('daily_entry_id, completed')

      const heatmap = (entries ?? []).map(e => ({
        date: e.date,
        count:
          allTasks?.filter(
            t => t.daily_entry_id === e.id && t.completed
          ).length ?? 0,
      }))

      setHeatmapData(heatmap)
      setLoading(false)
    }

    init()
  }, [router, year, todayISO])

  /* ================== ACTIONS ================== */

  const addTask = async () => {
    if (!entryId) return
    const { data } = await supabase
      .from('tasks')
      .insert({ daily_entry_id: entryId, text: '', completed: false })
      .select()
      .single()

    if (data) setTasks([...tasks, data])
  }

  const updateTask = async (id: string, updates: Partial<Task>) => {
    await supabase.from('tasks').update(updates).eq('id', id)
    setTasks(tasks.map(t => t.id === id ? { ...t, ...updates } : t))
  }

  const deleteTask = async (id: string) => {
    await supabase.from('tasks').delete().eq('id', id)
    setTasks(tasks.filter(t => t.id !== id))
  }

  const finishDay = async () => {
    await supabase
      .from('daily_entries')
      .update({ reflection, completed: true })
      .eq('id', entryId)

    setCompleted(true)
  }

  if (loading) return <p className="p-6">Loading...</p>

  /* ================== HEATMAP PREP ================== */

  const weeks = buildHeatmapWeeks(year, heatmapData)

  /* ================== RENDER ================== */

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100">
      <div className="mx-auto max-w-xl px-6 py-16 space-y-12">

        <p className="text-sm text-neutral-400">{todayISO}</p>

        <section>
          <p className="text-xs uppercase text-neutral-500">North Star</p>
          <p className="text-lg">
            Get a stable job and become a better version of myself
          </p>
        </section>

        <section>
          <p className="text-xs uppercase text-neutral-500">Today’s Focus</p>

          <div className="space-y-3">
            {tasks.map(task => (
              <div key={task.id} className="flex gap-3 bg-neutral-900 px-3 py-2 rounded">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={e =>
                    updateTask(task.id, { completed: e.target.checked })
                  }
                />
                <input
                  className="w-full bg-transparent outline-none"
                  value={task.text}
                  onChange={e =>
                    updateTask(task.id, { text: e.target.value })
                  }
                />
                <button onClick={() => deleteTask(task.id)}>✕</button>
              </div>
            ))}
          </div>

          <button onClick={addTask} className="text-sm text-neutral-400 mt-2">
            + Add task
          </button>
        </section>

        <section>
          <p className="text-xs uppercase text-neutral-500">Reflection</p>
          <textarea
            className="w-full bg-neutral-900 p-3 rounded"
            rows={4}
            value={reflection}
            onChange={e => setReflection(e.target.value)}
          />
        </section>

        {/* ================== HEATMAP ================== */}

        <section>
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs uppercase text-neutral-500">
              Consistency ({year})
            </p>

            <select
  value={year}
  onChange={e => setYear(Number(e.target.value))}
  className="bg-neutral-900 text-sm px-2 py-1 rounded"
>
  {Array.from({ length: END_YEAR - START_YEAR + 1 }, (_, i) => {
    const y = END_YEAR - i
    return (
      <option key={y} value={y}>
        {y}
      </option>
    )
  })}
</select>

          </div>

          <div className="flex">
           <div className="flex flex-col mr-3 text-xs text-neutral-500">
  {/* spacer for month labels row */}
  <div className="h-4 mb-2" />

  {dayNames.map((d, i) => (
    <div
      key={d}
      className={`h-4 ${i !== dayNames.length - 1 ? 'mb-2' : ''}`}
    >
      {d[0]}
    </div>
  ))}
</div>


            <div className="overflow-x-auto">
              <div className="inline-block">

                <div className="flex mb-2 text-xs text-neutral-500">
                  {weeks.map((week, i) => {
                    const first = week.find(c => c?.date)
                    const prev = weeks[i - 1]?.find(c => c?.date)
                    const show =
                      first && (!prev || first.month !== prev.month)

                    return (
                      <div key={i} className="w-4 mr-2">
                        {show ? monthNames[first!.month!] : ''}
                      </div>
                    )
                  })}
                </div>

                <div className="flex">
                  {weeks.map((week, wi) => (
                    <div key={wi} className="flex flex-col mr-2">
                      {week.map((cell, di) => (
                        <div
                          key={di}
                          title={cell?.date ? `${cell.date}: ${cell.count}` : ''}
                          className={`h-4 w-4 mb-2 rounded ${
                            cell?.date
                              ? getHeatColor(cell.count)
                              : 'bg-neutral-900'
                          }`}
                        />
                      ))}
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </div>

          <p className="mt-2 text-xs text-neutral-500">
            Darker = more tasks completed
          </p>
        </section>

        <p className="text-sm text-neutral-400">
          Current streak: {streak} days
        </p>

        {!completed && (
          <button
            onClick={finishDay}
            className="w-full bg-neutral-100 text-neutral-900 py-3 rounded"
          >
            Finish Today
          </button>
        )}
      </div>
    </main>
  )
}
