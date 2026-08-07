
import React, { useState, useEffect, useRef } from 'react';
import { StudentInfo, TextUnit, EvaluationResults, QualitativeData, Grade, TextType } from './types';
import { INITIAL_TEXTS, PPM_THRESHOLDS, INTERVENTION_STRATEGIES, GRADE_LABELS } from './constants';

// --- Utils ---
const getLocalStorageTexts = (): TextUnit[] => {
  const stored = localStorage.getItem('evaluator_texts');
  if (stored) return JSON.parse(stored);
  return INITIAL_TEXTS;
};

const saveLocalStorageTexts = (texts: TextUnit[]) => {
  localStorage.setItem('evaluator_texts', JSON.stringify(texts));
};

const getSavedEvaluator = (): string => {
  return localStorage.getItem('evaluator_name') || '';
};

// --- Sub-components ---

const Header: React.FC<{ onOpenLibrary: () => void, onReset: () => void, evaluator?: string }> = ({ onOpenLibrary, onReset, evaluator }) => (
  <header className="bg-white border-b border-orange-200 py-6 px-4 no-print">
    <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
      <button 
        onClick={onReset}
        className="flex items-center gap-3 hover:opacity-80 transition-opacity text-left"
      >
        <div className="bg-orange-600 p-2 rounded-lg">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18 18.246 18.168 16.5 18.168 14.754 18.168 13.168 18.477 12 19.253" />
          </svg>
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-900 leading-tight">Seguimiento de la fluidez lectora</h1>
        </div>
      </button>
      <div className="flex items-center gap-6">
        {evaluator && (
          <div className="text-right">
            <span className="block text-[10px] uppercase font-bold text-orange-400">Profesional / Docente</span>
            <span className="text-sm font-bold text-slate-700">{evaluator}</span>
          </div>
        )}
        <button 
          onClick={onOpenLibrary}
          className="text-sm font-bold text-emerald-600 hover:text-emerald-800 transition-colors flex items-center gap-1"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
          Biblioteca
        </button>
      </div>
    </div>
  </header>
);

const Footer: React.FC = () => (
  <footer className="mt-12 py-8 px-4 border-t border-orange-100 text-center text-slate-500 text-[11px] leading-relaxed no-print">
    <p className="mb-2 font-bold text-slate-600">Hecho con ❤️ por Lic. psp Silvia Ojeda y un Asistente de IA.</p>
    <div className="max-w-3xl mx-auto opacity-75 italic">
      <p>Las referencias escolares están tomadas de Ripoll, J. C., Tapia, M. M., y Aguado, G. (2020). Velocidad lectora en alumnado hispanohablante: un meta-análisis. Revista de Psicodidáctica, 25(2), 158-165. Las referencias de adultos, de Brisbaert, M. (2019). How many words do we read per minute? A review and meta-analysis of reading rate. Journal of Memory and Language, 109, 104047.</p>
    </div>
  </footer>
);

export default function App() {
  const [step, setStep] = useState<number>(0); 
  const [studentInfo, setStudentInfo] = useState<StudentInfo>(() => ({
    name: '', 
    age: 6, 
    grade: '1', 
    date: new Date().toISOString().split('T')[0], 
    evaluator: getSavedEvaluator()
  }));
  const [texts, setTexts] = useState<TextUnit[]>(getLocalStorageTexts());
  const [selectedText, setSelectedText] = useState<TextUnit | null>(null);
  const [evaluation, setEvaluation] = useState<EvaluationResults | null>(null);

  useEffect(() => {
    saveLocalStorageTexts(texts);
  }, [texts]);

  const reset = () => { 
    setStep(0); 
    setEvaluation(null); 
    setSelectedText(null);
    // Limpiar datos del alumno pero mantener evaluador
    setStudentInfo(prev => ({
      ...prev,
      name: '',
      age: 6,
      grade: '1',
      date: new Date().toISOString().split('T')[0]
    }));
  };

  const handleStartSetup = () => {
    // Al iniciar, nos aseguramos que el nombre del alumno esté vacío
    setStudentInfo(prev => ({
      ...prev,
      name: '',
      age: 6,
      grade: '1',
      date: new Date().toISOString().split('T')[0]
    }));
    setStep(1);
  };

  const handleStudentSubmit = (info: StudentInfo) => { 
    // Guardar nombre del evaluador para futuras sesiones
    localStorage.setItem('evaluator_name', info.evaluator);
    setStudentInfo(info); 
    setStep(2); 
  };
  
  const handleTextSelect = (text: TextUnit) => { setSelectedText(text); setStep(3); };

  const handleReadingComplete = (seconds: number) => {
    const ppm = Math.round((selectedText!.wordCount / (seconds || 1)) * 60);
    const thresholds = PPM_THRESHOLDS[studentInfo.grade];
    let performance: 'BAJA' | 'MEDIA' | 'ALTA' = 'MEDIA';
    if (ppm < thresholds.low) performance = 'BAJA';
    else if (ppm > thresholds.high) performance = 'ALTA';

    setEvaluation({
      seconds, ppm, performance,
      qualitative: {
        speed: performance === 'BAJA' ? 'Lenta' : 'Adecuada',
        expression: 'Ritmo y entonación',
        precision: 'Sin errores',
        errorCount: 0,
        aspectosCualitativos: {
          semanticas: false, visuales: false, literales: false, derivacionales: false, omisiones: false, adiciones: false
        },
        rhythm: { 
          pausesCorrectly: true,
          noRespectsPunctuation: false,
          repeatsWords: false, 
          hesitation: false 
        },
        comprehension: { 
          answersQuestions: true, 
          deducesWords: true, 
          elaboratesQuestions: false, 
          forgetsInfo: false, 
          difficultyResponding: false, 
          doesntUnderstandWords: false 
        },
        observations: ''
      }
    });
    setStep(4);
  };

  const handleQualitativeSubmit = (data: QualitativeData) => {
    setEvaluation(prev => prev ? { ...prev, qualitative: data } : null);
    setStep(5);
  };

  const updateTexts = (newTexts: TextUnit[]) => setTexts(newTexts);

  return (
    <div className="flex flex-col min-h-screen bg-orange-50/30">
      <Header onOpenLibrary={() => setStep(6)} onReset={reset} evaluator={studentInfo.evaluator} />
      
      <main className="flex-grow max-w-5xl mx-auto w-full px-4 py-8">
        {step === 0 && <WelcomeView onStart={handleStartSetup} />}
        {step === 1 && <SetupView initialData={studentInfo} onSubmit={handleStudentSubmit} />}
        {step === 2 && <SelectionView grade={studentInfo.grade} texts={texts} onSelect={handleTextSelect} onBack={() => setStep(1)} />}
        {step === 3 && selectedText && <ReadingTimerView text={selectedText} grade={studentInfo.grade} onComplete={handleReadingComplete} onBack={() => setStep(2)} />}
        {step === 4 && evaluation && <QualitativeChecklist initialData={evaluation.qualitative} grade={studentInfo.grade} onSubmit={handleQualitativeSubmit} />}
        {step === 5 && evaluation && selectedText && (
          <ReportView student={studentInfo} text={selectedText} results={evaluation} onReset={reset} />
        )}
        {step === 6 && <LibraryView texts={texts} onUpdate={updateTexts} onBack={() => setStep(0)} />}
      </main>

      <Footer />
    </div>
  );
}

