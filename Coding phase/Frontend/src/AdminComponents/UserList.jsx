function UserList({ users }) 
{
  if (!Array.isArray(users) || users.length === 0) {
    return <p className="font-semibold text-gray-800 text-xl mt-10"> No user found!</p>;
  }

  return (
    <div className="mt-10">
      <p className="font-semibold text-gray-800 text-xl ml-6"> UserList: </p>
      <div className="user-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
        {users.map((user) => (
          <div key={user.userID} className="user-card border rounded-md p-4 shadow-lg bg-stone-200">
            <p><strong className="text-gray-600">Email: </strong> <a href={`mailto:${user.emailID}`} className="text-cyan-600">{user.emailID}</a></p>
            <p className="text-gray-700"><strong className="text-gray-600">UserName: </strong>{user.userName}</p>
            <p className="text-gray-700"><strong className="text-gray-600">Mobile No: </strong> {user.userPhoneNo}</p>
            <p className="text-gray-700"><strong className="text-gray-600">Hostel No: </strong> {user.hostelNo}</p>
            <p className="text-gray-700"><strong className="text-gray-600">Room No: </strong> {user.roomNo}</p>
            <p className="text-gray-700"><strong className="text-gray-600">Course: </strong> {user.userCourse}</p>
            <p className="text-gray-700"><strong className="text-gray-600">Dept: </strong> {user.userDept}</p>
          </div>
        ))}
      </div>
    </div>
  );
  }
  export default UserList;
  