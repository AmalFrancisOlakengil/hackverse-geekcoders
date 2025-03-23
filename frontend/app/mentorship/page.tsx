"use client"

import { useEffect, useState } from "react"
import { database } from "@/lib/firebase"
import { ref, get, query, orderByChild } from "firebase/database"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  ArrowRight,
  Search,
  Filter,
  Users,
  BookOpen,
  Star,
  MessageSquare,
  Calendar,
  Clock,
  Globe,
  Award,
} from "lucide-react"

export default function MentorshipPage() {
  const [mentors, setMentors] = useState([])
  const [programs, setPrograms] = useState([])

  useEffect(() => {
    const fetchMentorshipData = async () => {
      try {
        // Fetch all projects where seekingMentorship is true
        const projectsRef = ref(database, 'users');
        const snapshot = await get(projectsRef);

        if (snapshot.exists()) {
          const mentorshipProjects = [];
          snapshot.forEach((userSnapshot) => {
            const userData = userSnapshot.val();
            if (userData.projects) {
              Object.entries(userData.projects).forEach(([projectId, projectData]) => {
                if (projectData.seekingMentorship) {
                  mentorshipProjects.push({
                    id: projectId,
                    userId: userSnapshot.key,
                    ...projectData
                  });
                }
              });
            }
          });

          setPrograms(mentorshipProjects);
        }
      } catch (error) {
        console.error("Error fetching mentorship data:", error);
      }
    };

    fetchMentorshipData();
  }, []);

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold font-heading">Mentorship Network</h1>
          <p className="text-muted-foreground">Connect with experienced researchers and mentors in your field</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Users className="h-4 w-4 mr-2" />
            Find a Mentor
          </Button>
          <Button>
            <BookOpen className="h-4 w-4 mr-2" />
            Become a Mentor
          </Button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search mentors by name, field, or expertise..." className="pl-10" />
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </div>

      {/* Mentorship Categories */}
      <Tabs defaultValue="featured" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="featured">Featured Mentors</TabsTrigger>
          <TabsTrigger value="programs">Mentorship Programs</TabsTrigger>
          <TabsTrigger value="groups">Peer Groups</TabsTrigger>
          <TabsTrigger value="events">Upcoming Events</TabsTrigger>
        </TabsList>

        <TabsContent value="featured" className="space-y-6">
          {/* Featured Mentors */}
          <div>
            <h2 className="text-2xl font-bold font-heading mb-4">Top Mentors in Your Field</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  name: "Dr. Sarah Chen",
                  title: "Professor of Quantum Computing",
                  institution: "Stanford University",
                  expertise: ["Quantum Algorithms", "Quantum Machine Learning", "Quantum Cryptography"],
                  rating: 4.9,
                  reviews: 42,
                  availability: "Available for 3 mentees",
                  avatar: "/placeholder.svg?height=100&width=100",
                  initials: "SC",
                },
                {
                  name: "Prof. Michael Okonjo",
                  title: "Lead Researcher, Climate Science",
                  institution: "ETH Zurich",
                  expertise: ["Climate Modeling", "Sustainable Energy", "Environmental Policy"],
                  rating: 4.8,
                  reviews: 37,
                  availability: "Available for 2 mentees",
                  avatar: "/placeholder.svg?height=100&width=100",
                  initials: "MO",
                },
                {
                  name: "Dr. Elena Rodriguez",
                  title: "Director of AI Ethics",
                  institution: "MIT Media Lab",
                  expertise: ["AI Ethics", "Machine Learning", "Technology Policy"],
                  rating: 5.0,
                  reviews: 51,
                  availability: "Available for 1 mentee",
                  avatar: "/placeholder.svg?height=100&width=100",
                  initials: "ER",
                },
              ].map((mentor, i) => (
                <Card key={i} className="card-hover">
                  <CardHeader className="text-center pb-2">
                    <Avatar className="h-24 w-24 mx-auto mb-4">
                      <AvatarImage src={mentor.avatar} alt={mentor.name} />
                      <AvatarFallback>{mentor.initials}</AvatarFallback>
                    </Avatar>
                    <CardTitle>{mentor.name}</CardTitle>
                    <CardDescription className="text-base font-medium">{mentor.title}</CardDescription>
                    <p className="text-sm text-muted-foreground">{mentor.institution}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {mentor.expertise.map((skill) => (
                        <Badge key={skill} variant="secondary" className="bg-secondary/20">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-sm mb-4">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 mr-1" />
                        <span className="font-medium">{mentor.rating}</span>
                        <span className="text-muted-foreground ml-1">({mentor.reviews} reviews)</span>
                      </div>
                      <div className="text-collab-secondary font-medium">{mentor.availability}</div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Button variant="outline" className="w-1/2">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Message
                    </Button>
                    <Button className="w-1/2">Request Mentorship</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            <div className="flex justify-center mt-6">
              <Button variant="outline">View All Mentors</Button>
            </div>
          </div>

          {/* Mentorship Programs */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold font-heading mb-4">Featured Mentorship Programs</h2>
            <div className="space-y-4">
              {programs.map((program) => (
                <Card key={program.id} className="overflow-hidden">
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold">{program.title}</h3>
                        <p className="text-sm text-muted-foreground">{program.description}</p>
                        <div className="flex flex-wrap gap-2 my-2">
                          {program.tags && program.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="bg-secondary/20">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center">
                            <Calendar className="h-3.5 w-3.5 mr-1" />
                            <span>Starts: {program.startDate}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-3.5 w-3.5 mr-1" />
                            <span>Duration: {program.duration}</span>
                          </div>
                          <div className="flex items-center">
                            <Users className="h-3.5 w-3.5 mr-1" />
                            <span>{program.mentors} mentors</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-row md:flex-col items-center md:items-end gap-4 md:min-w-[180px]">
                        <div className="text-sm">
                          <p className="font-medium">{program.organizer}</p>
                          <p className="text-xs text-collab-secondary mt-1">{program.spots}</p>
                        </div>
                        <Button>Apply Now</Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Mentorship Stats */}
          <div className="mt-12 bg-muted/30 rounded-lg p-8">
            <h2 className="text-2xl font-bold font-heading mb-6 text-center">Mentorship Impact</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="p-3 bg-primary/10 rounded-full mb-4">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <p className="text-3xl font-bold mb-1">2,500+</p>
                  <p className="text-sm text-muted-foreground">Active Mentors</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="p-3 bg-secondary/10 rounded-full mb-4">
                    <BookOpen className="h-6 w-6 text-secondary" />
                  </div>
                  <p className="text-3xl font-bold mb-1">120+</p>
                  <p className="text-sm text-muted-foreground">Mentorship Programs</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="p-3 bg-accent/10 rounded-full mb-4">
                    <Award className="h-6 w-6 text-accent" />
                  </div>
                  <p className="text-3xl font-bold mb-1">8,400+</p>
                  <p className="text-sm text-muted-foreground">Mentees Supported</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="p-3 bg-primary/10 rounded-full mb-4">
                    <Globe className="h-6 w-6 text-primary" />
                  </div>
                  <p className="text-3xl font-bold mb-1">92+</p>
                  <p className="text-sm text-muted-foreground">Countries Represented</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Other tab contents would be similar */}
        <TabsContent value="programs">
          <div className="p-8 text-center">
            <h3 className="text-xl font-medium mb-2">Structured Mentorship Programs</h3>
            <p className="text-muted-foreground mb-4">
              Join organized mentorship programs with defined goals and timelines
            </p>
            <Button>Browse All Programs</Button>
          </div>
        </TabsContent>

        <TabsContent value="groups">
          <div className="p-8 text-center">
            <h3 className="text-xl font-medium mb-2">Peer Mentorship Groups</h3>
            <p className="text-muted-foreground mb-4">Connect with peers for collaborative learning and support</p>
            <Button>Find Peer Groups</Button>
          </div>
        </TabsContent>

        <TabsContent value="events">
          <div className="p-8 text-center">
            <h3 className="text-xl font-medium mb-2">Mentorship Events & Workshops</h3>
            <p className="text-muted-foreground mb-4">Attend virtual and in-person mentorship events</p>
            <Button>View Calendar</Button>
          </div>
        </TabsContent>
      </Tabs>

      {/* CTA Section */}
      <section className="mt-12 hero-gradient text-white rounded-lg overflow-hidden">
        <div className="p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold font-heading">Share Your Knowledge, Shape the Future</h2>
            <p className="text-lg text-white/80">
              Become a mentor and help guide the next generation of researchers while expanding your own network.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" asChild className="bg-white text-[#4F46E5] hover:bg-white/90">
                <Link href="/mentorship/become-mentor">
                  Become a Mentor
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Link href="/mentorship/how-it-works">How It Works</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

