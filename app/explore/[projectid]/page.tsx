"use client"; // Mark as a Client Component

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ref, get, push, set } from "firebase/database";
import { database } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Heart, MessageCircle, Loader2 } from "lucide-react"; // Icons for likes and comments

export default function ProjectPage() {
  const { projectid } = useParams(); // Get the projectId from the URL
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState(""); // State for the comment input
  const [likes, setLikes] = useState(0); // State for likes count
  const [hasLiked, setHasLiked] = useState(false); // State to track if the user has liked the project
  const [comments, setComments] = useState([]); // State to store comments

  console.log("Project ID:", projectid); // Debugging

  // Fetch project data
  useEffect(() => {
    const fetchProject = async () => {
      try {
        // Reference to the "users" node
        const usersRef = ref(database, "users");
        const snapshot = await get(usersRef);

        if (snapshot.exists()) {
          const users = snapshot.val();
          let foundProject = null;

          // Loop through users to find the project
          Object.keys(users).forEach((userId) => {
            const userProjects = users[userId].projects;
            if (userProjects && userProjects[projectid]) {
              foundProject = {
                id: projectid,
                userId,
                ...userProjects[projectid],
              };
            }
          });

          if (foundProject) {
            setProject(foundProject);
            setLikes(foundProject.likes || 0); // Initialize likes count

            // Check if the current user has already liked the project
            if (foundProject.likedBy && foundProject.likedBy[projectid]) {
              setHasLiked(true);
            }

            // Fetch comments
            const commentsRef = ref(database, `users/${foundProject.userId}/projects/${projectid}/comments`);
            const commentsSnapshot = await get(commentsRef);
            if (commentsSnapshot.exists()) {
              const commentsData = commentsSnapshot.val();
              // Convert Firebase object to an array
              const commentsArray = Object.keys(commentsData).map((key) => ({
                id: key, // Use the Firebase key as the comment ID
                ...commentsData[key], // Spread the comment data
              }));
              setComments(commentsArray);
            }
          } else {
            console.log("Project not found.");
          }
        } else {
          console.log("No projects found in Firebase.");
        }
      } catch (error) {
        console.error("Error fetching project:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectid]);

  // Handle like functionality
  const handleLike = async () => {
    if (!project || hasLiked) return; // Exit if user has already liked

    try {
      const projectRef = ref(database, `users/${project.userId}/projects/${projectid}`);
      const updatedLikes = likes + 1; // Increment likes count

      // Update the project with the new likes count and mark the user as having liked it
      await set(projectRef, {
        ...project,
        likes: updatedLikes,
        likedBy: {
          ...project.likedBy,
          [projectid]: true, // Mark that the user has liked the project
        },
      });

      setLikes(updatedLikes); // Update local state
      setHasLiked(true); // Mark that the user has liked the project
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  // Handle comment functionality
  const handleComment = async () => {
    if (!comment.trim() || !project) return; // Don't add empty comments

    try {
      const commentsRef = ref(database, `users/${project.userId}/projects/${projectid}/comments`);
      const newComment = {
        text: comment,
        timestamp: new Date().toISOString(),
        author: "Current User", // Replace with actual user data
      };
      const newCommentRef = await push(commentsRef, newComment); // Add comment to Firebase

      // Update local state to show the new comment
      setComments((prevComments) => [
        ...prevComments,
        {
          id: newCommentRef.key, // Use the Firebase key as the comment ID
          ...newComment,
        },
      ]);

      setComment(""); // Clear the comment input
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  if (loading) {
    return (
      <div className="container py-8 text-center">
        <Loader2 className="h-8 w-8 animate-spin" /> {/* Loading spinner */}
      </div>
    );
  }

  if (!project) {
    return <div className="container py-8 text-center">Project not found.</div>;
  }

  return (
    <div className="container py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">{project.title}</CardTitle>
          <CardDescription className="text-muted-foreground">{project.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Author */}
          <div>
            <h2 className="text-xl font-semibold">Author</h2>
            <p>{project.author.name} ({project.author.institution})</p>
          </div>

          {/* Skills Required */}
          <div>
            <h2 className="text-xl font-semibold">Skills Required</h2>
            <div className="flex flex-wrap gap-2">
              {project.skillsRequired.map((skill, index) => (
                <Badge key={index} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {/* Funding Goal */}
          <div>
            <h2 className="text-xl font-semibold">Funding Goal</h2>
            <p>${project.fundingGoal}</p>
          </div>

          {/* Collaborators */}
          <div>
            <h2 className="text-xl font-semibold">Collaborators</h2>
            <p>{project.numCollaborators} collaborators</p>
          </div>

          {/* Location */}
          <div>
            <h2 className="text-xl font-semibold">Location</h2>
            <p>{project.location}</p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          {/* Like Button */}
          <Button onClick={handleLike} disabled={hasLiked}>
            <Heart className="h-4 w-4 mr-2" />
            {hasLiked ? "Liked" : "Like"} ({likes})
          </Button>

          {/* Comment Section */}
          <div className="w-full">
            <h2 className="text-xl font-semibold mb-4">Comments</h2>
            <div className="space-y-4">
              {/* Display Comments */}
              {comments.map((comment) => (
                <div key={comment.id} className="border p-4 rounded-lg">
                  <p>{comment.text}</p>
                  <p className="text-sm text-muted-foreground">
                    {comment.author} - {new Date(comment.timestamp).toLocaleString()}
                  </p>
                </div>
              ))}

              {/* Add Comment */}
              <Input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add a comment..."
              />
              <Button onClick={handleComment}>
                <MessageCircle className="h-4 w-4 mr-2" />
                Add Comment
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}