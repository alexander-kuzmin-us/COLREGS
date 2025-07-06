// Complete COLREGS 1972 - All 41 Rules Implementation
import type { InsertRule, InsertQuiz } from "@shared/schema";

export const completeColregsRules: InsertRule[] = [
  // PART B - Section II: Conduct of Vessels in Sight of One Another (Rules 11-18)
  {
    ruleNumber: "11",
    title: "Application",
    part: "B",
    partTitle: "Steering and Sailing Rules - Section II",
    officialText: "Rules in this Section apply to vessels in sight of one another.",
    plainEnglish: "Rules 12-18 apply when vessels can see each other visually (not just on radar).",
    keyPoints: ["Visual contact required", "Foundation for encounter rules", "Supplements general rules"],
    commonViolations: ["Applying when not in sight", "Confusion with radar contact"],
    relatedRules: ["12", "13", "14", "15", "16", "17", "18"]
  },
  {
    ruleNumber: "12",
    title: "Sailing Vessels",
    part: "B", 
    partTitle: "Steering and Sailing Rules - Section II",
    officialText: "(a) When two sailing vessels are approaching one another, so as to involve risk of collision, one of them shall keep out of the way of the other as follows:\n(i) when each has the wind on a different side, the vessel which has the wind on the port side shall keep out of the way of the other;\n(ii) when both have the wind on the same side, the vessel which is to windward shall keep out of the way of the vessel which is to leeward;\n(iii) if a vessel with the wind on the port side sees a vessel to windward and cannot determine with certainty whether the other vessel has the wind on the port or on the starboard side, she shall keep out of the way of the other.\n\n(b) For the purposes of this Rule the windward side shall be deemed to be the side opposite to that on which the main boom is carried or, in the case of a square-rigged vessel, the side opposite to that on which the largest fore-and-aft sail is carried.",
    plainEnglish: "When sailing vessels approach each other:\n\n(a) Give-way rules:\n- Port tack gives way to starboard tack\n- Windward vessel gives way to leeward vessel (same tack)\n- If uncertain about other vessel's tack, keep clear\n\n(b) Windward side is opposite to where the main boom is carried.",
    keyPoints: ["Port tack gives way", "Windward gives way to leeward", "When in doubt, give way", "Main boom determines windward side"],
    commonViolations: ["Confusion about tack determination", "Not identifying windward/leeward", "Applying power vessel rules"],
    relatedRules: ["11", "13", "16", "17"]
  },
  {
    ruleNumber: "13",
    title: "Overtaking",
    part: "B",
    partTitle: "Steering and Sailing Rules - Section II", 
    officialText: "(a) Notwithstanding anything contained in the Rules of Part B, Sections I and II, any vessel overtaking any other shall keep out of the way of the vessel being overtaken.\n\n(b) A vessel shall be deemed to be overtaking when coming up with another vessel from a direction more than 22.5 degrees abaft her beam, that is, in such a position with reference to the vessel she is overtaking, that at night she would be able to see only the sternlight of that vessel but neither of her sidelights.\n\n(c) When a vessel is in any doubt as to whether she is overtaking another, she shall assume that this is the case and act accordingly.",
    plainEnglish: "(a) Overtaking vessels must always keep clear, regardless of other rules.\n\n(b) Overtaking means approaching from more than 22.5° behind the beam (where you'd see only the stern light at night).\n\n(c) When in doubt about overtaking, assume you are and give way.",
    keyPoints: ["Overtaking vessel always gives way", "22.5° rule for overtaking sector", "When in doubt, assume overtaking", "Overrides other give-way rules"],
    commonViolations: ["Confusion about overtaking sector", "Not maintaining give-way until clear", "Claiming right of way while overtaking"],
    relatedRules: ["12", "14", "15", "16", "17"]
  },
  {
    ruleNumber: "14",
    title: "Head-on Situation",
    part: "B",
    partTitle: "Steering and Sailing Rules - Section II",
    officialText: "(a) When two power-driven vessels are meeting on reciprocal or nearly reciprocal courses so as to involve risk of collision each shall alter her course to starboard so that each shall pass on the port side of the other.\n\n(b) Such a situation shall be deemed to exist when a vessel sees the other ahead or nearly ahead and by night she could see the masthead lights of the other in a line or nearly in a line and/or both sidelights and by day she observes the corresponding aspect of the other vessel.\n\n(c) When a vessel is in any doubt as to whether such a situation exists she shall assume that it does exist and act accordingly.",
    plainEnglish: "(a) When power vessels meet head-on, both turn to starboard (right) to pass port-to-port.\n\n(b) Head-on situation exists when you see both masthead lights in line and both sidelights (or corresponding daytime view).\n\n(c) When in doubt if it's head-on, assume it is and turn starboard.",
    keyPoints: ["Both vessels turn starboard", "Pass port-to-port", "Both masthead lights visible", "When in doubt, assume head-on"],
    commonViolations: ["Only one vessel altering course", "Turning to port instead of starboard", "Not recognizing head-on situation"],
    relatedRules: ["11", "13", "15", "16", "17"]
  },
  {
    ruleNumber: "15", 
    title: "Crossing Situation",
    part: "B",
    partTitle: "Steering and Sailing Rules - Section II",
    officialText: "When two power-driven vessels are crossing so as to involve risk of collision, the vessel which has the other on her own starboard side shall keep out of the way and shall, if the circumstances of the case admit, avoid crossing ahead of the other vessel.",
    plainEnglish: "When power vessels cross paths, the vessel with the other on its starboard (right) side gives way and should not cross ahead of the other vessel.",
    keyPoints: ["Give way to vessels on your starboard side", "Don't cross ahead of stand-on vessel", "Only applies to power-driven vessels crossing"],
    commonViolations: ["Confusion about which vessel gives way", "Crossing ahead of stand-on vessel", "Not taking early action"],
    relatedRules: ["11", "13", "14", "16", "17"]
  },
  {
    ruleNumber: "16",
    title: "Action by Give-way Vessel", 
    part: "B",
    partTitle: "Steering and Sailing Rules - Section II",
    officialText: "Every vessel which is directed to keep out of the way of another vessel shall, so far as possible, take early and substantial action to keep well clear.",
    plainEnglish: "Give-way vessels must take early, obvious action to stay well clear of the other vessel.",
    keyPoints: ["Take early action", "Make substantial changes", "Keep well clear", "Action must be obvious"],
    commonViolations: ["Taking action too late", "Making insufficient course changes", "Gradual alterations that aren't obvious"],
    relatedRules: ["11", "12", "13", "14", "15", "17"]
  },
  {
    ruleNumber: "17",
    title: "Action by Stand-on Vessel",
    part: "B", 
    partTitle: "Steering and Sailing Rules - Section II",
    officialText: "(a) (i) Where one of two vessels is to keep out of the way the other shall keep her course and speed.\n(ii) The latter vessel may however take action to avoid collision by her maneuver alone, as soon as it becomes apparent to her that the vessel required to keep out of the way is not taking appropriate action in compliance with these Rules.\n\n(b) When, from any cause, the vessel required to keep her course and speed finds herself so close that collision cannot be avoided by the action of the give-way vessel alone, she shall take such action as will best aid to avoid collision.\n\n(c) A power-driven vessel which takes action in a crossing situation in accordance with subparagraph (a)(ii) of this Rule to avoid collision with another power-driven vessel shall, if the circumstances of the case admit, not alter course to port for a vessel on her own port side.\n\n(d) This Rule does not relieve the give-way vessel of her obligation to keep out of the way.",
    plainEnglish: "(a) Stand-on vessels maintain course and speed, but may act if the give-way vessel doesn't take proper action.\n\n(b) If collision becomes unavoidable by give-way vessel action alone, stand-on vessel must act.\n\n(c) In crossing situations, stand-on vessels should not turn to port for vessels on their port side.\n\n(d) Give-way vessel still has obligation to give way.",
    keyPoints: ["Maintain course and speed initially", "Act if give-way vessel doesn't respond", "Avoid altering to port in crossing", "Both vessels responsible for collision avoidance"],
    commonViolations: ["Acting too early", "Turning into the give-way vessel", "Not maintaining course when required"],
    relatedRules: ["11", "12", "13", "14", "15", "16"]
  },
  {
    ruleNumber: "18",
    title: "Responsibilities Between Vessels",
    part: "B",
    partTitle: "Steering and Sailing Rules - Section II", 
    officialText: "(a) A power-driven vessel underway shall keep out of the way of:\n(i) a vessel not under command;\n(ii) a vessel restricted in her ability to maneuver;\n(iii) a vessel engaged in fishing;\n(iv) a sailing vessel.\n\n(b) A sailing vessel underway shall keep out of the way of:\n(i) a vessel not under command;\n(ii) a vessel restricted in her ability to maneuver;\n(iii) a vessel engaged in fishing.\n\n(c) A vessel engaged in fishing when underway shall, so far as possible, keep out of the way of:\n(i) a vessel not under command;\n(ii) a vessel restricted in her ability to maneuver.\n\n(d) (i) Any vessel other than a vessel not under command or a vessel restricted in her ability to maneuver shall, if the circumstances of the case admit, avoid impeding the passage of a vessel constrained by her draft, exhibiting the signals in Rule 28.\n(ii) A vessel constrained by her draft shall navigate with particular caution having full regard to her special condition.\n\n(e) A seaplane on the water shall, in general, keep well clear of all vessels and avoid impeding their navigation. In circumstances, however, where risk of collision exists, she shall comply with the Rules of this Part.",
    plainEnglish: "Hierarchy of give-way responsibilities:\n\n(a) Power vessels give way to: not under command, restricted maneuverability, fishing, sailing\n\n(b) Sailing vessels give way to: not under command, restricted maneuverability, fishing\n\n(c) Fishing vessels give way to: not under command, restricted maneuverability\n\n(d) All vessels avoid impeding draft-constrained vessels\n\n(e) Seaplanes keep clear of all vessels",
    keyPoints: ["Vessel hierarchy based on maneuverability", "Less maneuverable vessels have right of way", "Draft-constrained vessels get special consideration", "Seaplanes avoid all vessels"],
    commonViolations: ["Power vessels not giving way to sailing vessels", "Not recognizing vessel status", "Impeding restricted vessels"],
    relatedRules: ["11", "27", "28", "26"]
  },

  // PART B - Section III: Conduct of Vessels in Restricted Visibility (Rule 19)
  {
    ruleNumber: "19",
    title: "Conduct of Vessels in Restricted Visibility",
    part: "B",
    partTitle: "Steering and Sailing Rules - Section III",
    officialText: "(a) This Rule applies to vessels not in sight of one another when navigating in or near an area of restricted visibility.\n\n(b) Every vessel shall proceed at a safe speed adapted to the prevailing circumstances and conditions of restricted visibility. A power-driven vessel shall have her engines ready for immediate maneuver.\n\n(c) Every vessel shall have due regard to the prevailing circumstances and conditions of restricted visibility when complying with the Rules of Section I of this Part.\n\n(d) A vessel which detects by radar alone the presence of another vessel shall determine if a close-quarters situation is developing and/or risk of collision exists. If so, she shall take avoiding action in ample time, provided that when such action consists of an alteration of course, so far as possible the following shall be avoided:\n(i) an alteration of course to port for a vessel forward of the beam, other than for a vessel being overtaken;\n(ii) an alteration of course towards a vessel abeam or abaft the beam.\n\n(e) Except where it has been determined that a risk of collision does not exist, every vessel which hears apparently forward of her beam the fog signal of another vessel, or which cannot avoid a close-quarters situation with another vessel forward of her beam, shall reduce her speed to the minimum at which she can be kept on her course. She shall if necessary take all her way off and in any event navigate with extreme caution until danger of collision is over.",
    plainEnglish: "(a) Applies when vessels can't see each other in fog/restricted visibility.\n\n(b) Proceed at safe speed with engines ready for immediate maneuver.\n\n(c) Apply Section I rules with regard to restricted visibility.\n\n(d) For radar contacts: avoid turning to port for vessels ahead (except when overtaking) and avoid turning toward vessels abeam or behind.\n\n(e) When hearing fog signals ahead or in close quarters, reduce to minimum speed or stop until danger passes.",
    keyPoints: ["Safe speed in fog", "Engines ready", "Avoid port turns for vessels ahead", "Reduce speed when hearing fog signals", "Navigate with extreme caution"],
    commonViolations: ["Excessive speed in fog", "Inappropriate course alterations", "Not reducing speed when required", "Relying only on radar"],
    relatedRules: ["6", "35", "7", "8"]
  }
];

