import axios from 'axios' ;
const base_url = "http://localhost:5050/api";
export const registration = async (formData) => {
  try {
 const result =   await axios.post(`${base_url}/register`, formData, {
    headers: {
        'Content-Type': 'multipart/form-data'
    },
      withCredentials: true,
    });
   result.data.success
     ? alert(result.data.message)
     : alert(result.data.message);
  } catch (error) {

    alert(error.response.data.message)
  }
};
export const login = async (reqbody) => {
  try {
 const result = await axios.post(`${base_url}/login`, reqbody, {
   withCredentials: true,
 });
   result.data.success
     ? alert(result.data.message)
     : alert(result.data.message);
  } catch (error) {

    alert(error.response.data.message)
  }
};
export const logout = async () => {
  try {
 const result = await axios.get(`${base_url}/logout`, {
   withCredentials: true,
 });
   result.data.success
     ? alert(result.data.message)
     : alert(result.data.message);
  } catch (error) {

    alert(error.response.data.message)
  }
};
