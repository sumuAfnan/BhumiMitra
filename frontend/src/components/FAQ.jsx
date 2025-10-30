import React, { useState } from "react";
import { addQuestion } from "../api/citizenApi";
const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [question, setQuestion] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  

  const faqs = [
    {
      question: "How can I register in BhumiMitra?",
      answer:
        "You can register using your Full Name, NID Number, Email, Username, Password, and Mobile Number.",
    },
    {
      question: "How can I reset my password?",
      answer:
        "Click on 'Forgot Password' and follow the steps sent to your email.",
    },
    {
      question: "How can I transfer land ownership?",
      answer:
        "Submit a transfer request with required documents, which will be verified by an officer.",
    },
    {
      question: "How do I check my application status?",
      answer: "Login to your account and go to 'My Applications' section.",
    },
  ];

  const toggleFAQ = (index) => {

    setOpenIndex(openIndex === index ? null : index);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (question.trim() !== "") {
    try {
      await addQuestion(question);
      setSuccessMessage("Your question has been submitted successfully!");
      setQuestion("");
      setTimeout(() => setSuccessMessage(""), 1000); 
    } catch (error) {
      console.error("Error submitting question:", error);
      setSuccessMessage("Failed to submit question. Please try again.");
      setTimeout(() => setSuccessMessage(""), 1000);
    }
  }
};

  return (
    <section className="py-7 bg-white mt-[0px] md:mt-[4px] lg:mt-[30px] mb-[50px] font-fn">
      <div className="relative max-w-[1104px] mx-auto  px-4 sm:px-6 md:px-8">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          
          {/* FAQ part */}
          <div>
            <p className="text-green-600 font-semibold mt-2 mb-6 text-2xl">Frequently Asked Questions</p>
           
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className=" border-gray-300 bg-[#A0C878]">
                  <button
                    className="w-full flex justify-between items-center p-4 text-left font-medium"
                    onClick={() => toggleFAQ(index)}
                  >
                    <span>{faq.question}</span>
                    <span
                      className={`transform transition-transform duration-200 ${
                        openIndex === index ? "rotate-180" : ""
                      }`}
                    >
                      ▼
                    </span>
                  </button>
                  {openIndex === index && (
                    <div className="px-4 pb-4 text-gray-600">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Submit question form */}
          <div className="border border-[#A0C878] rounded-sm shadow-md bg-white mt-[40px] md:mt-[200px] lg:mt-[200px]">
            <div className="bg-[#A0C878] text-white p-4 rounded-[2px] font-semibold text-center">
              Do you have any questions?
            </div>
            <form className="p-4 space-y-4" onSubmit={handleSubmit}>
              <textarea
                className="w-full border bg-green-50 border-[#A0C878] rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                rows="4"
                placeholder="Type your question here..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />

            {/* ====  Success message Part start here ===== */}

              {successMessage && (
              <div className="text-gray-500 text-sm font-normal">
              {successMessage}
               </div>
              )}
              

              {/* ====  Success message Part End here ===== */}
              <button
                type="submit"
                className="mt-4 bg-[#A0C878] text-white px-6 py-2 rounded-md hover:bg-green-600"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;