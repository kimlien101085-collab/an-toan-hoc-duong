import React, { useState, useEffect } from 'react';
import { UserRole, Lesson, IncidentReport, EvidenceItem, ReportStatus } from './types';
import { INITIAL_LESSONS } from './data/lessonsData';
import { supabase } from './utils/supabase';
import { Header } from './components/Header';
import { HomeView } from './components/HomeView';
import { LessonsView } from './components/LessonsView';
import { AIChatView } from './components/AIChatView';
import { ReportView } from './components/ReportView';
import { SafeCornerView } from './components/SafeCornerView';
import { AdminView } from './components/AdminView';
import { AdminLoginModal } from './components/AdminLoginModal';
import { SOSModal } from './components/SOSModal';
import { MediaViewerModal } from './components/MediaViewerModal';
import { ShareModal } from './components/ShareModal';
import { Footer } from './components/Footer';
import { ShieldAlert, AlertOctagon, X, Check, CloudCheck, Cloud } from 'lucide-react';

const STORAGE_LESSONS_KEY = 'antoan_hocduong_lessons_v2';
const STORAGE_REPORTS_KEY = 'antoan_hocduong_reports_v1';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [currentUserRole, setCurrentUserRole] = useState<UserRole>('student');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);

  // Lessons State with Local Storage persistence & multi-question sync
  const [lessons, setLessons] = useState<Lesson[]>(() => {
    const saved = localStorage.getItem(STORAGE_LESSONS_KEY);
    if (saved) {
      try {
        const parsed: Lesson[] = JSON.parse(saved);
        // Merge with INITIAL_LESSONS to ensure new question types are always present
        return INITIAL_LESSONS.map((initL) => {
          const found = parsed.find((p) => p.id === initL.id);
          if (found) {
            return {
              ...initL,
              material: found.material || initL.material,
              completed: found.completed || false,
            };
          }
          return initL;
        });
      } catch (e) {
        return INITIAL_LESSONS;
      }
    }
    return INITIAL_LESSONS;
  });

  // Incident Reports State with Sample Data & Local Storage
  const [reports, setReports] = useState<IncidentReport[]>(() => {
    const saved = localStorage.getItem(STORAGE_REPORTS_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // Fallback
      }
    }
    return [
      {
        id: 'rep_sample_1',
        isAnonymous: true,
        authorName: 'Báo cáo ẩn danh',
        authorClass: '',
        location: 'Nhà xe Block B (Góc khuất phía sau cây bàng)',
        severity: 'sos',
        severityLabel: '🚨 NGUY CẤP - SOS!',
        desc: 'Em thấy 2 bạn nam lớp 9C đang dồn một bạn lớp 7A vào góc nhà xe, chửi bới và ép đưa tiền ăn sáng mỗi ngày.',
        evidences: [
          {
            id: 'ev_1',
            type: 'image',
            name: 'Hien_truong_nha_xe.png',
            url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="350" viewBox="0 0 600 350"><rect width="600" height="350" fill="%23f1f5f9"/><rect x="20" y="20" width="560" height="310" rx="16" fill="%23e2e8f0"/><text x="300" y="170" font-family="sans-serif" font-weight="bold" font-size="22" fill="%23334155" text-anchor="middle">MINH CHỨNG HIỆN TRƯỜNG NHÀ XE</text><text x="300" y="205" font-family="sans-serif" font-size="14" fill="%2364748b" text-anchor="middle">Trường THCS Trần Quý Cáp</text></svg>',
            size: '0.4 MB',
          },
        ],
        timestamp: '10:15 - 15/08/2026',
        status: 'pending',
        adminNotes: '',
      },
      {
        id: 'rep_sample_2',
        isAnonymous: false,
        authorName: 'Trần Thị Mỹ Duyên',
        authorClass: '8B',
        location: 'Không gian mạng (Nhóm Zalo kín khối 8)',
        severity: 'high',
        severityLabel: '🟠 Cảnh báo cao',
        desc: 'Có một nhóm lập nick ảo chế ảnh dìm hàng và đăng tải thông tin bôi nhọ danh dự bạn H lớp 8B khiến bạn rất hoảng sợ và khóc nhiều.',
        evidences: [],
        timestamp: '14:30 - 14/08/2026',
        status: 'processing',
        adminNotes: 'Cô chủ nhiệm 8B đã liên hệ Ban Giám Hiệu và phụ huynh hai bên để hòa giải và gỡ ảnh.',
      },
    ];
  });

  // Modals state
  const [isAdminLoginModalOpen, setIsAdminLoginModalOpen] = useState(false);
  const [isSOSModalOpen, setIsSOSModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [viewingEvidence, setViewingEvidence] = useState<EvidenceItem | null>(null);

  // Floating SOS button visibility toggle
  const [isSOSButtonVisible, setIsSOSButtonVisible] = useState(true);

  // Toast Notification banner
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isSupabaseConnected, setIsSupabaseConnected] = useState<boolean>(false);

  // Sync / Fetch initial reports from Supabase if table exists
  useEffect(() => {
    async function syncSupabaseData() {
      try {
        const { data, error } = await supabase
          .from('reports')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error && data && data.length > 0) {
          setIsSupabaseConnected(true);
          const mappedReports: IncidentReport[] = data.map((item: any) => ({
            id: item.id?.toString() || item.report_code || `rep_${Date.now()}`,
            isAnonymous: item.is_anonymous ?? true,
            authorName: item.is_anonymous ? 'Báo cáo ẩn danh' : item.reporter_name || 'Học sinh',
            authorClass: item.reporter_class || '',
            location: item.location || '',
            severity: (item.urgency === 'critical' ? 'sos' : item.urgency || 'medium') as any,
            severityLabel:
              item.urgency === 'critical' || item.urgency === 'sos'
                ? '🚨 NGUY CẤP - SOS!'
                : item.urgency === 'high'
                ? '🟠 Cảnh báo cao'
                : '🟡 Cần hỗ trợ',
            desc: item.description || item.title || '',
            evidences: item.evidences || [],
            timestamp: item.created_at
              ? new Date(item.created_at).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) +
                ' - ' +
                new Date(item.created_at).toLocaleDateString('vi-VN')
              : new Date().toLocaleDateString('vi-VN'),
            status: item.status || 'pending',
            adminNotes: item.admin_notes || '',
            resolvedAt: item.resolved_at,
          }));

          setReports(mappedReports);
        }
      } catch (err) {
        console.info('Supabase cloud connection initialized with local fallback:', err);
      }
    }

    syncSupabaseData();
  }, []);

  // Save to LocalStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_LESSONS_KEY, JSON.stringify(lessons));
  }, [lessons]);

  useEffect(() => {
    localStorage.setItem(STORAGE_REPORTS_KEY, JSON.stringify(reports));
  }, [reports]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 4500);
  };

  // Role switching
  const handleRoleChange = (role: UserRole) => {
    setCurrentUserRole(role);
    if (role === 'admin') {
      setIsAdminLoggedIn(true);
      showToast('Đã kích hoạt chế độ Quản Trị Hệ Thống (BGH).');
    } else {
      if (role === 'student') {
        showToast('Đã chuyển sang giao diện Học Sinh (Em Nam - 8A).');
      } else if (role === 'teacher') {
        showToast('Đã chuyển sang giao diện Giáo Viên (Cô Lê Thị B).');
      }
    }
  };

  const handleAdminLoginSuccess = () => {
    setIsAdminLoggedIn(true);
    setCurrentUserRole('admin');
    setCurrentTab('admin');
    showToast('Đăng nhập Quản Trị thành công! (Quyền BGH/Admin)');
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    setCurrentUserRole('student');
    setCurrentTab('home');
    showToast('Đã đăng xuất quyền Quản trị.');
  };

  // Lesson actions
  const handleUpdateLesson = (updatedLesson: Lesson) => {
    setLessons((prev) =>
      prev.map((l) => (l.id === updatedLesson.id ? updatedLesson : l))
    );
  };

  const handleDeleteLesson = (lessonId: string) => {
    setLessons((prev) => prev.filter((l) => l.id !== lessonId));
  };

  const handleAddLesson = (newLesson: Lesson) => {
    setLessons((prev) => [newLesson, ...prev]);
  };

  // Report actions with Supabase cloud persistence & local fallback
  const handleAddReport = async (newReport: IncidentReport) => {
    setReports((prev) => [newReport, ...prev]);
    showToast('🚨 Đã gửi báo cáo thành công! Nhà trường sẽ xử lý ngay.');

    // Async push to Supabase if database table exists
    try {
      await supabase.from('reports').insert([
        {
          report_code: newReport.id,
          title: newReport.desc.slice(0, 80) + '...',
          description: newReport.desc,
          location: newReport.location,
          urgency: newReport.severity === 'sos' ? 'critical' : newReport.severity,
          is_anonymous: newReport.isAnonymous,
          reporter_name: newReport.isAnonymous ? null : newReport.authorName,
          reporter_class: newReport.isAnonymous ? null : newReport.authorClass,
          evidences: newReport.evidences,
          status: 'pending',
        },
      ]);
    } catch (err) {
      console.info('Report stored in local storage:', err);
    }
  };

  const handleUpdateReportStatus = async (reportId: string, status: ReportStatus, notes?: string) => {
    setReports((prev) =>
      prev.map((r) =>
        r.id === reportId
          ? {
              ...r,
              status,
              adminNotes: notes !== undefined ? notes : r.adminNotes,
              resolvedAt: status === 'resolved' ? new Date().toLocaleString('vi-VN') : r.resolvedAt,
            }
          : r
      )
    );

    // Sync to Supabase
    try {
      await supabase
        .from('reports')
        .update({
          status,
          admin_notes: notes,
          resolved_at: status === 'resolved' ? new Date().toISOString() : null,
          updated_at: new Date().toISOString(),
        })
        .or(`id.eq.${reportId},report_code.eq.${reportId}`);
    } catch (err) {
      console.info('Updated in local state:', err);
    }
  };

  const handleDeleteReport = async (reportId: string) => {
    setReports((prev) => prev.filter((r) => r.id !== reportId));

    try {
      await supabase
        .from('reports')
        .delete()
        .or(`id.eq.${reportId},report_code.eq.${reportId}`);
    } catch (err) {
      console.info('Deleted from local state:', err);
    }
  };

  const pendingReportsCount = reports.filter((r) => r.status === 'pending').length;
  const completedLessonsCount = lessons.filter((l) => l.completed).length;

  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen flex flex-col antialiased selection:bg-blue-600 selection:text-white font-sans">
      {/* Header */}
      <Header
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        currentUserRole={currentUserRole}
        onChangeUserRole={handleRoleChange}
        isAdminLoggedIn={isAdminLoggedIn}
        onOpenAdminLogin={() => setIsAdminLoginModalOpen(true)}
        onAdminLogout={handleAdminLogout}
        onOpenSOS={() => setIsSOSModalOpen(true)}
        onOpenShare={() => setIsShareModalOpen(true)}
        unreadReportsCount={pendingReportsCount}
      />

      {/* Main App Content View Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Global Toast Notification */}
        {toastMessage && (
          <div
            id="toast-notification-banner"
            className="mb-5 p-4 rounded-2xl bg-slate-900 text-white text-xs font-bold shadow-xl flex items-center justify-between transition-all animate-in slide-in-from-top-2 border border-slate-700"
          >
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>{toastMessage}</span>
            </div>
            <button
              onClick={() => setToastMessage(null)}
              className="text-slate-400 hover:text-white font-bold ml-4 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Tab View 1: Home */}
        {currentTab === 'home' && (
          <HomeView
            onNavigate={(tab) => {
              setCurrentTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenSOS={() => setIsSOSModalOpen(true)}
            onOpenShare={() => setIsShareModalOpen(true)}
            lessonsCompletedCount={completedLessonsCount}
            totalLessonsCount={lessons.length}
          />
        )}

        {/* Tab View 2: Lessons Curriculum */}
        {currentTab === 'lessons' && (
          <LessonsView
            lessons={lessons}
            currentUserRole={currentUserRole}
            isAdminLoggedIn={isAdminLoggedIn}
            onUpdateLesson={handleUpdateLesson}
            onDeleteLesson={handleDeleteLesson}
            onAddLesson={handleAddLesson}
            onShowToast={showToast}
          />
        )}

        {/* Tab View 3: AI Safety Counselor */}
        {currentTab === 'ai' && <AIChatView onShowToast={showToast} />}

        {/* Tab View 4: Incident Reporting */}
        {currentTab === 'report' && (
          <ReportView
            onSubmitReport={handleAddReport}
            onShowToast={showToast}
            onNavigateToHome={() => setCurrentTab('home')}
          />
        )}

        {/* Tab View 5: Safe Corner */}
        {currentTab === 'safe-corner' && <SafeCornerView onShowToast={showToast} />}

        {/* Tab View 6: Admin Management View */}
        {currentTab === 'admin' && (
          <AdminView
            reports={reports}
            isAdminLoggedIn={isAdminLoggedIn || currentUserRole === 'admin'}
            onOpenAdminLogin={() => setIsAdminLoginModalOpen(true)}
            onUpdateReportStatus={handleUpdateReportStatus}
            onDeleteReport={handleDeleteReport}
            onViewEvidence={(ev) => setViewingEvidence(ev)}
            onShowToast={showToast}
          />
        )}
      </main>

      {/* Floating Emergency SOS Button */}
      {isSOSButtonVisible ? (
        <div
          id="sos-floating-container"
          className="fixed bottom-5 right-5 z-40 flex items-center gap-1.5 animate-in fade-in"
        >
          <button
            id="btn-floating-sos"
            onClick={() => setIsSOSModalOpen(true)}
            className="px-5 py-3.5 rounded-2xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 text-white font-black text-xs sm:text-sm tracking-wider shadow-xl shadow-rose-600/40 flex items-center gap-2 cursor-pointer hover:scale-105 transition-transform"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping"></span>
            <AlertOctagon className="w-4 h-4" />
            <span>SOS KHẨN CẤP</span>
          </button>
          <button
            onClick={() => setIsSOSButtonVisible(false)}
            title="Ẩn nút SOS"
            className="w-8 h-8 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white text-xs font-bold flex items-center justify-center shadow-md transition"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        <button
          id="btn-restore-sos"
          onClick={() => setIsSOSButtonVisible(true)}
          className="fixed bottom-5 right-5 z-40 px-3.5 py-2 rounded-2xl bg-rose-600 text-white text-xs font-bold shadow-md hover:bg-rose-700 transition"
        >
          🚨 Bật lại SOS
        </button>
      )}

      {/* Modals */}
      <AdminLoginModal
        isOpen={isAdminLoginModalOpen}
        onClose={() => setIsAdminLoginModalOpen(false)}
        onLoginSuccess={handleAdminLoginSuccess}
      />

      <SOSModal
        isOpen={isSOSModalOpen}
        onClose={() => setIsSOSModalOpen(false)}
        onNavigateToReport={() => setCurrentTab('report')}
      />

      <MediaViewerModal
        evidence={viewingEvidence}
        onClose={() => setViewingEvidence(null)}
      />

      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        onShowToast={showToast}
      />

      {/* Compact Copyright Footer */}
      <Footer />
    </div>
  );
}
