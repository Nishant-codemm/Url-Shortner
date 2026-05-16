import { ArrowLeft } from "lucide-react";

export default function BackButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex cursor-pointer items-center gap-2 text-gray-400 hover:text-white mb-6"
    >
      <ArrowLeft size={18} /> Back
    </button>
  );
}