// --- Views ---

const WelcomeView: React.FC<{ onStart: () => void }> = ({ onStart }) => (
  <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-orange-100 max-w-2xl mx-auto">
    <div className="text-center mb-10">
      <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg className="w-10 h-10 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h2 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">Seguimiento de la Fluidez Lectora</h2>
      <p className="text-slate-600 mb-8 text-lg leading-relaxed">
        Una herramienta integral para psicopedagogos y docentes diseñada para realizar seguimiento de la fluidez lectora en estudiantes de primaria (1º a adultos).
      </p>
      
      <button onClick={onStart} className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 px-10 rounded-xl transition-all shadow-lg active:scale-95">
        Comenzar Nuevo Registro
      </button>
    </div>

    <div className="border-t border-slate-100 pt-8">
      <h3 className="text-sm font-black uppercase text-emerald-600 mb-6 flex items-center gap-2">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18 18.246 18.168 16.5 18.168 14.754 18.168 13.168 18.477 12 19.253" /></svg>
        Tutorial de Uso y Baremos (Ripoll 2020)
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-6">
        <div className="flex gap-3">
          <span className="flex-shrink-0 w-6 h-6 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center font-bold text-xs">1</span>
          <p className="text-slate-600"><span className="font-bold text-slate-800">Carga:</span> Ingrese datos del alumno y evaluador.</p>
        </div>
        <div className="flex gap-3">
          <span className="flex-shrink-0 w-6 h-6 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center font-bold text-xs">2</span>
          <p className="text-slate-600"><span className="font-bold text-slate-800">Lectura:</span> Inicie el cronómetro al comenzar la lectura.</p>
        </div>
      </div>
      <div className="bg-orange-50/50 p-4 rounded-xl text-[10px] text-slate-500 italic leading-snug">
        <p>Referencias académicas: Ripoll, J. C., Tapia, M. M., y Aguado, G. (2020). Velocidad lectora en alumnado hispanohablante: un meta-análisis. Revista de Psicodidáctica, 25(2), 158-165. Adultos: Brisbaert, M. (2019).</p>
      </div>
    </div>
  </div>
);

