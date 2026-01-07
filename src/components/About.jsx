import React from "react";

function About() {
  return (
    <div
      className="h-screen w-full bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: `url('https://i.pinimg.com/736x/b2/24/ba/b224bae0222627f98fb20ae546fe9c85.jpg')`,
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Main About Card */}
      <div className="relative z-10 w-[85%] max-w-4xl bg-white/10 backdrop-blur-lg rounded-2xl p-10 shadow-xl border border-white/20 text-white overflow-y-auto max-h-[85vh]">
        
        <h1 className="text-4xl font-bold text-center mb-4">About CraveX 🍽</h1>

        <p className="text-gray-200 text-center mb-8">
          Your ultimate food companion — discover, share & cook delicious recipes.
        </p>

        <div className="space-y-6 leading-7 text-gray-200">

          <p>
            <span className="text-[#FFB996] font-semibold">CraveX</span> is a platform built for food lovers,
            home cooks & chefs who want to share their creativity with the world.
            Whether you are a beginner learning your first recipe or an expert chef,
            CraveX brings a space where flavors meet innovation & creativity.
          </p>

          <p>
            Our goal is to make cooking fun, easy & accessible. You can explore thousands
            of recipes, upload your own, save favorites & inspire others to try new dishes.
          </p>

          <h2 className="text-2xl font-bold text-[#FFB996]">Our Mission 🔥</h2>
          <p>
            To build a global cooking community where everyone can learn, share
            and enjoy recipes together — from authentic Indian flavors to modern cuisine.
          </p>

          <h2 className="text-2xl font-bold text-[#FFB996]">What Makes CraveX Special? ✨</h2>
          <ul className="list-disc ml-6 space-y-1">
            <li>Upload your recipes easily with ingredients & steps.</li>
            <li>Admin verification to maintain quality & trust.</li>
            <li>Wishlist ❤️ to save your favorite dishes.</li>
            <li>Review & Rating system to help users choose better.</li>
            <li>Share recipes with friends instantly.</li>
            <li>Clean & modern UI experience.</li>
          </ul>

          <h2 className="text-2xl font-bold text-[#FFB996] mt-4">Future Enhancements 🚀</h2>
          <ul className="list-disc ml-6 space-y-1">
            <li>Personalized recommendation based on taste.</li>
            <li>Recipe video support.</li>
            <li>Creator profiles & following system.</li>
            <li>AI recipe suggestions from available ingredients.</li>
          </ul>

          <p className="mt-6 italic text-gray-300 text-center">
            "Food tastes better when shared ❤️"
          </p>

        </div>
      </div>
    </div>
  );
}

export default About;
