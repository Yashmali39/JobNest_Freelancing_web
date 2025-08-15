import { div } from 'framer-motion/client';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import ProposalForm from './ProposalForm';
import { useAuth } from './AuthContext';
const JobCard = () => {
    const {user} = useAuth();
    const { id } = useParams();

    const [job, setJob] = useState();
    const [client, setClient] = useState();
    const [isCreating, setIsCreating] = useState(false);
    const handleClick = () => {
        setIsCreating(!isCreating)
    }
    useEffect(() => {
        fetch(`http://localhost:3000/client/job/${id}`)
            .then(res => res.json())
            .then(data => {
                setJob(data.job);
                setClient(data.client);
            })
            .catch(err => {
                alert.error(err);
                setJob([]);
            });
    }, [id])
    if (!job && !client) return <><div>loading...</div></>
    return (
        <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md">
            {/* Back Button */}
            <button
                className="text-blue-600 mb-4 hover:underline"
                onClick={() => window.history.back()}
            >
                ← Back
            </button>

            {/* Title and Price */}
            <div className="flex justify-between items-start">
                <h1 className="text-xl font-bold">
                    {job.title}
                </h1>
                <span className="text-lg font-semibold">${job.budget}</span>
            </div>

            {/* Post Date */}
            <p className="text-gray-500 text-sm mb-4">
                Posted {new Date(job.postDate).toLocaleString()}
            </p>

            {/* Description */}
            <p className="mb-4">{job.discription}</p>

            {/* Skills */}
            <div className="mb-6">
                <h2 className="font-semibold mb-2">Skills and Expertise</h2>
                <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill, idx) => (
                        <span
                            key={idx}
                            className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm"
                        >
                            {skill}
                        </span>
                    ))}
                </div>
            </div>

            {/* Client Info */}
            <div className="border-t pt-4">
                <h2 className="font-semibold mb-2">About the client</h2>
                <p><strong>Name:</strong> {client.name}</p>
                <p><strong>Email:</strong> {client.email}</p>
                <p><strong>Jobs posted:</strong> {client.jobPosted}</p>
            </div>

            {/* Buttons. onClick={()=>{handleClick()} */}
            <div className="flex gap-4 mt-6">
                {!isCreating && <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600" onClick={() => { handleClick() }}>
                    Create a proposal
                </button>}
                {isCreating && <ProposalForm jobId = {id} freelancerId = {user.freelancerId}/>}
            </div>
        </div>
    )
}

export default JobCard