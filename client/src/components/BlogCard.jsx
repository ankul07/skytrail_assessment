import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, MessageCircle } from "lucide-react";

const BlogCard = ({ country }) => {
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);

  if (!country || !country.name) {
    console.error("Invalid country data received:", country);
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4">
          <p className="text-red-500">Invalid country data</p>
        </div>
      </div>
    );
  }

  const name =
    country.name.common || country.name.official || "Unknown Country";
  const flag = country.flags?.svg || country.flags?.png || "";
  const capital = country.capital?.[0] || "Unknown";
  const region = country.region || "Unknown";
  const population = country.population
    ? country.population.toLocaleString()
    : "Unknown";

  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setLiked(!liked);
  };

  const handleComment = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      setComments([...comments, comment]);
      setComment("");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
      {flag && (
        <div className="h-40 bg-gray-200 overflow-hidden">
          <img
            src={flag}
            alt={`Flag of ${name}`}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{name}</h2>
        <div className="text-gray-700">
          <p>
            <span className="font-medium">Capital:</span> {capital}
          </p>
          <p>
            <span className="font-medium">Region:</span> {region}
          </p>
          <p>
            <span className="font-medium">Population:</span> {population}
          </p>
        </div>

        <div className="mt-4 border-t pt-3">
          <div className="flex items-center gap-4">
            <button
              onClick={handleLike}
              className="flex items-center gap-1 focus:outline-none"
            >
              <Heart
                className={`w-6 h-6 transition-colors ${
                  liked ? "fill-red-500 text-red-500" : "text-gray-700"
                }`}
              />
            </button>
            <button
              onClick={() => setShowComments(!showComments)}
              className="flex items-center gap-1 text-gray-700 focus:outline-none"
            >
              <MessageCircle className="w-6 h-6" />
            </button>
          </div>

          {likes > 0 && (
            <p className="text-sm font-medium mt-2">
              {likes} {likes === 1 ? "like" : "likes"}
            </p>
          )}

          {showComments && (
            <div className="mt-3">
              {comments.length > 0 ? (
                <div className="mb-3 max-h-24 overflow-y-auto">
                  {comments.map((c, i) => (
                    <p key={i} className="text-sm mb-1">
                      <span className="font-medium">user{i + 1}</span> {c}
                    </p>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 mb-2">No comments yet</p>
              )}

              <form onSubmit={handleComment} className="flex mt-2">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  className="flex-1 border rounded-l px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-300"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-3 py-1 rounded-r text-sm font-medium"
                >
                  Post
                </button>
              </form>
            </div>
          )}
        </div>

        <Link
          to={`/country/${country.cca3}`}
          className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
        >
          Learn More
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
