import { useEffect, useState } from "react";
import axios from "axios";
import RecipeCard from "../components/RecipeCard";

function MyRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const handleDelete = async (id) => {
  if (!window.confirm("Delete this recipe?")) return;

  try {
    await axios.delete(
      `https://cravex-backend-ln7p.onrender.com/recipe/delete/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    setRecipes((prev) => prev.filter((r) => r._id !== id));
  } catch (err) {
    alert("Delete failed");
  }
};

  useEffect(() => {
    axios
      .get("https://cravex-backend-ln7p.onrender.com/recipe/my-recipes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setRecipes(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="p-4 text-gray-400">Loading...</p>;
  }

  return (
    <div className="pt-24 px-4 sm:px-6 lg:px-10 text-white max-w-7xl mx-auto">
      <h1 className="text-xl sm:text-2xl font-bold mb-4">📌 My Recipes</h1>

      {recipes.length === 0 ? (
        <p className="text-gray-400">You haven’t added any recipes yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {recipes.map((recipe) => (
            <RecipeCard
             key={recipe._id}
             recipe={recipe}
             showActions={true}
             onDelete={handleDelete}
           />

          ))}
          
        </div>
      )}
    </div>
  );
}

export default MyRecipes;
