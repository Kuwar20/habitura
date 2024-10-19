import React, { useEffect, useState } from "react";
import FileInput from "../../Components/formInputs/FileInput";
import {
  makeAuthenticatedGETRequest,
  makeAuthenticatedPOSTFileRequest,
  makeAuthenticatedPUTRequest,
} from "../../utils/serverHelpers";
import Sidebar from "../../Components/common/Sidebar";
import PageHeading from "../../Components/common/PageHeading";
import Input from "../../Components/formInputs/Input";
import { Toast, ToastProvider } from "../../Components/common/Toast";

const MyProfile = () => {
  const [key, setKey] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [newProfilePicture, setNewProfilePicture] = useState(null);
  const [updateUser, setUpdateUser] = useState({
    fullname: "",
    currentPassword: "",
    newPassword: "",
  });

  // Handle file input change for profile picture
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewProfilePicture(file);
    }
  };

  // Handle Info Change
  const handleInfoChange = (e) => {
    const { name, value } = e.target;
    setUpdateUser({ ...updateUser, [name]: value });
  };

  // Handle upload of profile picture
  const handleUpload = async () => {
    if (!newProfilePicture) {
      Toast.error("No file selected.");
      return;
    }

    const formData = new FormData();
    formData.append("profilePicture", newProfilePicture);

    try {
      const response = await makeAuthenticatedPOSTFileRequest(
        "/updateUser/profile",
        formData
      );
      setProfilePicture(response.path);
      Toast.success("Profile picture updated successfully!");
    } catch (error) {
      console.log(error);
      Toast.error("Failed to upload profile picture.");
    }
  };

  // Handle Save Changes
  const handleSaveChanges = async () => {
    try {
      const response = await makeAuthenticatedPUTRequest(
        "/updateUser/info",
        updateUser
      );
      setKey("");

      console.log(response);

      if (!response.success) {
        Toast.error("Incorrect current password or update failed.");
      } else {
        Toast.success("Profile updated successfully!");
        setUpdateUser({
          currentPassword: "",
          newPassword: "",
        })
      }
    } catch (error) {
      console.error(error);
      Toast.error("An error occurred: " + error);
    }
  };

  // Handle keydown - 'Enter'
  const handleKeyDown = (e) => {
    setKey(e.key);
    if (e.key === "Enter") {
      handleSaveChanges();
    }
  };

  // Fetch current profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await makeAuthenticatedGETRequest(
          "/updateUser/getProfile"
        );
        setProfilePicture(response.profilePicture);
        setUpdateUser({
          fullname: response.fullname,
        });
        console.log(response)
      } catch (error) {
        console.error("Error fetching profile:", error);
        Toast.error("Error fetching profile.");
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="lg:h-screen flex flex-col md:flex-row">
      <ToastProvider />
      <Sidebar />
      <div className="p-pagePadding bg-primary bg-opacity-opacityPrimary w-full h-full flex flex-col justify-center items-center">
        <PageHeading title={"My Profile"} className={"text-left w-full"} />
        <div className=" rounded-md p-pagePadding h-full w-full md:w-2/3">
          {/* Profile Picture */}
          <div className="relative flex flex-col items-center">
            <img
              src={profilePicture}
              alt="Profile"
              className="h-32 w-32 object-cover rounded-full mb-4"
            />

            <FileInput
              onChange={handleFileChange}
              labelname={"Change Profile Picture:"}
              buttonName={"Upload"}
              onClick={handleUpload}
              className={"absolute top-24"}
            />
          </div>

          {/* Name Input */}
          <div className="mt-6 space-y-7">
            <Input
              type={"text"}
              name={"fullname"}
              value={updateUser.fullname}
              handleChange={handleInfoChange}
              required={true}
              labelname={"Full Name"}
              onKeyDown={handleKeyDown}
            />
            <Input
              type={"password"}
              name={"currentPassword"}
              value={updateUser.currentPassword}
              handleChange={handleInfoChange}
              required={true}
              labelname={"Current Password"}
              onKeyDown={handleKeyDown}
            />
            <Input
              type={"password"}
              name={"newPassword"}
              value={updateUser.newPassword}
              handleChange={handleInfoChange}
              required={true}
              labelname={"New Password"}
              onKeyDown={handleKeyDown}
            />
          </div>

          {/* Save Button */}
          <div className="mt-6">
            <button
              onClick={handleSaveChanges}
              className="w-full bg-coolsecondary text-white py-2 rounded-lg hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-coolsecondary transition-colors duration-300"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
