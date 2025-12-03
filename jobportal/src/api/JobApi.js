import axios from "axios";

// ALWAYS include https:// for Railway backend
const BASE_URL = "https://jobportalapplication-production.up.railway.app";

// Full jobs API route
const API = `${BASE_URL}/jobportal/jobs`;

export const getAllJobs = async () =>
  axios.get(API).then((res) => res.data);

export const searchByTitle = async (title) =>
  axios.get(`${API}/title?q=${title}`).then((res) => res.data);

export const filterByCompany = async (company) =>
  axios.get(`${API}/company/${company}`).then((res) => res.data);

export const filterByExperience = async (exp) =>
  axios.get(`${API}/experience/${exp}`).then((res) => res.data);

export const filterByLocation = async (loc) =>
  axios.get(`${API}/location/${loc}`).then((res) => res.data);

export const filterByJobType = async (type) =>
  axios.get(`${API}/type/${type}`).then((res) => res.data);

export const filterByJobId = async (id) =>
  axios.get(`${API}/${id}`).then((res) => res.data);

export const saveApplication = (data) =>
  axios.post(`${API}/apply`, data).then((res) => res.data);
  