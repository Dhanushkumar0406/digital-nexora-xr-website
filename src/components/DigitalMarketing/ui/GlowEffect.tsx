import React from "react";

const GlowEffect: React.FC = () => {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <div
        className="absolute left-0 top-10 w-72 h-72 rounded-full blur-3xl opacity-30"
        style={{
          background: "radial-gradient(circle at 20% 20%, rgba(99,102,241,0.35), transparent 40%)",
        }}
      />
      <div
        className="absolute right-0 bottom-0 w-96 h-96 rounded-full blur-2xl opacity-25"
        style={{
          background: "radial-gradient(circle at 80% 80%, rgba(16,185,129,0.28), transparent 35%)",
        }}
      />
    </div>
  );
};

export default GlowEffect;
