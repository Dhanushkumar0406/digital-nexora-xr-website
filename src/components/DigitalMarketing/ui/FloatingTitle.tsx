import React from "react";

interface Props {
  subtitle?: string;
  title: string;
}

const FloatingTitle: React.FC<Props> = ({ subtitle, title }) => {
  return (
    <div className="mb-8">
      {subtitle && <p className="text-sm text-indigo-300/70 uppercase tracking-wider">{subtitle}</p>}
      <h2 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg">{title}</h2>
    </div>
  );
};

export default FloatingTitle;
