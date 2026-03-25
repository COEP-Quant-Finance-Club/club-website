import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SectionWrapper from "./SectionWrapper";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false); // prevent the duplicate submission of form
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return; // prevents double submit
    setLoading(true);
    const formData = new FormData(e.currentTarget);

    try {
      await fetch(`https://formsubmit.co/quantfinance@coeptech.ac.in`, {
        method: "POST",
        body: formData,
      });

      navigate("/thank-you");
    } catch (error) {
      console.error("Submission failed", error);
    }
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
        {/* Hidden Config */}
        <input
          type="hidden"
          name="_subject"
          value="New Quant Club Contact!"
        />
        <input type="text" name="_honey" style={{ display: "none" }} />
        <input type="hidden" name="_captcha" value="true" />
        <input type="hidden" name="_template" value="table" />

        {/* Name & Email */}
        {(["name", "email"] as const).map((field) => (
          <div key={field} className="relative">
            <label className="label-style block mb-2 capitalize">
              {field}
            </label>
            <input
              name={field}
              type={field === "email" ? "email" : "text"}
              required
              value={form[field]}
              onChange={(e) =>
                setForm({ ...form, [field]: e.target.value })
              }
              className="w-full bg-transparent border-b border-muted pb-2 text-foreground font-light focus:border-accent focus:border-b-2 outline-none transition-colors"
            />
          </div>
        ))}

        {/* Message */}
        <div>
          <label className="label-style block mb-2">Message</label>
          <textarea
            name="message"
            required
            rows={4}
            value={form.message}
            onChange={(e) =>
              setForm({ ...form, message: e.target.value })
            }
            className="w-full bg-transparent border-b border-muted pb-2 text-foreground font-light focus:border-accent focus:border-b-2 outline-none transition-colors resize-none"
          />
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={loading}
          whileHover={!loading ? { scale: 1.05 } : {}}
          whileTap={!loading ? { scale: 0.95 } : {}}
          className="h-11 px-8 bg-primary text-primary-foreground font-medium text-sm tracking-wider uppercase rounded-sm"
        >
          {loading ? "Sending..." : "Send Message"}
        </motion.button>
      </motion.form>
    </SectionWrapper>
  );
}