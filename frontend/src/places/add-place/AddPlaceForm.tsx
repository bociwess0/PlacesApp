import { PlusCircle } from "lucide-react";

export default function AddPlaceForm() {
  return (
    <div
      className="
        max-w-5xl
        rounded-3xl
        border
        border-slate-800
        bg-slate-950/30
        p-4
        md:p-8
      "
    >
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-xl md:text-4xl font-bold text-white">
          Add Place
        </h1>

        <p className="mt-4 md:text-lg text-slate-400">
          Fill in the details below to add a new place.
        </p>
      </div>

      <form className="mt-5 flex flex-col gap-8">
        <div>
          <label
            htmlFor="title"
            className="mb-3 block text-lg font-semibold text-white"
          >
            Title
          </label>

          <input
            id="title"
            type="text"
            placeholder="Enter place title"
            className="
              w-full
              rounded-2xl
              border
              border-slate-800
              bg-slate-950/50
              px-5
              py-4
              text-white
              outline-none
              transition-all

              placeholder:text-slate-500

              focus:border-violet-500/50
              focus:ring-2
              focus:ring-violet-500/20
            "
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="mb-3 block text-lg font-semibold text-white"
          >
            Description
          </label>

          <textarea
            id="description"
            rows={5}
            placeholder="Describe your place..."
            className="
              w-full
              resize-none
              rounded-2xl
              border
              border-slate-800
              bg-slate-950/50
              px-5
              py-4
              text-white
              outline-none
              transition-all

              placeholder:text-slate-500

              focus:border-violet-500/50
              focus:ring-2
              focus:ring-violet-500/20
            "
          />
        </div>

        <div>
          <label
            htmlFor="address"
            className="mb-3 block text-lg font-semibold text-white"
          >
            Address
          </label>

          <input
            id="address"
            type="text"
            placeholder="Enter address"
            className="
              w-full
              rounded-2xl
              border
              border-slate-800
              bg-slate-950/50
              px-5
              py-4
              text-white
              outline-none
              transition-all

              placeholder:text-slate-500

              focus:border-violet-500/50
              focus:ring-2
              focus:ring-violet-500/20
            "
          />
        </div>

        <div>
          <button
            type="submit"
            className="
              flex items-center gap-3
              rounded-2xl

              bg-violet-600
              px-8
              py-4

              font-semibold
              text-white

              transition-all

              hover:bg-violet-500
              hover:shadow-lg
              hover:shadow-violet-500/30
              cursor-pointer
            "
          >
            <PlusCircle size={20} />

            <span>ADD PLACE</span>
          </button>
        </div>
      </form>
    </div>
  );
}