import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const skillOptions = [
  "Web Design", "UI/UX", "Mockup", "Frontend", "Backend",
  "React", "Node.js", "Express", "MongoDB", "HTML",
  "CSS", "JavaScript", "TypeScript", "Tailwind CSS", "Bootstrap",
  "Figma", "Adobe XD", "Photoshop", "Next.js", "Redux",
  "REST API", "GraphQL", "MySQL", "Firebase", "Django",
  "Python", "Java", "C++", "SEO", "WordPress"
]
;

const CreateJob = () => {
    const {user} = useAuth();
    const navigate = useNavigate();
  const { id } = useParams();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [budgetType, setBudgetType] = useState('Hourly');

  const handleSkillClick = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else if (selectedSkills.length < 15) {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const onSubmit = async (data) => {
    const jobData = {
      title: data.title,
      discription: data.discription,
      budget: `${data.budgetFrom} - ${data.budgetTo} ${budgetType}`,
      skills: selectedSkills,
      timeline: data.timeline,
      clientId: id,
    };

    try {
      const res = await fetch(`http://localhost:3000/client/create/job/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(jobData),
      });

      if (res.ok) {
        alert("Job posted successfully!");
        navigate(`/clientprofile/${id}`);
      } else {
        alert("Failed to post job.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='p-6 max-w-3xl mx-auto'>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>

        <div>
          <label className='font-semibold'>Job title</label>
          <input
            type="text"
            placeholder="e.g., need Web developer for figma"
            {...register('title', { required: true })}
            className='w-full border p-2 rounded'
          />
          {errors.title && <p className="text-red-600">Job title is required</p>}
        </div>

        <div>
          <label className='font-semibold'>Describe about the project</label>
          <textarea
            rows="4"
            placeholder="Write here"
            {...register('discription', { required: true })}
            className='w-full border p-2 rounded resize-none'
          />
          {errors.discription && <p className="text-red-600">Description is required</p>}
        </div>

        <div>
          <label className='font-semibold'>Skills</label>
          <div className='flex flex-wrap gap-2 mt-2'>
            {skillOptions.map((skill, i) => (
              <span
                key={i}
                onClick={() => handleSkillClick(skill)}
                className={`cursor-pointer px-3 py-1 rounded-full text-sm border ${selectedSkills.includes(skill) ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
              >
                {skill} {selectedSkills.includes(skill) && 'X'}
              </span>
            ))}
          </div>
          <p className="text-gray-400 text-sm">Add max 15 skills</p>
        </div>

        <div>
          <label className='font-semibold'>Estimate your timeline here</label>
          <div className='flex gap-4 mt-2'>
            <label><input type="radio" value="Small" {...register('timeline')} /> Small</label>
            <label><input type="radio" value="Medium" {...register('timeline')} defaultChecked /> Medium</label>
            <label><input type="radio" value="Large" {...register('timeline')} /> Large</label>
          </div>
        </div>

        <div>
          <label className='font-semibold'>How long your work take?</label>
          <select {...register('duration')} className='w-full border p-2 rounded'>
            <option value="1-6 months">1-6 months</option>
            <option value="6-12 months">6-12 months</option>
            
          </select>
        </div>

        <div>
          <label className='font-semibold'>Expertise level you want</label>
          <div className='flex gap-4 mt-2'>
            <label><input type="radio" value="Fresher" {...register('experience')} /> Fresher</label>
            <label><input type="radio" value="Medium" {...register('experience')} defaultChecked /> Medium</label>
            <label><input type="radio" value="Experienced" {...register('experience')} /> Experienced</label>
          </div>
        </div>

        <div>
          <label className='font-semibold'>Tell us about your budget?</label>
          <div className='flex gap-4 mt-2'>
            <label className='border px-4 py-2 rounded'>
              <input type="radio" value="Fixed" checked={budgetType === "Fixed"} onChange={() => setBudgetType("Fixed")} /> Fixed price
            </label>
            <label className='border px-4 py-2 rounded'>
              <input type="radio" value="Hourly" checked={budgetType === "Hourly"} onChange={() => setBudgetType("Hourly")} /> Hourly
            </label>
          </div>

          <div className='flex gap-4 mt-4'>
            <input
              type="number"
              placeholder="From"
              step="0.01"
              {...register('budgetFrom', { required: true })}
              className='border p-2 rounded w-1/2'
            />
            <input
              type="number"
              placeholder="To"
              step="0.01"
              {...register('budgetTo', { required: true })}
              className='border p-2 rounded w-1/2'
            />
          </div>
        </div>

        <div>
          <label className='font-semibold'>Attachments</label>
          <div className='border border-dashed p-4 text-center rounded text-red-400'>
            Drag or <span className='underline cursor-pointer'>upload project</span> files
          </div>
        </div>

        <div className='flex gap-4'>
          <button type="submit" className='bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600'>
            Post job now
          </button>
          <button type="button" className='border px-6 py-2 rounded hover:bg-gray-100'>
            Save as draft
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateJob;
