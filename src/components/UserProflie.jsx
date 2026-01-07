import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import RecipeCard from "./RecipeCard";
import EditProfile from "./EditProfile";
import FollowButton from "./FollowButton";
import FollowersFollowingModal from "./FollowersFollowingModal";
function UserProfile() {
  const { userName } = useParams();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showEdit, setShowEdit] = useState(false);
  const [showFollowModal, setShowFollowModal] = useState(false);
  const [followType, setFollowType] = useState(""); 

  const openFollowers = () => {
   setFollowType("followers");
   setShowFollowModal(true);
  };

  const openFollowing = () => {
   setFollowType("following");
   setShowFollowModal(true);
  };

  const closeFollowModal = () => {
   setShowFollowModal(false);
   setFollowType("");
  };

  const loggedUser = JSON.parse(localStorage.getItem("user"));
  const fetchProfile = async () => {
  try {
    setLoading(true);
    const res = await axios.get(
      `https://cravex-backend-ln7p.onrender.com/user/${userName}`
    );
    setProfile(res.data);
  } catch (err) {
    console.error(err);
    setProfile(null);
  } finally {
    setLoading(false);
  }
};
  useEffect(() => {
  fetchProfile();
}, [userName]);


  if (loading) {
    return <p className="p-4 text-gray-400">Loading profile...</p>;
  }

  if (!profile) {
    return <p className="p-4 text-red-400">User not found</p>;
  }

  const isOwnProfile =
    loggedUser?.userName === profile.user.userName;

  const isFollowing =
    loggedUser &&
    profile.user.followerIds?.includes(loggedUser._id);

return (
  <div className="p-4 sm:p-6 text-white max-w-5xl mx-auto overflow-x-hidden">
    
    {/* PROFILE HEADER */}
    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8 mb-8">
      
      {/* Profile Picture */}
      <img
        src={profile.user.profilePic}
        alt="profile"
        className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border"
      />

      {/* INFO */}
      <div className="flex-1 w-full text-center sm:text-left">
        
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 flex-wrap">
          <h2 className="text-xl sm:text-2xl font-bold {break-words}">
            {profile.user.fullName || profile.user.userName}
          </h2>

          {/* ACTION BUTTON */}
          {isOwnProfile ? (
            <button
              onClick={() => setShowEdit(true)}
              className="border px-4 py-1 rounded text-sm hover:bg-white/10 w-fit mx-auto sm:mx-0"
            >
              Edit Profile
            </button>
          ) : (
            <FollowButton
              targetUserId={profile.user._id}
              initialIsFollowing={isFollowing}
              onFollowChange={(following, followersCount) => {
                fetchProfile();
                setProfile((prev) => ({
                  ...prev,
                  user: {
                    ...prev.user,
                    followersCount,
                    followers: following
                      ? [...prev.user.followers, loggedUser._id]
                      : prev.user.followers.filter(
                          (id) => id !== loggedUser._id
                        ),
                  },
                }));
              }}
            />
          )}
        </div>

        {/* USERNAME */}
        <p className="text-gray-400 mt-1">@{profile.user.userName}</p>

        {/* BIO */}
        {profile.user.bio && (
          <p className="mt-2 max-w-xl mx-auto sm:mx-0">
            {profile.user.bio}
          </p>
        )}

        {/* STATS */}
        <div className="flex flex-wrap justify-center sm:justify-start gap-4 sm:gap-6 mt-4 text-sm">
          <span>
            <b>{profile.recipeCount}</b> recipes
          </span>

          <span
            onClick={openFollowers}
            className="cursor-pointer hover:text-orange-400"
          >
            <b>{profile.user.followersCount}</b> followers
          </span>

          <span
            onClick={openFollowing}
            className="cursor-pointer hover:text-orange-400"
          >
            <b>{profile.user.followingCount}</b> following
          </span>
        </div>
      </div>
    </div>

    {/* RECIPES */}
    <h3 className="text-xl font-semibold mb-4 text-center sm:text-left">
      Recipes
    </h3>

    {profile.recipes.length === 0 ? (
      <p className="text-gray-400 text-center sm:text-left">
        No recipes yet.
      </p>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {profile.recipes.map((recipe) => (
          <RecipeCard key={recipe._id} recipe={recipe} />
        ))}
      </div>
    )}

    {/* EDIT PROFILE MODAL */}
    {showEdit && (
      <EditProfile
        user={profile.user}
        onClose={() => setShowEdit(false)}
        onUpdated={(updatedUser) => {
          setProfile((prev) => ({
            ...prev,
            user: updatedUser,
          }));
          fetchProfile();
        }}
      />
    )}

    {showFollowModal && (
      <FollowersFollowingModal
        title={followType === "followers" ? "Followers" : "Following"}
        users={
          followType === "followers"
            ? profile.user.followers
            : profile.user.following
        }
        onClose={closeFollowModal}
      />
    )}
  </div>
);

}

export default UserProfile;

