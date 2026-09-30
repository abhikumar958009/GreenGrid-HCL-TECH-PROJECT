import React, { useState } from "react";

function AddEnergySourceModal({ onClose, onAdd }) {
  const [formData, setFormData] = useState({
    type: "wind",
    name: "",
    output: "",
    capacity: "",
    efficiency: "",
    status: "Active",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.output ||
      !formData.capacity ||
      !formData.efficiency
    ) {
      alert("Please fill all fields.");
      return;
    }

    onAdd({
      id: `${formData.type.toUpperCase()}-${Date.now()}`,
      ...formData,
    });

    onClose();
  };

  return (
    <div className="add-source-overlay" onClick={onClose}>
      <div
        className="add-source-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="add-source-close"
          onClick={onClose}
        >
          ×
        </button>

        <div className="add-source-header">
          <span>NEW ENERGY SOURCE</span>
          <h2>Add Energy Source</h2>
          <p>
            Add a renewable energy source to your GreenGrid infrastructure.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Energy Source</label>

            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
            >
              <option value="wind">🌬️ Wind Turbine</option>
              <option value="solar">☀️ Solar Panel</option>
              <option value="battery">🔋 Battery Storage</option>
              <option value="substation">⚡ Substation</option>
            </select>
          </div>

          <div className="form-group">
            <label>Name</label>

            <input
              type="text"
              name="name"
              placeholder="e.g. Wind Turbine 03"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Output</label>

              <input
                type="text"
                name="output"
                placeholder="e.g. 320 kWh"
                value={formData.output}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Capacity</label>

              <input
                type="text"
                name="capacity"
                placeholder="e.g. 4.5 MW"
                value={formData.capacity}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Efficiency</label>

              <input
                type="text"
                name="efficiency"
                placeholder="e.g. 92%"
                value={formData.efficiency}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Status</label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Active">Active</option>
                <option value="Charging">Charging</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Offline">Offline</option>
              </select>
            </div>
          </div>

          <div className="add-source-actions">
            <button
              type="button"
              className="cancel-source-btn"
              onClick={onClose}
            >
              Cancel
            </button>

            <button type="submit" className="save-source-btn">
              + Add Source
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddEnergySourceModal;