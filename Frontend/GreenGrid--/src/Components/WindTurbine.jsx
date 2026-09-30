import React from "react";
import RenewableSourceCard from "./RenewableSourceCard";

function WindTurbine({ data = {}, onViewDetails, onEdit, onDelete }) {
  if (!data || typeof data !== "object") {
    return null;
  }

  return (
    <RenewableSourceCard
      id={data.id}
      icon="🌬️"
      title={data.name || "Wind Turbine"}
      type="Wind Energy"
      sourceType="wind"
      output={data.output}
      capacity={data.capacity}
      efficiency={data.efficiency}
      status={data.status}
      description="Generates clean electricity using wind energy."
      onViewDetails={onViewDetails}
      onEdit={onEdit}
      onDelete={onDelete}
    />
  );
}

export default WindTurbine;
