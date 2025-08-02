import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card } from "../components/Card";

let API_URL=import.meta.env.VITE_API_URL;

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch notes
  useEffect(() => {
    axios
      .get('http://localhost:3000/api/notes')
      .then((res) => {
        setNotes(res.data);
        setFilteredNotes(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("⚠️ Failed to load notes.");
        setLoading(false);
      });
  }, []);

  // Filter notes on search or tag
  useEffect(() => {
    let filtered = [...notes];

    if (search.trim()) {
      const lower = search.toLowerCase();
      filtered = filtered.filter(
        (note) =>
          note.title.toLowerCase().includes(lower) ||
          note.content.toLowerCase().includes(lower)
      );
    }

    if (selectedTag) {
      filtered = filtered.filter((note) => note.tags?.includes(selectedTag));
    }

    setFilteredNotes(filtered);
  }, [search, selectedTag, notes]);

  const allTags = [...new Set(notes.flatMap((note) => note.tags || []))];

  return (
    <div className="min-h-screen bg-blue-50 py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <h1 className="text-4xl font-bold text-blue-800 mb-4 sm:mb-0">
            📝 Notes App
          </h1>
          <Link
            to="/add"
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
          >
            ➕ Add Note
          </Link>
        </div>

        {/* Search */}
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search notes..."
          className="w-full max-w-md px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Tag Filters */}
        {allTags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            <button
              onClick={() => setSelectedTag("")}
              className={`px-3 py-1 rounded-full text-sm font-medium border transition ${
                !selectedTag
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-800 hover:bg-blue-100"
              }`}
            >
              All
            </button>
            {allTags.map((tag, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1 rounded-full text-sm font-medium border transition ${
                  selectedTag === tag
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-800 hover:bg-blue-100"
                }`}
              >
                #{tag.trim()}
              </button>
            ))}
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="text-center text-red-500 font-medium mt-4">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <div className="flex justify-center mt-10">
            <div className="w-10 h-10 border-4 border-blue-600 border-dashed rounded-full animate-spin"></div>
          </div>
        ) : filteredNotes.length === 0 ? (
          <p className="text-center text-gray-500 mt-8">
            No matching notes found.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6">
            {filteredNotes.map((note) => (
              <Card
                key={note._id}
                {...note}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
