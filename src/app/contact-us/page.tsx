"use client";

import { AiFillFacebook } from "react-icons/ai";
import { AiFillInstagram } from "react-icons/ai";
import { AiFillTwitterSquare } from "react-icons/ai";
import { AiFillYoutube } from "react-icons/ai";
import { FaWhatsapp } from "react-icons/fa";
import { useState } from "react";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib";
import { Button } from "@/components/buttons/Button";

const formModel = {
  text: "",
  subject: "",
  email: "",
};

export default function Contact() {
  const [formData, setFormdata] = useState({ ...formModel });

  function handleOnchange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { value, name } = event.target;
    setFormdata((previousState) => ({ ...previousState, [name]: value }));
  }
  const [waiting, setWaiting] = useState(false);
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!formData.email || !formData.text || !formData.subject)
      return toast.warning("A required field is not filled out.");
    try {
      setWaiting(true);
      const response = await fetch("/api/messages/email", {
        method: "POST",
        body: JSON.stringify({
          ...formData,
          html: "",
          type: "incoming",
          read: false,
        }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      toast.info(data.message);

      if (data.success) setFormdata(formModel);
    } catch (error) {
      toast.error("Error: " + getErrorMessage(error));
    } finally {
      setWaiting(false);
    }
  }
  return (
    <main className="min-h-screen flex items-center flex-col justify-center bg-gray-100">
      <h1 className="text-2xl font-semibold">Contact us on</h1>
      <div className="flex gap-2 justify-center text-2xl text-blue-700 py-3">
        <AiFillFacebook color="black" />
        <AiFillInstagram color="black" />
        <AiFillTwitterSquare color="black" />
        <AiFillYoutube color="black" />
        <FaWhatsapp color="black" />
      </div>

      <div className="bg-white shadow p-2 max-w-md w-fit">
        <h2 className="text-xl text-center font-semibold mb-4 text-orange-600">
          Send us a message
        </h2>
        <form
          onSubmit={handleSubmit}
          className="min-w-[300px] w-1/3 font-light"
        >
          <div className="mb-4">
            <label className="block text-sm text-gray-700">Message</label>

            <textarea
              name="text"
              required
              value={formData.text}
              onChange={handleOnchange}
              className="mt-1 p-2 border font-semibold  w-full rounded min-h-[100px] max-h-32"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm text-gray-700">Subject</label>
            <input
              name="subject"
              required
              value={formData.subject}
              onChange={handleOnchange}
              className="mt-1 p-2 border font-semibold  w-full rounded"
              type="text"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm text-gray-700">Email</label>
            <input
              name="email"
              required
              value={formData.email}
              onChange={handleOnchange}
              className="mt-1 p-2 border font-semibold  w-full rounded"
              type="text"
            />
          </div>

          <div className="text-center">
            <Button
              type="submit"
              primaryText={"Send"}
              waiting={waiting}
              waitingText={"Please wait... sending mail"}
              disabled={waiting}
              className="px-4 py-2 _primaryBtn rounded-none"
            />
          </div>
        </form>
      </div>
    </main>
  );
}
