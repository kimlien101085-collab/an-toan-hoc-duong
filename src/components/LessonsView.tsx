import React, { useState } from 'react';
import {
  Lesson,
  LessonCategory,
  UserRole,
  LessonMaterial,
  QuizQuestion,
  SingleChoiceQuestion,
  TrueFalseQuestion,
  MatchingQuestion,
  FillBlankQuestion,
} from '../types';
import {
  Search,
  BookOpen,
  Play,
  Download,
  Upload,
  Trash2,
  CheckCircle2,
  X,
  Target,
  Sparkles,
  HelpCircle,
  FileCheck,
  Heart,
  FileText,
  Clock,
  Check,
  Maximize2,
  Minimize2,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Award,
  Link2,
  ListChecks,
  AlertCircle,
} from 'lucide-react';

interface LessonsViewProps {
  lessons: Lesson[];
  currentUserRole: UserRole;
  isAdminLoggedIn: boolean;
  onUpdateLesson: (updatedLesson: Lesson) => void;
  onDeleteLesson: (lessonId: string) => void;
  onAddLesson: (newLesson: Lesson) => void;
  onShowToast: (msg: string) => void;
}

export const LessonsView: React.FC<LessonsViewProps> = ({
  lessons,
  currentUserRole,
  isAdminLoggedIn,
  onUpdateLesson,
  onDeleteLesson,
  onAddLesson,
  onShowToast,
}) => {
  const [activeCategory, setActiveCategory] = useState<LessonCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Active lesson detail modal & expansion state
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [activeSection, setActiveSection] = useState<'objectives' | 'content' | 'game' | 'summary' | 'message'>('objectives');
  const [isFullscreenModal, setIsFullscreenModal] = useState<boolean>(false);

  // Multi-type Quiz / Game state
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  
  // Single Choice state
  const [selectedSingleOption, setSelectedSingleOption] = useState<number | null>(null);
  const [isSingleAnswered, setIsSingleAnswered] = useState<boolean>(false);

  // True/False state
  const [selectedTFAnswer, setSelectedTFAnswer] = useState<boolean | null>(null);
  const [isTFAnswered, setIsTFAnswered] = useState<boolean>(false);

  // Matching state
  const [selectedLeftId, setSelectedLeftId] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<{ [leftId: string]: string }>({});
  const [isMatchingSubmitted, setIsMatchingSubmitted] = useState<boolean>(false);

  // Fill Blank state
  const [filledWord, setFilledWord] = useState<string>('');
  const [isFillSubmitted, setIsFillSubmitted] = useState<boolean>(false);

  // Completed questions tracker for current active lesson
  const [answeredQuestions, setAnsweredQuestions] = useState<{ [qIdx: number]: boolean }>({});

  // Upload study material modal
  const [uploadLessonTarget, setUploadLessonTarget] = useState<Lesson | null>(null);
  const [uploadType, setUploadType] = useState<'file' | 'drive' | 'link'>('file');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [driveUrl, setDriveUrl] = useState('');
  const [driveTitle, setDriveTitle] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [linkTitle, setLinkTitle] = useState('');

  // Confirmation modal for deleting lesson
  const [deletingLessonId, setDeletingLessonId] = useState<string | null>(null);

  const isTeacherOrAdmin = currentUserRole === 'teacher' || currentUserRole === 'admin' || isAdminLoggedIn;

  const categories: { id: LessonCategory; label: string }[] = [
    { id: 'all', label: 'Tất cả bài học' },
    { id: 'bullying', label: 'Phòng chống bắt nạt' },
    { id: 'cyber', label: 'An toàn trên mạng' },
    { id: 'skills', label: 'Kỹ năng tự bảo vệ' },
  ];

  // Filtering
  const filteredLessons = lessons.filter((l) => {
    const matchesCat = activeCategory === 'all' || l.category === activeCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      l.title.toLowerCase().includes(q) ||
      l.desc.toLowerCase().includes(q) ||
      l.objectives.some((o) => o.toLowerCase().includes(q));
    return matchesCat && matchesSearch;
  });

  // Extract quiz questions for active lesson (with fallback to single question)
  const getActiveQuizQuestions = (lesson: Lesson | null): QuizQuestion[] => {
    if (!lesson) return [];
    if (lesson.game.questions && lesson.game.questions.length > 0) {
      return lesson.game.questions;
    }
    // Fallback if only legacy single question exists
    return [
      {
        id: 'legacy_q',
        type: 'single_choice',
        question: lesson.game.question || 'Câu hỏi trắc nghiệm:',
        options: lesson.game.options || [],
        correct: lesson.game.correct ?? 0,
        explanation: lesson.game.explanation || 'Hãy luôn ghi nhớ quy tắc an toàn học đường!',
      },
    ];
  };

  const resetCurrentQuestionState = () => {
    setSelectedSingleOption(null);
    setIsSingleAnswered(false);
    setSelectedTFAnswer(null);
    setIsTFAnswered(false);
    setSelectedLeftId(null);
    setMatchedPairs({});
    setIsMatchingSubmitted(false);
    setFilledWord('');
    setIsFillSubmitted(false);
  };

  const handleOpenDetail = (lesson: Lesson) => {
    setActiveLesson(lesson);
    setActiveSection('objectives');
    setCurrentQuestionIdx(0);
    setAnsweredQuestions({});
    resetCurrentQuestionState();
  };

  const handleDownloadMaterial = (material: LessonMaterial) => {
    if (material.url && material.url !== '#') {
      window.open(material.url, '_blank');
      onShowToast(`Đang mở học liệu: ${material.name}`);
    } else {
      onShowToast(`Đang tải xuống học liệu: ${material.name}`);
    }
  };

  const handleOpenUploadModal = (lesson: Lesson) => {
    setUploadLessonTarget(lesson);
    setUploadType('file');
    setSelectedFile(null);
    setDriveUrl('');
    setDriveTitle(lesson.title + ' - Học liệu.pdf');
    setLinkUrl('');
    setLinkTitle(lesson.title + ' - Bài giảng');
  };

  const handleConfirmUpload = () => {
    if (!uploadLessonTarget) return;

    let newMaterial: LessonMaterial | null = null;

    if (uploadType === 'file') {
      if (!selectedFile) {
        onShowToast('Vui lòng chọn 1 tập tin từ máy tính!');
        return;
      }
      const fileBlobUrl = URL.createObjectURL(selectedFile);
      newMaterial = {
        type: 'file',
        name: selectedFile.name,
        url: fileBlobUrl,
        size: `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB`,
        uploadDate: new Date().toLocaleDateString('vi-VN'),
      };
    } else if (uploadType === 'drive') {
      if (!driveUrl.trim()) {
        onShowToast('Vui lòng nhập đường link Google Drive!');
        return;
      }
      newMaterial = {
        type: 'drive',
        name: driveTitle.trim() || 'Hoc_Lieu_Google_Drive.pdf',
        url: driveUrl.trim(),
        uploadDate: new Date().toLocaleDateString('vi-VN'),
      };
    } else if (uploadType === 'link') {
      if (!linkUrl.trim()) {
        onShowToast('Vui lòng nhập đường link bài giảng / video!');
        return;
      }
      newMaterial = {
        type: 'link',
        name: linkTitle.trim() || 'Lien_Ket_Hoc_Lieu.html',
        url: linkUrl.trim(),
        uploadDate: new Date().toLocaleDateString('vi-VN'),
      };
    }

    if (newMaterial) {
      const updated = { ...uploadLessonTarget, material: newMaterial };
      onUpdateLesson(updated);
      setUploadLessonTarget(null);
      onShowToast(`Đã tải lên học liệu cho: "${uploadLessonTarget.title}"`);
    }
  };

  const handleCompleteLesson = () => {
    if (activeLesson) {
      const updated = { ...activeLesson, completed: true };
      onUpdateLesson(updated);
      setActiveLesson(null);
      onShowToast(`Chúc mừng em đã hoàn thành bài học: "${activeLesson.title}"! 🎉`);
    }
  };

  const activeQuestions = getActiveQuizQuestions(activeLesson);
  const currentQ = activeQuestions[currentQuestionIdx] || activeQuestions[0];

  // Matching pair handler
  const handleSelectMatchingLeft = (leftId: string) => {
    if (isMatchingSubmitted) return;
    setSelectedLeftId(leftId);
  };

  const handleSelectMatchingRight = (rightText: string) => {
    if (isMatchingSubmitted || !selectedLeftId) return;
    setMatchedPairs((prev) => ({
      ...prev,
      [selectedLeftId]: rightText,
    }));
    setSelectedLeftId(null);
  };

  const handleResetMatching = () => {
    setMatchedPairs({});
    setSelectedLeftId(null);
    setIsMatchingSubmitted(false);
  };

  const handleCheckMatching = () => {
    setIsMatchingSubmitted(true);
    setAnsweredQuestions((prev) => ({ ...prev, [currentQuestionIdx]: true }));
  };

  const handleCheckFillBlank = () => {
    if (!filledWord.trim()) {
      onShowToast('Vui lòng chọn hoặc nhập từ còn thiếu trước khi kiểm tra!');
      return;
    }
    setIsFillSubmitted(true);
    setAnsweredQuestions((prev) => ({ ...prev, [currentQuestionIdx]: true }));
  };

  const handleSelectSingleChoice = (idx: number) => {
    setSelectedSingleOption(idx);
    setIsSingleAnswered(true);
    setAnsweredQuestions((prev) => ({ ...prev, [currentQuestionIdx]: true }));
  };

  const handleSelectTrueFalse = (val: boolean) => {
    setSelectedTFAnswer(val);
    setIsTFAnswered(true);
    setAnsweredQuestions((prev) => ({ ...prev, [currentQuestionIdx]: true }));
  };

  const handleGoNextQuestion = () => {
    if (currentQuestionIdx < activeQuestions.length - 1) {
      setCurrentQuestionIdx((prev) => prev + 1);
      resetCurrentQuestionState();
    }
  };

  const handleGoPrevQuestion = () => {
    if (currentQuestionIdx > 0) {
      setCurrentQuestionIdx((prev) => prev - 1);
      resetCurrentQuestionState();
    }
  };

  const handleSelectQuestionIndex = (idx: number) => {
    setCurrentQuestionIdx(idx);
    resetCurrentQuestionState();
  };

  const totalAnsweredCount = Object.keys(answeredQuestions).length;

  return (
    <div id="view-lessons" className="space-y-6 animate-in fade-in duration-300">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 pb-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span>📚</span> Học Liệu An Toàn Học Đường
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
            Trang bị kiến thức & kỹ năng để tự bảo vệ bản thân, phòng chống bạo lực và xây dựng tình bạn đẹp tại Trường THCS Lê Quý Đôn.
          </p>
        </div>

        {isTeacherOrAdmin && (
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Quyền quản lý học liệu
            </span>
          </div>
        )}
      </div>

      {/* Search Input & Category Filters Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <input
            id="lesson-search"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm bài học (ví dụ: bạo lực mạng, kiềm chế, tự bảo vệ...)"
            className="w-full bg-white border border-slate-200 rounded-2xl py-2.5 pl-10 pr-4 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-2xs transition"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 font-bold text-xs"
            >
              ✕
            </button>
          )}
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              id={`cat-${cat.id}`}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold transition cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'border border-slate-200 text-slate-700 bg-white hover:bg-slate-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Lessons Grid Cards */}
      {filteredLessons.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-slate-200/80 space-y-3">
          <Search className="w-10 h-10 text-slate-300 mx-auto" />
          <h4 className="text-sm font-bold text-slate-800">Không tìm thấy bài học nào phù hợp</h4>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Em hãy thử tìm kiếm từ khóa khác hoặc bấm nút "Tất cả bài học" để xem danh sách 12 bài học đầy đủ nhé.
          </p>
        </div>
      ) : (
        <div id="lessons-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredLessons.map((l) => {
            const isCompleted = l.completed;
            const categoryLabel =
              l.category === 'bullying'
                ? 'Phòng chống bắt nạt'
                : l.category === 'cyber'
                ? 'An toàn trên mạng'
                : 'Kỹ năng tự bảo vệ';

            return (
              <div
                key={l.id}
                id={`lesson-card-${l.id}`}
                className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md hover:border-blue-200 transition flex flex-col justify-between gap-3 space-y-2 group"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[11px] font-bold flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {l.duration}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      {categoryLabel}
                    </span>
                  </div>

                  <h3 className="font-black text-slate-900 text-sm leading-snug group-hover:text-blue-600 transition-colors">
                    {l.title}
                  </h3>

                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                    {l.desc}
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <button
                    id={`btn-start-lesson-${l.id}`}
                    onClick={() => handleOpenDetail(l)}
                    className={`w-full py-2.5 rounded-xl font-bold text-xs transition shadow-xs flex items-center justify-center gap-1.5 cursor-pointer ${
                      isCompleted
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                  >
                    {isCompleted ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        Đã học (Xem lại & Luyện tập)
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 fill-current" />
                        Bắt đầu học & Luyện tập
                      </>
                    )}
                  </button>

                  {/* Material Download Strip */}
                  {l.material && (
                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-between gap-2 text-[11px]">
                      <span
                        onClick={() => l.material && handleDownloadMaterial(l.material)}
                        className="font-bold text-blue-600 truncate cursor-pointer hover:underline flex items-center gap-1"
                        title={l.material.name}
                      >
                        <FileText className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                        <span className="truncate">{l.material.name}</span>
                      </span>
                      <button
                        onClick={() => l.material && handleDownloadMaterial(l.material)}
                        className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold shrink-0 transition flex items-center gap-1"
                      >
                        <Download className="w-3 h-3" />
                        Tải về
                      </button>
                    </div>
                  )}

                  {/* Teacher / Admin Action Controls */}
                  {isTeacherOrAdmin && (
                    <div className="flex gap-2 pt-1">
                      <button
                        id={`btn-upload-mat-${l.id}`}
                        onClick={() => handleOpenUploadModal(l)}
                        className="flex-1 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] rounded-xl transition flex items-center justify-center gap-1"
                      >
                        <Upload className="w-3 h-3" />
                        {l.material ? 'Đổi học liệu' : 'Tải học liệu lên'}
                      </button>
                      <button
                        id={`btn-delete-lesson-${l.id}`}
                        onClick={() => setDeletingLessonId(l.id)}
                        className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-[11px] rounded-xl transition flex items-center gap-1"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ========================================================================= */}
      {/* EXPANDED LESSON DETAIL MODAL WITH SPACIOUS DISPLAY & 4 QUIZ GAME TYPES     */}
      {/* ========================================================================= */}
      {activeLesson && (
        <div
          id="lesson-detail-modal"
          className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto"
        >
          <div
            className={`bg-white rounded-3xl transition-all duration-300 space-y-5 shadow-2xl relative border border-slate-200 flex flex-col ${
              isFullscreenModal
                ? 'w-full h-full max-w-none max-h-none rounded-none sm:rounded-3xl p-5 sm:p-8 overflow-y-auto'
                : 'max-w-4xl lg:max-w-5xl xl:max-w-6xl w-full p-5 sm:p-8 max-h-[94vh] overflow-y-auto'
            }`}
          >
            {/* Top Bar Action Buttons: Fullscreen toggle & Close */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {activeLesson.duration}
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                  {activeLesson.category === 'bullying'
                    ? '🛡️ Phòng chống bắt nạt'
                    : activeLesson.category === 'cyber'
                    ? '🌐 An toàn trên mạng'
                    : '⚡ Kỹ năng tự bảo vệ'}
                </span>
                {activeLesson.completed && (
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Đã hoàn thành
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  id="btn-toggle-fullscreen-lesson"
                  onClick={() => setIsFullscreenModal(!isFullscreenModal)}
                  title={isFullscreenModal ? 'Thu nhỏ cửa sổ' : 'Phóng to toàn màn hình'}
                  className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition cursor-pointer"
                >
                  {isFullscreenModal ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
                <button
                  id="btn-close-lesson-modal"
                  onClick={() => setActiveLesson(null)}
                  title="Đóng cửa sổ"
                  className="w-9 h-9 rounded-full bg-slate-100 hover:bg-rose-100 text-slate-500 hover:text-rose-600 flex items-center justify-center transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Lesson Title & Overview */}
            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 leading-tight">
                {activeLesson.title}
              </h3>
              <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
                {activeLesson.desc}
              </p>
            </div>

            {/* Navigation Tabs for 5 Pedagogical Sections */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 p-1.5 bg-slate-100 rounded-2xl text-xs sm:text-sm font-bold">
              {[
                { id: 'objectives', label: '🎯 1. Mục tiêu' },
                { id: 'content', label: '📖 2. Nội dung' },
                { id: 'game', label: '🎮 3. Trò chơi & Bài tập' },
                { id: 'summary', label: '📝 4. Tổng kết' },
                { id: 'message', label: '💌 5. Thông điệp' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  id={`tab-lesson-section-${tab.id}`}
                  onClick={() => setActiveSection(tab.id as any)}
                  className={`py-2.5 px-3 rounded-xl text-center transition font-bold cursor-pointer text-xs sm:text-sm ${
                    activeSection === tab.id
                      ? 'bg-white text-blue-700 shadow-xs font-black'
                      : 'text-slate-600 hover:bg-white/60 hover:text-slate-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* =================================================================== */}
            {/* SECTION 1: MỤC TIÊU BÀI HỌC                                          */}
            {/* =================================================================== */}
            {activeSection === 'objectives' && (
              <div className="space-y-4 p-6 sm:p-8 rounded-3xl bg-blue-50/70 border border-blue-100 animate-in fade-in">
                <div className="flex items-center gap-2 text-blue-900 font-black text-base sm:text-lg">
                  <Target className="w-6 h-6 text-blue-600" />
                  <h4>1. MỤC TIÊU BÀI HỌC CẦN ĐẠT ĐƯỢC</h4>
                </div>
                <div className="space-y-3">
                  {activeLesson.objectives.map((obj, i) => (
                    <div
                      key={i}
                      className="p-4 bg-white rounded-2xl border border-blue-200/60 shadow-2xs flex items-start gap-3 text-sm sm:text-base text-slate-800 font-medium leading-relaxed"
                    >
                      <div className="w-7 h-7 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-black text-xs shrink-0 mt-0.5">
                        0{i + 1}
                      </div>
                      <div className="flex-1">{obj}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* =================================================================== */}
            {/* SECTION 2: NỘI DUNG CHÍNH (SPACIOUS & EXPANDED)                     */}
            {/* =================================================================== */}
            {activeSection === 'content' && (
              <div className="space-y-4 p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200/80 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-900 font-black text-base sm:text-lg">
                    <BookOpen className="w-6 h-6 text-blue-600" />
                    <h4>2. NỘI DUNG BÀI HỌC CHI TIẾT</h4>
                  </div>
                  <span className="text-xs font-bold text-slate-500 bg-white px-3 py-1 rounded-xl border border-slate-200">
                    Trường THCS Lê Quý Đôn
                  </span>
                </div>

                <div className="space-y-4 text-slate-800 leading-relaxed font-medium">
                  {activeLesson.content.map((c, i) => (
                    <div
                      key={i}
                      className="p-5 sm:p-6 bg-white rounded-2xl border border-slate-200/80 shadow-2xs text-sm sm:text-base leading-relaxed space-y-2"
                    >
                      <div className="flex items-center gap-2 text-blue-700 font-bold text-xs uppercase tracking-wider">
                        <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                        Phần {i + 1}
                      </div>
                      <p className="text-slate-800 font-normal whitespace-pre-line text-sm sm:text-base leading-relaxed">
                        {c}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* =================================================================== */}
            {/* SECTION 3: ENHANCED QUIZ & GAME ENGINE WITH 4 QUESTION TYPES        */}
            {/* =================================================================== */}
            {activeSection === 'game' && (
              <div className="space-y-5 p-5 sm:p-8 rounded-3xl bg-gradient-to-b from-purple-50/80 to-indigo-50/60 border border-purple-100 animate-in fade-in">
                {/* Header with question type indicator & progress */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-purple-200/60 pb-4">
                  <div>
                    <h4 className="text-base sm:text-lg font-black text-purple-950 flex items-center gap-2">
                      <HelpCircle className="w-6 h-6 text-purple-600" />
                      3. TRÒ CHƠI & BÀI TẬP TÌNH HUỐNG TƯƠNG TÁC
                    </h4>
                    <p className="text-xs sm:text-sm text-purple-700 mt-0.5 font-medium">
                      Luyện tập 4 dạng bài tập: Trắc nghiệm, Đúng/Sai, Ghép cặp nối cột và Điền từ.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black px-3 py-1.5 rounded-xl bg-purple-200 text-purple-900 flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-purple-700" />
                      Đã giải: {totalAnsweredCount}/{activeQuestions.length} câu
                    </span>
                  </div>
                </div>

                {/* Question Switcher Tabs (Câu 1, Câu 2, Câu 3, Câu 4) */}
                <div className="flex flex-wrap items-center gap-2">
                  {activeQuestions.map((q, idx) => {
                    const isCurrent = currentQuestionIdx === idx;
                    const isSolved = answeredQuestions[idx];
                    const typeLabel =
                      q.type === 'single_choice'
                        ? 'Trắc nghiệm'
                        : q.type === 'true_false'
                        ? 'Đúng / Sai'
                        : q.type === 'matching'
                        ? 'Nối cột'
                        : 'Điền từ';

                    return (
                      <button
                        key={idx}
                        id={`btn-question-tab-${idx}`}
                        onClick={() => handleSelectQuestionIndex(idx)}
                        className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 cursor-pointer ${
                          isCurrent
                            ? 'bg-purple-700 text-white shadow-md shadow-purple-500/20'
                            : isSolved
                            ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                            : 'bg-white text-slate-700 border border-purple-200 hover:bg-purple-100'
                        }`}
                      >
                        {isSolved && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                        <span>Câu {idx + 1}: {typeLabel}</span>
                      </button>
                    );
                  })}
                </div>

                {/* =============================================================== */}
                {/* SUB-TYPE A: SINGLE CHOICE (TRẮC NGHIỆM)                          */}
                {/* =============================================================== */}
                {currentQ.type === 'single_choice' && (
                  <div className="space-y-4 p-5 sm:p-6 bg-white rounded-3xl border border-purple-200/80 shadow-xs">
                    <div className="flex items-center justify-between text-xs font-bold text-purple-800">
                      <span className="px-3 py-1 rounded-full bg-purple-100">
                        🎯 Câu {currentQuestionIdx + 1}: Trắc nghiệm chọn 1 đáp án
                      </span>
                    </div>

                    <h5 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                      {(currentQ as SingleChoiceQuestion).question}
                    </h5>

                    <div className="space-y-2.5 pt-1">
                      {(currentQ as SingleChoiceQuestion).options.map((opt, optIdx) => {
                        const sq = currentQ as SingleChoiceQuestion;
                        let btnStyle = 'bg-slate-50 border-slate-200 hover:border-purple-500 hover:bg-purple-50/50 text-slate-800';

                        if (isSingleAnswered) {
                          if (optIdx === sq.correct) {
                            btnStyle = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-bold';
                          } else if (selectedSingleOption === optIdx) {
                            btnStyle = 'bg-rose-100 border-rose-400 text-rose-950';
                          } else {
                            btnStyle = 'bg-slate-50/60 border-slate-200 text-slate-400';
                          }
                        }

                        return (
                          <button
                            key={optIdx}
                            id={`option-single-${optIdx}`}
                            onClick={() => !isSingleAnswered && handleSelectSingleChoice(optIdx)}
                            disabled={isSingleAnswered}
                            className={`w-full text-left p-4 rounded-2xl border text-xs sm:text-sm font-semibold transition shadow-2xs flex items-center justify-between gap-2 cursor-pointer ${btnStyle}`}
                          >
                            <span className="leading-relaxed">{opt}</span>
                            {isSingleAnswered && optIdx === sq.correct && (
                              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 ml-2" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Single Choice Explanation Box */}
                    {isSingleAnswered && (
                      <div
                        className={`p-4 rounded-2xl text-xs sm:text-sm font-semibold leading-relaxed border animate-in fade-in ${
                          selectedSingleOption === (currentQ as SingleChoiceQuestion).correct
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                            : 'bg-rose-50 border-rose-300 text-rose-900'
                        }`}
                      >
                        {selectedSingleOption === (currentQ as SingleChoiceQuestion).correct ? (
                          <div className="flex items-start gap-2">
                            <span className="text-lg">🎉</span>
                            <div>
                              <strong className="block mb-1">CHÍNH XÁC!</strong>
                              <p className="font-medium text-emerald-800">{currentQ.explanation}</p>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-start gap-2">
                            <span className="text-lg">💡</span>
                            <div>
                              <strong className="block mb-1">CHƯA CHÍNH XÁC. Em hãy xem giải thích:</strong>
                              <p className="font-medium text-slate-700">{currentQ.explanation}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* =============================================================== */}
                {/* SUB-TYPE B: TRUE / FALSE (ĐÚNG HOẶC SAI)                         */}
                {/* =============================================================== */}
                {currentQ.type === 'true_false' && (
                  <div className="space-y-4 p-5 sm:p-6 bg-white rounded-3xl border border-purple-200/80 shadow-xs">
                    <div className="flex items-center justify-between text-xs font-bold text-purple-800">
                      <span className="px-3 py-1 rounded-full bg-purple-100">
                        ⚖️ Câu {currentQuestionIdx + 1}: Đánh giá tính Đúng / Sai
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm font-bold text-slate-500">
                      {(currentQ as TrueFalseQuestion).question}
                    </p>

                    <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 text-slate-900 text-base sm:text-lg font-bold leading-relaxed shadow-2xs">
                      "{(currentQ as TrueFalseQuestion).statement}"
                    </div>

                    {/* True / False Choice Buttons */}
                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <button
                        id="btn-tf-true"
                        onClick={() => !isTFAnswered && handleSelectTrueFalse(true)}
                        disabled={isTFAnswered}
                        className={`py-4 rounded-2xl font-black text-sm sm:text-base border transition shadow-xs flex items-center justify-center gap-2 cursor-pointer ${
                          isTFAnswered
                            ? (currentQ as TrueFalseQuestion).isTrue === true
                              ? 'bg-emerald-600 text-white border-emerald-600 ring-2 ring-emerald-400'
                              : selectedTFAnswer === true
                              ? 'bg-rose-500 text-white border-rose-500'
                              : 'bg-slate-100 text-slate-400 border-slate-200'
                            : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-200'
                        }`}
                      >
                        <CheckCircle2 className="w-5 h-5" />
                        ĐÚNG (Chính xác)
                      </button>

                      <button
                        id="btn-tf-false"
                        onClick={() => !isTFAnswered && handleSelectTrueFalse(false)}
                        disabled={isTFAnswered}
                        className={`py-4 rounded-2xl font-black text-sm sm:text-base border transition shadow-xs flex items-center justify-center gap-2 cursor-pointer ${
                          isTFAnswered
                            ? (currentQ as TrueFalseQuestion).isTrue === false
                              ? 'bg-emerald-600 text-white border-emerald-600 ring-2 ring-emerald-400'
                              : selectedTFAnswer === false
                              ? 'bg-rose-500 text-white border-rose-500'
                              : 'bg-slate-100 text-slate-400 border-slate-200'
                            : 'bg-rose-50 hover:bg-rose-100 text-rose-800 border-rose-200'
                        }`}
                      >
                        <AlertCircle className="w-5 h-5" />
                        SAI (Không đúng)
                      </button>
                    </div>

                    {/* True / False Feedback Box */}
                    {isTFAnswered && (
                      <div
                        className={`p-4 rounded-2xl text-xs sm:text-sm font-semibold leading-relaxed border animate-in fade-in ${
                          selectedTFAnswer === (currentQ as TrueFalseQuestion).isTrue
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                            : 'bg-rose-50 border-rose-300 text-rose-900'
                        }`}
                      >
                        {selectedTFAnswer === (currentQ as TrueFalseQuestion).isTrue ? (
                          <p>
                            🎉 <strong>CHÍNH XÁC!</strong> {currentQ.explanation}
                          </p>
                        ) : (
                          <div className="space-y-1">
                            <p>
                              💡 <strong>CHƯA ĐÚNG.</strong> Đáp án đúng là:{' '}
                              <strong>{(currentQ as TrueFalseQuestion).isTrue ? 'ĐÚNG' : 'SAI'}</strong>
                            </p>
                            <p className="font-medium text-slate-700">{currentQ.explanation}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* =============================================================== */}
                {/* SUB-TYPE C: MATCHING (GHÉP CẶP / NỐI CỘT)                        */}
                {/* =============================================================== */}
                {currentQ.type === 'matching' && (
                  <div className="space-y-4 p-5 sm:p-6 bg-white rounded-3xl border border-purple-200/80 shadow-xs">
                    <div className="flex items-center justify-between text-xs font-bold text-purple-800">
                      <span className="px-3 py-1 rounded-full bg-purple-100">
                        🔗 Câu {currentQuestionIdx + 1}: Ghép cặp nối cột tương ứng
                      </span>
                      <span className="text-slate-500">
                        Bấm chọn thẻ cột Trái rồi chọn thẻ tương ứng cột Phải
                      </span>
                    </div>

                    <h5 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                      {(currentQ as MatchingQuestion).question}
                    </h5>

                    {/* Two Column Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                      {/* Left Column */}
                      <div className="space-y-2.5">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                          📌 Cột A: Tình huống / Khái niệm
                        </span>
                        {(currentQ as MatchingQuestion).pairs.map((pair, pIdx) => {
                          const isSelected = selectedLeftId === pair.id;
                          const isMatched = !!matchedPairs[pair.id];
                          const rightVal = matchedPairs[pair.id];
                          const isCorrectMatch = rightVal === pair.right;

                          let cardStyle = 'bg-slate-50 border-slate-200 hover:border-blue-400 text-slate-800';
                          if (isSelected) {
                            cardStyle = 'bg-blue-100 border-blue-500 text-blue-950 ring-2 ring-blue-300 font-bold';
                          } else if (isMatchingSubmitted) {
                            cardStyle = isCorrectMatch
                              ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold'
                              : 'bg-rose-50 border-rose-300 text-rose-950';
                          } else if (isMatched) {
                            cardStyle = 'bg-indigo-50 border-indigo-300 text-indigo-950 font-medium';
                          }

                          return (
                            <div
                              key={pair.id}
                              onClick={() => handleSelectMatchingLeft(pair.id)}
                              className={`p-3.5 rounded-2xl border text-xs sm:text-sm transition cursor-pointer flex flex-col gap-1.5 shadow-2xs ${cardStyle}`}
                            >
                              <div className="flex items-center justify-between font-bold">
                                <span>{pIdx + 1}. {pair.left}</span>
                                {isMatched && !isMatchingSubmitted && (
                                  <span className="text-[10px] bg-indigo-200 text-indigo-800 px-2 py-0.5 rounded-full font-bold">
                                    Đã ghép
                                  </span>
                                )}
                              </div>
                              {matchedPairs[pair.id] && (
                                <div className="text-[11px] p-2 bg-white/80 rounded-xl border border-slate-200/60 text-slate-700 flex items-center gap-1">
                                  <Link2 className="w-3 h-3 text-indigo-500 shrink-0" />
                                  <span className="truncate">{matchedPairs[pair.id]}</span>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {/* Right Column */}
                      <div className="space-y-2.5">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                          🎯 Cột B: Biểu hiện / Giải pháp phù hợp
                        </span>
                        {(currentQ as MatchingQuestion).pairs.map((pair, rIdx) => {
                          const isAlreadyAssigned = Object.values(matchedPairs).includes(pair.right);

                          return (
                            <div
                              key={rIdx}
                              onClick={() => handleSelectMatchingRight(pair.right)}
                              className={`p-3.5 rounded-2xl border text-xs sm:text-sm transition cursor-pointer flex items-center justify-between shadow-2xs ${
                                isAlreadyAssigned
                                  ? 'bg-slate-100 border-slate-200 text-slate-400'
                                  : 'bg-white border-slate-200 hover:border-purple-400 hover:bg-purple-50/50 text-slate-800'
                              }`}
                            >
                              <span className="leading-relaxed">{pair.right}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Matching Action Controls */}
                    <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-100">
                      <button
                        onClick={handleResetMatching}
                        className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        Nối lại từ đầu
                      </button>

                      <button
                        id="btn-check-matching"
                        onClick={handleCheckMatching}
                        disabled={Object.keys(matchedPairs).length < (currentQ as MatchingQuestion).pairs.length}
                        className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 cursor-pointer shadow-xs ${
                          Object.keys(matchedPairs).length >= (currentQ as MatchingQuestion).pairs.length
                            ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-purple-500/20'
                            : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                        }`}
                      >
                        <ListChecks className="w-4 h-4" />
                        Kiểm tra kết quả ghép nối
                      </button>
                    </div>

                    {/* Matching Feedback */}
                    {isMatchingSubmitted && (
                      <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-xs sm:text-sm text-indigo-900 leading-relaxed space-y-1 animate-in fade-in">
                        <p className="font-black flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                          KẾT QUẢ GHÉP CẶP:
                        </p>
                        <p className="font-medium text-slate-700">{currentQ.explanation}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* =============================================================== */}
                {/* SUB-TYPE D: FILL IN THE BLANK (ĐIỀN TỪ CÒN THIẾU)                 */}
                {/* =============================================================== */}
                {currentQ.type === 'fill_blank' && (
                  <div className="space-y-4 p-5 sm:p-6 bg-white rounded-3xl border border-purple-200/80 shadow-xs">
                    <div className="flex items-center justify-between text-xs font-bold text-purple-800">
                      <span className="px-3 py-1 rounded-full bg-purple-100">
                        ✏️ Câu {currentQuestionIdx + 1}: Điền từ còn thiếu vào câu
                      </span>
                    </div>

                    <h5 className="text-sm font-bold text-slate-500">
                      {(currentQ as FillBlankQuestion).question}
                    </h5>

                    {/* Sentence with Slot Box */}
                    <div className="p-6 rounded-2xl bg-amber-50/60 border border-amber-200 text-slate-900 text-base sm:text-lg font-bold leading-loose shadow-2xs">
                      <span>{(currentQ as FillBlankQuestion).sentenceBefore} </span>
                      <span className="inline-block mx-1 px-4 py-1 rounded-xl bg-white border-2 border-dashed border-purple-400 text-purple-900 font-black shadow-xs">
                        {filledWord || '[ ... Chỗ trống ... ]'}
                      </span>
                      <span> {(currentQ as FillBlankQuestion).sentenceAfter}</span>
                    </div>

                    {/* Word Bank Chips (Bấm để chọn nhanh) */}
                    <div className="space-y-2">
                      <span className="text-xs font-bold text-slate-600 block">
                        💡 Ngân hàng từ gợi ý (Bấm vào từ để điền):
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {(currentQ as FillBlankQuestion).wordBank.map((word, wIdx) => (
                          <button
                            key={wIdx}
                            onClick={() => !isFillSubmitted && setFilledWord(word)}
                            disabled={isFillSubmitted}
                            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition border cursor-pointer ${
                              filledWord === word
                                ? 'bg-purple-700 text-white border-purple-700 shadow-xs'
                                : 'bg-slate-50 hover:bg-purple-50 text-slate-800 border-slate-200'
                            }`}
                          >
                            {word}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Action button */}
                    <div className="flex items-center justify-between gap-3 pt-2 border-t border-slate-100">
                      <button
                        onClick={() => {
                          setFilledWord('');
                          setIsFillSubmitted(false);
                        }}
                        className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        Xóa chọn lại
                      </button>

                      <button
                        id="btn-check-fill-blank"
                        onClick={handleCheckFillBlank}
                        className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs sm:text-sm font-bold transition shadow-xs cursor-pointer flex items-center gap-2"
                      >
                        <Check className="w-4 h-4" />
                        Kiểm tra đáp án điền từ
                      </button>
                    </div>

                    {/* Fill blank feedback */}
                    {isFillSubmitted && (
                      <div
                        className={`p-4 rounded-2xl text-xs sm:text-sm font-semibold leading-relaxed border animate-in fade-in ${
                          filledWord.trim().toLowerCase() ===
                          (currentQ as FillBlankQuestion).correctWord.trim().toLowerCase()
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                            : 'bg-rose-50 border-rose-300 text-rose-900'
                        }`}
                      >
                        {filledWord.trim().toLowerCase() ===
                        (currentQ as FillBlankQuestion).correctWord.trim().toLowerCase() ? (
                          <p>
                            🎉 <strong>CHÍNH XÁC!</strong> {currentQ.explanation}
                          </p>
                        ) : (
                          <div className="space-y-1">
                            <p>
                              💡 <strong>CHƯA CHÍNH XÁC.</strong> Từ đúng là:{' '}
                              <strong>"{(currentQ as FillBlankQuestion).correctWord}"</strong>
                            </p>
                            <p className="font-medium text-slate-700">{currentQ.explanation}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* Bottom Navigation for Questions */}
                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={handleGoPrevQuestion}
                    disabled={currentQuestionIdx === 0}
                    className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition ${
                      currentQuestionIdx === 0
                        ? 'text-slate-300 bg-slate-100 cursor-not-allowed'
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 cursor-pointer'
                    }`}
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Câu trước
                  </button>

                  <span className="text-xs font-bold text-slate-500">
                    Câu {currentQuestionIdx + 1} / {activeQuestions.length}
                  </span>

                  <button
                    onClick={handleGoNextQuestion}
                    disabled={currentQuestionIdx === activeQuestions.length - 1}
                    className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition ${
                      currentQuestionIdx === activeQuestions.length - 1
                        ? 'text-slate-300 bg-slate-100 cursor-not-allowed'
                        : 'bg-purple-600 text-white hover:bg-purple-700 cursor-pointer shadow-xs'
                    }`}
                  >
                    Câu kế tiếp
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* =================================================================== */}
            {/* SECTION 4: TỔNG KẾT BÀI HỌC                                          */}
            {/* =================================================================== */}
            {activeSection === 'summary' && (
              <div className="space-y-4 p-6 sm:p-8 rounded-3xl bg-amber-50/70 border border-amber-100 animate-in fade-in">
                <div className="flex items-center gap-2 text-amber-900 font-black text-base sm:text-lg">
                  <FileCheck className="w-6 h-6 text-amber-600" />
                  <h4>4. TỔNG KẾT & ĐIỀU CỐT LÕI CẦN GHI NHỚ</h4>
                </div>
                <div className="space-y-3">
                  {activeLesson.summary.map((sum, i) => (
                    <div
                      key={i}
                      className="p-4 bg-white rounded-2xl border border-amber-200/60 shadow-2xs flex items-start gap-3 text-sm sm:text-base text-slate-800 font-medium leading-relaxed"
                    >
                      <span className="text-amber-600 font-black text-base">✦</span>
                      <div className="flex-1">{sum}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* =================================================================== */}
            {/* SECTION 5: THÔNG ĐIỆP AN TOÀN HỌC ĐƯỜNG                              */}
            {/* =================================================================== */}
            {activeSection === 'message' && (
              <div className="space-y-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-sky-50 via-indigo-50 to-purple-50 border border-sky-200/80 text-center animate-in fade-in">
                <div className="flex items-center justify-center gap-2 text-indigo-900 font-black text-base sm:text-lg">
                  <Heart className="w-6 h-6 text-rose-500 fill-current" />
                  <h4>5. THÔNG ĐIỆP Ý NGHĨA AN TOÀN HỌC ĐƯỜNG</h4>
                </div>
                <div className="p-6 sm:p-8 rounded-2xl bg-white shadow-xs border border-indigo-100 text-sm sm:text-base md:text-lg font-bold text-indigo-950 italic leading-relaxed max-w-3xl mx-auto">
                  {activeLesson.message}
                </div>
                <p className="text-xs font-bold text-slate-500">
                  Trường THCS Lê Quý Đôn – Tôn trọng • Yêu thương • Lan tỏa văn minh
                </p>
              </div>
            )}

            {/* Material attachment inside detail view */}
            {activeLesson.material && (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm">
                <span className="font-bold text-emerald-900 truncate flex items-center gap-2">
                  <FileText className="w-5 h-5 text-emerald-600 shrink-0" />
                  Học liệu đính kèm: {activeLesson.material.name}
                </span>
                <button
                  onClick={() => activeLesson.material && handleDownloadMaterial(activeLesson.material)}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shrink-0 transition flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <Download className="w-4 h-4" />
                  Tải xuống học liệu
                </button>
              </div>
            )}

            {/* Footer Action */}
            <div className="flex gap-3 pt-3 border-t border-slate-100">
              <button
                id="btn-finish-study-lesson"
                onClick={handleCompleteLesson}
                className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-black text-sm rounded-2xl transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Check className="w-5 h-5 text-emerald-400" />
                Hoàn thành & Ghi nhận kết quả học bài này
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: UPLOAD STUDY MATERIAL MODAL (3 OPTIONS: FILE, DRIVE, LINK)       */}
      {/* ========================================================================= */}
      {uploadLessonTarget && (
        <div id="upload-modal" className="fixed inset-0 z-50 bg-slate-900/65 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl relative border border-slate-200 animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setUploadLessonTarget(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 font-bold"
            >
              <X className="w-4 h-4" />
            </button>

            <div>
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <Upload className="w-5 h-5 text-blue-600" />
                TẢI HỌC LIỆU BÀI HỌC LÊN
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Bài học: <strong className="text-slate-800">{uploadLessonTarget.title}</strong>
              </p>
            </div>

            {/* Method Tabs */}
            <div className="grid grid-cols-3 gap-2 text-xs font-bold p-1 bg-slate-100 rounded-2xl">
              <button
                onClick={() => setUploadType('file')}
                className={`py-2 rounded-xl transition ${
                  uploadType === 'file' ? 'bg-white text-blue-700 shadow-xs font-black' : 'text-slate-600'
                }`}
              >
                📄 Tải File
              </button>
              <button
                onClick={() => setUploadType('drive')}
                className={`py-2 rounded-xl transition ${
                  uploadType === 'drive' ? 'bg-white text-blue-700 shadow-xs font-black' : 'text-slate-600'
                }`}
              >
                ☁️ Google Drive
              </button>
              <button
                onClick={() => setUploadType('link')}
                className={`py-2 rounded-xl transition ${
                  uploadType === 'link' ? 'bg-white text-blue-700 shadow-xs font-black' : 'text-slate-600'
                }`}
              >
                🔗 Link URL
              </button>
            </div>

            {/* Option 1: File from Computer */}
            {uploadType === 'file' && (
              <div className="space-y-3">
                <label className="block p-5 border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-2xl text-center cursor-pointer bg-slate-50 transition">
                  <Upload className="w-8 h-8 text-blue-500 mx-auto" />
                  <p className="text-xs font-bold text-slate-700 mt-2">Bấm để chọn file từ máy tính</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    Hỗ trợ PDF, Word, PowerPoint, MP4, MP3 (Tối đa 50MB)
                  </p>
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setSelectedFile(e.target.files[0]);
                      }
                    }}
                  />
                </label>
                {selectedFile && (
                  <div className="text-xs font-bold text-blue-700 bg-blue-50 p-3 rounded-xl border border-blue-100 flex items-center justify-between">
                    <span className="truncate">📄 {selectedFile.name}</span>
                    <span className="text-[10px] text-blue-500">
                      {(selectedFile.size / 1024 / 1024).toFixed(1)} MB
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Option 2: Google Drive */}
            {uploadType === 'drive' && (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Liên kết Google Drive:
                  </label>
                  <input
                    type="url"
                    value={driveUrl}
                    onChange={(e) => setDriveUrl(e.target.value)}
                    placeholder="https://drive.google.com/file/d/..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3 text-xs font-medium focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Tên hiển thị học liệu:
                  </label>
                  <input
                    type="text"
                    value={driveTitle}
                    onChange={(e) => setDriveTitle(e.target.value)}
                    placeholder="Vi_du_Bai_Giang_Chuan.pdf"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3 text-xs font-medium focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}

            {/* Option 3: External URL Link */}
            {uploadType === 'link' && (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Đường dẫn liên kết (Youtube / Canva / Web):
                  </label>
                  <input
                    type="url"
                    value={linkUrl}
                    onChange={(e) => setLinkUrl(e.target.value)}
                    placeholder="https://youtube.com/watch?v=... hoặc liên kết Canva"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3 text-xs font-medium focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Tên hiển thị liên kết:
                  </label>
                  <input
                    type="text"
                    value={linkTitle}
                    onChange={(e) => setLinkTitle(e.target.value)}
                    placeholder="Video bài giảng kỹ năng an toàn"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3 text-xs font-medium focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}

            <button
              id="btn-confirm-upload-material"
              onClick={handleConfirmUpload}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-2xl transition shadow-md shadow-blue-500/20"
            >
              Xác nhận tải học liệu lên
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingLessonId && (
        <div className="fixed inset-0 z-50 bg-slate-900/65 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-5 space-y-4 shadow-2xl text-center border border-slate-200">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto text-xl">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Xác nhận xóa bài học</h3>
            <p className="text-xs text-slate-500">
              Bạn có chắc chắn muốn xóa bài học này khỏi chương trình học đường không?
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setDeletingLessonId(null)}
                className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition"
              >
                Hủy
              </button>
              <button
                onClick={() => {
                  onDeleteLesson(deletingLessonId);
                  setDeletingLessonId(null);
                  onShowToast('Đã xóa bài học thành công!');
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
