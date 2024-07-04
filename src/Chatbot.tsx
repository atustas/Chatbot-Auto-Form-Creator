import React, { useState } from 'react';
import { jsPDF } from 'jspdf';

interface FormData {
  name: string;
  lastName: string;
  dateOfBirth: string;
  phoneNumber: string;
  address: string;
}

const Chatbot: React.FC = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    lastName: '',
    dateOfBirth: '',
    phoneNumber: '',
    address: ''
  });
  const [userInput, setUserInput] = useState('');
  const [showDownload, setShowDownload] = useState(false);

  const questions = [
    'What is your name?',
    'What is your last name?',
    'What is your date of birth?',
    'What is your phone number?',
    'What is your address?'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const handleNext = () => {
    const currentKey = Object.keys(formData)[step] as keyof FormData;
    setFormData(prevState => ({
      ...prevState,
      [currentKey]: userInput
    }));
    setUserInput('');
    setStep(prevStep => prevStep + 1);
    if (step === questions.length - 1) {
      setShowDownload(true);
    }
  };

  const handleDownload = () => {
    const doc = new jsPDF();
    doc.text("User Information", 10, 10);
    doc.text(`Name: ${formData.name}`, 10, 20);
    doc.text(`Last Name: ${formData.lastName}`, 10, 30);
    doc.text(`Date of Birth: ${formData.dateOfBirth}`, 10, 40);
    doc.text(`Phone Number: ${formData.phoneNumber}`, 10, 50);
    doc.text(`Address: ${formData.address}`, 10, 60);
    doc.save('user_information.pdf');
  };

  return (
    <div className="chatbot-container">
      {step < questions.length ? (
        <div>
          <h2 className="chatbot-question">{questions[step]}</h2>
          <input
            type="text"
            value={userInput}
            onChange={handleInputChange}
            className="chatbot-input"
          />
          <button onClick={handleNext} className="chatbot-button">
            Next
          </button>
        </div>
      ) : (
        <div>
          <div className="chatbot-thank-you">
            <h2>Thank you.</h2>
          </div>
          {showDownload && (
            <button onClick={handleDownload} className="chatbot-button download-button">
              Download PDF
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Chatbot;
