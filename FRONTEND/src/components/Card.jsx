// import React from "react";
// import { Link } from "react-router-dom";

// export function Card({ _id, title, content, createdAt, tags = [], editNote, deleteNote }) {
//   const date = new Date(createdAt).toLocaleDateString();

//   const bgClasses = [
//     "bg-red-200", "bg-green-200", "bg-blue-200", "bg-pink-200",
//     "bg-purple-200", "bg-orange-200", "bg-yellow-200", "bg-amber-200",
//     "bg-lime-200", "bg-cyan-200", "bg-teal-200", "bg-indigo-200",
//     "bg-fuchsia-200", "bg-rose-200"
//   ];
//   const random = Math.floor(Math.random() * bgClasses.length);
//   const bgClass = bgClasses[random];

//   return (
//     <div className={`${bgClass} rounded-2xl shadow-md p-6 m-4 w-full max-w-md mx-auto`}>
//       <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
//       <p className="text-gray-700 mb-4">{content}</p>

//       {/* Tags */}
//       {tags.length > 0 && (
//         <div className="mb-4">
//           <p className="text-sm font-medium text-gray-700 mb-1">Tags:</p>
//           <div className="flex flex-wrap gap-2">
//             {tags.map((tag, idx) => (
//               <span
//                 key={idx}
//                 className="bg-white/80 text-gray-800 text-xs font-medium px-3 py-1 rounded-full shadow-sm"
//               >
//                 #{tag.trim()}
//               </span>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Buttons */}
//       <div className="mt-4 flex flex-col sm:flex-row gap-3 sm:gap-4">
//         {/* Edit Button */}
//         <Link
//           to={`/edit/${_id}`}
//           onClick={editNote}
//           className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow transition duration-200 text-center"
//         >
//           ✏️ Edit Note
//         </Link>

//         {/* Delete Button */}
//         <Link
//           to={`/delete/${_id}`}
//           onClick={deleteNote}
//           className="bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow transition duration-200 text-center"
//         >
//           🗑️ Delete Note
//         </Link>
//       </div>

//       <p className="text-sm text-gray-500 text-right mt-4">Created: {date}</p>
//     </div>
//   );
// }













import React, { useState } from "react";
import { Link } from "react-router-dom";

export function Card({ _id, title, content, createdAt, tags = [], editNote, deleteNote }) {
  const [expanded, setExpanded] = useState(false);
  const date = new Date(createdAt).toLocaleDateString();

  const bgClasses = [
    "bg-red-200", "bg-green-200", "bg-blue-200", "bg-pink-200",
    "bg-purple-200", "bg-orange-200", "bg-yellow-200", "bg-amber-200",
    "bg-lime-200", "bg-cyan-200", "bg-teal-200", "bg-indigo-200",
    "bg-fuchsia-200", "bg-rose-200"
  ];
  const random = Math.floor(Math.random() * bgClasses.length);
  const bgClass = bgClasses[random];

  const MAX_LENGTH = 100;
  const shouldTruncate = content.length > MAX_LENGTH;
  const displayedContent = expanded ? content : content.slice(0, MAX_LENGTH);

  return (
    <div className={`${bgClass} rounded-2xl shadow-md p-6 m-4 w-full max-w-md mx-auto`}>
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>

      <p className="text-gray-700 mb-2">
        {displayedContent}
        {shouldTruncate && !expanded && "..."}
      </p>

      {shouldTruncate && (
        <button
          onClick={() => setExpanded(prev => !prev)}
          className="text-blue-700 text-sm font-semibold hover:underline mb-4"
        >
          {expanded ? "Read Less ▲" : "Read More ▼"}
        </button>
      )}

      {/* Tags */}
      {tags.length > 0 && (
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 mb-1">Tags:</p>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, idx) => (
              <span
                key={idx}
                className="bg-white/80 text-gray-800 text-xs font-medium px-3 py-1 rounded-full shadow-sm"
              >
                #{tag.trim()}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Buttons */}
      <div className="mt-4 flex flex-col sm:flex-row gap-3 sm:gap-4">
        <Link
          to={`/edit/${_id}`}
          onClick={editNote}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow transition duration-200 text-center"
        >
          ✏️ Edit Note
        </Link>

        <Link
          to={`/delete/${_id}`}
          onClick={deleteNote}
          className="bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow transition duration-200 text-center"
        >
          🗑️ Delete Note
        </Link>
      </div>

      <p className="text-sm text-gray-500 text-right mt-4">Created: {date}</p>
    </div>
  );
}
