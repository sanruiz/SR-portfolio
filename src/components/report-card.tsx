import { ArrowUpRight, BarChart3, Globe2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface ReportCardProps {
  name: string
  website: string
  report: string
  logo: string
}

export function ReportCard({ name, website, report, logo }: ReportCardProps) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-[0_8px_32px_-20px_rgba(24,24,27,0.3)] transition duration-300 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-[0_24px_56px_-28px_rgba(24,24,27,0.35)] dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700">
      <div className="h-1 w-full bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 opacity-80" />

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="mb-6 flex items-center justify-between">
          <span className="inline-flex items-center gap-2 rounded-full bg-zinc-100 px-3 py-1.5 text-xs font-medium tracking-wide text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Reporte disponible
          </span>
          <BarChart3 aria-hidden="true" className="h-5 w-5 text-zinc-400 transition-colors group-hover:text-orange-500" />
        </div>

        <div className="mb-7 flex min-h-36 items-center justify-center rounded-xl border border-zinc-200 bg-white px-6 py-7 shadow-sm dark:border-zinc-300 dark:bg-zinc-100">
          <Link
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visitar el sitio de ${name}`}
            className="flex h-full w-full items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-4"
          >
            <Image
              src={logo || "/placeholder.svg"}
              alt={`${name} logo`}
              width={220}
              height={90}
              className="max-h-16 w-auto max-w-full object-contain transition-transform duration-300 group-hover:scale-[1.03]"
            />
          </Link>
        </div>

        <h2 className="mb-1 text-xl font-semibold tracking-tight text-zinc-900 dark:text-white">{name}</h2>
        <p className="mb-7 text-sm text-zinc-500 dark:text-zinc-400">Consulta la información y los indicadores más recientes.</p>

        <div className="mt-auto grid grid-cols-2 gap-3">
          <Link
            href={report}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-zinc-900 px-3 text-sm font-medium text-white transition hover:bg-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            <BarChart3 aria-hidden="true" className="h-4 w-4" />
            Ver informe
            <ArrowUpRight aria-hidden="true" className="h-4 w-4 opacity-70" />
          </Link>
          <Link
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 text-sm font-medium text-zinc-700 transition hover:border-zinc-300 hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
          >
            <Globe2 aria-hidden="true" className="h-4 w-4" />
            Sitio web
          </Link>
        </div>
      </div>
    </article>
  )
}
