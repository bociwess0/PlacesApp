import { Compass, FileText, MapPin, X } from "lucide-react";
import { createPortal } from "react-dom";
import type { Place } from "../../types";

interface Props {
  place: Place;
  onClose: () => void;
}

export default function PlacesMap({ place, onClose }: Props) {
  return createPortal(
    <>
      {/* Overlay */}
      <div
        className="
          fixed inset-0
          z-50
          bg-black/70
          backdrop-blur-sm
        "
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="
              fixed
    left-1/2
    top-1/2
    z-50

    w-[95vw]
    max-w-6xl

    max-h-[90vh]

    -translate-x-1/2
    -translate-y-1/2

    overflow-y-auto

    rounded-3xl
    border border-slate-800
    bg-[#040B1A]

    shadow-2xl
        "
      >
        {/* Header */}
        <div
          className="
            flex items-center justify-between
            border-b border-slate-800
            p-6
          "
        >
          <h2 className="text-3xl font-bold text-white">{place.title}</h2>

          <button
            onClick={onClose}
            className="
              text-slate-400
              transition
              hover:text-white
            "
          >
            <X size={28} />
          </button>
        </div>

        {/* Content */}
        <div
          className="
            flex flex-col gap-6
            p-6

            lg:flex-row
          "
        >
          {/* Left */}
          <div className="lg:w-1/3">
            <img
              src={place.image}
              alt={place.title}
              className="
                h-56
                w-full
                rounded-2xl
                object-cover
              "
            />

            <div className="mt-6 space-y-5">
              <div className="flex items-start gap-3">
                <MapPin size={20} className="mt-0.5 text-violet-400" />

                <div>
                  <p className="text-slate-300">{place.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FileText size={20} className="mt-0.5 text-violet-400" />

                <p className="text-slate-400">{place.description}</p>
              </div>

              <div className="flex items-start gap-3">
                <Compass size={20} className="mt-0.5 text-violet-400" />

                <div className="text-slate-500">
                  <p>Latitude: {place.location.lat}</p>
                  <p>Longitude: {place.location.lng}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="lg:w-2/3">
            <div className="overflow-hidden max-h-80 md:max-h-none rounded-2xl border border-slate-800">
              <iframe
                title={place.title}
                width="100%"
                height="500"
                loading="lazy"
                src={`https://maps.google.com/maps?q=${place.location.lat},${place.location.lng}&z=15&output=embed`}
              />
            </div>
          </div>
        </div>
      </div>
    </>,
    document.body,
  );
}