const SetupView: React.FC<{ initialData: StudentInfo, onSubmit: (data: StudentInfo) => void }> = ({ initialData, onSubmit }) => {
  const [data, setData] = useState(initialData);
  const grades: Grade[] = ['1','2','3','4','5','6','7','8','9','10','11','Adultos'];
  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-orange-100">
      <h2 className="text-2xl font-bold mb-6 text-slate-800 flex items-center gap-2">Configuración Inicial</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Nombre Completo del Estudiante</label>
          <input type="text" className="w-full p-3 border border-slate-200 rounded-lg outline-none focus:border-orange-500" value={data.name} onChange={e => setData({...data, name: e.target.value})} placeholder="Ej: Juan Pérez" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Edad</label>
            <input type="number" className="w-full p-3 border border-slate-200 rounded-lg focus:border-orange-500" value={data.age} onChange={e => setData({...data, age: parseInt(e.target.value)})} />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Curso Escolar</label>
            <select className="w-full p-3 border border-slate-200 rounded-lg bg-white focus:border-orange-500" value={data.grade} onChange={e => setData({...data, grade: e.target.value as Grade})}>
              {grades.map(g => <option key={g} value={g}>{GRADE_LABELS[g]}</option>)}
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Fecha</label>
          <input type="date" className="w-full p-3 border border-slate-200 rounded-lg focus:border-orange-500" value={data.date} onChange={e => setData({...data, date: e.target.value})} />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Nombre del Profesional / Docente</label>
          <input type="text" className="w-full p-3 border border-slate-200 rounded-lg focus:border-orange-500" value={data.evaluator} onChange={e => setData({...data, evaluator: e.target.value})} placeholder="Nombre y apellido" />
        </div>
      </div>
      <button disabled={!data.name || !data.evaluator} onClick={() => onSubmit(data)} className="w-full mt-8 bg-orange-600 hover:bg-orange-700 disabled:bg-slate-300 text-white font-bold py-3 rounded-lg shadow-md transition-all">
        Seleccionar Texto de Lectura
      </button>
    </div>
  );
};

