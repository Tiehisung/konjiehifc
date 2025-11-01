import PlayerProfileForm from "../players/NewSigningForms";

export default function AdminPlayer() {
  return (
    <div className="p-5">
      <div className="flex max-md:flex-wrap gap-2 md:gap-5 items-center p-4">
        <h1 className="  text-2xl md:text-4xl uppercase text-center w-full font-semibold text-teal-700">
          KonjiehiFC player signing
        </h1>
      </div>

      <PlayerProfileForm />
    </div>
  );
}
