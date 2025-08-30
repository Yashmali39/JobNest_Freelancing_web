import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from './AuthContext';

const ClientProfile = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/client/jobs/${id}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data.jobs)) {
          setJobs(data.jobs);
        } else {
          setJobs([]);
        }
      })
      .catch(err => {
        console.error(err);
        setJobs([]);
      });
  }, [id]);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#0f052c] via-[#1a0f45] to-[#2d1b69] py-10 px-4">
      
      {/* Subtle starry texture overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage: "url('https://www.google.com/url?sa=i&url=https%3A%2F%2Fdigitalstrategyone.com%2Findependent-freelancer-without-using-freelancing-platforms%2F&psig=AOvVaw21n8pBbmGhwqSXx66O2lqe&ust=1756667099290000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCNjG5Ieds48DFQAAAAAdAAAAABAE')",
        }}
      ></div>

      {/* Abstract glowing blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-40 h-40 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-60 h-60 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      </div>

      {/* Page Content */}
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-3 gap-5">
        {/* LEFT COLUMN */}
        <div className="col-span-2 flex flex-col gap-5">
          {/* Welcome Card */}
          <div className="bg-white/90 p-6 rounded-lg shadow-lg flex justify-between items-center backdrop-blur-sm">
            <div>
              <p className="text-gray-400">Friday, January 21st</p>
              <h2 className="text-xl font-semibold text-gray-800">Welcome back</h2>
              <h1 className="text-2xl font-bold text-yellow-400">
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
          <div className="bg-white/90 p-6 rounded-lg shadow-md backdrop-blur-sm">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold text-gray-800">Jobs created by you</h2>
              <button
                onClick={() => navigate(`/createjob/${user.clientId}`)}
                className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded-full text-sm hover:from-indigo-500 hover:to-blue-500 transition"
              >
                Create new job
              </button>
            </div>

            {Array.isArray(jobs) && jobs.length === 0 ? (
              <p className="text-sm text-gray-400">No jobs created yet</p>
            ) : (
              <ul className="text-sm text-gray-700">
                {jobs?.map((job, index) => (
                  <div
                    key={index}
                    className="border border-gray-300 rounded-lg p-4 mb-4 bg-white/80 shadow-sm backdrop-blur-sm"
                  >
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{job.title}</h3>
                    <p className="text-gray-700 mb-1">
                      <strong>Description:</strong>{" "}
                      {job.discription?.split(" ").length > 10
                        ? job.discription.split(" ").slice(0, 10).join(" ") + "..."
                        : job.discription}
                    </p>
                    <p className="text-gray-700 mb-1"><strong>Budget:</strong> {job.budget}</p>
                    <p className="text-gray-700 mb-1"><strong>Timeline:</strong> {job.timeline}</p>
                    <p className="text-gray-700 mb-1">
                      <strong>Skills:</strong> {Array.isArray(job.skills) ? job.skills.join(', ') : 'N/A'}
                    </p>
                    <p className="text-gray-700 mb-3">
                      <strong>Proposals:</strong> {Array.isArray(job.proposals) ? job.proposals.length : 0}
                    </p>

                    <button
                      onClick={() => navigate(`/client/job/${job._id}`)}
                      className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded-full text-sm hover:from-indigo-500 hover:to-blue-500 transition"
                    >
                      View
                    </button>
                  </div>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="flex flex-col gap-5">
          {/* Profile Card */}
          <div className="bg-white/90 p-6 rounded-lg shadow-md text-center flex flex-col items-center gap-3 backdrop-blur-sm">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="Welcome"
              className="w-24 h-24"
            />
            <h3 className="text-lg font-semibold text-gray-800">{user?.firstName} {user?.lastName}</h3>

            <div className="mt-4 w-full">
              <div className="w-full h-2 bg-gray-200 rounded-full mb-2">
                <div
                  className="h-full bg-yellow-400 rounded-full"
                  style={{ width: '82%' }}
                ></div>
              </div>
              <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-sm py-2 rounded-full hover:from-indigo-500 hover:to-blue-500 transition">
                Complete your profile
              </button>
              <p className="text-xs text-gray-400 mt-2">
                100% completion of your profile will help you get more reach.
              </p>
            </div>
          </div>

          {/* Verification Section */}
          <div className="bg-white/90 p-6 rounded-lg shadow-md backdrop-blur-sm">
            <h4 className="font-semibold mb-3 text-gray-800">Verification</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex justify-between">Identity Verified <span className="text-blue-500">Verify</span></li>
              <li className="flex justify-between">Phone Verified <span className="text-blue-500">Verify</span></li>
              <li className="flex justify-between">Email Verified <span className="text-blue-500">Verify</span></li>
            </ul>
          </div>

          {/* Membership */}
          <div className="bg-gradient-to-r from-pink-400 to-purple-500 text-white p-6 rounded-lg shadow-md text-center">
            <p className="text-sm">Get <strong>membership</strong> for getting more bid in a month</p>
          </div>

          {/* Job Summary */}
          <div className="bg-white/90 p-6 rounded-lg shadow-md backdrop-blur-sm">
            <h4 className="font-semibold mb-3 text-gray-800">All Job</h4>
            <ul className="text-sm space-y-2 text-gray-700">
              <li>✅ Active projects: 2</li>
              <li>📁 Completed projects: 7</li>
              <li>❌ Cancelled projects: 7</li>
            </ul>
            <button className="mt-4 w-full border border-gray-400 text-sm py-2 rounded-full hover:bg-gray-100 transition">
              View all
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientProfile;
