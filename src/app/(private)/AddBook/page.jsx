
"use client";

import { useState } from "react";
import { useSession } from "@/lib/auth-client";
import { toast } from "react-hot-toast";

import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

const AddBookForm = () => {
  const { data: session, isPending } = useSession();

  const user = session?.user;
  const router = useRouter();

  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    const bookData = {
      title: formData.get("title"),
      author: formData.get("author"),
      category,
      image,
      description: formData.get("description"),
      userName: user.name,
      userEmail: user.email,
    };

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookData),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Book adding failed");
      }

      toast.success("Book added successfully!");

      form.reset();
      setCategory("");
      setImage("");
      router.push("/AllBooks");
    } catch (error) {
      toast.error(error.message || "Something went wrong");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (isPending) {
    return <p className="text-center py-10">Loading...</p>;
  }

  if (!user) {
    return <p className="text-center py-10">Please login to add a book.</p>;
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <Card>
        <CardHeader>
          <CardTitle>Add Book</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <FieldGroup>
              <Field>
                <Label htmlFor="title">Book Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Enter book title"
                  required
                />
              </Field>

              <Field>
                <Label htmlFor="author">Author Name</Label>
                <Input
                  id="author"
                  name="author"
                  placeholder="Enter author name"
                  required
                />
              </Field>
              <Field>
                <Label htmlFor="image">Book Image URL</Label>
                <Input
                  id="image"
                  type="url"
                  placeholder="Enter image URL"
                  name="image"
                  value={image}
                  required
                  onChange={(e) => setImage(e.target.value)}
                />
              </Field>

              <Field>
                <Label>Category</Label>
                <Select
                  value={category}
                  onValueChange={setCategory}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="Fiction">Fiction</SelectItem>
                    <SelectItem value="Science">Science</SelectItem>
                    <SelectItem value="History">History</SelectItem>
                    <SelectItem value="Kids">Kids</SelectItem>
                    <SelectItem value="Others">Others</SelectItem>
                  </SelectContent>
                </Select>
              </Field>

              <Field>
                <Label htmlFor="description">Short Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Write a short description..."
                  rows={4}
                  required
                />
              </Field>

              <Field>
                <Label>User Name</Label>
                <Input value={user.name || ""} readOnly />
              </Field>

              <Field>
                <Label>User Email</Label>
                <Input value={user.email || ""} readOnly />
              </Field>
            </FieldGroup>

            <Button
              type="submit"
              className="w-full"
              disabled={loading || !category}
            >
              {loading ? "Adding Book..." : "Add Book"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddBookForm;
