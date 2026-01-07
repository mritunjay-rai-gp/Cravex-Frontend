import { useState } from "react";
import axios from "axios";

function EditProfile({ user, onClose, onUpdated }) {
  const [fullName, setFullName] = useState(user.fullName || "");
  const [bio, setBio] = useState(user.bio || "");
  const [image, setImage] = useState(null);
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("bio", bio);
    if (image) formData.append("profilePic", image);

    const res = await axios.put(
      "https://cravex-backend-ln7p.onrender.com/user/edit-profile",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    onUpdated(res.data.user);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-[#111] p-6 rounded-xl w-[90%] max-w-md"
      >
        <h2 className="text-xl font-bold mb-4">Edit Profile</h2>

        <input
          type="text"
          placeholder="Full name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full mb-3 p-2 bg-black border border-gray-600 rounded"
        />

        <textarea
          placeholder="Bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="w-full mb-3 p-2 bg-black border border-gray-600 rounded"
        />
        <label className="m-6 bg-black border-gray-600 rounded p-2">
          Image:
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="mb-4 text-sm w-48 rounded-md border-2  m-1"
        />
        </label>

        <div className="flex justify-end gap-3">
          <button type="button" onClick={onClose}>
            Cancel
          </button>
          <button className="bg-orange-500 px-4 py-1 rounded">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProfile;
