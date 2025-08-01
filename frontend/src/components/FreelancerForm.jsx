import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from './AuthContext';

const FreelancerForm = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset
  } = useForm({
    mode: 'onTouched',
    defaultValues: {
      profession: '',
      experience: '',
      education: '',
      language: '',
      skills: '',
      description: '',
      address: '',
      city: ''
    }
  });

  const nextStep = () => {
    const values = getValues();
    if (step === 1 && (!values.profession || !values.experience)) return alert('Fill all Step 1 fields');
    if (step === 2 && (!values.education || !values.language || !values.skills)) return alert('Fill all Step 2 fields');
    setStep(prev => prev + 1);
  };

  const prevStep = () => setStep(prev => prev - 1);

  const onSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        skills: data.skills.split(',').map(s => s.trim()),
        userid: `${user._id}`
      };
      const response = await fetch(`http://localhost:3000/users/freelancer/create/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const result = await response.json();
        alert("Profile created successfully!");
        reset();
        navigate(`/freelancerprofile/${result.freelancer._id}`);
      }
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  const stepTitles = [
    "Add your title & experience",
    "Education, skills & language",
    "Profile description & address"
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-xl shadow-lg p-10 w-full max-w-3xl border border-gray-200"
      >
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800">Create Profile</h1>
          <p className="text-base text-gray-500 mt-1">{stepTitles[step - 1]}</p>
          <div className="w-full bg-gray-200 rounded-full h-1.5 mt-6">
            <div
              className="bg-[#2e3a59] h-1.5 rounded-full"
              style={{ width: `${(step / 3) * 100}%` }}
            ></div>
          </div>
          <p className="mt-3 text-xs text-gray-400">Step {step} of 3</p>
        </div>

        {step === 1 && (
          <>
            <label className="block mb-5">
              <input
                {...register('profession', { required: true })}
                className="w-full p-3 border rounded-md focus:outline-[#2e3a59]"
                placeholder="e.g., Web Developer"
              />
              {errors.profession && <span className="text-red-500 text-sm">Profession is required</span>}
            </label>

            <label className="block mb-5">
              <input
                {...register('experience', { required: true })}
                className="w-full p-3 border rounded-md focus:outline-[#2e3a59]"
                placeholder="e.g., 2 years"
              />
              {errors.experience && <span className="text-red-500 text-sm">Experience is required</span>}
            </label>
          </>
        )}

        {step === 2 && (
          <>
            <label className="block mb-5">
              <input
                {...register('education', { required: true })}
                className="w-full p-3 border rounded-md focus:outline-[#2e3a59]"
                placeholder="e.g., Bachelors in CS"
              />
              {errors.education && <span className="text-red-500 text-sm">Education is required</span>}
            </label>

            <label className="block mb-5">
              <input
                {...register('language', { required: true })}
                className="w-full p-3 border rounded-md focus:outline-[#2e3a59]"
                placeholder="e.g., English, Hindi"
              />
              {errors.language && <span className="text-red-500 text-sm">Language is required</span>}
            </label>

            <label className="block mb-5">
              <input
                {...register('skills', { required: true })}
                className="w-full p-3 border rounded-md focus:outline-[#2e3a59]"
                placeholder="e.g., React, Tailwind, Node"
              />
              {errors.skills && <span className="text-red-500 text-sm">Skills are required</span>}
            </label>
          </>
        )}

        {step === 3 && (
          <>
            <label className="block mb-5">
              <textarea
                {...register('description', { required: true })}
                className="w-full p-3 border rounded-md focus:outline-[#2e3a59]"
                placeholder="Tell us about yourself..."
              />
              {errors.description && <span className="text-red-500 text-sm">Description is required</span>}
            </label>

            <label className="block mb-5">
              <input
                {...register('address', { required: true })}
                className="w-full p-3 border rounded-md focus:outline-[#2e3a59]"
                placeholder="Address"
              />
              {errors.address && <span className="text-red-500 text-sm">Address is required</span>}
            </label>

            <label className="block mb-5">
              <input
                {...register('city', { required: true })}
                className="w-full p-3 border rounded-md focus:outline-[#2e3a59]"
                placeholder="City"
              />
              {errors.city && <span className="text-red-500 text-sm">City is required</span>}
            </label>
          </>
        )}

        <div className="flex justify-between mt-8">
          {step > 1 && (
            <button type="button" onClick={prevStep} className="px-6 py-2 bg-gray-200 rounded-md">
              Back
            </button>
          )}
          {step < 3 ? (
            <button type="button" onClick={nextStep} className="px-6 py-2 bg-[#2e3a59] text-white rounded-md">
              Next
            </button>
          ) : (
            <button type="submit" className="px-6 py-2 bg-green-600 text-white rounded-md">
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default FreelancerForm;
