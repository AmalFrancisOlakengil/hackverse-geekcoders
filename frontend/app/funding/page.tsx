"use client"; // Mark as a Client Component

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ArrowRight, Search, Filter, DollarSign, Calendar, Users, Globe, Award } from "lucide-react";
import { ref, get, set } from "firebase/database";
import { database, auth } from "@/lib/firebase";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export default function FundingPage() {
  const [fundingOpportunities, setFundingOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFunding, setSelectedFunding] = useState(null);
  const [userProjects, setUserProjects] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Fetch funding opportunities from Firebase
  useEffect(() => {
    const fetchFundingOpportunities = async () => {
      try {
        const usersRef = ref(database, "users");
        const snapshot = await get(usersRef);

        if (snapshot.exists()) {
          const users = snapshot.val();
          const allFunding = [];

          // Loop through each user and collect their funding opportunities
          Object.keys(users).forEach((userId) => {
            const userFunding = users[userId].funding;
            if (userFunding) {
              Object.keys(userFunding).forEach((fundingId) => {
                const funding = userFunding[fundingId];
                allFunding.push({
                  id: fundingId,
                  userId,
                  ...funding,
                });
              });
            }
          });

          setFundingOpportunities(allFunding);
        } else {
          console.log("No funding opportunities found in Firebase.");
        }
      } catch (error) {
        console.error("Error fetching funding opportunities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFundingOpportunities();
  }, []);

  // Fetch user projects
  const fetchUserProjects = async () => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      const userProjectsRef = ref(database, `users/${user.uid}/projects`);
      const snapshot = await get(userProjectsRef);

      if (snapshot.exists()) {
        const projectsData = snapshot.val();
        const projectsArray = Object.entries(projectsData).map(([id, data]) => ({
          id,
          ...data,
        }));
        setUserProjects(projectsArray);
      }
    } catch (error) {
      console.error("Error fetching user projects:", error);
    }
  };

  // Handle Apply button click
  const handleApplyClick = (funding) => {
    setSelectedFunding(funding);
    fetchUserProjects();
    setIsDialogOpen(true);
  };

  // Handle project selection
  const handleProjectSelect = async (projectId) => {
    if (!selectedFunding) return;

    try {
      const fundingRef = ref(database, `users/${selectedFunding.userId}/funding/${selectedFunding.id}`);
      const fundingSnapshot = await get(fundingRef);

      if (fundingSnapshot.exists()) {
        const fundingData = fundingSnapshot.val();
        const appliedProjects = fundingData.appliedProjects || [];

        if (!appliedProjects.includes(projectId)) {
          appliedProjects.push(projectId);
          await set(fundingRef, { ...fundingData, appliedProjects });
          alert("Project applied successfully!");
        } else {
          alert("This project has already been applied for this funding.");
        }
      }

      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error applying for funding:", error);
      alert("Failed to apply for funding. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="container py-8 text-center">
        <p>Loading funding opportunities...</p>
      </div>
    );
  }

  return (
    <div className="container py-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold font-heading">Funding Marketplace</h1>
          <p className="text-muted-foreground">
            Discover grants, scholarships, and funding opportunities for your research
          </p>
        </div>
        {/* Add Funding Button */}
        <Button asChild>
          <Link href="/post-funding">
            <DollarSign className="h-4 w-4 mr-2" />
            Post Funding Opportunity
          </Link>
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
              {fundingOpportunities.map((funding) => (
                <Card key={funding.id} className="card-hover">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <Badge variant="outline">{funding.category}</Badge>
                      <span className="text-lg font-bold text-collab-primary">{funding.amount} ETH</span>
                    </div>
                    <CardTitle className="mt-2">{funding.title}</CardTitle>
                    <CardDescription>{funding.org}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-4">{funding.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {funding.tags.split(", ").map((tag) => (
                        <Badge key={tag} variant="secondary" className="bg-secondary/20">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>Date of Creation: {new Date(funding.createdAt).toLocaleDateString()}</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" onClick={() => handleApplyClick(funding)}>
                      Apply
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Other tab contents */}
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
            <p className="text-muted-foreground mb-4">Discover fellowship opportunities for extended research periods</p>
            <Button>Browse All Fellowships</Button>
          </div>
        </TabsContent>
        <TabsContent value="venture">
          <div className="p-8 text-center">
            <h3 className="text-xl font-medium mb-2">Venture Capital & Startup Funding</h3>
            <p className="text-muted-foreground mb-4">Connect with investors for commercializing research innovations</p>
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
              <Button size="lg" variant="outline" className="bg-white text-[#4F46E5] hover:bg-white/90">
                <Link href="/funding/how-it-works">How It Works</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Dialog for Project Selection */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select a Project to Apply</DialogTitle>
            <DialogDescription>
              Choose one of your projects to apply for this funding opportunity.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {userProjects.map((project) => (
              <div
                key={project.id}
                className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/5 transition-colors"
                onClick={() => handleProjectSelect(project.id)}
              >
                <div>
                  <h3 className="font-medium">{project.title}</h3>
                  <p className="text-sm text-muted-foreground">{project.description}</p>
                </div>
                <Button variant="outline" size="sm">
                  Select
                </Button>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}