
"use client";

import Link from "next/link";
import { useSession, signOut } from "@/lib/auth-client";

import { Button } from "@/components/ui/button";
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
    window.location.href = "/";
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between p-4">

        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-amber-800">
          📚 BookNook
        </Link>

        {/* Desktop Links */}
        <div className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2">

          {!isPending && (
            user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    {user.name || "Account"}
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/profile">My Profile</Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem onClick={handleLogout}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="outline" asChild>
                  <Link href="/login">Login</Link>
                </Button>

                <Button asChild>
                  <Link href="/register">Register</Link>
                </Button>
              </>
            )
          )}

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu />
              </Button>
            </SheetTrigger>

            <SheetContent side="right">
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
