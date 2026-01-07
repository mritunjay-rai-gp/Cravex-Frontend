import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { AiFillStar } from "react-icons/ai";

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [userRating, setUserRating] = useState(0);
  const [avgRating, setAvgRating] = useState(0);
  const [ratingsCount, setRatingsCount] = useState(0);

  const token = localStorage.getItem("token");
  const loggedUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    axios
      .get(`https://cravex-backend-ln7p.onrender.com/recipe/${id}`)
      .then((res) => {
        setRecipe(res.data);

        // calculate average rating
        if (res.data.ratings?.length > 0) {
          const total = res.data.ratings.reduce(
            (sum, r) => sum + r.value,
            0
          );
          setAvgRating((total / res.data.ratings.length).toFixed(1));
          setRatingsCount(res.data.ratings.length);

          // find current user's rating
          const myRating = res.data.ratings.find(
            (r) => r.user === loggedUser?._id
          );
          if (myRating) setUserRating(myRating.value);
        }
      })
      .catch(console.error);
  }, [id]);

  const handleRate = async (value) => {
    if (!token) {
      alert("Login required to rate");
      return;
    }

    try {
      const res = await axios.post(
        `https://cravex-backend-ln7p.onrender.com/recipe/rate/${id}`,
        { value },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setUserRating(value);
      setAvgRating(res.data.avgRating);
      setRatingsCount(res.data.ratingsCount);
    } catch (err) {
      console.error(err);
    }
  };

  if (!recipe) return <p className="p-4 text-gray-400">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-4 text-white">
      {/* IMAGE */}
      <img
        src={recipe.image}
        className="rounded-xl mb-4 w-full object-cover"
        alt={recipe.title}
      />

      {/* TITLE */}
      <h1 className="text-3xl font-bold">{recipe.title}</h1>

      {/* AUTHOR */}
      <p className="mt-2 text-sm text-gray-400">
        By <span className="text-orange-400">{recipe.user.userName}</span>
      </p>

      {/* ⭐ RATING SECTION */}
      <div className="flex items-center gap-4 mt-4">
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <AiFillStar
              key={star}
              onClick={() => handleRate(star)}
              className={`cursor-pointer text-2xl transition ${
                star <= userRating
                  ? "text-orange-400"
                  : "text-gray-600 hover:text-orange-300"
              }`}
            />
          ))}
        </div>

        <span className="text-sm text-gray-300">
          {ratingsCount > 0
            ? `${avgRating} ⭐ (${ratingsCount})`
            : "No ratings yet"}
        </span>
      </div>

      {/* DESCRIPTION */}
      <p className="text-gray-300 mt-4">{recipe.desc}</p>

      {/* INGREDIENTS */}
      <h2 className="mt-6 text-xl font-semibold">Ingredients</h2>
      <ul className="list-disc ml-5 mt-2 space-y-1">
        {recipe.ingredients.map((i, idx) => (
          <li key={idx}>{i}</li>
        ))}
      </ul>

      {/* STEPS */}
      <h2 className="mt-6 text-xl font-semibold">Steps</h2>
      <ol className="list-decimal ml-5 mt-2 space-y-2">
        {recipe.steps.map((s, idx) => (
          <li key={idx}>{s}</li>
        ))}
      </ol>
    </div>
  );
}

export default RecipeDetail;
