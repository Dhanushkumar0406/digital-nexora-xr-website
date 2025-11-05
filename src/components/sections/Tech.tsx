import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { SectionWrapper } from "../../hoc";
import { websiteTypes, type IWebsiteType } from "../../constants";
import { fadeIn } from "../../utils/motion";

interface IWebsiteCard {
  index: number;
  website: IWebsiteType;
}

const WebsiteCard: React.FC<IWebsiteCard> = ({ index, website }) => {
  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.2, 0.75)}
      className="relative group w-full max-w-[320px]"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
    >
      {/* Outer glow effect */}
      <motion.div
        className="absolute -inset-1 rounded-3xl opacity-80 group-hover:opacity-100 blur-xl transition duration-500"
        style={{
          background: `linear-gradient(135deg, var(--tw-gradient-stops))`,
        }}
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <div className={`w-full h-full bg-gradient-to-r ${website.gradient}`} />
      </motion.div>

      {/* Main card with glassmorphism */}
      <motion.div
        className="relative backdrop-blur-xl bg-gradient-to-br from-white/25 to-white/15 rounded-3xl p-8 border-2 border-white/40 shadow-2xl overflow-hidden"
        whileHover={{
          scale: 1.05,
          rotateY: 5,
          rotateX: 5,
        }}
        transition={{ duration: 0.3 }}
        style={{
          transformStyle: "preserve-3d",
          perspective: "1000px",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        {/* Animated background gradient */}
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            background: [
              `linear-gradient(135deg, transparent 0%, transparent 100%)`,
              `linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 100%)`,
              `linear-gradient(135deg, transparent 0%, transparent 100%)`,
            ],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Icon with 3D effect */}
        <motion.div
          className="relative z-10 mb-6 flex items-center justify-center"
          whileHover={{
            scale: 1.2,
            rotateZ: 360,
          }}
          transition={{ duration: 0.6 }}
        >
          <div className={`relative w-24 h-24 rounded-2xl bg-gradient-to-r ${website.gradient} p-1`}>
            <div className="w-full h-full backdrop-blur-lg bg-black/40 rounded-2xl flex items-center justify-center">
              <img
                src={website.icon}
                alt={website.title}
                className="w-16 h-16 object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </motion.div>

        {/* Title with gradient text */}
        <motion.h3
          className="relative z-10 text-2xl font-black mb-4 text-center text-white drop-shadow-lg"
        >
          {website.title}
        </motion.h3>

        {/* Description */}
        <p className="relative z-10 text-white text-base text-center mb-6 leading-relaxed font-semibold">
          {website.description}
        </p>

        {/* Features list with checkmarks */}
        <div className="relative z-10 space-y-2">
          {website.features.map((feature, idx) => (
            <motion.div
              key={idx}
              className="flex items-center gap-3 text-white text-sm"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <motion.div
                className={`w-3 h-3 rounded-full bg-gradient-to-r ${website.gradient}`}
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 2,
                  delay: idx * 0.2,
                  repeat: Infinity,
                }}
              />
              <span className="font-semibold">{feature}</span>
            </motion.div>
          ))}
        </div>

        {/* Shine effect on hover */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden rounded-3xl opacity-0 group-hover:opacity-100"
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12"
            animate={{
              x: ["-200%", "400%"],
            }}
            transition={{
              duration: 1.5,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const Tech = () => {
  return (
    <div className="w-full">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <motion.p
          className="text-white text-[18px] uppercase tracking-wider mb-2 font-bold"
          style={{
            background: "linear-gradient(135deg, #915EFF 0%, #06b6d4 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Our Portfolio
        </motion.p>
        <motion.h2
          className="text-white font-black text-[40px] sm:text-[50px] md:text-[60px]"
          style={{
            textShadow: "0 0 30px rgba(145, 94, 255, 0.5)",
          }}
        >
          Projects.
        </motion.h2>
      </motion.div>

      {/* Website Type Cards Grid */}
      <div className="flex flex-wrap justify-center gap-10 max-w-7xl mx-auto">
        {websiteTypes.map((website, index) => (
          <WebsiteCard key={website.title} index={index} website={website} />
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Tech, "tech");
