"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";

import { toast } from "react-hot-toast";
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
    CardDescription,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const EditBook = () => {
    const { id } = useParams();
    const router = useRouter();

    const { data: session } = authClient.useSession();

    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    const [book, setBook] = useState({
        title: "",
        author: "",
        category: "",
        image: "",
        description: "",
    });

    // Get existing book data
    useEffect(() => {
        if (!session?.user?.email || !id) return;

        const fetchBook = async () => {

            try {
                const jwttoken = await authClient.token();
                if (!jwttoken?.data?.token) {
                    throw new Error("JWT token not found");
                }
                const res = await fetch(
                    `http://localhost:5000/books/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${jwttoken.data.token}`,
                        },
                    }
                );

                if (!res.ok) {
                    throw new Error("Book not found");
                }

                const data = await res.json();

                // Only the owner can edit
                if (data.userEmail !== session.user.email) {
                    toast.error("You cannot edit this book");
                    router.push("/my-books");
                    return;
                }

                setBook({
                    title: data.title || "",
                    author: data.author || "",
                    category: data.category || "",
                    image: data.image || "",
                    description: data.description || "",
                });
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBook();
    }, [id, session, router]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;

        setBook((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Update book
    const handleSubmit = async (e) => {
        e.preventDefault();

        setUpdating(true);

        try {
            const jwttoken = await authClient.token();
                if (!jwttoken?.data?.token) {
                    throw new Error("JWT token not found");
                }
            const res = await fetch(
                `http://localhost:5000/books/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                         Authorization: `Bearer ${jwttoken.data.token}`,
                    },
                    body: JSON.stringify({
                        ...book,
                        userEmail: session.user.email,
                    }),
                }
            );

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Update failed");
            }

            toast.success("Book updated successfully!");

            router.push("/MyBooks");
            router.refresh();

        } catch (error) {
            toast.error(error.message);
        } finally {
            setUpdating(false);
        }
    };

    if (loading) {
        return (
            <div className="text-center py-20">
                Loading book details...
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-10">

            <Card className="max-w-2xl mx-auto">

                <CardHeader>
                    <CardTitle className="text-2xl">
                        Edit Book
                    </CardTitle>

                    <CardDescription>
                        Update your book information below.
                    </CardDescription>
                </CardHeader>

                <CardContent>

                    <form onSubmit={handleSubmit} className="space-y-5">

                        {/* Title */}
                        <div className="space-y-2">
                            <Label>Book Title</Label>

                            <Input
                                name="title"
                                value={book.title}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Author */}
                        <div className="space-y-2">
                            <Label>Author</Label>

                            <Input
                                name="author"
                                value={book.author}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Category */}
                        <div className="space-y-2">
                            <Label>Category</Label>

                            <Select
                                value={book.category}
                                onValueChange={(value) =>
                                    setBook((prev) => ({
                                        ...prev,
                                        category: value,
                                    }))
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectItem value="Fiction">Fiction</SelectItem>
                                    <SelectItem value="Non-Fiction">Non-Fiction</SelectItem>
                                    <SelectItem value="Science">Science</SelectItem>
                                    <SelectItem value="History">History</SelectItem>
                                    <SelectItem value="Biography">Biography</SelectItem>
                                    <SelectItem value="Fantasy">Fantasy</SelectItem>
                                    <SelectItem value="Mystery">Mystery</SelectItem>
                                    <SelectItem value="Technology">Technology</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Image */}
                        <div className="space-y-2">
                            <Label>Image URL</Label>

                            <Input
                                type="url"
                                name="image"
                                value={book.image}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <Label>Description</Label>

                            <Textarea
                                name="description"
                                value={book.description}
                                onChange={handleChange}
                                rows={5}
                                required
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={updating}
                        >
                            {updating ? "Updating..." : "Update Book"}
                        </Button>

                    </form>

                </CardContent>
            </Card>

        </div>
    );
};

export default EditBook;