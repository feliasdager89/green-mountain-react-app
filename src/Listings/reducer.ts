import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type Tag = {
  id: string;
  name: string;
};

export type Patient = {
  id: string;
  first_name: string;
  last_name: string;
  age: number;
  care_level: string;
  notes: string;
} | null;

export type ListingUser = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
};

export type Listing = {
  id: string;
  title: string;
  description: string;
  location: string;
  status: "open" | "closed";
  created_at: string;
  listing_owner_type: "provider" | "guardian";
  user: ListingUser;
  patient: Patient;
  tags: Tag[];
};

export type CreateListingPayload = {
  title: string;
  description: string;
  location?: string;
  patient_id?: string | null;
};

export type UpdateListingPayload = {
  title?: string;
  description?: string;
  location?: string;
  status?: "open" | "closed";
  patient_id?: string | null;
};

type ListingsState = {
  listings: Listing[];
  selectedListing: Listing | null;
  loading: boolean;
  error: string | null;
};

const initialState: ListingsState = {
  listings: [],
  selectedListing: null,
  loading: false,
  error: null,
};

const listingsSlice = createSlice({
  name: "listings",
  initialState,
  reducers: {
    setListings: (state, action: PayloadAction<Listing[]>) => {
      state.listings = action.payload;
      state.loading = false;
      state.error = null;
    },
    setSelectedListing: (state, action: PayloadAction<Listing | null>) => {
      state.selectedListing = action.payload;
      state.loading = false;
      state.error = null;
    },
    addListing: (state, action: PayloadAction<Listing>) => {
      state.listings.unshift(action.payload);
    },
    updateListingInState: (state, action: PayloadAction<Listing>) => {
      state.listings = state.listings.map((listing) =>
        listing.id === action.payload.id ? action.payload : listing
      );

      if (state.selectedListing?.id === action.payload.id) {
        state.selectedListing = action.payload;
      }
    },
    deleteListingFromState: (state, action: PayloadAction<string>) => {
      state.listings = state.listings.filter(
        (listing) => listing.id !== action.payload
      );

      if (state.selectedListing?.id === action.payload) {
        state.selectedListing = null;
      }
    },
    setListingsLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setListingsError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearSelectedListing: (state) => {
      state.selectedListing = null;
    },
  },
});

export const {
  setListings,
  setSelectedListing,
  addListing,
  updateListingInState,
  deleteListingFromState,
  setListingsLoading,
  setListingsError,
  clearSelectedListing,
} = listingsSlice.actions;

export default listingsSlice.reducer;