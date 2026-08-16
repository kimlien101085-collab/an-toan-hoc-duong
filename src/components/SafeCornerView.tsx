import React, { useState, useEffect } from 'react';
import {
  Heart,
  Wind,
  Smile,
  Meh,
  Frown,
  Flame,
  CloudRain,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Volume2,
  VolumeX,
  Shield,
  Lightbulb,
} from 'lucide-react';

interface SafeCornerViewProps {
  onShowToast: (msg: string) => void;
}

export const SafeCornerView: React.FC<SafeCornerViewProps> = ({ onShowToast }) => {
  // Breathing 4-7-8 State
  const [isBreathingActive, setIsBreathingActive] = useState(false);
  const [breathPhase, setBreathPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [timerSeconds, setTimerSeconds] = useState(4);
  const [completedCycles, setCompletedCycles] = useState(0);

  // Mood Check-in
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  // Soothing Ambient Audio Generator (Web Audio API Sine wave chord)
  const [isAmbientPlaying, setIsAmbientPlaying] = useState(false);
  const audioContextRef = React.useRef<AudioContext | null>(null);
  const oscillatorsRef = React.useRef<OscillatorNode[]>([]);
  const gainNodeRef = React.useRef<GainNode | null>(null);

  // Breathing Loop Timer
  useEffect(() => {
    let interval: any = null;

    if (isBreathingActive) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => {
          if (prev <= 1) {
            if (breathPhase === 'inhale') {
              setBreathPhase('hold');
              return 7;
            } else if (breathPhase === 'hold') {
              setBreathPhase('exhale');
              return 8;
            } else {
              setBreathPhase('inhale');
              setCompletedCycles((c) => c + 1);
              return 4;
            }
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isBreathingActive, breathPhase]);

  const toggleBreathing = () => {
    if (!isBreathingActive) {
      setIsBreathingActive(true);
      setBreathPhase('inhale');
      setTimerSeconds(4);
      onShowToast('Bắt đầu bài tập thở 4-7-8 giúp xoa dịu tâm trí.');
    } else {
      setIsBreathingActive(false);
    }
  };

  const resetBreathing = () => {
    setIsBreathingActive(false);
    setBreathPhase('inhale');
    setTimerSeconds(4);
    setCompletedCycles(0);
  };

  // Ambient sound player using Web Audio API
  const toggleAmbientSound = () => {
    if (isAmbientPlaying) {
      stopAmbientSound();
    } else {
      startAmbientSound();
    }
  };

  const startAmbientSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtx();
      audioContextRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.08, ctx.currentTime);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Soft harmonic frequencies (432Hz meditative chord)
      const freqs = [216, 324, 432, 540];
      const oscs: OscillatorNode[] = [];

      freqs.forEach((f) => {
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, ctx.currentTime);
        osc.connect(masterGain);
        osc.start();
        oscs.push(osc);
      });

      oscillatorsRef.current = oscs;
      setIsAmbientPlaying(true);
      onShowToast('Đang phát âm thanh tần số thư giãn 432Hz.');
    } catch (e) {
      console.warn('Audio Context error:', e);
      onShowToast('Không thể phát âm thanh thư giãn.');
    }
  };

  const stopAmbientSound = () => {
    if (oscillatorsRef.current.length > 0) {
      oscillatorsRef.current.forEach((osc) => {
        try {
          osc.stop();
          osc.disconnect();
        } catch (e) {}
      });
      oscillatorsRef.current = [];
    }
    if (audioContextRef.current) {
      try {
        audioContextRef.current.close();
      } catch (e) {}
      audioContextRef.current = null;
    }
    setIsAmbientPlaying(false);
  };

  useEffect(() => {
    return () => {
      stopAmbientSound();
    };
  }, []);

  const moodAdvice: Record<string, { title: string; desc: string; color: string }> = {
    happy: {
      title: 'Tuyệt vời! Hãy lan tỏa niềm vui đến bạn bè',
      desc: 'Một nụ cười và lời hỏi thăm ấm áp của em có thể thắp sáng cả ngày của một người bạn khác trong lớp!',
      color: 'bg-emerald-50 border-emerald-200 text-emerald-900',
    },
    calm: {
      title: 'Tâm trạng ổn định và bình yên',
      desc: 'Hãy duy trì sự tập trung tích cực và dành thời gian đọc thêm các bài học an toàn để làm giàu kỹ năng sống.',
      color: 'bg-sky-50 border-sky-200 text-sky-900',
    },
    anxious: {
      title: 'Em đang cảm thấy lo âu hoặc bất an?',
      desc: 'Hãy thực hiện 3 chu kỳ thở 4-7-8 bên dưới. Đừng quên chia sẻ nỗi lo với Thầy Cô hoặc hỏi Trợ lý AI để được hướng dẫn nhé.',
      color: 'bg-amber-50 border-amber-200 text-amber-900',
    },
    angry: {
      title: 'Cảm giác tức giận hoặc bực bội',
      desc: 'Hãy dừng lại 10 giây trước khi phản ứng. Uống một ngụm nước và không nhắn tin hay hành động trong lúc cơn giận đang cao trào.',
      color: 'bg-rose-50 border-rose-200 text-rose-900',
    },
    sad: {
      title: 'Bạn không hề đơn độc khi gặp chuyện buồn',
      desc: 'Mọi khó khăn đều sẽ qua đi. Hãy cho phép bản thân nghỉ ngơi và tìm đến những người bạn đáng tin cậy hoặc Thầy Cô để được lắng nghe.',
      color: 'bg-purple-50 border-purple-200 text-purple-900',
    },
  };

  return (
    <div id="view-safe-corner" className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-sky-700 text-white rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold backdrop-blur-xs">
            <Heart className="w-3.5 h-3.5 fill-current text-rose-300" />
            <span>GÓC AN TOÀN & THƯ GIÃN TÂM TRÍ</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            Nơi Nuôi Dưỡng Sự Bình Yên
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100 max-w-xl">
            Giải tỏa cảm xúc tiêu cực, điều hòa nhịp thở và nạp lại năng lượng tích cực mỗi ngày.
          </p>
        </div>

        {/* Ambient Audio Button */}
        <button
          onClick={toggleAmbientSound}
          className={`px-4 py-3 rounded-2xl font-bold text-xs transition shadow-md flex items-center gap-2 cursor-pointer self-start sm:self-auto ${
            isAmbientPlaying
              ? 'bg-amber-400 text-slate-900 animate-pulse'
              : 'bg-white/20 hover:bg-white/30 text-white backdrop-blur-xs'
          }`}
        >
          {isAmbientPlaying ? (
            <>
              <VolumeX className="w-4 h-4" />
              <span>Tắt nhạc thiền</span>
            </>
          ) : (
            <>
              <Volume2 className="w-4 h-4" />
              <span>Bật âm thanh 432Hz</span>
            </>
          )}
        </button>
      </div>

      {/* Grid: 4-7-8 Breathing Circle Visualizer & Mood Check-In */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Module 1: 4-7-8 Breathing Trainer */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs flex flex-col items-center justify-between text-center space-y-6">
          <div className="w-full text-left border-b border-slate-100 pb-3 flex items-center justify-between">
            <div>
              <h3 className="font-black text-sm text-slate-900 flex items-center gap-1.5">
                <Wind className="w-4 h-4 text-sky-600" />
                KỸ THUẬT THỞ ĐIỀU HÒA 4-7-8
              </h3>
              <p className="text-[11px] text-slate-500">
                Phương pháp y khoa giúp hạ nhịp tim và kiểm soát cơn giận
              </p>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-50 text-sky-700">
              Đã hoàn thành: {completedCycles} vòng
            </span>
          </div>

          {/* Interactive Breathing Circle */}
          <div className="relative w-52 h-52 flex items-center justify-center my-2 select-none">
            {/* Outer Ripple Circle */}
            <div
              className={`absolute rounded-full transition-all duration-1000 ${
                breathPhase === 'inhale'
                  ? 'w-48 h-48 bg-sky-100 border-2 border-sky-300 scale-110'
                  : breathPhase === 'hold'
                  ? 'w-48 h-48 bg-amber-100 border-2 border-amber-300 scale-105 animate-pulse'
                  : 'w-36 h-36 bg-emerald-100 border-2 border-emerald-300 scale-90'
              }`}
            />

            {/* Inner Core Circle */}
            <div
              className={`relative z-10 w-36 h-36 rounded-full flex flex-col items-center justify-center text-white font-black shadow-lg transition-all duration-700 ${
                breathPhase === 'inhale'
                  ? 'bg-gradient-to-tr from-sky-600 to-blue-600'
                  : breathPhase === 'hold'
                  ? 'bg-gradient-to-tr from-amber-500 to-orange-500'
                  : 'bg-gradient-to-tr from-emerald-600 to-teal-600'
              }`}
            >
              <span className="text-3xl font-black">{timerSeconds}s</span>
              <span className="text-[11px] uppercase tracking-wider font-bold mt-1">
                {breathPhase === 'inhale'
                  ? '🌬️ HÍT VÀO'
                  : breathPhase === 'hold'
                  ? '⏸️ GIỮ HƠI'
                  : '😮 THỞ RA'}
              </span>
            </div>
          </div>

          {/* Step Guide Bar */}
          <div className="w-full grid grid-cols-3 gap-1.5 text-center text-[10px] font-bold">
            <div
              className={`p-2 rounded-xl border ${
                breathPhase === 'inhale' && isBreathingActive
                  ? 'bg-sky-50 border-sky-400 text-sky-900 font-black'
                  : 'bg-slate-50 border-slate-200 text-slate-500'
              }`}
            >
              1. Hít mũi (4s)
            </div>
            <div
              className={`p-2 rounded-xl border ${
                breathPhase === 'hold' && isBreathingActive
                  ? 'bg-amber-50 border-amber-400 text-amber-900 font-black'
                  : 'bg-slate-50 border-slate-200 text-slate-500'
              }`}
            >
              2. Giữ hơi (7s)
            </div>
            <div
              className={`p-2 rounded-xl border ${
                breathPhase === 'exhale' && isBreathingActive
                  ? 'bg-emerald-50 border-emerald-400 text-emerald-900 font-black'
                  : 'bg-slate-50 border-slate-200 text-slate-500'
              }`}
            >
              3. Thở miệng (8s)
            </div>
          </div>

          {/* Action Buttons */}
          <div className="w-full flex gap-2">
            <button
              onClick={toggleBreathing}
              className={`flex-1 py-3 rounded-2xl font-bold text-xs transition shadow-xs flex items-center justify-center gap-1.5 cursor-pointer ${
                isBreathingActive
                  ? 'bg-amber-500 hover:bg-amber-600 text-white'
                  : 'bg-sky-600 hover:bg-sky-700 text-white'
              }`}
            >
              {isBreathingActive ? (
                <>
                  <Pause className="w-4 h-4" />
                  <span>Tạm dừng</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  <span>Bắt đầu thở 4-7-8</span>
                </>
              )}
            </button>
            <button
              onClick={resetBreathing}
              className="p-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
              title="Đặt lại bài tập"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Module 2: Daily Mood Check-In & Emotional Support */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-black text-sm text-slate-900 flex items-center gap-1.5">
              <Smile className="w-4 h-4 text-emerald-600" />
              HÔM NAY TÂM TRẠNG CỦA EM THẾ NÀO?
            </h3>
            <p className="text-[11px] text-slate-500">
              Chọn một biểu tượng phản ánh đúng cảm xúc hiện tại của em
            </p>
          </div>

          {/* Mood Buttons Grid */}
          <div className="grid grid-cols-5 gap-2">
            {[
              { id: 'happy', label: 'Vui vẻ', emoji: '😄', icon: Smile, color: 'hover:bg-emerald-50 text-emerald-600' },
              { id: 'calm', label: 'Bình yên', emoji: '😌', icon: Meh, color: 'hover:bg-sky-50 text-sky-600' },
              { id: 'anxious', label: 'Lo âu', emoji: '😰', icon: CloudRain, color: 'hover:bg-amber-50 text-amber-600' },
              { id: 'angry', label: 'Tức giận', emoji: '😡', icon: Flame, color: 'hover:bg-rose-50 text-rose-600' },
              { id: 'sad', label: 'Buồn bã', emoji: '😢', icon: Frown, color: 'hover:bg-purple-50 text-purple-600' },
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => setSelectedMood(m.id)}
                className={`p-3 rounded-2xl border transition flex flex-col items-center justify-center gap-1 cursor-pointer ${
                  selectedMood === m.id
                    ? 'border-blue-600 bg-blue-50/60 shadow-xs scale-105 font-black'
                    : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
                }`}
              >
                <span className="text-2xl">{m.emoji}</span>
                <span className="text-[10px] font-bold">{m.label}</span>
              </button>
            ))}
          </div>

          {/* Personalized Emotional Advice Box */}
          <div className="flex-1 flex items-center justify-center">
            {selectedMood && moodAdvice[selectedMood] ? (
              <div
                className={`p-4 rounded-2xl border text-xs leading-relaxed space-y-1 w-full animate-in fade-in ${moodAdvice[selectedMood].color}`}
              >
                <h4 className="font-black text-sm">
                  {moodAdvice[selectedMood].title}
                </h4>
                <p className="font-medium text-slate-700">
                  {moodAdvice[selectedMood].desc}
                </p>
              </div>
            ) : (
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/60 text-center text-xs text-slate-400 space-y-1 w-full">
                <Sparkles className="w-6 h-6 text-slate-300 mx-auto" />
                <p className="font-bold text-slate-600">Lắng nghe cảm xúc bản thân</p>
                <p className="text-[11px]">Bấm vào một cảm xúc ở trên để nhận lời nhắn gửi yêu thương.</p>
              </div>
            )}
          </div>

          {/* Inspirational Thought of the day */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 text-xs text-amber-900 space-y-0.5">
            <span className="font-black flex items-center gap-1 text-[11px] uppercase tracking-wider text-amber-700">
              <Lightbulb className="w-3.5 h-3.5" /> Lời nhắc nhở hôm nay:
            </span>
            <p className="italic font-medium">
              "Giá trị của bạn không phụ thuộc vào lời chê bai của người khác. Bạn xứng đáng được đối xử tôn trọng và an toàn!"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
