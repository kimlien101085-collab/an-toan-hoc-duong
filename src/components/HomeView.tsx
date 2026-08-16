import React from 'react';
import {
  BookOpen,
  Bot,
  AlertTriangle,
  HeartHandshake,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Shield,
  Lightbulb,
  MessageCircleHeart,
  Share2,
  QrCode,
} from 'lucide-react';

interface HomeViewProps {
  onNavigate: (tab: string) => void;
  onOpenSOS: () => void;
  onOpenShare: () => void;
  lessonsCompletedCount: number;
  totalLessonsCount: number;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onOpenSOS,
  onOpenShare,
  lessonsCompletedCount,
  totalLessonsCount,
}) => {
  return (
    <div id="view-home" className="space-y-6 animate-in fade-in duration-300">
      {/* Exact Match Vector Hero Banner */}
      <div className="relative w-full rounded-3xl overflow-hidden shadow-sm border border-slate-200/80 bg-gradient-to-b from-sky-300 via-sky-200 to-emerald-100 min-h-[250px] sm:min-h-[300px] flex items-center justify-center p-4 sm:p-6 text-center select-none">
        <div className="w-full max-w-5xl relative flex flex-col items-center justify-center py-2 sm:py-4">
          {/* Flying Paper Airplane Vector */}
          <svg
            className="absolute left-4 sm:left-14 top-2 sm:top-4 w-12 sm:w-20 h-8 sm:h-12 text-white opacity-90 drop-shadow-xs pointer-events-none animate-pulse"
            viewBox="0 0 100 60"
            fill="currentColor"
          >
            <path d="M0 25 L90 0 L45 40 L30 30 L0 25 Z" fill="white" />
            <path d="M45 40 L90 0 L35 55 Z" fill="#cbd5e1" opacity="0.6" />
          </svg>

          {/* Typography Header */}
          <div className="relative z-10 space-y-1 sm:space-y-2 text-center w-full">
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-blue-900 drop-shadow-[0_3px_5px_rgba(255,255,255,0.9)] uppercase leading-none">
              BẠN
            </h2>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-orange-600 drop-shadow-[0_3px_5px_rgba(255,255,255,0.9)] uppercase leading-none">
              KHÔNG ĐƠN ĐỘC
            </h2>

            {/* Blue Ribbon Subtitle */}
            <div className="inline-block mx-auto mt-2 sm:mt-3 px-4 sm:px-8 py-2 rounded-2xl bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-700 text-white font-bold text-xs sm:text-sm md:text-base shadow-md">
              Chúng ta ở đây – Cùng lắng nghe – Cùng sẻ chia – Cùng mạnh mẽ ❤️
            </div>
          </div>

          {/* Signpost Tags on Left */}
          <div className="hidden md:flex flex-col gap-2 absolute left-2 top-1/2 -translate-y-1/2 items-start z-10">
            <span className="px-3.5 py-1.5 rounded-r-2xl bg-rose-500 text-white text-[11px] font-black shadow-sm flex items-center gap-1.5">
              <span>❤️</span> THẤU HIỂU
            </span>
            <span className="px-3.5 py-1.5 rounded-r-2xl bg-amber-500 text-white text-[11px] font-black shadow-sm flex items-center gap-1.5">
              <span>💬</span> CHIA SẺ
            </span>
            <span className="px-3.5 py-1.5 rounded-r-2xl bg-emerald-600 text-white text-[11px] font-black shadow-sm flex items-center gap-1.5">
              <span>👂</span> LẮNG NGHE
            </span>
          </div>

          {/* Speech Bubble Pills on Right */}
          <div className="hidden md:flex flex-col gap-2 absolute right-2 top-1/2 -translate-y-1/2 items-end z-10">
            <span className="px-3.5 py-1.5 rounded-full bg-rose-500 text-white text-[11px] font-bold shadow-sm flex items-center gap-1">
              <span>❤️</span> Bạn có giá trị
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-sky-600 text-white text-[11px] font-bold shadow-sm flex items-center gap-1">
              <span>💬</span> Bạn được lắng nghe
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-emerald-600 text-white text-[11px] font-bold shadow-sm flex items-center gap-1">
              <span>🤝</span> Bạn không đơn độc
            </span>
          </div>

          {/* Student Silhouettes Illustration */}
          <div className="absolute right-4 sm:right-12 -bottom-2 flex items-end gap-1.5 opacity-90 pointer-events-none">
            <div className="w-5 h-9 rounded-t-full bg-blue-800"></div>
            <div className="w-5 h-11 rounded-t-full bg-rose-700"></div>
            <div className="w-5 h-8 rounded-t-full bg-amber-800"></div>
            <div className="w-5 h-10 rounded-t-full bg-emerald-800"></div>
          </div>
        </div>
      </div>

      {/* Quick Action Feature Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Lessons */}
        <div
          id="home-card-lessons"
          onClick={() => onNavigate('lessons')}
          className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md hover:border-blue-300 transition cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center mb-3.5 group-hover:scale-110 transition-transform">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="font-black text-slate-900 text-base mb-1 group-hover:text-blue-600 transition-colors">
              Hệ Thống Học Liệu
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Trang bị kiến thức phòng chống bạo lực, ứng xử an toàn và kỹ năng tự vệ số.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600">
            <span>{totalLessonsCount} Bài học chuẩn</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card 2: AI Counselor */}
        <div
          id="home-card-ai"
          onClick={() => onNavigate('ai')}
          className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md hover:border-purple-300 transition cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-100 text-purple-600 flex items-center justify-center mb-3.5 group-hover:scale-110 transition-transform">
              <Bot className="w-6 h-6" />
            </div>
            <h3 className="font-black text-slate-900 text-base mb-1 group-hover:text-purple-600 transition-colors">
              Trợ Lý AI Tư Vấn
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Lắng nghe, giải đáp thắc mắc và hướng dẫn kiềm chế cảm xúc, xử lý mâu thuẫn 24/7.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-purple-600">
            <span>Gemini AI Hỗ trợ</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card 3: Report Incident */}
        <div
          id="home-card-report"
          onClick={() => onNavigate('report')}
          className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md hover:border-rose-300 transition cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-100 text-rose-600 flex items-center justify-center mb-3.5 group-hover:scale-110 transition-transform">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="font-black text-slate-900 text-base mb-1 group-hover:text-rose-600 transition-colors">
              Báo Cáo Sự Cố
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Báo cáo ẩn danh hoặc công khai nguy cơ bắt nạt, đe dọa kèm hình ảnh, video & âm thanh.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-rose-600">
            <span>Bảo mật 100%</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card 4: Safe Corner */}
        <div
          id="home-card-safe-corner"
          onClick={() => onNavigate('safe-corner')}
          className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md hover:border-emerald-300 transition cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center mb-3.5 group-hover:scale-110 transition-transform">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="font-black text-slate-900 text-base mb-1 group-hover:text-emerald-600 transition-colors">
              Góc An Toàn & Thư Giãn
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Tập thở điều hòa 4-7-8, theo dõi tâm trạng, xả stress và đọc lời khuyên tâm lý tích cực.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-600">
            <span>Giải tỏa cảm xúc</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>

      {/* Share to Students & Parents Interactive Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white rounded-3xl p-5 sm:p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 text-left">
          <div className="w-12 h-12 rounded-2xl bg-white/20 border border-white/20 text-white flex items-center justify-center shrink-0 backdrop-blur-xs">
            <QrCode className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-black text-base sm:text-lg text-white">
              Chia Sẻ Ứng Dụng Cho Học Sinh & Phụ Huynh
            </h4>
            <p className="text-xs text-blue-100 mt-0.5 max-w-xl leading-relaxed">
              Lấy đường link trực tiếp hoặc quét mã QR Code để mở ứng dụng trên điện thoại, máy tính bảng hoặc máy tính mà không cần cài đặt phức tạp.
            </p>
          </div>
        </div>

        <button
          id="btn-home-open-share"
          onClick={onOpenShare}
          className="px-5 py-3 rounded-2xl bg-white hover:bg-blue-50 text-blue-800 text-xs sm:text-sm font-black transition shadow-md flex items-center gap-2 shrink-0 cursor-pointer group"
        >
          <Share2 className="w-4 h-4 text-blue-600 group-hover:scale-110 transition-transform" />
          <span>Lấy Link & Mã QR</span>
        </button>
      </div>

      {/* 3 Golden Steps of Self Protection */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-amber-400" />
            <h3 className="font-black text-base sm:text-lg tracking-tight">
              QUY TẮC VÀNG TỰ BẢO VỆ: 3 BƯỚC ỨNG PHÓ KHẨN CẤP
            </h3>
          </div>
          <span className="text-xs font-bold text-amber-300">
            Ghi nhớ mọi lúc, mọi nơi!
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-white/10 border border-white/10 space-y-1.5 backdrop-blur-xs">
            <div className="text-amber-400 font-black text-sm flex items-center gap-1.5">
              <span>1.</span> 🧘 GIỮ BÌNH TĨNH
            </div>
            <p className="text-slate-200 leading-relaxed">
              Hít thở sâu, không khiêu khích hoặc phản ứng gay gắt. Giữ khoảng cách an toàn với đối tượng gây hấn.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/10 border border-white/10 space-y-1.5 backdrop-blur-xs">
            <div className="text-sky-300 font-black text-sm flex items-center gap-1.5">
              <span>2.</span> 🚶 THOÁT HIỂM AN TOÀN
            </div>
            <p className="text-slate-200 leading-relaxed">
              Di chuyển dứt khoát về khu vực đông người, phòng Bảo vệ, phòng Giáo viên hoặc phòng Đoàn Đội.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/10 border border-white/10 space-y-1.5 backdrop-blur-xs">
            <div className="text-emerald-300 font-black text-sm flex items-center gap-1.5">
              <span>3.</span> 🚨 BÁO CÁO NGAY
            </div>
            <p className="text-slate-200 leading-relaxed">
              Bấm nút SOS trên ứng dụng, gọi Tổng đài 111 hoặc chia sẻ với Thầy Cô, Cha Mẹ để nhận trợ giúp kịp thời.
            </p>
          </div>
        </div>
      </div>

      {/* Emergency Hotlines Strip */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-left">
          <div className="w-10 h-10 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center shrink-0">
            <PhoneCall className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-slate-900">
              Đường dây nóng khẩn cấp 24/7
            </h4>
            <p className="text-xs text-slate-500">
              Miễn cước cuộc gọi – Bảo vệ học sinh mọi lúc mọi nơi
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <a
            href="tel:111"
            className="px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold transition flex items-center gap-1.5 border border-rose-200"
          >
            <span>📞 111</span> (Tổng đài Trẻ em)
          </a>
          <a
            href="tel:113"
            className="px-3.5 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold transition flex items-center gap-1.5 border border-blue-200"
          >
            <span>📞 113</span> (Công an)
          </a>
          <a
            href="tel:0905602158"
            className="px-3.5 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-bold transition flex items-center gap-1.5 border border-purple-200"
          >
            <span>📞 0905602158</span> (Trường học)
          </a>
          <button
            onClick={onOpenSOS}
            className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-black transition shadow-xs flex items-center gap-1.5"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            Cửa Sổ SOS
          </button>
        </div>
      </div>
    </div>
  );
};
