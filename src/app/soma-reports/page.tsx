import { ReportCard } from "@/components/report-card";



const shoppingCenters = [
  {
    name: "Plaza Satélite",
    website: "https://plazasatelite.com.mx/",
    report:
      "https://lookerstudio.google.com/u/0/reporting/a562c7cf-a8b7-4615-b493-0ea9343cc998/page/mNGaF",
    logo: "https://plazasatelite.com.mx/wp-content/uploads/2025/02/logo.svg",
  },
  {
    name: "Andamar",
    website: "https://andamar.com.mx/",
    report:
      "https://lookerstudio.google.com/reporting/c09d92ba-73f8-4cd8-9b95-71a09f054ed1",
    logo: "https://andamar.com.mx/wp-content/uploads/2025/02/Asset-1.svg",
  },
  {
    name: "Antea",
    website: "https://antea.mx/",
    report:
      "https://lookerstudio.google.com/reporting/16f4230c-e359-49ff-a033-45fa1496486d",
    logo: "https://antea.mx/wp-content/uploads/2025/02/anteaLogoAzulSecond.svg",
  },
  {
    name: "Angelopolis",
    website: "https://angelopolispuebla.com.mx/",
    report:
      "https://lookerstudio.google.com/u/0/reporting/138c60f3-69c3-44d9-98ee-e8b5ca21ded8/",
    logo: "https://angelopolispuebla.com.mx/wp-content/uploads/2025/02/logotipo-1.svg",
  },
  {
    name: "Anima Village",
    website: "https://www.animavillage.com/",
    report:
      "https://datastudio.google.com/reporting/80471f6d-1c9a-4ca0-bfcf-aade91bc7bc9/",
    logo: "http://wp.sanruiz.co/wp-content/uploads/2026/06/logo-anima.svg",
  },
  {
    name: "Antara",
    website: "https://antara.com.mx/",
    report: "https://datastudio.google.com/s/kUQU8GzGjxo",
    logo: "https://backend.antara.com.mx/wp-content/uploads/2026/11/Antara_Logo.svg",
  },
];

export default function SomaInformsPage() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-zinc-50 text-zinc-950 dark:bg-zinc-950 dark:text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[32rem] bg-[radial-gradient(ellipse_at_top,rgba(251,146,60,0.14),transparent_65%)]" />
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 md:py-20">
        <header className="mb-10 max-w-2xl md:mb-12">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-orange-600 dark:text-orange-400">SOMA · centros comerciales</p>
          <h1 className="mb-4 text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl md:text-6xl dark:text-white">
            Informes<span className="text-orange-500">.</span>
          </h1>
          <p className="max-w-xl text-base leading-7 text-zinc-600 sm:text-lg dark:text-zinc-400">
            Explora los indicadores y accede a la información de cada centro comercial desde un solo lugar.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
            <span className="font-semibold text-zinc-900 dark:text-zinc-100">{shoppingCenters.length}</span> centros disponibles
          </div>
        </header>

        <section aria-label="Informes por centro comercial" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {shoppingCenters.map((center) => (
              <ReportCard key={center.name} {...center} />
            ))}
        </section>
        </div>
    </main>
  );
}
