
import React from 'react';

interface InsightCardProps {
  title: string;
  children: React.ReactNode;
}

export const InsightCard: React.FC<InsightCardProps> = ({ title, children }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 h-full">
      <h3 className="text-xl font-bold text-slate-900 mb-4 border-b pb-2 border-slate-200">{title}</h3>
      <div>{children}</div>
    </div>
  );
};
