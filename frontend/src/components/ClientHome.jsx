import React, { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

const ClientHome = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [freelancers, setFreelancers] = useState([]);
    const [job, setJob] = useState();
    const [response, setResponse] = useState(false);

    useEffect(() => {

        fetch(`http://localhost:3000/freelancer/freelancers/details`)
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data.freelancers)) {
                    setFreelancers(data.freelancers);
                } else {
                    setFreelancers([]);
                }
            })
            .catch((err) => {
                console.error(err);
                setFreelancers([]);
            });
    }, []);


    useEffect(() => {
        fetch(`http://localhost:3000/client/current/job/${user.clientId}`)
            .then((res) => res.json())
            .then((data) => {
                setJob(data.job);
                setResponse(data.response);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    if (!freelancers && response) {
        return (
            <div className="flex justify-center items-center h-screen">
                Loading...
            </div>
        );
    }

    return (
        <div className="relative min-h-screen bg-gradient-to-b from-[#0f052c] via-[#1a0f45] to-[#2d1b69]">
            {/* Subtle starry texture overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center opacity-20"
                style={{
                    backgroundImage:
                        "url('https://www.transparenttextures.com/patterns/stardust.png')",
                }}
            ></div>

            {/* Abstract glowing blobs */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-10 w-40 h-40 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-60 h-60 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
            </div>

            {/* Page Content */}
            <div className="relative z-10 py-10 px-4 flex justify-center">
                <div className="w-full max-w-6xl">
                    {/* Header */}
                    <h1 className="text-3xl font-bold mb-6 text-center text-white">
                        Welcome back,{" "}
                        <span className="text-yellow-400">{user?.name || "Client"}</span>
                    </h1>

                    {/* No Job Post Card */}
                    {/* No Job / Current Job Card */}
                    <div className="mb-10">
                        {job ? (
                            // Job Card
                            <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col sm:flex-row items-center gap-6 hover:shadow-xl transition">
                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <h2 className="text-xl font-semibold text-gray-800 mb-2">{job.title}</h2>
                                        <p className="text-gray-700 mb-2">
                                            {job.discription.length > 50
                                                ? job.discription.substring(0, 50) + "..."
                                                : job.discription}
                                        </p>
                                        <p className="text-gray-700 mb-1">
                                            <strong>Budget:</strong> {job.budget}
                                        </p>
                                        <p className="text-gray-700 mb-1">
                                            <strong>Timeline:</strong> {job.timeline}
                                        </p>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {(job.skills || []).slice(0, 3).map((skill, idx) => (
                                                <span key={idx} className="bg-gray-200 px-2 py-1 text-xs rounded">
                                                    {skill}
                                                </span>
                                            ))}
                                            {job.skills && job.skills.length > 3 && (
                                                <span className="text-blue-600 text-xs cursor-pointer">
                                                    +{job.skills.length - 3} more
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => navigate(`/client/job/${job._id}`)}
                                        className="mt-4 w-max bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-5 py-2 rounded-full text-sm font-medium hover:from-indigo-500 hover:to-blue-500 transition"
                                    >
                                        View
                                    </button>
                                </div>
                                <img
                                    src="https://img.freepik.com/free-vector/flat-employment-agency-search-new-employees-hire_88138-802.jpg?semt=ais_hybrid&w=740"
                                    alt="Job"
                                    className="w-48 h-48 object-contain"
                                />
                            </div>
                        ) : (
                            // No Job Posted Card
                            <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col sm:flex-row items-center gap-6 hover:shadow-xl transition">
                                <div className="flex-1">
                                    <h2 className="text-lg font-semibold text-gray-800">No job posted yet</h2>
                                    <p className="text-gray-600 mt-2">
                                        Post your job and find the world's best talent here.
                                    </p>
                                    <button className="mt-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-5 py-2 rounded-full hover:from-indigo-500 hover:to-blue-500 transition">
                                        Post Job
                                    </button>
                                </div>
                                <img
                                    src="https://img.freepik.com/free-vector/flat-employment-agency-search-new-employees-hire_88138-802.jpg?semt=ais_hybrid&w=740"
                                    alt="No job"
                                    className="w-48 h-48 object-contain"
                                />
                            </div>
                        )}
                    </div>



                    {/* Search Bar */}
                    <div className="flex items-center gap-3 mb-8 justify-center">
                        <input
                            type="text"
                            placeholder="Search talent here"
                            className="w-full sm:w-3/4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                        <button className="bg-yellow-400 text-white px-4 py-2 rounded hover:bg-yellow-500 transition">
                            Search
                        </button>
                    </div>

                    {/* Freelancers Grid */}
                    <h2 className="text-2xl font-semibold mb-6 text-center text-white">
                        Best Matches for You ({freelancers.length})
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {freelancers.map((freelancer, i) => (
                            <div
                                key={i}
                                className="bg-white p-5 rounded-lg shadow-md flex flex-col justify-between hover:shadow-xl transition"
                            >
                                <div>
                                    <div className="flex items-center gap-4 mb-3">
                                        <img
                                            src={
                                                freelancer.profilePic ||
                                                "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                                            }
                                            alt={freelancer.name || "Freelancer"}
                                            className="w-12 h-12 rounded-full"
                                        />
                                        <div>
                                            <h3 className="font-semibold">
                                                {freelancer.name || "Freelancer"}
                                            </h3>
                                            <p className="text-gray-500 text-sm">
                                                {freelancer.profession || "Profession not provided"}
                                            </p>
                                        </div>
                                    </div>

                                    <p className="text-gray-700 mb-1">
                                        <strong>Experience:</strong>{" "}
                                        {freelancer.experience
                                            ? `${freelancer.experience} years`
                                            : "Not provided"}
                                    </p>
                                    <p className="text-gray-700 mb-1">
                                        <strong>Education:</strong>{" "}
                                        {freelancer.education || "Not provided"}
                                    </p>
                                    <p className="text-gray-700 mb-2">
                                        <strong>Location:</strong> {freelancer.city || "City"},{" "}
                                        {freelancer.country || "Country"}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {(freelancer.skills || []).slice(0, 3).map((skill, idx) => (
                                            <span
                                                key={idx}
                                                className="bg-gray-200 px-2 py-1 text-xs rounded"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                        {freelancer.skills && freelancer.skills.length > 3 && (
                                            <span className="text-blue-600 text-xs cursor-pointer">
                                                +{freelancer.skills.length - 3} more
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <button
                                    onClick={() => navigate(`/freelancerprofile/${freelancer._id}`)}
                                    className="mt-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                                    View Profile
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Load More */}
                    <div className="text-center mt-8">
                        <button className="px-6 py-2 border border-gray-400 rounded hover:bg-gray-100 transition">
                            Load More
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClientHome;
