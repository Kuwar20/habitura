import React from "react";
import { FaGithub } from "react-icons/fa";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "./firebase";
import { makeUnauthenticatedPOSTRequest } from "../../utils/serverHelpers";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const GitHubLoginButton = () => {
  const navigate = useNavigate(); // React Router hook to navigate to the dashboard
  const [cookie, setCookie] = useCookies(["token"]);

  const handleGitHubLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const { displayName, email, photoURL, uid } = user;
      // console.log("GitHub User Info:", displayName, email, photoURL, uid);

      // Send user data to your backend API
      const response = await makeUnauthenticatedPOSTRequest(
        "/auth/socialLogin",
        {
          platform: "github",
          id: uid,
          email,
          name: displayName,
          profilePicture: photoURL,
        }
      );

      if (response && response.token) {
        const token = response.token;

        if (token) {
          const date = new Date();
          date.setDate(date.getDate() + 10);
          setCookie("token", token, { path: "/", expires: date });

          navigate("/dashboard");
        } else {
          console.error("No token found in the response.");
        }

        if (response.success) {
          // console.log("User saved successfully");
        } else {
          console.error("Error saving user:", response.error);
        }
      }
    } catch (error) {
      console.error("Error during GitHub sign in:", error);
    }
  };

  return (
    <div
      className="cursor-pointer hover:scale-110 transition-all duration-300"
      onClick={handleGitHubLogin}
    >
      <FaGithub size={30} className="text-black" />
    </div>
  );
};

export default GitHubLoginButton;
