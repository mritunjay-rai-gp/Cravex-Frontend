import { useEffect, useState } from "react";
import axios from "axios";
import {
  AiFillBell,
  AiOutlineMenu,
  AiOutlineSearch,
  AiOutlineUser,
} from "react-icons/ai";
import { Link } from "react-router";
import NotificationDropdown from "./NotificationDropdown";

function DashboardNavbar({ toggleSidebar }) {
  // 🔔 Notification state
  const [notifications, setNotifications] = useState([]);
  const [show, setShow] = useState(false);

  // 🔍 Search state
  const [query, setQuery] = useState("");
  const [results, setResults] = useState({ recipes: [], users: [] });

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
 
  /* ================= NOTIFICATIONS ================= */
  useEffect(() => {
  axios.get("https://cravex-backend-ln7p.onrender.com/notification", {
    headers: { Authorization: `Bearer ${token}` }
  })
  .then(res => setNotifications(res.data))
  .catch(console.error);
}, []);

const unreadCount = notifications.filter(n => !n.isRead).length;

// OPEN DROPDOWN
const handleOpen = () => {
  setShow(prev => !prev);

  axios.post(
    "https://cravex-backend-ln7p.onrender.com/notification/read",
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );

  // Optimistic UI
  setNotifications(prev =>
    prev.map(n => ({ ...n, isRead: true }))
  );
};
  const handleClearAll = async () => {
  try {
    await axios.delete("https://cravex-backend-ln7p.onrender.com/notification/clear", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setNotifications([]);
  } catch (err) {
    console.error(err);
  }
};

  /* ================= SEARCH ================= */
  useEffect(() => {
    if (!query.trim()) {
      setResults({ recipes: [], users: [] });
      return;
    }

    const delay = setTimeout(() => {
      axios
        .get(`https://cravex-backend-ln7p.onrender.com/search?q=${query}`)
        .then((res) => setResults(res.data))
        .catch(console.error);
    }, 300); // debounce

    return () => clearTimeout(delay);
  }, [query]);

  return (
    <div className="navbar w-full h-20 bg-black/80 flex items-center justify-between px-6">

      {/* LEFT */}
      <AiOutlineMenu
        className="text-2xl text-white hover:text-orange-400 cursor-pointer"
        onClick={toggleSidebar}
      />

      {/* 🔍 SEARCH */}
      <div className="relative w-1/2 max-w-md">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search recipes or users..."
          className="w-full pl-10 pr-3 py-2 rounded bg-white/20 text-white focus:outline-none"
        />
        <AiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />

        {(results.users.length > 0 || results.recipes.length > 0) && (
          <div className="absolute top-full mt-2 w-full bg-black border rounded shadow max-h-72 overflow-y-auto z-50">

            {/* USERS */}
            {results.users.map((u) => (
              <Link
                key={u._id}
                to={`/user/${u.userName}`}
                onClick={() => setQuery("")}
                className="flex items-center gap-3 p-2 hover:bg-white/10"
              >
                <img
                  src={u.profilePic}
                  className="w-8 h-8 rounded-full object-cover"
                  alt=""
                />
                <span>@{u.userName}</span>
              </Link>
            ))}

            {/* RECIPES */}
            {results.recipes.map((r) => (
              <Link
                key={r._id}
                to={`/recipe/${r._id}`}
                onClick={() => setQuery("")}
                className="flex items-center gap-3 p-2 hover:bg-white/10"
              >
                <img
                  src={r.image}
                  className="w-10 h-10 rounded object-cover"
                  alt=""
                />
                <span>{r.title}</span>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-6 relative">

        <div className="relative">
        <AiFillBell
        className="text-white text-2xl cursor-pointer hover:text-orange-400"
        onClick={handleOpen}
       />

      {unreadCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-xs px-2 rounded-full">
          {unreadCount}
        </span>
      )}

      {show && (
        <NotificationDropdown
          notifications={notifications}
          onClose={() => setShow(false)}
          onClearAll={handleClearAll}
        />
      )}
      </div>


        {/* 👤 PROFILE */}
        <Link to={`/user/${user.userName}`}>
          <AiOutlineUser className="text-white text-2xl hover:text-orange-400" />
        </Link>
      </div>
    </div>
  );
}

export default DashboardNavbar;
