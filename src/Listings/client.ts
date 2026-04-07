import axios from "axios";
import type { Listing, CreateListingPayload, UpdateListingPayload } from "./reducer";

const API_URL = "http://localhost:4000/api/listings";

export const getListings = async (): Promise<Listing[]> => {
  try {
    const response = await axios.get<Listing[]>(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching listings:", error);
    throw error;
  }
};

export const getListingById = async (id: string): Promise<Listing> => {
  try {
    const response = await axios.get<Listing>(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching listing with id ${id}:`, error);
    throw error;
  }
};

export const createListing = async (
  listing: CreateListingPayload,
  token: string
): Promise<Listing> => {
  try {
    const response = await axios.post<Listing>(API_URL, listing, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating listing:", error);
    throw error;
  }
};

export const updateListing = async (
  id: string,
  updates: UpdateListingPayload,
  token: string
): Promise<Listing> => {
  try {
    const response = await axios.patch<Listing>(`${API_URL}/${id}`, updates, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating listing with id ${id}:`, error);
    throw error;
  }
};

export const deleteListing = async (
  id: string,
  token: string
): Promise<{ message: string; listing?: Listing }> => {
  try {
    const response = await axios.delete<{ message: string; listing?: Listing }>(
      `${API_URL}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Error deleting listing with id ${id}:`, error);
    throw error;
  }
};
