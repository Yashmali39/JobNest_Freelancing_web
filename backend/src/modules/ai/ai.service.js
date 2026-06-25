import genAI from "../../config/gemini.js";

import Freelancer from "../freelancers/freelancer.model.js";
import Job from "../jobs/job.model.js";

import ApiError from "../../utils/ApiError.js";

const model =
    genAI.getGenerativeModel({
        model:
            "gemini-2.5-flash",
    });

const generateJobDescription =
    async ({
        jobTitle,
        skills,
        experience,
    }) => {


        const prompt = `
Generate a professional job description.

Job Title: ${jobTitle}

Required Skills:
${skills.join(", ")}

Experience:
${experience}

Rules:
1. Return only the job description.
2. Do NOT include company name placeholders.
3. Do NOT include email placeholders.
4. Do NOT include "How to Apply" section.
5. Return clean markdown.
`;

        const result =
            await model.generateContent(
                prompt
            );

        return result.response.text();
    };


const calculateJobMatch = async (
    userId,
    jobId
) => {
    const freelancer =
        await Freelancer.findOne({
            userId,
        });

    if (!freelancer) {
        throw new ApiError(
            404,
            "Freelancer profile not found"
        );
    }

    if (
        !freelancer.resumeText
    ) {
        throw new ApiError(
            400,
            "Resume not uploaded"
        );
    }

    const job =
        await Job.findById(jobId);

    if (!job) {
        throw new ApiError(
            404,
            "Job not found"
        );
    }

    const prompt = `
Compare the following resume and job description.

Resume:
${freelancer.resumeText}

Job Description:
${job.description}

Compare skills and technologies only.

Ignore dates.
Ignore years of experience.
Ignore education.
Ignore project timelines.

Focus only on:

- matched technical skills
- missing technical skills
- technology alignment

IMPORTANT:
Return ONLY valid JSON.
Do not wrap response inside markdown.
Do not use \`\`\`json.
Do not write explanations.

Response format:

{
  "matchScore": number,
  "matchedSkills": [],
  "missingSkills": [],
  "recommendation": ""
}
`;

    const result =
        await model.generateContent(
            prompt
        );

    let text =
        result.response.text();

    text = text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

    try {
        return JSON.parse(text);
    } catch (error) {
        return {
            rawResponse: text,
        };
    }
};


const generateProposal = async (
  userId,
  jobId,
  additionalNote = ""
) => {
  const freelancer =
    await Freelancer.findOne({
      userId,
    });

  if (!freelancer) {
    throw new ApiError(
      404,
      "Freelancer profile not found"
    );
  }

  const job =
    await Job.findById(jobId);

  if (!job) {
    throw new ApiError(
      404,
      "Job not found"
    );
  }

  const prompt = `
Generate a professional freelancing proposal.

Job Title:
${job.title}

Job Description:
${job.description}

Freelancer Profile:
${freelancer.resumeText}

Freelancer Skills:
${freelancer.skills?.join(", ")}

Additional Note:
${additionalNote}

Requirements:

1. Professional tone
2. 150-250 words
3. Highlight relevant skills
4. Explain understanding of project
5. End with a call to action
6. Return only the proposal text
`;

  const result =
    await model.generateContent(
      prompt
    );

  return {
    proposal:
      result.response.text(),
  };
};


export {
    generateJobDescription,
    calculateJobMatch,
    generateProposal,
};