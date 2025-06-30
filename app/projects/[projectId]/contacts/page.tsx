"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getProjectContacts, createContact, updateContact, deleteContact } from "@/lib/data-service"
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
import { CheckCircle, Download, MoreHorizontal, Plus, Upload, Zap, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"

export default function ContactsPage() {
  const params = useParams()
  const projectId = params.projectId as string
  const { currentProject, setCurrentProject, allProjects } = useProject()
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedContact, setSelectedContact] = useState<any>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    phone: "",
    tags: ""
  })
  const { toast } = useToast()
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [viewContact, setViewContact] = useState<any>(null)

  useEffect(() => {
    // Set current project based on projectId
    const project = allProjects.find(p => p.id === projectId)
    if (project) {
      setCurrentProject(project)
    }
  }, [projectId, allProjects, setCurrentProject])

  // Get contacts for this project
  const contacts = getProjectContacts(projectId)

  // Check if this is the completed project
  const isCompleted = currentProject?.status === "completed"

  // Get unique tags from contacts
  const allTags = contacts.flatMap((contact) => contact.tags)
  const uniqueTags = [...new Set(allTags)]

  // Filter contacts based on search query
  const filteredContacts = contacts.filter((contact) => {
    const searchLower = searchQuery.toLowerCase()
    return (
      contact.name.toLowerCase().includes(searchLower) ||
      contact.email.toLowerCase().includes(searchLower) ||
      contact.company.toLowerCase().includes(searchLower) ||
      contact.role.toLowerCase().includes(searchLower)
    )
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddContact = () => {
    try {
      createContact(projectId, formData)
      setIsAddDialogOpen(false)
      setFormData({
        name: "",
        email: "",
        company: "",
        role: "",
        phone: "",
        tags: ""
      })
      toast({
        title: "Contact added",
        description: "The contact has been added successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add contact. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleEditContact = () => {
    if (!selectedContact) return
    try {
      updateContact(projectId, selectedContact.id, formData)
      setIsEditDialogOpen(false)
      setSelectedContact(null)
      setFormData({
        name: "",
        email: "",
        company: "",
        role: "",
        phone: "",
        tags: ""
      })
      toast({
        title: "Contact updated",
        description: "The contact has been updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update contact. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleDeleteContact = (contactId: string) => {
    try {
      deleteContact(projectId, contactId)
      toast({
        title: "Contact deleted",
        description: "The contact has been deleted successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete contact. Please try again.",
        variant: "destructive",
      })
    }
  }

  const openEditDialog = (contact: any) => {
    setSelectedContact(contact)
    setFormData({
      name: contact.name,
      email: contact.email,
      company: contact.company,
      role: contact.role,
      phone: contact.phone || "",
      tags: contact.tags.join(", ")
    })
    setIsEditDialogOpen(true)
  }

  const openViewDialog = (contact: any) => {
    setViewContact(contact)
    setIsViewDialogOpen(true)
  }

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
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
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
                        <Input id="name" name="name" value={formData.name} onChange={handleInputChange} placeholder="John Smith" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="john@example.com" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="company">Company</Label>
                        <Input id="company" name="company" value={formData.company} onChange={handleInputChange} placeholder="Acme Inc." />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="role">Role</Label>
                        <Input id="role" name="role" value={formData.role} onChange={handleInputChange} placeholder="CTO" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="+1 (555) 123-4567" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tags">Tags (comma separated)</Label>
                      <Input id="tags" name="tags" value={formData.tags} onChange={handleInputChange} placeholder="enterprise, tech, decision-maker" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" className="bg-sylvia-600 hover:bg-sylvia-700" onClick={handleAddContact}>
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
              <Button variant="outline">Save Draft</Button>
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
            <TabsTrigger value="invalid">Invalid</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="relative w-full max-w-sm">
          <Input 
            placeholder="Search contacts..." 
            className="pl-10" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
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
              {filteredContacts.length > 0 ? (
                filteredContacts.map((contact) => (
                  <TableRow key={contact.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-sylvia-100 text-sylvia-700">
                            {contact.name
                              ? contact.name
                              .split(" ")
                              .map((n) => n[0])
                                  .join("")
                              : "U"}
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
                          <DropdownMenuItem onClick={() => openViewDialog(contact)}>
                            View Details
                          </DropdownMenuItem>
                          {!isCompleted && (
                            <DropdownMenuItem onClick={() => openEditDialog(contact)}>
                              Edit Contact
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          {!isCompleted && (
                            <DropdownMenuItem 
                              className="text-red-600"
                              onClick={() => handleDeleteContact(contact.id)}
                            >
                              Remove
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                    No contacts found. {searchQuery ? "Try adjusting your search." : "Click 'Add Contact' or 'Import CSV' to get started."}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Contact</DialogTitle>
            <DialogDescription>Update the contact's information.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Full Name</Label>
                <Input id="edit-name" name="name" value={formData.name} onChange={handleInputChange} placeholder="John Smith" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-email">Email Address</Label>
                <Input id="edit-email" name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="john@example.com" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-company">Company</Label>
                <Input id="edit-company" name="company" value={formData.company} onChange={handleInputChange} placeholder="Acme Inc." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-role">Role</Label>
                <Input id="edit-role" name="role" value={formData.role} onChange={handleInputChange} placeholder="CTO" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-phone">Phone Number</Label>
              <Input id="edit-phone" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="+1 (555) 123-4567" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-tags">Tags (comma separated)</Label>
              <Input id="edit-tags" name="tags" value={formData.tags} onChange={handleInputChange} placeholder="enterprise, tech, decision-maker" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="bg-sylvia-600 hover:bg-sylvia-700" onClick={handleEditContact}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Contact Details</DialogTitle>
            <DialogDescription>View detailed information about the contact.</DialogDescription>
          </DialogHeader>
          {viewContact && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="bg-sylvia-100 text-sylvia-700 text-xl">
                    {viewContact.name
                      ? viewContact.name
                      .split(" ")
                      .map((n) => n[0])
                          .join("")
                      : "U"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold">{viewContact.name}</h3>
                  <p className="text-muted-foreground">{viewContact.role} at {viewContact.company}</p>
                </div>
              </div>

              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Email Address</Label>
                  <div className="text-sm">{viewContact.email}</div>
                </div>

                <div className="space-y-2">
                  <Label className="text-muted-foreground">Phone Number</Label>
                  <div className="text-sm">{viewContact.phone || "Not provided"}</div>
                </div>

                <div className="space-y-2">
                  <Label className="text-muted-foreground">Company</Label>
                  <div className="text-sm">{viewContact.company}</div>
                </div>

                <div className="space-y-2">
                  <Label className="text-muted-foreground">Role</Label>
                  <div className="text-sm">{viewContact.role}</div>
                </div>

                <div className="space-y-2">
                  <Label className="text-muted-foreground">Tags</Label>
                  <div className="flex flex-wrap gap-1">
                    {viewContact.tags.map((tag: string, index: number) => (
                      <Badge key={index} variant="outline" className="bg-white text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-muted-foreground">Status</Label>
                  <Badge className="bg-green-100 text-green-800 border-green-200">
                    Valid
                  </Badge>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            {!isCompleted && (
              <Button 
                variant="outline" 
                onClick={() => {
                  setIsViewDialogOpen(false)
                  openEditDialog(viewContact)
                }}
              >
                Edit Contact
              </Button>
            )}
            <Button onClick={() => setIsViewDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
