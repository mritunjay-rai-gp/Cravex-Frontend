import { AiOutlineClose } from "react-icons/ai";

function CommentModal({
  isOpen,
  onClose,
  comments,
  comment,
  setComment,
  submitComment,
  onDeleteComment,
  recipeOwnerId,
}) {
  if (!isOpen) return null;
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      {/* Modal Box */}
      <div className="bg-[#1f1f1f] w-full max-w-md rounded-lg p-4 relative">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-white font-semibold">Comments</h3>
          <AiOutlineClose
            className="text-white cursor-pointer text-xl"
            onClick={onClose}
          />
        </div>

        {/* Comments List */}
        <div className="max-h-64 overflow-y-auto space-y-2 text-sm text-gray-300">
          {comments.length === 0 ? (
            <p className="text-gray-400">No comments yet</p>
          ) : (
            comments.map((c) => (
  <div
    key={c._id}
    className="bg-white/5 p-2 rounded flex justify-between items-start"
  >
    <div>
      <span className="font-semibold text-gray-200">
        {c.user?.userName}:
      </span>
      <span className="ml-2 text-gray-400">{c.text}</span>
    </div>

    {(user?._id === c.user?._id || user?._id === recipeOwnerId) && (
      <button
        onClick={() => onDeleteComment(c._id)}
        className="text-red-400 text-xs ml-2"
      >
        Delete
      </button>
    )}
  </div>
))

          )}
        </div>

        {/* Comment Input */}
        <div className="mt-3">
          <input
            type="text"
            placeholder="Write a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full p-2 rounded bg-black/40 text-sm text-white outline-none"
          />
          <button
            onClick={submitComment}
            className="mt-2 text-xs text-orange-400"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}

export default CommentModal;

