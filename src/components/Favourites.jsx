import { useEffect, useState } from "react";
import axios from "axios";
import RecipeCard from "../components/RecipeCard";

function Favourites() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const res = await axios.get(
          "https://cravex-backend-ln7p.onrender.com/recipe/favourites/me",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setRecipes(res.data || []);
      } catch (err) {
        console.error("Error fetching favourites:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavourites();
  }, []);

  if (loading) {
    return <p className="p-4 text-white">Loading...</p>;
  }

return (
  <div className="pt-24 px-4 sm:px-6 lg:px-10 text-white max-w-7xl mx-auto">
    <h1 className="text-xl sm:text-2xl font-bold mb-4">
      ❤️ Your Favourites
    </h1>

    {recipes.length === 0 ? (
      <p className="text-gray-400">No favorites yet</p>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe._id} recipe={recipe} />
        ))}
      </div>
    )}
  </div>
);

}

export default Favourites;

