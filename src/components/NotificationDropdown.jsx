import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
function NotificationDropdown({ notifications, onClose, onClearAll }) {
  const navigate = useNavigate();

  const text = (n) => {
    if (n.type === "follow") return "started following you";
    if (n.type === "like") return "liked your recipe";
    if (n.type === "comment") return `commented: "${n.commentText}"`;
  };
  const token = localStorage.getItem("token");


  return (
    <div className="absolute right-0 mt-2 w-80 bg-black border rounded shadow-lg z-50 max-h-[70vh] overflow-y-auto">
      <div className="flex justify-between items-center px-3 py-2 border-b">
      <h4 className="p-3 border-b font-semibold">Notifications</h4>

      {notifications.length === 0 && (
        <p className="p-4 text-gray-400">No notifications</p>
      )}
      {notifications.length > 0 && (
        <button
          onClick={onClearAll}
          className="text-xs text-red-400 hover:text-red-300"
        >
          Clear all
        </button>
      )}
      </div>

      {notifications.map(n => (
        <div
          key={n._id}
          className={`flex gap-3 p-3 cursor-pointer hover:bg-gray-800 ${
            !n.isRead ? "bg-white/5" : ""
          }`}
          onClick={() => {
            if (n.recipe) navigate(`/recipe/${n.recipe._id}`);
            onClose();
          }}
        >
          <img
            src={n.sender.profilePic}
            className="w-8 h-8 rounded-full"
          />
          <p className="text-sm">
            <b>@{n.sender.userName}</b> {text(n)}
          </p>
        </div>
      ))}
    </div>
  );
}

export default NotificationDropdown;
