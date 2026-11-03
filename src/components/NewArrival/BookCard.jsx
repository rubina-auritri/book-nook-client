import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function BookCard({ book }) {
  return (
    <div className="group overflow-hidden rounded-xl border bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      {/* Book Image */}
      <div className="relative h-64 overflow-hidden bg-gray-100">
        <Image
          src={book.image}
          alt={book.title}
          fill
          className="object-contain p-5 transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, 33vw"
        />
      </div>

      {/* Book Information */}
      <div className="space-y-3 p-5">

        <span className="inline-block rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600">
          {book.category}
        </span>

        <h3 className="line-clamp-1 text-lg font-bold text-gray-900">
          {book.title}
        </h3>

        <p className="text-sm text-gray-500">
          By {book.author}
        </p>

        <Link
          href={`/books/${book._id}`}
          className={buttonVariants({ className: "w-full" })}
        >
          View Details
        </Link>

      </div>
    </div>
  );
}