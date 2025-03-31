import axios from "axios";
const server = "https://skytrail-assessment.vercel.app/api";

export const fetchCountries = async () => {
  try {
    const response = await axios.get("https://restcountries.com/v3.1/all");

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export const registerUser = async (formData) => {
  try {
    const response = await axios.post(`${server}/v1/user/register`, formData);
    // console.log(response);
    // console.log(response.data.success);

    return response.data;
  } catch (error) {
    alert(error?.response?.data?.message);
  }
};

export const loginUser = async (formData) => {
  try {
    const response = await axios.post(`${server}/v1/user/login`, formData);
    if (response.data.success) {
      console.log("Login successful:", response.data);

      // User info ko localStorage me save kar raha hu yahan okay skrytails's sir
      localStorage.setItem("user", JSON.stringify(response.data.data));
      localStorage.setItem("accessToken", response.data.accessToken);
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};
