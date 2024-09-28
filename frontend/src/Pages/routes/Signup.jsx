import React, { useState } from "react";
import Input from "../../Components/formInputs/Input";
import { FaUnlock } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import CheckboxInput from "../../Components/formInputs/CheckboxInput";
import { makeUnauthenticatedPOSTRequest } from "../../utils/serverHelpers";
import bgImg from "../../assets/HabituraCropLogo.png";
import SecBtn from "../../Components/buttons/SecBtn";
import GoogleLoginButton from "../../Components/socialMediaLogins/GoogleLoginButton";
import GitHubLoginButton from "../../Components/socialMediaLogins/GitHubLoginButton";
import { useCookies } from "react-cookie";

const Signup = () => {
  // cookie
  const [cookie, setCookie] = useCookies(["token"]);

  const [user, setUser] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
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
    if (user.password !== user.confirmPassword) {
      console.log("password don't match");
    }

    try {
      const response = await makeUnauthenticatedPOSTRequest(
        "/auth/signup",
        user
      );
      console.log("form data submitted", response);

      if (response && response.token) {
        const token = response.token;

        if (token) {
          // store token in a cookie
          const date = new Date();
          date.setDate(date.getDate() + 10);
          setCookie("token", token, { path: "/", expires: date });

          navigate("/login");
          
          // Clear the form data after successful submission
          setUser({
            fullname: "",
            email: "",
            password: "",
            confirmPassword: "",
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
      <a href="/">
        <div
          className="font-logo text-darkgreen font-semibold text-5xl z-10 mb-4"
          title="Go To HomePage"
        >
          Habitura 
        </div>
      </a>

      {/* signup page */}
      <div className="w-[80%] flex justify-center items-center rounded-md bg-gray-100 drop-shadow-2xl">
        <div className="grid grid-cols-2 h-full w-full">
          {/* left */}
          <div className="bg-yellow-100 bg-opacity-30 rounded-md">
            <img src={bgImg} alt="logo" className="h-full w-full rounded-full" />
          </div>

          {/* right */}
          <div className="px-10 py-5 space-y-4">
            {/* login instead */}
            <div className="flex justify-center items-end flex-col">
              <span className="text-coolsecondary text-sm font-medium">
                <i>Already have an account?</i>
              </span>
              <Link to="/login">
                <div className="flex space-x-2 justify-center items-center text-coolsecondary hover:text-darkgreen">
                  <FaUnlock />
                  <span className="font-semibold">Login</span>
                </div>
              </Link>
            </div>

            {/* sign up heading */}
            <div className="text-darkgreen font-primary font-semibold text-lg flex flex-col mb-10">
              Sign Up Now
            </div>

            {/* sign up form */}
            <div className="mt-5">
              <form className="space-y-8">
                <Input
                  placeholder={"Full Name"}
                  type={"text"}
                  name={"fullname"}
                  value={user.fullname}
                  handleChange={handleChange}
                  required={true}
                />
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
                <Input
                  placeholder={"Repeat Password"}
                  type={"password"}
                  name={"confirmPassword"}
                  value={user.confirmPassword}
                  handleChange={handleChange}
                  required={true}
                />
                {/* <CheckboxInput
                  type={"checkbox"}
                  labelname={"I agree to the terms & conditions"}
                  linkClassname={"text-blue-500 hover:text-blue-700"}
                  required={true}
                /> */}
              </form>
            </div>

            {/* signup button */}
            <div
              onClick={(e) => {
                e.preventDefault();
                submit();
              }}
              className="flex justify-center items-center"
            >
              <SecBtn buttonLabel={"Sign Up"} linkTo={"/signup"} />
            </div>

            {/* Third party login text */}
            <div className="flex justify-center items-center w-full">
              <span className="h-0.5 w-1/4 mx-5 rounded-md bg-gray-400"></span>
              <span className="text-xs text-gray-500 flex">Or Login with</span>
              <span className="h-0.5 w-1/4 mx-5 rounded-md bg-gray-400"></span>
            </div>

            {/* Third party login buttons */}
            <div className="flex justify-center items-center space-x-5">
              <GoogleLoginButton />
              <GitHubLoginButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
