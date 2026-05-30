import type { User } from "../../types";
import { MdLocationPin } from "react-icons/md";

interface Props {
  user: User;
}

export default function UserItem({ user }: Props) {
  return (
    <div
      className="
    group
    flex flex-col items-center
    flex-[1/5] min-w-70 max-w-[320px]
    rounded-3xl
    border border-slate-800
    bg-slate-950/40
    p-8
    relative
    overflow-hidden
    transition-all duration-300
    hover:border-violet-500/50
    cursor-pointer
  "
    >
      {/* Glow */}
      <div
        className="
      absolute inset-0 opacity-0
      group-hover:opacity-100
      transition-opacity duration-300
      bg-linear-to-br
      from-blue-500/10
      via-transparent
      to-violet-500/15
      pointer-events-none
    "
      />

      <img
        src={`${user.image}`}
        alt={user.name}
        className="h-32 w-32 rounded-full object-cover relative z-10"
      />

      <h2 className="mt-8 text-4xl font-bold text-white relative z-10">
        {user.name}
      </h2>

      <div
        className={`
      mt-4 flex items-center gap-2 font-medium relative z-10
      ${user.places > 0 ? "text-violet-400" : "text-slate-300"}
    `}
      >
        <MdLocationPin size={20} />
        <span>
          {user.places} {user.places === 1 ? "Place" : "Places"}
        </span>
      </div>
    </div>
  );
}
