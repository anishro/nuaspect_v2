/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AssessmentQuestion } from './types';

export const assessmentQuestions: AssessmentQuestion[] = [
  {
    id: 1,
    question: "A patient repeatedly asks: \"What if I accidentally harmed someone without realizing it?\"\nThe MOST important follow-up question is:",
    category: "Cognitive Intrusions & OCD Models",
    correctKey: "b",
    options: [
      { key: "a", text: "“Have you harmed someone before?”", score: 0 },
      { key: "b", text: "“Do you believe this thought is definitely true?”", score: 1 },
      { key: "c", text: "“How often does this happen?”", score: 0 },
      { key: "d", text: "“What would happen if you ignored the thought?”", score: 0 }
    ]
  },
  {
    id: 2,
    question: "Which scenario BEST represents thought-action fusion?",
    category: "Cognitive Intrusions & OCD Models",
    correctKey: "b",
    options: [
      { key: "a", text: "“Thinking this means I secretly want it.”", score: 0 },
      { key: "b", text: "“If I think about harm, it may happen because of me.”", score: 1 },
      { key: "c", text: "“My thoughts feel intrusive.”", score: 0 },
      { key: "d", text: "“I can’t stop worrying.”", score: 0 }
    ]
  },
  {
    id: 3,
    question: "A therapist quickly labels a client’s avoidance as “resistance” without assessing fear, shame, exhaustion, or dissociation.\nThis primarily reflects:",
    category: "Clinical Formulation Methodologies",
    correctKey: "b",
    options: [
      { key: "a", text: "Poor rapport", score: 0 },
      { key: "b", text: "Premature formulation", score: 1 },
      { key: "c", text: "Boundary violation", score: 0 },
      { key: "d", text: "Symptom minimization", score: 0 }
    ]
  },
  {
    id: 4,
    question: "A person repeatedly changes cities, quits jobs suddenly, and avoids long-term commitments because “freedom matters more than stability.”\nWhich need is MOST central?",
    category: "Personology & Needs-Press Theory",
    correctKey: "c",
    options: [
      { key: "a", text: "nPlay", score: 0 },
      { key: "b", text: "nExcitance", score: 0 },
      { key: "c", text: "nAutonomy", score: 1 },
      { key: "d", text: "nChange", score: 0 }
    ]
  },
  {
    id: 5,
    question: "A child grows up without emotional support, guidance, or reliable caregivers.\nWhich press is MOST central?",
    category: "Personology & Needs-Press Theory",
    correctKey: "b",
    options: [
      { key: "a", text: "pLoss", score: 0 },
      { key: "b", text: "pLack (human support)", score: 1 },
      { key: "c", text: "pAffliction", score: 0 },
      { key: "d", text: "pRejection", score: 0 }
    ]
  },
  {
    id: 6,
    question: "A client says: “No one ever stays.”\nWhich response BEST follows Socratic principles?",
    category: "Socratic Interventions",
    correctKey: "b",
    options: [
      { key: "a", text: "“That sounds like abandonment trauma.”", score: 0 },
      { key: "b", text: "“Who specifically comes to mind when you say ‘no one’?”", score: 1 },
      { key: "c", text: "“That belief is irrational.”", score: 0 },
      { key: "d", text: "“You need stronger self-esteem.”", score: 0 }
    ]
  },
  {
    id: 7,
    question: "Which question BEST explores implication?",
    category: "Socratic Interventions",
    correctKey: "c",
    options: [
      { key: "a", text: "“What does this word mean to you?”", score: 0 },
      { key: "b", text: "“What evidence contradicts this?”", score: 0 },
      { key: "c", text: "“If this belief is true, what does that mean for your future?”", score: 1 },
      { key: "d", text: "“How would others see this?”", score: 0 }
    ]
  },
  {
    id: 8,
    question: "According to Wells’ model of GAD, Type 2 worry refers to:",
    category: "GAD & Metacognitive Models",
    correctKey: "c",
    options: [
      { key: "a", text: "Worry about external events", score: 0 },
      { key: "b", text: "Worry about bodily sensations", score: 0 },
      { key: "c", text: "Worry about worry itself", score: 1 },
      { key: "d", text: "Social evaluative worry", score: 0 }
    ]
  },
  {
    id: 9,
    question: "A patient experiences profound unfamiliarity with the external world and says: “Everything feels unreal and emotionally distant.”\nThis is MOST accurately:",
    category: "Phenomenology & Dissociation",
    correctKey: "b",
    options: [
      { key: "a", text: "Depersonalization", score: 0 },
      { key: "b", text: "Derealization", score: 1 },
      { key: "c", text: "Emotional blunting", score: 0 },
      { key: "d", text: "Nihilistic ideation", score: 0 }
    ]
  },
  {
    id: 10,
    question: "A patient reports: “My thoughts suddenly disappear midway.”\nThis MOST specifically reflects:",
    category: "Formal Thought Disorders",
    correctKey: "b",
    options: [
      { key: "a", text: "Thought withdrawal", score: 0 },
      { key: "b", text: "Thought blocking", score: 1 },
      { key: "c", text: "Inhibition of thinking", score: 0 },
      { key: "d", text: "Poverty of thought", score: 0 }
    ]
  },
  {
    id: 11,
    question: "A patient’s speech moves from topic to topic with no understandable connection whatsoever.\nThis MOST specifically suggests:",
    category: "Formal Thought Disorders",
    correctKey: "b",
    options: [
      { key: "a", text: "Flight of ideas", score: 0 },
      { key: "b", text: "Loosening of associations", score: 1 },
      { key: "c", text: "Circumstantiality", score: 0 },
      { key: "d", text: "Perseveration", score: 0 }
    ]
  },
  {
    id: 12,
    question: "A therapist identifies: core beliefs, avoidance patterns, attachment dynamics, social reinforcement, and motivational barriers.\nThis is MOST accurately described as:",
    category: "Clinical Formulation Methodologies",
    correctKey: "b",
    options: [
      { key: "a", text: "Diagnostic assessment", score: 0 },
      { key: "b", text: "Comprehensive case formulation", score: 1 },
      { key: "c", text: "Symptom conceptualization", score: 0 },
      { key: "d", text: "Functional exposure planning", score: 0 }
    ]
  },
  {
    id: 13,
    question: "Which term BEST describes a disorder model applied broadly across patients?",
    category: "Clinical Formulation Methodologies",
    correctKey: "c",
    options: [
      { key: "a", text: "Idiographic formulation", score: 0 },
      { key: "b", text: "Mechanistic conceptualization", score: 0 },
      { key: "c", text: "Nomothetic formulation", score: 1 },
      { key: "d", text: "Functional analysis", score: 0 }
    ]
  }
];

