import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from './AuthContext'
import { div } from 'framer-motion/client';


const ClientProfile = () => {
    const { id } = useParams()
    const { isLoggedIn, user } = useAuth();
    const navigate = useNavigate();
    const [jobs, setJobs] = useState();
    useEffect(() => {
        fetch(`http://localhost:3000/client/jobs/${id}`)
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data.jobs)) {
                    setJobs(data.jobs);
                } else {
                    setJobs([]); // fallback if jobs is undefined
                }
            })
            .catch(err => {
                console.error(err);
                setJobs([]); // optional: fallback on error
            });
    }, [id]);
    console.log(jobs)
    return (
        <div className="p-10 bg-gray-100 min-h-screen">
            <div className="grid grid-cols-3 gap-5">
                {/* LEFT COLUMN */}
                <div className="col-span-2 flex flex-col gap-5">
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
                    {/* Jobs Created Section */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <div className="flex justify-between items-center mb-3">
                            <h2 className="text-lg font-semibold">Jobs created by you</h2>
                            <button
                                onClick={() => navigate(`/createjob/${user.clientId}`)}
                                className="bg-red-500 text-white px-4 py-2 rounded-full text-sm"
                            >
                                Create new job
                            </button>
                        </div>
                        {Array.isArray(jobs) && jobs.length === 0 ? (
                            <p className="text-sm text-gray-500">No jobs created yet</p>
                        ) : (
                            <ul className="text-sm list-disc list-inside text-gray-600">
                                {jobs?.map((job, index) => (
                                    <div key={index} className="border border-gray-300 rounded-lg p-4 mb-4 bg-white shadow-sm">
                                        <h3 className="text-lg font-semibold text-gray-800 mb-2">{job.title}</h3>
                                        <p className="text-gray-600 mb-1"><strong>Description:</strong> {job.discription}</p>
                                        <p className="text-gray-600 mb-1"><strong>Budget:</strong> {job.budget}</p>
                                        <p className="text-gray-600 mb-1"><strong>Timeline:</strong> {job.timeline}</p>
                                        <p className="text-gray-600 mb-1"><strong>Skills:</strong> {Array.isArray(job.skills) ? job.skills.join(', ') : 'N/A'}</p>
                                    </div>
                                ))}

                            </ul>
                        )}

                    </div>
                </div>

                {/* RIGHT COLUMN */}
                <div className="flex flex-col gap-5">
                    {/* Profile Card */}
                    <div className="bg-white p-6 rounded-lg shadow-md text-center flex flex-col items-center gap-3">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                            alt="Welcome"
                            className="w-24 h-24"
                        />
                        <h3 className="text-lg font-semibold">{user?.firstName} {user?.lastName}</h3>

                        <div className="mt-4">
                            <div className="w-full h-2 bg-gray-200 rounded-full mb-2">
                                <div
                                    className="h-full bg-blue-600 rounded-full"
                                    style={{ width: '82%' }}
                                ></div>
                            </div>
                            <button className="w-full bg-blue-600 text-white text-sm py-2 rounded-full">
                                Complete your profile
                            </button>
                            <p className="text-xs text-gray-400 mt-2">
                                100% completion of your profile will help you get more reach.
                            </p>
                        </div>
                    </div>

                    {/* Verification Section */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h4 className="font-semibold mb-3">Verification</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li className="flex justify-between">Identity Verified <span className="text-blue-600">Verify</span></li>
                            <li className="flex justify-between">Phone Verified <span className="text-blue-600">Verify</span></li>
                            <li className="flex justify-between">Email Verified <span className="text-blue-600">Verify</span></li>
                        </ul>
                    </div>

                    {/* Membership */}
                    <div className="bg-gradient-to-r from-pink-400 to-purple-500 text-white p-6 rounded-lg shadow-md text-center">
                        <p className="text-sm">Get <strong>membership</strong> for getting more bid in a month</p>
                    </div>

                    {/* Job Summary */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h4 className="font-semibold mb-3">All Job</h4>
                        <ul className="text-sm space-y-2">
                            <li>✅ Active projects: 2</li>
                            <li>📁 Completed projects: 7</li>
                            <li>❌ Cancelled projects: 7</li>
                        </ul>
                        <button className="mt-4 w-full border border-gray-400 text-sm py-2 rounded-full">
                            View all
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClientProfile;
