
"use client";

import { useEffect, useState } from "react";
import MyBooksTable from "@/components/MyBooksTable";
import { useSession, authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { toast } from "sonner";

const Page = () => {
  const { data: session, isPending } = useSession();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      if (!session?.user?.email) return;

      try {
        const jwttoken = await authClient.token();

        if (!jwttoken?.data?.token) {
          throw new Error("JWT token not found");
        }

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_API_URL}/my-books/${encodeURIComponent(
            session.user.email
          )}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${jwttoken.data.token}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error(`Fetch failed: ${res.status}`);
        }

        const data = await res.json();
        setBooks(data);

      } catch (error) {
        console.error("Fetch books error:", error);
        toast.error(error.message);
      }
    };

    fetchBooks();
  }, [session]);

  const handleDelete = async (id) => {
    try {
       const jwttoken = await authClient.token();

        if (!jwttoken?.data?.token) {
          throw new Error("JWT token not found");
        }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API_URL}/books/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${jwttoken.data.token}`,
          },
          
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Delete failed");
      }

      setBooks((prev) =>
        prev.filter((book) => book._id !== id)
      );

      toast.success("Book deleted successfully!");

    } catch (error) {
      console.error("Delete error:", error);
      toast.error(error.message);
    }
  };

  if (isPending) {
    return <p className="text-center py-10">Loading...</p>;
  }

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <MyBooksTable books={books} onDelete={handleDelete} />
    </div>
  );
};

export default Page;
