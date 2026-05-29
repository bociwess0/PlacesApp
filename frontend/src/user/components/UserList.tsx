import type { User } from "../../types";
import UserItem from "./UserItem";

interface Props {
  users: User[];
}

export default function UserList({ users }: Props) {
  return (
    <div className="flex flex-wrap gap-8">
      {users.map((user: User) => (
        <UserItem key={user.id} user={user} />
      ))}
    </div>
  );
}
