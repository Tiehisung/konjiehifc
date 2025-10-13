import Link from "next/link";
import React from "react";

const FeaturesPage = () => {
  return (
    <div className="px-4">
      <h1>Features</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3 container">
        {features.map((ft, i) => (
          <Link
            key={i}
            href={ft.path}
            className="h-24 w-32 max-sm:grow rounded p-5 border slowTrans bg-slate-200 hover:bg-opacity-50"
          >
            {ft.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FeaturesPage;

const features = [
  { label: "Goals", path: "/admin/features/goals", icon: "" },
  { label: "Teams", path: "/admin/features/teams", icon: "" },
  { label: "other", path: "/admin/features/", icon: "none yet" },
  { label: "other", path: "/admin/features/", icon: "none yet" },
  { label: "other", path: "/admin/features/", icon: "none yet" },
  { label: "other", path: "/admin/features/", icon: "none yet" },
  { label: "other", path: "/admin/features/", icon: "none yet" },
  { label: "other", path: "/admin/features/", icon: "none yet" },
];
