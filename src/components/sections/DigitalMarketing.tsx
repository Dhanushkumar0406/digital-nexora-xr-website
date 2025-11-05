import { motion } from "framer-motion";
import { fadeIn, textVariant } from "../../utils/motion";
import { Header } from "../atoms/Header";
import { config } from "../../constants/config";
import { SectionWrapper } from "../../hoc";

const marketingServices = [
  {
    title: "Analytics & Insights",
    description: "Real-time data tracking and visualization using modern analytics tools for data-driven decisions.",
    icon: "📊",
  },
  {
    title: "Email Marketing",
    description: "Automated email campaigns with personalization and A/B testing for optimal engagement.",
    icon: "📧",
  },
  {
    title: "PPC Advertising",
    description: "Pay-per-click campaign management across Google Ads, Facebook Ads, and other platforms.",
    icon: "💰",
  },
  {
    title: "Analytics & Insights",
    description: "Real-time data tracking and visualization using modern analytics tools for data-driven decisions.",
    icon: "📊",
  },
  {
    title: "Email Marketing",
    description: "Automated email campaigns with personalization and A/B testing for optimal engagement.",
    icon: "📧",
  },
  {
    title: "PPC Advertising",
    description: "Pay-per-click campaign management across Google Ads, Facebook Ads, and other platforms.",
    icon: "💰",
  },
];

const ServiceCard: React.FC<{
  index: number;
  title: string;
  description: string;
  icon: string;
}> = ({ index, title, description, icon }) => (
  <motion.div
    variants={fadeIn("up", "spring", index * 0.1, 0.75)}
    className="bg-tertiary w-full rounded-[20px] p-[1px] shadow-card"
  >
    <div className="bg-tertiary flex min-h-[280px] flex-col items-start justify-start rounded-[20px] px-8 py-5">
      <div className="mb-4 flex items-center justify-center text-4xl">
        {icon}
      </div>
      <h3 className="text-[24px] font-bold text-white">{title}</h3>
      <p className="text-secondary mt-3 text-[14px] leading-[22px]">
        {description}
      </p>
    </div>
  </motion.div>
);

const DigitalMarketing = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <Header useMotion={false} {...config.sections.digitalMarketing} />
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="text-secondary mt-4 max-w-3xl text-[17px] leading-[30px]"
      >
        {config.sections.digitalMarketing.content}
      </motion.p>

      <div className="mt-20 grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
        {marketingServices.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(DigitalMarketing, "digitalmarketing");
