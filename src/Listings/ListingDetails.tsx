import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getListingById } from "./client";
import {
  setListingsError,
  setListingsLoading,
  setSelectedListing,
} from "./reducer";
import { useAppDispatch, useAppSelector } from "../hooks";

export default function ListingDetails() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { selectedListing, loading, error } = useAppSelector(
    (state) => state.listingsReducer
  );

  useEffect(() => {
    const fetchListing = async () => {
      if (!id) return;

      try {
        dispatch(setListingsLoading(true));
        const data = await getListingById(id);
        dispatch(setSelectedListing(data));
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        dispatch(setListingsError("Failed to load listing"));
      }
    };

    fetchListing();
  }, [id, dispatch]);

  if (loading) return <div className="p-6">Loading listing...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;
  if (!selectedListing) return <div className="p-6">Listing not found.</div>;

  return (
    <div className="p-6 max-w-3xl">
      <h1 className="text-3xl font-bold">{selectedListing.title}</h1>

      <p className="text-gray-500 mt-2">
        {new Date(selectedListing.created_at).toLocaleDateString()}
      </p>

      <div className="mt-4 space-y-2">
        <p>
          <span className="font-medium">Description:</span>{" "}
          {selectedListing.description}
        </p>
        <p>
          <span className="font-medium">Location:</span>{" "}
          {selectedListing.location || "N/A"}
        </p>
        <p>
          <span className="font-medium">Status:</span> {selectedListing.status}
        </p>
        <p>
          <span className="font-medium">Posted by:</span>{" "}
          {selectedListing.user.first_name} {selectedListing.user.last_name}
        </p>
        <p>
          <span className="font-medium">Role:</span>{" "}
          {selectedListing.user.role}
        </p>
      </div>

      {selectedListing.patient && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Patient Information</h2>
          <p>
            {selectedListing.patient.first_name}{" "}
            {selectedListing.patient.last_name}
          </p>
          <p>Age: {selectedListing.patient.age}</p>
          <p>Care Level: {selectedListing.patient.care_level}</p>
          <p>Notes: {selectedListing.patient.notes}</p>
        </div>
      )}

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Tags</h2>
        <div className="flex flex-wrap gap-2">
          {selectedListing.tags.map((tag) => (
            <span
              key={tag.id}
              className="text-sm bg-gray-200 px-3 py-1 rounded-full"
            >
              {tag.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}