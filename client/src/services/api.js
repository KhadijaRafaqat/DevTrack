const API_URL = 'http://localhost:5000/api';

// Helper to get Auth Headers with JWT Token
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  };
};

// Auth API Calls
export const registerUser = async (userData) => {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  return await res.json();
};

export const loginUser = async (userData) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  return await res.json();
};

// Routine CRUD API Calls
export const fetchUserRoutine = async () => {
  const res = await fetch(`${API_URL}/user/routine`, {
    headers: getAuthHeaders()
  });
  return await res.json();
};

export const addRoutineSlotAPI = async (slotData) => {
  const res = await fetch(`${API_URL}/user/routine`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(slotData)
  });
  return await res.json();
};

export const deleteRoutineSlotAPI = async (slotId) => {
  const res = await fetch(`${API_URL}/user/routine/${slotId}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
  return await res.json();
};

// Custom Goals API Calls
export const addCustomGoalAPI = async (goalData) => {
  const res = await fetch(`${API_URL}/user/goals`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(goalData)
  });
  return await res.json();
};

export const deleteCustomGoalAPI = async (goalId) => {
  const res = await fetch(`${API_URL}/user/goals/${goalId}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
  return await res.json();
};