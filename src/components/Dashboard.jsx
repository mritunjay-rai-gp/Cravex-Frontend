import { useEffect,useState } from "react"
import axios from "axios"
import RecipeCard from "./RecipeCard"

function Dashboard(){
    const [recipes,setRecipes] = useState([]);

    useEffect(()=>{
        fetchRecipes();
    },[])

    const fetchRecipes = async()=>{
        const {data} = await axios.get("https://cravex-backend-ln7p.onrender.com/recipe/approved");
        setRecipes(data);
    }

return (
  <div className="pt-24 px-4 sm:px-6 lg:px-10 text-white max-w-7xl mx-auto">
    {/* space because navbar fixed */}
    
    <h1 className="text-2xl sm:text-3xl font-semibold mb-6">
      🍽 Latest Recipes
    </h1>

    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
      {recipes.length > 0 ? (
        recipes.map((r) => (
          <RecipeCard key={r._id} recipe={r} />
        ))
      ) : (
        <p>No recipes yet...</p>
      )}
    </div>
  </div>
);

}

export default Dashboard;

