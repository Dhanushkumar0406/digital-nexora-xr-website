import React from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

import { services } from "../../constants";
import { SectionWrapper } from "../../hoc";
import { fadeIn } from "../../utils/motion";
import { config } from "../../constants/config";
import { Header } from "../atoms/Header";

interface IServiceCard {
  index: number;
  title: string;
  icon: string;
}

const ServiceCard: React.FC<IServiceCard> = ({ index, title, icon }) => {
  // Different tech stacks based on title
  const getTechStack = () => {
    if (title.includes("Full Stack 3D Web Developer")) {
      return [
        { label: "React & Three.js", gradient: "from-purple-500 to-cyan-500" },
        { label: "TypeScript", gradient: "from-cyan-500 to-pink-500" },
        { label: "AI Integration", gradient: "from-pink-500 to-purple-500" },
      ];
    } else if (title.includes("Marketing Technologist")) {
      return [
        { label: "SEO & Analytics", gradient: "from-green-500 to-cyan-500" },
        { label: "Marketing Automation", gradient: "from-orange-500 to-pink-500" },
        { label: "Data-Driven Strategy", gradient: "from-purple-500 to-blue-500" },
      ];
    }
    return [];
  };

  const techStack = getTechStack();

  return (
    <Tilt
      glareEnable
      tiltEnable
      tiltMaxAngleX={30}
      tiltMaxAngleY={30}
      glareColor="#aaa6c3"
    >
      <div className="max-w-[500px] w-full xs:w-[450px] sm:w-[500px]">
        <motion.div
          variants={fadeIn("right", "spring", index * 0.5, 0.75)}
          className="green-pink-gradient shadow-card w-full rounded-[30px] p-[2px]"
        >
          <div className="bg-tertiary flex min-h-[400px] flex-col items-center justify-center rounded-[30px] px-16 py-12 gap-8">
            <img
              src={icon}
              alt="web-development"
              className="h-32 w-32 object-contain drop-shadow-2xl"
            />

            <h3 className="text-center text-[28px] font-black text-white leading-tight">
              {title}
            </h3>

            <div className="flex flex-wrap gap-3 justify-center">
              {techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className={`bg-gradient-to-r ${tech.gradient} text-white px-4 py-2 rounded-full text-sm font-semibold`}
                >
                  {tech.label}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </Tilt>
  );
};

const About = () => {
  return (
    <>
      <Header useMotion={true} {...config.sections.about} />

      {config.sections.about.content && (
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="text-secondary mt-4 max-w-3xl text-[17px] leading-[30px]"
        >
          {config.sections.about.content}
        </motion.p>
      )}

      <div className="mt-20 flex flex-wrap justify-center gap-12 max-w-7xl mx-auto">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
