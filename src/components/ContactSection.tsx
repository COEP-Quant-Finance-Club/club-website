import { motion } from "framer-motion";
import { useState } from "react";
import SectionWrapper from "./SectionWrapper";

export default function ContactSection() {

  function mailToClub(name:String, email:String, message:String) {
    //now main logical thing that i have to do with the in this function.
  }
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // placeholder
    // alert("Message sent (demo)");
    mailToClub(form.name, form.email, form.message);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <SectionWrapper id="contact" title="Contact">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-lg space-y-6"
      >
        {(["name", "email"] as const).map((field) => (
          <div key={field} className="relative">
            <label className="label-style block mb-2">{field}</label>
            <input
              type={field === "email" ? "email" : "text"}
              required
              value={form[field]}
              onChange={(e) => setForm({ ...form, [field]: e.target.value })}
              className="w-full bg-transparent border-b border-muted pb-2 text-foreground font-light focus:border-accent focus:border-b-2 outline-none transition-colors"
            />
          </div>
        ))}
        <div>
          <label className="label-style block mb-2">Message</label>
          <textarea
            required
            rows={4}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full bg-transparent border-b border-muted pb-2 text-foreground font-light focus:border-accent focus:border-b-2 outline-none transition-colors resize-none"
          />
        </div>
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="h-11 px-8 bg-primary text-primary-foreground font-medium text-sm tracking-wider uppercase rounded-sm"
        >
          Send Message
        </motion.button>
      </motion.form>
    </SectionWrapper>
  );
}
