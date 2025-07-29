import { Topic, Question, GlossaryTerm } from '@/types';

// Medical Categories
export const categories = [
  'Anatomy',
  'Physiology',
  'Biochemistry',
  'Pathology',
  'Pharmacology',
  'Microbiology',
  'Medicine',
  'Surgery',
  'Obstetrics & Gynecology',
  'Pediatrics',
  'Psychiatry',
  'Community Medicine'
];

// Sample Topics
export const topics: Topic[] = [
  {
    id: 'cardiovascular-system',
    name: 'Cardiovascular System',
    description: 'Study of the heart, blood vessels, and their functions in the human body.',
    category: 'Anatomy',
    subTopics: ['heart-anatomy', 'blood-vessels', 'cardiac-cycle', 'cardiac-conduction']
  },
  {
    id: 'heart-anatomy',
    name: 'Heart Anatomy',
    description: 'Detailed structure and components of the human heart.',
    category: 'Anatomy',
    subTopics: []
  },
  {
    id: 'blood-vessels',
    name: 'Blood Vessels',
    description: 'Structure and function of arteries, veins, and capillaries.',
    category: 'Anatomy',
    subTopics: []
  },
  {
    id: 'respiratory-system',
    name: 'Respiratory System',
    description: 'Study of the organs involved in breathing including lungs, trachea, and bronchi.',
    category: 'Anatomy',
    subTopics: ['lung-anatomy', 'respiratory-mechanics', 'gas-exchange']
  },
  {
    id: 'lung-anatomy',
    name: 'Lung Anatomy',
    description: 'Structure and organization of the lungs.',
    category: 'Anatomy',
    subTopics: []
  },
  {
    id: 'cardiac-physiology',
    name: 'Cardiac Physiology',
    description: 'Function and regulatory mechanisms of the heart.',
    category: 'Physiology',
    subTopics: ['cardiac-output', 'blood-pressure-regulation', 'cardiac-cycle-physiology']
  },
  {
    id: 'glucose-metabolism',
    name: 'Glucose Metabolism',
    description: 'Biochemical pathways involved in glucose utilization and storage.',
    category: 'Biochemistry',
    subTopics: ['glycolysis', 'gluconeogenesis', 'tca-cycle']
  },
  {
    id: 'antibiotics',
    name: 'Antibiotics',
    description: 'Classes, mechanisms, and clinical uses of antimicrobial drugs.',
    category: 'Pharmacology',
    subTopics: ['beta-lactams', 'aminoglycosides', 'macrolides', 'fluoroquinolones']
  },
  {
    id: 'infectious-diseases',
    name: 'Infectious Diseases',
    description: 'Study of diseases caused by pathogens including bacteria, viruses, and fungi.',
    category: 'Medicine',
    subTopics: ['bacterial-infections', 'viral-infections', 'fungal-infections']
  },
  {
    id: 'general-surgery',
    name: 'General Surgery',
    description: 'Principles and practices in general surgical procedures.',
    category: 'Surgery',
    subTopics: ['pre-operative-care', 'surgical-techniques', 'post-operative-care']
  },
  {
    id: 'obstetrics',
    name: 'Obstetrics',
    description: 'Medical specialty dealing with pregnancy, childbirth, and postpartum period.',
    category: 'Obstetrics & Gynecology',
    subTopics: ['pregnancy', 'labor-delivery', 'postpartum-care']
  },
  {
    id: 'pediatric-development',
    name: 'Pediatric Development',
    description: 'Growth and developmental milestones in children.',
    category: 'Pediatrics',
    subTopics: ['infant-development', 'childhood-development', 'adolescent-development']
  }
];

