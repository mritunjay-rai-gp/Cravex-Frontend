import React from "react";
import { Link } from "react-router";

function Loading() {
  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex flex-col justify-between"
      style={{
        backgroundImage:
          "url('https://i.pinimg.com/736x/b2/24/ba/b224bae0222627f98fb20ae546fe9c85.jpg')",
      }}
    >
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center text-white px-4 flex-1 bg-black/40">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
          Welcome to CraveX 🍽️
        </h1>

        <p className="text-base sm:text-lg md:text-xl max-w-2xl">
          Discover, Share and Cook delicious recipes that spark your taste buds 🍴
        </p>

        <h3 className="text-lg sm:text-xl md:text-2xl mt-4 font-bold">
          ✨ Your daily dose of delicious inspiration starts here!
        </h3>

        <Link
          to="/login"
          className="mt-6 inline-flex items-center justify-center h-12 px-8 text-lg bg-orange-400 rounded-full hover:brightness-90 transition"
        >
          Explore Recipes
        </Link>
      </div>

      {/* Info Section */}
      <div className="text-white text-center px-4 py-6 bg-black/40">
        <h2 className="font-bold text-xl sm:text-2xl md:text-3xl mb-2">
          Why Choose CraveX?
        </h2>

        <p className="max-w-3xl mx-auto text-sm sm:text-base">
          Whether you are a beginner or a seasoned chef, CraveX offers a wide
          variety of handpicked recipes to match your cravings. Discover healthy
          options, festive treats, quick meals, and traditional delights from
          around the world.
        </p>
      </div>
    </div>
  );
}

export default Loading;