const SelectionView: React.FC<{ grade: Grade, texts: TextUnit[], onSelect: (t: TextUnit) => void, onBack: () => void }> = ({ grade, texts, onSelect, onBack }) => {
  const filteredTexts = texts.filter(t => t.grade === grade);
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="p-2 hover:bg-orange-100 rounded-full transition-colors text-orange-400">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" /></svg>
        </button>
        <h2 className="text-2xl font-bold text-slate-800">Selección de Texto ({GRADE_LABELS[grade]})</h2>
      </div>
      {filteredTexts.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-dashed border-orange-300">
          <p className="text-slate-500 mb-4">No hay textos cargados para este nivel.</p>
          <p className="text-xs text-slate-400">Vaya a la Biblioteca de Textos para añadir uno.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {filteredTexts.map((text) => (
            <div key={text.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/20 transition-all cursor-pointer" onClick={() => onSelect(text)}>
              <div className="flex justify-between items-start mb-4">
                <span className="bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded">{text.type}</span>
                <span className="text-slate-400 text-xs">{text.wordCount} palabras</span>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">{text.title}</h3>
              <p className="text-slate-500 text-sm italic">"{text.content.substring(0, 80)}..."</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const ReadingTimerView: React.FC<{ text: TextUnit, grade: Grade, onComplete: (s: number) => void, onBack: () => void }> = ({ text, grade, onComplete, onBack }) => {
  const [isActive, setIsActive] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const timerRef = useRef<number | null>(null);

  const toggleTimer = () => {
    if (isActive) {
      if (timerRef.current) window.clearInterval(timerRef.current);
      onComplete(seconds);
    } else {
      setIsActive(true);
      timerRef.current = window.setInterval(() => setSeconds(s => s + 1), 1000);
    }
  };

  const handleSpeak = () => {
    if (isSpeaking) {
      window.speechSynthesis?.cancel();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text.content);
        utterance.lang = 'es-AR';
        utterance.rate = 0.9;
        const voices = window.speechSynthesis.getVoices();
        const arVoice = voices.find(v => v.lang === 'es-AR') || 
                        voices.find(v => v.lang.includes('es-419')) ||
                        voices.find(v => v.lang.includes('es-MX')) ||
                        voices.find(v => v.lang.startsWith('es'));
        if (arVoice) utterance.voice = arVoice;
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);
        window.speechSynthesis.speak(utterance);
      }
    }
  };

  // 1º a 6º en mayúsculas, el resto minúsculas
  const isUpperCase = !['7','8','9','10','11','Adultos'].includes(grade);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6 sticky top-0 bg-orange-50/30 py-4 z-10 border-b border-orange-100">
        <div className="flex items-center gap-4">
          <button onClick={onBack} disabled={isActive} className="p-2 hover:bg-orange-100 rounded-full transition-colors text-orange-400 disabled:opacity-30">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" /></svg>
          </button>
          <h2 className="text-xl font-bold text-slate-700">{text.title}</h2>
        </div>
        <div className="flex items-center gap-4 flex-wrap justify-end">
          <button 
            onClick={handleSpeak}
            title="Escuchar texto leído con acento argentino / español latino"
            className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition-all ${isSpeaking ? 'bg-amber-100 text-amber-900 border-amber-300 animate-pulse' : 'bg-white text-slate-700 border-slate-200 hover:bg-orange-50'}`}
          >
            <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            </svg>
            {isSpeaking ? 'Detener Voz' : 'Escuchar (Voz AR)'}
          </button>
          <div className="text-4xl font-mono font-bold text-slate-900">{Math.floor(seconds / 60)}:{(seconds % 60).toString().padStart(2, '0')}</div>
          <button onClick={toggleTimer} className={`px-8 py-3 rounded-full font-bold text-lg shadow-lg transition-all ${isActive ? 'bg-red-500 text-white' : 'bg-emerald-600 text-white'}`}>
            {isActive ? 'Detener' : 'Iniciar'}
          </button>
        </div>
      </div>
      <div className={`bg-white p-8 md:p-12 rounded-3xl shadow-lg border border-slate-200 text-slate-900 leading-loose text-3xl font-dyslexic select-none ${isUpperCase ? 'uppercase' : ''}`}>
        {text.content}
      </div>
    </div>
  );
};

const QualitativeChecklist: React.FC<{ initialData: QualitativeData, grade: Grade, onSubmit: (d: QualitativeData) => void }> = ({ initialData, grade, onSubmit }) => {
  const [data, setData] = useState(initialData);
  const thresholds = PPM_THRESHOLDS[grade];

  const handlePrecisionChange = (v: any) => {
    let count = data.errorCount;
    if (v === 'Sin errores') count = 0;
    // Autocompletado lógico al seleccionar categoría
    if (v === 'Pocos errores' && count === 0) count = 3;
    if (v === 'Muchos errores' && count <= 3) count = 4;
    setData({...data, precision: v, errorCount: count});
  };

  const handleErrorCountChange = (count: number) => {
    let precision: QualitativeData['precision'] = 'Sin errores';
    if (count === 0) precision = 'Sin errores';
    else if (count <= 3) precision = 'Pocos errores';
    else precision = 'Muchos errores';
    setData({...data, errorCount: count, precision});
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border border-orange-100 overflow-hidden">
      <div className="bg-orange-600 text-white p-6"><h2 className="text-2xl font-bold">Ficha de Observación Digital</h2></div>
      <div className="p-8 space-y-10">
        <div className="grid md:grid-cols-3 gap-8">
          <section>
            <h3 className="text-xs font-bold text-orange-400 uppercase tracking-wider mb-2 border-b pb-1">🔹 Velocidad</h3>
            <p className="text-[10px] text-slate-400 mb-3 italic">Rango esperado para {GRADE_LABELS[grade]}: {thresholds.low} - {thresholds.high} PPM</p>
            {['Lenta', 'Adecuada'].map(v => (
              <label key={v} className="flex items-center gap-3 cursor-pointer mb-2">
                <input type="radio" checked={data.speed === v} onChange={() => setData({...data, speed: v as any})} className="w-5 h-5 text-emerald-600" />
                <span className="text-sm font-medium">{v}</span>
              </label>
            ))}
          </section>
          <section>
            <h3 className="text-xs font-bold text-orange-400 uppercase tracking-wider mb-2 border-b pb-1">🔹 Expresión</h3>
            <div className="mt-7">
              {['Lee con ritmo y entonación', 'Lee con tono monótono'].map(v => (
                <label key={v} className="flex items-center gap-3 cursor-pointer mb-2">
                  <input type="radio" checked={data.expression === v} onChange={() => setData({...data, expression: v as any})} className="w-5 h-5 text-emerald-600" />
                  <span className="text-sm font-medium">{v}</span>
                </label>
              ))}
            </div>
          </section>
          <section>
            <h3 className="text-xs font-bold text-orange-400 uppercase tracking-wider mb-2 border-b pb-1">🔹 Precisión</h3>
            <div className="mt-7">
              {['Sin errores', 'Pocos errores', 'Muchos errores'].map(v => (
                <label key={v} className="flex items-center gap-3 cursor-pointer mb-2">
                  <input type="radio" checked={data.precision === v} onChange={() => handlePrecisionChange(v)} className="w-5 h-5 text-emerald-600" />
                  <span className="text-sm font-medium">{v}</span>
                </label>
              ))}
              <div className="mt-3 flex items-center gap-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Cantidad de errores:</span>
                <input 
                  type="number" 
                  min="0"
                  className="w-16 border-b border-slate-300 outline-none focus:border-orange-500 text-center text-sm font-bold"
                  value={data.errorCount}
                  onChange={e => handleErrorCountChange(parseInt(e.target.value) || 0)}
                />
              </div>
            </div>
          </section>
        </div>

        <div className="border-t pt-8">
          <h3 className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-4 border-b pb-2">🔹 Aspectos Cualitativos a Considerar</h3>
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
            <label className="flex items-start gap-2 text-sm cursor-pointer">
              <input type="checkbox" checked={data.aspectosCualitativos.semanticas} onChange={e => setData({...data, aspectosCualitativos: {...data.aspectosCualitativos, semanticas: e.target.checked}})} className="w-4 h-4 mt-1 text-orange-600" /> 
              <div><span className="font-bold">Sustituciones semánticas:</span> Cambio de palabra por otra del mismo campo. Ej: camión por camionero.</div>
            </label>
            <label className="flex items-start gap-2 text-sm cursor-pointer">
              <input type="checkbox" checked={data.aspectosCualitativos.visuales} onChange={e => setData({...data, aspectosCualitativos: {...data.aspectosCualitativos, visuales: e.target.checked}})} className="w-4 h-4 mt-1 text-orange-600" /> 
              <div><span className="font-bold">Sustituciones visuales:</span> Cambio por palabra visualmente semejante. Ej: vaso por paso.</div>
            </label>
            <label className="flex items-start gap-2 text-sm cursor-pointer">
              <input type="checkbox" checked={data.aspectosCualitativos.literales} onChange={e => setData({...data, aspectosCualitativos: {...data.aspectosCualitativos, literales: e.target.checked}})} className="w-4 h-4 mt-1 text-orange-600" /> 
              <div><span className="font-bold">Sustituciones literales:</span> Cambio de letra resultando en no palabra. Ej: carozo por caroto.</div>
            </label>
            <label className="flex items-start gap-2 text-sm cursor-pointer">
              <input type="checkbox" checked={data.aspectosCualitativos.derivacionales} onChange={e => setData({...data, aspectosCualitativos: {...data.aspectosCualitativos, derivacionales: e.target.checked}})} className="w-4 h-4 mt-1 text-orange-600" /> 
              <div><span className="font-bold">Sustituciones derivacionales:</span> Modificación de la derivación. Ej: llamaban por llamó.</div>
            </label>
            <label className="flex items-start gap-2 text-sm cursor-pointer">
              <input type="checkbox" checked={data.aspectosCualitativos.omisiones} onChange={e => setData({...data, aspectosCualitativos: {...data.aspectosCualitativos, omisiones: e.target.checked}})} className="w-4 h-4 mt-1 text-orange-600" /> 
              <div><span className="font-bold">Omisiones:</span> De letra o segmento de palabra. Ej: todo por todos.</div>
            </label>
            <label className="flex items-start gap-2 text-sm cursor-pointer">
              <input type="checkbox" checked={data.aspectosCualitativos.adiciones} onChange={e => setData({...data, aspectosCualitativos: {...data.aspectosCualitativos, adiciones: e.target.checked}})} className="w-4 h-4 mt-1 text-orange-600" /> 
              <div><span className="font-bold">Adiciones:</span> Incremento de letra o palabra. Ej: ramo por ramol.</div>
            </label>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 border-t pt-8">
          <section>
            <h3 className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-4 border-b pb-2">🔹 Ritmo</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm cursor-pointer"><input type="checkbox" checked={data.rhythm.pausesCorrectly} onChange={e => setData({...data, rhythm: {...data.rhythm, pausesCorrectly: e.target.checked}})} className="w-4 h-4 text-orange-600" /> Pausa correctamente en signos de puntuación</label>
              <label className="flex items-center gap-2 text-sm cursor-pointer"><input type="checkbox" checked={data.rhythm.noRespectsPunctuation} onChange={e => setData({...data, rhythm: {...data.rhythm, noRespectsPunctuation: e.target.checked}})} className="w-4 h-4 text-orange-600" /> No respeta la puntuación</label>
              <label className="flex items-center gap-2 text-sm cursor-pointer"><input type="checkbox" checked={data.rhythm.repeatsWords} onChange={e => setData({...data, rhythm: {...data.rhythm, repeatsWords: e.target.checked}})} className="w-4 h-4 text-orange-600" /> Repite palabras</label>
              <label className="flex items-center gap-2 text-sm cursor-pointer"><input type="checkbox" checked={data.rhythm.hesitation} onChange={e => setData({...data, rhythm: {...data.rhythm, hesitation: e.target.checked}})} className="w-4 h-4 text-orange-600" /> Vacila (repite la primera sílaba)</label>
            </div>
          </section>
          <section>
            <h3 className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-4 border-b pb-2">🔹 Comprensión</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm cursor-pointer"><input type="checkbox" checked={data.comprehension.answersQuestions} onChange={e => setData({...data, comprehension: {...data.comprehension, answersQuestions: e.target.checked}})} className="w-4 h-4 text-orange-600" /> Puede responder preguntas sobre el texto</label>
              <label className="flex items-center gap-2 text-sm cursor-pointer"><input type="checkbox" checked={data.comprehension.deducesWords} onChange={e => setData({...data, comprehension: {...data.comprehension, deducesWords: e.target.checked}})} className="w-4 h-4 text-orange-600" /> Deduce palabras nuevas</label>
              <label className="flex items-center gap-2 text-sm cursor-pointer"><input type="checkbox" checked={data.comprehension.elaboratesQuestions} onChange={e => setData({...data, comprehension: {...data.comprehension, elaboratesQuestions: e.target.checked}})} className="w-4 h-4 text-orange-600" /> Elabora preguntas sobre lo leído</label>
              <label className="flex items-center gap-2 text-sm cursor-pointer"><input type="checkbox" checked={data.comprehension.forgetsInfo} onChange={e => setData({...data, comprehension: {...data.comprehension, forgetsInfo: e.target.checked}})} className="w-4 h-4 text-orange-600" /> No recuerda información relevante</label>
              <label className="flex items-center gap-2 text-sm cursor-pointer"><input type="checkbox" checked={data.comprehension.difficultyResponding} onChange={e => setData({...data, comprehension: {...data.comprehension, difficultyResponding: e.target.checked}})} className="w-4 h-4 text-orange-600" /> Tiene dificultad para responder preguntas</label>
              <label className="flex items-center gap-2 text-sm cursor-pointer"><input type="checkbox" checked={data.comprehension.doesntUnderstandWords} onChange={e => setData({...data, comprehension: {...data.comprehension, doesntUnderstandWords: e.target.checked}})} className="w-4 h-4 text-orange-600" /> No comprende algunas palabras</label>
            </div>
          </section>
        </div>

        <div className="border-t pt-8">
           <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Otras observaciones</h3>
           <input 
              type="text" 
              className="w-full border-b border-slate-300 outline-none focus:border-orange-500 py-2 text-sm placeholder:italic"
              placeholder="Escriba aquí observaciones adicionales..."
              value={data.observations}
              onChange={e => setData({...data, observations: e.target.value})}
           />
        </div>

        <button onClick={() => onSubmit(data)} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all active:scale-95">Generar Registro Detallado</button>
      </div>
    </div>
  );
};

const ReportView: React.FC<{ student: StudentInfo, text: TextUnit, results: EvaluationResults, onReset: () => void }> = ({ student, text, results, onReset }) => {
  const isProfileAdequate = results.qualitative.speed === 'Adecuada' && results.performance !== 'BAJA';

  const getConclusion = () => {
    if (results.performance === 'ALTA') return 'Nivel de fluidez destacado. Automatización léxica sólida conforme a baremos Ripoll et al. (2020).';
    if (results.performance === 'MEDIA') return 'Fluidez adecuada dentro de los parámetros esperados para el nivel escolar.';
    return 'Se observa una fluidez por debajo de lo esperado (Baremo Ripoll 2020). Se recomienda intervención.';
  };

  const handleDownloadPDF = () => {
    const element = document.getElementById('report-to-download');
    if (!element) return;

    const opt = {
      margin:       [0.5, 0.5, 0.5, 0.5],
      filename:     `Registro_Fluidez_${student.name.replace(/\s+/g, '_')}_${student.date}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true, letterRendering: true },
      jsPDF:        { unit: 'cm', format: 'a4', orientation: 'portrait' }
    };

    // @ts-ignore
    if (window.html2pdf) {
      // @ts-ignore
      window.html2pdf().set(opt).from(element).save();
    } else {
      window.print();
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="flex justify-between items-center no-print">
        <button onClick={onReset} className="text-emerald-600 font-bold hover:text-emerald-700 transition-colors flex items-center gap-1">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 0118 0z" /></svg>
          Nuevo Registro
        </button>
        <button onClick={handleDownloadPDF} className="bg-orange-600 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:bg-orange-700 flex items-center gap-2 transition-all">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Descargar Registro (PDF)
        </button>
      </div>

      <div id="report-to-download" className="bg-white p-10 rounded-2xl shadow-xl border border-orange-100 print:shadow-none print:border-none print:p-0">
        <div className="border-b-2 border-slate-900 pb-4 mb-6 flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Registro de Fluidez Lectora</h2>
            <p className="text-sm font-bold text-orange-600">Basado en Baremos Ripoll et al. (2020)</p>
          </div>
          <div className="text-right text-xs font-bold text-slate-400">Fecha: {new Date(student.date).toLocaleDateString('es-AR')}</div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 bg-orange-50/50 p-4 rounded-xl border border-orange-100">
          <div><span className="block text-[10px] uppercase font-bold text-orange-400">Estudiante</span><span className="font-bold">{student.name}</span></div>
          <div><span className="block text-[10px] uppercase font-bold text-orange-400">Nivel / Edad</span><span className="font-bold">{GRADE_LABELS[student.grade]} / {student.age} años</span></div>
          <div><span className="block text-[10px] uppercase font-bold text-orange-400">Evaluador</span><span className="font-bold">{student.evaluator}</span></div>
          <div><span className="block text-[10px] uppercase font-bold text-orange-400">Texto Aplicado</span><span className="font-bold italic">{text.title}</span></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white border-2 border-emerald-100 p-6 rounded-2xl text-center"><span className="text-5xl font-black text-emerald-600">{results.ppm}</span><br/><span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Palabras por Minuto (PPM)</span></div>
          <div className="bg-white border-2 border-emerald-100 p-6 rounded-2xl text-center flex flex-col items-center justify-center">
             <span className={`text-xl font-black mb-1 px-4 py-1 rounded-full ${results.performance === 'ALTA' ? 'bg-emerald-100 text-emerald-700' : results.performance === 'MEDIA' ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'}`}>VELOCIDAD {results.performance}</span>
          </div>
          <div className="bg-white border-2 border-emerald-100 p-6 rounded-2xl text-center"><span className="text-2xl font-black text-slate-700">{results.seconds}s</span><br/><span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tiempo de Lectura</span></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <section>
            <h3 className="text-sm font-black uppercase mb-4 border-l-4 border-emerald-600 pl-3">Perfil de Lectura</h3>
            <div className="space-y-2 text-sm bg-slate-50 p-4 rounded-lg">
              <div className="flex justify-between"><span>Velocidad:</span><span className="font-bold">{results.qualitative.speed}</span></div>
              <div className="flex justify-between"><span>Expresión:</span><span className="font-bold">{results.qualitative.expression}</span></div>
              <div className="flex justify-between"><span>Precisión:</span><span className="font-bold">{results.qualitative.precision} ({results.qualitative.errorCount} errores)</span></div>
              
              <div className="mt-2 text-[10px] font-bold text-slate-400 border-t pt-2">Aspectos Cualitativos:</div>
              <div className="text-xs text-slate-600 leading-relaxed">
                <ul className="list-disc list-inside">
                  {results.qualitative.aspectosCualitativos.semanticas && <li>Sustituciones semánticas.</li>}
                  {results.qualitative.aspectosCualitativos.visuales && <li>Sustituciones visuales.</li>}
                  {results.qualitative.aspectosCualitativos.literales && <li>Sustituciones literales.</li>}
                  {results.qualitative.aspectosCualitativos.derivacionales && <li>Sustituciones derivacionales.</li>}
                  {results.qualitative.aspectosCualitativos.omisiones && <li>Omisiones de segmentos.</li>}
                  {results.qualitative.aspectosCualitativos.adiciones && <li>Adiciones de segmentos.</li>}
                </ul>
              </div>

              <div className="mt-2 text-[10px] font-bold text-slate-400 border-t pt-2">Indicadores de Ritmo:</div>
              <div className="text-xs text-slate-600 leading-relaxed">
                <ul className="list-disc list-inside">
                  {results.qualitative.rhythm.pausesCorrectly && <li>Pausa correctamente en signos.</li>}
                  {results.qualitative.rhythm.noRespectsPunctuation && <li>No respeta la puntuación.</li>}
                  {results.qualitative.rhythm.repeatsWords && <li>Repite palabras.</li>}
                  {results.qualitative.rhythm.hesitation && <li>Vacila (repite sílabas).</li>}
                </ul>
              </div>
            </div>
          </section>
          <section>
            <h3 className="text-sm font-black uppercase mb-4 border-l-4 border-emerald-600 pl-3">Perfil de Comprensión</h3>
            <div className="space-y-2 text-sm bg-emerald-50/30 p-4 rounded-lg">
              <ul className="space-y-1">
                <li className="flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full ${results.qualitative.comprehension.answersQuestions ? 'bg-emerald-500' : 'bg-slate-200'}`}></span>
                  <span className={results.qualitative.comprehension.answersQuestions ? 'font-bold' : 'text-slate-400'}>Responde preguntas sobre el texto</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full ${results.qualitative.comprehension.deducesWords ? 'bg-emerald-500' : 'bg-slate-200'}`}></span>
                  <span className={results.qualitative.comprehension.deducesWords ? 'font-bold' : 'text-slate-400'}>Deduce palabras nuevas</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full ${results.qualitative.comprehension.elaboratesQuestions ? 'bg-emerald-500' : 'bg-slate-200'}`}></span>
                  <span className={results.qualitative.comprehension.elaboratesQuestions ? 'font-bold' : 'text-slate-400'}>Elabora preguntas sobre lo leído</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full ${results.qualitative.comprehension.forgetsInfo ? 'bg-red-400' : 'bg-slate-200'}`}></span>
                  <span className={results.qualitative.comprehension.forgetsInfo ? 'font-bold text-red-700' : 'text-slate-400'}>No recuerda información relevante</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full ${results.qualitative.comprehension.difficultyResponding ? 'bg-red-400' : 'bg-slate-200'}`}></span>
                  <span className={results.qualitative.comprehension.difficultyResponding ? 'font-bold text-red-700' : 'text-slate-400'}>Dificultad para responder</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full ${results.qualitative.comprehension.doesntUnderstandWords ? 'bg-red-400' : 'bg-slate-200'}`}></span>
                  <span className={results.qualitative.comprehension.doesntUnderstandWords ? 'font-bold text-red-700' : 'text-slate-400'}>No comprende algunas palabras</span>
                </li>
              </ul>
            </div>
            {results.qualitative.observations && (
              <div className="mt-4 p-3 bg-white border border-slate-200 rounded-lg">
                <span className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Otras observaciones</span>
                <p className="text-xs text-slate-700 leading-tight">{results.qualitative.observations}</p>
              </div>
            )}
          </section>
        </div>

        <section className="mb-10">
          <h3 className="text-sm font-black uppercase mb-4 border-l-4 border-orange-600 pl-3">Conclusión / Hipótesis</h3>
          <div className="bg-slate-900 text-white p-4 rounded-lg text-sm italic leading-relaxed">
            {getConclusion()}
          </div>
        </section>

        {!isProfileAdequate && (
          <section className="mb-10 bg-orange-50 p-6 rounded-xl border border-orange-100">
            <h3 className="text-sm font-black uppercase text-orange-900 mb-4 tracking-wider">Estrategias de Intervención Sugeridas</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {INTERVENTION_STRATEGIES.map((s, i) => (
                <div key={i} className="bg-white p-3 rounded-lg shadow-sm">
                  <h4 className="font-bold text-emerald-800 text-sm mb-1">{s.name}</h4>
                  <p className="text-[10px] text-slate-600 leading-tight">{s.desc}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="mt-8 pt-6 border-t border-slate-200">
          <div className="flex-1 mb-8">
            <span className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Profesional / Docente Responsable:</span>
            <div className="text-sm font-bold text-slate-800 border-b border-slate-300 pb-1 pr-12 min-w-[200px]">
              {student.evaluator}
            </div>
          </div>
          <div className="text-[9px] text-slate-400 leading-tight italic">
            <p>Referencia baremo: Ripoll, J. C., Tapia, M. M., y Aguado, G. (2020). Velocidad lectora en alumnado hispanohablante: un meta-análisis. Revista de Psicodidáctica, 25(2), 158-165. Las referencias de adultos, de Brisbaert, M. (2019).</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const LibraryView: React.FC<{ texts: TextUnit[], onUpdate: (t: TextUnit[]) => void, onBack: () => void }> = ({ texts, onUpdate, onBack }) => {
  const [editingText, setEditingText] = useState<Partial<TextUnit> | null>(null);
  const [filterGrade, setFilterGrade] = useState<Grade | 'all'>('all');

  const filtered = filterGrade === 'all' ? texts : texts.filter(t => t.grade === filterGrade);

  const handleDelete = (id: string) => onUpdate(texts.filter(t => t.id !== id));
  
  const handleSave = () => {
    if (!editingText?.title || !editingText?.content || !editingText?.grade || !editingText?.type) return;
    
    const wordCount = editingText.content.trim().split(/\s+/).length;
    let finalContent = editingText.content;
    const isUpperCaseGrade = !['7','8','9','10','11','Adultos'].includes(editingText.grade as string);
    if (isUpperCaseGrade) {
      finalContent = finalContent.toUpperCase();
    }

    if (editingText.id) {
      onUpdate(texts.map(t => t.id === editingText.id ? { ...t, ...editingText, content: finalContent, wordCount } as TextUnit : t));
    } else {
      const newText: TextUnit = {
        ...editingText as TextUnit,
        id: Math.random().toString(36).substr(2, 9),
        content: finalContent,
        wordCount
      };
      onUpdate([...texts, newText]);
    }
    setEditingText(null);
  };

  const grades: Grade[] = ['1','2','3','4','5','6','7','8','9','10','11','Adultos'];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <button onClick={onBack} className="text-slate-500 font-bold hover:text-slate-800 transition-colors flex items-center gap-1">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" /></svg>
          Volver
        </button>
        <button onClick={() => setEditingText({ title: '', content: '', grade: '1', type: 'Narrativo' })} className="bg-orange-600 text-white px-4 py-2 rounded-lg font-bold shadow-md hover:bg-orange-700 transition-all">+ Añadir Texto</button>
      </div>

      <div className="mb-6 flex gap-4 overflow-x-auto pb-2">
        <button onClick={() => setFilterGrade('all')} className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${filterGrade === 'all' ? 'bg-emerald-600 text-white' : 'bg-white border border-slate-200 text-slate-500 hover:bg-slate-50'}`}>Todos</button>
        {grades.map(g => (
          <button key={g} onClick={() => setFilterGrade(g)} className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${filterGrade === g ? 'bg-orange-600 text-white' : 'bg-white border border-slate-200 text-slate-500 hover:bg-slate-50'}`}>{GRADE_LABELS[g]}</button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(t => (
          <div key={t.id} className="bg-white p-6 rounded-xl border border-slate-200 flex flex-col shadow-sm hover:border-orange-300 transition-all">
            <div className="flex justify-between mb-2">
              <span className="text-[10px] font-bold uppercase text-emerald-600">{GRADE_LABELS[t.grade]} - {t.type}</span>
              <div className="flex gap-2">
                <button onClick={() => setEditingText(t)} className="text-slate-400 hover:text-orange-500 transition-colors"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg></button>
                <button onClick={() => handleDelete(t.id)} className="text-slate-400 hover:text-red-500 transition-colors"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
              </div>
            </div>
            <h4 className="font-bold text-slate-800 mb-1">{t.title}</h4>
            <p className="text-xs text-slate-500 line-clamp-3 mb-4 italic">"{t.content}"</p>
            <div className="mt-auto text-[10px] font-bold text-slate-300 uppercase">{t.wordCount} words</div>
          </div>
        ))}
      </div>

      {editingText && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 overflow-y-auto max-h-[90vh]">
            <h2 className="text-2xl font-bold mb-6 text-orange-600">{editingText.id ? 'Editar Texto' : 'Añadir Nuevo Texto'}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Título</label>
                <input type="text" className="w-full p-3 border rounded-lg focus:border-orange-500" value={editingText.title} onChange={e => setEditingText({...editingText, title: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Nivel</label>
                  <select className="w-full p-3 border rounded-lg bg-white focus:border-orange-500" value={editingText.grade} onChange={e => setEditingText({...editingText, grade: e.target.value as Grade})}>
                    {grades.map(g => <option key={g} value={g}>{GRADE_LABELS[g]}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Tipo de Texto</label>
                  <select className="w-full p-3 border rounded-lg bg-white focus:border-orange-500" value={editingText.type} onChange={e => setEditingText({...editingText, type: e.target.value as TextType})}>
                    {['Narrativo', 'Expositivo', 'Argumentativo'].map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Contenido</label>
                <textarea rows={8} className="w-full p-3 border rounded-lg font-dyslexic focus:border-orange-500" value={editingText.content} onChange={e => setEditingText({...editingText, content: e.target.value})} placeholder="Escriba el contenido aquí..." />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-8">
              <button onClick={() => setEditingText(null)} className="px-6 py-2 font-bold text-slate-400 hover:text-slate-600">Cancelar</button>
              <button onClick={handleSave} className="bg-emerald-600 text-white px-8 py-2 rounded-lg font-bold shadow-lg transition-all">Guardar Texto</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
