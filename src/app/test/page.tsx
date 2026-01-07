import Loader from "@/components/loaders/Loader";
import { Suspense } from "react";

const TestPage = async () => {
  return <Suspense fallback={<Loader />}>hi tester</Suspense>;
};

export default TestPage;
