import React, { useState } from 'react';
import { IncidentReport, ReportSeverity, ReportStatus, EvidenceItem } from '../types';
import {
  ShieldCheck,
  AlertOctagon,
  Clock,
  CheckCircle2,
  Search,
  Filter,
  Eye,
  Trash2,
  FileSpreadsheet,
  Download,
  Lock,
  MapPin,
  FileText,
  User,
  MessageSquare,
  X,
  Sparkles,
} from 'lucide-react';

interface AdminViewProps {
  reports: IncidentReport[];
  isAdminLoggedIn: boolean;
  onOpenAdminLogin: () => void;
  onUpdateReportStatus: (reportId: string, status: ReportStatus, notes?: string) => void;
  onDeleteReport: (reportId: string) => void;
  onViewEvidence: (evidence: EvidenceItem) => void;
  onShowToast: (msg: string) => void;
}

export const AdminView: React.FC<AdminViewProps> = ({
  reports,
  isAdminLoggedIn,
  onOpenAdminLogin,
  onUpdateReportStatus,
  onDeleteReport,
  onViewEvidence,
  onShowToast,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSeverity, setFilterSeverity] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Inspector Modal state
  const [selectedReport, setSelectedReport] = useState<IncidentReport | null>(null);
  const [adminNotesInput, setAdminNotesInput] = useState('');

  // Delete confirmation
  const [deletingReportId, setDeletingReportId] = useState<string | null>(null);

  // If not logged in as Admin, show login gate
  if (!isAdminLoggedIn) {
    return (
      <div id="view-admin" className="max-w-md mx-auto py-12 px-4 text-center space-y-5 animate-in fade-in duration-300">
        <div className="w-16 h-16 rounded-3xl bg-purple-100 text-purple-700 flex items-center justify-center mx-auto shadow-md border border-purple-200">
          <Lock className="w-8 h-8" />
        </div>
        <div className="space-y-1.5">
          <h2 className="text-xl font-black text-slate-900">
            KHU VỰC QUẢN TRỊ BẢO MẬT
          </h2>
          <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
            Hệ thống tiếp nhận báo cáo sự cố dành riêng cho Ban Giám Hiệu và Thầy Cô phụ trách trường THCS Lê Quý Đôn.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 text-xs text-purple-900 font-medium">
          💡 Vui lòng đăng nhập với tài khoản: <strong>admin</strong> | Mật khẩu: <strong>admin</strong>
        </div>

        <button
          id="btn-gate-admin-login"
          onClick={onOpenAdminLogin}
          className="w-full py-3.5 bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs rounded-2xl transition shadow-md shadow-purple-600/30 flex items-center justify-center gap-2 cursor-pointer"
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Mở Cửa Sổ Đăng Nhập Quản Trị</span>
        </button>
      </div>
    );
  }

  // Calculate Statistics
  const totalReports = reports.length;
  const sosCount = reports.filter((r) => r.severity === 'sos').length;
  const pendingCount = reports.filter((r) => r.status === 'pending').length;
  const resolvedCount = reports.filter((r) => r.status === 'resolved').length;

  // Filter and Search Logic
  const filteredReports = reports.filter((r) => {
    const matchesSev = filterSeverity === 'all' || r.severity === filterSeverity;
    const matchesStat = filterStatus === 'all' || r.status === filterStatus;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      r.location.toLowerCase().includes(q) ||
      r.desc.toLowerCase().includes(q) ||
      r.authorName.toLowerCase().includes(q) ||
      r.authorClass.toLowerCase().includes(q);
    return matchesSev && matchesStat && matchesSearch;
  });

  const handleOpenInspector = (report: IncidentReport) => {
    setSelectedReport(report);
    setAdminNotesInput(report.adminNotes || '');
  };

  const handleSaveStatusAndNotes = (newStatus: ReportStatus) => {
    if (!selectedReport) return;
    onUpdateReportStatus(selectedReport.id, newStatus, adminNotesInput);
    setSelectedReport({ ...selectedReport, status: newStatus, adminNotes: adminNotesInput });
    onShowToast(`Đã cập nhật trạng thái: "${newStatus}" và ghi chú xử lý.`);
  };

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(reports, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `Bao_Cao_An_Toan_Hoc_Duong_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    onShowToast('Đã xuất dữ liệu báo cáo sang file JSON.');
  };

  return (
    <div id="view-admin" className="space-y-6 animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        {/* Header Strip */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-purple-700" />
              HỆ THỐNG TIẾP NHẬN BÁO CÁO (BGH NHÀ TRƯỜNG)
            </h2>
            <p className="text-xs text-slate-500 mt-1 font-medium">
              Quản lý, xác minh, xử lý và lưu trữ hồ sơ các vụ việc an toàn học đường.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Supabase Cloud Sync</span>
            </div>
            <button
              onClick={handleExportJSON}
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Xuất Dữ Liệu</span>
            </button>
            <span className="px-3 py-1.5 rounded-full bg-purple-100 text-purple-800 text-xs font-black shrink-0">
              Đã xác thực Admin
            </span>
          </div>
        </div>

        {/* Report Statistics Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <div className="text-[11px] font-bold text-slate-500">Tổng báo cáo</div>
            <div id="stat-total-reports" className="text-2xl font-black text-slate-900 mt-1">
              {totalReports}
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200/80">
            <div className="text-[11px] font-bold text-rose-700 flex items-center gap-1">
              <AlertOctagon className="w-3.5 h-3.5" /> SOS Khẩn cấp
            </div>
            <div id="stat-sos-reports" className="text-2xl font-black text-rose-700 mt-1">
              {sosCount}
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80">
            <div className="text-[11px] font-bold text-amber-700 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> Chờ xử lý
            </div>
            <div id="stat-pending-reports" className="text-2xl font-black text-amber-700 mt-1">
              {pendingCount}
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200/80">
            <div className="text-[11px] font-bold text-emerald-700 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Đã giải quyết
            </div>
            <div id="stat-resolved-reports" className="text-2xl font-black text-emerald-700 mt-1">
              {resolvedCount}
            </div>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 pt-2">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm vị trí, nội dung, người gửi..."
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-2.5 pl-10 pr-4 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-purple-600 focus:bg-white transition"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          </div>

          {/* Severity & Status Dropdown Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 focus:ring-2 focus:ring-purple-600 cursor-pointer"
            >
              <option value="all">Mọi mức độ nguy hiểm</option>
              <option value="sos">🚨 SOS Khẩn cấp</option>
              <option value="high">🟠 Cảnh báo cao</option>
              <option value="medium">🟡 Cần hỗ trợ</option>
              <option value="low">🟢 Phản ánh / Góp ý</option>
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 focus:ring-2 focus:ring-purple-600 cursor-pointer"
            >
              <option value="all">Mọi trạng thái xử lý</option>
              <option value="pending">⏳ Chờ xử lý</option>
              <option value="processing">⚙️ Đang xử lý</option>
              <option value="resolved">✅ Đã giải quyết</option>
            </select>
          </div>
        </div>

        {/* Reports List */}
        <div id="admin-reports-list" className="space-y-3 pt-2">
          {filteredReports.length === 0 ? (
            <div className="p-12 text-center bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
              <ShieldCheck className="w-10 h-10 text-slate-300 mx-auto" />
              <p className="text-xs font-bold text-slate-700">
                Không tìm thấy báo cáo nào theo bộ lọc
              </p>
              <p className="text-[11px] text-slate-400">
                Hãy thử đổi từ khóa tìm kiếm hoặc chọn "Mọi mức độ nguy hiểm".
              </p>
            </div>
          ) : (
            filteredReports.map((rep) => {
              const isSOS = rep.severity === 'sos';
              const isResolved = rep.status === 'resolved';
              const isProcessing = rep.status === 'processing';

              return (
                <div
                  key={rep.id}
                  onClick={() => handleOpenInspector(rep)}
                  className={`p-4 sm:p-5 rounded-2xl border transition cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-3.5 hover:shadow-md ${
                    isSOS
                      ? 'bg-rose-50/40 border-rose-200 hover:border-rose-300'
                      : 'bg-slate-50/70 hover:bg-white border-slate-200'
                  }`}
                >
                  <div className="space-y-1.5 flex-1 pr-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                          isSOS
                            ? 'bg-rose-100 text-rose-800 border border-rose-300'
                            : rep.severity === 'high'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {rep.severityLabel}
                      </span>

                      <span className="text-xs font-bold text-slate-900">
                        {rep.authorName} {rep.authorClass ? `(Lớp ${rep.authorClass})` : ''}
                      </span>

                      <span className="text-[11px] text-slate-400">
                        {rep.timestamp}
                      </span>
                    </div>

                    <p className="text-xs text-slate-700 font-medium line-clamp-2">
                      {rep.desc}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500 font-medium pt-0.5">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                        <strong className="text-slate-700">{rep.location}</strong>
                      </span>
                      {rep.evidences && rep.evidences.length > 0 && (
                        <span className="px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 font-bold text-[10px]">
                          📎 {rep.evidences.length} minh chứng đính kèm
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-end md:self-auto">
                    <span
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold ${
                        isResolved
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          : isProcessing
                          ? 'bg-blue-100 text-blue-800 border border-blue-200'
                          : 'bg-amber-100 text-amber-800 border border-amber-200'
                      }`}
                    >
                      {isResolved
                        ? '✅ Đã giải quyết'
                        : isProcessing
                        ? '⚙️ Đang xử lý'
                        : '⏳ Chờ xử lý'}
                    </span>

                    <button className="px-3.5 py-1.5 bg-purple-700 hover:bg-purple-800 text-white rounded-xl text-xs font-bold transition shadow-xs flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" />
                      Chi tiết
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODAL: REPORT INSPECTOR FOR ADMIN / BGH                                    */}
      {/* ========================================================================= */}
      {selectedReport && (
        <div id="admin-report-modal" className="fixed inset-0 z-50 bg-slate-900/65 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 space-y-5 shadow-2xl relative max-h-[92vh] overflow-y-auto border border-slate-200 animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setSelectedReport(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 font-bold w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center transition"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Header */}
            <div className="space-y-1 pr-8 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-black ${
                    selectedReport.severity === 'sos'
                      ? 'bg-rose-100 text-rose-800 border border-rose-300'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {selectedReport.severityLabel}
                </span>
                <span className="text-xs text-slate-400">{selectedReport.timestamp}</span>
              </div>
              <h3 className="text-lg font-black text-slate-900 pt-1 flex items-center gap-2">
                <User className="w-5 h-5 text-purple-700" />
                {selectedReport.authorName} {selectedReport.authorClass ? `(Lớp ${selectedReport.authorClass})` : ''}
              </h3>
            </div>

            {/* Location & Metadata */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
                <span className="font-bold text-slate-800">
                  Vị trí xảy ra: {selectedReport.location}
                </span>
              </div>
              <div className="text-slate-500 font-medium">
                Hình thức gửi: <strong>{selectedReport.isAnonymous ? 'Bảo mật Ẩn danh' : 'Có định danh học sinh'}</strong>
              </div>
            </div>

            {/* Incident Description */}
            <div className="space-y-1.5">
              <label className="block text-xs font-black text-slate-700 uppercase tracking-wider">
                Nội dung vụ việc phản ánh:
              </label>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-800 leading-relaxed font-medium whitespace-pre-line">
                {selectedReport.desc}
              </div>
            </div>

            {/* Attached Evidences List */}
            <div className="space-y-2">
              <label className="block text-xs font-black text-slate-700 uppercase tracking-wider">
                Minh chứng đính kèm ({selectedReport.evidences.length}):
              </label>
              {selectedReport.evidences.length > 0 ? (
                <div className="space-y-2">
                  {selectedReport.evidences.map((ev) => (
                    <div
                      key={ev.id}
                      className="p-3 rounded-2xl bg-slate-100/80 border border-slate-200 flex items-center justify-between text-xs"
                    >
                      <span className="font-bold text-slate-800 truncate flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-white rounded-md text-[10px] uppercase font-black text-purple-700">
                          {ev.type}
                        </span>
                        <span className="truncate">{ev.name}</span>
                      </span>
                      <div className="flex gap-1.5 shrink-0">
                        <button
                          onClick={() => onViewEvidence(ev)}
                          className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold flex items-center gap-1 transition"
                        >
                          <Eye className="w-3.5 h-3.5" /> Xem
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400 italic p-3 bg-slate-50 rounded-xl">
                  Không có tập tin minh chứng đính kèm.
                </p>
              )}
            </div>

            {/* Admin Action Notes Input */}
            <div className="space-y-1.5">
              <label className="block text-xs font-black text-slate-700 uppercase tracking-wider flex items-center gap-1">
                <MessageSquare className="w-3.5 h-3.5 text-purple-600" />
                Ghi chú & Phương án xử lý của BGH:
              </label>
              <textarea
                rows={3}
                value={adminNotesInput}
                onChange={(e) => setAdminNotesInput(e.target.value)}
                placeholder="Nhập ghi chú xử lý (ví dụ: Đã gặp GVCN và phụ huynh, học sinh đã hòa giải an toàn...)"
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3 text-xs font-medium focus:ring-2 focus:ring-purple-600 focus:bg-white"
              ></textarea>
            </div>

            {/* Status Changer Actions */}
            <div className="space-y-2 border-t border-slate-100 pt-3">
              <label className="block text-xs font-bold text-slate-700">
                Cập nhật trạng thái giải quyết:
              </label>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <button
                  onClick={() => handleSaveStatusAndNotes('pending')}
                  className={`py-2.5 rounded-xl font-bold border transition ${
                    selectedReport.status === 'pending'
                      ? 'bg-amber-500 text-white border-amber-600'
                      : 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100'
                  }`}
                >
                  ⏳ Chờ xử lý
                </button>
                <button
                  onClick={() => handleSaveStatusAndNotes('processing')}
                  className={`py-2.5 rounded-xl font-bold border transition ${
                    selectedReport.status === 'processing'
                      ? 'bg-blue-600 text-white border-blue-700'
                      : 'bg-blue-50 text-blue-800 border-blue-200 hover:bg-blue-100'
                  }`}
                >
                  ⚙️ Đang xử lý
                </button>
                <button
                  onClick={() => handleSaveStatusAndNotes('resolved')}
                  className={`py-2.5 rounded-xl font-bold border transition ${
                    selectedReport.status === 'resolved'
                      ? 'bg-emerald-600 text-white border-emerald-700'
                      : 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                  }`}
                >
                  ✅ Đã giải quyết
                </button>
              </div>
            </div>

            {/* Delete Report Button */}
            <div className="flex justify-between items-center pt-2 border-t border-slate-100">
              <button
                onClick={() => setDeletingReportId(selectedReport.id)}
                className="text-xs font-bold text-rose-600 hover:text-rose-800 flex items-center gap-1 p-2 rounded-xl hover:bg-rose-50 transition"
              >
                <Trash2 className="w-4 h-4" />
                Xóa báo cáo này
              </button>

              <button
                onClick={() => setSelectedReport(null)}
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingReportId && (
        <div className="fixed inset-0 z-50 bg-slate-900/65 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-5 space-y-4 shadow-2xl text-center border border-slate-200">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto text-xl">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Xác nhận xóa hồ sơ báo cáo</h3>
            <p className="text-xs text-slate-500">
              Hành động này sẽ xóa vĩnh viễn báo cáo này khỏi hệ thống lưu trữ của nhà trường.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setDeletingReportId(null)}
                className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition"
              >
                Hủy
              </button>
              <button
                onClick={() => {
                  onDeleteReport(deletingReportId);
                  setDeletingReportId(null);
                  setSelectedReport(null);
                  onShowToast('Đã xóa hồ sơ báo cáo.');
                }}
                className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl transition"
              >
                Xác nhận xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
