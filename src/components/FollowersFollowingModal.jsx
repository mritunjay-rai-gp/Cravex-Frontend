import React from 'react'

function FollowersFollowingModal({ title, users, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-black w-{[380px]} rounded-lg shadow-lg">

        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="font-semibold">{title}</h3>
          <button onClick={onClose} className="text-lg">✕</button>
        </div>

        {/* List */}
        <div className="max-h-[60vh] overflow-y-auto">
          {users.length === 0 ? (
            <p className="p-4 text-gray-400 text-sm">No users</p>
          ) : (
            users.map(user => (
              <div
                key={user._id}
                className="flex items-center gap-3 p-3 hover:bg-gray-800"
              >
                <img
                  src={user.profilePic}
                  className="w-8 h-8 rounded-full"
                />
                <span>@{user.userName}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default FollowersFollowingModal;
