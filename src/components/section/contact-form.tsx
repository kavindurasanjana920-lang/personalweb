"use client";

import { FormEvent, useState } from "react";
import { Loader2, Send } from "lucide-react";

import { Button } from "@/components/ui/button";

type FormFields = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const INITIAL_FIELDS: FormFields = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export default function ContactForm() {
  const [fields, setFields] = useState<FormFields>(INITIAL_FIELDS);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  const updateField = (key: keyof FormFields, value: string) => {
    setFields((previous) => ({
      ...previous,
      [key]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setFeedback("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fields),
      });

      const data = (await response.json()) as { message?: string; error?: string };

      if (!response.ok) {
        throw new Error(data.error ?? "Unable to send your message right now.");
      }

      setStatus("success");
      setFeedback(data.message ?? "Message sent successfully.");
      setFields(INITIAL_FIELDS);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong while sending your message.";
      setStatus("error");
      setFeedback(message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-medium text-foreground">
            Name
          </label>
          <input
            id="name"
            type="text"
            required
            value={fields.name}
            onChange={(event) => updateField("name", event.target.value)}
            className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors focus:border-foreground/40"
            placeholder="Your name"
          />
        </div>

        <div>
          <label htmlFor="email" className="text-sm font-medium text-foreground">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={fields.email}
            onChange={(event) => updateField("email", event.target.value)}
            className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors focus:border-foreground/40"
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="text-sm font-medium text-foreground">
          Subject
        </label>
        <input
          id="subject"
          type="text"
          required
          value={fields.subject}
          onChange={(event) => updateField("subject", event.target.value)}
          className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors focus:border-foreground/40"
          placeholder="Project inquiry"
        />
      </div>

      <div>
        <label htmlFor="message" className="text-sm font-medium text-foreground">
          Message
        </label>
        <textarea
          id="message"
          required
          rows={6}
          value={fields.message}
          onChange={(event) => updateField("message", event.target.value)}
          className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors focus:border-foreground/40"
          placeholder="Tell me about your project..."
        />
      </div>

      <div className="flex items-center gap-3">
        <Button type="submit" className="group px-6" disabled={status === "submitting"}>
          {status === "submitting" ? (
            <>
              Sending
              <Loader2 className="ml-2 size-4 animate-spin" />
            </>
          ) : (
            <>
              Send Message
              <Send className="ml-2 size-4" />
            </>
          )}
        </Button>
        <p
          className={`text-sm ${
            status === "error" ? "text-red-500" : "text-muted-foreground"
          }`}
        >
          {feedback}
        </p>
      </div>
    </form>
  );
}
