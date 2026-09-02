import React from 'react';
import Link from 'next/link';

export default function RegisterHeader({ currentStep, steps }: { currentStep: number, steps: string[] }) {
  return (
    <header className="bg-white border-b border-slate-200 py-4 px-6 sticky top-0 z-40 shadow-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-2xl font-black text-slate-900">
          <span className="text-blue-600">Biz</span><span className="text-orange-500">Dial</span>
          <span className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-extrabold uppercase ml-2 border border-blue-200">Enterprise Onboarding</span>
        </Link>
        <div className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
          Step <span className="text-blue-600 font-black">{currentStep}</span> of 10: <span className="text-slate-900 font-extrabold">{steps[currentStep - 1]}</span>
        </div>
      </div>
    </header>
  );
}
