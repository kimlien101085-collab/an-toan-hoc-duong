import React, { useState, useRef } from 'react';
import { IncidentReport, EvidenceItem, ReportSeverity } from '../types';
import {
  AlertTriangle,
  EyeOff,
  User,
  MapPin,
  Camera,
  Video,
  Mic,
  FileText,
  Trash2,
  Send,
  CheckCircle2,
  ShieldCheck,
  Radio,
  StopCircle,
  Play,
  Pause,
} from 'lucide-react';

interface ReportViewProps {
  onSubmitReport: (report: IncidentReport) => void;
  onShowToast: (msg: string) => void;
  onNavigateToHome: () => void;
}

export const ReportView: React.FC<ReportViewProps> = ({
  onSubmitReport,
  onShowToast,
  onNavigateToHome,
}) => {
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [authorName, setAuthorName] = useState('');
  const [authorClass, setAuthorClass] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState<ReportSeverity>('medium');
  const [evidences, setEvidences] = useState<EvidenceItem[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessSubmitted, setIsSuccessSubmitted] = useState(false);

  // Live Audio Recording states
  const [isRecording, setIsRecording] = useState(false);
  const [recordSeconds, setRecordSeconds] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recordTimerRef = useRef<number | null>(null);

  // GPS Location Fetching
  const handleGetGPS = () => {
    if ('geolocation' in navigator) {
      onShowToast('Đang định vị tọa độ GPS...');
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude.toFixed(4);
          const lng = position.coords.longitude.toFixed(4);
          setLocation(`📍 Tọa độ GPS (${lat}, ${lng}) - Trường THCS Lê Quý Đôn`);
          onShowToast('Đã xác định vị trí GPS thành công!');
        },
        (error) => {
          console.warn('GPS error:', error);
          setLocation('Khuôn viên Trường THCS Lê Quý Đôn (Vị trí tự chọn)');
          onShowToast('Không thể lấy GPS tự động. Vui lòng nhập chi tiết địa điểm.');
        },
        { enableHighAccuracy: true, timeout: 5000 }
      );
    } else {
      onShowToast('Trình duyệt không hỗ trợ định vị GPS.');
    }
  };

  // Live Microphone Recording
  const startRecordingAudio = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];
      const recorder = new MediaRecorder(stream);

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);
        const newEvidence: EvidenceItem = {
          id: `ev_rec_${Date.now()}`,
          type: 'audio',
          name: `Ghi_am_hien_truong_${new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }).replace(':', 'h')}.webm`,
          url: audioUrl,
          size: `${(audioBlob.size / 1024).toFixed(1)} KB`,
        };
        setEvidences((prev) => [...prev, newEvidence]);
        onShowToast('Đã lưu đoạn ghi âm làm minh chứng!');
        stream.getTracks().forEach((track) => track.stop());
      };

      recorder.start();
      mediaRecorderRef.current = recorder;
      setIsRecording(true);
      setRecordSeconds(0);

      recordTimerRef.current = window.setInterval(() => {
        setRecordSeconds((sec) => sec + 1);
      }, 1000);
    } catch (err) {
      console.error('Mic error:', err);
      onShowToast('Không thể truy cập Microphone để ghi âm.');
    }
  };

  const stopRecordingAudio = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (recordTimerRef.current) {
        clearInterval(recordTimerRef.current);
        recordTimerRef.current = null;
      }
    }
  };

  // File Upload Handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'video' | 'audio' | 'file') => {
    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0];
      const blobUrl = URL.createObjectURL(file);
      const newEv: EvidenceItem = {
        id: `ev_${Date.now()}`,
        type,
        name: file.name,
        url: blobUrl,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      };
      setEvidences((prev) => [...prev, newEv]);
      onShowToast(`Đã đính kèm ${type}: ${file.name}`);
    }
  };

  const handleRemoveEvidence = (id: string) => {
    setEvidences((prev) => prev.filter((ev) => ev.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!location.trim() || !description.trim()) {
      onShowToast('Vui lòng điền đầy đủ vị trí hiện trường và nội dung sự việc!');
      return;
    }

    setIsSubmitting(true);

    const severityLabels: Record<ReportSeverity, string> = {
      sos: '🚨 NGUY CẤP - SOS!',
      high: '🟠 Cảnh báo cao',
      medium: '🟡 Cần hỗ trợ',
      low: '🟢 Phản ánh / Góp ý',
    };

    const newReport: IncidentReport = {
      id: `rep_${Date.now()}`,
      isAnonymous,
      authorName: isAnonymous ? 'Báo cáo ẩn danh' : authorName.trim() || 'Học sinh',
      authorClass: isAnonymous ? '' : authorClass.trim(),
      location: location.trim(),
      severity,
      severityLabel: severityLabels[severity],
      desc: description.trim(),
      evidences,
      timestamp:
        new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) +
        ' - ' +
        new Date().toLocaleDateString('vi-VN'),
      status: 'pending',
    };

    setTimeout(() => {
      onSubmitReport(newReport);
      setIsSubmitting(false);
      setIsSuccessSubmitted(true);
    }, 600);
  };

  const resetForm = () => {
    setIsAnonymous(true);
    setAuthorName('');
    setAuthorClass('');
    setLocation('');
    setDescription('');
    setSeverity('medium');
    setEvidences([]);
    setIsSuccessSubmitted(false);
  };

  const presetLocations = [
    'Nhà xe học sinh (Khu vực góc khuất)',
    'Cổng trường & vỉa hè trước cổng',
    'Khu vực sân sau dãy phòng học',
    'Nhà vệ sinh học sinh',
    'Trên không gian mạng (Nhóm Zalo / Facebook)',
    'Hành lang tầng 2 Block A',
  ];

  if (isSuccessSubmitted) {
    return (
      <div className="max-w-2xl mx-auto py-10 px-4 text-center space-y-5 animate-in fade-in zoom-in duration-300">
        <div className="w-20 h-20 rounded-3xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-md animate-bounce">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-black text-slate-900">
            GỬI BÁO CÁO THÀNH CÔNG!
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
            Hệ thống an toàn của Trường THCS Lê Quý Đôn đã tiếp nhận thông tin của em. Ban Giám Hiệu và Thầy Cô phụ trách sẽ tiến hành xác minh và can thiệp kịp thời để bảo vệ em.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 max-w-md mx-auto text-xs text-emerald-900 font-medium space-y-1">
          <p>
            🔒 <strong>Chế độ bảo mật:</strong> {isAnonymous ? 'Đã ẩn danh tuyệt đối 100%' : 'Có kèm thông tin người gửi'}
          </p>
          <p>
            🛡️ <strong>Mức độ:</strong> {severity === 'sos' ? 'Khẩn cấp SOS' : 'Đã chuyển BGH'}
          </p>
        </div>

        <div className="flex justify-center gap-3 pt-4">
          <button
            onClick={resetForm}
            className="px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition"
          >
            Gửi báo cáo khác
          </button>
          <button
            onClick={onNavigateToHome}
            className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition shadow-md shadow-blue-500/20"
          >
            Về trang chủ
          </button>
        </div>
      </div>
    );
  }

  return (
    <div id="view-report" className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        {/* Title */}
        <div className="border-b border-slate-100 pb-4 space-y-1">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span className="text-rose-600">🚨</span> KÊNH BÁO CÁO SỰ CỐ / NGUY CƠ BẠO LỰC
          </h2>
          <p className="text-xs text-slate-500 font-medium leading-relaxed">
            Thông tin được chuyển trực tiếp tới Ban Giám Hiệu trường THCS Lê Quý Đôn. Cam kết bảo mật an toàn 100% cho người gửi.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 1. Report Mode Selection: Anonymous vs Named */}
          <div className="space-y-2">
            <label className="block text-xs font-black text-slate-900 uppercase tracking-wider">
              1. CHẾ ĐỘ BÁO CÁO
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                id="rep-anon-btn"
                onClick={() => setIsAnonymous(true)}
                className={`p-4 rounded-2xl border-2 text-left transition flex items-center justify-between cursor-pointer ${
                  isAnonymous
                    ? 'border-blue-600 bg-blue-50/50 text-blue-900 shadow-2xs'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div>
                  <div className="text-sm font-black flex items-center gap-1.5">
                    <EyeOff className="w-4 h-4 text-blue-600" /> Báo cáo ẩn danh
                  </div>
                  <p className="text-[11px] font-medium text-slate-500 mt-0.5">
                    Giữ kín tuyệt đối thông tin người gửi
                  </p>
                </div>
                <span
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    isAnonymous ? 'border-blue-600 bg-blue-600' : 'border-slate-300'
                  }`}
                >
                  {isAnonymous && <span className="w-1.5 h-1.5 rounded-full bg-white"></span>}
                </span>
              </button>

              <button
                type="button"
                id="rep-named-btn"
                onClick={() => setIsAnonymous(false)}
                className={`p-4 rounded-2xl border-2 text-left transition flex items-center justify-between cursor-pointer ${
                  !isAnonymous
                    ? 'border-blue-600 bg-blue-50/50 text-blue-900 shadow-2xs'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div>
                  <div className="text-sm font-black flex items-center gap-1.5">
                    <User className="w-4 h-4 text-blue-600" /> Nhập họ tên & lớp
                  </div>
                  <p className="text-[11px] font-medium text-slate-500 mt-0.5">
                    Để Thầy Cô tiện liên hệ hỗ trợ trực tiếp
                  </p>
                </div>
                <span
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    !isAnonymous ? 'border-blue-600 bg-blue-600' : 'border-slate-300'
                  }`}
                >
                  {!isAnonymous && <span className="w-1.5 h-1.5 rounded-full bg-white"></span>}
                </span>
              </button>
            </div>

            {/* Personal Info Inputs (If non-anonymous) */}
            {!isAnonymous && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-blue-50/60 border border-blue-100 animate-in fade-in">
                <div>
                  <label className="block text-[11px] font-bold text-blue-900 mb-1">
                    Họ và tên của em:
                  </label>
                  <input
                    id="report-author-name"
                    type="text"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="Nguyễn Văn A"
                    className="w-full bg-white border border-blue-200 rounded-xl p-2.5 text-xs font-medium focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-blue-900 mb-1">
                    Lớp học:
                  </label>
                  <input
                    id="report-author-class"
                    type="text"
                    value={authorClass}
                    onChange={(e) => setAuthorClass(e.target.value)}
                    placeholder="8A"
                    className="w-full bg-white border border-blue-200 rounded-xl p-2.5 text-xs font-medium focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}
          </div>

          {/* 2. Location Input with GPS button & Presets */}
          <div className="space-y-2">
            <label className="block text-xs font-black text-slate-900 uppercase tracking-wider">
              2. VỊ TRÍ CHI TIẾT HIỆN TRƯỜNG <span className="text-rose-500">*</span>
            </label>

            <div className="flex gap-2">
              <input
                id="report-location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Mô tả cụ thể nơi xảy ra (Ví dụ: Nhà xe block B, góc khuất sân trường, trên mạng...)"
                required
                className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl p-3 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
              />
              <button
                type="button"
                id="btn-get-gps"
                onClick={handleGetGPS}
                className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl text-xs font-bold shrink-0 flex items-center gap-1.5 transition cursor-pointer"
              >
                <MapPin className="w-4 h-4 text-blue-600" />
                <span>GPS Định vị</span>
              </button>
            </div>

            {/* Location Presets */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {presetLocations.map((loc, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setLocation(loc)}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-600 rounded-xl text-[11px] font-medium transition"
                >
                  {loc}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Incident Description */}
          <div className="space-y-2">
            <label className="block text-xs font-black text-slate-900 uppercase tracking-wider">
              3. MÔ TẢ CHI TIẾT SỰ VIỆC <span className="text-rose-500">*</span>
            </label>
            <textarea
              id="report-desc"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Mô tả chi tiết nội dung sự việc, thời gian xảy ra, người liên quan, các hành vi đe dọa hoặc tổn thương..."
              required
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3.5 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition leading-relaxed"
            ></textarea>
          </div>

          {/* 4. Evidence Attachments & Live Voice Recording */}
          <div className="space-y-3">
            <label className="block text-xs font-black text-slate-900 uppercase tracking-wider">
              4. ĐÍNH KÈM MINH CHỨNG (HÌNH ẢNH, VIDEO, GHI ÂM TRỰC TIẾP, TÀI LIỆU)
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {/* Photo Upload */}
              <label className="p-3.5 rounded-2xl border border-slate-200 hover:border-blue-400 bg-slate-50 hover:bg-blue-50/30 flex flex-col items-center justify-center gap-1.5 cursor-pointer transition text-center group">
                <Camera className="w-6 h-6 text-blue-600 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold text-slate-800">Hình ảnh</span>
                <span className="text-[10px] text-slate-400">JPG, PNG</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFileUpload(e, 'image')}
                />
              </label>

              {/* Video Upload */}
              <label className="p-3.5 rounded-2xl border border-slate-200 hover:border-purple-400 bg-slate-50 hover:bg-purple-50/30 flex flex-col items-center justify-center gap-1.5 cursor-pointer transition text-center group">
                <Video className="w-6 h-6 text-purple-600 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold text-slate-800">Video</span>
                <span className="text-[10px] text-slate-400">MP4, MOV</span>
                <input
                  type="file"
                  accept="video/*"
                  className="hidden"
                  onChange={(e) => handleFileUpload(e, 'video')}
                />
              </label>

              {/* Live Audio Record Button */}
              <div
                onClick={isRecording ? stopRecordingAudio : startRecordingAudio}
                className={`p-3.5 rounded-2xl border flex flex-col items-center justify-center gap-1.5 cursor-pointer transition text-center group ${
                  isRecording
                    ? 'border-rose-500 bg-rose-50 text-rose-700 animate-pulse'
                    : 'border-slate-200 hover:border-emerald-400 bg-slate-50 hover:bg-emerald-50/30 text-slate-800'
                }`}
              >
                {isRecording ? (
                  <>
                    <StopCircle className="w-6 h-6 text-rose-600 animate-bounce" />
                    <span className="text-xs font-bold text-rose-600">
                      Dừng ({recordSeconds}s)
                    </span>
                    <span className="text-[10px] text-rose-500 font-bold">Bấm để lưu</span>
                  </>
                ) : (
                  <>
                    <Mic className="w-6 h-6 text-emerald-600 group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-bold text-slate-800">Ghi âm trực tiếp</span>
                    <span className="text-[10px] text-slate-400">Microphone</span>
                  </>
                )}
              </div>

              {/* Document File Upload */}
              <label className="p-3.5 rounded-2xl border border-slate-200 hover:border-amber-400 bg-slate-50 hover:bg-amber-50/30 flex flex-col items-center justify-center gap-1.5 cursor-pointer transition text-center group">
                <FileText className="w-6 h-6 text-amber-600 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold text-slate-800">Tài liệu</span>
                <span className="text-[10px] text-slate-400">PDF, Word</span>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.txt"
                  className="hidden"
                  onChange={(e) => handleFileUpload(e, 'file')}
                />
              </label>
            </div>

            {/* Attached Evidences List */}
            {evidences.length > 0 && (
              <div className="space-y-2 pt-2">
                <span className="text-[11px] font-bold text-slate-500">
                  Minh chứng đã đính kèm ({evidences.length}):
                </span>
                <div className="space-y-1.5">
                  {evidences.map((ev) => (
                    <div
                      key={ev.id}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-semibold"
                    >
                      <span className="truncate flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-md bg-white text-[10px] font-bold uppercase text-slate-700">
                          {ev.type}
                        </span>
                        <span className="truncate">{ev.name}</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveEvidence(ev.id)}
                        className="text-rose-600 hover:text-rose-800 font-bold p-1 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 5. Severity Selection */}
          <div className="space-y-2">
            <label className="block text-xs font-black text-slate-900 uppercase tracking-wider">
              5. MỨC ĐỘ NGUY HIỂM <span className="text-rose-500">*</span>
            </label>
            <select
              id="report-severity"
              value={severity}
              onChange={(e) => setSeverity(e.target.value as ReportSeverity)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3.5 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-blue-500 focus:bg-white cursor-pointer"
            >
              <option value="sos">🚨 NGUY CẤP - SOS! (Cần can thiệp ngay lập tức)</option>
              <option value="high">🟠 Cảnh báo cao (Mâu thuẫn căng thẳng, có nguy cơ xô xát)</option>
              <option value="medium">🟡 Cần hỗ trợ (Trêu chọc, gây áp lực, tẩy chay)</option>
              <option value="low">🟢 Phản ánh / Góp ý chung về an toàn học đường</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            id="btn-submit-report"
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white font-black text-sm rounded-2xl transition shadow-lg shadow-rose-600/30 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>GỬI BÁO CÁO CẢNH BÁO AN TOÀN NGAY</span>
          </button>
        </form>
      </div>
    </div>
  );
};
