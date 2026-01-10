'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'

type Task = {
  id: string
  text: string
  completed: boolean
}

export default function DashboardPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [entryId, setEntryId] = useState<string | null>(null)
  const [tasks, setTasks] = useState<Task[]>([])
  const [reflection, setReflection] = useState('')
  const [completed, setCompleted] = useState(false)
  const [streak, setStreak] = useState(0)

  const today = new Date().toISOString().slice(0, 10)

  useEffect(() => {
    const init = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push('/login')
        return
      }

      // 1. Get or create today's entry
      let { data: entry } = await supabase
        .from('daily_entries')
        .select('*')
        .eq('user_id', user.id)
        .eq('date', today)
        .single()

      if (!entry) {
        const { data: newEntry } = await supabase
          .from('daily_entries')
          .insert({ user_id: user.id, date: today })
          .select()
          .single()

        entry = newEntry
      }

      setEntryId(entry.id)
      setReflection(entry.reflection || '')
      setCompleted(entry.completed)

      // 2. Load tasks
      const { data: taskData } = await supabase
        .from('tasks')
        .select('*')
        .eq('daily_entry_id', entry.id)

      setTasks(taskData || [])

      // 3. Compute streak
      const { data: streakData } = await supabase
        .from('daily_entries')
        .select('date, completed')
        .eq('user_id', user.id)
        .order('date', { ascending: false })

      let count = 0
      for (const d of streakData || []) {
        if (d.completed) count++
        else break
      }

      setStreak(count)
      setLoading(false)
    }

    init()
  }, [router, today])

  const addTask = async () => {
    if (!entryId || tasks.length >= 3) return

    const { data } = await supabase
      .from('tasks')
      .insert({ daily_entry_id: entryId, text: '', completed: false })
      .select()
      .single()

    if (data) setTasks([...tasks, data])
  }

  const updateTask = async (id: string, updates: Partial<Task>) => {
    await supabase.from('tasks').update(updates).eq('id', id)
    setTasks(tasks.map(t => (t.id === id ? { ...t, ...updates } : t)))
  }

  const finishDay = async () => {
    await supabase
      .from('daily_entries')
      .update({ reflection, completed: true })
      .eq('id', entryId)

    setCompleted(true)
  }

  if (loading) return <p>Loading...</p>

  return (
    <main>
      <p>{today}</p>

      <h2>North Star</h2>
      <p>[Goal will appear here]</p>

      <h2>Today’s Focus</h2>
      {tasks.map(task => (
        <div key={task.id}>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={e =>
              updateTask(task.id, { completed: e.target.checked })
            }
          />
          <input
            value={task.text}
            onChange={e => updateTask(task.id, { text: e.target.value })}
          />
        </div>
      ))}
      {tasks.length < 3 && <button onClick={addTask}>Add task</button>}

      <h2>Reflection</h2>
      <textarea
        value={reflection}
        onChange={e => setReflection(e.target.value)}
      />

      <p>Current streak: {streak} days</p>

      {!completed && <button onClick={finishDay}>Finish Today</button>}
      {completed && <p>Day completed</p>}
    </main>
  )
}
