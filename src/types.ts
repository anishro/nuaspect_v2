/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type PageView = 'HELLO' | 'KNOWLEDGE_HUB' | 'ACADEMY' | 'WAVSPECTRA' | 'ABOUT_THE_TEAM' | 'CONTACT';

export interface NavItem {
  id: PageView;
  label: string;
  isButton?: boolean;
}

export interface AssessmentQuestion {
  id: number;
  question: string;
  category: string;
  correctKey: string;
  options: {
    key: string;
    text: string;
    score: number;
  }[];
}

export interface AssessmentResult {
  score: number;
  maxScore: number;
  title: string;
  description: string;
}
