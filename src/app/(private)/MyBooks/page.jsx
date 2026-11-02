"use client";

import { useEffect, useState } from "react";
import MyBooksTable from "@/components/MyBooksTable";
import { useSession } from "@/lib/auth-client";
import { redirect } from "next/navigation";

const Page = () => {
  const { data: session, isPending } = useSession();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    if (session?.user?.email) {
      fetch(
        `http://localhost:5000/my-books?email=${encodeURIComponent(session.user.email)}`
      )
        .then((res) => res.json())
        .then((data) => setBooks(data))
        .catch((error) => console.error(error));
    }
  }, [session]);

  if (isPending) {
    return <p className="text-center py-10">Loading...</p>;
  }

  if (!session) {
    redirect("/login");
  }

  const handleDelete = async (id) => {
  try {
    const res = await fetch(
      `http://localhost:5000/books/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!res.ok) throw new Error("Delete failed");

    setBooks((prev) =>
      prev.filter((book) => book._id !== id)
    );

    toast.success("Book deleted successfully!");
  } catch (error) {
    toast.error("Failed to delete book!");
  }
};


  return (
    <div className="container mx-auto px-4 py-12">
      <MyBooksTable books={books} onDelete={handleDelete} />
    </div>
  );
};

export default Page;