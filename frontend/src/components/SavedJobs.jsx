import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaSave } from 'react-icons/fa';
import { useAuth } from './AuthContext';

const SavedJobs = ({ savedJobs: initialSavedJobs }) => {
    const {user} = useAuth();
    const [savedJobs, setSavedJobs] = useState(initialSavedJobs);

    const navigate = useNavigate();

    const handleClick = (id) => {
        navigate(`/job/${id}`)
    }

    const handleSave = async (id) => {
        try {
            const res = await fetch(`http://localhost:3000/freelancer/jobs/save/${id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    freelancerId: user.freelancerId
                }),
            });

            const data = await res.json();

            if (res.ok) {
                alert(`Job Unsaved Successfully ${data.savedjobs}`)
                setSavedJobs(data.savedjobs)
                
            } else {
                console.log(error);
            }
        } catch (err) {
            console.log("Erroe Occured");
        }
    }




    return (
        <div>
            {savedJobs.map((job, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow mb-4">
                    <h4 className="font-semibold text-lg">{job.title || "Untitled Job"}</h4>

                    <p className="text-sm text-gray-500">
                        Fixed-price · Intermediate · Est. Budget: ${job.budget || "N/A"} · Timeline: {job.timeline || "N/A"}
                    </p>

                    <p className="mt-2 text-gray-700">
                        {job.discription || "No job description provided."}
                    </p>

                    {/* Skills tags */}
                    <div className="flex flex-wrap gap-2 mt-2">
                        {(job.skills || []).slice(0, 3).map((skill, i) => (
                            <span key={i} className="bg-gray-200 text-xs px-2 py-1 rounded">
                                {skill}
                            </span>
                        ))}
                        {job.skills && job.skills.length > 3 && (
                            <span className="text-blue-600 text-sm cursor-pointer">more</span>
                        )}
                    </div>

                    {/* Optional metadata */}
                    <div className="flex gap-3 items-center mt-3 text-sm text-gray-500">
                        <span className="text-red-500 mr-2">★ 4/5 (12 Reviews)</span>
                        <button className=" px-4 p-1 border border-red-500 text-red-500 rounded" onClick={() => { handleClick(job._id) }}>View</button>
                        <button className={`${(job.isSaved) ? 'px-4 p-1 border border-red-500 text-red-500 rounded' : 'border rounded'}`} onClick={() => { handleSave(job._id) }} ><FaSave /></button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default SavedJobs