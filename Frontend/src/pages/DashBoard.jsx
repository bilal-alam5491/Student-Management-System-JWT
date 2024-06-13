import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const DashBoard = () => {
  const [loggedUserEmail, setLoggedUserEmail] = useState("");
  const [loggedUserId, setLoggedUserId] = useState("");
  const [students, setStudents] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      navigate("/login");
    } else {
      const decoded = jwtDecode(token);

      setLoggedUserEmail(decoded.userEmail);
      setLoggedUserId(decoded.userId);

      const loggedUserData = async () => {
        try {
          const res = await axios.get("http://localhost:3000/student/get", {
            withCredentials: true, // Include this to ensure cookies are sent
          });
          // console.log(res.data.students);
          setStudents(res.data.students);
        } catch (error) {
          console.log(error.message);
        }
      };

      loggedUserData();
    }
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await axios
        .get("http://localhost:3000/logout", { withCredentials: true })
        .then((res) => {
          Cookies.remove("token");
          navigate("/login");
        })
        .catch((err) => {
          console.log(err.message);
        });
    } catch (error) {
      console.log(err.message);
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">
        Welcome to Dashboard: {loggedUserEmail}
      </h1>
      <button
        onClick={handleLogout}
        className="mb-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none"
      >
        Logout
      </button>

      <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-lg">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Phone</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index} className="text-center">
              <td className="py-2 px-4 border-b">{student._id}</td>
              <td className="py-2 px-4 border-b">{student.name}</td>
              <td className="py-2 px-4 border-b">{student.email}</td>
              <td className="py-2 px-4 border-b">{student.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Link
        to="/addstudents"
        className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
      >
        Add Student
      </Link>
    </div>
  );
};

export default DashBoard;
