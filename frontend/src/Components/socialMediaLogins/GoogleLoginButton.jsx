import React, { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import { makeUnauthenticatedPOSTRequest } from "../../utils/serverHelpers";

const GoogleLoginButton = () => {
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse);
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
      console.log(userData);
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
