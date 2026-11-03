
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "@/lib/auth-client";
import { toast } from "react-hot-toast";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  BookOpen,
  CalendarDays,
  RotateCcw,
  Loader2,
  Library,
} from "lucide-react";

export default function MyBorrows() {
 const { data: session, isPending } = useSession();

  const [borrows, setBorrows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [returningId, setReturningId] = useState(null);

  useEffect(() => {
    if (isPending || !session?.user?.email) return;

    const fetchBorrows = async () => {
      try {
        const tokenResponse = await fetch("/api/auth/token");
        const tokenData = await tokenResponse.json();

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_API_URL}/my-borrows`,
          {
            headers: {
              Authorization: `Bearer ${tokenData.token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch borrows");
        }

        const data = await response.json();
        setBorrows(data);
      } catch (error) {
        toast.error("Failed to load borrowed books");
      } finally {
        setLoading(false);
      }
    };

    fetchBorrows();
  }, [isPending, session?.user?.email]);

  const handleReturn = async (id) => {
    setReturningId(id);

    try {
      const tokenResponse = await fetch("/api/auth/token");
      const tokenData = await tokenResponse.json();

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API_URL}/borrows/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${tokenData.token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Failed to return book");
        return;
      }

      toast.success("Book returned successfully");

      setBorrows((prev) =>
        prev.filter((book) => book._id !== id)
      );
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setReturningId(null);
    }
  };

  const isLoading =
    isPending || (loading && Boolean(session?.user?.email));

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-center items-center gap-3">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
          <p className="text-muted-foreground">
            Loading your borrowed books...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container mx-auto px-4 py-12">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 rounded-xl bg-primary/10">
              <Library className="h-7 w-7 text-primary" />
            </div>

            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                My Borrows
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Manage your borrowed books and return dates.
              </p>
            </div>
          </div>
        </div>

     
        <Card className="mb-8 border-none shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-primary/10">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  Currently Borrowed
                </p>
                <h2 className="text-3xl font-bold">
                  {borrows.length}
                </h2>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Borrow Table */}
        <Card className="border-none shadow-sm overflow-hidden">
          <CardHeader className="border-b">
            <CardTitle>Borrowed Books</CardTitle>
            <CardDescription>
              A list of all books you have borrowed.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-0">

            {borrows.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="rounded-full bg-muted p-5 mb-4">
                  <BookOpen className="h-10 w-10 text-muted-foreground" />
                </div>

                <h3 className="text-xl font-semibold">
                  No borrowed books
                </h3>

                <p className="text-sm text-muted-foreground mt-2">
                  You haven&apos;t borrowed any books yet.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/40">
                      <TableHead className="pl-6">Book</TableHead>
                      <TableHead>Borrow Date</TableHead>
                      <TableHead>Return Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right pr-6">
                        Action
                      </TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {borrows.map((book) => {
                      const isOverdue =
                        new Date(book.returnDate) < new Date();

                      return (
                        <TableRow
                          key={book._id}
                          className="hover:bg-muted/30 transition-colors"
                        >
                          {/* Book Image and Title */}
                          <TableCell className="pl-6">
                            <div className="flex items-center gap-3 min-w-[200px]">
                              <div className="relative w-12 h-16 shrink-0 overflow-hidden rounded-md border bg-muted">
                                <Image
                                  src={book.bookImage}
                                  alt={book.bookTitle}
                                  fill
                                  sizes="48px"
                                  className="object-cover"
                                />
                              </div>

                              <div>
                                <p className="font-semibold line-clamp-2">
                                  {book.bookTitle}
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  Borrowed Book
                                </p>
                              </div>
                            </div>
                          </TableCell>

                          {/* Borrow Date */}
                          <TableCell>
                            <div className="flex items-center gap-2 text-sm">
                              <CalendarDays className="h-4 w-4 text-muted-foreground" />
                              {new Date(
                                book.borrowDate
                              ).toLocaleDateString()}
                            </div>
                          </TableCell>

                          {/* Return Date */}
                          <TableCell>
                            <div className="text-sm">
                              {new Date(
                                book.returnDate
                              ).toLocaleDateString()}
                            </div>
                          </TableCell>

                          {/* Status */}
                          <TableCell>
                            <Badge
                              variant={isOverdue ? "destructive" : "secondary"}
                            >
                              {isOverdue ? "Overdue" : "Borrowed"}
                            </Badge>
                          </TableCell>

                          {/* Return Button */}
                          <TableCell className="text-right pr-6">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleReturn(book._id)}
                              disabled={returningId === book._id}
                              className="gap-2"
                            >
                              {returningId === book._id ? (
                                <>
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                  Returning...
                                </>
                              ) : (
                                <>
                                  <RotateCcw className="h-4 w-4" />
                                  Return Book
                                </>
                              )}
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            )}

          </CardContent>
        </Card>

      </div>
    </div>
  );
}