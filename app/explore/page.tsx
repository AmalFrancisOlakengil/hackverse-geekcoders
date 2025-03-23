"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { database } from "@/lib/firebase"; // Import Firebase database
import { ref, get } from "firebase/database"; // Import Firebase functions

const categories = [
  { name: "All Categories", icon: <Globe className="h-4 w-4" /> },
  { name: "AI & Machine Learning", icon: <Cpu className="h-4 w-4" /> },
  { name: "Healthcare", icon: <Heart className="h-4 w-4" /> },
  { name: "Climate & Environment", icon: <Leaf className="h-4 w-4" /> },
  { name: "Quantum Computing", icon: <Zap className="h-4 w-4" /> },
  { name: "Biotechnology", icon: <Beaker className="h-4 w-4" /> },
  { name: "Space Exploration", icon: <Rocket className="h-4 w-4" /> },
  { name: "Data Science", icon: <Database className="h-4 w-4" /> },
];

export default function ExplorePage() {
  const [activeCategory, setActiveCategory] = useState("All Categories");
  const [searchQuery, setSearchQuery] = useState("");
  const [projects, setProjects] = useState([]); // State to store fetched projects
  const [loading, setLoading] = useState(true); // State to track loading status
  const [sortBy, setSortBy] = useState("relevance"); // State for sorting
  const [filters, setFilters] = useState({
    openToCollaborators: false,
    fundingAvailable: false,
    seekingMentorship: false,
    remoteCollaboration: false,
  }); // State for filters

  // Fetch all projects from Firebase
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsRef = ref(database, "users"); // Reference to the "users" node
        const snapshot = await get(projectsRef); // Fetch data

        if (snapshot.exists()) {
          const users = snapshot.val(); // Get all users
          const allProjects = [];

          // Loop through each user and collect their projects
          Object.keys(users).forEach((userId) => {
            const userProjects = users[userId].projects; // Get projects for the current user
            if (userProjects) {
              Object.keys(userProjects).forEach((projectId) => {
                const project = userProjects[projectId];
                allProjects.push({
                  id: projectId,
                  userId,
                  ...project, // Spread project data
                });
              });
            }
          });

          console.log("All projects:", allProjects); // Debugging: Log all projects
          setProjects(allProjects); // Set projects in state
        } else {
          console.log("No projects found in Firebase.");
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false); // Set loading to false
      }
    };

    fetchProjects();
  }, []);

  // Filter projects based on category, search query, and filters
  const filteredProjects = projects
    .filter((project) => {
      const matchesCategory = activeCategory === "All Categories" || project.projectCategory === activeCategory;
      const matchesSearch =
        searchQuery === "" ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.skillsRequired.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesFilters =
        (!filters.openToCollaborators || project.openToCollaborators) &&
        (!filters.fundingAvailable || project.fundingAvailable) &&
        (!filters.seekingMentorship || project.seekingMentorship) &&
        (!filters.remoteCollaboration || project.remoteCollaboration);

      return matchesCategory && matchesSearch && matchesFilters;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "recent":
          return new Date(b.createdAt) - new Date(a.createdAt); // Sort by most recent
        case "popular":
          return (b.stars || 0) - (a.stars || 0); // Sort by most stars
        case "collaborators":
          return (b.numCollaborators || 0) - (a.numCollaborators || 0); // Sort by most collaborators
        default:
          return 0; // Default: no sorting
      }
    });

  if (loading) {
    return <div className="container py-8 text-center">Loading projects...</div>;
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold font-heading">Explore Projects</h1>
          <p className="text-muted-foreground">Discover research projects and collaboration opportunities</p>
        </div>
        <Button>
          <BookOpen className="h-4 w-4 mr-2" />
          <Link href="/add-project">Start a New Project</Link>
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
          <Select value={sortBy} onValueChange={(value) => setSortBy(value)}>
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
              <DropdownMenuItem
                onSelect={() => setFilters((prev) => ({ ...prev, openToCollaborators: !prev.openToCollaborators }))}
              >
                <input
                  type="checkbox"
                  checked={filters.openToCollaborators}
                  onChange={() => {}}
                  className="mr-2"
                />
                Open to New Collaborators
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => setFilters((prev) => ({ ...prev, fundingAvailable: !prev.fundingAvailable }))}
              >
                <input
                  type="checkbox"
                  checked={filters.fundingAvailable}
                  onChange={() => {}}
                  className="mr-2"
                />
                Funding Available
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => setFilters((prev) => ({ ...prev, seekingMentorship: !prev.seekingMentorship }))}
              >
                <input
                  type="checkbox"
                  checked={filters.seekingMentorship}
                  onChange={() => {}}
                  className="mr-2"
                />
                Seeking Mentorship
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => setFilters((prev) => ({ ...prev, remoteCollaboration: !prev.remoteCollaboration }))}
              >
                <input
                  type="checkbox"
                  checked={filters.remoteCollaboration}
                  onChange={() => {}}
                  className="mr-2"
                />
                Remote Collaboration
              </DropdownMenuItem>
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
                          {project.projectCategory}
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
                        {project.skillsRequired.map((skill) => (
                          <Badge key={skill} variant="secondary" className="bg-secondary/20">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span className="text-muted-foreground">{project.numCollaborators} collaborators</span>
                        </div>
                        <div className="flex items-center">
                          <Globe className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span className="text-muted-foreground">{project.location || "Unknown"}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t pt-4 flex items-center justify-between">
  <div className="flex items-center gap-2">
    <Avatar className="h-8 w-8">
      <AvatarImage src={project.author?.avatar} alt={project.author?.name} />
      <AvatarFallback>{project.author?.name?.charAt(0)}</AvatarFallback>
    </Avatar>
    <div className="text-sm">
      <p className="font-medium">{project.author?.name || "Unknown"}</p>
      <p className="text-xs text-muted-foreground">{project.author?.institution || ""}</p>
    </div>
  </div>
  <div className="flex items-center gap-3">
    <Button variant="ghost" size="sm" className="h-8 gap-1">
      <Star className="h-4 w-4" />
      <span>{project.likes || 0}</span> {/* Display likes */}
    </Button>
    <Button variant="ghost" size="sm" className="h-8 gap-1">
      <MessageSquare className="h-4 w-4" />
      <span>{project.comments || 0}</span> {/* Display comments */}
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
                            <Badge variant="outline">{project.projectCategory}</Badge>
                            <div className="flex gap-1">
                              {project.skillsRequired.map((skill) => (
                                <Badge key={skill} variant="secondary" className="bg-secondary/20">
                                  {skill}
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
                              <span className="text-muted-foreground">{project.numCollaborators} collaborators</span>
                            </div>
                            <div className="flex items-center">
                              <Globe className="h-4 w-4 mr-1 text-muted-foreground" />
                              <span className="text-muted-foreground">{project.location || "Unknown"}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-row md:flex-col items-center md:items-end gap-4 md:min-w-[180px]">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={project.author?.avatar} alt={project.author?.name} />
                              <AvatarFallback>{project.author?.name?.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="text-sm">
                              <p className="font-medium">{project.author?.name || "Unknown"}</p>
                              <p className="text-xs text-muted-foreground">{project.author?.institution || ""}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" className="h-8 gap-1">
                              <Star className="h-4 w-4" />
                              <span>{project.stars || 0}</span>
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 gap-1">
                              <MessageSquare className="h-4 w-4" />
                              <span>{project.comments || 0}</span>
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
                  setActiveCategory("All Categories");
                  setSearchQuery("");
                  setFilters({
                    openToCollaborators: false,
                    fundingAvailable: false,
                    seekingMentorship: false,
                    remoteCollaboration: false,
                  });
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
  );
}