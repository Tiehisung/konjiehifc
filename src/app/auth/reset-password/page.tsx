import { Suspense } from "react";
import PasswordResetClient from "./Client";
import Loader from "@/components/loaders/Loader";

export default function PasswordResetPage() {
  return (
    <div>
      <Suspense fallback={<Loader />}>
        <PasswordResetClient />
      </Suspense>
    </div>
  );
}
