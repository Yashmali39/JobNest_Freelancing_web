import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ClientJobCard = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [job, setJob] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3000/client/job/${id}`)
            .then(res => res.json())
            .then(data => setJob(data.job))
            .catch(err => {
                console.error(err);
                setJob(null);
            });
    }, [id]);

    if (!job) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center py-10 px-4">
            <div className="w-full max-w-5xl">
                {/* Job Details */}
                <div className="bg-white p-6 rounded-lg shadow-lg mb-10">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl font-bold">{job.title}</h1>
                        <span className={`px-3 py-1 text-sm rounded-full ${job.isSaved ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                            {job.isSaved ? 'Saved' : 'Not Saved'}
                        </span>
                    </div>

                    <p className="text-gray-700 mb-2"><strong>Description:</strong> {job.discription}</p>
                    <p className="text-gray-700 mb-2"><strong>Budget:</strong> {job.budget}</p>
                    <p className="text-gray-700 mb-2"><strong>Timeline:</strong> {job.timeline}</p>
                    <p className="text-gray-700 mb-2"><strong>Skills Required:</strong> {job.skills.join(', ')}</p>
                    <p className="text-gray-700"><strong>Posted on:</strong> {new Date(job.postDate).toLocaleDateString()}</p>
                </div>

                {/* Proposals Section */}
                <div>
                    <h2 className="text-xl font-semibold mb-6 text-center">Proposals ({job.proposals.length})</h2>
                    {job.proposals.length === 0 ? (
                        <p className="text-center text-gray-500">No proposals yet.</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {job.proposals.map((proposal) => (
                                <div key={proposal._id} className="bg-white p-5 rounded-lg shadow-md flex flex-col justify-between">
                                    <div>
                                        <p className="text-gray-700 mb-1"><strong>Bid:</strong> ${proposal.bidAmount}</p>
                                        <p className="text-gray-700 mb-2"><strong>Message:</strong> {proposal.message.length > 15 ? proposal.message.slice(0, 50) + '...' : proposal.message}</p>
                                        <p className="text-gray-700 mb-3"><strong>Status:</strong> {proposal.status}</p>
                                    </div>
                                    <button
                                        onClick={() => navigate(`/freelancerprofile/${proposal.freelancerId}`)}
                                        className="mt-auto bg-blue-600 text-white px-4 py-2 rounded-md text-sm w-full hover:bg-blue-700 transition"
                                    >
                                        View Profile
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ClientJobCard;
