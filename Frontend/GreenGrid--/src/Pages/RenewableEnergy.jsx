import React, { useEffect, useState } from "react";

import WindTurbine from "../Components/WindTurbine";
import SolarPanel from "../Components/SolarPanel";
import BatteryStorage from "../Components/BatteryStorage";
import Substation from "../Components/Substation";

import RenewableDetailsModal from "../Components/RenewableDetailsModal";
import AddEnergySourceModal from "../Components/AddEnergySourceModal";

const API_URL = "http://127.0.0.1:8000/api/energy-sources/";

function RenewableEnergy() {
  const [selectedSource, setSelectedSource] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const [sources, setSources] = useState({
    wind: [],
    solar: [],
    battery: [],
    substation: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ================= NORMALIZE SOURCE =================

  const normalizeSource = (item, type) => ({
    ...item,

    id: item.id,

    title: item.name || "Unnamed Source",

    sourceType: item.source_type || type,

    name: item.name || "Unnamed Source",

    output: item.output || "",

    capacity: item.capacity || "",

    efficiency: item.efficiency || "",

    status: item.status || "Active",

    description: item.description || "",
  });

  // ================= GROUP SOURCES =================

  const groupSources = (data) => {
    const groupedSources = {
      wind: [],
      solar: [],
      battery: [],
      substation: [],
    };

    if (!Array.isArray(data)) {
      return groupedSources;
    }

    data.forEach((item) => {
      const type = item.source_type;

      if (groupedSources[type]) {
        groupedSources[type].push(normalizeSource(item, type));
      }
    });

    return groupedSources;
  };

  // ================= LOAD SOURCES =================

  const fetchSources = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();

      setSources(groupSources(data));
    } catch (error) {
      console.error("Error fetching energy sources:", error);

      setError(
        "Unable to load energy sources. Please check that Django server is running.",
      );
    } finally {
      setLoading(false);
    }
  };

  // ================= INITIAL LOAD =================

  useEffect(() => {
    fetchSources();
  }, []);

  // ================= ADD SOURCE =================

  const handleAddSource = async (newSource) => {
    if (!newSource) return;

    const sourceType = newSource.type || newSource.source_type;

    if (!["wind", "solar", "battery", "substation"].includes(sourceType)) {
      console.error("Invalid energy source type:", sourceType);

      return;
    }

    try {
      const sourceData = {
        name: newSource.name || newSource.title || "New Energy Source",

        source_type: sourceType,

        output: newSource.output || "",

        capacity: newSource.capacity || "",

        efficiency: newSource.efficiency || "",

        status: newSource.status || "Active",

        description: newSource.description || "",
      };

      const response = await fetch(API_URL, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(sourceData),
      });

      if (!response.ok) {
        throw new Error("Failed to add energy source");
      }

      await response.json();

      setShowAddModal(false);

      await fetchSources();
    } catch (error) {
      console.error("Error adding energy source:", error);

      window.alert("Unable to add energy source.");
    }
  };

  // ================= DELETE SOURCE =================

  const handleDeleteSource = async (source) => {
    if (!source) return;

    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${
        source.title || source.name || "this source"
      }"?`,
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}${source.id}/`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete energy source");
      }

      if (selectedSource && selectedSource.id === source.id) {
        setSelectedSource(null);
      }

      await fetchSources();
    } catch (error) {
      console.error("Error deleting energy source:", error);

      window.alert("Unable to delete energy source.");
    }
  };

  // ================= EDIT SOURCE =================

  const handleEditSource = async (source) => {
    if (!source) return;

    const updatedName = window.prompt(
      "Enter new name:",
      source.title || source.name || "",
    );

    if (updatedName === null) {
      return;
    }

    const name = updatedName.trim();

    if (!name) {
      window.alert("Name cannot be empty.");

      return;
    }

    try {
      const response = await fetch(`${API_URL}${source.id}/`, {
        method: "PATCH",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name: name,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update energy source");
      }

      await fetchSources();

      if (selectedSource && selectedSource.id === source.id) {
        setSelectedSource(null);
      }
    } catch (error) {
      console.error("Error updating energy source:", error);

      window.alert("Unable to update energy source.");
    }
  };

  // ================= RENDER SOURCE =================

  const renderSource = (item, type) => {
    if (!item || typeof item !== "object") {
      return null;
    }

    const sourceData = {
      ...item,

      id: item.id || `${type}-${Date.now()}`,

      title: item.title || item.name || "Unnamed Source",

      sourceType: item.sourceType || item.source_type || type,
    };

    const commonProps = {
      data: sourceData,

      onViewDetails: setSelectedSource,

      onEdit: handleEditSource,

      onDelete: handleDeleteSource,
    };

    if (type === "wind") {
      return <WindTurbine key={sourceData.id} {...commonProps} />;
    }

    if (type === "solar") {
      return <SolarPanel key={sourceData.id} {...commonProps} />;
    }

    if (type === "battery") {
      return <BatteryStorage key={sourceData.id} {...commonProps} />;
    }

    if (type === "substation") {
      return <Substation key={sourceData.id} {...commonProps} />;
    }

    return null;
  };

  // ================= CALCULATE STATS =================

  const allSources = [
    ...sources.wind,
    ...sources.solar,
    ...sources.battery,
    ...sources.substation,
  ];

  const solarSources = sources.solar;

  const windSources = sources.wind;

  const batterySources = sources.battery;

  const getNumericValue = (value) => {
    if (!value) return 0;

    const number = parseFloat(String(value).replace(/,/g, ""));

    return isNaN(number) ? 0 : number;
  };

  const solarGeneration = solarSources.reduce(
    (total, item) => total + getNumericValue(item.output),
    0,
  );

  const windGeneration = windSources.reduce(
    (total, item) => total + getNumericValue(item.output),
    0,
  );

  const batteryGeneration = batterySources.reduce(
    (total, item) => total + getNumericValue(item.output),
    0,
  );

  const totalRenewable = solarGeneration + windGeneration + batteryGeneration;

  // ================= RETURN =================

  return (
    <div className="renewable-page">
      {/* ================= HEADER ================= */}

      <div className="dashboard-header dashboard-header-flex">
        <div>
          <h1>Renewable Energy</h1>

          <p>
            Monitor and manage renewable energy sources across your buildings.
          </p>
        </div>

        <div className="dashboard-date">
          <span>Renewable Energy</span>

          <strong>Live Monitoring</strong>
        </div>
      </div>

      {/* ================= ACTION BAR ================= */}

      <div className="renewable-action-bar">
        <div>
          <span>ENERGY INFRASTRUCTURE</span>

          <h2>Renewable Energy Sources</h2>
        </div>

        <button
          type="button"
          className="add-energy-btn"
          onClick={() => setShowAddModal(true)}
        >
          + Add Energy Source
        </button>
      </div>

      {/* ================= LOADING ================= */}

      {loading && (
        <div className="renewable-loading">
          Loading renewable energy data...
        </div>
      )}

      {/* ================= ERROR ================= */}

      {error && (
        <div className="renewable-error">
          {error}

          <button type="button" onClick={fetchSources}>
            Retry
          </button>
        </div>
      )}

      {/* ================= STATS ================= */}

      {!loading && !error && (
        <div className="renewable-stats">
          <div className="renewable-stat-card">
            <div className="renewable-stat-icon">⚡</div>

            <div>
              <span>Total Renewable</span>

              <h2>{totalRenewable.toLocaleString()} kWh</h2>

              <small>Live data</small>
            </div>
          </div>

          <div className="renewable-stat-card">
            <div className="renewable-stat-icon solar">☀️</div>

            <div>
              <span>Solar Generation</span>

              <h2>{solarGeneration.toLocaleString()} kWh</h2>

              <small>
                {solarSources.length} source
                {solarSources.length !== 1 ? "s" : ""}
              </small>
            </div>
          </div>

          <div className="renewable-stat-card">
            <div className="renewable-stat-icon wind">🌬️</div>

            <div>
              <span>Wind Generation</span>

              <h2>{windGeneration.toLocaleString()} kWh</h2>

              <small>
                {windSources.length} source
                {windSources.length !== 1 ? "s" : ""}
              </small>
            </div>
          </div>

          <div className="renewable-stat-card">
            <div className="renewable-stat-icon battery">🔋</div>

            <div>
              <span>Battery Storage</span>

              <h2>{batteryGeneration.toLocaleString()} kWh</h2>

              <small>
                {batterySources.length} source
                {batterySources.length !== 1 ? "s" : ""}
              </small>
            </div>
          </div>
        </div>
      )}

      {/* ================= ENERGY SOURCES ================= */}

      {!loading && !error && (
        <section className="renewable-overview">
          <div className="renewable-section-heading">
            <div>
              <span>ENERGY SOURCES</span>

              <h2>Renewable Energy Infrastructure</h2>
            </div>

            <div className="live-status">
              <span></span>
              Live
            </div>
          </div>

          <div className="energy-source-grid">
            {sources.wind.map((item) => renderSource(item, "wind"))}

            {sources.solar.map((item) => renderSource(item, "solar"))}

            {sources.battery.map((item) => renderSource(item, "battery"))}

            {sources.substation.map((item) => renderSource(item, "substation"))}

            {allSources.length === 0 && (
              <div className="no-energy-sources">
                <p>No renewable energy sources found.</p>

                <button type="button" onClick={() => setShowAddModal(true)}>
                  + Add Energy Source
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ================= ENERGY FLOW ================= */}

      {!loading && !error && (
        <section className="renewable-flow-card">
          <div>
            <span>ENERGY FLOW</span>

            <h2>Renewable Energy Contribution</h2>

            <p>
              Renewable sources are contributing to the overall energy demand
              monitored by GreenGrid.
            </p>
          </div>

          <div className="energy-flow">
            <div className="flow-item">
              <strong>{totalRenewable.toLocaleString()}</strong>

              <span>kWh Generated</span>
            </div>

            <div className="flow-arrow">→</div>

            <div className="flow-item">
              <strong>{allSources.length}</strong>

              <span>Active Sources</span>
            </div>

            <div className="flow-arrow">→</div>

            <div className="flow-item">
              <strong>Live</strong>

              <span>Monitoring</span>
            </div>
          </div>
        </section>
      )}

      {/* ================= DETAILS MODAL ================= */}

      {selectedSource && (
        <RenewableDetailsModal
          source={selectedSource}
          onClose={() => setSelectedSource(null)}
        />
      )}

      {/* ================= ADD SOURCE MODAL ================= */}

      {showAddModal && (
        <AddEnergySourceModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddSource}
        />
      )}
    </div>
  );
}

export default RenewableEnergy;
