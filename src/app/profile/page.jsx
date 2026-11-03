"use client";

import { useSession } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  User,
  Mail,
  CalendarDays,
  BookOpen,
  Settings,
  Pencil,
} from "lucide-react";

export default function ProfilePage() {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-bold">Please Login</h2>
        <p>You need to login to view your profile.</p>
        <Button asChild>
          <Link href="/login">Login Now</Link>
        </Button>
      </div>
    );
  }

  const user = session.user;

  return (
    <main className="container mx-auto max-w-5xl px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">My Profile</h1>
        <p className="mt-2 text-muted-foreground">
          Manage your BookNook account information.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Profile Card */}
        <Card className="md:col-span-1">
          <CardContent className="flex flex-col items-center pt-8 text-center">
            <Avatar className="h-28 w-28">
              <AvatarImage
                src={user.image || ""}
                alt={user.name}
              />
              <AvatarFallback className="text-3xl">
                {user.name?.charAt(0)?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>

            <h2 className="mt-4 text-xl font-bold">
              {user.name}
            </h2>

            <p className="text-sm text-muted-foreground">
              {user.email}
            </p>

            <div className="mt-5 w-full">
              <Button asChild className="w-full">
                <Link href="/profile-update">
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit Profile
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Account Information */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>
              Your personal account details.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="flex items-center gap-4">
              <User className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">
                  Full Name
                </p>
                <p className="font-medium">{user.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Mail className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">
                  Email Address
                </p>
                <p className="font-medium">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <CalendarDays className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">
                  Member Since
                </p>
                <p className="font-medium">
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "Not available"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Links */}
      <div className="mt-8">
        <h2 className="mb-4 text-xl font-bold">Quick Access</h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <Card>
            <CardContent className="flex items-center justify-between p-5">
              <div className="flex items-center gap-3">
                <BookOpen className="h-6 w-6 text-primary" />
                <div>
                  <h3 className="font-semibold">My Books</h3>
                  <p className="text-sm text-muted-foreground">
                    Manage your added books.
                  </p>
                </div>
              </div>

              <Button variant="outline" asChild>
                <Link href="/my-books">View</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center justify-between p-5">
              <div className="flex items-center gap-3">
                <Settings className="h-6 w-6 text-primary" />
                <div>
                  <h3 className="font-semibold">Account Settings</h3>
                  <p className="text-sm text-muted-foreground">
                    Update your profile.
                  </p>
                </div>
              </div>

              <Button variant="outline" asChild>
                <Link href="/profile-update">Edit</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}