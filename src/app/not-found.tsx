import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-full flex flex-col gap-3 justify-center items-center">
      <h2 className="">Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/" className="default__btn text-yellow-400 p-2">
        Return Home
      </Link>
    </div>
  );
}
