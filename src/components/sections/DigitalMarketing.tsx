import { motion } from "framer-motion";
import { fadeIn, textVariant } from "../../utils/motion";
import { Header } from "../atoms/Header";
import { config } from "../../constants/config";
import { SectionWrapper } from "../../hoc";
import { 
  BarChart4, 
  Mail, 
  CreditCard, 
  Search, 
  Share2, 
  LineChart 
} from 'lucide-react';

const marketingServices = [
  {
    title: "Analytics & Reporting",
    description: "Advanced data analytics and reporting solutions to drive strategic business decisions.",
    Icon: BarChart4,
  },
  {
    title: "Email Marketing",
    description: "Strategic email campaigns with personalization and performance tracking.",
    Icon: Mail,
  },
  {
    title: "Paid Advertising",
    description: "Strategic PPC management across major platforms for optimal ROI.",
    Icon: CreditCard,
  },
  {
    title: "SEO Optimization",
    description: "Data-driven SEO strategies to improve visibility and organic traffic.",
    Icon: Search,
  },
  {
    title: "Social Media",
    description: "Comprehensive social media management and engagement strategies.",
    Icon: Share2,
  },
  {
    title: "Performance Tracking",
    description: "Real-time performance monitoring and conversion optimization.",
    Icon: LineChart,
  },
];

const ServiceCard: React.FC<{
  index: number;
  title: string;
  description: string;
  Icon: React.ElementType;
}> = ({ index, title, description, Icon }) => (
  <motion.div
    variants={fadeIn("up", "spring", index * 0.1, 0.75)}
    className="w-full rounded-[20px] bg-tertiary/30 backdrop-blur-sm p-[1px] shadow-sm"
  >
    <div className="flex min-h-[280px] flex-col items-start justify-start rounded-[20px] px-8 py-5">
      <div className="mb-4 flex items-center justify-center">
        <Icon className="w-8 h-8 text-cyan-400" />
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
        Transform your digital presence with our comprehensive marketing solutions. We combine data-driven strategies with industry expertise to deliver measurable results and sustainable growth for your business.
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
