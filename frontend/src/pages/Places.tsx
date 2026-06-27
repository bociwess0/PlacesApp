import { useEffect } from "react";
import PlacesList from "../places/all-places/PlacesList";
import { getPlacesById } from "../auth/api/services/places";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import AuthRequired from "../auth/components/AuthRequired";
import { loginUser } from "../store/userSlice";
import { setPlaces } from "../store/placesSlice";
import NoPlacesFound from "../auth/components/NoPlacesFound";

export default function Places() {
  const isAuthenticated = useSelector(
    (state: RootState) => state.userActions.isAuthenticated,
  );
  const places = useSelector((state: RootState) => state.placesAction.places);
  const searchTerm = useSelector(
    (state: RootState) => state.placesAction.searchTerm,
  );

  const dispatch = useDispatch();

  const term = searchTerm.toLowerCase();

  const filteredPlaces = places.filter(
    (place) =>
      place.title.toLowerCase().includes(term) ||
      place.address.toLowerCase().includes(term),
  );

  useEffect(() => {
    async function getPlacesByUserId(uid: string) {
      const fetchedPlaces = await getPlacesById(uid);
      dispatch(setPlaces({ places: fetchedPlaces }));
    }

    const user: {
      userId: string;
      token: string;
      name: string;
      email: string;
    } | null = JSON.parse(localStorage.getItem("userData") ?? "null");

    if (user) {
      dispatch(
        loginUser({
          userId: user.userId,
          token: user.token,
          name: user.name,
          email: user.email,
        }),
      );
      getPlacesByUserId(user.userId);
    }
  }, [dispatch]);

  if (!isAuthenticated) {
    return <AuthRequired />;
  }

  if (filteredPlaces.length === 0) {
    return (
      <>
        <h1 className="text-5xl font-bold text-white">Places</h1>

        <NoPlacesFound />
      </>
    );
  }

  return (
    <div>
      <h1 className="text-5xl font-bold text-white">Places</h1>
      {filteredPlaces && filteredPlaces.length > 0 && (
        <PlacesList places={filteredPlaces} />
      )}
    </div>
  );
}
