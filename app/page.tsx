'use client'

import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const router = useRouter()

  const openDashboard = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      router.push('/login')
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      <div className="mx-auto max-w-5xl px-6 py-28">

        {/* Header */}
        <header className="mb-20 flex items-center justify-between">
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Rohit
          </p>

          <a
            href="https://github.com/JediScout10"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition"
          >
            GitHub
          </a>
        </header>

        {/* Hero */}
        <section className="mb-28">
          <h1 className="mb-6 max-w-3xl text-5xl font-semibold tracking-tight leading-tight">
            Designing calm systems<br />
            that work in the real world.
          </h1>

          <p className="mb-10 max-w-2xl text-lg text-neutral-600 dark:text-neutral-300">
            I build focused, reliable software systems with clear intent —
            emphasizing real-world constraints, long-term usability,
            and minimal cognitive load.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#projects"
              className="rounded-xl bg-neutral-900 px-6 py-3 text-sm font-medium text-white
                         hover:bg-neutral-800 dark:bg-white dark:text-neutral-900
                         dark:hover:bg-neutral-200 transition"
            >
              View projects →
            </a>
          </div>
        </section>

        {/* Philosophy */}
        <section className="mb-28 max-w-2xl">
          <p className="text-neutral-700 leading-relaxed dark:text-neutral-300">
            I prefer building fewer things with intention.
            My focus is on systems that people can realistically maintain —
            software that stays useful after the demo ends.
          </p>
        </section>

        {/* Projects */}
        <section id="projects">
          <h2 className="mb-10 text-sm font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            Selected Projects
          </h2>

          <div className="grid gap-8 md:grid-cols-2">

            {/* Progress Tracker */}
            <div className="group rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm
                            transition hover:-translate-y-1 hover:shadow-md
                            dark:border-neutral-800 dark:bg-neutral-900">
              <h3 className="mb-3 text-xl font-semibold">
                Personal Progress Tracker
              </h3>

              <p className="mb-5 text-neutral-600 dark:text-neutral-300">
                A private daily discipline system built to enforce focus,
                reflection, and consistency during job preparation.
              </p>

              <ul className="mb-6 space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                <li>• Single-day focus with task completion</li>
                <li>• Reflection-first design</li>
                <li>• Streak-based consistency tracking</li>
                <li>• Supabase-authenticated private dashboard</li>
              </ul>

              <div className="flex gap-4 text-sm">
                <button
                  onClick={openDashboard}
                  className="font-medium underline-offset-4 hover:underline"
                >
                  Open dashboard →
                </button>

                <a
                  href="https://github.com/JediScout10"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-500 hover:underline"
                >
                  GitHub →
                </a>
              </div>
            </div>

            {/* Fraud Detection */}
            <div className="group rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm
                            transition hover:-translate-y-1 hover:shadow-md
                            dark:border-neutral-800 dark:bg-neutral-900">
              <h3 className="mb-3 text-xl font-semibold">
                Fraud Detection Payment System
              </h3>

              <p className="mb-5 text-neutral-600 dark:text-neutral-300">
                A real-time fraud detection platform built for Hackwins 2026,
                combining rule-based checks with ML-based risk scoring.
              </p>

              <ul className="mb-6 space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                <li>• IP & device fingerprint monitoring</li>
                <li>• Transaction anomaly detection</li>
                <li>• Real-time risk scoring</li>
                <li>• Fully deployed system</li>
              </ul>

              <div className="flex gap-4 text-sm">
                <a
                  href="https://exekillers-hackwins2026.onrender.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium underline-offset-4 hover:underline"
                >
                  Live demo →
                </a>

                <a
                  href="https://github.com/JediScout10"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-500 hover:underline"
                >
                  GitHub →
                </a>
              </div>
            </div>

            {/* CareConnect */}
            <div className="group rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm
                            transition hover:-translate-y-1 hover:shadow-md
                            dark:border-neutral-800 dark:bg-neutral-900">
              <h3 className="mb-3 text-xl font-semibold">
                CareConnect — Mental Health Analyzer
              </h3>

              <p className="mb-5 text-neutral-600 dark:text-neutral-300">
                A mental health analysis platform designed to help users
                understand emotional patterns through structured assessments.
              </p>

              <ul className="mb-6 space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                <li>• Mood & symptom tracking</li>
                <li>• Question-based analysis</li>
                <li>• Stress-relief & meditation tools</li>
                <li>• Therapist discovery support</li>
              </ul>

              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                Academic project — University of Mumbai (IT)
              </p>
            </div>

          </div>
        </section>

      </div>
    </main>
  )
}
