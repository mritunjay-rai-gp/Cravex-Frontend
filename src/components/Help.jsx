import React, { useState } from "react";

function Help() {
  const [open, setOpen] = useState(null);
  const toggle = (i) => setOpen(open === i ? null : i);

  const faq = [
    { q:"How do I create an account?", a:"Go to Signup page, fill details, verify OTP and your account will be created."},
    { q:"How can I upload a recipe?", a:"After logging in, go to Add Recipe page and upload with details. Admin will approve it."},
    { q:"Why my recipe isn't visible?", a:"Recipes get public only after admin approval. You will receive email when approved."},
    { q:"How to save/like a recipe?", a:"Open any recipe and tap on the ❤️ icon to add to your wishlist."},
    { q:"How to contact support?", a:"Use contact section below or mail us directly."}
  ];

  return (
    <div
      className="h-screen w-full bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: `url('https://i.pinimg.com/736x/b2/24/ba/b224bae0222627f98fb20ae546fe9c85.jpg')`, 
      }}
    >
      {/* dark overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* main glass screen */}
      <div className="relative z-10 w-[80%] max-w-4xl bg-white/10 backdrop-blur-lg rounded-2xl p-10 text-white overflow-y-auto max-h-[85vh] border border-white/20">

        <h1 className="text-4xl font-bold text-center">Help & Support</h1>
        <p className="text-gray-200 text-center mt-2 mb-6">
          Find answers quickly — or contact us anytime!
        </p>

        {/* FAQ section */}
        <div className="space-y-3">
          {faq.map((item, i) => (
            <div 
              key={i}
              className="p-4 bg-white/10 rounded-lg cursor-pointer border border-white/20"
              onClick={() => toggle(i)}
            >
              <p className="text-lg font-medium flex justify-between">
                {item.q}
                <span>{open === i ? "▲" : "▼"}</span>
              </p>

              {open === i && (
                <p className="mt-2 text-gray-200 leading-6">{item.a}</p>
              )}
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-8 p-5 bg-white/10 rounded-lg border border-white/20">
          <h2 className="text-2xl font-bold">Still Need Help?</h2>
          <p className="text-gray-200 mt-1">Reach us anytime — we respond within 24 hours.</p>

          <p className="mt-3 text-[#FFB996] font-semibold">📧 support@cravex.com</p>
        </div>

      </div>
    </div>
  );
}

export default Help;

