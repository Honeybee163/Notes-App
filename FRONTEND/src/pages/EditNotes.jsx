import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

let API_URL=import.meta.env.VITE_API_URL;

export default function EditNotes() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: "",
  });

  // Fetch existing note data
  useEffect(() => {
    axios
      .get(`${API_URL}/api/notes/${id}`)
      .then((res) => {
        const note = res.data;
        setFormData({
          title: note.title || "",
          content: note.content || "",
          tags: Array.isArray(note.tags) ? note.tags.join(", ") : note.tags || "",
        });
      })
      .catch((err) => {
        console.error("Error fetching note:", err);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedData = {
      title: formData.title.trim(),
      content: formData.content.trim(),
      tags: formData.tags.trim(),
    };

    axios
      .put(`http://localhost:3000/api/notes/${id}`, updatedData)
      .then((res) => {
        console.log("Note updated:", res.data);
        navigate("/");
      })
      .catch((err) => {
        console.error("Error updating note:", err);
        alert("Failed to update note. Make sure all required fields are filled.");
      });
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center py-10 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-blue-700">
          ✏️ Edit Note
        </h2>

        {/* Title */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter title"
            className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Content */}
        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700"
          >
            Content
          </label>
          <textarea
            id="content"
            name="content"
            rows="4"
            value={formData.content}
            onChange={handleChange}
            placeholder="Write your note..."
            className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          ></textarea>
        </div>

        {/* Tags */}
        <div>
          <label
            htmlFor="tags"
            className="block text-sm font-medium text-gray-700"
          >
            Tags (comma-separated)
          </label>
          <input
            id="tags"
            name="tags"
            type="text"
            value={formData.tags}
            onChange={handleChange}
            placeholder="e.g., work, urgent"
            className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition duration-200"
        >
          💾 Save Changes
        </button>
      </form>
    </div>
  );
}
