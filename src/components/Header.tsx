import React, { useState } from 'react';
import { UserRole } from '../types';
import {
  ShieldAlert,
  Home,
  BookOpen,
  Bot,
  AlertTriangle,
  HeartHandshake,
  ShieldCheck,
  ChevronDown,
  Lock,
  LogOut,
  Menu,
  X,
  PhoneCall,
  Share2,
} from 'lucide-react';

interface HeaderProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  currentUserRole: UserRole;
  onChangeUserRole: (role: UserRole) => void;
  isAdminLoggedIn: boolean;
  onOpenAdminLogin: () => void;
  onAdminLogout: () => void;
  onOpenSOS: () => void;
  onOpenShare: () => void;
  unreadReportsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  currentUserRole,
  onChangeUserRole,
  isAdminLoggedIn,
  onOpenAdminLogin,
  onAdminLogout,
  onOpenSOS,
  onOpenShare,
  unreadReportsCount,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getRoleDisplayName = (role: UserRole) => {
    switch (role) {
      case 'student':
        return { name: 'Em Nam (HS 8A)', badge: 'ST', roleText: 'HỌC SINH', color: 'bg-blue-600' };
      case 'teacher':
        return { name: 'Cô Lê Thị B (GV 8A)', badge: 'GV', roleText: 'GIÁO VIÊN', color: 'bg-emerald-600' };
      case 'admin':
        return { name: 'Admin / BGH Nhà Trường', badge: 'AD', roleText: 'BAN GIÁM HIỆU', color: 'bg-purple-600' };
    }
  };

  const currentRoleInfo = getRoleDisplayName(currentUserRole);

  const navItems = [
    { id: 'home', label: 'Trang chủ', icon: Home },
    { id: 'lessons', label: 'Học liệu', icon: BookOpen },
    { id: 'ai', label: 'Hỏi AI', icon: Bot },
    { id: 'report', label: 'Báo cáo', icon: AlertTriangle },
    { id: 'safe-corner', label: 'Góc an toàn', icon: HeartHandshake },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2">
        {/* Logo Brand */}
        <div
          id="brand-logo-btn"
          onClick={() => onSelectTab('home')}
          className="flex items-center gap-3 cursor-pointer group select-none shrink-0"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-blue-700 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform shrink-0">
            <ShieldAlert className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-black text-base sm:text-lg tracking-tight text-slate-900 leading-tight flex items-center gap-1.5">
              AN TOÀN HỌC ĐƯỜNG
            </h1>
            <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
              Cùng học • Cùng chia sẻ • Cùng bảo vệ
            </p>
          </div>
        </div>

        {/* Desktop Navigation Tabs */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-100/80 p-1 rounded-2xl border border-slate-200/60">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => onSelectTab(item.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? 'text-blue-700 bg-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-blue-600' : 'text-slate-500'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}

          {/* Admin Management Tab */}
          <button
            id="nav-admin"
            onClick={() => {
              if (isAdminLoggedIn || currentUserRole === 'admin') {
                onSelectTab('admin');
              } else {
                onOpenAdminLogin();
              }
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              currentTab === 'admin'
                ? 'text-purple-800 bg-purple-100 shadow-xs'
                : 'text-purple-700 hover:bg-purple-50'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
            <span>Tiếp nhận báo cáo</span>
            {unreadReportsCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-rose-600 text-white text-[9px] font-black flex items-center justify-center">
                {unreadReportsCount}
              </span>
            )}
            {!isAdminLoggedIn && currentUserRole !== 'admin' && (
              <Lock className="w-3 h-3 text-purple-400 ml-0.5" />
            )}
          </button>
        </nav>

        {/* Right Status Utilities */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Share & QR Code Button */}
          <button
            id="btn-header-share"
            onClick={onOpenShare}
            title="Chia sẻ link & Mã QR cho học sinh"
            className="px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200/80 text-blue-700 text-xs font-bold transition shadow-2xs flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <Share2 className="w-3.5 h-3.5 text-blue-600" />
            <span className="hidden sm:inline">Chia sẻ</span>
          </button>

          {/* Quick SOS Trigger Button */}
          <button
            id="btn-header-sos"
            onClick={onOpenSOS}
            className="px-3 py-1.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-100 text-xs font-black flex items-center gap-1.5 transition shadow-2xs cursor-pointer shrink-0"
          >
            <PhoneCall className="w-3.5 h-3.5 text-rose-600 animate-pulse" />
            <span className="hidden sm:inline">SOS</span>
          </button>

          {/* Admin Login Button if not logged in */}
          {!isAdminLoggedIn && currentUserRole !== 'admin' ? (
            <button
              id="btn-header-admin-login"
              onClick={onOpenAdminLogin}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 border border-purple-200/80 text-purple-700 text-xs font-bold transition shadow-2xs cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5 text-purple-600" />
              <span>Đăng nhập Admin</span>
            </button>
          ) : (
            <button
              id="btn-header-admin-logout"
              onClick={onAdminLogout}
              title="Đăng xuất quyền Quản trị"
              className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-purple-100 text-purple-800 hover:bg-rose-100 hover:text-rose-800 text-xs font-bold transition shadow-2xs cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-purple-700" />
              <span>Admin</span>
              <LogOut className="w-3 h-3 ml-1" />
            </button>
          )}

          {/* User Role Switcher Pill */}
          <div className="relative flex items-center gap-2 bg-slate-100 hover:bg-slate-200/70 p-1.5 pr-2.5 rounded-2xl border border-slate-200/80 transition cursor-pointer">
            <div
              className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl ${currentRoleInfo.color} text-white font-black text-xs flex items-center justify-center shrink-0 shadow-2xs`}
            >
              {currentRoleInfo.badge}
            </div>
            <div className="text-left hidden md:block">
              <div className="text-xs font-bold text-slate-800 leading-tight truncate max-w-[120px]">
                {currentRoleInfo.name}
              </div>
              <div className="text-[9px] font-black text-slate-500 uppercase tracking-wider">
                {currentRoleInfo.roleText}
              </div>
            </div>
            <select
              id="header-user-role-select"
              value={currentUserRole}
              onChange={(e) => onChangeUserRole(e.target.value as UserRole)}
              className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
              title="Chuyển đổi vai trò người dùng"
            >
              <option value="student">🎓 Học sinh (Em Nam - 8A)</option>
              <option value="teacher">👩‍🏫 Giáo viên (Cô Lê Thị B)</option>
              <option value="admin">⚙️ Admin / Ban Giám Hiệu</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-500 hidden md:block shrink-0" />
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-3 space-y-1 shadow-lg animate-in slide-in-from-top-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full px-3 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2.5 ${
                  isActive
                    ? 'text-blue-700 bg-blue-50'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}

          <button
            onClick={() => {
              onOpenShare();
              setIsMobileMenuOpen(false);
            }}
            className="w-full px-3 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2.5 text-blue-700 hover:bg-blue-50"
          >
            <Share2 className="w-4 h-4 text-blue-600" />
            <span>Chia sẻ link & Mã QR cho học sinh</span>
          </button>

          <button
            onClick={() => {
              if (isAdminLoggedIn || currentUserRole === 'admin') {
                onSelectTab('admin');
              } else {
                onOpenAdminLogin();
              }
              setIsMobileMenuOpen(false);
            }}
            className={`w-full px-3 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-between ${
              currentTab === 'admin'
                ? 'text-purple-800 bg-purple-100'
                : 'text-purple-700 hover:bg-purple-50'
            }`}
          >
            <span className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4" />
              <span>Tiếp nhận báo cáo (BGH)</span>
            </span>
            {!isAdminLoggedIn && currentUserRole !== 'admin' && (
              <span className="text-[10px] bg-purple-200/80 px-2 py-0.5 rounded-md font-bold">
                Đăng nhập
              </span>
            )}
          </button>
        </div>
      )}
    </header>
  );
};
