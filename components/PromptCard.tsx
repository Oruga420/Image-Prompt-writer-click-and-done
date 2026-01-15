
import React, { useState } from 'react';
import { GeneratedPrompt } from '../types';

interface PromptCardProps {
  prompt: GeneratedPrompt;
  onDelete: (id: string) => void;
}

const PromptCard: React.FC<PromptCardProps> = ({ prompt, onDelete }) => {
  const [copyState, setCopyState] = useState<'none' | 'espanglish' | 'chinese'>('none');

  const handleCopy = (text: string, type: 'espanglish' | 'chinese') => {
    navigator.clipboard.writeText(text);
    setCopyState(type);
    setTimeout(() => setCopyState('none'), 2000);
  };

  return (
    <div className="bg-white border-2 border-slate-100 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 group relative">
      <div className="flex justify-between items-start mb-6">
        <div className="flex-1 pr-10">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Idea Vision</h3>
          <p className="text-slate-900 font-serif text-lg italic">
            "{prompt.originalIdea}"
          </p>
        </div>
        <button 
          onClick={() => onDelete(prompt.id)}
          className="text-slate-200 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50"
          title="Delete Scroll"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div className="space-y-4">
        {/* Espanglish Version */}
        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 relative">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Version: Espanglish</h3>
            <button 
              onClick={() => handleCopy(prompt.espanglishPrompt, 'espanglish')}
              className={`text-[10px] font-bold px-3 py-1 rounded-full transition-all ${
                copyState === 'espanglish' ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-600 hover:bg-slate-900 hover:text-white'
              }`}
            >
              {copyState === 'espanglish' ? 'COPIED' : 'COPY'}
            </button>
          </div>
          <p className="text-slate-700 font-serif text-lg leading-relaxed">
            {prompt.espanglishPrompt}
          </p>
        </div>

        {/* Chinese Version */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 relative">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Version: Chino (Weighted)</h3>
            <button 
              onClick={() => handleCopy(prompt.chinesePrompt, 'chinese')}
              className={`text-[10px] font-bold px-3 py-1 rounded-full transition-all ${
                copyState === 'chinese' ? 'bg-emerald-500 text-white' : 'bg-white/20 text-white/60 hover:bg-white hover:text-black'
              }`}
            >
              {copyState === 'chinese' ? 'COPIED' : 'COPY'}
            </button>
          </div>
          <p className="text-white font-serif text-xl md:text-2xl leading-relaxed">
            {prompt.chinesePrompt}
          </p>
        </div>
      </div>
      
      <div className="mt-4 text-[9px] font-bold text-slate-400 tracking-tighter uppercase text-right">
        Created at {new Date(prompt.timestamp).toLocaleTimeString()}
      </div>
    </div>
  );
};

export default PromptCard;
