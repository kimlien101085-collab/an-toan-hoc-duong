import React, { useState } from 'react';
import {
  Share2,
  Copy,
  Check,
  QrCode,
  X,
  Smartphone,
  MessageCircle,
  ExternalLink,
  Download,
  Users,
  ShieldAlert,
} from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  onShowToast,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);

  if (!isOpen) return null;

  // Compute live URL or use fallback
  const currentUrl =
    typeof window !== 'undefined' && window.location.href.startsWith('http')
      ? window.location.origin
      : 'https://ais-pre-ya2fibxfzuapvgrddgu22p-883336425207.asia-east1.run.app';

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=350x350&data=${encodeURIComponent(
    currentUrl
  )}&margin=12`;

  const sampleZaloMessage = `📢 THÔNG BÁO VỀ ỨNG DỤNG AN TOÀN HỌC ĐƯỜNG - TRƯỜNG THCS TRẦN QUÝ CÁP
Kính gửi Quý Thầy Cô, Quý Phụ huynh và các em Học sinh,
Nhà trường xin trân trọng giới thiệu Ứng dụng "AN TOÀN HỌC ĐƯỜNG":
👉 Đường link truy cập: ${currentUrl}
✨ Tính năng nổi bật:
1. 12 Bài học kỹ năng phòng chống bạo lực học đường & bài tập tương tác.
2. Trợ lý AI tư vấn tâm lý, kiềm chế cảm xúc 24/7.
3. Hộp thư báo cáo sự cố ẩn danh bảo mật 100%.
4. Nút bấm khẩn cấp SOS kết nối Tổng đài 111 & Ban Giám Hiệu.
5. Góc An toàn & bài tập thở thư giãn 4-7-8.

Các em học sinh hãy lưu link hoặc thêm ra màn hình chính điện thoại để sử dụng khi cần thiết nhé! ❤️`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopiedLink(true);
    onShowToast('Đã sao chép đường link ứng dụng! 📋');
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(sampleZaloMessage);
    setCopiedMessage(true);
    onShowToast('Đã sao chép mẫu tin nhắn Zalo hoàn chỉnh! 📨');
    setTimeout(() => setCopiedMessage(false), 2500);
  };

  const handleDownloadQr = () => {
    window.open(qrCodeUrl, '_blank');
    onShowToast('Đang tải hình ảnh mã QR về máy...');
  };

  return (
    <div
      id="share-app-modal"
      className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in"
    >
      <div className="bg-white rounded-3xl max-w-2xl w-full p-5 sm:p-8 space-y-6 shadow-2xl border border-slate-200 relative my-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-tight">
                Chia Sẻ Ứng Dụng Cho Học Sinh & Phụ Huynh
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Trường THCS Trần Quý Cáp • An Toàn Học Đường
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-rose-100 text-slate-500 hover:text-rose-600 flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="space-y-5">
          {/* Option 1: Direct Link Copy */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
            <label className="text-xs font-black uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
              <span>🔗</span> Đường dẫn trực tiếp (Mở trên mọi thiết bị: Điện thoại, Máy tính, Tablet)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={currentUrl}
                className="flex-1 bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-mono text-slate-800 focus:outline-none select-all"
              />
              <button
                id="btn-copy-app-link"
                onClick={handleCopyLink}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 shadow-xs cursor-pointer ${
                  copiedLink
                    ? 'bg-emerald-600 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {copiedLink ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Đã chép</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Sao chép link</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Option 2: QR Code for Easy Mobile Scan */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-50/70 to-indigo-50/50 border border-blue-200/60 flex flex-col sm:flex-row items-center gap-5">
            <div className="bg-white p-2.5 rounded-2xl border border-blue-200 shadow-sm shrink-0 text-center">
              <img
                src={qrCodeUrl}
                alt="Mã QR ứng dụng An toàn học đường"
                className="w-36 h-36 sm:w-40 sm:h-40 rounded-lg object-contain mx-auto"
                referrerPolicy="no-referrer"
              />
              <span className="text-[10px] font-bold text-slate-400 mt-1 block">
                Quét bằng Camera hoặc Zalo
              </span>
            </div>

            <div className="space-y-2.5 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-1.5 text-blue-900 font-black text-sm">
                <QrCode className="w-4 h-4 text-blue-600" />
                <span>Mã QR Dành Cho Chiếu Lớp Học & Bảng Tin</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Thầy Cô có thể chiếu mã QR này lên máy chiếu trong các tiết sinh hoạt lớp, tiết GDCD, hoặc in ra dán ở bảng tin lớp học để học sinh dùng điện thoại quét vào học ngay!
              </p>
              <button
                onClick={handleDownloadQr}
                className="px-4 py-2 rounded-xl bg-white hover:bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold transition shadow-2xs inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Tải ảnh mã QR về máy</span>
              </button>
            </div>
          </div>

          {/* Option 3: Pre-written Message for Zalo/Facebook Groups */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                Mẫu tin nhắn gửi vào nhóm Zalo Lớp / Phụ huynh
              </span>
              <button
                id="btn-copy-zalo-message"
                onClick={handleCopyMessage}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
                  copiedMessage
                    ? 'bg-emerald-600 text-white'
                    : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200'
                }`}
              >
                {copiedMessage ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedMessage ? 'Đã sao chép' : 'Sao chép văn bản'}</span>
              </button>
            </div>

            <textarea
              readOnly
              value={sampleZaloMessage}
              rows={4}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3 text-xs text-slate-700 leading-relaxed focus:outline-none resize-none font-medium"
            />
          </div>

          {/* User Guide for Students: Add to Home Screen (PWA style) */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-amber-900 text-xs space-y-1.5">
            <div className="font-bold flex items-center gap-1.5">
              <Smartphone className="w-4 h-4 text-amber-600" />
              <span>Mẹo cài đặt ra màn hình chính điện thoại (Không cần tải App Store/CH Play):</span>
            </div>
            <p className="text-slate-700 leading-relaxed">
              • <strong>Trên iPhone/iPad (Safari):</strong> Bấm nút <strong>Chia sẻ (biểu tượng mũi tên hướng lên)</strong> ➔ Chọn <strong>"Thêm vào màn hình chính" (Add to Home Screen)</strong>.<br />
              • <strong>Trên Android (Chrome/Cốc Cốc):</strong> Bấm dấu <strong>3 chấm ở góc trên</strong> ➔ Chọn <strong>"Thêm vào màn hình chính" (Add to Home screen)</strong>.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition cursor-pointer"
          >
            Đóng cửa sổ
          </button>
        </div>
      </div>
    </div>
  );
};
