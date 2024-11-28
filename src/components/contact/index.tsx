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
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
    // Remove error for the field on change
    if (fieldErrors[e.target.name]) {
      setFieldErrors((prevErrors) => {
        const updatedErrors = { ...prevErrors };
        delete updatedErrors[e.target.name];
        return updatedErrors;
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

      // Highlight fields with errors
      if (result.invalid_fields) {
        const errors: Record<string, string> = {};
        result.invalid_fields.forEach((field) => {
          errors[field.field] = field.message;
        });
        setFieldErrors(errors);
      }
    }
  };

  return (
    <section className="bg-gray-100 text-gray-800 py-20" id="contact">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">Contact Me</h2>
          <p className="text-lg text-gray-600 mt-4">
            Have a project in mind? Feel free to reach out!
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {[
              {
                id: "your_name",
                label: "Name",
                type: "text",
                placeholder: "Your Name",
                value: formState.your_name,
                errorKey: "your-name",
              },
              {
                id: "your_email",
                label: "Email",
                type: "email",
                placeholder: "you@example.com",
                value: formState.your_email,
                errorKey: "your-email",
              },
              {
                id: "your_subject",
                label: "Subject",
                type: "text",
                placeholder: "Subject",
                value: formState.your_subject,
                errorKey: "your-subject",
              },
              {
                id: "your_message",
                label: "Message",
                type: "textarea",
                placeholder: "Write your message here...",
                value: formState.your_message,
                errorKey: "your-message",
              },
            ].map(({ id, label, type, placeholder, value, errorKey }) => (
              <div key={id}>
                <label
                  htmlFor={id}
                  className="block text-sm font-medium text-gray-700"
                >
                  {label}
                </label>
                {type === "textarea" ? (
                  <textarea
                    id={id}
                    name={id}
                    value={value}
                    onChange={handleChange}
                    rows={4}
                    className={`w-full mt-1 px-4 py-2 border ${
                      fieldErrors[errorKey]
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
                    placeholder={placeholder}
                  ></textarea>
                ) : (
                  <input
                    type={type}
                    id={id}
                    name={id}
                    value={value}
                    onChange={handleChange}
                    className={`w-full mt-1 px-4 py-2 border ${
                      fieldErrors[errorKey]
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
                    placeholder={placeholder}
                  />
                )}
                {fieldErrors[errorKey] && (
                  <p className="text-red-500 text-sm mt-1">
                    {fieldErrors[errorKey]}
                  </p>
                )}
              </div>
            ))}
            <button
              type="submit"
              className="w-full bg-indigo-500 text-white py-3 px-6 rounded-lg shadow-md hover:bg-indigo-600 transition duration-300"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>

          {successMessage && (
            <p className="text-green-500 text-center mt-4">{successMessage}</p>
          )}
          {errorMessage && (
            <p className="text-red-500 text-center mt-4">{errorMessage}</p>
          )}
        </div>
      </div>
    </section>
  );
}
