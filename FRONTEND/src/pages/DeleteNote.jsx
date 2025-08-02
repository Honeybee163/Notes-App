import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

let API_URL=import.meta.env.VITE_API_URL;
export default function DeleteNote() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch note details for display
  useEffect(() => {
    axios.get(`${API_URL}/api/notes/${id}`)
      .then((res) => {
        setNote(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching note:", err);
        setLoading(false);
      });
  }, [id]);

  // Handle deletion
  const handleDelete = () => {
    axios.delete(`http://localhost:3000/api/notes/${id}`)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.error("Error deleting note:", err);
      });
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-red-50 flex items-center justify-center px-4 py-10">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">⚠️ Delete Note</h1>
        <p className="text-gray-700 mb-6">
          Are you sure you want to delete the note <strong className="text-black">"{note.title}"</strong>?
          This action cannot be undone.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/")}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold px-4 py-2 rounded-lg transition"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg transition"
          >
            🗑️ Confirm Delete
          </button>
        </div>
      </div>
    </div>
  );
}
