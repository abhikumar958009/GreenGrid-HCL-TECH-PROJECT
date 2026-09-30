import React from "react";

function RenewableSourceCard({
  id,
  icon,
  title,
  type,
  sourceType,
  output,
  capacity,
  efficiency,
  status,
  description,
  onViewDetails,
  onEdit,
  onDelete,
}) {
  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails({
        id,
        icon,
        title,
        type,
        sourceType,
        output,
        capacity,
        efficiency,
        status,
        description,
      });
    }
  };

  const handleEdit = () => {
    if (onEdit) {
      onEdit({
        id,
        title,
        type,
        sourceType,
        output,
        capacity,
        efficiency,
        status,
        description,
      });
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete({
        id,
        title,
        type,
        sourceType,
      });
    }
  };

  return (
    <div className="energy-source-card">
      <div className="energy-source-top">
        <div className="energy-source-icon">
          {icon}
        </div>

        <span className="source-status">
          <i></i>
          {status || "Active"}
        </span>
      </div>

      <h3>{title || "Energy Source"}</h3>

      <p>{type || "Renewable Energy"}</p>

      <div className="source-details">
        <div>
          <span>Output</span>
          <strong>{output || "0 kWh"}</strong>
        </div>

        <div>
          <span>Capacity</span>
          <strong>{capacity || "0 kW"}</strong>
        </div>

        <div>
          <span>Efficiency</span>
          <strong>{efficiency || "0%"}</strong>
        </div>
      </div>

      {description && (
        <p className="source-description">
          {description}
        </p>
      )}

      <div className="source-actions">
        <button
          type="button"
          className="source-view-btn"
          onClick={handleViewDetails}
        >
          View Details →
        </button>

        <div className="source-management-actions">
          <button
            type="button"
            className="source-edit-btn"
            onClick={handleEdit}
          >
            Edit
          </button>

          <button
            type="button"
            className="source-delete-btn"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default RenewableSourceCard;