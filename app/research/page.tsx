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
  FileText,
  BookOpen,
  Download,
  MessageSquare,
  ThumbsUp,
  Eye,
  Share2,
  Calendar,
  Users,
  TrendingUp,
  BarChart,
} from "lucide-react"

export default function ResearchHubPage() {
  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold font-heading">Research Hub</h1>
          <p className="text-muted-foreground">Discover, share, and collaborate on cutting-edge research</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <BookOpen className="h-4 w-4 mr-2" />
            Browse Research
          </Button>
          <Button>
            <FileText className="h-4 w-4 mr-2" />
            Share Your Research
          </Button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search papers, datasets, or researchers..." className="pl-10" />
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </div>

      {/* Research Categories */}
      <Tabs defaultValue="trending" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="trending">Trending Research</TabsTrigger>
          <TabsTrigger value="papers">Papers</TabsTrigger>
          <TabsTrigger value="datasets">Datasets</TabsTrigger>
          <TabsTrigger value="discussions">Discussions</TabsTrigger>
        </TabsList>

        <TabsContent value="trending" className="space-y-6">
          {/* Trending Research */}
          <div>
            <h2 className="text-2xl font-bold font-heading mb-4">Trending This Week</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "Quantum Machine Learning for Climate Prediction: A Novel Approach",
                  authors: ["Dr. Emma Chen", "Prof. James Wilson", "Dr. Michael Okonjo"],
                  institution: "Stanford University",
                  date: "Published Feb 15, 2024",
                  abstract:
                    "This paper presents a novel quantum machine learning algorithm that significantly improves climate prediction accuracy by processing complex atmospheric data patterns.",
                  tags: ["Quantum Computing", "Machine Learning", "Climate Science"],
                  views: 2456,
                  downloads: 782,
                  citations: 34,
                },
                {
                  title: "Blockchain-Based Framework for Secure Research Data Sharing",
                  authors: ["Dr. Sarah Johnson", "Dr. Aisha Patel"],
                  institution: "MIT",
                  date: "Published Jan 28, 2024",
                  abstract:
                    "We propose a blockchain-based framework that enables secure, transparent, and controlled sharing of sensitive research data across institutions while maintaining privacy.",
                  tags: ["Blockchain", "Data Security", "Research Collaboration"],
                  views: 1872,
                  downloads: 645,
                  citations: 21,
                },
                {
                  title: "Neural Interfaces for Paralysis Treatment: Clinical Trial Results",
                  authors: ["Dr. Carlos Rodriguez", "Dr. Elena Martinez"],
                  institution: "National University of Singapore",
                  date: "Published Mar 5, 2024",
                  abstract:
                    "This paper presents the results of a three-year clinical trial of neural interface technology for restoring mobility in patients with severe paralysis.",
                  tags: ["Neuroscience", "Medical Devices", "Clinical Trials"],
                  views: 3104,
                  downloads: 1250,
                  citations: 42,
                },
                {
                  title: "Sustainable Materials for Next-Generation Energy Storage",
                  authors: ["Dr. Hiroshi Tanaka", "Dr. Lisa Chen"],
                  institution: "ETH Zurich",
                  date: "Published Feb 3, 2024",
                  abstract:
                    "We introduce a new class of sustainable materials derived from organic waste that demonstrate exceptional performance in energy storage applications.",
                  tags: ["Materials Science", "Energy Storage", "Sustainability"],
                  views: 1945,
                  downloads: 830,
                  citations: 27,
                },
              ].map((paper, i) => (
                <Card key={i} className="card-hover">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex flex-wrap gap-2 mb-2">
                        {paper.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="bg-secondary/20">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <TrendingUp className="h-5 w-5 text-collab-secondary" />
                    </div>
                    <CardTitle className="text-lg hover:text-primary transition-colors">
                      <Link href={`/research/papers/${i}`}>{paper.title}</Link>
                    </CardTitle>
                    <CardDescription className="text-sm mt-1">
                      {paper.authors.join(", ")} • {paper.institution}
                    </CardDescription>
                    <p className="text-xs text-muted-foreground">{paper.date}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{paper.abstract}</p>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center">
                          <Eye className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span className="text-muted-foreground">{paper.views}</span>
                        </div>
                        <div className="flex items-center">
                          <Download className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span className="text-muted-foreground">{paper.downloads}</span>
                        </div>
                        <div className="flex items-center">
                          <FileText className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span className="text-muted-foreground">{paper.citations} citations</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-4 flex justify-between">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
                    </Button>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ThumbsUp className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
            <div className="flex justify-center mt-6">
              <Button variant="outline">View More Research</Button>
            </div>
          </div>

          {/* Research Discussions */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold font-heading mb-4">Active Discussions</h2>
            <div className="space-y-4">
              {[
                {
                  title: "Ethical Implications of AI in Healthcare Decision-Making",
                  starter: "Dr. Elena Rodriguez",
                  avatar: "/placeholder.svg?height=40&width=40",
                  initials: "ER",
                  date: "Started 3 days ago",
                  description:
                    "Discussing the ethical considerations and potential biases in AI systems used for medical diagnosis and treatment planning.",
                  tags: ["AI Ethics", "Healthcare", "Decision-Making"],
                  participants: 28,
                  comments: 47,
                },
                {
                  title: "Reproducibility Crisis in Machine Learning Research",
                  starter: "Prof. James Wilson",
                  avatar: "/placeholder.svg?height=40&width=40",
                  initials: "JW",
                  date: "Started 5 days ago",
                  description:
                    "Exploring solutions to improve reproducibility in machine learning research through better documentation and open-source practices.",
                  tags: ["Reproducibility", "Machine Learning", "Open Science"],
                  participants: 35,
                  comments: 62,
                },
                {
                  title: "Future Directions in Quantum Computing Hardware",
                  starter: "Dr. Sarah Chen",
                  avatar: "/placeholder.svg?height=40&width=40",
                  initials: "SC",
                  date: "Started 1 week ago",
                  description:
                    "Discussing emerging approaches to quantum computing hardware and their potential impact on computational capabilities.",
                  tags: ["Quantum Computing", "Hardware", "Future Tech"],
                  participants: 42,
                  comments: 73,
                },
              ].map((discussion, i) => (
                <Card key={i} className="overflow-hidden">
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold hover:text-primary transition-colors">
                          <Link href={`/research/discussions/${i}`}>{discussion.title}</Link>
                        </h3>
                        <p className="text-sm text-muted-foreground">{discussion.description}</p>
                        <div className="flex flex-wrap gap-2 my-2">
                          {discussion.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="bg-secondary/20">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center">
                            <Calendar className="h-3.5 w-3.5 mr-1" />
                            <span>{discussion.date}</span>
                          </div>
                          <div className="flex items-center">
                            <Users className="h-3.5 w-3.5 mr-1" />
                            <span>{discussion.participants} participants</span>
                          </div>
                          <div className="flex items-center">
                            <MessageSquare className="h-3.5 w-3.5 mr-1" />
                            <span>{discussion.comments} comments</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-row md:flex-col items-center md:items-end gap-4 md:min-w-[180px]">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={discussion.avatar} alt={discussion.starter} />
                            <AvatarFallback>{discussion.initials}</AvatarFallback>
                          </Avatar>
                          <div className="text-sm">
                            <p className="font-medium">{discussion.starter}</p>
                            <p className="text-xs text-muted-foreground">Discussion Starter</p>
                          </div>
                        </div>
                        <Button size="sm">Join Discussion</Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Research Stats */}
          <div className="mt-12 bg-muted/30 rounded-lg p-8">
            <h2 className="text-2xl font-bold font-heading mb-6 text-center">Research Hub Activity</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="p-3 bg-primary/10 rounded-full mb-4">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <p className="text-3xl font-bold mb-1">15,000+</p>
                  <p className="text-sm text-muted-foreground">Research Papers</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="p-3 bg-secondary/10 rounded-full mb-4">
                    <BarChart className="h-6 w-6 text-secondary" />
                  </div>
                  <p className="text-3xl font-bold mb-1">5,200+</p>
                  <p className="text-sm text-muted-foreground">Datasets Shared</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="p-3 bg-accent/10 rounded-full mb-4">
                    <MessageSquare className="h-6 w-6 text-accent" />
                  </div>
                  <p className="text-3xl font-bold mb-1">28,400+</p>
                  <p className="text-sm text-muted-foreground">Active Discussions</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="p-3 bg-primary/10 rounded-full mb-4">
                    <Download className="h-6 w-6 text-primary" />
                  </div>
                  <p className="text-3xl font-bold mb-1">1.2M+</p>
                  <p className="text-sm text-muted-foreground">Monthly Downloads</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Other tab contents would be similar */}
        <TabsContent value="papers">
          <div className="p-8 text-center">
            <h3 className="text-xl font-medium mb-2">Research Papers</h3>
            <p className="text-muted-foreground mb-4">Browse and download peer-reviewed research papers</p>
            <Button>Browse All Papers</Button>
          </div>
        </TabsContent>

        <TabsContent value="datasets">
          <div className="p-8 text-center">
            <h3 className="text-xl font-medium mb-2">Research Datasets</h3>
            <p className="text-muted-foreground mb-4">Access and share research datasets with the community</p>
            <Button>Browse All Datasets</Button>
          </div>
        </TabsContent>

        <TabsContent value="discussions">
          <div className="p-8 text-center">
            <h3 className="text-xl font-medium mb-2">Research Discussions</h3>
            <p className="text-muted-foreground mb-4">Participate in discussions about cutting-edge research</p>
            <Button>View All Discussions</Button>
          </div>
        </TabsContent>
      </Tabs>

      {/* CTA Section */}
      <section className="mt-12 hero-gradient text-white rounded-lg overflow-hidden">
        <div className="p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold font-heading">Accelerate Your Research Impact</h2>
            <p className="text-lg text-white/80">
              Share your research with our global community to increase visibility, gather feedback, and find
              collaborators.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" asChild className="bg-white text-[#4F46E5] hover:bg-white/90">
                <Link href="/research/publish">
                  Publish Your Research
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Link href="/research/how-it-works">How It Works</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

