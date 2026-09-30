import React from "react";
import RenewableSourceCard from "./RenewableSourceCard";

function BatteryStorage({ data = {}, onViewDetails, onEdit, onDelete }) {
  if (!data || typeof data !== "object") {
    return null;
  }

  return (
    <RenewableSourceCard
      id={data.id}
      icon="🔋"
      title={data.name || "Battery Storage"}
      type="Energy Storage"
      sourceType="battery"
      output={data.output}
      capacity={data.capacity}
      efficiency={data.efficiency}
      status={data.status}
      description="Stores renewable energy for later consumption."
      onViewDetails={onViewDetails}
      onEdit={onEdit}
      onDelete={onDelete}
    />
  );
}

export default BatteryStorage;
