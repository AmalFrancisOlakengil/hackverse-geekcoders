"use client"; // Mark as a Client Component

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ref, push } from "firebase/database";
import { database, auth } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { DollarSign, Calendar as CalendarIcon, Tag, Bookmark, Users, Award } from "lucide-react";

export default function PostFundingPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    deadline: "",
    category: "",
    org: "",
    description: "",
    tags: "",
  });
  const [loading, setLoading] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const user = auth.currentUser;
    if (!user) {
      alert("You must be signed in to add a project.");
      router.push("/signin"); // Redirect to sign-in page
      return;
    }

    const userId = user.uid;

    try {
      // Push the new funding opportunity to Firebase
      const fundingRef = ref(database,`users/${userId}/funding/`);
      await push(fundingRef, {
        ...formData,
        createdAt: new Date().toISOString(), // Add a timestamp
      });

      // Redirect to the funding page after successful submission
      router.push("/funding");
    } catch (error) {
      console.error("Error posting funding opportunity:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Post a Funding Opportunity</CardTitle>
          <p className="text-muted-foreground">
            Fill out the form below to post a new funding opportunity for researchers.
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-2">
                Title
              </label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter the title of the funding opportunity"
                required
              />
            </div>

            {/* Amount (in ETH) */}
            <div>
              <label htmlFor="amount" className="block text-sm font-medium mb-2">
                Amount (in ETH)
              </label>
              <Input
                id="amount"
                name="amount"
                type="number"
                value={formData.amount}
                onChange={handleChange}
                placeholder="Enter the funding amount"
                required
              />
            </div>

            {/* Deadline */}
            <div>
              <label htmlFor="deadline" className="block text-sm font-medium mb-2">
                Deadline
              </label>
              <Input
                id="deadline"
                name="deadline"
                type="date"
                value={formData.deadline}
                onChange={handleChange}
                required
              />
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium mb-2">
                Category
              </label>
              <Select name="category" value={formData.category} onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Grant">Grant</SelectItem>
                  <SelectItem value="Scholarship">Scholarship</SelectItem>
                  <SelectItem value="Fellowship">Fellowship</SelectItem>
                  <SelectItem value="Venture">Venture Capital</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Organization */}
            <div>
              <label htmlFor="org" className="block text-sm font-medium mb-2">
                Organization
              </label>
              <Input
                id="org"
                name="org"
                value={formData.org}
                onChange={handleChange}
                placeholder="Enter the name of the organization"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-2">
                Description
              </label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Provide a detailed description of the funding opportunity"
                required
              />
            </div>

            {/* Tags */}
            <div>
              <label htmlFor="tags" className="block text-sm font-medium mb-2">
                Tags (comma-separated)
              </label>
              <Input
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="e.g., Climate, AI, Healthcare"
                required
              />
            </div>

            {/* Submit Button */}
            <CardFooter className="flex justify-end p-0">
              <Button type="submit" disabled={loading}>
                {loading ? "Posting..." : "Post Opportunity"}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}