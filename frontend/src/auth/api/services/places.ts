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



interface CreatePlaceData {
  title: string;
  description: string;
  address: string;
  image: string;
}

export async function createPlace(place: CreatePlaceData) {
  try {
    const user = JSON.parse(localStorage.getItem("userData") ?? "null");

    if (!user) {
      throw new Error("User is not authenticated.");
    }

    const response = await api.post(
      "/places",
      {
        ...place,
        creator: user.userId,
      },
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    console.log("Error creating place!");
    throw error;
  }
}