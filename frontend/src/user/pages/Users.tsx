import { allUsers } from "../../data/all-data";
import UserList from "../components/UserList";

export default function Users() {
  return (
    <div>
      <UserList users={allUsers} />
    </div>
  )
}
