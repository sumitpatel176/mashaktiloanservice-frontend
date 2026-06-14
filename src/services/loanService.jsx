import axios from 'axios';

// 💡 Dono alag-alag kaam ke liye base URLs set kiye hain
const PUBLIC_API_URL = "https://mashaktiloanservice-backend.onrender.com/api/public/loans";
const ADMIN_API_URL = "https://mashaktiloanservice-backend.onrender.com/api/admin/loans";

// 1. Customer ke liye - Naya Loan apply karne ke liye (Bina Login Ke)
export const applyForLoan = async (loanData) => {
    try {
        const response = await axios.post(`${PUBLIC_API_URL}/submit`, loanData);
        return response.data;
    } catch (error) {
        console.error("Error applying for loan:", error);
        throw error;
    }
};

// 2. Admin ke liye - Saare loans ki list nikalne ke liye (Dashboard)
export const getAllLoans = async () => {
    try {
        const response = await axios.get(`${ADMIN_API_URL}/all`);
        return response.data;
    } catch (error) {
        console.error("Error fetching all loans:", error);
        throw error;
    }
};

// 3. Admin ke liye - Status update karne ke liye (Approve / Reject)
export const updateLoanStatus = async (id, status) => {
    try {
        const response = await axios.put(`${ADMIN_API_URL}/${id}/status?status=${status}`);
        return response.data;
    } catch (error) {
        console.error("Error updating loan status:", error);
        throw error;
    }
};