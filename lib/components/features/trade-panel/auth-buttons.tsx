"use client";

import { Button } from "@/lib/components/ui/button";
import { Card, CardContent } from "@/lib/components/ui/card";

export default function AuthButtons() {
  return (
    <Card className="w-full max-w-sm p-4 space-y-4 border-none shadow-none">
      <CardContent className="space-y-3 flex flex-col">
        <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium text-base h-11 rounded-md">
          Register Now
        </Button>
        <Button
          variant="ghost"
          className="bg-gray-100 hover:bg-gray-200 text-black font-medium text-base h-11 rounded-md border border-gray-200"
        >
          Log In
        </Button>
      </CardContent>
    </Card>
  );
}
