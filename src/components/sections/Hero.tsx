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
          className="hero-card-background backdrop-blur-xl bg-white/10 rounded-3xl p-8 sm:p-10 md:p-12 lg:p-16 border border-white/20 shadow-2xl max-w-5xl w-full"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          {/* Company Name - 3D Text with Indian Flag Colors */}
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-tight mb-6 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {/* DIGITAL - Saffron (Orange) */}
            <span className="hero-text-saffron">
              DIGITAL
            </span>
            <br />
            {/* NEXORAXR - White */}
            <span className="hero-text-white">
              NEXORAXR
            </span>
            <br />
            {/* WEBTECH - Green */}
            <span className="hero-text-green">
              WEBTECH
            </span>
          </motion.h1>

          {/* Tagline with Glass Effect */}
          <motion.p
            className="hero-tagline-shadow text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-white text-center leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
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
            <div className="hero-shine-animation absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12" />
          </motion.div>
        </motion.div>
      </div>

      {/* Glassmorphism Scroll Indicator */}
      <div className="xs:bottom-10 absolute bottom-32 flex w-full items-center justify-center z-20">
        <a href="#about" aria-label="Scroll to about section">
          <motion.div
            className="hero-scroll-indicator flex h-[64px] w-[35px] items-start justify-center rounded-3xl p-2 backdrop-blur-md bg-white/10 border border-white/20"
            whileHover={{ scale: 1.1 }}
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
              className="hero-scroll-dot mb-1 h-3 w-3 rounded-full bg-gradient-to-b from-purple-400 to-cyan-400"
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
