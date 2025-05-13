import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
 // adjust the path as needed

const Profile = () => {
  const navigate =useNavigate()
    const [data, setdata] = useState({});
   

    useEffect(() => {
      (async () => {
        try {
          const res = await axios.get(
            "http://localhost:5050/api/getMyProfile",
            {
              withCredentials: true,
            }
          );
          setdata(res.data.user);
        } catch (err) {
          console.error("Profile fetch error:", err);
        }
      })();
    }, []);
  
  return (
    <Layout>
      <div className="container mx-auto py-10 px-4">
        {/* Edit Button */}
        <div className="flex justify-end max-w-2xl mx-auto mb-4">
          <button
            onClick={() => navigate(`/updateProfile`, { state: data })}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg shadow transition duration-200"
          >
            Edit Profile
          </button>
        </div>

        {/* Profile Card */}
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-md p-6 dark:bg-gray-800">
          <div className="flex flex-col items-center space-y-4">
            <img
              src={data.profilepic}
              alt=""
              className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-md"
            />
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                {data.fullname}
              </h1>
              <p className="text-gray-500 dark:text-gray-300">{data.email}</p>
              <p className="text-gray-500 dark:text-gray-300">
                {" "}
                {data.phoneNumber}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
