"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Activity,
  Users,
  FileText,
  DollarSign,
  MessageSquare,
  Bell,
  Search,
  Filter,
  Plus,
  TrendingUp,
  Calendar,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import { ResearchTrends } from "@/components/research-trends"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold font-heading">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, Dr. Johnson</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            New Project
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Navigation</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <nav className="space-y-1">
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/dashboard" className="flex items-center">
                  <Activity className="h-4 w-4 mr-2" />
                  Overview
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/dashboard/projects" className="flex items-center">
                  <FileText className="h-4 w-4 mr-2" />
                  My Projects
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/dashboard/funding" className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Funding
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/dashboard/collaborators" className="flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  Collaborators
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/dashboard/messages" className="flex items-center">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Messages
                </Link>
              </Button>
            </nav>
          </CardContent>
          <CardHeader>
            <CardTitle>Recent Collaborators</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={`/placeholder.svg?height=32&width=32`} />
                    <AvatarFallback>U{i}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">User Name {i}</p>
                    <p className="text-xs text-muted-foreground">Role / Institution</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="md:col-span-3 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Active Projects</p>
                    <p className="text-3xl font-bold">12</p>
                  </div>
                  <div className="p-2 bg-primary/10 rounded-full text-primary">
                    <FileText className="h-5 w-5" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-xs">
                  <TrendingUp className="h-3 w-3 mr-1 text-collab-secondary" />
                  <span className="text-collab-secondary font-medium">+3</span>
                  <span className="text-muted-foreground ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Collaborators</p>
                    <p className="text-3xl font-bold">28</p>
                  </div>
                  <div className="p-2 bg-secondary/10 rounded-full text-secondary">
                    <Users className="h-5 w-5" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-xs">
                  <TrendingUp className="h-3 w-3 mr-1 text-collab-secondary" />
                  <span className="text-collab-secondary font-medium">+5</span>
                  <span className="text-muted-foreground ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Funding Secured</p>
                    <p className="text-3xl font-bold">$125K</p>
                  </div>
                  <div className="p-2 bg-accent/10 rounded-full text-accent">
                    <DollarSign className="h-5 w-5" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-xs">
                  <TrendingUp className="h-3 w-3 mr-1 text-collab-secondary" />
                  <span className="text-collab-secondary font-medium">+$15K</span>
                  <span className="text-muted-foreground ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Messages</p>
                    <p className="text-3xl font-bold">8</p>
                  </div>
                  <div className="p-2 bg-primary/10 rounded-full text-primary">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-xs">
                  <span className="text-muted-foreground">3 unread messages</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Projects */}
          <Card>
            <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle>My Projects</CardTitle>
                <CardDescription>Manage your active research projects</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Search projects..." className="pl-8 w-[200px]" />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Status</DropdownMenuItem>
                    <DropdownMenuItem>Date</DropdownMenuItem>
                    <DropdownMenuItem>Category</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  New Project
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    title: "Quantum Computing Applications in Healthcare",
                    status: "In Progress",
                    progress: 65,
                    collaborators: 4,
                    deadline: "Oct 15, 2023",
                  },
                  {
                    title: "Blockchain for Secure Medical Records",
                    status: "Planning",
                    progress: 25,
                    collaborators: 3,
                    deadline: "Dec 1, 2023",
                  },
                  {
                    title: "AI-Driven Climate Change Predictions",
                    status: "Active",
                    progress: 80,
                    collaborators: 6,
                    deadline: "Sep 30, 2023",
                  },
                  {
                    title: "Renewable Energy Storage Solutions",
                    status: "Review",
                    progress: 90,
                    collaborators: 5,
                    deadline: "Aug 22, 2023",
                  },
                ].map((project, i) => (
                  <div
                    key={i}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/5 transition-colors"
                  >
                    <div className="space-y-1 mb-4 sm:mb-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{project.title}</h3>
                        <Badge
                          variant={
                            project.status === "In Progress"
                              ? "default"
                              : project.status === "Planning"
                                ? "outline"
                                : project.status === "Active"
                                  ? "secondary"
                                  : "default"
                          }
                        >
                          {project.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Users className="h-3.5 w-3.5 mr-1" />
                          {project.collaborators} collaborators
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-3.5 w-3.5 mr-1" />
                          Due {project.deadline}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-32">
                        <div className="flex justify-between text-xs mb-1">
                          <span>Progress</span>
                          <span>{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-2" />
                      </div>
                      <Button variant="ghost" size="sm" className="ml-auto">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-center border-t p-4">
              <Button variant="outline">View All Projects</Button>
            </CardFooter>
          </Card>

          {/* Research Trends */}
          <ResearchTrends />
        </div>
      </div>
    </div>
  )
}

