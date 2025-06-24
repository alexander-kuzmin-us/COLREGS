// COLREGS data structure for educational content
export interface ColregsRule {
  ruleNumber: string;
  title: string;
  part: string;
  partTitle: string;
  officialText: string;
  plainEnglish: string;
  keyPoints: string[];
  commonViolations: string[];
  relatedRules: string[];
  scenarios?: Scenario[];
}

export interface Scenario {
  id: string;
  title: string;
  description: string;
  situation: string;
  correctAction: string;
  explanation: string;
}

export interface QuizQuestion {
  id: string;
  ruleId: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

// Maritime terms glossary
export const maritimeGlossary = {
  "vessel": "Any description of water craft, including non-displacement craft, WIG craft and seaplanes, used or capable of being used as a means of transportation on water.",
  "power-driven vessel": "Any vessel propelled by machinery.",
  "sailing vessel": "Any vessel under sail provided that propelling machinery, if fitted, is not being used.",
  "vessel engaged in fishing": "Any vessel fishing with nets, lines, trawls or other fishing apparatus which restrict manoeuvrability, but does not include a vessel fishing with trolling lines or other fishing apparatus which do not restrict manoeuvrability.",
  "seaplane": "Any aircraft designed to manoeuvre on the water.",
  "vessel not under command": "A vessel which through some exceptional circumstance is unable to manoeuvre as required by these Rules and is therefore unable to keep out of the way of another vessel.",
  "vessel restricted in her ability to manoeuvre": "A vessel which from the nature of her work is restricted in her ability to manoeuvre as required by these Rules and is therefore unable to keep out of the way of another vessel.",
  "vessel constrained by her draught": "A power-driven vessel which because of her draught in relation to the available depth and width of navigable water is severely restricted in her ability to deviate from the course she is following.",
  "underway": "A vessel is underway when she is not at anchor, or made fast to the shore, or aground.",
  "length": "Length overall.",
  "vessels in sight of one another": "Vessels are in sight of one another only when one can be observed visually from the other."
};

// Part descriptions
export const colregsParts = {
  "A": {
    title: "General",
    description: "Basic rules that apply to all vessels including definitions and fundamental principles"
  },
  "B": {
    title: "Steering and Sailing Rules", 
    description: "Navigation rules for vessel encounters and collision avoidance"
  },
  "C": {
    title: "Lights and Shapes",
    description: "Requirements for navigation lights and day shapes to indicate vessel status"
  },
  "D": {
    title: "Sound and Light Signals",
    description: "Sound signals for maneuvering and fog, plus distress signals"
  },
  "E": {
    title: "Exemptions",
    description: "Special provisions for certain vessels and circumstances"
  }
};

// Common maritime scenarios for interactive learning
export const commonScenarios = [
  {
    id: "crossing-situation",
    title: "Crossing Situation",
    description: "Two power-driven vessels crossing paths",
    ruleNumber: "15",
    situation: "Your vessel is on a steady bearing with another vessel approaching from your starboard side.",
    correctAction: "Give way - alter course to starboard or reduce speed",
    explanation: "Rule 15 states that when two power-driven vessels are crossing, the vessel with the other on her starboard side must give way."
  },
  {
    id: "head-on-situation", 
    title: "Head-on Situation",
    description: "Two vessels meeting head-on or nearly so",
    ruleNumber: "14",
    situation: "Another vessel is approaching directly ahead on a reciprocal course.",
    correctAction: "Both vessels alter course to starboard",
    explanation: "Rule 14 requires both vessels to alter course to starboard when meeting head-on to pass port to port."
  },
  {
    id: "overtaking-situation",
    title: "Overtaking",
    description: "One vessel overtaking another",
    ruleNumber: "13", 
    situation: "You are approaching another vessel from behind at a faster speed.",
    correctAction: "Keep clear of the vessel being overtaken",
    explanation: "Rule 13 states that any vessel overtaking another must keep out of the way of the vessel being overtaken."
  }
];
