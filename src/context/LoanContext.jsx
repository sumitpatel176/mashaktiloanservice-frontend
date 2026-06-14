import React, { createContext, useState } from 'react';
import axios from 'axios';

export const LoanContext = createContext();

export const LoanProvider = ({ children }) => {
    const [loans, setLoans] = useState([]);
    const [loading, setLoading] = useState(false);
    
    // 🔥 Industry Standard: Credentials ko browser storage me nahi, 
    // sirf React ki active runtime memory (State) me rakhenge.
    const [authCredentials, setAuthCredentials] = useState(null);

    // Secured Header Generator
    const getAuthHeaders = (creds = authCredentials) => {
        if (creds && creds.username && creds.password) {
            // Standard HTTP Basic Authentication Encode Matrix
            const token = btoa(`${creds.username}:${creds.password}`);
            return { 'Authorization': `Basic ${token}` };
        }
        return {};
    };

    // 📋 1. FETCH ALL LEADS FROM DATABASE
    const fetchLoans = async (activeCreds = null) => {
        setLoading(true);
        const currentHeaders = getAuthHeaders(activeCreds || authCredentials);
        
        try {
            const response = await axios.get('https://mashaktiloanservice-backend.onrender.com/api/admin/loans/all', {
                headers: currentHeaders
            });
            setLoans(response.data);
            return true;
        } catch (error) {
            console.error("Error fetching data from database:", error);
            return false;
        } finally {
            setLoading(false);
        }
    };

    // 🔄 2. UPDATE LOAN STATUS (ACCEPT / DECLINE)
    const changeLoanStatus = async (id, newStatus) => {
        try {
            await axios.put(`https://mashaktiloanservice-backend.onrender.com/api/admin/loans/update-status/${id}?status=${newStatus}`, 
                null, 
                { headers: getAuthHeaders() }
            );
            
            setLoans(prevLoans => 
                prevLoans.map(loan => 
                    loan.id === id ? { ...loan, applicationStatus: newStatus } : loan
                )
            );
            console.log(`✅ Status successfully updated on DB to ${newStatus} for ID: ${id}`);
        } catch (error) {
            console.error("Failed to update status on server:", error);
            throw error;
        }
    };

    // 🚪 3. SECURE LOGOUT FRAMEWORK
    const logoutAdmin = () => {
        setAuthCredentials(null); 
        setLoans([]); 
    };

    // 🗑️ 4. DELETE APPLICATION FROM DATABASE
    const deleteLoanApplication = async (id) => {
        try {
            await axios.delete(`https://mashaktiloanservice-backend.onrender.com/api/admin/loans/delete/${id}`, {
                headers: getAuthHeaders()
            });
            setLoans(prevLoans => prevLoans.filter(loan => loan.id !== id));
        } catch (error) {
            console.error("Failed to delete record from architecture:", error);
            throw error;
        }
    };

    // 🔥 5. NEW: CUSTOMER LOAN APPLICATION SUBMISSION
    // Yeh function aapke public customer form ke liye hai (Isme basic auth nahi chahiye)
    const handleLoanSubmit = async (formData, onSuccess) => {
    try {
        // 🔥 Aapka Spring Boot ka exact public endpoint hit ho rha h
        const response = await axios.post('https://mashaktiloanservice-backend.onrender.com/api/public/loans/submit', formData);
        
        if (response.status === 200 || response.status === 201) {
            // 👍 Koi alert nahi! Seedha component ko bolo ki kaam ho gaya h
            if (onSuccess) onSuccess(true);
            
            // Background me data refresh (agar admin dashboard side me khula h toh)
            if (authCredentials) {
                fetchLoans();
            }
        }
    } catch (error) {
        console.error("Form submission failed at database layer:", error);
        
        // ❌ Koi alert nahi! Component ko 'false' bhejenge taaki wo error wala handling kar sake
        if (onSuccess) onSuccess(false);
    }
};

    return (
        <LoanContext.Provider value={{ 
            loans, 
            loading, 
            fetchLoans, 
            changeLoanStatus,
            deleteLoanApplication, 
            handleLoanSubmit, // 👈 Yeh missing tha, ab export ho gaya!
            setAuthCredentials, 
            logoutAdmin,
            isLoggedIn: !!authCredentials 
        }}>
            {children}
        </LoanContext.Provider>
    );
};