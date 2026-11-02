import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";


const BookDetails = async ({ params }) => {
  const { id } = await params;
  const jwttoken = await auth.api.getToken({
  headers: await headers(),
});
  const response = await fetch(
    `http://localhost:5000/books/${id}`,
    {
      cache: "no-store",
      headers: {
              Authorization: `Bearer ${jwttoken.token}`,
            },
    },

  );

  if (response.status === 404) {
    notFound();
  }

  if (!response.ok) {
    throw new Error("Failed to fetch book details");
  }

  const book = await response.json();

  return (
    <div className="container mx-auto px-4 py-12">

      <Card className="max-w-5xl mx-auto overflow-hidden shadow-lg">

        <div className="grid md:grid-cols-2">

          {/* Book Image */}
          <div className="bg-muted flex items-center justify-center p-8">
            <img
              src={book.image}
              alt={book.title}
              className="w-full max-w-sm h-[400px] object-contain rounded-lg"
            />
          </div>

          {/* Book Information */}
          <div className="p-6 md:p-10">

            <CardHeader className="p-0 space-y-4">

              <Badge className="w-fit">
                {book.category}
              </Badge>

              <CardTitle className="text-3xl font-bold">
                {book.title}
              </CardTitle>

              <p className="text-muted-foreground">
                By {book.author}
              </p>

            </CardHeader>

            <Separator className="my-6" />

            <CardContent className="p-0 space-y-6">

              {/* Description */}
              <div>
                <h3 className="font-semibold text-lg mb-2">
                  About This Book
                </h3>

                <p className="text-muted-foreground leading-7">
                  {book.description}
                </p>
              </div>

              <Separator />

              {/* Added By */}
              <div>
                <h3 className="font-semibold mb-2">
                  Added By
                </h3>

                <p className="text-sm">
                  {book.userName}
                </p>

                <p className="text-sm text-muted-foreground">
                  {book.userEmail}
                </p>
              </div>

              <Separator />

              {/* Actions */}
              <div className="space-y-3">

                <Button className="w-full" size="lg">
                  Borrow This Book
                </Button>

                <Button
                  variant="outline"
                  className="w-full"
                  asChild
                >
                  <Link href="/AllBooks">
                    Back to All Books
                  </Link>
                </Button>

              </div>

            </CardContent>
          </div>

        </div>
      </Card>
    </div>
  );
};

export default BookDetails;