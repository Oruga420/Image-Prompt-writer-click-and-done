
import React, { useState, useEffect, useCallback } from 'react';
import { GeneratedPrompt, Customizations, INK_STYLES } from './types';
import { generateArtPrompts } from './services/geminiService';
import PromptCard from './components/PromptCard';

const AI_CHOOSE = "✨ AI Choose | AI 决定";

const PARAM_OPTIONS = {
  lighting: [AI_CHOOSE, "Golden Hour", "Cinematic Lighting", "Volumetric Fog", "Neon Glow", "Soft Box", "Hard Shadow", "Cyberpunk Night"],
  angle: [AI_CHOOSE, "Extreme Close-up", "Low Angle Hero Shot", "Bird's Eye View", "Dutch Angle", "Symmetry View", "Dynamic Action"],
  composition: [AI_CHOOSE, "Rule of Thirds", "Center Balanced", "Leading Lines", "Golden Ratio", "Minimalist Empty", "Crowded Detail"],
  atmosphere: [AI_CHOOSE, "Epic & Grand", "Mysterious Fog", "Cheerful Bright", "Dark & Moody", "Dreamy Pastel", "Gritty Realism"],
  technique: [AI_CHOOSE, "Digital Painting", "Masterpiece Quality", "Hyper-detailed", "Brush Strokes", "Ray Tracing", "Film Grain"],
  color: [AI_CHOOSE, "Vibrant Palette", "Monochrome Noir", "Pastel Colors", "Neon Acid", "Earth Tones", "Complementary Contrast"],
  dynamic: [AI_CHOOSE, "High Speed Action", "Frozen in Time", "Flowing Motion", "Statuesque Pose", "Floating Elements"],
  paper: [AI_CHOOSE, "Canvas Texture", "Glossy Photo", "Matte Finish", "Grainy Film", "Digital Screen", "Vintage Paper"],
  focus: [AI_CHOOSE, "Deep Depth of Field", "F1.8 Bokeh", "Tilt-shift", "Sharp Focus", "Soft Dreamy Glow"],
  detail: [AI_CHOOSE, "8K Resolution", "Masterpiece", "Trending on ArtStation", "Highly Detailed", "Intricate Patterns"]
};

