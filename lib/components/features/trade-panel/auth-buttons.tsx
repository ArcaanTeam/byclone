"use client";

import { Button } from "@/lib/components/ui/button";

export default function AuthButtons() {
  return (
    <div className="w-full max-w-sm p-4 space-y-4 border-none shadow-none">
      <div className="space-y-3 flex flex-col">
        <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium text-base h-11 rounded-md">
          Register Now
        </Button>
        <Button
          variant="ghost"
          className="bg-gray-100 hover:bg-gray-200 hover:text-black text-black font-medium text-base h-11 rounded-md border border-gray-200"
        >
          Log In
        </Button>
      </div>
    </div>
  );
}
