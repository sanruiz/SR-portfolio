"use client";

import { useState } from "react";
import { submitContactForm } from "@/lib/wpApi";
import { FormState } from "@/types/common";

export default function Contact() {
  const [formState, setFormState] = useState<FormState>({
    your_name: "",
    your_email: "",
    your_subject: "",
    your_message: "",
    _wpcf7_unit_tag: "f679d7e",
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
    if (fieldErrors[e.target.name]) {
      setFieldErrors((prev) => {
        const updated = { ...prev };
        delete updated[e.target.name];
        return updated;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage(null);
    setErrorMessage(null);
    setFieldErrors({});

    const result = await submitContactForm(formState);
    setLoading(false);

    if (result.success) {
      setSuccessMessage(result.message || "Your message has been sent!");
      setFormState({
        your_name: "",
        your_email: "",
        your_subject: "",
        your_message: "",
        _wpcf7_unit_tag: "f679d7e",
      });
    } else {
      setErrorMessage(result.message || "An error occurred. Please try again.");
      if (result.invalid_fields) {
        const errors: Record<string, string> = {};
        result.invalid_fields.forEach((field) => {
          errors[field.field] = field.message;
        });
        setFieldErrors(errors);
      }
    }
  };

  const inputBase =
    "w-full mt-1.5 px-4 py-2.5 bg-zinc-50 dark:bg-zinc-950 border rounded-lg text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-600 text-sm transition-colors duration-200 focus:outline-none focus:ring-0";
  const inputNormal = `${inputBase} border-zinc-300 dark:border-zinc-800 focus:border-violet-500 dark:focus:border-violet-500/60`;
  const inputError = `${inputBase} border-red-400 dark:border-red-500/60`;

  const fields = [
    { id: "your_name", label: "Name", type: "text", placeholder: "Your name", value: formState.your_name, errorKey: "your-name" },
    { id: "your_email", label: "Email", type: "email", placeholder: "you@example.com", value: formState.your_email, errorKey: "your-email" },
    { id: "your_subject", label: "Subject", type: "text", placeholder: "What's this about?", value: formState.your_subject, errorKey: "your-subject" },
    { id: "your_message", label: "Message", type: "textarea", placeholder: "Tell me about your project...", value: formState.your_message, errorKey: "your-message" },
  ];

  return (
    <section className="bg-white dark:bg-zinc-900 py-24" id="contact">
      <div className="container mx-auto max-w-screen-xl px-4">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-14">
          <span className="font-mono text-violet-600 dark:text-violet-400 text-sm">04.</span>
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">Contact Me</h2>
          <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800" />
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left: copy */}
          <div className="space-y-5">
            <p className="text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed">
              I typically respond within <span className="text-zinc-900 dark:text-zinc-200 font-medium">24 hours</span>. Tell me what you&apos;re
              building, your timeline, and what kind of help you need. No long
              threads, no gatekeeping — just a direct conversation.
            </p>

            <div className="space-y-3 text-sm text-zinc-500 dark:text-zinc-500">
              <div className="flex items-center gap-3">
                <span className="font-mono text-violet-600 dark:text-violet-400">→</span>
                <span>info@sanruiz.co</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-violet-600 dark:text-violet-400">→</span>
                <a
                  href="https://github.com/sanruiz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-zinc-900 dark:hover:text-zinc-300 transition-colors"
                >
                  github.com/sanruiz
                </a>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-violet-600 dark:text-violet-400">→</span>
                <a
                  href="https://linkedin.com/in/sanruiz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-zinc-900 dark:hover:text-zinc-300 transition-colors"
                >
                  linkedin.com/in/sanruiz
                </a>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div>
            <form className="space-y-4" onSubmit={handleSubmit}>
              {fields.map(({ id, label, type, placeholder, value, errorKey }) => (
                <div key={id}>
                  <label htmlFor={id} className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    {label}
                  </label>
                  {type === "textarea" ? (
                    <textarea
                      id={id}
                      name={id}
                      value={value}
                      onChange={handleChange}
                      rows={5}
                      className={fieldErrors[errorKey] ? inputError : inputNormal}
                      placeholder={placeholder}
                    />
                  ) : (
                    <input
                      type={type}
                      id={id}
                      name={id}
                      value={value}
                      onChange={handleChange}
                      className={fieldErrors[errorKey] ? inputError : inputNormal}
                      placeholder={placeholder}
                    />
                  )}
                  {fieldErrors[errorKey] && (
                    <p className="text-red-500 dark:text-red-400 text-xs mt-1">
                      {fieldErrors[errorKey]}
                    </p>
                  )}
                </div>
              ))}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-6 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors duration-200 mt-2"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>

            {successMessage && (
              <p className="text-emerald-600 dark:text-emerald-400 text-sm text-center mt-4">
                {successMessage}
              </p>
            )}
            {errorMessage && (
              <p className="text-red-500 dark:text-red-400 text-sm text-center mt-4">
                {errorMessage}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
