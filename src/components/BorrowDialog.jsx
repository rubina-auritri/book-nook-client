
"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-hot-toast";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

const BorrowDialog = ({ book }) => {
  const { data: session } = authClient.useSession();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const user = session?.user;

  const handleBorrow = async () => {
    try {
      setLoading(true);

      // Get JWT token
      const { data, error } = await authClient.token();

      if (error || !data?.token) {
        throw new Error("Authentication failed");
      }

      // Send borrow request
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API_URL}/borrows`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${data.token}`,
          },
          body: JSON.stringify({
            bookId: book._id,
            bookTitle: book.title,
            bookImage: book.image,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.message || "Borrow failed");
        return;
      }

      toast.success("Book borrowed successfully!");
      setOpen(false);

    } catch (error) {
      console.error("Borrow error:", error);
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={<Button className="w-full" size="lg" disabled={!user} />}
      >
        Borrow This Book
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Borrow This Book</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">

          <div className="space-y-2">
            <Label>User Name</Label>
            <Input
              value={user?.name || ""}
              readOnly
            />
          </div>

          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              value={user?.email || ""}
              readOnly
            />
          </div>

          <div className="space-y-2">
            <Label>Book Title</Label>
            <Input
              value={book.title || ""}
              readOnly
            />
          </div>

        </div>

        <DialogFooter>
          <Button
            onClick={handleBorrow}
            disabled={loading || !user}
          >
            {loading ? "Borrowing..." : "Confirm Borrow"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
export default BorrowDialog;