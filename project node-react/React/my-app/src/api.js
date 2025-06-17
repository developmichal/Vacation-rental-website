import axios from "axios";

const baseUrl = `http://localhost:3001`;

// פונקציה לקבלת כותרת עם הטוקן
const getAuthHeaders = () => {
    const token = sessionStorage.getItem('token');
    if (token) {
        return {
            Authorization: `Bearer ${token}`,
        };
    }
    return {};
};
export const getCategory = () => {
    return axios.get(`${baseUrl}/category`);
};
export const getCity = () => {
    return axios.get(`${baseUrl}/city`);
};
export const getAllApartment = () => {
    return axios.get(`${baseUrl}/apartment`);
};
// שליחת בקשת POST לנתיב ההרשמה עם נתוני המשתמש
export const register = (user) => {
    return axios.post(`${baseUrl}/advertiser/register`, user);
};
export const login = (user) => {
    return axios.post(`${baseUrl}/advertiser/login`, user);  // עדכון הנתיב במקרה הצורך
};

export const getAllCityById = (id) => {
    return axios.get(`${baseUrl}/city/getApartmentByIdCity/${id}`);
};
export const getByNumBeds = (id) => {
    return axios.get(`${baseUrl}/apartment/getByNumBeds/${id}`);
};
export const getCategoryById = (id) => {
    return axios.get(`${baseUrl}/category/${id}`);
};

export const getApartmentByIdAdvertiser=(id)=>{
    return axios.get(`${baseUrl}/apartment/getApartmentsByAdvertiser/${id}`);
}
export const getApartment =async () => {
    try {
        const response = await axios.get(`${baseUrl}/apartment`);
        return response.data;  // מחזירים את הנתונים מתוך response.data
    } catch (error) {
        console.error("שגיאה בטעינת הדירות:", error);
        throw error;  // זרוק את השגיאה כדי לטפל בה בקומפוננטה
    }
}

export const getApartmentById = (_id) => {
    return axios.get(`${baseUrl}/apartment/getById/${_id}`);
};

export const getApartmentsByCategory =(id) =>{
    return axios.get(`${baseUrl}/apartment/getApartmentsByCategory/${id}`);
}

export const remove=(id)=>{
   return axios.delete(`${baseUrl}/apartment/remove/${id}`,{ headers: getAuthHeaders() })
}

export const update = (id, id1, data) => {
    return axios.patch(`${baseUrl}/apartment/update/${id}/${id1}`, data, {
        headers: getAuthHeaders(),
    });
};

 export const addApartment = (data, id) => {
    return axios.post(`${baseUrl}/apartment`, data, { headers: getAuthHeaders() });
};

export const getFilteredApartments = (params) => {
    console.log(params);
    return axios.post(`${baseUrl}/apartment/search`,params);
};
export const getCityById = (_id) => {
    return axios.get(`${baseUrl}/city/getById/${_id}`);
};
