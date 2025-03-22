"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Search,
  Filter,
  Users,
  Globe,
  BookOpen,
  Beaker,
  Zap,
  Leaf,
  Database,
  Cpu,
  Heart,
  Rocket,
  ChevronDown,
  MessageSquare,
  Share2,
  Bookmark,
  Star,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const categories = [
  { name: "All Categories", icon: <Globe className="h-4 w-4" /> },
  { name: "AI & Machine Learning", icon: <Cpu className="h-4 w-4" /> },
  { name: "Healthcare", icon: <Heart className="h-4 w-4" /> },
  { name: "Climate & Environment", icon: <Leaf className="h-4 w-4" /> },
  { name: "Quantum Computing", icon: <Zap className="h-4 w-4" /> },
  { name: "Biotechnology", icon: <Beaker className="h-4 w-4" /> },
  { name: "Space Exploration", icon: <Rocket className="h-4 w-4" /> },
  { name: "Data Science", icon: <Database className="h-4 w-4" /> },
]

const projects = [
  {
    id: 1,
    title: "AI-Powered Climate Change Prediction Models",
    description:
      "Developing machine learning algorithms to predict climate change impacts on regional ecosystems with higher accuracy.",
    category: "Climate & Environment",
    tags: ["AI", "Climate", "Prediction Models"],
    collaborators: 8,
    location: "Global",
    author: {
      name: "Dr. Emma Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      institution: "Stanford University",
    },
    stars: 42,
    comments: 15,
  },
  {
    id: 2,
    title: "Quantum Computing for Drug Discovery",
    description:
      "Using quantum algorithms to accelerate the discovery of novel pharmaceutical compounds for treating resistant diseases.",
    category: "Healthcare",
    tags: ["Quantum", "Pharma", "Drug Discovery"],
    collaborators: 5,
    location: "Europe",
    author: {
      name: "Prof. James Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      institution: "Oxford University",
    },
    stars: 38,
    comments: 12,
  },
  {
    id: 3,
    title: "Blockchain for Secure Medical Records",
    description:
      "Implementing blockchain technology to ensure secure, transparent, and patient-controlled medical record systems.",
    category: "Healthcare",
    tags: ["Blockchain", "Security", "Medical Data"],
    collaborators: 6,
    location: "North America",
    author: {
      name: "Dr. Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      institution: "MIT",
    },
    stars: 29,
    comments: 8,
  },
  {
    id: 4,
    title: "Sustainable Energy Storage Solutions",
    description:
      "Researching novel materials and methods for more efficient and environmentally friendly energy storage technologies.",
    category: "Climate & Environment",
    tags: ["Energy", "Sustainability", "Materials Science"],
    collaborators: 10,
    location: "Global",
    author: {
      name: "Dr. Michael Okonjo",
      avatar: "/placeholder.svg?height=40&width=40",
      institution: "ETH Zurich",
    },
    stars: 56,
    comments: 23,
  },
  {
    id: 5,
    title: "Neural Interfaces for Paralysis Treatment",
    description:
      "Developing brain-computer interfaces to restore mobility and independence for individuals with paralysis.",
    category: "Healthcare",
    tags: ["Neuroscience", "BCI", "Medical Devices"],
    collaborators: 7,
    location: "Asia Pacific",
    author: {
      name: "Dr. Aisha Patel",
      avatar: "/placeholder.svg?height=40&width=40",
      institution: "National University of Singapore",
    },
    stars: 47,
    comments: 19,
  },
  {
    id: 6,
    title: "Automated Biodiversity Monitoring Systems",
    description:
      "Creating AI-powered systems to track and analyze biodiversity changes in critical ecosystems worldwide.",
    category: "Climate & Environment",
    tags: ["Biodiversity", "AI", "Conservation"],
    collaborators: 9,
    location: "South America",
    author: {
      name: "Prof. Carlos Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
      institution: "University of São Paulo",
    },
    stars: 33,
    comments: 14,
  },
]

