import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: "Node.js is not installed",
    answer: "The script checks if Node.js is installed. If not, you'll need to install it manually from nodejs.org or use a version manager like nvm (Mac/Linux) or nvm-windows."
  },
  {
    question: "Permission denied error",
    answer: "On Mac/Linux, if you get a 'permission denied' error when running the script, try running 'chmod +x setup-myproject.sh' to make it executable."
  },
  {
    question: "Script won't run on Mac",
    answer: "MacOS might block the script because it's from an unidentified developer. You can allow it in System Settings > Privacy & Security, or run it via Terminal directly with 'bash filename.sh'."
  },
  {
    question: "npm install fails",
    answer: "Check your internet connection. If specific packages fail, you might need to clear your npm cache with 'npm cache clean --force' or try installing them manually."
  },
  {
    question: "How do I open the project in Cursor?",
    answer: "After the script finishes, it will give you instructions. Usually, you can just run 'cursor .' in the terminal from within the new project folder if you have the Cursor CLI installed."
  }
];

const Troubleshooting: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="w-full max-w-4xl mx-auto mt-12 mb-12">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <HelpCircle className="w-6 h-6 text-blue-500" />
        Troubleshooting
      </h2>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 divide-y divide-gray-100">
        {faqs.map((faq, index) => (
          <div key={index} className="group">
            <button
              className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors focus:outline-none"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <span className="font-medium text-gray-700">{faq.question}</span>
              {openIndex === index ? (
                <ChevronUp className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              )}
            </button>
            {openIndex === index && (
              <div className="px-6 pb-4 text-gray-600 text-sm leading-relaxed animate-in fade-in slide-in-from-top-1 duration-200">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Troubleshooting;

