import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

interface ReportCardProps {
  name: string
  website: string
  report: string
  logo: string
}

export function ReportCard({ name, website, report, logo }: ReportCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow bg-gray-100 dark:bg-gray-900">
      <CardHeader className="space-y-4">
        <div className="flex items-center justify-center h-24 mb-2">
          <Link href={website} target="_blank" rel="noopener noreferrer">
            <Image
              src={logo || "/placeholder.svg"}
              alt={`${name} logo`}
              width={200}
              height={80}
              className="object-contain max-h-full"
            />
          </Link>
        </div>
        <CardTitle className="text-2xl text-center sr-only">{name}</CardTitle>
        <CardDescription className="text-center sr-only">Centro Comercial</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row gap-3 justify-center">
          <Button asChild variant="default">
            <Link href={website} target="_blank" rel="noopener noreferrer">
              Visitar Sitio Web →
            </Link>
          </Button>
          {report && (
            <Button asChild variant="outline" className="bg-transparent">
              <Link
                href={report}
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
          )}
        </div>
      </CardContent>
    </Card>
  )
}
