import Image from "next/image";
import { ReportCard } from "@/components/report-card";



const shoppingCenters = [
  {
    name: "Plaza Satélite",
    website: "https://plazasatelite.com.mx/",
    report:
      "https://lookerstudio.google.com/u/0/reporting/138c60f3-69c3-44d9-98ee-e8b5ca21ded8/page/mNGaF",
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
];

export default function SomaInformsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <div className="flex justify-start mb-6">
              <Image
                src="https://soma.group/wp-content/uploads/2020/10/soma_black.svg"
                alt="SOMA logo"
                width={180}
                height={60}
                className="h-12 w-auto"
                priority
              />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
              Informes
            </h1>
            <p className="text-lg text-muted-foreground text-pretty">
              Accede a los informes y sitios web de nuestros centros comerciales
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {shoppingCenters.map((center) => (
              <ReportCard key={center.name} {...center} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
