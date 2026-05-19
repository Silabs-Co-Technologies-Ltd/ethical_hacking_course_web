export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  lessonId: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
}

export const quizzes: Quiz[] = [
  {
    id: 'quiz-1-1',
    lessonId: 'lesson-1-1',
    title: 'What is a Computer? - Knowledge Check',
    description: 'Test your understanding of basic computer components',
    questions: [
      {
        id: 'q1',
        question: 'What is the CPU often compared to?',
        options: ['A hard drive', 'The brain', 'A monitor', 'A keyboard'],
        correctAnswer: 1,
        explanation: 'The CPU is the "brain" of the computer, processing all calculations and instructions.',
      },
      {
        id: 'q2',
        question: 'Which component stores data permanently?',
        options: ['RAM', 'CPU', 'Storage (Hard Drive/SSD)', 'GPU'],
        correctAnswer: 2,
        explanation: 'Storage devices like hard drives and SSDs store data permanently, even when powered off.',
      },
      {
        id: 'q3',
        question: 'What does RAM stand for?',
        options: ['Random Access Memory', 'Read-Only Memory', 'Rapid Allocation Module', 'Remote Access Manager'],
        correctAnswer: 0,
        explanation: 'RAM stands for Random Access Memory and serves as the computer\'s short-term memory.',
      },
    ],
  },
  {
    id: 'quiz-1-2',
    lessonId: 'lesson-1-2',
    title: 'How Computers Talk - Knowledge Check',
    description: 'Test your understanding of networks and communication',
    questions: [
      {
        id: 'q1',
        question: 'What does LAN stand for?',
        options: ['Local Area Network', 'Long Access Node', 'Link Activation Network', 'Local Activation Node'],
        correctAnswer: 0,
        explanation: 'LAN stands for Local Area Network, which connects devices in a limited geographical area.',
      },
      {
        id: 'q2',
        question: 'Which is the largest WAN in the world?',
        options: ['Your home Wi-Fi', 'A school network', 'The Internet', 'A corporate network'],
        correctAnswer: 2,
        explanation: 'The Internet is the largest WAN (Wide Area Network) in the world.',
      },
      {
        id: 'q3',
        question: 'What is an IP address?',
        options: ['A physical address on a device', 'A unique identifier for a computer on a network', 'A type of network cable', 'A security protocol'],
        correctAnswer: 1,
        explanation: 'An IP address is a unique string of numbers that identifies each computer on a network.',
      },
    ],
  },
  {
    id: 'quiz-2-1',
    lessonId: 'lesson-2-1',
    title: 'Cybersecurity Fundamentals - Knowledge Check',
    description: 'Test your understanding of the CIA Triad',
    questions: [
      {
        id: 'q1',
        question: 'What does the "C" in CIA Triad stand for?',
        options: ['Compliance', 'Confidentiality', 'Certification', 'Cryptography'],
        correctAnswer: 1,
        explanation: 'The "C" stands for Confidentiality, ensuring information is not disclosed to unauthorized parties.',
      },
      {
        id: 'q2',
        question: 'Which CIA principle ensures data has not been altered?',
        options: ['Confidentiality', 'Integrity', 'Availability', 'Authentication'],
        correctAnswer: 1,
        explanation: 'Integrity ensures that data cannot be modified in an unauthorized or undetected manner.',
      },
      {
        id: 'q3',
        question: 'What does Availability mean in cybersecurity?',
        options: ['Making data public', 'Ensuring authorized users can access information when needed', 'Encrypting all data', 'Hiding sensitive information'],
        correctAnswer: 1,
        explanation: 'Availability ensures that authorized users have access to information and systems when required.',
      },
    ],
  },
  {
    id: 'quiz-2-2',
    lessonId: 'lesson-2-2',
    title: 'Ethical Hacking - Knowledge Check',
    description: 'Test your understanding of ethical hacking principles',
    questions: [
      {
        id: 'q1',
        question: 'What is the most important element that defines ethical hacking?',
        options: ['Using advanced tools', 'Finding vulnerabilities', 'Permission from the system owner', 'Working for a company'],
        correctAnswer: 2,
        explanation: 'Permission is the crucial element that distinguishes ethical hacking from malicious hacking.',
      },
      {
        id: 'q2',
        question: 'What is a "Rules of Engagement" document?',
        options: ['A gaming rulebook', 'A document specifying what systems can be tested and how', 'A legal contract for employment', 'A security policy'],
        correctAnswer: 1,
        explanation: 'Rules of Engagement specify exactly what systems can be tested, what methods can be used, and when testing can occur.',
      },
      {
        id: 'q3',
        question: 'Is it legal to hack a system without permission?',
        options: ['Yes, if you find vulnerabilities', 'Yes, if you report them', 'No, it is illegal', 'Only if you are a security professional'],
        correctAnswer: 2,
        explanation: 'Unauthorized hacking is illegal, regardless of intent or profession. Always get explicit written permission.',
      },
    ],
  },
];

export function getQuizForLesson(lessonId: string): Quiz | undefined {
  return quizzes.find((quiz) => quiz.lessonId === lessonId);
}
