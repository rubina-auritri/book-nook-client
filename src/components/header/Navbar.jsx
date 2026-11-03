
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import ThemeToggle from "@/components/ThemeToggle";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Menu } from "lucide-react";

export default function Navbar() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const user = session?.user;

  const links = [
    { name: "Home", href: "/" },
    { name: "All Books", href: "/AllBooks" },
    ...(user
      ? [
          { name: "Add Book", href: "/AddBook" },
          { name: "My Books", href: "/MyBooks" },
          { name: "My Borrows", href: "/MyBorrows" },
        ]
      : []),
  ];

  const handleLogout = async () => {
    await signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white text-gray-900 dark:border-gray-700 dark:bg-gray-900 dark:text-white">

      <nav className="mx-auto flex max-w-6xl items-center justify-between p-4">

        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold text-amber-800 dark:text-amber-400"
        >
          📚 BookNook
        </Link>

        {/* Desktop Links */}
        <div className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-gray-700 hover:text-amber-700 dark:text-gray-200 dark:hover:text-amber-400"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2">

          {/* Theme Toggle */}
          {mounted && <ThemeToggle />}

          {/* Login / User Account */}
          {!isPending && (
            user ? (
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={<Button variant="outline" className="dark:border-gray-600 dark:bg-gray-800 dark:text-white" />}
                >
                  {user.name || "Account"}
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                >
                  <DropdownMenuItem render={<Link href="/profile" />}>
                    My Profile
                  </DropdownMenuItem>

                  <DropdownMenuItem onClick={handleLogout}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link
                  href="/login"
                  className={buttonVariants({ variant: "outline" }) + " dark:border-gray-600 dark:bg-gray-800 dark:text-white"}
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  className={buttonVariants() + " dark:bg-amber-600 dark:text-white"}
                >
                  Register
                </Link>
              </>
            )
          )}

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger
              render={
                <Button
                  variant="outline"
                  size="icon"
                  className="md:hidden dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                />
              }
            >
              <Menu />
            </SheetTrigger>

            <SheetContent
              side="right"
              className="bg-white text-gray-900 dark:bg-gray-900 dark:text-white"
            >
              <div className="mt-8 flex flex-col gap-5">
                {links.map((link) => (
                  <Link key={link.href} href={link.href}>
                    {link.name}
                  </Link>
                ))}

                {!isPending && !user && (
                  <>
                    <Link href="/login">Login</Link>
                    <Link href="/register">Register</Link>
                  </>
                )}

                {user && (
                  <>
                    <Link href="/profile">My Profile</Link>
                    <button onClick={handleLogout} className="text-left">
                      Logout
                    </button>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>

        </div>
      </nav>
    </header>
  );
}
