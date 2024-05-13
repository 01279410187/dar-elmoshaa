import { message } from "antd";
import axios from "axios";
import { API_ENDPOINT } from "../../../config";
const domain = API_ENDPOINT;
export async function getAllDepartments(filteredValues = { name: "" }) {
  try {
    const { name } = filteredValues;
    const res = await axios.get(`${domain}/api/v1/store/department/all`, {
      params: {
        name,
      },
    });
    return res.data;
  } catch (error) {
    message.error(error.response.data.error.message);

    console.log("Error fetching data:", error);
  }
}