const App: React.FC = () => {
  const [idea, setIdea] = useState('');
  const [selectedStyle, setSelectedStyle] = useState(INK_STYLES[0]);
  const [customs, setCustoms] = useState<Customizations>({
    lighting: AI_CHOOSE, angle: AI_CHOOSE, composition: AI_CHOOSE, atmosphere: AI_CHOOSE,
    technique: AI_CHOOSE, color: AI_CHOOSE, dynamic: AI_CHOOSE, paper: AI_CHOOSE,
    focus: AI_CHOOSE, detail: AI_CHOOSE
  });
  const [loading, setLoading] = useState(false);
  const [prompts, setPrompts] = useState<GeneratedPrompt[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showStyleGrid, setShowStyleGrid] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('art-prompts-v4');
    if (saved) setPrompts(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('art-prompts-v4', JSON.stringify(prompts));
  }, [prompts]);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!idea.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const promptPairs = await generateArtPrompts(idea, selectedStyle, customs);
      const newPrompts: GeneratedPrompt[] = promptPairs.map(pair => ({
        id: crypto.randomUUID(),
        originalIdea: idea,
        espanglishPrompt: pair.espanglish,
        chinesePrompt: pair.chinese,
        timestamp: Date.now(),
      }));
      setPrompts(prev => [...newPrompts, ...prev]);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateCustom = (key: keyof Customizations, val: string) => {
    setCustoms(prev => ({ ...prev, [key]: val }));
  };

  return (
    <div className="min-h-screen pb-20 text-slate-900 selection:bg-slate-900 selection:text-white">
      <header className="bg-slate-900 text-white py-12 px-4 shadow-2xl mb-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-2 italic">ULTIMATE ART <span className="text-sm font-sans font-black bg-emerald-500 text-slate-900 px-2 py-0.5 rounded ml-2 uppercase">Multiverse</span></h1>
            <p className="text-slate-400 font-light tracking-widest uppercase text-xs">AI Prompt Architect | Anime • Realism • Oil • Photo</p>
          </div>
          <button 
            onClick={() => setShowStyleGrid(!showStyleGrid)}
            className={`px-8 py-4 border rounded-2xl transition-all font-black text-sm uppercase tracking-widest shadow-lg ${
              selectedStyle === AI_CHOOSE 
                ? 'bg-emerald-500 text-slate-900 border-emerald-400 hover:bg-emerald-400' 
                : 'bg-white text-slate-900 hover:bg-slate-100 border-white'
            }`}
          >
            {selectedStyle.split(' | ')[0]} · Cambiar Estilo
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          {showStyleGrid && (
            <div className="bg-white rounded-3xl p-8 shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-200">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-2xl text-slate-900 tracking-tight">Select Art Style | 选择艺术风格</h3>
                <button onClick={() => setShowStyleGrid(false)} className="text-slate-400 hover:text-black font-black uppercase text-xs p-2">Close</button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                {INK_STYLES.map(s => (
                  <button
                    key={s}
                    onClick={() => { setSelectedStyle(s); setShowStyleGrid(false); }}
                    className={`py-3 px-4 rounded-xl text-xs font-bold text-left transition-all border ${
                      selectedStyle === s 
                        ? 'bg-slate-900 text-white border-slate-900 shadow-xl scale-95' 
                        : s === AI_CHOOSE 
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100' 
                          : 'bg-slate-50 border-slate-100 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8">
            <form onSubmit={handleGenerate} className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
                {Object.entries(PARAM_OPTIONS).map(([key, options]) => (
                  <div key={key}>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
                      {key}
                    </label>
                    <select
                      value={customs[key as keyof Customizations]}
                      onChange={(e) => updateCustom(key as keyof Customizations, e.target.value)}
                      className={`w-full border rounded-xl px-3 py-2 text-sm font-bold focus:ring-4 focus:ring-emerald-500/20 outline-none transition-all ${
                        customs[key as keyof Customizations] === AI_CHOOSE 
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                          : 'bg-slate-50 text-slate-900 border-slate-200'
                      }`}
                    >
                      {options.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Creative Vision | Tu Idea</label>
                <textarea
                  value={idea}
                  onChange={(e) => setIdea(e.target.value)}
                  placeholder="Ej: A futuristic city floating in the clouds, award winning photography, vibrant neon colors..."
                  className="w-full h-40 px-6 py-5 bg-slate-50 border-2 border-slate-100 rounded-3xl focus:border-emerald-500 transition-all outline-none text-2xl font-medium resize-none text-slate-900"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-20 bg-slate-900 text-white rounded-3xl font-black text-2xl hover:bg-black transition-all disabled:bg-slate-300 flex items-center justify-center gap-4 shadow-2xl transform hover:scale-[1.02] active:scale-100 group"
              >
                {loading ? (
                  <span className="flex items-center gap-3 animate-pulse">
                    <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                    ENGINEERING MASTERPIECE...
                  </span>
                ) : (
                  <>
                    <span className="group-hover:rotate-12 transition-transform">🎨</span> 
                    GENERATE 4 MULTIVERSE PROMPTS
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="space-y-8">
            <div className="flex justify-between items-center px-4">
              <h2 className="text-3xl font-bold text-slate-900 tracking-tighter italic underline decoration-emerald-500 decoration-4">History | 历史</h2>
              {prompts.length > 0 && (
                <button onClick={() => setPrompts([])} className="text-xs font-black text-slate-400 hover:text-red-500 uppercase tracking-widest bg-white px-4 py-2 rounded-full border border-slate-100 shadow-sm transition-all">
                  Wipe All
                </button>
              )}
            </div>
            <div className="grid gap-8">
              {prompts.map(p => <PromptCard key={p.id} prompt={p} onDelete={(id) => setPrompts(prev => prev.filter(x => x.id !== id))} />)}
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900 text-white rounded-[2rem] p-10 shadow-2xl sticky top-8 border border-white/10">
            <div className="inline-block bg-emerald-500 text-slate-900 text-[10px] font-black px-3 py-1 rounded-full mb-6 tracking-widest uppercase">
              Pro Engine Status
            </div>
            <h3 className="text-3xl font-bold mb-8 border-b border-white/10 pb-6 italic flex items-center gap-3">
              Live Config
            </h3>
            <div className="space-y-5 text-sm">
              <div className="flex justify-between items-center border-b border-white/5 pb-3">
                <span className="text-slate-500 uppercase text-[10px] font-black tracking-widest">Global Style</span>
                <span className={`font-bold px-3 py-1 rounded-lg ${selectedStyle === AI_CHOOSE ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/5 text-white'}`}>
                  {selectedStyle.split(' | ')[0]}
                </span>
              </div>
              {Object.entries(customs).map(([k, v]) => (
                <div key={k} className="flex justify-between border-b border-white/5 pb-3 items-center">
                   <span className="text-slate-500 uppercase text-[10px] font-black tracking-widest">{k}</span>
                   <span className={`font-bold text-xs ${v === AI_CHOOSE ? 'text-emerald-400 italic' : 'text-slate-300'}`}>
                     {(v as string).split(' | ')[0]}
                   </span>
                </div>
              ))}
            </div>
            <div className="mt-12 p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
              <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
                The AI will automatically switch between <span className="text-emerald-400 font-bold">Espanglish</span> (for creative flow) and <span className="text-white font-bold">Chinese</span> (for weighted tag precision) to give you the best possible results for Midjourney & SD.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
