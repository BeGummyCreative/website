"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";

const email = "begumgeveci@gmail.com";

// Web3Forms relays submissions to Begüm's inbox. The access key is public by
// design, so it is safe in client code; set it in .env.local before building.
const web3formsKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

type SendStatus = "idle" | "sending" | "sent" | "error";

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/begum-geveci",
    icon: (
      <path d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3A1.97 1.97 0 1 0 5.25 6.94 1.97 1.97 0 0 0 5.25 3ZM20.44 13.4c0-3.1-1.65-4.54-3.86-4.54a3.34 3.34 0 0 0-3.02 1.66V8.5h-3.38V20h3.38v-5.7c0-1.5.28-2.95 2.14-2.95 1.83 0 1.86 1.71 1.86 3.05V20h3.38l-.5-6.6Z" />
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@begummy.creative",
    icon: (
      <path d="M21.6 7.2a2.5 2.5 0 0 0-1.77-1.77C18.27 5 12 5 12 5s-6.27 0-7.83.43A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.77 1.77C5.73 19 12 19 12 19s6.27 0 7.83-.43a2.5 2.5 0 0 0 1.77-1.77A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8ZM10 15V9l5.2 3L10 15Z" />
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/be.gummy.creative/",
    icon: (
      <path d="M12 7.3a4.7 4.7 0 1 0 0 9.4 4.7 4.7 0 0 0 0-9.4Zm0 7.7a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm4.9-8.97a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2ZM12 3c-2.44 0-2.75 0-3.71.05-3.27.15-5.09 1.96-5.24 5.24C3 9.25 3 9.56 3 12s0 2.75.05 3.71c.15 3.27 1.96 5.09 5.24 5.24.96.04 1.27.05 3.71.05s2.75 0 3.71-.05c3.27-.15 5.09-1.96 5.24-5.24.04-.96.05-1.27.05-3.71s0-2.75-.05-3.71c-.15-3.27-1.96-5.09-5.24-5.24C14.75 3 14.44 3 12 3Zm0 1.62c2.4 0 2.69 0 3.64.05 2.44.11 3.58 1.27 3.69 3.69.04.95.05 1.24.05 3.64s0 2.69-.05 3.64c-.11 2.42-1.25 3.58-3.69 3.69-.95.04-1.23.05-3.64.05s-2.69 0-3.64-.05c-2.45-.11-3.58-1.27-3.69-3.69-.04-.95-.05-1.24-.05-3.64s0-2.69.05-3.64c.11-2.42 1.25-3.58 3.69-3.69.95-.04 1.24-.05 3.64-.05Z" />
    ),
  },
];

export default function ContactSection() {
  const [status, setStatus] = useState<SendStatus>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const firstName = String(data.get("firstName") ?? "").trim();
    const lastName = String(data.get("lastName") ?? "").trim();
    const from = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const name = [firstName, lastName].filter(Boolean).join(" ");
    const subject = `New enquiry from ${name || "your website"}`;

    // Without a key (e.g. a local build), hand the message to the visitor's mail app.
    if (!web3formsKey) {
      const body = `${message}\n\n${name}\n${from}`;
      window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: web3formsKey,
          subject,
          from_name: "BeGummy website",
          name,
          email: from,
          message,
          botcheck: data.get("botcheck") === "on",
        }),
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.message);
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="contactSection" id="contact" aria-labelledby="contact-title">
      <h2 className="contactTitle" id="contact-title">
        <svg viewBox="0 0 1000 210" role="img" aria-label="Let's Work Together!">
          <path id="contactTitleArc" d="M 20 195 Q 500 15 980 195" fill="none" />
          <text>
            <textPath href="#contactTitleArc" startOffset="50%" textAnchor="middle">
              Let&apos;s Work Together!
            </textPath>
          </text>
        </svg>
      </h2>

      <div className="contactLayout">
        <div className="contactAside">
          <Image
            className="contactProfile"
            src="/portfolio/web/contact-profile.jpg"
            alt="Begüm Geveci"
            width={720}
            height={720}
          />
          <ul className="contactDetails">
            <li>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 21s-6.5-6.2-6.5-11.2a6.5 6.5 0 0 1 13 0C18.5 14.8 12 21 12 21Z" />
                <circle cx="12" cy="9.8" r="2.3" />
              </svg>
              <span>London</span>
            </li>
            <li>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <rect x="3" y="5.5" width="18" height="13" />
                <path d="m3 6 9 7.5L21 6M3 18.5l6.8-6.3M21 18.5l-6.8-6.3" />
              </svg>
              <a href={`mailto:${email}`}>{email}</a>
            </li>
            <li>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M7.5 10.5v9.5H3.5v-9.5h4ZM7.5 19.2l2.3.8h7.4a2 2 0 0 0 2-1.6l1.2-6.1a2 2 0 0 0-2-2.4h-4.6l.7-3.6A2 2 0 0 0 12.6 4L7.5 10.5" />
              </svg>
              <div className="contactSocials">
                {socialLinks.map((link) => (
                  <a href={link.href} key={link.label} target="_blank" rel="noreferrer" aria-label={link.label}>
                    <svg viewBox="0 0 24 24" aria-hidden="true">{link.icon}</svg>
                  </a>
                ))}
              </div>
            </li>
          </ul>
        </div>

        <form className="contactForm" onSubmit={handleSubmit}>
          <label>
            <span>First Name</span>
            <input name="firstName" autoComplete="given-name" required />
          </label>
          <label>
            <span>Last Name</span>
            <input name="lastName" autoComplete="family-name" />
          </label>
          <label className="contactFormWide">
            <span>Email</span>
            <input name="email" type="email" autoComplete="email" required />
          </label>
          <label className="contactFormWide">
            <span>Message</span>
            <textarea name="message" rows={5} required />
          </label>
          <input className="contactBotcheck" type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" aria-hidden="true" />
          <button type="submit" disabled={status === "sending"}>
            {status === "sending" ? "Sending…" : "Send"}
          </button>
          <p className="contactFormStatus" role="status" aria-live="polite">
            {status === "sent" && "Thanks! Your message is on its way. I’ll get back to you soon."}
            {status === "error" && (
              <>
                Something went wrong. Please try again or email{" "}
                <a href={`mailto:${email}`}>{email}</a>.
              </>
            )}
          </p>
        </form>
      </div>
    </section>
  );
}
