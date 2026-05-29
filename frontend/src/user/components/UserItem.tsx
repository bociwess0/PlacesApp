import type { User } from "../../types";
import { MdLocationPin } from "react-icons/md";

interface Props  {
    user: User
}

export default function UserItem({user}: Props) {
  return (
    <div className="flex items-center gap-6 rounded-3xl border border-slate-700 bg-slate-900 p-8 shadow-lg transition-all hover:border-violet-500 hover:shadow-violet-500/10">
      <img
        src={`src/assets/${user.image}`}
        alt={user.name}
        className="h-24 w-24 rounded-full object-cover"
      />

      <div>
        <h2 className="text-3xl font-bold text-white">
          {user.name}
        </h2>

        <div className="mt-3 flex items-center gap-2 text-violet-400">
          <MdLocationPin size={20} />

          <span className="font-medium">
            {user.places} {user.places === 1 ? "Place" : "Places"}
          </span>
        </div>
      </div>
    </div>
  );
}
