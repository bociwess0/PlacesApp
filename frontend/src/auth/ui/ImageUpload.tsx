
import { ImagePlus, Loader2, Trash2 } from "lucide-react";
import { useRef, useState } from "react";
import { uploadImage } from "../api/services/upload-image";
import { showSnackbar } from "../../store/snackbarSlice";
import { useDispatch } from "react-redux";

interface Props {
    value: string;
    onChange: (url: string) => void;
}


export default function ImageUpload({
    value,
    onChange,
}: Props) {
    const inputRef = useRef<HTMLInputElement>(null);

    const [preview, setPreview] = useState(value);
    const [uploading, setUploading] = useState(false);

    const dispatch = useDispatch();

    const handleClick = () => {
        inputRef.current?.click();
    };

    const handleFileChange = async (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const file = e.target.files?.[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            dispatch(showSnackbar({
                message: "Please select an image.",
                type: "error",
            }))
            return;
        }

        if (file.size > 3 * 1024 * 1024) {
            dispatch(showSnackbar({
                message: "Image must be smaller than 3MB.",
                type: "error",
            }))
            return;
        }

        const previewUrl = URL.createObjectURL(file);
        setPreview(previewUrl);

        setUploading(true);

        const response = await uploadImage(file);

        setUploading(false);

        if (response.ok) {
            onChange(response.url);
            setPreview(response.url);
        } else {
            setPreview("");

            dispatch(showSnackbar({
                message: "Image upload failed.",
                type: "error",
            }))
            return;
        }
    };

    const handleRemove = () => {
        onChange("");
        setPreview("");

        if (inputRef.current) {
            inputRef.current.value = "";
        }
    };


    return (
        <div>
            <input
                ref={inputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                className="hidden"
                onChange={handleFileChange}
            />

            {!preview ? (
                <button
                    type="button"
                    onClick={handleClick}
                    className="group max-h-58 flex w-full cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-700 bg-slate-950/40 px-6 py-12 transition-all hover:border-violet-500 hover:bg-slate-900/60"
                >
                    {uploading ? (
                        <>
                            <Loader2
                                size={46}
                                className="animate-spin text-violet-400"
                            />

                            <p className="mt-5 font-semibold text-white">
                                Uploading...
                            </p>
                        </>
                    ) : (
                        <>
                            <ImagePlus
                                size={52}
                                className="text-slate-400 transition group-hover:text-violet-400"
                            />

                            <h3 className="mt-5 text-lg font-semibold text-white">
                                Upload image
                            </h3>

                            <p className="mt-2 text-center text-sm text-slate-400">
                                Click here to choose an image
                            </p>

                            <p className="mt-1 text-xs text-slate-500">
                                PNG • JPG • WEBP
                            </p>
                        </>
                    )}
                </button>
            ) : (
                <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/40">
                    <img
                        src={preview}
                        alt="Preview"
                        className="h-64 w-full object-cover"
                    />

                    <div className="flex flex-col gap-3 border-t border-slate-800 p-4 sm:flex-row">
                        <button
                            type="button"
                            onClick={handleClick}
                            className="flex flex-1 cursor-pointer items-center justify-center rounded-xl border border-slate-700 px-4 py-3 font-medium text-white transition hover:border-violet-500 hover:text-violet-400"
                        >
                            Change image
                        </button>

                        <button
                            type="button"
                            onClick={handleRemove}
                            className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border border-red-500/20 px-4 py-3 font-medium text-red-400 transition hover:bg-red-500/10"
                        >
                            <Trash2 size={18} />
                            Remove
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
