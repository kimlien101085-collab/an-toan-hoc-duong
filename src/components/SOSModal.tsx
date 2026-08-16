import React from 'react';
import { Phone, AlertOctagon, X, ShieldAlert, FileText, ExternalLink } from 'lucide-react';

interface SOSModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToReport: () => void;
}

export const SOSModal: React.FC<SOSModalProps> = ({
  isOpen,
  onClose,
  onNavigateToReport,
}) => {
  if (!isOpen) return null;

  return (
    <div id="sos-modal" className="fixed inset-0 z-50 bg-slate-900/75 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl relative text-center border border-slate-200 animate-in fade-in zoom-in duration-200 max-h-[92vh] overflow-y-auto">
        <button
          id="btn-close-sos-modal"
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 font-bold text-lg w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center transition"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Siren Icon */}
        <div className="w-16 h-16 rounded-3xl bg-rose-50 border border-rose-200 flex items-center justify-center mx-auto text-rose-600 shadow-sm animate-pulse">
          <ShieldAlert className="w-9 h-9" />
        </div>

        {/* Title & Subtitle */}
        <div className="space-y-1">
          <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center justify-center gap-2">
            TRỢ GIÚP KHẨN CẤP (SOS)
          </h3>
          <p className="text-xs text-slate-500 font-medium leading-relaxed px-2">
            Nếu em đang gặp nguy hiểm hoặc bị đe dọa, hãy tìm đến nơi an toàn gần nhất có người lớn hoặc sử dụng các kênh liên hệ trực tiếp dưới đây ngay lập tức!
          </p>
        </div>

        {/* Primary Action Buttons */}
        <div className="space-y-2.5 pt-1">
          <a
            id="sos-call-school-btn"
            href="tel:0905602158"
            className="w-full py-3.5 bg-rose-600 hover:bg-rose-700 text-white font-black text-xs sm:text-sm rounded-2xl transition shadow-md shadow-rose-600/30 flex items-center justify-center gap-2"
          >
            <Phone className="w-4 h-4 animate-bounce" />
            <span>GỌI HỖ TRỢ TRƯỜNG HỌC: 0905602158</span>
          </a>

          <button
            id="sos-goto-report-btn"
            onClick={() => {
              onClose();
              onNavigateToReport();
            }}
            className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-black text-xs sm:text-sm rounded-2xl transition shadow-md flex items-center justify-center gap-2"
          >
            <FileText className="w-4 h-4 text-amber-400" />
            <span>GỬI BÁO CÁO KHẨN CẤP ONLINE</span>
          </button>
        </div>

        {/* Emergency Hotlines List */}
        <div className="pt-2 text-left space-y-2">
          <div className="text-[11px] font-black uppercase text-slate-400 tracking-wider">
            CÁC ĐẦU SỐ TỔNG ĐÀI KHẨN CẤP QUỐC GIA (MIỄN PHÍ):
          </div>

          <div className="p-3 rounded-2xl bg-rose-50/60 border border-rose-100 flex items-center justify-between text-xs hover:bg-rose-50 transition">
            <span className="font-bold text-slate-700 flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-rose-600" />
              Tổng đài Trẻ em Quốc gia:
            </span>
            <a href="tel:111" className="font-black text-rose-700 hover:underline px-2.5 py-1 bg-white rounded-lg shadow-2xs border border-rose-200 flex items-center gap-1">
              111 <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="p-3 rounded-2xl bg-blue-50/60 border border-blue-100 flex items-center justify-between text-xs hover:bg-blue-50 transition">
            <span className="font-bold text-slate-700 flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-blue-600" />
              Cảnh sát phản ứng nhanh:
            </span>
            <a href="tel:113" className="font-black text-blue-700 hover:underline px-2.5 py-1 bg-white rounded-lg shadow-2xs border border-blue-200 flex items-center gap-1">
              113 <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="p-3 rounded-2xl bg-emerald-50/60 border border-emerald-100 flex items-center justify-between text-xs hover:bg-emerald-50 transition">
            <span className="font-bold text-slate-700 flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-emerald-600" />
              Cấp cứu Y tế:
            </span>
            <a href="tel:115" className="font-black text-emerald-700 hover:underline px-2.5 py-1 bg-white rounded-lg shadow-2xs border border-emerald-200 flex items-center gap-1">
              115 <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Close Button */}
        <button
          id="btn-dismiss-sos-modal"
          onClick={onClose}
          className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-2xl transition"
        >
          Đóng cửa sổ SOS
        </button>
      </div>
    </div>
  );
};
