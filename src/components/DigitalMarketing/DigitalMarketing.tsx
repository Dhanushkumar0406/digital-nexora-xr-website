import React from "react";
import services from "./data/services.json";
import ServiceCard3D from "./ui/ServiceCard3D";
import FloatingTitle from "./ui/FloatingTitle";

const DigitalMarketing: React.FC = () => {
  return (
    <section id="digitalmarketing" className="relative py-20 px-6 md:px-16 lg:px-24 bg-gradient-to-b from-[#05060b]/90 to-[#0b1220]/90 text-white overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <FloatingTitle subtitle="Digital Solutions" title="Digital Marketing." />

        <p className="text-indigo-200/80 max-w-3xl leading-relaxed mb-12">
          Comprehensive digital marketing services combining AI-driven strategies with cutting-edge web technologies. From SEO
          optimization and social media management to content marketing and analytics, we deliver data-driven campaigns that
          drive engagement and conversions.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s: any) => (
            <ServiceCard3D key={s.id} service={s} />
          ))}
        </div>

        {/* CTA removed for cleaner, professional layout */}
      </div>
    </section>
  );
};

export default DigitalMarketing;
