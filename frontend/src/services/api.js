



import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// 🛡️ Har API request se pehle yeh code automatically chalega
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  
  if (token) {
    // Backend ko 'Bearer <token>' format mein Authorization header chahiye hota hai
    req.headers.Authorization = `Bearer ${token}`;
  }
  
  return req;
}, (error) => {
  return Promise.reject(error);
});

export default API;

// import axios from 'axios';

// const API = axios.create({
//   baseURL: 'http://localhost:5000/api', // Aapka backend URL
// });

// // Har request ke sath LocalStorage se token nikal kar bhejega
// API.interceptors.request.use((req) => {
//   if (localStorage.getItem('adminToken')) { // Jo naam aapne token ka rakha hai
//     req.headers.Authorization = `Bearer ${localStorage.getItem('adminToken')}`;
//   }
//   return req;
// });

// export default API;