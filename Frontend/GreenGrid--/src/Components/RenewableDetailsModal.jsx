import React from "react";

function RenewableDetailsModal({ source, onClose }) {
  if (!source) return null;

  return (
    <div
      className="renewable-modal-overlay"
      onClick={onClose}
    >
      <div
        className="renewable-modal"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="renewable-modal-close"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>

        <div className="renewable-modal-header">
          <div className="renewable-modal-icon">
            {source.icon}
          </div>

          <div>
            <span>{source.type}</span>
            <h2>{source.title}</h2>
          </div>
        </div>

        <div className="renewable-modal-status">
          <span></span>
          {source.status}
        </div>

        <div className="renewable-detail-grid">
          <div className="renewable-detail-box">
            <span>Current Output</span>
            <strong>{source.output}</strong>
          </div>

          <div className="renewable-detail-box">
            <span>Installed Capacity</span>
            <strong>{source.capacity}</strong>
          </div>

          <div className="renewable-detail-box">
            <span>Efficiency</span>
            <strong>{source.efficiency}</strong>
          </div>

          <div className="renewable-detail-box">
            <span>Status</span>
            <strong>{source.status}</strong>
          </div>
        </div>

        <div className="renewable-modal-description">
          <span>ABOUT THIS SOURCE</span>
          <p>
            {source.description ||
              "This renewable energy source is currently being monitored by GreenGrid."}
          </p>
        </div>

        <div className="renewable-modal-footer">
          <button
            type="button"
            className="renewable-modal-action"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default RenewableDetailsModal;