import { ReportCard } from "@/components/report-card";

const somaReports = [
  {
    name: "SOMA",
    website: "https://soma.group/",
    report: "https://lookerstudio.google.com/s/oRNLjdWFn8U",
    logo: "https://soma.group/wp-content/uploads/2020/10/soma_black.svg",
  },
  {
    name: "Fibra SOMA",
    website: "https://fibrasoma.group/",
    report:
      "https://lookerstudio.google.com/reporting/b1baa229-a8df-4c47-9e00-b55c28153a35",
    logo: "https://fibrasoma.group/wp-content/uploads/2020/11/FIBRASOMA_logo.svg",
  },
];


export default function SomaInformsPage() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-zinc-50 text-zinc-950 dark:bg-zinc-950 dark:text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[32rem] bg-[radial-gradient(ellipse_at_top,rgba(251,146,60,0.14),transparent_65%)]" />
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 md:py-20">
        <header className="mb-10 max-w-2xl md:mb-12">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-orange-600 dark:text-orange-400">SOMA · reportes corporativos</p>
          <h1 className="mb-4 text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl md:text-6xl dark:text-white">
            Informes<span className="text-orange-500">.</span>
          </h1>
          <p className="max-w-xl text-base leading-7 text-zinc-600 sm:text-lg dark:text-zinc-400">
            Consulta los reportes corporativos de SOMA y Fibra SOMA en un solo lugar.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
            <span className="font-semibold text-zinc-900 dark:text-zinc-100">{somaReports.length}</span> reportes disponibles
          </div>
        </header>

        <section aria-label="Reportes corporativos" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {somaReports.map((center) => (
              <ReportCard key={center.name} {...center} />
            ))}
        </section>
      </div>
    </main>
  );
}
