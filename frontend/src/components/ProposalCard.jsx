import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const ProposalCard = ({ proposal, onUpdate, onDelete }) => {
  return (
    <div className="w-full max-w-md mx-auto my-4 p-5 rounded-2xl border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 bg-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Proposal</h2>

        <div className="flex gap-2">
          

          {/* Delete Proposal Button */}
          <button
            onClick={() => onDelete(proposal)}
            className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-white bg-red-600 rounded-lg shadow hover:bg-red-700 transition-all duration-300"
          >
            <FaTrash /> Delete
          </button>
        </div>
      </div>

      {/* Bid Amount */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-green-600 font-bold">💲</span>
        <p className="text-xl font-bold text-green-700">
          ${proposal.bidAmount}
        </p>
      </div>

      {/* Message */}
      <div className="flex items-start gap-2">
        <span className="text-gray-600 mt-1">💬</span>
        <p className="text-gray-700 leading-relaxed">{proposal.message}</p>
      </div>
    </div>
  );
};

export default ProposalCard;
