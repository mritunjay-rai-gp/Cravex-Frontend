import React, { useState } from "react";
import {useNavigate } from "react-router";
import axios from "axios";

function AddRecipe() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null)
  const [ingredients, setIngredients] = useState([""]);
  const [steps, setSteps] = useState([""]);
  const [preview, setPreview] = useState(null);
 
  const navigate = useNavigate();
  // Upload Image Preview (Cloudinary later)
  function handleFileChange(e) {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  }

  // Add ingredient input
  const addIngredient = () => setIngredients([...ingredients, ""]);
  // Update ingredient
  const updateIngredient = (i, value) => {
    const list = [...ingredients];
    list[i] = value;
    setIngredients(list);
  };

  // Add step
  const addStep = () => setSteps([...steps, ""]);
  // Update step
  const updateStep = (i, value) => {
    const list = [...steps];
    list[i] = value;
    setSteps(list);
  };
  const token = localStorage.getItem("token")
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title",title);
    formData.append("desc", desc);
    formData.append("image",image);
    formData.append("ingredients",JSON.stringify(ingredients));
    formData.append("steps",JSON.stringify(steps));
    const response = await axios.post("https://cravex-backend-ln7p.onrender.com/recipe/add", formData,{
        headers:{
            "Content-Type":"multipart/form-data",
            Authorization:`Bearer ${token}`,

        } 
    });
    alert(response.data.message);
    setTitle("")
    setDesc("")
    setIngredients([""])
    setSteps([""])
    setImage(null);
    navigate("/dashboard");
  };

return (
  <div className="pt-20 px-3 sm:px-6 lg:px-10 text-white w-full overflow-x-hidden">
    
    <h2 className="text-2xl sm:text-3xl font-semibold mb-6 lg:text-center sm:text-left">
      Add a New Recipe 🍽️
    </h2>

    <form
      onSubmit={handleSubmit}
      className="
        w-full
        max-w-full sm:max-w-xl
        mx-auto
        bg-white/10 backdrop-blur-lg
        p-3 sm:p-6
        rounded-xl
        space-y-5
      "
    >

      {/* Title */}
      <input
        type="text"
        placeholder="Recipe Title"
        className="w-full p-2 rounded bg-white/20 outline-none"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      {/* Description */}
      <textarea
        placeholder="Short Description..."
        className="w-full p-2 rounded bg-white/20 outline-none resize-none"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        rows="3"
        required
      />

      {/* Image Upload */}
      <div className="w-full">
        <p className="mb-2 text-sm font-medium">Recipe Image</p>

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full text-sm"
          required
        />

        {preview && (
          <img
            src={preview}
            alt="preview"
            className="mt-3 h-40 w-full object-cover rounded-lg border"
          />
        )}
      </div>

      {/* Ingredients */}
      <div className="w-full">
        <p className="font-medium mb-2">Ingredients</p>

        {ingredients.map((ing, i) => (
          <input
            key={i}
            type="text"
            placeholder={`Ingredient ${i + 1}`}
            className="w-full p-2 rounded bg-white/20 outline-none mb-2"
            value={ing}
            onChange={(e) => updateIngredient(i, e.target.value)}
            required
          />
        ))}

        <button
          type="button"
          onClick={addIngredient}
          className="w-full sm:w-auto px-4 py-1 bg-green-500 rounded mt-1"
        >
          + Add Ingredient
        </button>
      </div>

      {/* Steps */}
      <div className="w-full">
        <p className="font-medium mb-2">Steps / Instructions</p>

        {steps.map((stp, i) => (
          <textarea
            key={i}
            placeholder={`Step ${i + 1}`}
            className="w-full p-2 rounded bg-white/20 outline-none resize-none mb-2"
            rows="2"
            value={stp}
            onChange={(e) => updateStep(i, e.target.value)}
            required
          />
        ))}

        <button
          type="button"
          onClick={addStep}
          className="w-full sm:w-auto px-4 py-1 bg-blue-500 rounded mt-1"
        >
          + Add Step
        </button>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full py-2 bg-orange-500 hover:bg-orange-600 rounded text-lg font-semibold"
      >
        Submit Recipe
      </button>

    </form>
  </div>
);

}

export default AddRecipe;
