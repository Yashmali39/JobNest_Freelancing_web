import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useAuth } from './AuthContext';


const FreelancerForm = () => {
  const {user} = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const { register, handleSubmit, watch, formState: { errors }, getValues } = useForm({
    mode: 'onTouched',
    defaultValues: {
      // resume: '',
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
    // Example: Only go to next if current step fields are valid
    if (step === 1) {
      const { profession, experience } = getValues();
      if (!profession || !experience) {
        alert('Please fill all Step 1 fields');
        return;
      }
    }
    if (step === 2) {
      const { education, language, skills } = getValues();
      if (!education || !language || !skills) {
        alert('Please fill all Step 2 fields');
        return;
      }
    }
    setStep(prev => prev + 1);
  };

  const prevStep = () => setStep(prev => prev - 1);

  const onSubmit = async (data) => {
    console.log('Final freelancer data:', data);
    console.log(id);
    // Example: Convert skills from CSV string to array
    try {
      const payload = {
        ...data,
        skills: data.skills.split(',').map(s => s.trim()),
        userid: `${user._id}`
      };
      const response = await fetch(`http://localhost:3000/users/freelancer/create/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // Important for cookies!
        body: JSON.stringify(payload)
      })

      if (response.ok) {
        const result = await response.json();
        console.log("Profile created:", result);
        alert("Profile created successfully!");
        navigate(`/freelancerprofile/${result.freelancer._id}`);
        reset(); // clear form
        if (result.user.role === "freelancer") {
          navigate(`/freelancerform/${result.user._id}`);
        } else {
          console.log("client")
        }
      }

    } catch (error) {

    }

  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 border p-4 w-[400px] shadow-md rounded-md">

        <h2 className="text-xl font-bold mb-2">Step {step} of 3</h2>

        {step === 1 && (
          <>

            <div>
              <input {...register('profession', { required: true })} placeholder="Profession" />
              {errors.profession && <p className="text-red-500">Profession is required</p>}
            </div>

            <div>
              <input {...register('experience', { required: true })} placeholder="Experience" />
              {errors.experience && <p className="text-red-500">Experience is required</p>}
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div>
              <input {...register('education', { required: true })} placeholder="Education" />
              {errors.education && <p className="text-red-500">Education is required</p>}
            </div>

            <div>
              <input {...register('language', { required: true })} placeholder="Language" />
              {errors.language && <p className="text-red-500">Language is required</p>}
            </div>

            <div>
              <input {...register('skills', { required: true })} placeholder="Skills (comma separated)" />
              {errors.skills && <p className="text-red-500">Skills are required</p>}
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <div>
              <input {...register('description', { required: true })} placeholder="Description" />
              {errors.description && <p className="text-red-500">Description is required</p>}
            </div>

            <div>
              <input {...register('address', { required: true })} placeholder="Address" />
              {errors.address && <p className="text-red-500">Address is required</p>}
            </div>

            <div>
              <input {...register('city', { required: true })} placeholder="City" />
              {errors.city && <p className="text-red-500">City is required</p>}
            </div>
          </>
        )}

        <div className="flex gap-2 mt-4">
          {step > 1 && (
            <button type="button" onClick={prevStep} className="bg-gray-400 px-4 py-2 rounded">Back</button>
          )}
          {step < 3 && (
            <button type="button" onClick={nextStep} className="bg-blue-500 text-white px-4 py-2 rounded">Next</button>
          )}
          {step === 3 && (
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Submit</button>
          )}
        </div>

      </form>
    </div>
  );
};

export default FreelancerForm;
