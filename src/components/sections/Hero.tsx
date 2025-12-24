import { motion } from "framer-motion";

import { styles } from "../../constants/styles";

const Hero = () => {
  return (
    <section className={`relative mx-auto h-screen w-full overflow-hidden`}>
      {/* Centered Hero Container - All in Stars */}
      <div
        className={`absolute inset-0 mx-auto max-w-7xl ${styles.paddingX} flex flex-col items-center justify-center z-10`}
      >
        {/* Main Content Card */}
        <motion.div
          className="backdrop-blur-xl bg-white/10 rounded-3xl p-8 sm:p-10 md:p-12 lg:p-16 border border-white/20 shadow-2xl max-w-5xl w-full"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          style={{
            background: "linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
          }}
        >
          {/* Company Name - 3D Text with Indian Flag Colors */}
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-tight mb-6 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {/* DIGITAL - Saffron (Orange) */}
            <span
              style={{
                background: "linear-gradient(135deg, #FF9933 0%, #FF7700 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                textShadow: "0 2px 8px rgba(255, 153, 51, 0.3)",
                filter: "drop-shadow(0 0 8px rgba(255, 153, 51, 0.4))",
              }}
            >
              DIGITAL
            </span>
            <br />
            {/* NEXORAXR - White */}
            <span
              style={{
                color: "#FFFFFF",
                textShadow: "0 0 10px rgba(255, 255, 255, 0.4), 0 2px 8px rgba(255, 255, 255, 0.2)",
                filter: "drop-shadow(0 0 8px rgba(255, 255, 255, 0.4))",
              }}
            >
              NEXORAXR
            </span>
            <br />
            {/* WEBTECH - Green */}
            <span
              style={{
                background: "linear-gradient(135deg, #138808 0%, #11AA00 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                textShadow: "0 2px 8px rgba(19, 136, 8, 0.3)",
                filter: "drop-shadow(0 0 8px rgba(19, 136, 8, 0.4))",
              }}
            >
              WEBTECH
            </span>
          </motion.h1>

          {/* Tagline with Glass Effect */}
          <motion.p
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-white text-center leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            style={{
              textShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
            }}
          >
            Create. Connect & Convert
          </motion.p>

          {/* Decorative Shine Effect */}
          <motion.div
            className="absolute top-0 left-0 w-full h-full rounded-3xl pointer-events-none overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.3, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <div
              className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12"
              style={{
                animation: "shine 3s infinite",
              }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Glassmorphism Scroll Indicator */}
      <div className="xs:bottom-10 absolute bottom-32 flex w-full items-center justify-center z-20">
        <a href="#about" aria-label="Scroll to about section">
          <motion.div
            className="flex h-[64px] w-[35px] items-start justify-center rounded-3xl p-2 backdrop-blur-md bg-white/10 border border-white/20"
            whileHover={{ scale: 1.1 }}
            style={{
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              boxShadow: "0 8px 32px 0 rgba(147, 51, 234, 0.37)",
            }}
          >
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="mb-1 h-3 w-3 rounded-full bg-gradient-to-b from-purple-400 to-cyan-400"
              style={{
                boxShadow: "0 0 15px rgba(147, 51, 234, 0.8)",
              }}
            />
          </motion.div>
        </a>
      </div>

      {/* Custom Keyframe Animation */}
      <style>{`
        @keyframes shine {
          0% {
            transform: translateX(-100%) skewX(-12deg);
          }
          100% {
            transform: translateX(300%) skewX(-12deg);
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
