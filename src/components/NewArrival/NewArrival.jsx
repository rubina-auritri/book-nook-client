
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import BookCard from "@/components/NewArrival/BookCard";
import { buttonVariants } from "@/components/ui/button";

export default function NewArrivals() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch latest 6 books
  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_API_URL}/new-arrivals`
        );
        console.log(response);

        if (!response.ok) {
          throw new Error("Failed to load new arrivals");
        }

        const data = await response.json();
        setBooks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchBooks();
  }, []);

  return (
    <section className="container mx-auto px-4 py-16 md:py-20">

      {/* Section Heading */}
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-indigo-600">
            Fresh From Our Shelves
          </p>

          <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
            New Arrivals
          </h2>

          <p className="mt-3 text-gray-500">
            Discover the latest additions to our book collection.
          </p>
        </div>

        <Link
          href="/AllBooks"
          className="hidden items-center gap-2 font-semibold text-indigo-600 transition hover:gap-3 sm:flex"
        >
          Explore All Books
          <ArrowRight size={18} />
        </Link>
      </div>

      {/* Loading */}
      {loading && (
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-80 animate-pulse rounded-xl bg-gray-100"
            />
          ))}
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <p className="py-10 text-center text-red-500">
          {error}
        </p>
      )}

      {/* Book Cards */}
      {!loading && !error && books.length > 0 && (
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-6">
          {books.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      )}

      {/* Empty */}
      {!loading && !error && books.length === 0 && (
        <p className="py-10 text-center text-gray-500">
          No books available yet.
        </p>
      )}

      {/* See All Books */}
      <div className="mt-10 text-center">
        <Link
          href="/AllBooks"
          className={buttonVariants({
            size: "lg",
            className: "rounded-full px-8",
          })}
        >
          See All Books
          <ArrowRight className="ml-2" size={18} />
        </Link>
      </div>

    </section>
  );
}
