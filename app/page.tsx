'use client'

import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import { motion } from "framer-motion"

export default function HomePage() {
  const router = useRouter()

  const openDashboard = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (user) router.push('/dashboard')
    else router.push('/login')
  }

  return (
    <main className="relative min-h-screen bg-neutral-50 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">

      {/* Global Background Depth */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-300px] left-1/2 h-[700px] w-[900px] -translate-x-1/2 rounded-full 
                        bg-gradient-to-r from-indigo-500/10 via-sky-500/10 to-transparent blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-8 py-32">

        {/* Header */}
        <header className="mb-24 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Rohit Sanju Patil
            </h2>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              Software Engineer
            </p>
          </div>

          <div className="flex items-center gap-6 text-sm">
            <a href="https://github.com/JediScout10" target="_blank" className="hover:underline">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/rohit-patil-3b5579321" target="_blank" className="hover:underline">
              LinkedIn
            </a>
          </div>
        </header>

        {/* Hero */}
        <section className="mb-32">
          <h1 className="mb-6 max-w-4xl text-6xl font-semibold tracking-tight leading-tight">
            Building secure, scalable<br />
            software systems.
          </h1>

          <p className="mb-10 max-w-2xl text-lg text-neutral-600 dark:text-neutral-300">
            I build secure backend systems and full-stack applications
            designed for long-term maintainability and real-world constraints.
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

            <a
              href="/resume.pdf"
              className="rounded-xl border border-neutral-300 px-6 py-3 text-sm font-medium
                         hover:bg-neutral-100 dark:border-neutral-700
                         dark:hover:bg-neutral-800 transition"
            >
              Download resume
            </a>
          </div>
        </section>

        {/* Divider */}
        <div className="mb-20 h-px w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

        {/* Projects */}
        <section id="projects">
          <h2 className="mb-14 text-2xl font-semibold tracking-tight">
            Selected Work
          </h2>

          <div className="grid gap-10 md:grid-cols-2">

            {/* Progress Tracker */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="group rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm
                         transition hover:-translate-y-1 hover:shadow-xl
                         dark:border-neutral-800 dark:bg-neutral-900"
            >
              <div className="mb-6 overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800">
                <img
                  src="/progress-tracker.png"
                  alt="Progress Tracker"
                  className="w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>

              <h3 className="mb-3 text-xl font-semibold">
                Personal Progress Tracker
              </h3>

              <p className="mb-6 text-neutral-600 dark:text-neutral-300">
                Serverless full-stack discipline system built with Next.js and Supabase,
                focused on daily execution and secure data isolation.
              </p>

              <div className="flex gap-6 text-sm">
                <button onClick={openDashboard} className="font-medium hover:underline">
                  Open →
                </button>
                <a href="https://github.com/JediScout10" target="_blank" className="text-neutral-500 hover:underline">
                  GitHub →
                </a>
              </div>
            </motion.div>

            {/* Fraud Detection */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="group rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm
                         transition hover:-translate-y-1 hover:shadow-xl
                         dark:border-neutral-800 dark:bg-neutral-900"
            >
              <div className="mb-6 overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800">
                <img
                  src="/fraud-system.png"
                  alt="Fraud Detection"
                  className="w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>

              <h3 className="mb-3 text-xl font-semibold">
                Real-Time Fraud Detection System
              </h3>

              <p className="mb-6 text-neutral-600 dark:text-neutral-300">
                ML-powered fraud detection backend with behavioral risk analysis,
                IP tracking, and secure transaction validation.
              </p>

              <div className="flex gap-6 text-sm">
                <a href="https://exekillers-hackwins2026.onrender.com/" target="_blank" className="font-medium hover:underline">
                  Live →
                </a>
                <a href="https://github.com/JediScout10" target="_blank" className="text-neutral-500 hover:underline">
                  GitHub →
                </a>
              </div>
            </motion.div>

            {/* CareConnect */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="group rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm
                         transition hover:-translate-y-1 hover:shadow-xl
                         dark:border-neutral-800 dark:bg-neutral-900"
            >
              <div className="mb-6 overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800">
                <img
                  src="/careconnect.png"
                  alt="CareConnect"
                  className="w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>

              <h3 className="mb-3 text-xl font-semibold">
                CareConnect
              </h3>

              <p className="mb-6 text-neutral-600 dark:text-neutral-300">
                Django-based mental health platform integrating structured assessments
                and AI-powered analysis tools.
              </p>
            </motion.div>

          </div>
        </section>

        {/* Footer */}
        <section className="mt-32 text-center">
          <p className="text-lg font-medium">
            Let’s build something meaningful.
          </p>

          <div className="mt-6 flex justify-center gap-6 text-sm">
            <a href="mailto:rohitsanjupatil.rsp10@gmail.com" className="hover:underline">
              Email
            </a>
            <a href="https://github.com/JediScout10" target="_blank" className="hover:underline">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/rohit-patil-3b5579321" target="_blank" className="hover:underline">
              LinkedIn
            </a>
          </div>
        </section>

      </div>
    </main>
  )
}