export interface AdviceDetails {
  scoreRange: string;
  generalAdvice: string;
  topicsToReview: { topic: string; reason: string }[];
}

export function getAdviceForScore(correctCount: number, incorrectCategories: string[]): AdviceDetails {
  const percentage = (correctCount / 13) * 100;
  
  const allTopicReasonMap: Record<string, string> = {
    "Cognitive Intrusions & OCD Models": "Assessments around intrusive safety/harm worries, thought-action fusion vs cognitive appraisal biases, and structural follow-ups.",
    "Clinical Formulation Methodologies": "Premature diagnostic labeling, holistic multi-domain conceptual models, and standard nomothetic vs idiographic formulation styles.",
    "Personology & Needs-Press Theory": "Murray's Need Theory (nAutonomy, nChange, nPlay) combined with environmental presses (pLack, pLoss, pAffliction).",
    "Socratic Interventions": "Socratic questioning protocols, distinction between evidence queries vs. implication inquiries, and avoiding direct confirmation.",
    "GAD & Metacognitive Models": "Wells' Metacognitive model, distinguishing Type 1 (cognitive worry) from Type 2 (metaworry/worry about worry status).",
    "Phenomenology & Dissociation": "Focal clinical presentation differences between altered environment states (derealization) vs. altered self states (depersonalization).",
    "Formal Thought Disorders": "Understanding psychopathology metrics, including physical speech/thought stream alterations like loosening of associations & thought blocking."
  };

  const topicsToReview = Array.from(new Set(incorrectCategories)).map(cat => ({
    topic: cat,
    reason: allTopicReasonMap[cat] || "Refining clinical assessment pathways and theoretical models."
  }));

  // If perfect score, suggest general mastery guidelines
  if (topicsToReview.length === 0) {
    topicsToReview.push({
      topic: "Advanced Case Conceptualizations",
      reason: "Integrate idiographic clinical formulations into high-density clinical care plans."
    });
  }

  if (percentage >= 85) {
    return {
      scoreRange: "Excellent Mastery (11 - 13 Correct)",
      generalAdvice: "Outstanding diagnostic discernment! You demonstrate highly complete cognitive and phenomenological knowledge of standard clinical, metacognitive, and narrative case conceptualization methodologies. Continue refining your edge-case clinical formulations for highly complex symptom interactions.",
      topicsToReview
    };
  } else if (percentage >= 60) {
    return {
      scoreRange: "Proficient Practitioner (8 - 10 Correct)",
      generalAdvice: "Very solid core base. You show strong familiarity with case structure, Needs-Press principles, and major metacognitive loops. To reach absolute mastery, sharpen your attention to subtle differences in Formal Thought Disorder speech mechanics, and check specific differences in Socratic implication methods.",
      topicsToReview
    };
  } else if (percentage >= 35) {
    return {
      scoreRange: "Developing Comprehension (5 - 7 Correct)",
      generalAdvice: "You show moderate familiarity with standard assessment methods but mixed accuracy on structured cognitive models like Wells' metaworry structures, Socratic techniques, and psychopathology terms.",
      topicsToReview
    };
  } else {
    return {
      scoreRange: "Fundamental Focus Recommended (0 - 4 Correct)",
      generalAdvice: "We recommend reviewing basic clinical formulations and phenomenological criteria. Understanding the fundamental mechanics of cognitive models, Socratic protocols, and formal thought markers will heavily scale your precision.",
      topicsToReview
    };
  }
}
