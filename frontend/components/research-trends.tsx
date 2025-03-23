"use client"

import { useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell } from "recharts"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Sample data for research trends
const trendingTopics = [
  { name: "AI in Healthcare", value: 89, growth: "+24%" },
  { name: "Quantum Computing", value: 76, growth: "+18%" },
  { name: "Climate Solutions", value: 72, growth: "+15%" },
  { name: "Blockchain Applications", value: 68, growth: "+21%" },
  { name: "Renewable Energy", value: 65, growth: "+12%" },
  { name: "Biotechnology", value: 61, growth: "+9%" },
]

const fundingOpportunities = [
  { name: "Sustainable Tech", value: 92, growth: "+28%" },
  { name: "Medical Research", value: 85, growth: "+19%" },
  { name: "AI Ethics", value: 74, growth: "+32%" },
  { name: "Space Exploration", value: 68, growth: "+15%" },
  { name: "Food Security", value: 63, growth: "+11%" },
  { name: "Education Tech", value: 59, growth: "+14%" },
]

const collaborationHotspots = [
  { name: "North America", value: 87, growth: "+12%" },
  { name: "Europe", value: 82, growth: "+15%" },
  { name: "Asia Pacific", value: 78, growth: "+24%" },
  { name: "Middle East", value: 65, growth: "+29%" },
  { name: "Africa", value: 58, growth: "+35%" },
  { name: "South America", value: 54, growth: "+22%" },
]

export function ResearchTrends() {
  const [activeTab, setActiveTab] = useState("trending")

  const getActiveData = () => {
    switch (activeTab) {
      case "trending":
        return trendingTopics
      case "funding":
        return fundingOpportunities
      case "hotspots":
        return collaborationHotspots
      default:
        return trendingTopics
    }
  }

  const getTitle = () => {
    switch (activeTab) {
      case "trending":
        return "Trending Research Topics"
      case "funding":
        return "Top Funding Opportunities"
      case "hotspots":
        return "Global Collaboration Hotspots"
      default:
        return "Research Trends"
    }
  }

  const getDescription = () => {
    switch (activeTab) {
      case "trending":
        return "Most active research areas based on publication volume and citation impact"
      case "funding":
        return "Areas with the highest funding availability and growth potential"
      case "hotspots":
        return "Regions with the most active research collaboration networks"
      default:
        return "AI-powered insights into the research landscape"
    }
  }

  return (
    <Card className="animate-in">
      <CardHeader>
        <Tabs defaultValue="trending" onValueChange={setActiveTab}>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <CardTitle>{getTitle()}</CardTitle>
              <CardDescription>{getDescription()}</CardDescription>
            </div>
            <TabsList>
              <TabsTrigger value="trending">Topics</TabsTrigger>
              <TabsTrigger value="funding">Funding</TabsTrigger>
              <TabsTrigger value="hotspots">Regions</TabsTrigger>
            </TabsList>
          </div>
        </Tabs>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[400px] overflow-hidden">
          <ChartContainer
            config={{
              value: {
                label: "Impact Score",
                color: "hsl(var(--primary))",
              },
            }}
            className="h-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={getActiveData()} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 12 }} />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={100}
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => (value.length > 15 ? `${value.substring(0, 15)}...` : value)}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {getActiveData().map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        index % 3 === 0
                          ? "var(--color-value)"
                          : index % 3 === 1
                            ? "hsl(var(--secondary))"
                            : "hsl(var(--accent))"
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mt-6">
          {getActiveData().map((item, index) => (
            <Card key={index} className="bg-muted/50">
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground truncate">{item.name}</p>
                <div className="flex items-end justify-between mt-1">
                  <p className="text-2xl font-bold">{item.value}</p>
                  <p className="text-xs font-medium text-collab-secondary">{item.growth}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

