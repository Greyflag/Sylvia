"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getProjectContacts } from "@/lib/data-service"
import { useProject } from "@/components/project-context"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { CheckCircle, Download, MoreHorizontal, Plus, Upload, Zap } from "lucide-react"

export default function ContactsPage() {
  const params = useParams()
  const projectId = params.projectId as string
  const { currentProject } = useProject()
  const [activeTab, setActiveTab] = useState("all")

  // Get contacts for this project
  const contacts = getProjectContacts(projectId)

  // Check if this is the completed project
  const isCompleted = currentProject?.status === "completed"

  // Get unique tags from contacts
  const allTags = contacts.flatMap((contact) => contact.tags)
  const uniqueTags = [...new Set(allTags)]

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Contact List</h1>
          <p className="text-muted-foreground mt-1">Manage your survey recipients</p>
        </div>
        <div className="flex gap-2">
          {!isCompleted && (
            <>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-sylvia-600 hover:bg-sylvia-700">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Contact
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>Add New Contact</DialogTitle>
                    <DialogDescription>Add a new contact to your survey recipient list.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" placeholder="John Smith" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" placeholder="john@example.com" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="company">Company</Label>
                        <Input id="company" placeholder="Acme Inc." />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="role">Role</Label>
                        <Input id="role" placeholder="CTO" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" placeholder="+1 (555) 123-4567" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tags">Tags (comma separated)</Label>
                      <Input id="tags" placeholder="enterprise, tech, decision-maker" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" className="bg-sylvia-600 hover:bg-sylvia-700">
                      Add Contact
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Upload className="mr-2 h-4 w-4" />
                    Import CSV
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>Import Contacts from CSV</DialogTitle>
                    <DialogDescription>
                      Upload a CSV file containing your contacts. The file should include columns for name, email,
                      company, and role.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-6 py-4">
                    <div className="grid gap-2">
                      <div className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-8 bg-gray-50">
                        <div className="space-y-4 text-center">
                          <div className="flex justify-center">
                            <Upload className="h-10 w-10 text-gray-400" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Drag and drop your CSV file here</p>
                            <p className="text-xs text-muted-foreground mt-1">or click to browse files</p>
                          </div>
                          <Button variant="outline" size="sm">
                            Browse Files
                          </Button>
                          <input type="file" accept=".csv" className="hidden" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="mapping">Column Mapping</Label>
                        <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                          Auto-detect columns
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <Label htmlFor="name-column" className="text-xs">
                            Name Column
                          </Label>
                          <Input id="name-column" placeholder="e.g. full_name" />
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="email-column" className="text-xs">
                            Email Column
                          </Label>
                          <Input id="email-column" placeholder="e.g. email_address" />
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="company-column" className="text-xs">
                            Company Column
                          </Label>
                          <Input id="company-column" placeholder="e.g. company" />
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="role-column" className="text-xs">
                            Role Column
                          </Label>
                          <Input id="role-column" placeholder="e.g. job_title" />
                        </div>
                      </div>
                    </div>

                    <div className="bg-amber-50 border border-amber-200 rounded-md p-3">
                      <div className="flex gap-2">
                        <div className="mt-0.5">
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
                            className="text-amber-600"
                          >
                            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                            <line x1="12" y1="9" x2="12" y2="13"></line>
                            <line x1="12" y1="17" x2="12.01" y2="17"></line>
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-amber-800">CSV Format Requirements</h4>
                          <p className="text-xs text-amber-700 mt-1">
                            Your CSV file must include headers and contain at least name, email, and company columns.
                          </p>
                          <Button variant="link" size="sm" className="h-auto p-0 text-xs text-amber-700 mt-1">
                            Download sample template
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" type="button">
                      Cancel
                    </Button>
                    <Button type="submit" className="bg-sylvia-600 hover:bg-sylvia-700">
                      Import Contacts
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </>
          )}
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {isCompleted ? (
        <Card className="bg-white/50 border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-green-600 mb-2">
              <CheckCircle className="h-5 w-5" />
              <h2 className="text-lg font-medium">Contact List Complete</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              This contact list has been finalized and used in the survey. You can view the contacts below.
            </p>
            <div className="flex items-center gap-4">
              <div>
                <span className="text-sm text-muted-foreground">Total Contacts:</span>
                <span className="ml-1 font-medium">{contacts.length}</span>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Response Rate:</span>
                <span className="ml-1 font-medium">100%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-white/50 border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-amber-600 mb-2">
              <Zap className="h-5 w-5" />
              <h2 className="text-lg font-medium">Getting Started</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              Add contacts to your survey recipient list. You can add contacts individually or import them from a CSV
              file.
            </p>
            <div className="flex items-center gap-4">
              <div>
                <span className="text-sm text-muted-foreground">Total Contacts:</span>
                <span className="ml-1 font-medium">{contacts.length}</span>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Required Fields:</span>
                <span className="ml-1 font-medium">Name, Email, Company</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-between items-center">
        <Tabs defaultValue="all" className="w-full max-w-md" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="all">All Contacts</TabsTrigger>
            <TabsTrigger value="valid">Valid</TabsTrigger>
            <TabsTrigger value="invalid">Invalid</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="relative w-full max-w-sm">
          <Input placeholder="Search contacts..." className="pl-10" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">Name</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contacts.length > 0 ? (
                contacts.map((contact) => (
                  <TableRow key={contact.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-sylvia-100 text-sylvia-700">
                            {contact.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{contact.name}</div>
                          <div className="text-sm text-muted-foreground">{contact.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{contact.company}</TableCell>
                    <TableCell>{contact.role}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {contact.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="bg-white text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800 border-green-200">Valid</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          {!isCompleted && <DropdownMenuItem>Edit Contact</DropdownMenuItem>}
                          <DropdownMenuSeparator />
                          {!isCompleted && <DropdownMenuItem className="text-red-600">Remove</DropdownMenuItem>}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                    No contacts added yet. Click "Add Contact" or "Import CSV" to get started.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
