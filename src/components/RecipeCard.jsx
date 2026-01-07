import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import CommentModal from "./CommentModal";
import {
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineComment,
  AiOutlineShareAlt,
  AiOutlineArrowRight,
  AiFillStar
} from "react-icons/ai";

function RecipeCard({ recipe, showActions=false, onDelete }) {
  const navigate = useNavigate();

  // ---------- STATES ----------
  const user = JSON.parse(localStorage.getItem("user"));
  const [liked, setLiked] = useState(
    recipe.likedBy?.includes(user?._id)
  );
  const [likesCount, setLikesCount] = useState(recipe.likedBy?.length || 0);
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState("");
  const [comments,setComments] = useState(recipe.comments || []);
  const [avgRating, setAvgRating] = useState(Number(recipe.avgRating) || 0);
  const [userRating, setUserRating] = useState(
    recipe.ratings?.find(r => r.user === user?._id)?.value || 0
  );
  const [showCommentsModal, setShowCommentsModal] = useState(false);

  const deleteComment = async (commentId) => {
  try {
    const res = await axios.delete(
      `https://cravex-backend-ln7p.onrender.com/recipe/comment/${recipe._id}/${commentId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    setComments(res.data);
  } catch (err) {
    alert("Cannot delete comment");
  }
};

  
  // ---------- LIKE ----------
  const handleLike = async () => {
    try {
      const res = await axios.post(
        `https://cravex-backend-ln7p.onrender.com/recipe/like/${recipe._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setLikesCount(res.data.likesCount);
      setLiked(res.data.liked);
    } catch (err) {
      console.error(err);
      alert("Login required");
    }
  };

  // ---------- COMMENT ----------
 const submitComment = async () => {
   if (!comment.trim()) return;

   try {
     const response = await axios.post(
       `https://cravex-backend-ln7p.onrender.com/recipe/comment/${recipe._id}`,
       { text: comment },
       {
         headers: {
           Authorization: `Bearer ${localStorage.getItem("token")}`
         }
       }
     );

     setComments(response.data);
     setComment("");
   } catch (err) {
     alert("Login required");
   }
 };

 //------------ RATING----------//
  const handleRate = async (value) => {
  try {
    const res = await axios.post(
      `https://cravex-backend-ln7p.onrender.com/recipe/rate/${recipe._id}`,
      { value },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    setUserRating(value);
    setAvgRating(res.data.avgRating);
  } catch (err) {
    alert("Login required");
  }
};


  // ---------- SHARE ----------//
   const handleShare = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/recipe/${recipe._id}`
    );
    alert("Link copied");
  };

  // ---------- PROCEED ----------
  const handleProceed = () => {
    navigate(`/recipe/${recipe._id}`);
  };

  return (
    <div className="bg-white/5 p-4 rounded-xl w-64 shadow-lg hover:bg-white/10 transition">
      
      {/* Image */}
      <img
        src={recipe.image}
        alt={recipe.title}
        className="h-40 w-full object-cover rounded-lg mb-3"
      />

      {/* Title + Username */}
      <div className="flex justify-between items-start mb-1">
        <h3 className="font-semibold text-lg">{recipe.title}</h3>
        <span className="text-xs text-gray-400">
          by @{recipe.user?.userName}
        </span>
      </div>
      
      {/* ⭐ Rating */}
     <div className="flex items-center gap-1 mb-2">
       {[1, 2, 3, 4, 5].map((star) => (
         <AiFillStar
           key={star}
           onClick={() => handleRate(star)}
           className={`cursor-pointer ${
             star <= userRating ? "text-orange-400" : "text-gray-500"
           }`}
         />
       ))}
       <span className="text-xs text-gray-400 ml-2">
         {typeof avgRating === "number" && avgRating > 0
         ? avgRating.toFixed(1)
         : "No rating"}

       </span>
     </div>

      {/* Description */}
      <p className="text-sm text-gray-400 mb-3 line-clamp-2">
        {recipe.desc}
      </p>

      {/* Icons */}
      <div className="flex justify-between items-center text-gray-400 text-xl">

        {/* Like */}
        <div
          className="flex items-center gap-1 cursor-pointer"
          onClick={handleLike}
        >
          {liked ? (
            <AiFillHeart className="text-red-500" />
          ) : (
            <AiOutlineHeart />
          )}
          <span className="text-sm">{likesCount}</span>
        </div>

        <div
        className="flex items-center gap-1 cursor-pointer"
        onClick={() => setShowCommentsModal(true)}
      >
        <AiOutlineComment />
        <span className="text-sm">{comments.length}</span>
     </div>


        {/* Share */}
        <AiOutlineShareAlt
          className="cursor-pointer"
          onClick={handleShare}
        />

        {/* Proceed */}
        <AiOutlineArrowRight
          className="cursor-pointer"
          onClick={handleProceed}
        />
      </div>

         <CommentModal
  isOpen={showCommentsModal}
  onClose={() => setShowCommentsModal(false)}
  comments={comments}
  comment={comment}
  setComment={setComment}
  submitComment={submitComment}
  onDeleteComment={deleteComment}
  recipeOwnerId={recipe.user}
/>


                    {showActions && (
          <div className="flex justify-between mt-4">
            <button
              onClick={() => navigate(`/edit-recipe/${recipe._id}`)}
              className="text-blue-400 hover:underline text-sm"
            >
              ✏️ Edit
            </button>

            <button
              onClick={() => onDelete(recipe._id)}
              className="text-red-400 hover:underline text-sm"
            >
              🗑️ Delete
            </button>
          </div>
        )}
    </div>
  );
}

export default RecipeCard;
