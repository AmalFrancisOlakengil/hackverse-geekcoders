"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth, database } from "@/lib/firebase";
import { ref, set } from "firebase/database"; // Import Realtime Database functions
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox"; // Import Checkbox component

export default function AddProject() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fundingGoal, setFundingGoal] = useState("");
  const [numCollaborators, setNumCollaborators] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [dateOfCreation, setDateOfCreation] = useState("");
  const [projectCategory, setProjectCategory] = useState("");
  const [skillsRequired, setSkillsRequired] = useState("");
  const [openToCollaborators, setOpenToCollaborators] = useState(true); // Default: true
  const [fundingAvailable, setFundingAvailable] = useState(false); // Default: false
  const [seekingMentorship, setSeekingMentorship] = useState(false); // Default: false
  const [remoteCollaboration, setRemoteCollaboration] = useState(false); // Default: false
  const [authorName, setAuthorName] = useState(""); // New field
  const [authorInstitution, setAuthorInstitution] = useState(""); // New field
  const [location, setLocation] = useState(""); // New field
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const user = auth.currentUser;
    if (!user) {
      alert("You must be signed in to add a project.");
      router.push("/signin"); // Redirect to sign-in page
      return;
    }

    const userId = user.uid;

    // Validate required fields
    if (
      !title ||
      !description ||
      !fundingGoal ||
      !numCollaborators ||
      !githubLink ||
      !dateOfCreation ||
      !projectCategory ||
      !skillsRequired ||
      !authorName ||
      !authorInstitution ||
      !location
    ) {
      setError("All fields are required.");
      return;
    }

    try {
      // Create a new project object
      const projectData = {
        title,
        description,
        fundingGoal: parseFloat(fundingGoal),
        numCollaborators: parseInt(numCollaborators, 10),
        githubLink,
        dateOfCreation,
        projectCategory,
        skillsRequired: skillsRequired.split(",").map((skill) => skill.trim()), // Convert comma-separated string to array
        createdAt: new Date().toISOString(), // Store timestamp
        userId, // Associate the project with the user
        openToCollaborators, // From form
        fundingAvailable, // From form
        seekingMentorship, // From form
        remoteCollaboration, // From form
        author: {
          name: authorName, // New field
          institution: authorInstitution, // New field
        },
        location, // New field
      };

      // Save the project data under the user's ID in Realtime Database
      const projectRef = ref(database, `users/${userId}/projects/${Date.now()}`); // Unique key for the project
      await set(projectRef, projectData);

      alert("Project added successfully!");
      router.push("/explore"); // Redirect to explore page
    } catch (error) {
      console.error("Error adding project: ", error);
      setError(`Failed to add project. Error: ${error.message}`);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add a New Project</h1>
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Project Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-1">
            Project Title
          </label>
          <Input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter project title"
            required
          />
        </div>

        {/* Project Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-1">
            Project Description
          </label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your project"
            required
          />
        </div>

        {/* Funding Goal */}
        <div>
          <label htmlFor="fundingGoal" className="block text-sm font-medium mb-1">
            Funding Goal ($)
          </label>
          <Input
            id="fundingGoal"
            type="number"
            value={fundingGoal}
            onChange={(e) => setFundingGoal(e.target.value)}
            placeholder="Enter funding goal"
            required
          />
        </div>

        {/* Number of Collaborators */}
        <div>
          <label htmlFor="numCollaborators" className="block text-sm font-medium mb-1">
            Number of Collaborators
          </label>
          <Input
            id="numCollaborators"
            type="number"
            value={numCollaborators}
            onChange={(e) => setNumCollaborators(e.target.value)}
            placeholder="Enter number of collaborators"
            required
          />
        </div>

        {/* GitHub Link */}
        <div>
          <label htmlFor="githubLink" className="block text-sm font-medium mb-1">
            GitHub Link
          </label>
          <Input
            id="githubLink"
            type="url"
            value={githubLink}
            onChange={(e) => setGithubLink(e.target.value)}
            placeholder="Enter GitHub link"
            required
          />
        </div>

        {/* Date of Creation */}
        <div>
          <label htmlFor="dateOfCreation" className="block text-sm font-medium mb-1">
            Date of Creation
          </label>
          <Input
            id="dateOfCreation"
            type="date"
            value={dateOfCreation}
            onChange={(e) => setDateOfCreation(e.target.value)}
            required
          />
        </div>

        {/* Project Category */}
        <div>
          <label htmlFor="projectCategory" className="block text-sm font-medium mb-1">
            Project Category
          </label>
          <Select onValueChange={(value) => setProjectCategory(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="web-development">Web Development</SelectItem>
              <SelectItem value="ai">Artificial Intelligence</SelectItem>
              <SelectItem value="blockchain">Blockchain</SelectItem>
              <SelectItem value="mobile-app">Mobile App</SelectItem>
              <SelectItem value="data-science">Data Science</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Skills Required */}
        <div>
          <label htmlFor="skillsRequired" className="block text-sm font-medium mb-1">
            Skills Required (comma-separated)
          </label>
          <Input
            id="skillsRequired"
            type="text"
            value={skillsRequired}
            onChange={(e) => setSkillsRequired(e.target.value)}
            placeholder="e.g., React, Solidity, Python"
            required
          />
        </div>

        {/* Author Name */}
        <div>
          <label htmlFor="authorName" className="block text-sm font-medium mb-1">
            Author Name
          </label>
          <Input
            id="authorName"
            type="text"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            placeholder="Enter author name"
            required
          />
        </div>

        {/* Author Institution */}
        <div>
          <label htmlFor="authorInstitution" className="block text-sm font-medium mb-1">
            Author Institution
          </label>
          <Input
            id="authorInstitution"
            type="text"
            value={authorInstitution}
            onChange={(e) => setAuthorInstitution(e.target.value)}
            placeholder="Enter author institution"
            required
          />
        </div>

        {/* Location */}
        <div>
          <label htmlFor="location" className="block text-sm font-medium mb-1">
            Location
          </label>
          <Input
            id="location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter project location (e.g., City, Country)"
            required
          />
        </div>

        {/* Open to Collaborators */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="openToCollaborators"
            checked={openToCollaborators}
            onCheckedChange={(checked) => setOpenToCollaborators(checked)}
          />
          <label htmlFor="openToCollaborators" className="text-sm font-medium">
            Open to New Collaborators
          </label>
        </div>

        {/* Funding Available */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="fundingAvailable"
            checked={fundingAvailable}
            onCheckedChange={(checked) => setFundingAvailable(checked)}
          />
          <label htmlFor="fundingAvailable" className="text-sm font-medium">
            Funding Available
          </label>
        </div>

        {/* Seeking Mentorship */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="seekingMentorship"
            checked={seekingMentorship}
            onCheckedChange={(checked) => setSeekingMentorship(checked)}
          />
          <label htmlFor="seekingMentorship" className="text-sm font-medium">
            Seeking Mentorship
          </label>
        </div>

        {/* Remote Collaboration */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="remoteCollaboration"
            checked={remoteCollaboration}
            onCheckedChange={(checked) => setRemoteCollaboration(checked)}
          />
          <label htmlFor="remoteCollaboration" className="text-sm font-medium">
            Remote Collaboration
          </label>
        </div>

        {/* Submit Button */}
        <Button type="submit">Add Project</Button>
      </form>
    </div>
  );
}