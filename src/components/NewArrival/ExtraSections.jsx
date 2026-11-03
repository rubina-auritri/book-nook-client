
import {
  Search,
  BookOpen,
  BookmarkCheck,
  Library,
  Clock,
  Heart,
  Sparkles,
  Users,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

const borrowingSteps = [
  {
    number: "01",
    title: "Explore Books",
    description:
      "Browse our extensive collection and discover books that match your interests.",
    icon: Search,
  },
  {
    number: "02",
    title: "Borrow a Book",
    description:
      "Choose your favorite book and submit a borrowing request in just a few clicks.",
    icon: BookmarkCheck,
  },
  {
    number: "03",
    title: "Enjoy Reading",
    description:
      "Start reading, explore new ideas, and return your book before the due date.",
    icon: BookOpen,
  },
];

const benefits = [
  {
    title: "Huge Book Collection",
    description: "Discover books across different genres and categories.",
    icon: Library,
  },
  {
    title: "Easy Borrowing",
    description: "A simple and convenient book borrowing experience.",
    icon: Clock,
  },
  {
    title: "Discover New Reads",
    description: "Find interesting books and expand your knowledge.",
    icon: Sparkles,
  },
  {
    title: "Reader Friendly",
    description: "Enjoy a smooth experience on desktop, tablet, and mobile.",
    icon: Heart,
  },
];

export default function ExtraSections() {
  return (
    <>
      {/* How Borrowing Works */}
      <section className="py-20 bg-muted/40">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-14">
            <span className="text-sm font-semibold text-primary uppercase tracking-widest">
              Simple Process
            </span>

            <h2 className="text-3xl md:text-4xl font-bold mt-3">
              How Borrowing Works
            </h2>

            <p className="text-muted-foreground mt-4">
              Getting your favorite book has never been easier.
              Follow these three simple steps and start reading.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {borrowingSteps.map((step) => {
              const Icon = step.icon;

              return (
                <Card
                  key={step.number}
                  className="border-none shadow-sm hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-8 text-center">
                    <div className="flex justify-between items-center mb-7">
                      <div className="h-14 w-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                        <Icon size={28} />
                      </div>

                      <span className="text-4xl font-bold text-muted-foreground/20">
                        {step.number}
                      </span>
                    </div>

                    <h3 className="text-xl font-semibold mb-3">
                      {step.title}
                    </h3>

                    <p className="text-sm text-muted-foreground leading-7">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center mt-10">
            <Link href="/books" className={buttonVariants()}>
              Explore Books <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose BookNook */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">

            {/* Left Content */}
            <div>
              <span className="text-sm font-semibold text-primary uppercase tracking-widest">
                Why BookNook?
              </span>

              <h2 className="text-3xl md:text-4xl font-bold mt-3 leading-tight">
                Your Next Favorite Book Is Just a Click Away
              </h2>

              <p className="text-muted-foreground mt-5 leading-7">
                BookNook makes discovering and borrowing books
                simple. Explore a world of knowledge, inspiration,
                and imagination in one convenient place.
              </p>

              <div className="space-y-4 mt-7">
                {[
                  "Simple and easy book discovery",
                  "Convenient borrowing experience",
                  "Explore books from different categories",
                  "Read more and learn every day",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                    <span className="text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/books"
                className={buttonVariants({ className: "mt-8" })}
              >
                Start Exploring <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            {/* Right Content */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {benefits.map((benefit) => {
                const Icon = benefit.icon;

                return (
                  <Card
                    key={benefit.title}
                    className="border shadow-sm hover:border-primary/40 hover:shadow-md transition-all"
                  >
                    <CardContent className="p-6">
                      <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5">
                        <Icon size={24} />
                      </div>

                      <h3 className="font-semibold text-lg mb-2">
                        {benefit.title}
                      </h3>

                      <p className="text-sm text-muted-foreground leading-6">
                        {benefit.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
