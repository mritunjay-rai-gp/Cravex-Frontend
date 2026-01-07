import React, { useState } from "react";

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", type: "", msg: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // later connect backend here
    console.log(form);

    setSent(true);
    setTimeout(() => setSent(false), 3000); // hide success message after 3s
    setForm({ name: "", email: "", type: "", msg: "" }); // reset form
  };

  return (
    <div
      className="h-screen w-full bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: `url('https://i.pinimg.com/736x/b2/24/ba/b224bae0222627f98fb20ae546fe9c85.jpg')`,
      }}
    >
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 w-[80%] max-w-lg bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-white/20 text-white">
        <h1 className="text-3xl font-bold mb-2 text-center">Contact Us</h1>
        <p className="text-gray-300 text-center mb-6">
          Feel free to reach us — we would love to hear from you! 😊
        </p>

        {/* SUCCESS Notification */}
        {sent && (
          <p className="bg-green-500/80 text-white px-3 py-2 rounded text-center mb-3">
            🎉 Your message has been sent!
          </p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={form.name}
            onChange={handleChange}
            required
            className="p-2 rounded bg-white/20 outline-none focus:bg-white/30"
          />

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            required
            className="p-2 rounded bg-white/20 outline-none focus:bg-white/30"
          />

          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            required
            className="p-2 rounded bg-white/20 outline-none focus:bg-white/30"
          >
            <option value="" disabled>Select message type</option>
            <option>Help / Support</option>
            <option>Recipe Issue</option>
            <option>General Feedback</option>
            <option>Feature Request</option>
          </select>

          <textarea
            name="msg"
            placeholder="Write your message..."
            value={form.msg}
            onChange={handleChange}
            required
            rows="4"
            className="p-2 rounded bg-white/20 outline-none focus:bg-white/30 resize-none"
          ></textarea>

          <button
            type="submit"
            className="bg-[#FFB996] hover:bg-[#FF9F7F] text-black font-semibold py-2 rounded-lg"
          >
            Send Message
          </button>

        </form>
      </div>
    </div>
  );
}

export default Contact;
