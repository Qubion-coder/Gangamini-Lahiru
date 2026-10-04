import React, { useState } from 'react';
import { Check, Link2, MessageCircle } from 'lucide-react';

export default function Admin() {
  const prefixes = ['Mr.', 'Mrs.', 'Miss', 'Mr. & Mrs.', 'Family', 'Dear'];
  const [prefix, setPrefix] = useState('Mr.');
  const [guestName, setGuestName] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  const [generatedMessage, setGeneratedMessage] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);

  const getDisplayName = (p: string, name: string) => {
    const trimmedName = name.trim();
    if (!trimmedName) return '';
    if (p === 'Family') return `${trimmedName} and Family`;
    if (p === 'Dear') return trimmedName; 
    return `${p} ${trimmedName}`;
  };

  const generate = () => {
    if (!guestName.trim()) return;
    const displayName = getDisplayName(prefix, guestName);
    
    const urlName = encodeURIComponent(displayName);
    const link = `${window.location.origin}/${urlName}`;
    setGeneratedLink(link);

    const msg = `Dear ${displayName} ❤️\n\nWith joyful hearts, we warmly invite you to celebrate one of the most special days of our lives as we begin our journey together.\n\nPlease view our wedding invitation and all the event details through the link below 🌐:\n\n${link}\n\nYour presence would truly mean the world to us, and we would be honored to celebrate this beautiful moment together.\n\nWith love,\n❤️ Lahiru & Gangamini`;

    setGeneratedMessage(msg);
    setCopiedLink(false);
    setCopiedMessage(false);
  };

  const copyLink = () => {
    if (!generatedLink) return;
    navigator.clipboard.writeText(generatedLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const copyMessage = () => {
    if (!generatedMessage) return;
    navigator.clipboard.writeText(generatedMessage);
    setCopiedMessage(true);
    setTimeout(() => setCopiedMessage(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#F9F6F0] text-zinc-800 p-4 md:p-6 flex flex-col items-center">
      <div className="w-full max-w-xl bg-white/70 backdrop-blur-md rounded-[2rem] shadow-xl p-6 md:p-10 space-y-8 border border-white mt-4 md:mt-12">
        <h1 className="serif text-3xl md:text-4xl text-[#4A3C1A] text-center font-medium">Link Generator</h1>
        
        <div className="space-y-5">
          <div>
            <label className="block text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold text-zinc-500 mb-2 ml-2">
              Select Prefix
            </label>
            <select
              value={prefix}
              onChange={(e) => setPrefix(e.target.value)}
              className="w-full bg-white/80 px-4 py-3 md:py-4 rounded-xl border border-zinc-200/80 focus:ring-2 focus:ring-[#C9A66B]/30 focus:border-[#C9A66B]/50 outline-none transition-all duration-300 appearance-none font-serif text-lg shadow-inner text-zinc-700 cursor-pointer"
            >
              {prefixes.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          
          <div>
            <label className="block text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold text-zinc-500 mb-2 ml-2">
              Guest Name
            </label>
            <input
              type="text"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              placeholder="e.g. Sanjaya"
              className="w-full bg-white/80 px-4 py-3 md:py-4 rounded-xl border border-zinc-200/80 focus:ring-2 focus:ring-[#C9A66B]/30 focus:border-[#C9A66B]/50 outline-none transition-all duration-300 font-serif text-lg shadow-inner text-zinc-700"
            />
          </div>
          
          <button
            onClick={generate}
            disabled={!guestName.trim()}
            className="w-full bg-zinc-800 text-white py-4 md:py-5 rounded-full font-sans tracking-[0.3em] font-bold text-[10px] md:text-[11px] uppercase hover:bg-zinc-900 transition-all duration-300 shadow-lg active:scale-[0.98] mt-4 disabled:opacity-50"
          >
            Generate Link
          </button>
        </div>

        {generatedLink && (
          <div className="space-y-6 pt-8 border-t border-zinc-200/50">
            <div className="space-y-2">
              <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-500 ml-2">Generated Link</label>
              <div className="bg-white/90 p-4 rounded-xl break-all text-xs md:text-sm font-medium border border-zinc-200 text-zinc-600 shadow-inner">
                {generatedLink}
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-500 ml-2">Message Preview</label>
              <div className="bg-white/90 p-5 rounded-[1.5rem] text-sm whitespace-pre-wrap border border-zinc-200 font-serif leading-relaxed text-zinc-700 shadow-inner italic">
                {generatedMessage}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={copyLink}
                className="flex items-center justify-center gap-2 py-4 rounded-full border-2 border-[#9C8470] text-[#9C8470] font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-[#9C8470] hover:text-white transition-colors active:scale-[0.98]"
              >
                {copiedLink ? <Check size={16} /> : <Link2 size={16} />}
                {copiedLink ? 'Copied!' : 'Copy Link Only'}
              </button>
              <button
                onClick={copyMessage}
                className="flex items-center justify-center gap-2 py-4 rounded-full bg-[#9C8470] text-white font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-[#836d5b] transition-colors shadow-md active:scale-[0.98]"
              >
                {copiedMessage ? <Check size={16} /> : <MessageCircle size={16} />}
                {copiedMessage ? 'Copied!' : 'Copy Full Message'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
