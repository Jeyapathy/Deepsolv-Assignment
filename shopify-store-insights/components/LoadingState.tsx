
import React, { useState, useEffect } from 'react';

const messages = [
  'Initializing analysis...',
  'Fetching product catalog from the store...',
  'Scanning homepage for hero products...',
  'Reading through policies and legal documents...',
  'Extracting brand information and contacts...',
  'Finding social media presence...',
  'Compiling insights with Gemini AI...',
  'Finalizing the report...',
];

export const LoadingState: React.FC = () => {
  const [message, setMessage] = useState(messages[0]);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % messages.length;
      setMessage(messages[index]);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-8 text-center p-8 bg-white rounded-lg shadow-md max-w-2xl mx-auto">
        <div className="flex justify-center items-center mb-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
        <p className="text-lg font-semibold text-slate-700">Analysis in Progress</p>
        <p className="text-slate-500 mt-2 transition-opacity duration-500">{message}</p>
    </div>
  );
};
