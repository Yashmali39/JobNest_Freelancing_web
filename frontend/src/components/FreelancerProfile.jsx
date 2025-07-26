import { div } from 'framer-motion/client';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const FreelancerProfile = () => {
    const Navigate = useNavigate();
    const { id } = useParams();
    const [freelancer, setFreelancer] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3000/freelancer/${id}`)
            .then(res => res.json())
            .then(data => {
                setFreelancer(data.freelancer);
                setUser(data.user);
            })
            .catch(err => console.error(err));
    }, [id]);

    if (!freelancer || !user) {
        return <div>loading...</div>
    }

    return (
        <div className="p-10 bg-gray-100 min-h-screen">
            {/* PROFILE HEADER */}



            {/* MAIN CONTENT */}
            <div className="grid grid-cols-3 gap-5 mt-5">
                {/* LEFT COLUMN */}
                <div className="col-span-2 flex flex-col gap-5">
                    <div className="flex gap-5 bg-white p-6 rounded-lg shadow-md">
                        <img
                            src={user.profileImage || 'https://via.placeholder.com/100'}
                            alt="Profile"
                            className="w-24 h-24 rounded-full object-cover"
                        />
                        <div className="flex-1">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h1 className="text-xl font-bold">{user.firstName} {user.lastName}</h1>
                                    <div className="flex gap-5 mt-4 text-sm text-gray-500">
                                        <span>⭐️⭐️⭐️⭐️⭐️</span>
                                        <span>📍 loacation</span>
                                        <span>💲 rate</span>
                                        <span>✔️ 10 projects</span>
                                    </div>
                                    <p className="text-sm text-gray-500 mt-2">{freelancer.description}</p>
                                </div>
                                <button className="border border-blue-600 text-blue-600 px-3 py-1 rounded-full text-sm">Edit Profile</button>
                            </div>

                        </div>
                    </div>

                    {/* PORTFOLIO */}
                    <div className="bg-white p-5 rounded-lg shadow-md">
                        <div className="flex justify-between mb-3">
                            <h2 className="font-semibold">My Portfolio</h2>
                            <button className="text-sm text-blue-600 border border-blue-600 px-2 py-1 rounded-full">Edit Portfolio</button>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                            freelancer portfolio
                        </div>
                    </div>

                    {/* REVIEWS */}
                    <div className="bg-white p-5 rounded-lg shadow-md">
                        <h2 className="font-semibold mb-3">Reviews</h2>
                        reviews
                    </div>

                    {/* WORK EXPERIENCE */}
                    <div className="bg-white p-5 rounded-lg shadow-md">
                        <div className="flex justify-between mb-3">
                            <h2 className="font-semibold">Work Experience</h2>
                            <button className="text-sm text-blue-600 border border-blue-600 px-2 py-1 rounded-full">Edit Experience</button>
                        </div>
                        {freelancer.experience}
                    </div>

                    {/* EDUCATION */}
                    <div className="bg-white p-5 rounded-lg shadow-md">
                        <div className="flex justify-between mb-3">
                            <h2 className="font-semibold">My Education</h2>
                            <button className="text-sm text-blue-600 border border-blue-600 px-2 py-1 rounded-full">Edit Education</button>
                        </div>
                        {freelancer.education}
                    </div>
                </div>

                {/* RIGHT COLUMN */}
                <div className="flex flex-col gap-5">
                    {/* VERIFICATION */}
                    <div className="bg-white p-5 rounded-lg shadow-md ">
                        <h2 className="font-semibold mb-3">Verification</h2>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li className="flex justify-between">Identity Verified <span className="text-blue-600">Verify</span></li>
                            <li className="flex justify-between">Payment Verified <span className="text-blue-600">Verify</span></li>
                            <li className="flex justify-between">Phone Verified <span className="text-blue-600">Verify</span></li>
                            <li className="flex justify-between">Email Verified <span className="text-blue-600">Verify</span></li>
                            <li className="flex justify-between">Facebook Verified <span className="text-blue-600">Verify</span></li>
                        </ul>
                    </div>

                    {/* TOP SKILLS */}
                    <div className="bg-white p-5 rounded-lg shadow-md">
                        <div className="flex justify-between mb-3">
                            <h2 className="font-semibold">Top Skills</h2>
                            <button className="text-sm text-blue-600 border border-blue-600 px-2 py-1 rounded-full">Edit Skills</button>
                        </div>
                        <ul className="space-y-2 text-sm text-gray-700">
                            {freelancer.skills?.map((skill, idx) => (
                                <li key={idx}>✔️ {skill}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FreelancerProfile;
