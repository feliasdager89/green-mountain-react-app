import { useEffect } from "react";
import ListingCard from "./ListingCard";
import { getListings } from "./client";
import {
  setListings,
  setListingsError,
  setListingsLoading,
} from "./reducer";
import { useAppDispatch, useAppSelector } from "../hooks";
import CreateListingForm from "./CreateListingForm";

export default function Listings() {
  const dispatch = useAppDispatch();
  const { listings, loading, error } = useAppSelector(
    (state) => state.listingsReducer
  );

  useEffect(() => {
    const fetchListings = async () => {
      try {
        dispatch(setListingsLoading(true));
        const data = await getListings();
        dispatch(setListings(data));
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        dispatch(setListingsError("Failed to load listings"));
      }
    };

    fetchListings();
  }, [dispatch]);

  if (loading) {
    return <div className="p-6">Loading listings...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-600">{error}</div>;
  }

  if (listings.length === 0) {
    return <div className="p-6">No listings available yet.</div>;
  }

  return (
    <div className="p-6">
      <CreateListingForm />
      <h1 className="text-2xl font-bold mb-6">Listings</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {listings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
    </div>
  );
}