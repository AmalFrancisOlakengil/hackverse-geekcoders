import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Globe, DollarSign, Users, Database, FileText, Briefcase, Award, Lock } from "lucide-react"
import { BlockchainVisual } from "@/components/blockchain-visual"
import { BlockchainImage } from "@/components/blockchain-image"
import { FeatureCard } from "@/components/feature-card"
import { ResearchTrends } from "@/components/research-trends"
import { TestimonialCarousel } from "@/components/testimonial-carousel"
import { StatsSection } from "@/components/stats-section"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient py-20 md:py-32 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:20px_20px]" />
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6 animate-in">
            <h1 className="text-4xl md:text-6xl font-bold font-heading">
              Revolutionizing Global Research Collaboration
            </h1>
            <p className="text-lg md:text-xl text-white/80">
              Connect with researchers worldwide, secure funding, and accelerate innovation with our blockchain-powered
              platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" asChild className="bg-white text-[#4F46E5] hover:bg-white/90">
                <Link href="/explore">
                  Explore Projects
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-white text-[#4F46E5] hover:bg-white/90">
                <Link href="/about" className="z-10">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Animated particles or blockchain visualization could go here */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16 animate-in">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">Solving Key Challenges in Research</h2>
            <p className="text-muted-foreground">
              CollabVerse addresses critical problems in global research and innovation through our comprehensive
              platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Globe className="h-10 w-10 text-[#4F46E5]" />}
              title="Global Collaboration"
              description="Connect with researchers, students, and innovators across borders to share knowledge and accelerate innovation."
            />
            <FeatureCard
              icon={<DollarSign className="h-10 w-10 text-[#10B981]" />}
              title="Funding Marketplace"
              description="Access a sponsorship marketplace linking researchers to potential funders and simplifying the grant process."
            />
            <FeatureCard
              icon={<Users className="h-10 w-10 text-[#F59E0B]" />}
              title="Mentorship Network"
              description="Connect with experts in your field for guidance, feedback, and career development opportunities."
            />
            <FeatureCard
              icon={<Database className="h-10 w-10 text-[#4F46E5]" />}
              title="Blockchain Data Security"
              description="Secure your research data with blockchain technology ensuring ownership, integrity, and transparent sharing."
            />
            <FeatureCard
              icon={<FileText className="h-10 w-10 text-[#10B981]" />}
              title="Real-time Peer Reviews"
              description="Get faster feedback through our dynamic peer review system, accelerating the validation process."
            />
            <FeatureCard
              icon={<Briefcase className="h-10 w-10 text-[#F59E0B]" />}
              title="Commercialization Support"
              description="Transform your research into market-ready solutions with patenting, licensing, and partnership tools."
            />
          </div>
        </div>
      </section>

      {/* Blockchain Visual Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-in">
              <h2 className="text-3xl md:text-4xl font-bold font-heading">Powered by Blockchain Technology</h2>
              <p className="text-muted-foreground">
                Our platform leverages blockchain to ensure data ownership, secure sharing, and transparent
                collaboration across the research ecosystem.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Lock className="h-6 w-6 text-[#4F46E5] mt-0.5" />
                  <div>
                    <h3 className="font-medium">Secure Data Ownership</h3>
                    <p className="text-sm text-muted-foreground">
                      Maintain control of your research data with immutable blockchain records.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <FileText className="h-6 w-6 text-[#4F46E5] mt-0.5" />
                  <div>
                    <h3 className="font-medium">Transparent Peer Review</h3>
                    <p className="text-sm text-muted-foreground">
                      Track the entire review process with complete transparency and accountability.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Award className="h-6 w-6 text-[#4F46E5] mt-0.5" />
                  <div>
                    <h3 className="font-medium">Recognition System</h3>
                    <p className="text-sm text-muted-foreground">
                      Earn tokens and recognition for your contributions to the research community.
                    </p>
                  </div>
                </li>
              </ul>
              <Button asChild className="text-primary-foreground">
                <Link href="/blockchain">
                  Learn More About Our Blockchain Integration
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in">
              <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden border bg-card shadow-sm">
               
              </div>
              <div className="relative h-[300px] md:h-[400px]">
                <BlockchainVisual />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Research Trends Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16 animate-in">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">AI-Powered Research Trends</h2>
            <p className="text-muted-foreground">
              Stay ahead with real-time insights into emerging research areas and collaboration opportunities.
            </p>
          </div>
          <ResearchTrends />
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection />

      {/* Testimonials */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16 animate-in">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">What Researchers Are Saying</h2>
            <p className="text-muted-foreground">
              Hear from researchers and innovators who have transformed their work through CollabVerse.
            </p>
          </div>
          <TestimonialCarousel />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 hero-gradient text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6 animate-in">
            <h2 className="text-3xl md:text-4xl font-bold font-heading">Ready to Transform Your Research Journey?</h2>
            <p className="text-lg text-white/80">
              Join thousands of researchers, students, and innovators on CollabVerse today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" asChild className="bg-white text-[#4F46E5] hover:bg-white/90">
                <Link href="/signup">
                  Join CollabVerse
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-white text-[#4F46E5] hover:bg-white/90">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

