import {
    useState,
} from "react";

import {
    uploadResume,
} from "../../api/resume.api";

import Button from "../common/Button";
import toast from "react-hot-toast";

function ResumeUpload({
    onSuccess,
}) {
    const [file, setFile] =
        useState(null);

    const [loading, setLoading] =
        useState(false);

    const handleUpload =
        async () => {
            if (!file) return;

            try {
                setLoading(true);

                const formData =
                    new FormData();

                formData.append(
                    "resume",
                    file
                );

                await uploadResume(
                    formData
                );

                onSuccess();
                toast.success(
                    "Resume Uploaded Successfully"
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
        <div className="space-y-2">
            <input
                type="file"
                accept=".pdf"
                onChange={(e) =>
                    setFile(
                        e.target.files[0]
                    )
                }
            />

            <Button
                onClick={
                    handleUpload
                }
                className="bg-black text-white px-4 py-2 rounded"
            >
                {loading
                    ? "Uploading..."
                    : "Upload Resume"}
            </Button>
        </div>
    );
}

export default ResumeUpload;