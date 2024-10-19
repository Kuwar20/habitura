import { backendUrl } from "./config";

// UNAUTHENTICATED POST REQUEST
export const makeUnauthenticatedPOSTRequest = async (route, body) => {
  const url = backendUrl + route;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const formattedResponse = await response.json();
    return formattedResponse;
  } catch (error) {
    console.error("Error submitting the form:", error);
    throw error;
  }
};

// AUTHENTICATED POST REQUEST
export const makeAuthenticatedPOSTRequest = async (route, body) => {
  const token = getToken();
  const url = backendUrl + route;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const formattedResponse = await response.json();
    return formattedResponse;
  } catch (error) {
    console.error("Error submitting the form:", error);
    throw error;
  }
};

// AUTHENTICATED GET REQUEST
export const makeAuthenticatedGETRequest = async (route) => {
  const token = getToken();
  const url = backendUrl + route;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const formattedResponse = await response.json();
    return formattedResponse;
  } catch (error) {
    console.error("Error submitting the form:", error);
    throw error;
  }
};

// AUTHENTICATED DELETE REQUEST
export const makeAuthenticatedDELETERequest = async (route) => {
  const token = getToken();
  const url = backendUrl + route;
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const formattedResponse = await response.json();
    return formattedResponse;
  } catch (error) {
    console.error("Error submitting the form:", error);
    throw error;
  }
};

// AUTHENTICATED PUT REQUEST
export const makeAuthenticatedPUTRequest = async (route, body) => {
  const token = getToken();
  const url = backendUrl + route;
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const formattedResponse = await response.json();
    return formattedResponse;
  } catch (error) {
    console.error("Error submitting the form:", error);
    throw error;
  }
};

// AUTHENTICATED PATCH REQUEST
export const makeAuthenticatedPATCHRequest = async (route, body) => {
  const token = getToken();
  const url = backendUrl + route;

  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const formattedResponse = await response.json();
    return formattedResponse;
  } catch (error) {
    console.error("Error submitting the form:", error);
    throw error;
  }
};

// AUTHENTICATED POST FILE REQUEST
export const makeAuthenticatedPOSTFileRequest = async (route, formData) => {
  const token = getToken();
  const url = backendUrl + route;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const formattedResponse = await response.json();
    return formattedResponse;
  } catch (error) {
    console.error("Error submitting the form:", error);
    throw error;
  }
};

// get token
export const getToken = () => {
  const tokenName = "token";
  // Retrieves all cookies from the document.cookie string and splits them into an array of individual cookie strings.
  const cookies = document.cookie.split("; ");
  const tokenCookie = cookies.find((cookie) =>
    cookie.startsWith(tokenName + "=")
  );
  if (tokenCookie) {
    // console.log(tokenCookie )
    return tokenCookie.split("=")[1];
  }
  return null;
};
