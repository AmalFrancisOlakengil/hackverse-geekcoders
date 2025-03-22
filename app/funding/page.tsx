import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ArrowRight, Search, Filter, DollarSign, Calendar, Users, Globe, Award } from "lucide-react"

export default function FundingPage() {
  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold font-heading">Funding Marketplace</h1>
          <p className="text-muted-foreground">
            Discover grants, scholarships, and funding opportunities for your research
          </p>
        </div>
        <Button>
          <DollarSign className="h-4 w-4 mr-2" />
          Post Funding Opportunity
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search funding opportunities..." className="pl-10" />
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </div>

      {/* Funding Categories */}
      <Tabs defaultValue="all" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Opportunities</TabsTrigger>
          <TabsTrigger value="grants">Grants</TabsTrigger>
          <TabsTrigger value="scholarships">Scholarships</TabsTrigger>
          <TabsTrigger value="fellowships">Fellowships</TabsTrigger>
          <TabsTrigger value="venture">Venture Capital</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          {/* Featured Funding */}
          <div>
            <h2 className="text-2xl font-bold font-heading mb-4">Featured Opportunities</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Global Climate Research Grant",
                  amount: "$250,000",
                  deadline: "April 15, 2024",
                  category: "Grant",
                  org: "International Climate Foundation",
                  description: "Funding for innovative research addressing climate change impacts and solutions.",
                  tags: ["Climate", "Sustainability", "Global"],
                },
                {
                  title: "AI Ethics Research Fellowship",
                  amount: "$120,000",
                  deadline: "May 30, 2024",
                  category: "Fellowship",
                  org: "Tech for Humanity Initiative",
                  description: "Two-year fellowship for researchers exploring ethical implications of AI technologies.",
                  tags: ["AI", "Ethics", "Technology"],
                },
                {
                  title: "Medical Innovation Accelerator",
                  amount: "$500,000",
                  deadline: "March 1, 2024",
                  category: "Venture",
                  org: "HealthTech Ventures",
                  description: "Seed funding for breakthrough medical technologies with commercialization potential.",
                  tags: ["Healthcare", "Innovation", "Startup"],
                },
              ].map((item, i) => (
                <Card key={i} className="card-hover">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <Badge variant="outline">{item.category}</Badge>
                      <span className="text-lg font-bold text-collab-primary">{item.amount}</span>
                    </div>
                    <CardTitle className="mt-2">{item.title}</CardTitle>
                    <CardDescription>{item.org}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-4">{item.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {item.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="bg-secondary/20">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>Deadline: {item.deadline}</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">View Details</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>

          {/* Recent Opportunities */}
          <div>
            <h2 className="text-2xl font-bold font-heading mb-4">Recent Opportunities</h2>
            <div className="space-y-4">
              {[
                {
                  title: "Quantum Computing Research Grant",
                  amount: "$180,000",
                  deadline: "June 15, 2024",
                  category: "Grant",
                  org: "National Science Foundation",
                  description: "Supporting research in quantum algorithms and applications.",
                  tags: ["Quantum", "Computing", "Physics"],
                },
                {
                  title: "Sustainable Agriculture Fellowship",
                  amount: "$75,000",
                  deadline: "July 30, 2024",
                  category: "Fellowship",
                  org: "Global Food Security Alliance",
                  description: "One-year fellowship for researchers developing sustainable farming methods.",
                  tags: ["Agriculture", "Sustainability", "Food Security"],
                },
                {
                  title: "Neuroscience PhD Scholarship",
                  amount: "$40,000/year",
                  deadline: "August 15, 2024",
                  category: "Scholarship",
                  org: "Brain Research Institute",
                  description: "Full scholarship for PhD students in neuroscience and related fields.",
                  tags: ["Neuroscience", "PhD", "Academic"],
                },
                {
                  title: "Renewable Energy Innovation Fund",
                  amount: "$350,000",
                  deadline: "September 1, 2024",
                  category: "Venture",
                  org: "CleanTech Partners",
                  description: "Funding for early-stage renewable energy technologies with market potential.",
                  tags: ["Energy", "Innovation", "Cleantech"],
                },
              ].map((item, i) => (
                <Card key={i} className="overflow-hidden">
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{item.category}</Badge>
                          <span className="text-sm font-medium text-collab-primary">{item.amount}</span>
                        </div>
                        <h3 className="text-lg font-semibold">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                        <div className="flex flex-wrap gap-2 my-2">
                          {item.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="bg-secondary/20">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Calendar className="h-3.5 w-3.5 mr-1" />
                          <span>Deadline: {item.deadline}</span>
                        </div>
                      </div>
                      <div className="flex flex-row md:flex-col items-center md:items-end gap-4">
                        <div className="text-sm">
                          <p className="font-medium">{item.org}</p>
                        </div>
                        <Button size="sm">View Details</Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            <div className="flex justify-center mt-6">
              <Button variant="outline">View All Opportunities</Button>
            </div>
          </div>

          {/* Funding Stats */}
          <div className="mt-12 bg-muted/30 rounded-lg p-8">
            <h2 className="text-2xl font-bold font-heading mb-6 text-center">Funding Impact</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="p-3 bg-primary/10 rounded-full mb-4">
                    <DollarSign className="h-6 w-6 text-primary" />
                  </div>
                  <p className="text-3xl font-bold mb-1">$250M+</p>
                  <p className="text-sm text-muted-foreground">Total Funding Available</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="p-3 bg-secondary/10 rounded-full mb-4">
                    <Award className="h-6 w-6 text-secondary" />
                  </div>
                  <p className="text-3xl font-bold mb-1">1,200+</p>
                  <p className="text-sm text-muted-foreground">Active Opportunities</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="p-3 bg-accent/10 rounded-full mb-4">
                    <Users className="h-6 w-6 text-accent" />
                  </div>
                  <p className="text-3xl font-bold mb-1">5,400+</p>
                  <p className="text-sm text-muted-foreground">Researchers Funded</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="p-3 bg-primary/10 rounded-full mb-4">
                    <Globe className="h-6 w-6 text-primary" />
                  </div>
                  <p className="text-3xl font-bold mb-1">85+</p>
                  <p className="text-sm text-muted-foreground">Countries Represented</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Other tab contents would be similar */}
        <TabsContent value="grants">
          <div className="p-8 text-center">
            <h3 className="text-xl font-medium mb-2">Research Grants</h3>
            <p className="text-muted-foreground mb-4">Explore grants specifically for research projects</p>
            <Button>Browse All Grants</Button>
          </div>
        </TabsContent>

        <TabsContent value="scholarships">
          <div className="p-8 text-center">
            <h3 className="text-xl font-medium mb-2">Academic Scholarships</h3>
            <p className="text-muted-foreground mb-4">Find scholarships for students and academic researchers</p>
            <Button>Browse All Scholarships</Button>
          </div>
        </TabsContent>

        <TabsContent value="fellowships">
          <div className="p-8 text-center">
            <h3 className="text-xl font-medium mb-2">Research Fellowships</h3>
            <p className="text-muted-foreground mb-4">
              Discover fellowship opportunities for extended research periods
            </p>
            <Button>Browse All Fellowships</Button>
          </div>
        </TabsContent>

        <TabsContent value="venture">
          <div className="p-8 text-center">
            <h3 className="text-xl font-medium mb-2">Venture Capital & Startup Funding</h3>
            <p className="text-muted-foreground mb-4">
              Connect with investors for commercializing research innovations
            </p>
            <Button>Browse All Venture Opportunities</Button>
          </div>
        </TabsContent>
      </Tabs>

      {/* CTA Section */}
      <section className="mt-12 hero-gradient text-white rounded-lg overflow-hidden">
        <div className="p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold font-heading">Ready to Fund Your Research?</h2>
            <p className="text-lg text-white/80">
              Create a profile to get matched with relevant funding opportunities and increase your chances of securing
              support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" asChild className="bg-white text-[#4F46E5] hover:bg-white/90">
                <Link href="/signup">
                  Create Researcher Profile
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Link href="/funding/how-it-works">How It Works</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

