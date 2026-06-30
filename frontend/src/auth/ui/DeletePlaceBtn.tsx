import { Trash2 } from "lucide-react"
import type { Place } from "../../types";
import { useState } from "react";
import { deletePlace } from "../api/services/places";
import ConfirmModal from "../../helpers/ConfirmModal";
import { useDispatch } from "react-redux";
import { deletePlaceItem } from "../../store/placesSlice";
import { showSnackbar } from "../../store/snackbarSlice";

interface Props {
  place: Place;
}

export default function DeletePlaceBtn({ place }: Props) {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const dispatch = useDispatch();


  const handleDelete = async () => {
    setIsLoading(true);


    try {

      const response = await deletePlace(place._id);      

      if (response.ok) {

        dispatch(deletePlaceItem({ placeId: place._id}));

        dispatch(
          showSnackbar({
            message: "Place deleted successfully.",
            type: "success",
          }),
        );
      } else {
        dispatch(
          showSnackbar({
            message: "Failed to delete place.",
            type: "error",
          }),
        );
      }
    } catch {
      console.log("Failed to delete place.");
      dispatch(
        showSnackbar({
          message: "Failed to delete place.",
          type: "error",
        }),
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <button
        onClick={() => setShowDeleteModal(true)}
        className="flex cursor-pointer items-center gap-2 rounded-xl border border-red-500/20 px-4 py-3 text-sm font-medium
     text-red-400 transition hover:bg-red-500/10"
      >
        <Trash2 size={18} />

        {isLoading ? (
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
        ) : (
          "Delete"
        )}

      </button>
      {showDeleteModal && (
        <ConfirmModal
          title="Delete"
          message="Are you sure you want to delete this place?"
          confirmText="Delete"
          variant="danger"
          onConfirm={handleDelete}
          onClose={() => setShowDeleteModal(false)}
        />
      )}

    </div>
  );
}
