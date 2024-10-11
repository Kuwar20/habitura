import React, { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import { makeUnauthenticatedPOSTRequest } from "../../utils/serverHelpers";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const GoogleLoginButton = () => {
  const navigate = useNavigate(); 
  const [cookie, setCookie] = useCookies(["token"]);

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      // console.log(tokenResponse);
      // Fetch user profile data
      const userInfoResponse = await fetch(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        }
      );
      const userData = await userInfoResponse.json();
      // console.log(userData);
      const { email, name, picture, sub } = userData;
      // console.log(email, name, picture, sub);

      // handle userData
      const response = await makeUnauthenticatedPOSTRequest(
        "/auth/socialLogin",
        {
          platform: "google",
          id: sub,
          email,
          name,
          profilePicture: picture,
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
    },
    onError: (errorResponse) => console.error(errorResponse),
  });

  return (
    <div
      className="cursor-pointer hover:scale-110 transition-all duration-300"
      onClick={googleLogin}
    >
      <FcGoogle size={30} />
    </div>
  );
};

export default GoogleLoginButton;