export default function ExplorePage() {
  const [activeCategory, setActiveCategory] = useState("All Categories")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredProjects = projects.filter((project) => {
    const matchesCategory = activeCategory === "All Categories" || project.category === activeCategory
    const matchesSearch =
      searchQuery === "" ||
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    return matchesCategory && matchesSearch
  })

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold font-heading">Explore Projects</h1>
          <p className="text-muted-foreground">Discover research projects and collaboration opportunities</p>
        </div>
        <Button>
          <BookOpen className="h-4 w-4 mr-2" />
          Start a New Project
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search projects, topics, or researchers..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by: Relevance" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Relevance</SelectItem>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="collaborators">Most Collaborators</SelectItem>
            </SelectContent>
          </Select>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuItem>Open to New Collaborators</DropdownMenuItem>
              <DropdownMenuItem>Funding Available</DropdownMenuItem>
              <DropdownMenuItem>Seeking Mentorship</DropdownMenuItem>
              <DropdownMenuItem>Remote Collaboration</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Categories Sidebar */}
        <Card className="lg:col-span-1 h-fit">
          <CardHeader>
            <CardTitle>Categories</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <nav className="space-y-1">
              {categories.map((category) => (
                <Button
                  key={category.name}
                  variant={activeCategory === category.name ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveCategory(category.name)}
                >
                  {category.icon}
                  <span className="ml-2">{category.name}</span>
                </Button>
              ))}
            </nav>
          </CardContent>
        </Card>

        {/* Projects Grid */}
        <div className="lg:col-span-3 space-y-6">
          <Tabs defaultValue="grid">
            <div className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">Showing {filteredProjects.length} projects</p>
              <TabsList>
                <TabsTrigger value="grid">Grid</TabsTrigger>
                <TabsTrigger value="list">List</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="grid" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredProjects.map((project) => (
                  <Card key={project.id} className="overflow-hidden card-hover">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <Badge variant="outline" className="mb-2">
                          {project.category}
                        </Badge>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <ChevronDown className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Bookmark className="h-4 w-4 mr-2" />
                              Save Project
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Share2 className="h-4 w-4 mr-2" />
                              Share
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <CardTitle className="text-lg">
                        <Link href={`/explore/${project.id}`} className="hover:text-primary transition-colors">
                          {project.title}
                        </Link>
                      </CardTitle>
                      <CardDescription className="line-clamp-2">{project.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="bg-secondary/20">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span className="text-muted-foreground">{project.collaborators} collaborators</span>
                        </div>
                        <div className="flex items-center">
                          <Globe className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span className="text-muted-foreground">{project.location}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t pt-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={project.author.avatar} alt={project.author.name} />
                          <AvatarFallback>{project.author.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="text-sm">
                          <p className="font-medium">{project.author.name}</p>
                          <p className="text-xs text-muted-foreground">{project.author.institution}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Button variant="ghost" size="sm" className="h-8 gap-1">
                          <Star className="h-4 w-4" />
                          <span>{project.stars}</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 gap-1">
                          <MessageSquare className="h-4 w-4" />
                          <span>{project.comments}</span>
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="list" className="mt-6">
              <div className="space-y-4">
                {filteredProjects.map((project) => (
                  <Card key={project.id} className="overflow-hidden card-hover">
                    <div className="p-6">
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{project.category}</Badge>
                            <div className="flex gap-1">
                              {project.tags.map((tag) => (
                                <Badge key={tag} variant="secondary" className="bg-secondary/20">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <h3 className="text-lg font-semibold">
                            <Link href={`/explore/${project.id}`} className="hover:text-primary transition-colors">
                              {project.title}
                            </Link>
                          </h3>
                          <p className="text-muted-foreground">{project.description}</p>
                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center">
                              <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                              <span className="text-muted-foreground">{project.collaborators} collaborators</span>
                            </div>
                            <div className="flex items-center">
                              <Globe className="h-4 w-4 mr-1 text-muted-foreground" />
                              <span className="text-muted-foreground">{project.location}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-row md:flex-col items-center md:items-end gap-4 md:min-w-[180px]">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={project.author.avatar} alt={project.author.name} />
                              <AvatarFallback>{project.author.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="text-sm">
                              <p className="font-medium">{project.author.name}</p>
                              <p className="text-xs text-muted-foreground">{project.author.institution}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" className="h-8 gap-1">
                              <Star className="h-4 w-4" />
                              <span>{project.stars}</span>
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 gap-1">
                              <MessageSquare className="h-4 w-4" />
                              <span>{project.comments}</span>
                            </Button>
                            <Button variant="outline" size="sm">
                              View
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No projects found matching your criteria.</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setActiveCategory("All Categories")
                  setSearchQuery("")
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}

          {filteredProjects.length > 0 && (
            <div className="flex justify-center mt-8">
              <Button variant="outline">Load More Projects</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

