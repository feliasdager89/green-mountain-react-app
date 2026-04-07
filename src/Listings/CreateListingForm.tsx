import { useState } from "react";
import { createListing } from "./client";
import { addListing } from "./reducer";
import { useAppDispatch } from "../hooks";

export default function CreateListingForm() {
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [patientId, setPatientId] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage("");

    const token = localStorage.getItem("token");

    if (!token) {
      setError("You must be logged in to create a listing.");
      return;
    }

    if (!title.trim() || !description.trim()) {
      setError("Title and description are required.");
      return;
    }

    try {
      setSubmitting(true);

      const newListing = await createListing(
        {
          title: title.trim(),
          description: description.trim(),
          location: location.trim() || undefined,
          patient_id: patientId.trim() || undefined,
        },
        token
      );

      dispatch(addListing(newListing));

      setTitle("");
      setDescription("");
      setLocation("");
      setPatientId("");
      setSuccessMessage("Listing created successfully.");
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { error?: string } } })?.response?.data?.error || "Failed to create listing.";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl p-6 border rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-4">Create Listing</h2>

      {error && (
        <div className="mb-4 rounded bg-red-100 text-red-700 px-4 py-2">
          {error}
        </div>
      )}

      {successMessage && (
        <div className="mb-4 rounded bg-green-100 text-green-700 px-4 py-2">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Title</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter listing title"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            className="w-full border rounded px-3 py-2 min-h-[120px]"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the listing"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Location</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter location"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">
            Patient ID
            <span className="text-sm text-gray-500 ml-2">
              (optional, mainly for guardian listings)
            </span>
          </label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            placeholder="Enter patient ID if applicable"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-50"
        >
          {submitting ? "Creating..." : "Create Listing"}
        </button>
      </form>
    </div>
  );
}