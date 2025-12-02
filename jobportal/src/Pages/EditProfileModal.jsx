import React, { useState } from "react";
import { updateProfileApi } from "../api/profileApi";

// Dropdown options
const roleOptions = [
    "Designer", "Developer", "Product Manager", "Marketing Specialist",
    "Data Analyst", "Sales Executive", "Content Writer", "Customer Support",
];

const locationOptions = [
    "Delhi", "New York", "San Francisco", "London",
    "Berlin", "Tokyo", "Sydney", "Toronto",
];

const skillsOptions = [
    "HTML", "CSS", "JavaScript", "React", "Angular",
    "Node.js", "Python", "Java", "Ruby", "PHP", "SQL",
    "MongoDB", "PostgreSQL", "Git", "API Development",
    "Testing", "Agile", "DevOps", "AWS", "Azure", "Google Cloud",
];

function EditProfileModal({ close, user, refresh }) {
    const [form, setForm] = useState({
        name: user.name,
        about: user.about || "",
        role: user.role || "",
        location: user.location || "",
        expectedSalary: user.expectedSalary || "",
        skills: user.skills || "",
    });

    // Convert skills string → array
    const selectedSkills = form.skills ? form.skills.split(",") : [];

    const toggleSkill = (skill) => {
        let updated;
        if (selectedSkills.includes(skill)) {
            updated = selectedSkills.filter((s) => s !== skill);
        } else {
            updated = [...selectedSkills, skill];
        }
        setForm({ ...form, skills: updated.join(",") });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateProfileApi(form);
        refresh();
        close();
    };

    return (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center p-2 z-50">
            <div className="
  bg-mine-shaft-900 border border-mine-shaft-700 
  p-6 rounded-xl w-[380px] sm:w-[420px] 
  shadow-2xl animate-[fadeIn_0.25s_ease-out]

  max-h-[90vh] overflow-y-auto
">


                {/* HEADER */}
                <h2 className="text-2xl font-semibold text-bright-sun-300 mb-5 text-center tracking-wide">
                    Edit Profile
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* NAME */}
                    <div className="space-y-1">
                        <label className="text-sm text-bright-sun-200">Name</label>
                        <input
                            type="text"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="
              w-full p-2.5 rounded-lg text-white 
              bg-mine-shaft-850 border border-mine-shaft-700 
              focus:border-bright-sun-300 outline-none transition-all duration-200
            "
                        />
                    </div>

                    {/* ABOUT */}
                    <div className="space-y-1">
                        <label className="text-sm text-bright-sun-200">About</label>
                        <textarea
                            value={form.about}
                            onChange={(e) => setForm({ ...form, about: e.target.value })}
                            rows="3"
                            className="
              w-full p-2.5 rounded-lg text-white 
              bg-mine-shaft-850 border border-mine-shaft-700 
              focus:border-bright-sun-300 outline-none transition-all duration-200
            "
                        />
                    </div>

                    {/* ROLE */}
                    <div className="space-y-1">
                        <label className="text-sm text-bright-sun-200">Role</label>
                        <select
                            value={form.role}
                            onChange={(e) => setForm({ ...form, role: e.target.value })}
                            className="
              w-full p-2.5 rounded-lg text-white 
              bg-mine-shaft-850 border border-mine-shaft-700 
              focus:border-bright-sun-300 outline-none transition-all duration-200
            "
                        >
                            <option value="">Select Role</option>
                            {roleOptions.map((r, i) => (
                                <option key={i} value={r}>{r}</option>
                            ))}
                        </select>
                    </div>

                    {/* LOCATION */}
                    <div className="space-y-1">
                        <label className="text-sm text-bright-sun-200">Location</label>
                        <select
                            value={form.location}
                            onChange={(e) => setForm({ ...form, location: e.target.value })}
                            className="
              w-full p-2.5 rounded-lg text-white 
              bg-mine-shaft-850 border border-mine-shaft-700 
              focus:border-bright-sun-300 outline-none transition-all duration-200
            "
                        >
                            <option value="">Select Location</option>
                            {locationOptions.map((loc, i) => (
                                <option key={i} value={loc}>{loc}</option>
                            ))}
                        </select>
                    </div>

                    {/* SALARY */}
                    <div className="space-y-1">
                        <label className="text-sm text-bright-sun-200">Expected Salary</label>
                        <input
                            type="text"
                            value={form.expectedSalary}
                            onChange={(e) =>
                                setForm({ ...form, expectedSalary: e.target.value })
                            }
                            className="
              w-full p-2.5 rounded-lg text-white 
              bg-mine-shaft-850 border border-mine-shaft-700 
              focus:border-bright-sun-300 outline-none transition-all duration-200
            "
                            placeholder="e.g. ₹5–10 LPA"
                        />
                    </div>

                    {/* SKILLS */}
                    <div>
                        <label className="text-sm text-bright-sun-200">Skills</label>

                        <div className="flex flex-wrap gap-2 mt-2">
                            {skillsOptions.map((skill, index) => {
                                const active = selectedSkills.includes(skill);
                                return (
                                    <button
                                        type="button"
                                        key={index}
                                        onClick={() => toggleSkill(skill)}
                                        className={`
                    px-3 py-1 rounded-full text-xs transition-all border
                    ${active
                                                ? "bg-bright-sun-300 border-bright-sun-300 text-black font-semibold shadow-sm"
                                                : "bg-mine-shaft-800 border-mine-shaft-700 text-white hover:bg-mine-shaft-700"
                                            }
                  `}
                                    >
                                        {skill}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* BUTTONS */}
                    <div className="flex justify-between mt-6 gap-3">
                        <button
                            type="button"
                            onClick={close}
                            className="
              w-1/2 py-2.5 rounded-lg text-white 
              bg-mine-shaft-700 hover:bg-mine-shaft-600 
              transition-all
            "
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="
              w-1/2 py-2.5 rounded-lg 
              bg-bright-sun-300 text-black font-semibold
              hover:bg-bright-sun-200 transition-all
            "
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>

    );
}

export default EditProfileModal;
