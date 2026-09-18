import React, { useEffect, useState } from 'react';
import { ImagePlus, Video, X } from 'lucide-react';

interface MediaUploadFieldsProps {
  imageUrl: string;
  videoUrl?: string;
  onImageChange: (url: string) => void;
  onVideoChange: (url: string) => void;
}

const fileToDataUrl = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

export const MediaUploadFields: React.FC<MediaUploadFieldsProps> = ({
  imageUrl,
  videoUrl = '',
  onImageChange,
  onVideoChange,
}) => {
  const [imagePreview, setImagePreview] = useState(imageUrl);
  const [videoPreview, setVideoPreview] = useState(videoUrl);

  useEffect(() => setImagePreview(imageUrl), [imageUrl]);
  useEffect(() => setVideoPreview(videoUrl), [videoUrl]);

  const handleImage = async (file?: File) => {
    if (!file || !file.type.startsWith('image/')) return;
    const url = await fileToDataUrl(file);
    setImagePreview(url);
    onImageChange(url);
  };

  const handleVideo = async (file?: File) => {
    if (!file || !file.type.startsWith('video/')) return;
    const url = await fileToDataUrl(file);
    setVideoPreview(url);
    onVideoChange(url);
  };

  return (
    <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="rounded-xl border border-white/10 bg-[#171B20] p-4">
        <label className="mb-2 flex items-center gap-2 text-xs font-semibold text-gray-300">
          <ImagePlus className="h-4 w-4 text-[#32B83F]" /> Product Image
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => void handleImage(e.target.files?.[0])}
          className="w-full text-xs text-gray-300 file:mr-3 file:rounded-lg file:border-0 file:bg-[#32B83F] file:px-3 file:py-2 file:text-xs file:font-bold file:text-white"
        />
        {imagePreview && (
          <div className="relative mt-3 h-32 overflow-hidden rounded-lg bg-white p-2">
            <img src={imagePreview} alt="Product preview" className="h-full w-full object-contain" />
            <button type="button" onClick={() => { setImagePreview(''); onImageChange(''); }} className="absolute right-2 top-2 rounded-full bg-black/70 p-1 text-white" aria-label="Remove image">
              <X className="h-3 w-3" />
            </button>
          </div>
        )}
      </div>

      <div className="rounded-xl border border-white/10 bg-[#171B20] p-4">
        <label className="mb-2 flex items-center gap-2 text-xs font-semibold text-gray-300">
          <Video className="h-4 w-4 text-[#32B83F]" /> Product Video (Optional)
        </label>
        <input
          type="file"
          accept="video/mp4,video/webm,video/ogg,video/quicktime"
          onChange={(e) => void handleVideo(e.target.files?.[0])}
          className="w-full text-xs text-gray-300 file:mr-3 file:rounded-lg file:border-0 file:bg-[#32B83F] file:px-3 file:py-2 file:text-xs file:font-bold file:text-white"
        />
        {videoPreview && (
          <div className="relative mt-3 overflow-hidden rounded-lg bg-black">
            <video src={videoPreview} controls playsInline className="max-h-32 w-full" />
            <button type="button" onClick={() => { setVideoPreview(''); onVideoChange(''); }} className="absolute right-2 top-2 rounded-full bg-black/70 p-1 text-white" aria-label="Remove video">
              <X className="h-3 w-3" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
