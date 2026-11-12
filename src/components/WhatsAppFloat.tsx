"use client";

import { siteConfig } from "@/config/site.config";

/** Sticky WhatsApp button — mobile only, hidden until a number is set. */
export default function WhatsAppFloat() {
  if (!siteConfig.whatsappNumber) return null;
  const url = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent("Hi Rakibul, I saw your portfolio.")}`;
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Rakibul on WhatsApp"
      className="fixed bottom-5 right-5 z-50 inline-flex min-h-[52px] min-w-[52px] items-center justify-center rounded-full bg-[#25D366] text-xl font-bold text-[#070B10] shadow-lg md:hidden"
    >
      <span aria-hidden="true">✆</span>
    </a>
  );
}
