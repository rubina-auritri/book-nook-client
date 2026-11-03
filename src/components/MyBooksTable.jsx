"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function MyBooksTable({ books, onDelete }) {
    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Image</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Author</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {books.length > 0 ? (
                        books.map((book) => (
                            <TableRow key={book._id}>
                                <TableCell>
                                    <img
                                        src={book.image}
                                        alt={book.title}
                                        className="h-14 w-12 rounded object-cover"
                                    />
                                </TableCell>

                                <TableCell className="font-medium">
                                    {book.title}
                                </TableCell>

                                <TableCell>{book.author}</TableCell>

                                <TableCell>{book.category}</TableCell>

                                <TableCell>
                                    <div className="flex gap-2">
                                        <Link
                                            href={`/edit-book/${book._id}`}
                                            className={buttonVariants({ size: "sm" })}
                                        >
                                            Edit
                                        </Link>

                                        <AlertDialog>
                                            <AlertDialogTrigger
                                                render={
                                                    <Button size="sm" variant="destructive" />
                                                }
                                            >
                                                Delete
                                            </AlertDialogTrigger>

                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>
                                                        Are you sure?
                                                    </AlertDialogTitle>

                                                    <AlertDialogDescription>
                                                        Do you want to delete {book.title}?
                                                        This action cannot be undone.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>

                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>
                                                        Cancel
                                                    </AlertDialogCancel>

                                                    <AlertDialogAction
                                                        onClick={() => onDelete(book._id)}
                                                        className="bg-destructive text-white hover:bg-destructive/90"
                                                    >
                                                        Yes, Delete
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={5}
                                className="h-24 text-center"
                            >
                                No books found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}