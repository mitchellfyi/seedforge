import { Suspense } from "react";
import { GardenPreview } from "@/components/garden-preview/garden-preview";

export const metadata = {
  title: "The Garden | Seedforge",
  description:
    "See how your Seedforge garden grows as you complete projects. An interactive demo of the learning journey.",
};

export default function TheGardenPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-dvh bg-[#1A1A2E] flex items-center justify-center">
          <div className="text-foreground/40 text-sm">Loading garden...</div>
        </div>
      }
    >
      <GardenPreview />
    </Suspense>
  );
}
