import { useState } from "react";
import { motion } from "framer-motion";
import { styles } from "../../constants/styles";
import { slideIn, textVariant } from "../../utils/motion";
import { SectionWrapper } from "../../hoc";
import { EarthCanvas } from "../canvas";
import emailjs from '@emailjs/browser';
import { generateProjectPDF } from "../../utils/pdfGenerator";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Initialize EmailJS
emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

interface FormData {
  projectName: string;
  websiteType: string;
  purpose: string;
  duration: string;
  estimatedFees: string;
  paymentType: string;
  name: string;
  email: string;
  phone: string;
  additionalInfo: string;
}

const BookProject = () => {
  const developerEmail = import.meta.env.VITE_DEVELOPER_EMAIL;
  const [formData, setFormData] = useState<FormData>({
    projectName: "",
    websiteType: "",
    purpose: "",
    duration: "",
    estimatedFees: "",
    paymentType: "",
    name: "",
    email: "",
    phone: "",
    additionalInfo: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const formatIndianRupees = (value: string) => {
    // Remove non-numeric characters
    const numericValue = value.replace(/[^0-9]/g, "");

    // Format with commas
    if (numericValue === "") return "";

    const lastThree = numericValue.substring(numericValue.length - 3);
    const otherNumbers = numericValue.substring(0, numericValue.length - 3);

    if (otherNumbers !== "") {
      return (
        otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + lastThree
      );
    } else {
      return lastThree;
    }
  };

  const handleFeesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatIndianRupees(e.target.value);
    setFormData({ ...formData, estimatedFees: formattedValue });
  };

  const sendProjectEmail = async (formData: FormData) => {
    try {
      // Check EmailJS configuration
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
      
      // Format the message content
      const emailContent = `
Subject: New Project Booking: ${formData.projectName}

Project Details:
---------------
Project Name: ${formData.projectName}
Website Type: ${formData.websiteType}
Purpose: ${formData.purpose}
Duration: ${formData.duration}
Estimated Fees: ₹${formData.estimatedFees}
Payment Type: ${formData.paymentType}

Client Information:
-----------------
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}

Additional Information:
---------------------
${formData.additionalInfo || 'No additional information provided'}
      `.trim();
      
      // Prepare template parameters
      const templateParams = {
        to_email: developerEmail,
        from_name: formData.name,
        from_email: formData.email,
        project_name: formData.projectName,
        website_type: formData.websiteType,
        purpose: formData.purpose,
        duration: formData.duration,
        estimated_fees: formData.estimatedFees,
        payment_type: formData.paymentType,
        phone: formData.phone,
        additional_info: formData.additionalInfo,
        message: emailContent // This will contain the full formatted message
      };

      if (!serviceId || !templateId || !publicKey) {
        throw new Error('EmailJS configuration is incomplete. Please check your environment variables.');
      }

      await emailjs.send(
        serviceId,
        templateId,
        templateParams
      );

      return true;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Email sending failed: ${error.message}`);
      }
      throw error; // Re-throw the error to handle it in the submit handler
    }
  };

  const handleGenerateAndSendPDF = async () => {
    const pdf = generateProjectPDF(formData);
    const pdfBlob = pdf.output('blob');
    
    const formDataWithFiles = new FormData();
    formDataWithFiles.append('pdf', pdfBlob, 'project_details.pdf');
    
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          to_email: developerEmail,
          from_name: formData.name,
          from_email: formData.email,
          message: "Project details PDF attached",
          attachment: formDataWithFiles
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      toast.success('PDF has been sent to the developer successfully!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      toast.error('Failed to send PDF. Please try again.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate required fields
      const requiredFields: Array<keyof FormData> = ['projectName', 'websiteType', 'purpose', 'duration', 'estimatedFees', 'paymentType', 'name', 'email', 'phone'];
      const missingFields = requiredFields.filter(field => !formData[field]);
      
      if (missingFields.length > 0) {
        throw new Error(`Please fill in all required fields: ${missingFields.join(', ')}`);
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error('Please enter a valid email address');
      }

      // Send email with project details
      await sendProjectEmail(formData);
      
      toast.success("Project booking request submitted successfully! We will contact you soon.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      setFormData({
        projectName: "",
        websiteType: "",
        purpose: "",
        duration: "",
        estimatedFees: "",
        paymentType: "",
        name: "",
        email: "",
        phone: "",
        additionalInfo: "",
      });
    } catch (error) {
      let errorMessage = "Failed to submit project booking request. ";

      if (error instanceof Error) {
        errorMessage += error.message;
      }
      
      alert(errorMessage + "\nPlease try again or contact support.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col-reverse gap-10 overflow-hidden xl:mt-12 xl:flex-row">
      <ToastContainer />
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="bg-black-100 flex-[0.75] rounded-2xl p-8"
      >
        <motion.div variants={textVariant()}>
          <p className={styles.sectionSubText}>Start Your Project</p>
          <h2 className={styles.sectionHeadText}>Book Your Project.</h2>
        </motion.div>

        <form onSubmit={handleSubmit} className="mt-12 flex flex-col gap-6">
          {/* Project Name */}
          <label className="flex flex-col">
            <span className="mb-4 font-medium text-white">Project Name</span>
            <input
              type="text"
              name="projectName"
              value={formData.projectName}
              onChange={handleChange}
              required
              placeholder="What's your project called?"
              className="bg-tertiary placeholder:text-secondary rounded-lg border-none px-6 py-4 font-medium text-white outline-none"
            />
          </label>

          {/* Website Type */}
          <label className="flex flex-col">
            <span className="mb-4 font-medium text-white">
              Type of Website
            </span>
            <select
              name="websiteType"
              value={formData.websiteType}
              onChange={handleChange}
              required
              className="bg-tertiary placeholder:text-secondary rounded-lg border-none px-6 py-4 font-medium text-white outline-none"
            >
              <option value="">Select Website Type</option>
              <option value="basic">Basic Website</option>
              <option value="professional">Professional Website</option>
              <option value="commercial">Commercial Website</option>
              <option value="ecommerce">E-Commerce Website</option>
              <option value="portfolio">Portfolio Website</option>
              <option value="blog">Blog/Content Website</option>
              <option value="custom">Custom Solution</option>
            </select>
          </label>

          {/* Purpose */}
          <label className="flex flex-col">
            <span className="mb-4 font-medium text-white">
              Purpose of Project
            </span>
            <textarea
              rows={4}
              name="purpose"
              value={formData.purpose}
              onChange={handleChange}
              required
              placeholder="Describe the purpose and goals of your project..."
              className="bg-tertiary placeholder:text-secondary rounded-lg border-none px-6 py-4 font-medium text-white outline-none"
            />
          </label>

          {/* Time Duration */}
          <label className="flex flex-col">
            <span className="mb-4 font-medium text-white">Time Duration</span>
            <select
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              required
              className="bg-tertiary placeholder:text-secondary rounded-lg border-none px-6 py-4 font-medium text-white outline-none"
            >
              <option value="">Select Duration</option>
              <option value="1week">1 Week</option>
              <option value="15days">15 Days</option>
              <option value="1month">1 Month</option>
              <option value="2months">More than 2 Months</option>
            </select>
          </label>

          {/* Estimated Fees */}
          <label className="flex flex-col">
            <span className="mb-4 font-medium text-white">
              Estimated Fees (INR)
            </span>
            <div className="relative">
              <span className="bg-tertiary absolute left-6 top-1/2 -translate-y-1/2 text-[18px] text-white">
                ₹
              </span>
              <input
                type="text"
                name="estimatedFees"
                value={formData.estimatedFees}
                onChange={handleFeesChange}
                required
                placeholder="1,00,000"
                className="bg-tertiary placeholder:text-secondary w-full rounded-lg border-none py-4 pl-12 pr-6 font-medium text-white outline-none"
              />
            </div>
            <span className="text-secondary mt-2 text-[12px]">
              Enter amount in Indian Rupees (automatically formatted)
            </span>
          </label>

          {/* Payment Type */}
          <label className="flex flex-col">
            <span className="mb-4 font-medium text-white">Payment Type</span>
            <select
              name="paymentType"
              value={formData.paymentType}
              onChange={handleChange}
              required
              className="bg-tertiary placeholder:text-secondary rounded-lg border-none px-6 py-4 font-medium text-white outline-none"
            >
              <option value="">Select Payment Type</option>
              <option value="advance">Advance Payment</option>
              <option value="full">Full Payment</option>
              <option value="milestone">Milestone Based</option>
            </select>
          </label>

          {/* Contact Information */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <label className="flex flex-col">
              <span className="mb-4 font-medium text-white">Your Name</span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your full name"
                className="bg-tertiary placeholder:text-secondary rounded-lg border-none px-6 py-4 font-medium text-white outline-none"
              />
            </label>

            <label className="flex flex-col">
              <span className="mb-4 font-medium text-white">Your Email</span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your.email@example.com"
                className="bg-tertiary placeholder:text-secondary rounded-lg border-none px-6 py-4 font-medium text-white outline-none"
              />
            </label>
          </div>

          <label className="flex flex-col">
            <span className="mb-4 font-medium text-white">Phone Number</span>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="+1 (555) 123-4567"
              className="bg-tertiary placeholder:text-secondary rounded-lg border-none px-6 py-4 font-medium text-white outline-none"
            />
          </label>

          {/* Additional Info */}
          <label className="flex flex-col">
            <span className="mb-4 font-medium text-white">
              Additional Information
            </span>
            <textarea
              rows={3}
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleChange}
              placeholder="Any specific requirements or features you need?"
              className="bg-tertiary placeholder:text-secondary rounded-lg border-none px-6 py-4 font-medium text-white outline-none"
            />
          </label>

          <div className="flex flex-col gap-4 sm:flex-row">
            <button
              type="submit"
              disabled={loading}
              className="bg-tertiary shadow-primary flex-1 rounded-xl px-8 py-3 font-bold text-white shadow-md outline-none transition-all hover:bg-[#1a1a2e]"
            >
              {loading ? "Submitting..." : "Book Your Project"}
            </button>
          </div>

          {/* Generate and Send PDF Button */}
          <div className="mt-4 flex flex-col gap-3 border-t border-gray-700 pt-6">
            <button
              type="button"
              onClick={handleGenerateAndSendPDF}
              className="bg-[#00cea8] shadow-primary rounded-xl px-8 py-3 font-bold text-white shadow-md outline-none transition-all hover:bg-[#00b894]"
            >
              📄 Save as PDF & Send to Developer
            </button>
          </div>
        </form>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="h-[350px] md:h-[550px] xl:h-auto xl:flex-1"
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(BookProject, "bookproject");
