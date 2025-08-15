import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function ProposalForm({ jobId, freelancerId }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (formData) => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("http://localhost:3000/freelancer/proposal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobId,
          freelancerId,
          bidAmount: formData.bidAmount,
          message: formData.message,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess("Proposal submitted successfully!");
        alert(success)
        reset();
      } else {
        setError(data.error || "Something went wrong");
      }
    } catch (err) {
      setError("Error submitting proposal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md mt-6">
      <h2 className="text-lg font-bold mb-4">Submit Your Proposal</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        
        {/* Bid Amount */}
        <div>
          <label className="text-sm font-medium">Bid Amount (USD)</label>
          <input
            type="number"
            {...register("bidAmount", { required: "Bid amount is required" })}
            className="w-full border rounded px-3 py-2 mt-1"
          />
          {errors.bidAmount && (
            <p className="text-red-500 text-sm">{errors.bidAmount.message}</p>
          )}
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium">Message</label>
          <textarea
            rows="4"
            {...register("message", { required: "Message is required" })}
            className="w-full border rounded px-3 py-2 mt-1"
          />
          {errors.message && (
            <p className="text-red-500 text-sm">{errors.message.message}</p>
          )}
        </div>

        {/* Status messages */}
        {success && <p className="text-green-600 text-sm">{success}</p>}
        {error && <p className="text-red-600 text-sm">{error}</p>}

        {/* Submit button */}
        <button
          type="submit"
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Proposal"}
        </button>
      </form>
    </div>
  );
}
