import Loader from "@/components/loaders/Loader";

export default function Loading() {
  return (
    <Loader
      message="Loading sponsors..."
      iconStyles={"text-3xl"}
      className="flex flex-col justify-center items-center h-full text-teal-400"
    />
  );
}