// Additional quizzes for new rules
export const additionalQuizzes: InsertQuiz[] = [
  // Rule 11 quizzes
  {
    ruleId: 0, // Will be updated during seeding
    question: "When do Rules 12-18 apply according to Rule 11?",
    options: [
      "When vessels are within 5 nautical miles",
      "When vessels are in sight of one another", 
      "When vessels detect each other on radar",
      "Only in good weather conditions"
    ],
    correctAnswer: 1,
    explanation: "Rule 11 states that Rules in Section II apply to vessels in sight of one another - visual contact is required, not just radar detection.",
    difficulty: "easy"
  },
  
  // Rule 12 quizzes  
  {
    ruleId: 0,
    question: "In a sailing vessel encounter, which vessel gives way when both have wind on different sides?",
    options: [
      "The vessel to starboard",
      "The vessel with wind on port side",
      "The vessel with wind on starboard side", 
      "The faster vessel"
    ],
    correctAnswer: 1,
    explanation: "According to Rule 12(a)(i), when sailing vessels have wind on different sides, the vessel with wind on the port side gives way.",
    difficulty: "medium"
  },
  
  // Rule 13 quizzes
  {
    ruleId: 0,
    question: "What defines the overtaking sector according to Rule 13?",
    options: [
      "More than 15 degrees abaft the beam",
      "More than 22.5 degrees abaft the beam",
      "More than 30 degrees abaft the beam",
      "Anywhere behind the vessel"
    ],
    correctAnswer: 1,
    explanation: "Rule 13(b) defines overtaking as approaching from more than 22.5 degrees abaft the beam - where you'd see only the stern light at night.",
    difficulty: "hard"
  },
  
  // Rule 14 quizzes
  {
    ruleId: 0,
    question: "In a head-on situation between power vessels, what should both vessels do?",
    options: [
      "Both alter course to port",
      "Both alter course to starboard", 
      "One stops, one continues",
      "The faster vessel gives way"
    ],
    correctAnswer: 1,
    explanation: "Rule 14(a) requires both power-driven vessels to alter course to starboard so they pass port-to-port in a head-on situation.",
    difficulty: "easy"
  },
  
  // Rule 15 quizzes
  {
    ruleId: 0,
    question: "In a crossing situation, which power vessel gives way?",
    options: [
      "The vessel on the port side",
      "The vessel with the other on its starboard side",
      "The faster vessel", 
      "The larger vessel"
    ],
    correctAnswer: 1,
    explanation: "Rule 15 states that the vessel which has the other on her starboard side shall give way in a crossing situation.",
    difficulty: "medium"
  },
  
  // Rule 16 quizzes
  {
    ruleId: 0,
    question: "What type of action must a give-way vessel take according to Rule 16?",
    options: [
      "Gradual and subtle changes",
      "Early and substantial action",
      "Last-minute emergency maneuvers",
      "Sound signals only"
    ],
    correctAnswer: 1,
    explanation: "Rule 16 requires give-way vessels to take early and substantial action to keep well clear - the action must be obvious.",
    difficulty: "easy"
  },
  
  // Rule 17 quizzes
  {
    ruleId: 0,
    question: "When may a stand-on vessel take action according to Rule 17?",
    options: [
      "Immediately upon seeing another vessel",
      "When the give-way vessel is not taking appropriate action",
      "Only in emergency situations",
      "Never - must always maintain course"
    ],
    correctAnswer: 1,
    explanation: "Rule 17(a)(ii) allows stand-on vessels to take action when it becomes apparent the give-way vessel is not taking appropriate action.",
    difficulty: "medium"
  },
  
  // Rule 18 quizzes
  {
    ruleId: 0,
    question: "Which vessels must a power-driven vessel give way to according to Rule 18?",
    options: [
      "Only sailing vessels",
      "Only fishing vessels", 
      "Vessels not under command, restricted in ability to maneuver, fishing, and sailing",
      "All other vessels"
    ],
    correctAnswer: 2,
    explanation: "Rule 18(a) lists four types of vessels that power-driven vessels must give way to: not under command, restricted maneuverability, fishing, and sailing.",
    difficulty: "hard"
  },
  
  // Rule 19 quizzes
  {
    ruleId: 0,
    question: "In restricted visibility, what should you avoid when altering course for a radar contact?",
    options: [
      "Any course alteration",
      "Altering to port for vessels forward of the beam (except when overtaking)",
      "Altering to starboard",
      "Reducing speed"
    ],
    correctAnswer: 1,
    explanation: "Rule 19(d)(i) states you should avoid altering course to port for vessels forward of the beam, except when overtaking.",
    difficulty: "hard"
  },
  
  {
    ruleId: 0,
    question: "What must you do when hearing a fog signal apparently forward of your beam?",
    options: [
      "Increase speed to clear the area",
      "Maintain current speed and course",
      "Reduce speed to minimum or stop if necessary",
      "Turn 180 degrees"
    ],
    correctAnswer: 2,
    explanation: "Rule 19(e) requires reducing speed to minimum at which the vessel can be kept on course, or taking all way off if necessary.",
    difficulty: "medium"
  }
];