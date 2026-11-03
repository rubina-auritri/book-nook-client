"use client";

import { useState, useEffect } from "react";
import { useSession, updateUser } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { ArrowLeft, Camera, Loader2, Save } from "lucide-react";
import Link from "next/link";

export default function ProfileUpdatePage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "");
      setImage(session.user.image || "");
    }
  }, [session]);

  if (isPending) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-bold">Please Login</h2>
        <Button asChild>
          <Link href="/login">Login Now</Link>
        </Button>
      </div>
    );
  }

  const user = session.user;

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Name is required");
      return;
    }

    setLoading(true);

    try {
      const { error } = await updateUser({
        name: name.trim(),
        image: image.trim() || null,
      });

      if (error) {
        toast.error(error.message || "Failed to update profile");
        return;
      }

      toast.success("Profile updated successfully!");

      router.push("/profile");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container mx-auto max-w-2xl px-4 py-12">
      <Button variant="ghost" asChild className="mb-6">
        <Link href="/profile">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Profile
        </Link>
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">
            Update Profile
          </CardTitle>
          <CardDescription>
            Update your BookNook account information.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleUpdate} className="space-y-6">

            {/* Profile Image */}
            <div className="flex flex-col items-center gap-4">
              <Avatar className="h-28 w-28">
                <AvatarImage src={image} alt={name} />
                <AvatarFallback className="text-3xl">
                  {name?.charAt(0)?.toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>

              <div className="w-full space-y-2">
                <Label htmlFor="image">
                  <Camera className="mr-2 inline h-4 w-4" />
                  Profile Image URL
                </Label>

                <Input
                  id="image"
                  type="url"
                  placeholder="https://example.com/photo.jpg"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
              </div>
            </div>

            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                required
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={user.email || ""}
                disabled
              />
              <p className="text-xs text-muted-foreground">
                Email address cannot be changed here.
              </p>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>

          </form>
        </CardContent>
      </Card>
    </main>
  );
}