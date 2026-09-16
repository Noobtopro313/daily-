import React, { useState } from 'react';
import { X, Sparkles, Wand2, Image as ImageIcon, Upload, Download, Copy, Check, Loader2, RefreshCw } from 'lucide-react';
import { Product } from '../types';

interface ImageStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
}

export const ImageStudioModal: React.FC<ImageStudioModalProps> = ({
  isOpen,
  onClose,
  products,
}) => {
  const [activeTab, setActiveTab] = useState<'create' | 'edit'>('create');
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [caption, setCaption] = useState<string>('');
  const [modelUsed, setModelUsed] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Edit mode state
  const [inputImageBase64, setInputImageBase64] = useState<string | null>(null);

  if (!isOpen) return null;

  const quickPromptsCreate = [
    'Matte black wireless earbuds pro in glowing charging capsule on obsidian pedestal',
    'Titanium smartwatch with emerald green AMOLED chronograph dial',
    'Custom mechanical keyboard with dual-tone keycaps and neon desk setup',
    'Minimalist magnetic fast wireless charging dock with smartphone and watch',
  ];

  const quickPromptsEdit = [
    'Add an electric green neon rim-light and studio back-glow',
    'Place this product on a sleek futuristic cyber desk in a Tokyo penthouse',
    'Add realistic water splash droplet effects for IPX8 waterproof demonstration',
    'Transform the background into a clean minimalist Scandinavian wood desk',
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setInputImageBase64(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSelectProductForEdit = (prod: Product) => {
    // If product image is an external link, load it onto an off-screen canvas to get base64
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width || 400;
      canvas.height = img.height || 400;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        try {
          const dataUrl = canvas.toDataURL('image/jpeg');
          setInputImageBase64(dataUrl);
        } catch {
          setInputImageBase64(prod.image);
        }
      }
    };
    img.onerror = () => {
      setInputImageBase64(prod.image);
    };
    img.src = prod.image;
  };

  const handleRunAiImage = async () => {
    if (!prompt.trim() || isGenerating) return;

    if (activeTab === 'edit' && !inputImageBase64) {
      setErrorMsg('Please upload or select an image to edit first.');
      return;
    }

    setIsGenerating(true);
    setErrorMsg(null);
    setGeneratedImageUrl(null);

    try {
      const res = await fetch('/api/ai/image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          inputImage: activeTab === 'edit' ? inputImageBase64 : undefined,
          mode: activeTab,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || data.details || 'Failed to generate image');
      }

      setGeneratedImageUrl(data.imageUrl);
      setModelUsed(data.modelUsed || 'gemini-3.1-flash-image-preview');
      setCaption(data.caption || '');
    } catch (err: any) {
      console.error('AI Image Generation error:', err);
      setErrorMsg(err.message || 'Image generation failed. Verify GEMINI_API_KEY is configured.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyLink = () => {
    if (!generatedImageUrl) return;
    navigator.clipboard.writeText(generatedImageUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!generatedImageUrl) return;
    const link = document.createElement('a');
    link.href = generatedImageUrl;
    link.download = `nexora-ai-${activeTab}-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-3 sm:p-6 flex items-center justify-center bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-[#121519] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col text-white max-h-[92vh]">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-white/10 bg-[#171B20] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#32B83F] to-[#208a2b] flex items-center justify-center shadow-lg shadow-[#32B83F]/20">
              <Sparkles className="w-5 h-5 text-white animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm text-white">AI Visual Creator &amp; Studio</h3>
                <span className="text-[10px] bg-[#32B83F]/20 text-[#32B83F] px-2 py-0.5 rounded font-mono font-bold">
                  gemini-3.1-flash-image-preview
                </span>
              </div>
              <p className="text-[11px] text-gray-400">
                Generate high-resolution product photography or edit existing gadget visuals
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Toggle */}
        <div className="flex border-b border-white/10 bg-[#14181D] text-xs font-semibold">
          <button
            onClick={() => {
              setActiveTab('create');
              setErrorMsg(null);
            }}
            className={`flex-1 py-3 px-4 flex items-center justify-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'create'
                ? 'border-[#32B83F] text-white bg-white/5'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <Wand2 className="w-4 h-4" />
            <span>Create New Image</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('edit');
              setErrorMsg(null);
            }}
            className={`flex-1 py-3 px-4 flex items-center justify-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'edit'
                ? 'border-[#32B83F] text-white bg-white/5'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Edit Existing Image</span>
          </button>
        </div>

        {/* Main Content */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1">
          {/* Edit Mode: Source Image Picker */}
          {activeTab === 'edit' && (
            <div className="p-3.5 bg-[#171B20] border border-white/5 rounded-xl space-y-2.5">
              <span className="text-xs font-bold text-gray-300 block">
                1. Select or Upload Image to Edit:
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                {/* Upload custom image */}
                <label className="flex flex-col items-center justify-center p-4 border border-dashed border-white/20 hover:border-[#32B83F] rounded-xl cursor-pointer bg-[#0E1114] hover:bg-[#14181D] transition-colors text-center">
                  <Upload className="w-6 h-6 text-[#32B83F] mb-1" />
                  <span className="text-xs font-semibold text-white">Upload from Device</span>
                  <span className="text-[10px] text-gray-400">PNG, JPG or WebP</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>

                {/* Selected Image Preview */}
                <div className="h-28 rounded-xl bg-[#0E1114] border border-white/10 flex items-center justify-center overflow-hidden p-2 relative">
                  {inputImageBase64 ? (
                    <img
                      src={inputImageBase64}
                      alt="Selected preview"
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <span className="text-xs text-gray-500">No image chosen yet</span>
                  )}
                </div>
              </div>

              {/* Or Pick from Store Products */}
              <div>
                <span className="text-[11px] text-gray-400 block mb-1.5 font-medium">
                  Or pick a gadget from store catalog:
                </span>
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {products.slice(0, 6).map((prod) => (
                    <button
                      key={prod.id}
                      type="button"
                      onClick={() => handleSelectProductForEdit(prod)}
                      className="flex-shrink-0 flex items-center gap-1.5 p-1.5 bg-[#0E1114] hover:bg-[#202732] border border-white/10 rounded-lg text-left transition-colors cursor-pointer"
                    >
                      <img
                        src={prod.image}
                        alt={prod.name}
                        referrerPolicy="no-referrer"
                        className="w-7 h-7 object-contain bg-white rounded p-0.5"
                      />
                      <span className="text-[11px] text-gray-200 truncate max-w-[90px]">
                        {prod.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Prompt Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-300 flex items-center justify-between">
              <span>{activeTab === 'create' ? 'Visual Description / Text Prompt:' : 'Editing Instructions:'}</span>
              <span className="text-[10px] text-gray-400">Powered by Gemini Visual Synthesis</span>
            </label>

            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={3}
              placeholder={
                activeTab === 'create'
                  ? 'Describe the product, materials, lighting, background (e.g. Matte obsidian headphones with emerald LED on a floating stand)...'
                  : 'Describe the modification (e.g. Add glowing emerald neon aura, change background to a high-tech lab)...'
              }
              className="w-full p-3 rounded-xl bg-[#0E1114] border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#32B83F] resize-none"
            />
          </div>

          {/* Quick Prompts */}
          <div className="space-y-1.5">
            <span className="text-[11px] text-gray-400 font-semibold block">Quick Prompt Suggestions:</span>
            <div className="flex flex-wrap gap-1.5">
              {(activeTab === 'create' ? quickPromptsCreate : quickPromptsEdit).map((qp, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setPrompt(qp)}
                  className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-[11px] text-gray-300 border border-white/5 transition-colors text-left cursor-pointer"
                >
                  {qp}
                </button>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <button
            type="button"
            onClick={handleRunAiImage}
            disabled={isGenerating || !prompt.trim()}
            className="w-full py-3 rounded-xl bg-[#32B83F] hover:bg-[#27A936] text-white font-bold text-xs tracking-wide shadow-lg shadow-[#32B83F]/25 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Synthesizing with gemini-3.1-flash-image-preview...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>{activeTab === 'create' ? 'Generate Product Visual' : 'Apply AI Edit'}</span>
              </>
            )}
          </button>

          {/* Error Message */}
          {errorMsg && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-400 text-xs flex items-center justify-between">
              <span>{errorMsg}</span>
              <button
                onClick={() => setErrorMsg(null)}
                className="text-rose-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Result Showcase */}
          {generatedImageUrl && (
            <div className="p-4 bg-[#171B20] border border-white/10 rounded-xl space-y-3 animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-[#32B83F] flex items-center gap-1.5">
                  <Check className="w-4 h-4" />
                  Generated via {modelUsed}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyLink}
                    className="p-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-gray-300 hover:text-white transition-colors cursor-pointer"
                    title="Copy image link"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-[#32B83F]" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    onClick={handleDownload}
                    className="p-1.5 bg-[#32B83F]/20 hover:bg-[#32B83F]/30 text-[#32B83F] rounded-lg transition-colors cursor-pointer flex items-center gap-1 text-[11px] font-bold px-2.5"
                    title="Download image"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </button>
                </div>
              </div>

              <div className="w-full aspect-square max-h-[340px] bg-black rounded-xl overflow-hidden border border-white/10 flex items-center justify-center">
                <img
                  src={generatedImageUrl}
                  alt="Generated AI tech visual"
                  className="w-full h-full object-contain"
                />
              </div>

              {caption && (
                <p className="text-[11px] text-gray-400 italic bg-[#0B0D0F] p-2.5 rounded-lg border border-white/5">
                  {caption}
                </p>
              )}
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-3 bg-[#0B0D0F] border-t border-white/10 flex items-center justify-between text-xs text-gray-500">
          <span>High-fidelity visual generation powered by Google Gemini</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-white/5 hover:bg-white/10 text-gray-300 rounded-lg text-xs transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
