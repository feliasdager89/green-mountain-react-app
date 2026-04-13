import { useEffect, useMemo, useState } from "react";
import ListingCard from "./ListingCard";
import CreateListingForm from "./CreateListingForm";
import { getListings } from "./client";
import {
  setListings,
  setListingsError,
  setListingsLoading,
} from "./reducer";
import { useAppDispatch, useAppSelector } from "../hooks";

export default function Listings() {
  const dispatch = useAppDispatch();
  const { listings, loading, error } = useAppSelector(
    (state) => state.listingsReducer
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [ownerTypeFilter, setOwnerTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("");
  const [tagFilter, setTagFilter] = useState("");

  useEffect(() => {
    const fetchListings = async () => {
      try {
        dispatch(setListingsLoading(true));
        const data = await getListings();
        dispatch(setListings(data));
      } catch (error) {
        dispatch(setListingsError("Failed to load listings"));
      }
    };

    fetchListings();
  }, [dispatch]);

  const filteredListings = useMemo(() => {
    return listings.filter((listing) => {
      const matchesSearch =
        listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.user.last_name.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesOwnerType =
        ownerTypeFilter === "all" ||
        listing.listing_owner_type === ownerTypeFilter;

      const matchesStatus =
        statusFilter === "all" || listing.status === statusFilter;

      const matchesLocation =
        !locationFilter ||
        (listing.location ?? "")
          .toLowerCase()
          .includes(locationFilter.toLowerCase());

      const matchesTag =
        !tagFilter ||
        listing.tags.some((tag) =>
          tag.name.toLowerCase().includes(tagFilter.toLowerCase())
        );

      return (
        matchesSearch &&
        matchesOwnerType &&
        matchesStatus &&
        matchesLocation &&
        matchesTag
      );
    });
  }, [
    listings,
    searchTerm,
    ownerTypeFilter,
    statusFilter,
    locationFilter,
    tagFilter,
  ]);

  return (
    <div className="p-6 space-y-8">
      <CreateListingForm />

      <div>
        <h1 className="text-2xl font-bold mb-6">Listings</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4 mb-6">
          <input
            type="text"
            placeholder="Search title, description, or user"
            className="border rounded px-3 py-2 xl:col-span-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            className="border rounded px-3 py-2"
            value={ownerTypeFilter}
            onChange={(e) => setOwnerTypeFilter(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="provider">Provider</option>
            <option value="guardian">Guardian</option>
          </select>

          <select
            className="border rounded px-3 py-2"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="open">Open</option>
            <option value="closed">Closed</option>
          </select>

          <input
            type="text"
            placeholder="Filter by location"
            className="border rounded px-3 py-2"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Filter by tag"
            className="border rounded px-3 py-2 w-full md:w-80"
            value={tagFilter}
            onChange={(e) => setTagFilter(e.target.value)}
          />
        </div> 

        <button
          className="px-4 py-2 rounded bg-gray-200"
          onClick={() => {
    setSearchTerm("");
    setOwnerTypeFilter("all");
    setStatusFilter("all");
    setLocationFilter("");
    setTagFilter("");
  }}
>
  Clear Filters
</button>

        {loading && <div>Loading listings...</div>}
        {error && <div className="text-red-600">{error}</div>}
        {!loading && !error && filteredListings.length === 0 && (
          <div>No listings match your filters.</div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </div>
    </div>
  );
}