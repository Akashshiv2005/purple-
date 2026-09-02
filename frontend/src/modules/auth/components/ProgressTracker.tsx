import React from 'react';
import { ChevronRight, Check } from 'lucide-react';

export default function ProgressTracker({ steps, currentStep, setCurrentStep }: { steps: string[], currentStep: number, setCurrentStep: (s: number) => void }) {
  return (
    <div className="bg-white p-4 rounded-2xl border border-slate-200 mb-6 shadow-sm overflow-x-auto">
      <div className="flex items-center min-w-max gap-3 text-xs font-bold text-slate-500">
        {steps.map((stepName, idx) => {
          const stepNum = idx + 1;
          const isDone = currentStep > stepNum;
          const isCurrent = currentStep === stepNum;
          return (
            <div key={stepName} className="flex items-center gap-1.5">
              <button 
                type="button" 
                onClick={() => setCurrentStep(stepNum)}
                className={`w-7 h-7 rounded-full flex items-center justify-center font-extrabold text-[11px] transition-all ${
                  isDone ? 'bg-green-600 text-white' :
                  isCurrent ? 'bg-blue-600 text-white shadow-md ring-4 ring-blue-100' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                }`}
              >
                {isDone ? <Check size={14} /> : stepNum}
              </button>
              <span className={isCurrent ? 'text-blue-600 font-black' : isDone ? 'text-slate-800 font-semibold' : ''}>{stepName}</span>
              {idx < steps.length - 1 && <ChevronRight size={14} className="text-slate-300 mx-1" />}
            </div>
          );
        })}
      </div>
    </div>
  );
}
