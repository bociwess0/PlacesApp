import { useEffect } from "react";
import PlacesList from "../places/all-places/PlacesList";
import { getPlacesById } from "../auth/api/services/places";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import AuthRequired from "../auth/components/AuthRequired";
import { loginUser } from "../store/userSlice";
import { setPlaces } from "../store/placesSlice";

export default function Places() {
  const isAuthenticated = useSelector((state: RootState) => state.userActions.isAuthenticated);
  const places = useSelector((state: RootState) => state.placesAction.places)
  const dispatch = useDispatch();

  useEffect(() => {
    async function getPlacesByUserId(uid: string) {
      const fetchedPlaces = await getPlacesById(uid);
      dispatch(setPlaces({places: fetchedPlaces}))
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
