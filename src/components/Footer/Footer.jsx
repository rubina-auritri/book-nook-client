
import Link from "next/link";

import {
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaGithub,
  FaLinkedinIn,
} from "react-icons/fa";

import { Separator } from "@/components/ui/separator";

const Footer = () => {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-12">

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Logo & Description */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center font-bold">
                📚
              </div>

              <span> BookNook</span>
            </Link>

            <p className="text-sm leading-6 text-muted-foreground">
              Discover your next favorite book. Explore, read,
              and enjoy a world of stories with BookNook.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <Link
                href="#"
                aria-label="Facebook"
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                <FaFacebookF size={20} />
              </Link>

              <Link
                href="#"
                aria-label="Instagram"
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                <FaInstagram size={20} />
              </Link>

              <Link
                href="#"
                aria-label="GitHub"
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                <FaGithub size={20} />
              </Link>

              <Link
                href="#"
                aria-label="LinkedIn"
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                <FaLinkedinIn size={20} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-semibold">
              Quick Links
            </h3>

            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>

              <li>
                <Link href="/books" className="hover:text-primary transition-colors">
                  All Books
                </Link>
              </li>

              <li>
                <Link href="/about" className="hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>

              <li>
                <Link href="/contact" className="hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Explore */}
          <div>
            <h3 className="mb-4 font-semibold">
              Explore
            </h3>

            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href="/category/fiction" className="hover:text-primary transition-colors">
                  Fiction
                </Link>
              </li>

              <li>
                <Link href="/category/science" className="hover:text-primary transition-colors">
                  Science
                </Link>
              </li>

              <li>
                <Link href="/category/technology" className="hover:text-primary transition-colors">
                  Technology
                </Link>
              </li>

              <li>
                <Link href="/category/history" className="hover:text-primary transition-colors">
                  History
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="mb-4 font-semibold">
              Contact Us
            </h3>

            <ul className="space-y-4 text-sm text-muted-foreground">

              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0" />

                <a
                  href="mailto:info@booknook.com"
                  className="hover:text-primary transition-colors"
                >
                  info@booknook.com
                </a>
              </li>

              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0" />

                <a
                  href="tel:+8801234567890"
                  className="hover:text-primary transition-colors"
                >
                  +880 1234-567890
                </a>
              </li>

              <li className="flex items-center gap-3">
                <MapPin className="h-4 w-4 shrink-0" />

                <span>Dhaka, Bangladesh</span>
              </li>

            </ul>
          </div>

        </div>

        {/* Divider */}
        <Separator className="my-8" />

        {/* Copyright */}
        <div className="flex flex-col items-center justify-between gap-4 text-center text-sm text-muted-foreground sm:flex-row">

          <p>
            © 2026 BookNook. All rights reserved.
          </p>

          <div className="flex flex-wrap justify-center gap-5">
            <Link
              href="/privacy"
              className="hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="hover:text-primary transition-colors"
            >
              Terms & Conditions
            </Link>
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;
