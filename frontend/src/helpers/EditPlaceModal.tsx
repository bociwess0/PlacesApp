import { X, Save } from "lucide-react";
import { createPortal } from "react-dom";
import { useState } from "react";
import type { Place } from "../types";
import { showSnackbar } from "../store/snackbarSlice";
import { updatePlace } from "../auth/api/services/places";
import { useDispatch } from "react-redux";
import { updatePlaceItem } from "../store/placesSlice";
import ImageUpload from "../auth/ui/ImageUpload";
import { addNotification } from "../store/notificationSlice";

interface Props {
    open: boolean;
    place: Place;
    onClose: () => void;
}

export default function EditPlaceModal({
    open,
    place,
    onClose,
}: Props) {
    const [title, setTitle] = useState(place.title);
    const [description, setDescription] = useState(place.description);
    const [address, setAddress] = useState(place.address);
    const [image, setImage] = useState(place.image);

    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();

    if (!open) return null;


    const handleEdit = async (data: {
        title: string;
        description: string;
        address: string;
        image: string;
    }) => {
        setIsLoading(true);

        try {
            const response = await updatePlace(place._id, data);

            if (response.ok) {
                dispatch(
                    updatePlaceItem({
                        placeId: place._id,
                        ...data,
                    }),
                );

                dispatch(
                    addNotification({
                        title: "Place edited!",
                        message: `"${place.title}" has been edited successfully.`,
                        type: "update",
                    }),
                );

                dispatch(
                    showSnackbar({
                        message: "Place updated successfully.",
                        type: "success",
                    }),
                );

                onClose();
            } else {
                dispatch(
                    addNotification({
                        title: "Error while trying to edit place!",
                        message: `"${place.title}" has not been edited.`,
                        type: "error",
                    }),
                );
                dispatch(
                    showSnackbar({
                        message: "Failed to update place.",
                        type: "error",
                    }),
                );
            }
        } catch {
            console.log("Failed to update place.");

            dispatch(
                addNotification({
                    title: "Error while trying to edit place!",
                    message: `"${place.title}" has not been edited.`,
                    type: "error",
                }),
            );

            dispatch(
                showSnackbar({
                    message: "Failed to update place.",
                    type: "error",
                }),
            );
        } finally {
            setIsLoading(false);
        }
    };

    return createPortal(
        <>
            <div
                onClick={onClose}
                className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            />

            <div className="fixed overflow-auto left-1/2 top-1/2 z-50  max-h-[95vh] w-[95vw] max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-slate-800 bg-[#040B1A] shadow-2xl">
                <div className="border-b border-slate-800 px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-3xl font-bold text-white">
                                Edit Place
                            </h2>

                            <p className="mt-2 text-slate-400">
                                Update the information about this place.
                            </p>
                        </div>

                        <button
                            onClick={onClose}
                            className="cursor-pointer rounded-xl p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
                        >
                            <X size={24} />
                        </button>
                    </div>
                </div>

                <div className="space-y-6 p-8">
                    <div className="grid gap-5 md:grid-cols-2">
                        <div>
                            <label className="mb-2 block text-sm font-semibold uppercase tracking-wide text-slate-300">
                                Title
                            </label>

                            <input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full rounded-xl border border-slate-800 bg-slate-950/60 px-5 py-3.5 text-white outline-none transition placeholder:text-slate-500 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-semibold uppercase tracking-wide text-slate-300">
                                Address
                            </label>

                            <input
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="w-full rounded-xl border border-slate-800 bg-slate-950/60 px-5 py-3.5 text-white outline-none transition placeholder:text-slate-500 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-semibold uppercase tracking-wide text-slate-300">
                            Description
                        </label>

                        <textarea
                            rows={5}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full resize-none rounded-xl border border-slate-800 bg-slate-950/60 px-5 py-3.5 text-white outline-none transition placeholder:text-slate-500 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-semibold uppercase tracking-wide text-slate-300">
                            Image
                        </label>

                        <ImageUpload
                            value={image}
                            onChange={setImage}
                        />

                    </div>

                    <div className="flex flex-col-reverse gap-3 border-t border-slate-800 pt-6 sm:flex-row sm:justify-end">
                        <button
                            onClick={onClose}
                            className="cursor-pointer rounded-xl border border-slate-700 px-6 py-3 font-medium text-white transition hover:border-slate-600"
                        >
                            Cancel
                        </button>

                        <button
                            onClick={() => handleEdit({
                                title,
                                description,
                                address,
                                image,
                            })}
                            disabled={isLoading}
                            className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-500 hover:shadow-lg hover:shadow-violet-500/30 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {isLoading ? (
                                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                            ) : (
                                <>
                                    <Save size={18} />
                                    <span>Save Changes</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </>,
        document.body
    );
}