// Sample Questions
export const questions: Question[] = [
  {
    id: 'q1',
    question: 'What are the four chambers of the heart?',
    answer: 'The four chambers of the heart are: right atrium, right ventricle, left atrium, and left ventricle.',
    topicId: 'heart-anatomy',
    difficultyLevel: 'Basic',
    tags: ['heart', 'chambers', 'anatomy']
  },
  {
    id: 'q2',
    question: 'What is the pacemaker of the heart?',
    answer: 'The sinoatrial (SA) node is the natural pacemaker of the heart. It generates electrical impulses that cause the heart to contract.',
    topicId: 'heart-anatomy',
    difficultyLevel: 'Basic',
    tags: ['heart', 'pacemaker', 'SA node', 'conduction']
  },
  {
    id: 'q3',
    question: 'Describe the blood flow through the heart.',
    answer: 'Blood flows through the heart in the following sequence: 1) Deoxygenated blood enters the right atrium via superior and inferior vena cava, 2) Blood passes through tricuspid valve into right ventricle, 3) Blood is pumped through pulmonary valve into pulmonary arteries to lungs for oxygenation, 4) Oxygenated blood returns to left atrium via pulmonary veins, 5) Blood passes through mitral valve into left ventricle, 6) Blood is pumped through aortic valve into aorta to supply the body.',
    topicId: 'heart-anatomy',
    difficultyLevel: 'Intermediate',
    tags: ['heart', 'circulation', 'blood flow']
  },
  {
    id: 'q4',
    question: 'What is cardiac output and how is it calculated?',
    answer: 'Cardiac output is the volume of blood pumped by the heart per minute. It is calculated as the product of stroke volume (the amount of blood pumped per heartbeat) and heart rate (beats per minute). Formula: CO = SV × HR.',
    topicId: 'cardiac-physiology',
    difficultyLevel: 'Intermediate',
    tags: ['cardiac output', 'stroke volume', 'heart rate']
  },
  {
    id: 'q5',
    question: 'Differentiate between arteries and veins in terms of structure and function.',
    answer: 'Arteries carry blood away from the heart and have thick, muscular walls to withstand high pressure. They have smaller lumens and no valves. Veins carry blood toward the heart and have thinner walls with larger lumens. They contain valves to prevent backflow of blood against gravity.',
    topicId: 'blood-vessels',
    difficultyLevel: 'Basic',
    tags: ['arteries', 'veins', 'blood vessels']
  },
  {
    id: 'q6',
    question: 'What is the glycolysis pathway and what are its end products?',
    answer: 'Glycolysis is the metabolic pathway that converts glucose into pyruvate. It occurs in the cytoplasm and does not require oxygen. The end products of glycolysis are: 2 pyruvate molecules, 2 ATP, and 2 NADH. In anaerobic conditions, pyruvate is converted to lactate.',
    topicId: 'glucose-metabolism',
    difficultyLevel: 'Intermediate',
    tags: ['glycolysis', 'metabolism', 'glucose']
  },
  {
    id: 'q7',
    question: 'Explain the mechanism of action of penicillin.',
    answer: 'Penicillin is a β-lactam antibiotic that works by inhibiting bacterial cell wall synthesis. It binds to and inhibits the activity of transpeptidase enzymes (also called penicillin-binding proteins or PBPs) that are responsible for cross-linking peptidoglycan chains in the bacterial cell wall. This leads to weakening of the cell wall, osmotic instability, and eventually cell lysis. Penicillin is effective against gram-positive bacteria primarily because gram-negative bacteria have an outer membrane that limits drug penetration.',
    topicId: 'antibiotics',
    difficultyLevel: 'Advanced',
    tags: ['penicillin', 'antibiotics', 'mechanism of action']
  },
  {
    id: 'q8',
    question: 'What are the stages of labor?',
    answer: 'Labor is divided into three stages: First stage (from onset of contractions to full cervical dilation, further divided into latent, active, and transition phases), Second stage (from full dilation to delivery of the baby), and Third stage (from delivery of the baby to delivery of the placenta).',
    topicId: 'obstetrics',
    difficultyLevel: 'Intermediate',
    tags: ['labor', 'childbirth', 'obstetrics']
  }
];

// Extend this with more questions for each topic to reach 1000+ questions

// Sample Glossary Terms
export const glossaryTerms: GlossaryTerm[] = [
  {
    term: 'Angina Pectoris',
    definition: 'Chest pain due to reduced blood flow to the heart muscle, typically caused by coronary artery disease.',
    relatedTerms: ['Myocardial Ischemia', 'Coronary Artery Disease']
  },
  {
    term: 'Arrhythmia',
    definition: 'Abnormal heart rhythm characterized by irregular heartbeats that are too fast, too slow, or irregular.',
    relatedTerms: ['Bradycardia', 'Tachycardia', 'Atrial Fibrillation']
  },
  {
    term: 'Bradycardia',
    definition: 'Abnormally slow heart rate, typically fewer than 60 beats per minute in adults.',
    relatedTerms: ['Arrhythmia', 'Heart Block']
  },
  {
    term: 'Dyspnea',
    definition: 'Difficult or labored breathing, often associated with lung or heart diseases.',
    relatedTerms: ['Orthopnea', 'Respiratory Distress']
  },
  {
    term: 'Edema',
    definition: 'Swelling caused by excess fluid trapped in body tissues, often seen in legs, feet, and ankles.',
    relatedTerms: ['Pulmonary Edema', 'Heart Failure']
  },
  {
    term: 'Hemoptysis',
    definition: 'Coughing up of blood or blood-stained sputum from the respiratory tract.',
    relatedTerms: ['Tuberculosis', 'Bronchiectasis', 'Lung Cancer']
  },
  {
    term: 'Hypertension',
    definition: 'Persistently elevated arterial blood pressure, typically defined as readings consistently above 130/80 mmHg.',
    relatedTerms: ['Essential Hypertension', 'Secondary Hypertension']
  },
  {
    term: 'Myocardial Infarction',
    definition: 'Also known as heart attack, it occurs when blood flow to a part of the heart is blocked, causing damage to the heart muscle.',
    relatedTerms: ['Coronary Thrombosis', 'STEMI', 'NSTEMI']
  },
  {
    term: 'Tachycardia',
    definition: 'Abnormally rapid heart rate, typically over 100 beats per minute in adults at rest.',
    relatedTerms: ['Arrhythmia', 'Supraventricular Tachycardia']
  },
  {
    term: 'Thrombosis',
    definition: 'Formation of a blood clot inside a blood vessel, obstructing the flow of blood through the circulatory system.',
    relatedTerms: ['Deep Vein Thrombosis', 'Pulmonary Embolism']
  }
];

// Generate more sample questions for the sample topics
export const generateSampleQuestions = (topicId: string, count: number = 10): Question[] => {
  const topic = topics.find(t => t.id === topicId);
  if (!topic) return [];
  
  const sampleQuestions: Question[] = [];
  
  // Difficulty levels
  const difficultyLevels: ('Basic' | 'Intermediate' | 'Advanced')[] = ['Basic', 'Intermediate', 'Advanced'];
  
  for (let i = 0; i < count; i++) {
    sampleQuestions.push({
      id: `${topicId}-q${i + 1}`,
      question: `Sample question ${i + 1} about ${topic.name}`,
      answer: `Detailed answer for sample question ${i + 1} about ${topic.name}. This would contain comprehensive information relevant to an MBBS curriculum.`,
      topicId: topic.id,
      difficultyLevel: difficultyLevels[i % 3],
      tags: [topic.name.toLowerCase(), topic.category.toLowerCase()]
    });
  }
  
  return sampleQuestions;
};