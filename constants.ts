
import { Grade, TextUnit, TextType } from './types';

export const PPM_THRESHOLDS: Record<Grade, { low: number; high: number }> = {
  '1': { low: 25, high: 72 },
  '2': { low: 45, high: 101 },
  '3': { low: 58, high: 111 },
  '4': { low: 75, high: 134 },
  '5': { low: 83, high: 145 },
  '6': { low: 95, high: 154 }, 
  '7': { low: 100, high: 168 }, // 1º ESO
  '8': { low: 101, high: 171 }, // 2º ESO
  '9': { low: 112, high: 175 }, // 3º ESO
  '10': { low: 137, high: 191 }, // 4º ESO
  '11': { low: 137, high: 186 }, // 1º Bachillerato
  'Adultos': { low: 150, high: 240 }, // Basado en media 191
};

export const GRADE_LABELS: Record<Grade, string> = {
  '1': '1º Primaria',
  '2': '2º Primaria',
  '3': '3º Primaria',
  '4': '4º Primaria',
  '5': '5º Primaria',
  '6': '6º Primaria',
  '7': '1º ESO',
  '8': '2º ESO',
  '9': '3º ESO',
  '10': '4º ESO',
  '11': '1º Bachillerato',
  'Adultos': 'Adultos'
};

export const INITIAL_TEXTS: TextUnit[] = [
  // 1º GRADO
  {
    id: '1-1',
    title: 'EL PERRO LOLO',
    content: 'EL PERRO LOLO ES MUY LINDO. TIENE UN HUESO BLANCO. JUEGA CON LA PELOTA EN EL PATIO. LOLO SALTA Y CORRE MUCHO. ES UN PERRO MUY FELIZ Y BUENO.',
    wordCount: 31,
    grade: '1',
    type: 'Narrativo'
  },
  {
    id: '1-2',
    title: 'MI CASA AZUL',
    content: 'MI CASA ES AZUL Y GRANDE. TIENE UNA PUERTA ROJA. HAY FLORES LINDAS EN EL JARDIN. ME GUSTA VIVIR AQUI CON MI MAMA Y MI PAPA.',
    wordCount: 28,
    grade: '1',
    type: 'Narrativo'
  },
  // 2º GRADO
  {
    id: '2-1',
    title: 'EL SOL Y LAS NUBES',
    content: 'EL SOL SALE MUY TEMPRANO POR LA MAÑANA. ES DE COLOR AMARILLO Y NOS DA MUCHO CALOR. CUANDO HAY NUBES GRISES, EL CIELO SE PONE OSCURO Y PUEDE LLOVER MUCHO.',
    wordCount: 34,
    grade: '2',
    type: 'Expositivo'
  },
  {
    id: '2-2',
    title: 'EL RATON PEREZ',
    content: 'EL RATON PEREZ ES UN PERSONAJE MUY FAMOSO. EL BUSCA LOS DIENTES QUE SE LES CAEN A LOS NIÑOS. LOS GUARDA EN UNA CAJA Y DEJA UNA MONEDA DE REGALO.',
    wordCount: 33,
    grade: '2',
    type: 'Narrativo'
  },
  // 3º GRADO
  {
    id: '3-1',
    title: 'LA VIDA EN LA GRANJA',
    content: 'EN LA GRANJA HAY MUCHOS ANIMALES INTERESANTES. LAS GALLINAS PONEN HUEVOS CADA MAÑANA Y EL GALLO CANTA MUY FUERTE. EL GRANJERO TRABAJA DURO PARA CUIDAR A LAS VACAS Y LAS OVEJAS. TODOS LOS DIAS LES DA AGUA FRESCA Y PASTO LIMPIO.',
    wordCount: 45,
    grade: '3',
    type: 'Expositivo'
  },
  {
    id: '3-2',
    title: 'EL VIAJE DEL ESPACIO',
    content: 'LOS ASTRONAUTAS VIAJAN EN COHETES MUY VELOCES HACIA LA LUNA. ELLOS USAN TRAJES ESPECIALES PARA PODER RESPIRAR. DESDE EL ESPACIO, LA TIERRA SE VE COMO UNA PEQUEÑA BOLA AZUL RODEADA DE ESTRELLAS BRILLANTES. ES UN PAISAJE MUY HERMOSO Y SILENCIOSO.',
    wordCount: 44,
    grade: '3',
    type: 'Expositivo'
  },
  // 4º GRADO
  {
    id: '4-1',
    title: 'EL BOSQUE TROPICAL',
    content: 'LOS BOSQUES TROPICALES SON LUGARES LLENOS DE VIDA Y COLOR. EN ELLOS HABITAN MUCHOS ANIMALES COMO LOS MONOS, LAS AVES Y LAS MARIPOSAS GIGANTES. LOS ARBOLES SON MUY ALTOS Y TIENEN HOJAS VERDES DURANTE TODO EL AÑO. ES IMPORTANTE CUIDAR ESTOS LUGARES PORQUE NOS DAN OXIGENO.',
    wordCount: 51,
    grade: '4',
    type: 'Expositivo'
  },
  {
    id: '4-2',
    title: 'EL CABALLO DE MADERA',
    content: 'CUANDO MI ABUELO ERA PEQUEÑO, TENIA UN CABALLO DE MADERA QUE EL MISMO HABIA CONSTRUIDO. PASABA HORAS IMAGINANDO GRANDES AVENTURAS POR EL CAMPO. AUNQUE ERA UN JUGUETE SIMPLE, PARA EL ERA EL TESORO MAS VALIOSO DEL MUNDO. HOY ESE CABALLO DESCANSA EN UN RINCON DE LA CASA.',
    wordCount: 51,
    grade: '4',
    type: 'Narrativo'
  },
  // 5º GRADO
  {
    id: '5-1',
    title: 'LOS DINOSAURIOS GIGANTES',
    content: 'HACE MILLONES DE AÑOS, LOS DINOSAURIOS DOMINABAN TODO EL PLANETA TIERRA. HABIA ESPECIES MUY DIFERENTES ENTRE SI, ALGUNOS ERAN TAN ALTOS COMO EDIFICIOS Y OTROS TAN PEQUEÑOS COMO GALLINAS. LOS CIENTIFICOS ESTUDIAN SUS HUESOS PARA ENTENDER COMO VIVIAN Y POR QUE DESAPARECIERON. CADA NUEVO DESCUBRIMIENTO ES UNA PIEZA MAS DE ESTE GRAN MISTERIO ANTIGUO.',
    wordCount: 61,
    grade: '5',
    type: 'Expositivo'
  },
  {
    id: '5-2',
    title: 'EL CICLO DEL AGUA',
    content: 'EL AGUA DE LOS MARES Y RIOS SE EVAPORA CON EL CALOR DEL SOL Y SUBE HACIA EL CIELO. ALLI SE FORMAN LAS NUBES QUE LUEGO DESCARGAN LA LLUVIA SOBRE LA TIERRA. ESTE PROCESO ES CONTINUO Y PERMITE QUE LAS PLANTAS CREZCAN Y LOS ANIMALES PUEDAN BEBER. SIN ESTE CICLO NATURAL, LA VIDA EN NUESTRO PLANETA NO SERIA POSIBLE.',
    wordCount: 66,
    grade: '5',
    type: 'Expositivo'
  },
  // 6º GRADO
  {
    id: '6-1',
    title: 'LA ENERGIA RENOVABLE',
    content: 'EL USO DE ENERGIAS LIMPIAS ES FUNDAMENTAL PARA COMBATIR EL CAMBIO CLIMATICO QUE AFECTA A NUESTRO MUNDO. LA ENERGIA DEL SOL Y DEL VIENTO NO SE AGOTA NUNCA Y NO CONTAMINA EL AIRE QUE RESPIRAMOS. CADA VEZ MAS CIUDADES INSTALAN PANELES SOLARES Y MOLINOS DE VIENTO PARA GENERAR ELECTRICIDAD DE FORMA SEGURA. ES RESPONSABILIDAD DE TODOS CUIDAR EL MEDIO AMBIENTE PARA LAS FUTURAS GENERACIONES.',
    wordCount: 75,
    grade: '6',
    type: 'Expositivo'
  },
  {
    id: '6-2',
    title: 'LA HISTORIA DE LA ESCRITURA',
    content: 'ANTES DE QUE EXISTIERAN LOS LIBROS QUE CONOCEMOS HOY, LAS PERSONAS DIBUJABAN EN LAS PAREDES DE LAS CUEVAS. CON EL TIEMPO, SE CREARON LOS PRIMEROS ALFABETOS EN PIEDRA Y LUEGO EN PAPEL DE PAPIRO. LA INVENCION DE LA IMPRENTA PERMITIO QUE LAS IDEAS SE DIFUNDIERAN POR TODO EL MUNDO MAS RAPIDAMENTE. GRACIAS a LA ESCRITURA, PODEMOS CONOCER LOS PENSAMIENTOS DE PERSONAS QUE VIVIERON HACE MILES DE AÑOS.',
    wordCount: 78,
    grade: '6',
    type: 'Expositivo'
  },
  // 7º GRADO (1º ESO)
  {
    id: '7-1',
    title: 'La importancia de la biodiversidad',
    content: 'La biodiversidad se refiere a la inmensa variedad de seres vivos que habitan en nuestro planeta y los ecosistemas complejos que forman entre sí. Cada especie desempeña un papel fundamental en el equilibrio de la naturaleza; si una sola desaparece, se genera un efecto en cadena que puede desestabilizar a muchas otras poblaciones, incluidos los seres humanos. Los científicos advierten que la pérdida acelerada de hábitats naturales es una de las mayores amenazas actuales debido a la expansión urbana. Es urgente implementar medidas de conservación global y políticas ambientales estrictas para proteger esta riqueza biológica antes de que el daño sea irreversible.',
    wordCount: 112,
    grade: '7',
    type: 'Argumentativo'
  },
  {
    id: '7-2',
    title: 'El impacto de la tecnología',
    content: 'En las últimas décadas, el desarrollo tecnológico ha transformado radicalmente la manera en que nos comunicamos y accedemos a la información global. Internet ha permitido que el conocimiento esté disponible para millones de personas de forma instantánea, eliminando fronteras geográficas y facilitando el aprendizaje colaborativo a gran escala. Sin embargo, este avance constante también plantea desafíos significativos para las sociedades modernas, como la protección de la privacidad individual y el uso responsable de las redes sociales frente a la desinformación masiva. Es necesario encontrar un equilibrio saludable entre los beneficios de la innovación técnica y el bienestar emocional de las personas en un mundo digitalizado.',
    wordCount: 114,
    grade: '7',
    type: 'Argumentativo'
  },
  // 8º GRADO (2º ESO)
  {
    id: '8-1',
    title: 'El fenómeno de la globalización',
    content: 'La globalización es un proceso económico, tecnológico, social y cultural a gran escala que consiste en la creciente comunicación e interdependencia entre los distintos países del mundo. Ha unificado mercados y sociedades a través de una serie de transformaciones profundas que les otorgan un carácter global y dinámico. Aunque ha facilitado enormemente el intercambio cultural y el crecimiento económico acelerado en muchas regiones, también ha generado fuertes críticas por la posible homogeneización de las culturas locales y la creciente desigualdad en la distribución de la riqueza a nivel mundial entre las naciones más ricas y las más pobres del planeta.',
    wordCount: 110,
    grade: '8',
    type: 'Expositivo'
  },
  {
    id: '8-2',
    title: 'Las energías del futuro',
    content: 'El agotamiento progresivo de los combustibles fósiles y la necesidad urgente de reducir las emisiones de gases de efecto invernadero han impulsado la búsqueda de fuentes de energía alternativas viables. El hidrógeno verde, la energía mareomotriz y la biomasa se perfilan como las soluciones tecnológicas más prometedoras para finales de este siglo. Estos sistemas innovadores no solo son prácticamente inagotables, sino que permiten una soberanía energética mucho mayor para los países que carecen de yacimientos petrolíferos tradicionales, fomentando una economía global más sostenible, resiliente y respetuosa con los límites naturales de nuestro entorno biológico compartido.',
    wordCount: 104,
    grade: '8',
    type: 'Expositivo'
  },
  // 9º GRADO (3º ESO)
  {
    id: '9-1',
    title: 'La ética en la inteligencia artificial',
    content: 'El rápido avance de la inteligencia artificial ha generado un intenso debate sobre las profundas implicaciones éticas de su uso generalizado en la vida cotidiana actual. Desde los algoritmos complejos que deciden qué noticias vemos hasta los sistemas avanzados de reconocimiento facial, la tecnología está asumiendo roles sociales que antes eran exclusivos de los seres humanos. Es imperativo establecer marcos regulatorios internacionales que garanticen la transparencia algorítmica y eviten los sesgos discriminatorios. La sociedad civil debe decidir activamente cómo integrar estas herramientas potentes sin comprometer nunca la autonomía individual ni los derechos fundamentales de las personas en el entorno digital.',
    wordCount: 108,
    grade: '9',
    type: 'Argumentativo'
  },
  {
    id: '9-2',
    title: 'El legado del Renacimiento',
    content: 'El Renacimiento fue mucho más que un periodo artístico esplendoroso; representó un cambio radical en la forma en que el ser humano se percibía a sí mismo y al universo infinito. Inspirados por la recuperación de la cultura clásica, los humanistas pusieron la razón crítica y la observación directa por encima de los dogmas religiosos establecidos. Este espíritu inquieto de indagación científica y libertad creativa sentó las bases fundamentales de la Modernidad europea. Artistas como Leonardo da Vinci o Miguel Ángel no solo buscaron la belleza estética suprema, sino que profundizaron en el estudio científico de la anatomía humana y la perspectiva técnica.',
    wordCount: 108,
    grade: '9',
    type: 'Narrativo'
  },
  // 10º GRADO (4º ESO)
  {
    id: '10-1',
    title: 'La crisis del agua en el siglo XXI',
    content: 'El acceso al agua potable se ha convertido en uno de los desafíos geopolíticos más urgentes y complejos de nuestro tiempo. El crecimiento demográfico exponencial, sumado a la contaminación química de los acuíferos y al impacto del cambio climático, ha reducido drásticamente las reservas de agua dulce disponibles en regiones críticas. La gestión eficiente y equitativa de los recursos hídricos ya no es una opción técnica, sino una necesidad vital para asegurar la estabilidad política internacional. Muchos expertos sugieren que las futuras tensiones entre naciones podrían estar motivadas principalmente por el control de las fuentes de agua potable en lugar de los recursos tradicionales.',
    wordCount: 114,
    grade: '10',
    type: 'Argumentativo'
  },
  {
    id: '10-2',
    title: 'Neurociencia y aprendizaje',
    content: 'La neurociencia moderna ha revelado recientemente que el cerebro humano posee una plasticidad asombrosa y continua, capaz de reconfigurarse ante nuevos estímulos y desafíos cognitivos constantes. Entender con precisión cómo se consolidan los circuitos neuronales durante el proceso complejo del aprendizaje permite a los educadores actuales diseñar estrategias pedagógicas mucho más eficaces y personalizadas. Factores determinantes como el sueño reparador de calidad, la actividad física regular y el manejo adecuado del estrés emocional son fundamentales para la retención de información compleja a largo plazo. La educación del futuro deberá basarse necesariamente en este conocimiento biológico profundo para potenciar las capacidades individuales de cada estudiante.',
    wordCount: 113,
    grade: '10',
    type: 'Expositivo'
  },
  // 11º GRADO (1º Bachillerato)
  {
    id: '11-1',
    title: 'Filosofía y Autoconocimiento',
    content: 'El pensamiento crítico y la autorreflexión son herramientas esenciales para navegar en la complejidad de las sociedades contemporáneas hiperconectadas. Históricamente, el ejercicio de la duda metódica ha permitido cuestionar los dogmas establecidos y fomentar una comprensión más profunda de la identidad propia y del entorno social. Al analizar nuestras creencias desde una perspectiva racional, podemos desarrollar una mayor autonomía intelectual y una resiliencia emocional ante las presiones externas del conformismo. La filosofía no es solo una disciplina académica, sino una práctica cotidiana que invita a vivir de manera más consciente, promoviendo un diálogo constructivo entre diferentes visiones del mundo para fortalecer el tejido democrático y la tolerancia.',
    wordCount: 120,
    grade: '11',
    type: 'Argumentativo'
  },
  {
    id: '11-2',
    title: 'La paradoja de la privacidad digital',
    content: 'En la era de la hiperconectividad constante, los usuarios se enfrentan a una contradicción existencial: el deseo de personalización extrema en los servicios digitales frente a la creciente preocupación ética por la vigilancia masiva de datos. Cada rastro dejado voluntariamente en la red alimenta perfiles de datos inmensos que son utilizados por grandes corporaciones para predecir comportamientos de consumo o influir sutilmente en decisiones políticas fundamentales. La erosión progresiva de la privacidad no es solo un problema técnico de seguridad, sino una amenaza directa a la libertad democrática tradicional. Reivindicar el derecho fundamental al anonimato y al control total sobre la propia información personal es hoy una forma de resistencia civil necesaria.',
    wordCount: 121,
    grade: '11',
    type: 'Argumentativo'
  },
  // ADULTOS
  {
    id: 'A-1',
    title: 'Nuevos hallazgos en neurociencia cerebral',
    content: 'Investigaciones recientes en el campo de la neurociencia han demostrado que el cerebro humano mantiene una capacidad de regeneración sináptica mucho mayor de lo que se creía anteriormente. Un estudio publicado esta semana revela que el aprendizaje continuo de nuevas habilidades, como idiomas o instrumentos musicales, genera una reconfiguración física de la corteza cerebral incluso en edades avanzadas. Este fenómeno, conocido como neuroplasticidad, sugiere que la estimulación cognitiva constante actúa como un factor protector frente al deterioro neuronal degenerativo. Los expertos subrayan la importancia de mantener una mente activa y curiosa, pues cada desafío intelectual fortalece las conexiones existentes y fomenta la creación de nuevas redes neuronales que mejoran notablemente la agilidad mental y la memoria a largo plazo.',
    wordCount: 128,
    grade: 'Adultos',
    type: 'Expositivo'
  },
  {
    id: 'A-2',
    title: 'Acciones ecológicas para la sostenibilidad',
    content: 'La crisis climática actual exige una transición urgente desde la retórica política hacia la implementación de acciones ecológicas concretas y medibles en todos los sectores de la sociedad global. La adopción masiva de modelos de consumo basados en la economía circular, donde se prioriza sistemáticamente la reparación y el reciclaje sobre la cultura del descarte, es fundamental para reducir la huella de carbono planetaria. Asimismo, la reforestación estratégica con especies nativas y la protección de los humedales locales emergen como soluciones basadas en la naturaleza para capturar gases de efecto invernadero de forma eficiente. La responsabilidad es compartida; pequeños cambios en los hábitos diarios, sumados a una presión ciudadana constante por energías renovables, son los motores que impulsarán la regeneración de nuestro equilibrio biológico.',
    wordCount: 132,
    grade: 'Adultos',
    type: 'Expositivo'
  }
];

export const INTERVENTION_STRATEGIES = [
  {
    name: 'Lectura Repetida',
    desc: 'El estudiante lee el mismo texto corto 3-4 veces, cronometrando palabras/minuto.',
    evidence: 'Automatiza reconocimiento de palabras, mejora velocidad y precisión.'
  },
  {
    name: 'Lectura Guiada/Modelada',
    desc: 'El evaluador modela lectura con entonación, el niño repite línea por línea.',
    evidence: 'Fomenta prosodia y reduce errores silábicos.'
  },
  {
    name: 'Tarjetas de Palabras Rápidas',
    desc: 'Uso de flashcards con palabras frecuentes para aumentar la velocidad de reconocimiento.',
    evidence: 'Mejora reconocimiento automático y velocidad léxica.'
  },
  {
    name: 'Lectura en Pareja',
    desc: 'Estudiante y par (o adulto) leen alternadamente corrigiéndose con respeto.',
    evidence: 'Aumenta precisión y confianza en entornos educativos.'
  },
  {
    name: 'Lectura Cronometrada de Listas',
    desc: 'Lectura cronometrada de sílabas o palabras aisladas.',
    evidence: 'Impacto directo en la fluidez para lectores emergentes.'
  }
];
