
"use client";

import { useEffect, useState } from "react";
import AllBookCard from "@/components/AllBooks/AllBookCard";
const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch("http://localhost:5000/books");
        const data = await res.json();

        setBooks(data);
      } catch (error) {
        console.error("Failed to fetch books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return <p className="text-center py-10">Loading books...</p>;
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">
        All Books
      </h1>

      {books.length === 0 ? (
        <p className="text-center text-muted-foreground">
          No books available.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <AllBookCard key={book._id} book={book} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Books;
