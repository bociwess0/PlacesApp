import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AuthRequired from "../auth/components/AuthRequired";
import NoPlacesFound from "../auth/components/NoPlacesFound";
import { getPlacesById } from "../auth/api/services/places";
import PlacesList from "../places/all-places/PlacesList";
import { setPlaces } from "../store/placesSlice";
import type { RootState } from "../store/store";
import { loginUser } from "../store/userSlice";
import LoadingPlaceholder from "../components/LoadingPlaceholder";

export default function Places() {
  const [isLoading, setIsLoading] = useState(false);

  const isAuthenticated = useSelector(
    (state: RootState) => state.userActions.isAuthenticated,
  );

  const places = useSelector(
    (state: RootState) => state.placesAction.places,
  );

  const searchTerm = useSelector(
    (state: RootState) => state.placesAction.searchTerm,
  );

  const dispatch = useDispatch();

  const term = searchTerm.toLowerCase().trim();

  const filteredPlaces = places.filter(
    (place) =>
      place.title.toLowerCase().includes(term) ||
      place.address.toLowerCase().includes(term),
  );

  useEffect(() => {
    const user: {
      userId: string;
      token: string;
      name: string;
      email: string;
    } | null = JSON.parse(
      localStorage.getItem("userData") ?? "null",
    );

    if (!user) return;

    dispatch(
      loginUser({
        userId: user.userId,
        token: user.token,
        name: user.name,
        email: user.email,
      }),
    );

    const fetchPlaces = async () => {
      setIsLoading(true);

      try {
        const fetchedPlaces = await getPlacesById(user.userId);

        dispatch(
          setPlaces({
            places: fetchedPlaces,
          }),
        );
      } catch (error) {
        console.log("Failed to fetch places.", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlaces();
  }, [dispatch]);

  if (!isAuthenticated) {
    return <AuthRequired />;
  }

  if (isLoading) {
    return <LoadingPlaceholder />
  }

  if (filteredPlaces.length === 0) {
    return (
      <>
        <h1 className="text-3xl font-bold text-white md:text-5xl">
          Places
        </h1>

        <NoPlacesFound />
      </>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-white md:text-5xl">
        Places
      </h1>

      <PlacesList places={filteredPlaces} />
    </div>
  );
}