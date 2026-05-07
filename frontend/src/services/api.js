// import axios from "axios";

// const API = axios.create({
//   // ✅ Piche se '/api' hata diya, sirf port tak rakha hai
//   baseURL: "http://localhost:5000/admin", 
// });

// export default API;



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