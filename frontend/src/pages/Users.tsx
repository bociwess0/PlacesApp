import { allUsers } from "../data/all-data";
import UserList from "../user/components/UserList";

export default function Users() {
  return (
    <section>
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-white mb-3">
          All Users
        </h1>

        <p className="text-lg text-white">
          Browse and explore places created by our community.
        </p>
      </div>

      <UserList users={allUsers}/>
    </section>
  )
}
