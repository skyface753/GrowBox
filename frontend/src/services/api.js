import axios from "axios";
const baseURL = "http://localhost:5000/api/v1";

async function fetch(path) {
  try {
    var response = await axios.post(baseURL + path);
    if (response.status === 200) {
      return response.data;
    } else {
      return false;
    }
  } catch (e) {
    console.log(e);
    return false;
  }
}

const api = {
  getDashboardData: async () => {
    return await fetch("/moisture/get/dashboard");
  },
};

export default api;
