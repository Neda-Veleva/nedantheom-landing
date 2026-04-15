import React, { useState } from "react";
import { motion } from "motion/react";
import { CheckCircle2, Send } from "lucide-react";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
          userAgent: navigator.userAgent,
          pageUrl: window.location.href,
        }),
      });

      const data = (await res.json().catch(() => null)) as
        | { ok?: true; error?: string }
        | null;
      if (!res.ok) throw new Error(data?.error || "Неуспешно изпращане.");

      setIsSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
      window.setTimeout(() => setIsSubmitted(false), 3000);
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Неуспешно изпращане. Опитайте пак.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
        <h3 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center tracking-tight">
          Свържете се с нас
        </h3>

        {isSubmitted ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center justify-center py-12"
          >
            <div className="bg-green-500/20 backdrop-blur-sm rounded-full p-4 mb-4 border border-green-500/30">
              <CheckCircle2 className="w-12 h-12 text-green-300" />
            </div>
            <p className="text-white text-xl font-semibold text-center">
              Благодарим за съобщението!
            </p>
            <p className="text-white/60 text-center mt-2">
              Ще се свържем с вас скоро.
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {submitError ? (
              <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-white/90">
                {submitError}
              </div>
            ) : null}

            <input
              type="text"
              name="name"
              placeholder="Вашето име"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full h-12 rounded-2xl bg-white/5 border border-white/20 px-4 text-white placeholder:text-white/40 outline-none focus:border-white/40 focus:bg-white/10 transition"
            />

            <input
              type="email"
              name="email"
              placeholder="Вашият имейл"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full h-12 rounded-2xl bg-white/5 border border-white/20 px-4 text-white placeholder:text-white/40 outline-none focus:border-white/40 focus:bg-white/10 transition"
            />

            <textarea
              name="message"
              placeholder="Вашето съобщение"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className="w-full rounded-2xl bg-white/5 border border-white/20 px-4 py-3 text-white placeholder:text-white/40 outline-none focus:border-white/40 focus:bg-white/10 transition resize-none"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 rounded-2xl bg-white/20 hover:bg-white/30 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all border border-white/30 inline-flex items-center justify-center"
            >
              <Send className="mr-2 h-5 w-5" />
              {isSubmitting ? "Изпращане..." : "Изпратете"}
            </button>
          </form>
        )}
      </div>
    </motion.div>
  );
}

