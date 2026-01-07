import axios from "axios";
import { useState } from "react";

function FollowButton({
  targetUserId,
  initialIsFollowing,
  onFollowChange,
}) {
  const token = localStorage.getItem("token");
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  const [loading, setLoading] = useState(false);

  const handleFollow = async () => {
    if (!token) {
      alert("Login required");
      return;
    }

    if (loading) return;

    try {
      setLoading(true);

      const res = await axios.post(
        `https://cravex-backend-ln7p.onrender.com/user/follow/${targetUserId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // backend response is trusted
      setIsFollowing(res.data.following);

      // inform parent to update counts/profile
      if (onFollowChange) {
        onFollowChange(res.data.following, res.data.followersCount);
      }

    } catch (err) {
      console.error("Follow error:", err.response?.data || err.message);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleFollow}
      disabled={loading}
      className={`px-4 py-1 rounded text-sm transition ${
        isFollowing
          ? "bg-gray-600 text-white hover:bg-gray-700"
          : "bg-blue-600 text-white hover:bg-blue-700"
      } ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
    >
      {loading
        ? "Please wait..."
        : isFollowing
        ? "Following"
        : "Follow"}
    </button>
  );
}

export default FollowButton;


