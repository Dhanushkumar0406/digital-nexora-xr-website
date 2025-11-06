import React from "react";
import { motion } from "framer-motion";
import { Share2, CreditCard, BarChart4, Search, Mail, LineChart } from "lucide-react";
import GeometricShape from "./GeometricShape";
import StarBackground from "./StarBackground";

interface Service {
  id: string;
  title: string;
  bullets: string[];
  summary?: string;
}

const IconMap: Record<string, React.ElementType> = {
  smm: Share2,
  advertising: CreditCard,
  branding: BarChart4,
  seo: Search,
  content: Mail,
  maintenance: LineChart,
};

const cardGradients = {
  smm: {
    colors: ["#7c3aed", "#2563eb"],
    glow: "rgba(124, 58, 237, 0.5)",
    radial: "radial-gradient(circle at 50% 0%, #7c3aed33 0%, #2563eb22 50%, transparent 100%)",
  },
  advertising: {
    colors: ["#ec4899", "#8b5cf6"],
    glow: "rgba(236, 72, 153, 0.5)",
    radial: "radial-gradient(circle at 50% 0%, #ec489933 0%, #8b5cf622 50%, transparent 100%)",
  },
  branding: {
    colors: ["#10b981", "#3b82f6"],
    glow: "rgba(16, 185, 129, 0.5)",
    radial: "radial-gradient(circle at 50% 0%, #10b98133 0%, #3b82f622 50%, transparent 100%)",
  },
  seo: {
    colors: ["#f59e0b", "#ef4444"],
    glow: "rgba(245, 158, 11, 0.5)",
    radial: "radial-gradient(circle at 50% 0%, #f59e0b33 0%, #ef444422 50%, transparent 100%)",
  },
  content: {
    colors: ["#6366f1", "#a855f7"],
    glow: "rgba(99, 102, 241, 0.5)",
    radial: "radial-gradient(circle at 50% 0%, #6366f133 0%, #a855f722 50%, transparent 100%)",
  },
  maintenance: {
    colors: ["#14b8a6", "#0ea5e9"],
    glow: "rgba(20, 184, 166, 0.5)",
    radial: "radial-gradient(circle at 50% 0%, #14b8a633 0%, #0ea5e922 50%, transparent 100%)",
  },
};
const ServiceCard3D: React.FC<{ service: Service }> = ({ service }) => {
  const Icon = IconMap[service.id] || BarChart4;

  const gradient = cardGradients[service.id as keyof typeof cardGradients] || cardGradients.content;

  const cardColors = {
    smm: ["#7c3aed", "#2563eb"],
    advertising: ["#ec4899", "#8b5cf6"],
    branding: ["#10b981", "#3b82f6"],
    seo: ["#f59e0b", "#ef4444"],
    content: ["#6366f1", "#a855f7"],
    maintenance: ["#14b8a6", "#0ea5e9"],
  };

  const [color1, color2] = cardColors[service.id as keyof typeof cardColors] || ["#6366f1", "#a855f7"];

  return (
    <motion.div
      whileHover={{ scale: 1.02, rotateX: 5, rotateY: 5 }}
      transition={{ type: "spring", stiffness: 200 }}
        className="group relative p-6 min-h-[340px] flex flex-col rounded-2xl backdrop-blur-xl"
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
          background: "rgba(255, 255, 255, 0.03)",
          boxShadow: `0 0 40px ${gradient.glow}, inset 0 0 20px rgba(255, 255, 255, 0.05)`,
          border: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      {/* Starry background (behind everything) */}
      <StarBackground />

      {/* Background radial overlay */}
      <div 
        className="absolute inset-0 rounded-2xl opacity-40 transition-opacity duration-500 group-hover:opacity-60 z-10"
        style={{ background: gradient.radial }}
      />
      {/* Geometric shapes */}
      <div className="absolute top-4 right-4">
        <GeometricShape color={color1} />
      </div>
      <div className="absolute bottom-4 left-4">
        <GeometricShape color={color2} delay={2} />
      </div>

      <div className="relative z-20 h-full flex flex-col">
        <div 
          className="w-full h-40 md:h-44 rounded-xl flex items-center justify-center"
          style={{
            background: `radial-gradient(circle at center, rgba(255,255,255,0.05) 0%, transparent 70%)`
          }}
        >
          <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center backdrop-blur-sm">
            <Icon className="w-8 h-8" style={{ color: color1 }} />
          </div>
        </div>

        <h3 className="text-lg md:text-xl font-semibold text-white mt-4">{service.title}</h3>
        {service.summary && (
          <p className="text-secondary mt-2 text-[14px] leading-[20px]">{service.summary}</p>
        )}

        <ul className="text-sm text-indigo-200/90 mt-3 space-y-1 flex-1">
          {service.bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-2">
              <span 
                className="inline-block w-2 h-2 rounded-full mt-2"
                style={{ background: color2 }}
              />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default ServiceCard3D;
