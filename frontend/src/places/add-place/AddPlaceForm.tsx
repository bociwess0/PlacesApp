import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { createPlace } from "../../auth/api/services/places";
import type { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import AuthRequired from "../../auth/components/AuthRequired";
import ImageUpload from "../../auth/ui/ImageUpload";

export default function AddPlaceForm() {
  const isAuthenticated = useSelector(
    (state: RootState) => state.userActions.isAuthenticated,
  );
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await createPlace({
        title,
        description,
        address,
        image,
      });

      setTitle("");
      setDescription("");
      setAddress("");
      setImage("");

      setSuccess("Your place has been created successfully!");
    } catch {
      setError("Failed to create place.");
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return <AuthRequired />;
  }

  return (
    <div className="w-full max-w-5xl">
      <div className="pb-5">
        <p className="mt-2 text-slate-400">
          Create a new destination and share your favorite places around the
          world.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-2 space-y-6">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div>
            <label
              htmlFor="title"
              className="mb-2 block text-sm font-semibold uppercase tracking-wide text-slate-300"
            >
              Title
            </label>

            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Empire State Building"
              className="w-full rounded-xl border border-slate-800 bg-slate-950/60 px-5 py-3.5 text-white outline-none transition placeholder:text-slate-500 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
            />
          </div>

          <div>
            <label
              htmlFor="address"
              className="mb-2 block text-sm font-semibold uppercase tracking-wide text-slate-300"
            >
              Address
            </label>

            <input
              id="address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="New York, USA"
              className="w-full rounded-xl border border-slate-800 bg-slate-950/60 px-5 py-3.5 text-white outline-none transition placeholder:text-slate-500 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-semibold uppercase tracking-wide text-slate-300"
          >
            Description
          </label>

          <textarea
            id="description"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Tell us something interesting about this place... (minimum 6 letter word)"
            className="w-full resize-none rounded-xl border border-slate-800 bg-slate-950/60 px-5 py-3.5 text-white outline-none transition placeholder:text-slate-500 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
          />
        </div>

        <div>
          <label
            htmlFor="image"
            className="mb-2 block text-sm font-semibold uppercase tracking-wide text-slate-300"
          >
            Image
          </label>

          <ImageUpload
            value={image}
            onChange={setImage}
          />

        </div>

        {error && (
          <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        {success && (
          <div className="flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>

            <span>{success}</span>
          </div>
        )}

        <div className="flex flex-col-reverse gap-3 border-t border-slate-800 pt-5 sm:flex-row sm:justify-end">
          <button
            type="submit"
            disabled={loading}
            className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-500 hover:shadow-lg hover:shadow-violet-500/30 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <PlusCircle size={18} />
            <span>{loading ? "Creating..." : "Add Place"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
