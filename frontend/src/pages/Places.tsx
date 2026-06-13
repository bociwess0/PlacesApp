import { useEffect, useState } from "react";
import PlacesList from "../places/all-places/PlacesList";
import type { Place } from "../types";
import { getPlacesById } from "../auth/api/services/places";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import AuthRequired from "../auth/components/AuthRequired";
import { loginUser } from "../store/userSlice";

export default function Places() {
  const [places, setPlaces] = useState<Place[]>([]);
  const isAuthenticated = useSelector((state: RootState) => state.userActions.isAuthenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getPlacesByUserId(uid: string) {
      const fetchedPlaces = await getPlacesById(uid);
      setPlaces(fetchedPlaces);
    }

    const user: {
      userId: string;
      token: string;
      name: string;
      email: string;
    } | null = JSON.parse(localStorage.getItem("userData") ?? "null");

    if (user) {
      dispatch(loginUser({userId: user.userId, token: user.token, name: user.name, email: user.email}))
      getPlacesByUserId(user.userId);
    }
  }, []);

  if (!isAuthenticated) {
    return <AuthRequired />;
  }

  return (
    <div>
      <h1 className="text-5xl font-bold text-white">Places</h1>
      {places && places.length > 0 && <PlacesList places={places} />}
    </div>
  );
}
