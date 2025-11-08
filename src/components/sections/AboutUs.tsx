import React from "react";
import { motion } from "framer-motion";
import { teamMembers } from "../../constants";
import { SectionWrapper } from "../../hoc";
import { fadeIn, textVariant } from "../../utils/motion";
import type { TTeamMember } from "../../types";

interface ITeamMemberCard {
  member: TTeamMember;
  index: number;
}

const TeamMemberCard: React.FC<ITeamMemberCard> = ({ member, index }) => {
  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.3, 0.75)}
      className="w-full max-w-md mx-auto"
    >
      <div className="team-card-glass p-8 flex flex-col items-center gap-6 min-h-[480px]">
        {/* Diamond Glow Ring Container */}
        <div className="relative">
          <div className="diamond-glow-ring" aria-hidden="true"></div>
          <img
            src={member.image}
            alt={member.name}
            className="team-profile-image"
            loading="lazy"
          />
        </div>

        {/* Member Details */}
        <div className="flex flex-col items-center gap-3 text-center flex-1">
          <h3 className="text-white text-2xl font-bold tracking-wide text-glow-aqua">
            {member.name}
          </h3>

          <p className="text-cyan-400 text-sm font-semibold uppercase tracking-wider">
            {member.degree}
          </p>

          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>

          <p className="text-gold-400 text-lg font-semibold text-glow-gold">
            {member.role}
          </p>

          <p className="text-gray-300 text-base font-medium mt-2">
            {member.specialization}
          </p>
        </div>

        {/* Decorative Accent */}
        <div className="flex gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span>
          <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse delay-150"></span>
          <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse delay-300"></span>
        </div>
      </div>
    </motion.div>
  );
};

const AboutUs = () => {
  return (
    <div className="luxury-gradient-bg py-20 px-4 relative">
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div variants={textVariant()} className="text-center mb-16">
          <p className="text-secondary text-[14px] uppercase tracking-wider sm:text-[18px]">
            Meet The Team
          </p>
          <h2 className="text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px] text-glow-aqua mt-2">
            ABOUT US
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto mt-6 text-base sm:text-lg leading-relaxed">
            We build full-stack 3D websites and transform them into powerful
            digital marketing platforms
          </p>
        </motion.div>

        {/* Team Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 max-w-5xl mx-auto">
          {teamMembers.map((member, index) => (
            <TeamMemberCard key={member.name} member={member} index={index} />
          ))}
        </div>

        {/* Decorative Elements - Bokeh Particles */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gold-400/10 rounded-full blur-3xl animate-pulse delay-150"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-300"></div>
      </div>
    </div>
  );
};

export default SectionWrapper(AboutUs, "aboutus");
