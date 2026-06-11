import { api } from "../api";

export async function getPlacesById(uid: string) {
  try {
    const response = await api.get(`/places/user/${uid}`);

    return response.data.places;
  } catch (error) {
    console.log("Error fetching places data!");
    throw error;
  }
}
