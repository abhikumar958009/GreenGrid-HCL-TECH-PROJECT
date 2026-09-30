import React from "react";
import RenewableSourceCard from "./RenewableSourceCard";

function Substation({ data = {}, onViewDetails, onEdit, onDelete }) {
  if (!data || typeof data !== "object") {
    return null;
  }

  return (
    <RenewableSourceCard
      id={data.id}
      icon="⚡"
      title={data.name || "Substation"}
      type="Energy Infrastructure"
      sourceType="substation"
      output={data.output}
      capacity={data.capacity}
      efficiency={data.efficiency}
      status={data.status}
      description="Distributes generated energy to connected buildings."
      onViewDetails={onViewDetails}
      onEdit={onEdit}
      onDelete={onDelete}
    />
  );
}

export default Substation;
