import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";

function EditRecipe() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    desc: "",
    ingredients: "",
    steps: "",
    image: null,
  });

  const [loading, setLoading] = useState(true);

  // 🔄 Fetch existing recipe
  useEffect(() => {
    axios
      .get(`https://cravex-backend-ln7p.onrender.com/recipe/${id}`)
      .then((res) => {
        const r = res.data;
       setForm({
          title: r.title,
          desc: r.desc,
          ingredients: 
          Array.isArray(r.ingredients)
            ?r.ingredients.join("\n")
            :r.ingredients,
          steps: 
          Array.isArray(r.steps)
            ?r.steps.join("\n")
            :r.steps,
          image: null,
        });
      })
      .catch(() => alert("Failed to load recipe"))
      .finally(() => setLoading(false));
  }, [id]);

  // ✏️ Change handler
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({
      ...form,
      [name]: files ? files[0] : value,
    });
  };

  // 🚀 Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", form.title);
    data.append("desc", form.desc);
    data.append("ingredients", JSON.stringify(form.ingredients.split("\n").map(i=> i.trim()).filter(i=>i!=="")));
    data.append("steps", JSON.stringify(form.steps.split("\n").map(s=>s.trim()).filter(s=>s!=="")));

    if (form.image) {
      data.append("image", form.image);
    }

    try {
      await axios.put(
        `https://cravex-backend-ln7p.onrender.com/recipe/edit/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert("Recipe updated");
      navigate("/my-recipes");

    } catch (err) {
      alert("Update failed");
    }
  };

  if (loading) return <p className="p-4 text-gray-400">Loading...</p>;

  return (
    <div className="p-4 max-w-xl mx-auto text-white">
      <h1 className="text-2xl font-bold mb-4">✏️ Edit Recipe</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full p-2 bg-gray-800 rounded"
          required
        />

        <textarea
          name="desc"
          value={form.desc}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-2 bg-gray-800 rounded"
        />

        <textarea
          name="ingredients"
          value={form.ingredients}
          onChange={handleChange}
          placeholder="Ingredients (one per line)"
          className="w-full p-2 bg-gray-800 rounded"
        />

        <textarea
          name="steps"
          value={form.steps}
          onChange={handleChange}
          placeholder="Steps (one per line)"
          className="w-full p-2 bg-gray-800 rounded"
        />

        <label className="m-6 bg-gray-800 p-2">Image :
        <input
          type="file"
          name="image"
          onChange={handleChange}
          className="text-sm w-48 rounded-md border-2  m-1"
        />
        </label>

        <button
          className="bg-green-600 px-4 py-2 rounded hover:bg-green-700"
        >
          Update Recipe
        </button>
      </form>
    </div>
  );
}

export default EditRecipe;
