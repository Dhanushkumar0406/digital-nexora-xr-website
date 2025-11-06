import React from "react";
import services from "../data/services.json";
import ServiceCard3D from "../ui/ServiceCard3D";

const SMMSection: React.FC = () => {
  const service = services.find((s: any) => s.id === "smm");
  if (!service) return null;
  return <ServiceCard3D service={service} />;
};

export default SMMSection;
