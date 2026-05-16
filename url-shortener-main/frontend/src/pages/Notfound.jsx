import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";


export default function Notfound() {
  const nav = useNavigate();
  return (
    <>
      <button
        onClick={() => nav(-1)}
        className="flex items-center gap-2 text-gray-400 cursor-pointer hover:text-white ml-4 mt-6"
      >
        <ArrowLeft size={18} /> Go Back
      </button>
      <div className="text-center mt-30 ">

        <h1 className="text-5xl text-white font-bold mb-4 ">
          Not{" "}Found
          <span className="block text-transparent text-9xl bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
            {" "}404
          </span>
        </h1>
      </div>
    </>
  );
}
