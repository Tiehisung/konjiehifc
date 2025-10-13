import Loader from "@/components/Loader";

export default function Loading(){
    return (
      <Loader
        message="Loading players..."
        iconStyles={"text-3xl"}
        className="flex flex-col justify-center items-center h-full text-teal-400"
      />
    );
}