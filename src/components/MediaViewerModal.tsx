import React from 'react';
import { EvidenceItem } from '../types';
import { X, Download, FileText, Image, Video, Music } from 'lucide-react';

interface MediaViewerModalProps {
  evidence: EvidenceItem | null;
  onClose: () => void;
}

export const MediaViewerModal: React.FC<MediaViewerModalProps> = ({
  evidence,
  onClose,
}) => {
  if (!evidence) return null;

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = evidence.url;
    a.download = evidence.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div id="evidence-view-modal" className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-3xl w-full p-5 space-y-4 shadow-2xl relative max-h-[90vh] flex flex-col border border-slate-200 animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 pr-8">
          <div className="flex items-center gap-2 truncate">
            {evidence.type === 'image' && <Image className="w-5 h-5 text-blue-600 shrink-0" />}
            {evidence.type === 'video' && <Video className="w-5 h-5 text-purple-600 shrink-0" />}
            {evidence.type === 'audio' && <Music className="w-5 h-5 text-emerald-600 shrink-0" />}
            {evidence.type === 'file' && <FileText className="w-5 h-5 text-amber-600 shrink-0" />}
            <h3 className="text-sm font-bold text-slate-900 truncate">
              {evidence.name}
            </h3>
          </div>

          <button
            id="btn-close-media-modal"
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 font-bold text-lg w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Media Preview Container */}
        <div className="flex-1 overflow-auto flex items-center justify-center p-3 bg-slate-950/5 rounded-2xl min-h-[250px]">
          {evidence.type === 'image' && (
            <img
              src={evidence.url}
              alt={evidence.name}
              className="max-h-[60vh] max-w-full rounded-xl object-contain shadow-md"
            />
          )}

          {evidence.type === 'video' && (
            <video
              src={evidence.url}
              controls
              autoPlay
              className="max-h-[60vh] w-full rounded-xl shadow-md bg-black"
            />
          )}

          {evidence.type === 'audio' && (
            <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-sm border border-slate-200 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                <Music className="w-8 h-8 animate-bounce" />
              </div>
              <p className="text-xs font-bold text-slate-700">{evidence.name}</p>
              <audio src={evidence.url} controls className="w-full" />
            </div>
          )}

          {evidence.type === 'file' && (
            <div className="text-center p-8 bg-white rounded-2xl border border-slate-200 space-y-3 shadow-xs">
              <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
                <FileText className="w-8 h-8" />
              </div>
              <p className="text-sm font-bold text-slate-800">{evidence.name}</p>
              <p className="text-xs text-slate-500">Tài liệu đính kèm phục vụ xác minh và xử lý vụ việc.</p>
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
          <button
            id="btn-download-media"
            onClick={handleDownload}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition shadow-xs flex items-center gap-1.5"
          >
            <Download className="w-4 h-4" />
            Tải tập tin về máy
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
