
import Image from "next/image";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const AllBookCard = ({ book }) => {
  const { _id, title, author, category, image } = book;

  return (
    <Card className="overflow-hidden flex flex-col">
      {/* Book Image */}
      <div className="relative h-64 w-full bg-gray-100">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          unoptimized
        />
      </div>

      {/* Book Information */}
      <CardContent className="flex-1 space-y-3 p-4">
        <Badge variant="secondary">{category}</Badge>

        <h2 className="text-lg font-semibold line-clamp-1">
          {title}
        </h2>

        <p className="text-sm text-muted-foreground">
          By {author}
        </p>
      </CardContent>

      {/* Details Button */}
      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full">
          <Link href={`/books/${_id}`}>
            View Details
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AllBookCard;
