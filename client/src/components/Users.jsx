import Header from "../layout/Header";
import { useSelector } from "react-redux";

export const Users = () => {

  const { users } = useSelector((state) => state.user);

  console.log("users", users);
  const formData = (timeStamp) => {
    const date = new Date(timeStamp);
    const formattedDate = `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;

    const formattedTime = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
    const result = `${formattedDate} ${formattedTime}`;
    return result;

  }
  return <>
    <main className="pt-20 px-8 pb-8 w-full">
      <Header />
      {/* sub Header */}
      <header className="flex  flex-col md:flex-row  md:items-center gap-3 justify-between items-center mb-8">
        <h2 className="text-2xl font-semibold">Registered user</h2>
      </header>
      {/* Table */}


      {
        users && users.filter((u) => u.role === "Admin").length > 0 ? (
        <div className="mt-6 overflow-auto bg-white rounded-lg shadow-lg">

          <table className="min-w-full table-auto border-collapse">

            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">ID</th>
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Role</th>
                <th className="py-3 px-6 text-center">No of Books Borrowed </th>
                <th className="py-3 px-6 text-center">Created At</th>
                <th className="py-3 px-6 text-center">Registered At</th>
              </tr>
            </thead>
              <tbody>
                {users && users.filter((u) => u.role === "User").map((user, index) => (
                  <tr key={user._id} className={index % 2 === 0 ? "bg-white text-gray-600 hover:bg-gray-100 border-b border-gray-200" : "bg-gray-50 text-gray-600 hover:bg-gray-100 border-b border-gray-200"}>
                    <td className="py-3 px-6 text-left whitespace-nowrap">{user._id}</td> 
                    <td className="py-3 px-6 text-left">{user.name}</td>
                    <td className="py-3 px-6 text-left">{user.email}</td>
                    <td className="py-3 px-6 text-left">{user.role}</td>
                    <td className="py-3 px-6 text-center">{user?.borrowedBooks.length}</td>
                    <td className="py-3 px-6 text-center">{formData(user.createdAt)}</td>
                  </tr>
                ))}
              </tbody>

          </table>

        </div>
        ) : <h3 className="text-center mt-20 text-gray-600 font-medium">
          No registered users found.
        </h3>
        }
    </main>
  </>;

}
export default Users;




