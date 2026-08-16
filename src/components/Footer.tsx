import React from 'react';
import { MessageCircle, Phone } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-3 border-t border-slate-800 mt-auto select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-[11px] font-medium">
        <p className="text-center sm:text-left leading-tight">
          Bản quyền thuộc về:{' '}
          <strong className="text-amber-300 font-bold">Cô giáo: Võ Thị Kim Liên</strong> — Giáo viên trường THCS Trần Quý Cáp, xã Thăng Bình, thành phố Đà Nẵng.
        </p>

        <div className="flex items-center gap-2 shrink-0">
          <a
            id="footer-zalo-link"
            href="https://zalo.me/0905602158"
            target="_blank"
            rel="noreferrer"
            className="px-3 py-1 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition shadow-2xs flex items-center gap-1.5"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Zalo: 0905602158</span>
          </a>

          <a
            id="footer-call-link"
            href="tel:0905602158"
            className="px-3 py-1 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold transition shadow-2xs flex items-center gap-1.5"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Hotline: 0905602158</span>
          </a>
        </div>
      </div>
    </footer>
  );
};
