import React from "react";
import RenewableSourceCard from "./RenewableSourceCard";

function SolarPanel({ data = {}, onViewDetails, onEdit, onDelete }) {
  if (!data || typeof data !== "object") {
    return null;
  }

  return (
    <RenewableSourceCard
      id={data.id}
      icon="☀️"
      title={data.name || "Solar Panel"}
      type="Solar Energy"
      sourceType="solar"
      output={data.output}
      capacity={data.capacity}
      efficiency={data.efficiency}
      status={data.status}
      description="Generates clean electricity using solar energy."
      onViewDetails={onViewDetails}
      onEdit={onEdit}
      onDelete={onDelete}
    />
  );
}

export default SolarPanel;
