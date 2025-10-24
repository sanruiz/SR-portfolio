import Image from "next/image";
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
            {somaReports.map((center) => (
              <ReportCard key={center.name} {...center} />
            ))}
          </div>

          <hr className="my-12 border-t border-gray-300 dark:border-gray-700" />

          
        </div>
      </div>
    </div>
  );
}
