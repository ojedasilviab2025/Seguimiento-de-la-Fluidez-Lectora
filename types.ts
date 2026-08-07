
export type Grade = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | 'Adultos';
export type TextType = 'Narrativo' | 'Expositivo' | 'Argumentativo';

export interface StudentInfo {
  name: string;
  age: number;
  grade: Grade;
  date: string;
  evaluator: string;
}

export interface TextUnit {
  id: string;
  title: string;
  content: string;
  wordCount: number;
  grade: Grade;
  type: TextType;
}

export interface EvaluationResults {
  seconds: number;
  ppm: number;
  performance: 'BAJA' | 'MEDIA' | 'ALTA';
  qualitative: QualitativeData;
}

export interface QualitativeData {
  speed: 'Lenta' | 'Adecuada';
  expression: 'Ritmo y entonación' | 'Tono monótono';
  precision: 'Sin errores' | 'Pocos errores' | 'Muchos errores';
  errorCount: number;
  aspectosCualitativos: {
    semanticas: boolean;
    visuales: boolean;
    literales: boolean;
    derivacionales: boolean;
    omisiones: boolean;
    adiciones: boolean;
  };
  rhythm: {
    pausesCorrectly: boolean;
    noRespectsPunctuation: boolean;
    repeatsWords: boolean;
    hesitation: boolean;
  };
  comprehension: {
    answersQuestions: boolean;
    deducesWords: boolean;
    elaboratesQuestions: boolean;
    forgetsInfo: boolean;
    difficultyResponding: boolean;
    doesntUnderstandWords: boolean;
  };
  observations: string;
}
