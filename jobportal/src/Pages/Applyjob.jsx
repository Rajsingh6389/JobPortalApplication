import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { filterByJobId, saveApplication } from "../api/JobApi";
import Loader from "../Findjobs/Loader";

function Applyjob() {
  const { id } = useParams();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    resumeLink: "",
  });

  const [errors, setErrors] = useState({});

  /* =======================
     FETCH JOB BY ID
  ======================== */
  useEffect(() => {
    const fetchJob = async () => {
      setLoading(true);
      try {
        const response = await filterByJobId(id);
        setJob(response.data);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };

    fetchJob();
  }, [id]);

  /* =======================
     INPUT HANDLER
  ======================== */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* =======================
     FORM VALIDATION
  ======================== */
  const validateForm = () => {
    let newErrors = {};

    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    if (!form.resumeLink.trim())
      newErrors.resumeLink = "Resume/Portfolio link is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* =======================
     SUBMIT + SAVE IN DB + TOAST
  ======================== */
  const handleApply = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const payload = {
      jobId: job.id,
      jobTitle: job.jobTitle,
      company: job.company,
      jobType: job.jobType,
      location: job.location,
      packageAmount: job.packageAmount,
      experience: job.experience,

      name: form.name,
      email: form.email,
      phone: form.phone,
      resumeLink: form.resumeLink,
    };

    try {
      const response = await saveApplication(payload);

      // Show toast popup
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);

      // Reset form
      setForm({
        name: "",
        email: "",
        phone: "",
        resumeLink: "",
      });

    } catch (err) {
      alert("Failed to submit application");
      console.error(err);
    }
  };

  /* =======================
     LOADER
  ======================== */
  if (loading || !job) {
    return (
      <div className="min-h-[100vh] flex justify-center items-center bg-mine-shaft-950">
        <Loader />
      </div>
    );
  }

  /* =======================
     MAIN UI
  ======================== */
  return (
    <div className="min-h-screen bg-mine-shaft-950 text-white py-12 font-['Poppins']">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10 px-6">
        
        {/* ========================
            LEFT: JOB DETAILS
        ========================= */}
        <div className="lg:col-span-2 bg-mine-shaft-900 rounded-2xl p-10 shadow-xl border border-mine-shaft-800">
          <h1 className="text-4xl font-bold text-mine-shaft-200">{job.jobTitle}</h1>
          <p className="text-mine-shaft-400 text-lg mt-2">{job.company}</p>

          <div className="flex flex-wrap gap-3 mt-5">
            <span className="px-4 py-1 bg-mine-shaft-800 rounded-full text-sm">
              {job.jobType}
            </span>
            <span className="px-4 py-1 bg-mine-shaft-800 rounded-full text-sm">
              📍 {job.location}
            </span>
            <span className="px-4 py-1 bg-mine-shaft-800 rounded-full text-sm">
              ⏱ {job.postedDaysAgo} days ago
            </span>
          </div>

          {/* Salary / Experience / Applicants */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-5 bg-mine-shaft-850 rounded-xl border border-mine-shaft-700">
              <p className="text-sm text-mine-shaft-300">Salary</p>
              <p className="text-2xl font-semibold text-mine-shaft-200">
                {job.packageAmount}
              </p>
            </div>

            <div className="p-5 bg-mine-shaft-850 rounded-xl border border-mine-shaft-700">
              <p className="text-sm text-mine-shaft-300">Experience</p>
              <p className="text-2xl font-semibold text-mine-shaft-200">
                {job.experience}
              </p>
            </div>

            <div className="p-5 bg-mine-shaft-850 rounded-xl border border-mine-shaft-700">
              <p className="text-sm text-mine-shaft-300">Applicants</p>
              <p className="text-2xl font-semibold text-mine-shaft-200">
                {job.applicants}
              </p>
            </div>
          </div>

          <div className="mt-10">
            <h2 className="text-2xl font-semibold mb-4">Job Description</h2>
            <p className="leading-relaxed text-mine-shaft-300">
              {job.description}
            </p>
          </div>
        </div>

        {/* ========================
            RIGHT: APPLY FORM
        ========================= */}
        <div className="bg-mine-shaft-900 rounded-2xl p-8 shadow-xl border border-mine-shaft-800 h-fit sticky top-10">
          <h2 className="text-2xl font-semibold mb-6 text-bright-sun-300">
            Apply For This Job
          </h2>

          <form onSubmit={handleApply} className="space-y-5">
            
            {/* NAME */}
            <div>
              <label className="block text-sm text-mine-shaft-300 mb-1">Full Name *</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className={`w-full p-3 rounded-lg bg-mine-shaft-800 border ${
                  errors.name ? "border-red-500" : "border-mine-shaft-700"
                }`}
                placeholder="Enter your name"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            {/* EMAIL */}
            <div>
              <label className="block text-sm text-mine-shaft-300 mb-1">Email *</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className={`w-full p-3 rounded-lg bg-mine-shaft-800 border ${
                  errors.email ? "border-red-500" : "border-mine-shaft-700"
                }`}
                placeholder="Enter your email"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* PHONE */}
            <div>
              <label className="block text-sm text-mine-shaft-300 mb-1">Phone *</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className={`w-full p-3 rounded-lg bg-mine-shaft-800 border ${
                  errors.phone ? "border-red-500" : "border-mine-shaft-700"
                }`}
                placeholder="Enter your phone"
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>

            {/* RESUME LINK */}
            <div>
              <label className="block text-sm text-mine-shaft-300 mb-1">
                Resume / Portfolio Link *
              </label>
              <input
                name="resumeLink"
                value={form.resumeLink}
                onChange={handleChange}
                className={`w-full p-3 rounded-lg bg-mine-shaft-800 border ${
                  errors.resumeLink ? "border-red-500" : "border-mine-shaft-700"
                }`}
                placeholder="Drive / GitHub / Portfolio URL"
              />
              {errors.resumeLink && (
                <p className="text-red-500 text-sm mt-1">{errors.resumeLink}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-bright-sun-300 text-black font-semibold py-3 rounded-xl mt-4 shadow-md hover:bg-bright-sun-200 transition-all"
            >
              Submit Application
            </button>
          </form>
        </div>
      </div>

      {/* ========================
          RIGHT SIDE TOAST POPUP
      ========================= */}
      {showToast && (
        <div className="fixed top-10 right-10 bg-bright-sun-300 text-black px-6 py-3 rounded-xl shadow-xl animate-slide-left font-semibold z-50">
          Application Submitted ✔
        </div>
      )}
    </div>
  );
}

export default Applyjob;
