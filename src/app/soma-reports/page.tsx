import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

const shoppingCenters = [
  {
    name: "Plaza Satélite",
    website: "https://plazasatelite.com.mx/",
    report: "https://lookerstudio.google.com/u/0/reporting/138c60f3-69c3-44d9-98ee-e8b5ca21ded8/page/mNGaF",
    logo: "https://plazasatelite.com.mx/wp-content/uploads/2025/02/logo.svg",
  },
  {
    name: "Andamar",
    website: "https://andamar.com.mx/",
    report: "https://lookerstudio.google.com/reporting/c09d92ba-73f8-4cd8-9b95-71a09f054ed1",
    logo: "https://andamar.com.mx/wp-content/uploads/2025/02/Asset-1.svg",
  },
  {
    name: "Antea",
    website: "https://antea.mx/",
    report: "https://lookerstudio.google.com/reporting/16f4230c-e359-49ff-a033-45fa1496486d",
    logo: "https://antea.mx/wp-content/uploads/2025/02/anteaLogoAzulSecond.svg",
  },
]

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
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">Informes</h1>
            <p className="text-lg text-muted-foreground text-pretty">
              Accede a los informes y sitios web de nuestros centros comerciales
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {shoppingCenters.map((center) => (
              <Card
                key={center.name}
                className="overflow-hidden hover:shadow-lg transition-shadow bg-gray-100 dark:bg-gray-900"
              >
                <CardHeader className="space-y-4">
                  <div className="flex items-center justify-center h-24 mb-2">
                    <Link href={center.website} target="_blank" rel="noopener noreferrer">
                      <Image
                        src={center.logo || "/placeholder.svg"}
                        alt={`${center.name} logo`}
                        width={200}
                        height={80}
                        className="object-contain max-h-full"
                      />
                    </Link>
                  </div>
                  <CardTitle className="text-2xl text-center sr-only">{center.name}</CardTitle>
                  <CardDescription className="text-center sr-only">Centro Comercial</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-row gap-3 justify-center">
                    <Button asChild variant="default">
                      <Link href={center.website} target="_blank" rel="noopener noreferrer">
                        Visitar Sitio Web →
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="bg-transparent">
                      <Link
                        href={center.report}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="18" y1="20" x2="18" y2="10" />
                          <line x1="12" y1="20" x2="12" y2="4" />
                          <line x1="6" y1="20" x2="6" y2="14" />
                        </svg>
                        Ver Informe
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
