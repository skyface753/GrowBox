import axios from "axios";

const host = "localhost";
const baseURL = "http://" + host + ":5000/api/v1";

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
  getMoistureDashboardData: async () => {
    return await fetch("/moisture/get/dashboard");
  },
  getAirDashboardData: async () => {
    return await fetch("/air/get/dashboard");
  },
};

export default api;
