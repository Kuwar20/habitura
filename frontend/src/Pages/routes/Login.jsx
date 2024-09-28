import React, { useState } from "react";
import Input from "../../Components/formInputs/Input";
import { FaUnlock } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { makeUnauthenticatedPOSTRequest } from "../../utils/serverHelpers";
import bgImg from "../../assets/HabituraCropLogo.png";
import SecBtn from "../../Components/buttons/SecBtn";
import GoogleLoginButton from "../../Components/socialMediaLogins/GoogleLoginButton";
import GitHubLoginButton from "../../Components/socialMediaLogins/GitHubLoginButton";
import { useCookies } from "react-cookie";

const Login = () => {
  // cookie
  const [cookie, setCookie] = useCookies(["token"]);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  // submit form
  const submit = async () => {
    try {
      const response = await makeUnauthenticatedPOSTRequest(
        "/auth/login",
        user
      );
      console.log("form data submitted", response);

      if (response && response.token) {
        const token = response.token;

        if (token) {
          const date = new Date();
          date.setDate(date.getDate() + 10);
          setCookie("token", token, { path: "/", expires: date });

          navigate("/dashboard");

          setUser({
            email: "",
            password: "",
          });
        } else {
          console.error("No token found in the response.");
        }
      } else {
        console.error("The Form not submitted successfully");
      }
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  };

  return (
    <div className="bg-gray-100 h-screen flex flex-col justify-center items-center">
      {/* logo */}
      <a a href="/">
        <div
          className="font-logo text-darkgreen font-semibold text-5xl z-10 mb-4"
          title="Go To HomePage"
        >
          Habitura
        </div>
      </a>

      <div className="w-[80%] flex justify-center items-center rounded-md bg-gray-100 drop-shadow-2xl">
        <div className="grid grid-cols-2 h-full w-full">
          {/* left */}
          <div className="bg-yellow-100 bg-opacity-30 rounded-md">
            <img
              src={bgImg}
              alt="logo"
              className="h-full w-full rounded-full"
            />
          </div>

          {/* right */}
          <div className="p-10 space-y-5">
            {/* Sign up link */}
            <div className="flex justify-center items-end flex-col">
              <span className="text-coolsecondary text-sm font-medium">
                <i>Don't have an account</i>
              </span>
              <Link to="/signup">
                <div className="flex space-x-2 justify-center items-center text-coolsecondary hover:text-darkgreen">
                  <FaUnlock />
                  <span className=" font-semibold ">Sign Up</span>
                </div>
              </Link>
            </div>

            {/* login heading */}
            <div className="text-darkgreen font-primary font-semibold text-lg flex flex-col mb-10">
              Login Now
            </div>

            {/* login form */}
            <div className="mt-5">
              <form className="space-y-8">
                <Input
                  placeholder={"Enter Email Address"}
                  type={"email"}
                  name={"email"}
                  value={user.email}
                  handleChange={handleChange}
                  required={true}
                />
                <Input
                  placeholder={"Enter Password"}
                  type={"password"}
                  name={"password"}
                  value={user.password}
                  handleChange={handleChange}
                  required={true}
                />
              </form>
            </div>

            {/* login button */}
            <div
              onClick={(e) => {
                e.preventDefault();
                submit();
              }}
              className="flex justify-center items-center"
            >
              <SecBtn buttonLabel={"Log In"} linkTo={"/login"} />
            </div>

            {/* Third party login text */}
            <div className="flex justify-center items-center w-full ">
              <span className="h-0.5 w-1/4 mx-5 rounded-md bg-gray-400"></span>
              <span className="text-xs text-gray-500 flex">Or Login with</span>
              <span className="h-0.5 w-1/4 mx-5 rounded-md bg-gray-400"></span>
            </div>

            {/* Third party login buttons */}
            <div className="flex justify-center items-center space-x-5 ">
              <GoogleLoginButton />
              <GitHubLoginButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
