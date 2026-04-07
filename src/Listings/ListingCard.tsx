import { Link } from "react-router-dom";
import type { Listing } from "./reducer";

type ListingCardProps = {
  listing: Listing;
};

export default function ListingCard({ listing }: ListingCardProps) {
  return (
    <Link
      to={`/listings/${listing.id}`}
      className="block border rounded-lg shadow-sm p-4 hover:shadow-md transition"
    >
      <div className="flex justify-between items-start gap-4">
        <h2 className="text-xl font-semibold">{listing.title}</h2>
        <span className="text-sm text-gray-500 whitespace-nowrap">
          {new Date(listing.created_at).toLocaleDateString()}
        </span>
      </div>

      <p className="mt-2 text-gray-700 line-clamp-3">{listing.description}</p>

      <div className="mt-3 text-sm text-gray-600">
        <p>
          <span className="font-medium">Location:</span> {listing.location || "N/A"}
        </p>
        <p>
          <span className="font-medium">Posted by:</span>{" "}
          {listing.user.first_name} {listing.user.last_name}
        </p>
        <p>
          <span className="font-medium">Type:</span> {listing.listing_owner_type}
        </p>
      </div>

      {listing.patient && (
        <div className="mt-3 text-sm text-gray-600">
          <p>
            <span className="font-medium">Patient:</span>{" "}
            {listing.patient.first_name} {listing.patient.last_name}
          </p>
          <p>
            <span className="font-medium">Care level:</span>{" "}
            {listing.patient.care_level}
          </p>
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        {listing.tags.map((tag) => (
          <span
            key={tag.id}
            className="text-xs bg-gray-200 px-2 py-1 rounded-full"
          >
            {tag.name}
          </span>
        ))}
      </div>
    </Link>
  );
}