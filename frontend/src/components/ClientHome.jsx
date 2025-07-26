import React, { useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
const ClientHome = () => {
    const { user } = useAuth();
    const[freelancers, setFreelancers] = useState([])
    useEffect(() => {
        fetch(`http://localhost:3000/freelancer/freelancers/details`)
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data.freelancers)) {
                    setFreelancers(data.freelancers);
                } else {
                    setFreelancers([]);
                }
            })
            .catch(err => {
                console.error(err);
                setFreelancers([]);
            });
    }, []);
    console.log(freelancers)
    return (
        <div className="bg-gray-100 min-h-screen px-6 py-8">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">
                    Welcome back, <span className="text-blue-600">{user?.name || 'Client'}</span>
                </h1>

            </div>

            {/* No Job Post Card */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8 flex justify-between items-center flex-col sm:flex-row">
                <div>
                    <h2 className="text-lg font-semibold">No job post</h2>
                    <p className="text-sm text-gray-600 mt-1">
                        You have not posted any job, post your job and find world's best talent here.
                    </p>
                    <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                        Post now
                    </button>
                </div>
                <img
                    src="https://img.freepik.com/free-vector/flat-employment-agency-search-new-employees-hire_88138-802.jpg?semt=ais_hybrid&w=740"
                    alt="No job"
                    className="w-36 h-36 object-contain mt-6 sm:mt-0"
                />
            </div>

            {/* Search Bar */}
            <div className="flex items-center gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Search talent here"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                    Search
                </button>
            </div>

            {/* Best Matches */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Best matches for you (200)</h2>
                <button className="text-blue-600 hover:underline text-sm">Filter here</button>
            </div>

            {/* Talent Cards */}
            <div className="space-y-4">
                {freelancers?.map((freelancer, i) => (
                    <div
                        key={i}
                        className="bg-white p-4 rounded-lg shadow flex flex-col sm:flex-row justify-between items-start sm:items-center"
                    >
                        <div>
                            <p className="font-semibold text-lg">{freelancer.profession || "Freelancer"}</p>
                            <p className="text-sm text-gray-500">
                                {freelancer.experience ? `${freelancer.experience} experience` : "Experience not provided"}
                            </p>
                            <p className="mt-1 text-gray-800 font-medium">
                                {freelancer.phoneNumber ? `Contact: ${freelancer.phoneNumber}` : "Contact not available"}
                            </p>
                            <p className="text-xs text-gray-600">
                                {freelancer.education ? `Education: ${freelancer.education}` : "No education info"}
                            </p>

                            <div className="flex flex-wrap gap-2 mt-2">
                                {(freelancer.skills || []).slice(0, 3).map((skill, index) => (
                                    <span key={index} className="bg-gray-200 px-2 py-1 text-xs rounded">
                                        {skill}
                                    </span>
                                ))}
                                {freelancer.skills && freelancer.skills.length > 3 && (
                                    <span className="text-blue-600 text-sm cursor-pointer">more</span>
                                )}
                            </div>

                            <div className="mt-2 text-sm text-gray-500">
                                📍 {freelancer.city || "City"}, {freelancer.country || "Country"}
                            </div>
                        </div>

                        <button className="mt-4 sm:mt-0 bg-transparent border border-red-500 text-red-500 px-4 py-1 rounded hover:bg-red-50 transition">
                            Invite
                        </button>
                    </div>
                ))}

            </div>

            {/* Load More */}
            <div className="text-center mt-6">
                <button className="px-4 py-2 border border-gray-400 rounded hover:bg-gray-100 transition">
                    Load more
                </button>
            </div>
        </div>
    );
};

export default ClientHome;
