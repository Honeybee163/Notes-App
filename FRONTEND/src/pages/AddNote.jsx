import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
let API_URL=import.meta.env.VITE_API_URL;

export default function AddNote() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const [submitMessage, setSubmitMessage] = useState("");

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(`API_URL/api/notes`, data);
      setSubmitMessage("✅ Note saved successfully!");
      reset(); // clear form
    } catch (error) {
      console.error(error);
      setSubmitMessage("❌ Failed to save the note. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 py-10 px-4 flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-blue-700">
          📝 Add a New Note
        </h2>

        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            id="title"
            type="text"
            {...register("title", { required: "Title is required" })}
            className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Content */}
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            Content
          </label>
          <textarea
            id="content"
            rows="4"
            {...register("content", { required: "Content is required" })}
            className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.content && (
            <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>
          )}
        </div>

        {/* Tags */}
        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
            Tags (comma-separated)
          </label>
          <input
            id="tags"
            type="text"
            {...register("tags")}
            className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full font-semibold py-2 px-4 rounded-lg shadow transition duration-200 ${
            isSubmitting
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {isSubmitting ? "Saving..." : "➕ Save Note"}
        </button>

        {/* Status Message */}
        {submitMessage && (
          <p className="text-center mt-4 text-sm text-gray-700">{submitMessage}</p>
        )}
      </form>
    </div>
  );
}
