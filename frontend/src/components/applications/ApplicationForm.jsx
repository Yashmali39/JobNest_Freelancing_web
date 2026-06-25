import {
    useState,
} from "react";

import {
    applyToJob,
} from "../../api/application.api";

import {
    generateProposal,
} from "../../api/ai.api";

import toast from "react-hot-toast";

import Button from "../common/Button";

import TextArea from "../common/TextArea";

function ApplicationForm({
    jobId,
}) {
    const [
        coverLetter,
        setCoverLetter,
    ] = useState("");

    const [
        generatingProposal,
        setGeneratingProposal,
    ] = useState(false);

    const [
        additionalNote,
        setAdditionalNote,
    ] = useState("");

    const [loading,
        setLoading] =
        useState(false);

    const handleGenerateProposal =
        async () => {
            try {
                setGeneratingProposal(
                    true
                );

                const res =
                    await generateProposal(
                        jobId,
                        additionalNote
                    );

                setCoverLetter(
                    res.data.data
                        .proposal
                );
            } catch (error) {
                toast.error(
                    error.response?.data?.message ||
                    "Failed to generate proposal"
                );
            } finally {
                setGeneratingProposal(
                    false
                );
            }
        };

    const handleApply =
        async () => {
            try {
                setLoading(true);

                await applyToJob({
                    jobId,
                    coverLetter,
                });

                toast.success(
                    "Application Submitted Successfully"
                );

                setCoverLetter(
                    ""
                );
            } catch (error) {
                toast.error(
                    error.response?.data?.message ||
                    "Something went wrong"
                );
            } finally {
                setLoading(false);
            }
        };

    return (
        <div>

            {/* Header */}

            <div className="mb-6">

                <h2 className="text-2xl font-bold text-white">
                    Apply For Job
                </h2>

                <p className="text-gray-400 mt-1">
                    Generate an AI proposal or write your own cover letter.
                </p>

            </div>

            {/* AI Proposal Section */}

            <div
                className="
        border
        border-[#262626]
        rounded-xl
        p-5
        bg-[#0D0D0D]
        mb-6
      "
            >

                <h3 className="text-lg font-semibold text-white mb-3">
                    AI Proposal Generator
                </h3>

                <TextArea
                    rows={3}
                    value={additionalNote}
                    onChange={(e) =>
                        setAdditionalNote(
                            e.target.value
                        )
                    }
                    placeholder="Mention any special note for the client..."
                />

                <div className="mt-4">

                    <Button
                        type="button"
                        disabled={
                            generatingProposal
                        }
                        onClick={
                            handleGenerateProposal
                        }
                    >
                        {generatingProposal
                            ? "Generating..."
                            : "Generate AI Proposal"}
                    </Button>

                </div>

            </div>

            {/* Cover Letter */}

            <div
                className="
        border
        border-[#262626]
        rounded-xl
        p-5
        bg-[#0D0D0D]
      "
            >

                <h3 className="text-lg font-semibold text-white mb-3">
                    Cover Letter
                </h3>

                <TextArea
                    rows={10}
                    value={coverLetter}
                    onChange={(e) =>
                        setCoverLetter(
                            e.target.value
                        )
                    }
                    placeholder="Write your proposal here..."
                />

                <div className="flex justify-end mt-5">

                    <Button
                        type="button"
                        disabled={loading}
                        onClick={handleApply}
                    >
                        {loading
                            ? "Applying..."
                            : "Submit Application"}
                    </Button>

                </div>

            </div>

        </div>
    );
}

export default ApplicationForm;


