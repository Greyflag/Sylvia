import { ProgressTracker } from "@/components/progress-tracker"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Download, Upload, Users, Zap } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export default function ContactsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-4">
            <div className="bg-sylvia-600 text-white w-10 h-10 rounded-lg flex items-center justify-center">
              <Zap className="h-5 w-5" />
            </div>
            Contact List Management
          </h1>
          <p className="text-muted-foreground mt-2">Upload and manage your contact lists for survey distribution.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Export Contacts</Button>
          <Button asChild className="bg-sylvia-600 hover:bg-sylvia-700">
            <Link href="/outreach-material">
              Continue
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      <ProgressTracker />

      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5 text-sylvia-600" />
            Upload Contacts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-white/50 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <div className="mx-auto bg-sylvia-100 text-sylvia-600 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <Upload className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-medium mb-2">Drag and drop your contact file</h3>
            <p className="text-muted-foreground mb-4 max-w-md mx-auto">
              Upload a CSV or Excel file containing your contacts. You can also click the button below to browse your
              files.
            </p>
            <Button className="bg-sylvia-600 hover:bg-sylvia-700">
              <Upload className="mr-2 h-4 w-4" />
              Browse Files
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              Or{" "}
              <a href="#" className="text-sylvia-600 hover:underline">
                download our template
              </a>{" "}
              to get started
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-sylvia-600" />
            Contact List
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-hidden bg-white/80">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40px]">
                    <input type="checkbox" className="rounded border-gray-300" />
                  </TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <input type="checkbox" className="rounded border-gray-300" />
                  </TableCell>
                  <TableCell className="font-medium">John Smith</TableCell>
                  <TableCell>john.smith@example.com</TableCell>
                  <TableCell>Acme Inc.</TableCell>
                  <TableCell>CTO</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Valid
                    </Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <input type="checkbox" className="rounded border-gray-300" />
                  </TableCell>
                  <TableCell className="font-medium">Sarah Johnson</TableCell>
                  <TableCell>sarah.j@company.co</TableCell>
                  <TableCell>XYZ Corp</TableCell>
                  <TableCell>Director</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Valid
                    </Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <input type="checkbox" className="rounded border-gray-300" />
                  </TableCell>
                  <TableCell className="font-medium">Michael Brown</TableCell>
                  <TableCell>m.brown@tech.io</TableCell>
                  <TableCell>Tech Solutions</TableCell>
                  <TableCell>Manager</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                      Pending
                    </Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <input type="checkbox" className="rounded border-gray-300" />
                  </TableCell>
                  <TableCell className="font-medium">Emily Davis</TableCell>
                  <TableCell>emily@invalid</TableCell>
                  <TableCell>Global Services</TableCell>
                  <TableCell>VP</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                      Invalid Email
                    </Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <input type="checkbox" className="rounded border-gray-300" />
                  </TableCell>
                  <TableCell className="font-medium">Robert Wilson</TableCell>
                  <TableCell>rwilson@enterprise.com</TableCell>
                  <TableCell>Enterprise Inc.</TableCell>
                  <TableCell>CEO</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Valid
                    </Badge>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-muted-foreground">Showing 5 of 5 contacts</div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button size="sm" className="bg-sylvia-600 hover:bg-sylvia-700">
                Add Contact
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" asChild>
          <Link href="/question-set">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Question Set
          </Link>
        </Button>
        <Button asChild className="bg-sylvia-600 hover:bg-sylvia-700">
          <Link href="/outreach-material">
            Continue to Outreach Material
            <ChevronRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
