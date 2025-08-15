import React, { useEffect, useState } from 'react'
import { useAuth } from './AuthContext'
import { data, useNavigate } from 'react-router-dom'
import SavedJobs from './SavedJobs';
import { FaSave } from 'react-icons/fa';
import { div } from 'framer-motion/client';
const FreelancerHome = () => {
    const navigate = useNavigate();
    const { isLoggedIn, user } = useAuth();
    const [jobs, setJobs] = useState([]);
    const [bestMatched, setBestMatched] = useState(true);
    const [recent, setRecent] = useState(false);
    const [saved, setSaved] = useState(false);
    const [savedJobs, setSavedJobs] = useState();
    const [isSaved, setIsSaved] = useState();

    const handleBest = () => {
        setBestMatched(true);
        setRecent(false);
        setSaved(false);
    }

    const handleRecent = () => {
        setBestMatched(false);
        setRecent(true);
        setSaved(false);
    }

    const handleSaved = () => {
        setBestMatched(false);
        setRecent(false);
        setSaved(true);
    }

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
                if(data.isSaved){
                    alert(`Job Saved Successfully ${data.savedjobs}`)
                }else{
                    alert(`Job Unsaved Successfully ${data.savedjobs}`)
                }
                setSavedJobs(data.savedjobs);
                setJobs(prevJobs =>
                    prevJobs.map(job =>
                        job._id === id ? { ...job, isSaved: data.isSaved } : job
                    )
                );
            } else {
                setError(data.error || "Something went wrong");
            }
        } catch (err) {
            setError("Error in saving job");
        }
    }



    useEffect(() => {
        fetch(`http://localhost:3000/freelancer/client/jobs/${user.freelancerId}`)
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data.jobs)) {
                    setJobs(data.jobs);
                    setSavedJobs(data.savedJobs);
                } else {
                    setJobs([]);
                }
            })
            .catch(err => {
                console.error(err);
                setJobs([]);
            });
    }, []);

    console.log(savedJobs)
    return (
        <div className="min-h-screen bg-gray-100 p-6">

            <div className="flex flex-col md:flex-row mt-6 gap-6">
                {/* Left Section: Jobs */}
                <div className="flex-1">
                    <div className="bg-white p-6 rounded-lg shadow flex justify-between items-center">
                        <div>
                            <p className="text-gray-600">Friday, January 21st</p>
                            <h2 className="text-xl font-semibold">Welcome back</h2>
                            <h1 className="text-2xl font-bold text-red-500">
                                {user?.firstName} {user?.lastName}
                            </h1>
                        </div>
                        <div>
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                                alt="Welcome"
                                className="w-24 h-24"
                            />
                        </div>
                    </div>
                    <div className="mt-6">
                        <input
                            type="text"
                            placeholder="Search Jobs"
                            className="w-full p-4 rounded-lg border border-gray-300"
                        />
                    </div>
                    <h3 className="text-lg font-semibold m-4">Jobs you might like</h3>
                    <div className="flex mb-4">
                        <button className={`${bestMatched ? "border-b-2 border-red-500 px-4 py-2 font-semibold" : "px-4 py-2 text-gray-500"}`} onClick={() => { handleBest() }}>
                            Best match
                        </button>
                        <button className={`${recent ? "border-b-2 border-red-500 px-4 py-2 font-semibold" : "px-4 py-2 text-gray-500"}`} onClick={() => { handleRecent() }}>
                            Recent
                        </button>
                        <button className={`${saved ? "border-b-2 border-red-500 px-4 py-2 font-semibold" : "px-4 py-2 text-gray-500"}`} onClick={() => { handleSaved() }}>
                            Saved
                        </button>
                    </div>

                    {/* Example Job Card */}
                    {bestMatched && jobs.map((job, index) => (
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
                            <div className="flex gap-2 items-center mt-3 text-sm text-gray-500">
                                <span className="text-red-500 mr-2">★ 4/5 (12 Reviews)</span>
                                <button className=" px-4 p-1 border border-red-500 text-red-500 rounded" onClick={() => { handleClick(job._id) }}>View</button>
                                <button className={`${(job.isSaved) ? 'px-4 p-1 border border-red-500 text-red-500 rounded' : 'border rounded'}`} onClick={() => { handleSave(job._id) }} ><FaSave /></button>
                            </div>
                        </div>
                    ))}

                    {saved && <SavedJobs savedJobs={savedJobs} />}


                    {/* Add more job cards here... */}
                </div>

                {/* Right Section */}
                <div className="w-full md:w-1/3 flex flex-col gap-6">
                    {/* Profile Card */}
                    <div className="bg-white p-6 rounded-lg shadow flex flex-col items-center">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                            alt="User"
                            className="w-16 h-16 rounded-full mb-4"
                        />
                        <h4 className="font-semibold">{user?.first_name} {user?.last_name}</h4>
                        <p className="text-gray-500 mb-2">User Experience Designer</p>
                        <div className="w-full">
                            <p className="text-sm mb-1">Set up your account</p>
                            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '82%' }}></div>
                            </div>
                            <button className="text-sm border border-red-500 text-red-500 px-4 py-2 rounded">
                                Complete your profile
                            </button>
                        </div>
                    </div>



                    {/* Contracts */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h4 className="font-semibold mb-4">My contracts</h4>
                        <p>Active projects: <strong>02</strong></p>
                        <p>Completed projects: <strong>07</strong></p>
                        <p>Cancelled projects: <strong>01</strong></p>
                        <button className="mt-4 px-4 py-2 border border-gray-300 rounded">View all</button>
                    </div>

                    {/* Bids */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h4 className="font-semibold mb-4">Your Bids</h4>
                        <p>16 bids left out of 6</p>
                        <button className="mt-4 px-4 py-2 border border-red-500 text-red-500 rounded">Get more Bids</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FreelancerHome
