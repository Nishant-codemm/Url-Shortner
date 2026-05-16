import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createLinkSchema } from "../validation/linkSchema";
import { useLinks } from "../hooks/useLinks";
import HeroSection from "../components/home/HeroSection";
import CreateLinkForm from "../components/home/CreateLinkForm";
import LinksList from "../components/home/LinksList";
import QrModal from "../components/home/QrModal";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";


export default function Home() {
  const { links, creating, create, remove } = useLinks();
  const nav = useNavigate();
  const { register, handleSubmit, reset } = useForm({
    resolver: zodResolver(createLinkSchema),
  });

  const [copiedId, setCopiedId] = useState(null);
  const [qrLink, setQrLink] = useState(null);

  const onSubmit = async (values) => {
    await create(values);
    reset();
  };

  if(!localStorage.getItem("token")){
      toast.info("Please Login First")
      nav("/register");
  }

  const copy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="bg-black-950 text-gray-100 pb-24">
      <main className="max-w-6xl mx-auto pt-20 px-6">
        <HeroSection />

        <CreateLinkForm
          register={register}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          loading={creating}
        />


        <LinksList
          links={links}
          copiedId={copiedId}
          onCopy={copy}
          onDelete={remove}
          onQr={setQrLink}
        />
      </main>

      <QrModal
        link={qrLink}
        onClose={() => setQrLink(null)}
        onDownload={(qr) => {
          const a = document.createElement("a");
          a.href = qr;
          a.download = "qrcode.png";
          a.click();
        }}
      />
    </div>
  );
}
