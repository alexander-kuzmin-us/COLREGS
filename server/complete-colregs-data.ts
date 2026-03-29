// Complete COLREGS 1972 Rules and Quizzes Data
import type { InsertRule, InsertQuiz } from "@shared/schema";

// Add remaining COLREGS rules to complete the full set
export const additionalColregsRules: InsertRule[] = [
  // Continue from Rule 11 onwards
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
  }
];

export const completeColregsRules: InsertRule[] = [
  // PART A - GENERAL
  {
    ruleNumber: "1",
    title: "Application",
    part: "A",
    partTitle: "General",
    officialText: "(a) These Rules shall apply to all vessels upon the high seas and in all waters connected therewith navigable by seagoing vessels.\n\n(b) Nothing in these Rules shall interfere with the operation of special rules made by an appropriate authority for roadsteads, harbors, rivers, lakes or inland waterways connected with the high seas and navigable by seagoing vessels. Such special rules shall conform as closely as possible to these Rules.\n\n(c) Nothing in these Rules shall interfere with the operation of any special rules made by the Government of any State with respect to additional station or signal lights or whistle signals for ships of war and vessels proceeding under convoy, or with respect to additional station or signal lights for fishing vessels engaged in fishing as a fleet. These additional station or signal lights or whistle signals shall, so far as possible, be such that they cannot be mistaken for any light or signal authorized elsewhere under these Rules.\n\n(d) Traffic separation schemes may be adopted by the Organization for the purpose of these Rules.\n\n(e) Whenever the Government concerned shall have determined that a vessel of special construction or purpose cannot comply fully with the provisions of any of these Rules with respect to the number, position, range or arc of visibility of lights or shapes, as well as to the disposition and characteristics of sound-signaling appliances, without interfering with the special function of the vessel, such vessel shall comply with such other provisions in regard to the number, position, range or arc of visibility of lights or shapes, as well as to the disposition and characteristics of sound-signaling appliances, as her Government shall have determined to be the closest possible compliance with these Rules in respect to that vessel.",
    plainEnglish: "Rule 1 establishes the scope and application of COLREGS:\n\n(a) Universal application: These rules apply to all vessels on the high seas and connected navigable waters.\n\n(b) Local rules compatibility: Local harbor and waterway authorities can make special rules, but they must be as close as possible to COLREGS.\n\n(c) Military and fishing vessel exceptions: Governments can authorize additional lights and signals for warships, convoys, and fishing fleets, provided they don't conflict with standard COLREGS signals.\n\n(d) Traffic separation schemes: Under these Rules, traffic separation schemes may be adopted by the Organization (as defined in the Rules).\n\n(e) Special vessel exemptions: Vessels with unique construction or purpose may be granted exemptions from specific requirements when full compliance would interfere with their function.",
    keyPoints: ["Applies to all vessels on high seas", "Local rules must conform to COLREGS", "Special provisions for military and fishing vessels", "Traffic separation schemes may be adopted by the Organization", "Exemptions for special construction vessels"],
    commonViolations: ["Assuming local rules override COLREGS", "Ignoring COLREGS in territorial waters", "Misunderstanding exemption scope"],
    relatedRules: ["2", "3"]
  },
  {
    ruleNumber: "2",
    title: "Responsibility",
    part: "A",
    partTitle: "General",
    officialText: "(a) Nothing in these Rules shall exonerate any vessel, or the owner, master or crew thereof, from the consequences of any neglect to comply with these Rules or of the neglect of any precaution which may be required by the ordinary practice of seamen, or by the special circumstances of the case.\n\n(b) In construing and complying with these Rules due regard shall be had to all dangers of navigation and collision and to any special circumstances, including the limitations of the vessels involved, which may make a departure from these Rules necessary to avoid immediate danger.",
    plainEnglish: "(a) Personal responsibility: Following these rules doesn't excuse you from using good seamanship and taking extra precautions when needed. You're still responsible for safe navigation and any consequences of neglect.\n\n(b) Special circumstances: When applying these rules, you must consider all navigation dangers and special situations, including vessel limitations, that might require departing from the rules to avoid immediate danger.",
    keyPoints: ["Personal responsibility cannot be transferred", "Good seamanship always required", "Special circumstances must be considered", "May depart from rules to avoid immediate danger"],
    commonViolations: ["Over-reliance on rules without judgment", "Ignoring special circumstances", "Failure to use good seamanship"],
    relatedRules: ["1", "3"]
  },
  {
    ruleNumber: "3",
    title: "General Definitions",
    part: "A",
    partTitle: "General",
    officialText: "For the purpose of these Rules, except where the context otherwise requires:\n\n(a) The word 'vessel' includes every description of water craft, including non-displacement craft and seaplanes, used or capable of being used as a means of transportation on water.\n\n(b) The term 'power-driven vessel' means any vessel propelled by machinery.\n\n(c) The term 'sailing vessel' means any vessel under sail provided that propelling machinery, if fitted, is not being used.\n\n(d) The term 'vessel engaged in fishing' means any vessel fishing with nets, lines, trawls or other fishing apparatus which restrict manoeuvrability, but does not include a vessel fishing with trolling lines or other fishing apparatus which do not restrict manoeuvrability.\n\n(e) The word 'seaplane' includes any aircraft designed to manoeuvre on the water.\n\n(f) The term 'vessel not under command' means a vessel which through some exceptional circumstance is unable to manoeuvre as required by these Rules and is therefore unable to keep out of the way of another vessel.\n\n(g) The term 'vessel restricted in her ability to manoeuvre' means a vessel which from the nature of her work is restricted in her ability to manoeuvre as required by these Rules and is therefore unable to keep out of the way of another vessel.",
    plainEnglish: "Rule 3 defines key maritime terms:\n\n(a) Vessel: Any watercraft including boats, ships, hovercraft, and seaplanes used for water transportation.\n\n(b) Power-driven vessel: Any vessel propelled by machinery (engines).\n\n(c) Sailing vessel: A vessel under sail only (engine not in use).\n\n(d) Vessel engaged in fishing: Vessels using fishing gear that restricts maneuverability (not trolling).\n\n(e) Seaplane: Aircraft designed to operate on water.\n\n(f) Vessel not under command: Unable to maneuver due to exceptional circumstances.\n\n(g) Vessel restricted in ability to maneuver: Limited maneuverability due to the nature of work being performed.",
    keyPoints: ["Defines fundamental vessel types", "Distinguishes power vs sail", "Clarifies fishing vessel restrictions", "Explains command limitations", "Foundation for all other rules"],
    commonViolations: ["Misclassifying vessel types", "Confusion about sailing vs motor", "Misunderstanding fishing restrictions"],
    relatedRules: ["1", "2", "18"]
  },

  // PART B - STEERING AND SAILING RULES
  // Section I - Conduct in Any Condition of Visibility
  {
    ruleNumber: "4",
    title: "Application",
    part: "B",
    partTitle: "Steering and Sailing Rules",
    officialText: "Rules in this Section apply in any condition of visibility.",
    plainEnglish: "Rules 5-10 apply in all visibility conditions - clear weather, fog, rain, snow, or any other condition that might affect visibility.",
    keyPoints: ["Applies to all visibility conditions", "Foundation for navigation rules", "Always in effect"],
    commonViolations: ["Ignoring rules in good visibility", "Assuming rules only apply in fog"],
    relatedRules: ["5", "6", "7", "8", "9", "10"]
  },
  {
    ruleNumber: "5",
    title: "Look-out",
    part: "B",
    partTitle: "Steering and Sailing Rules",
    officialText: "Every vessel shall at all times maintain a proper look-out by sight and hearing as well as by all available means appropriate in the prevailing circumstances and conditions so as to make a full appraisal of the situation and of the risk of collision.",
    plainEnglish: "Every vessel must always have someone actively watching for other vessels, obstacles, and hazards using sight, hearing, and all available navigation equipment to assess collision risk.",
    keyPoints: ["Continuous lookout required", "Use sight and hearing", "Use all available means", "Assess collision risk"],
    commonViolations: ["Relying solely on radar", "Inadequate watch during fog", "Distracted navigation", "Ignoring sound signals"],
    relatedRules: ["6", "7", "19"]
  },
  {
    ruleNumber: "6",
    title: "Safe Speed",
    part: "B",
    partTitle: "Steering and Sailing Rules",
    officialText: "Every vessel shall at all times proceed at a safe speed so that she can take proper and effective action to avoid collision and be stopped within a distance appropriate to the prevailing circumstances and conditions.\n\nIn determining a safe speed the following factors shall be among those taken into account:\n\n(a) By all vessels:\n(i) the state of visibility;\n(ii) the traffic density including concentrations of fishing vessels or any other vessels;\n(iii) the manoeuvrability of the vessel with special reference to stopping distance and turning ability in the prevailing conditions;\n(iv) at night the presence of background light such as from shore lights or from back scatter of her own lights;\n(v) the state of wind, sea and current, and the proximity of navigational hazards;\n(vi) the draught in relation to the available depth of water.\n\n(b) Additionally, by vessels with operational radar:\n(i) the characteristics, efficiency and limitations of the radar equipment;\n(ii) any constraints imposed by the radar range scale in use;\n(iii) the effect on radar detection of the sea state, weather and other sources of interference;\n(iv) the possibility that small vessels, ice and other floating objects may not be detected by radar at an adequate range;\n(v) the number, location and movement of vessels detected by radar;\n(vi) the more exact assessment of the visibility that may be possible when radar is used to determine the range of vessels or other objects in the vicinity.",
    plainEnglish: "Always travel at a speed that allows you to stop or avoid collision in time, considering:\n\nFor all vessels: visibility, traffic density, vessel maneuverability, background lighting, weather conditions, and water depth.\n\nFor radar-equipped vessels: also consider radar limitations, interference, detection capabilities, and the additional information radar provides about nearby vessels.",
    keyPoints: ["Speed must allow collision avoidance", "Consider visibility and traffic", "Account for vessel limitations", "Radar has specific considerations", "Multiple factors affect safe speed"],
    commonViolations: ["Excessive speed in fog", "Not reducing speed in traffic", "Ignoring radar limitations", "Overconfidence in radar"],
    relatedRules: ["5", "7", "19"]
  },
  {
    ruleNumber: "7",
    title: "Risk of Collision",
    part: "B",
    partTitle: "Steering and Sailing Rules",
    officialText: "(a) Every vessel shall use all available means appropriate to the prevailing circumstances and conditions to determine if risk of collision exists. If there is any doubt such risk shall be deemed to exist.\n\n(b) Proper use shall be made of radar equipment if fitted and operational, including long-range scanning to obtain early warning of risk of collision and radar plotting or equivalent systematic observation of detected objects.\n\n(c) Assumptions shall not be made on the basis of scanty information, especially scanty radar information.\n\n(d) In determining if risk of collision exists the following considerations shall be among those taken into account:\n(i) such risk shall be deemed to exist if the compass bearing of an approaching vessel does not appreciably change;\n(ii) such risks may sometimes exist even when an appreciable bearing change is evident, particularly when approaching a very large vessel or a tow or when approaching a vessel at close range.",
    plainEnglish: "(a) Use all available means to determine collision risk. When in doubt, assume risk exists.\n\n(b) Use radar properly for early warning and systematic tracking of other vessels.\n\n(c) Don't make assumptions based on limited information, especially incomplete radar data.\n\n(d) Collision risk exists when:\n- Compass bearing doesn't change (constant bearing)\n- Even with bearing change when approaching large vessels, tows, or at close range.",
    keyPoints: ["Use all available means", "When in doubt, assume risk exists", "Proper radar use essential", "Constant bearing = collision risk", "Large vessels need special consideration"],
    commonViolations: ["Poor radar interpretation", "Assuming no risk with bearing change", "Inadequate information gathering", "Late risk assessment"],
    relatedRules: ["5", "6", "8"]
  },
  {
    ruleNumber: "8",
    title: "Action to Avoid Collision",
    part: "B",
    partTitle: "Steering and Sailing Rules",
    officialText: "(a) Any action taken to avoid collision shall, if the circumstances of the case admit, be positive, made in ample time and with due regard to the observance of good seamanship.\n\n(b) Any alteration of course and/or speed to avoid collision shall, if the circumstances of the case admit, be large enough to be readily apparent to another vessel observing visually or by radar; a succession of small alterations of course and/or speed should be avoided.\n\n(c) If there is sufficient sea room, alteration of course alone may be the most effective action to avoid a close-quarters situation provided that is made in good time, is substantial and does not result in another close-quarters situation.\n\n(d) Action taken to avoid collision with another vessel shall be such as to result in passing at a safe distance. The effectiveness of the action shall be carefully checked until the other vessel is finally past and clear.\n\n(e) If necessary to avoid collision or allow more time to assess the situation, a vessel shall slacken her speed or take all way off by stopping or reversing her means of propulsion.",
    plainEnglish: "(a) Collision avoidance actions must be positive, timely, and seamanlike.\n\n(b) Course and speed changes must be large enough to be clearly apparent to other vessels. Avoid small, successive changes.\n\n(c) With sufficient sea room, a substantial course change made early is often most effective.\n\n(d) Ensure actions result in safe passing distance and monitor effectiveness until clear.\n\n(e) Reduce speed or stop if necessary to avoid collision or gain assessment time.",
    keyPoints: ["Actions must be positive and timely", "Changes must be readily apparent", "Course alteration often most effective", "Monitor until vessels are clear", "Reduce speed when necessary"],
    commonViolations: ["Small, ineffective course changes", "Late action", "Failure to monitor effectiveness", "Not reducing speed when appropriate"],
    relatedRules: ["7", "13", "14", "15", "16", "17"]
  },
  {
    ruleNumber: "9",
    title: "Narrow Channels",
    part: "B",
    partTitle: "Steering and Sailing Rules",
    officialText: "(a) A vessel proceeding along the course of a narrow channel or fairway shall keep as near to the outer limit of the channel or fairway which lies on her starboard side as is safe and practicable.\n\n(b) A vessel of less than 20 metres in length or a sailing vessel shall not impede the passage of a vessel which can safely navigate only within a narrow channel or fairway.\n\n(c) A vessel engaged in fishing shall not impede the passage of any other vessel navigating within a narrow channel or fairway.\n\n(d) A vessel shall not cross a narrow channel or fairway if such crossing impedes the passage of a vessel which can safely navigate only within such channel or fairway. The latter vessel may use the sound signal prescribed in Rule 34(d) if in doubt as to the intention of the crossing vessel.\n\n(e) In a narrow channel or fairway when overtaking can take place only if the vessel to be overtaken has to take action to permit safe passing, the vessel intending to overtake shall indicate her intention by sounding the appropriate signal prescribed in Rule 34(c)(i). The vessel to be overtaken shall, if in agreement, sound the appropriate signal prescribed in Rule 34(c)(ii) and take steps to permit safe passing. If in doubt she may sound the signals prescribed in Rule 34(d).",
    plainEnglish: "(a) Stay to the starboard (right) side of narrow channels as much as safely possible.\n\n(b) Small vessels (under 20m) and sailing vessels must not impede larger vessels that can only navigate within the channel.\n\n(c) Fishing vessels must not impede any other vessel in narrow channels.\n\n(d) Don't cross channels if it impedes vessels confined to the channel. Those vessels may sound doubt signals.\n\n(e) Overtaking in narrow channels requires agreement between vessels using specific sound signals.",
    keyPoints: ["Keep to starboard side of channels", "Small vessels give way to large", "No impeding vessel traffic", "Coordinate channel crossings", "Overtaking requires agreement"],
    commonViolations: ["Sailing in wrong part of channel", "Small boats impeding traffic", "Uncoordinated channel crossings", "Attempted overtaking without signals"],
    relatedRules: ["8", "13", "18", "34"]
  },
  {
    ruleNumber: "10",
    title: "Traffic Separation Schemes",
    part: "B",
    partTitle: "Steering and Sailing Rules",
    officialText: "(a) This Rule applies to traffic separation schemes adopted by the Organization and does not relieve any vessel of her obligation under any other rule.\n\n(b) A vessel using a traffic separation scheme shall:\n(i) proceed in the appropriate traffic lane in the general direction of traffic flow for that lane;\n(ii) so far as practicable keep clear of a traffic separation line or separation zone;\n(iii) normally join or leave a traffic lane at the termination of the lane, but when joining or leaving from either side shall do so at as small an angle to the general direction as practicable.\n\n(c) A vessel shall so far as practicable avoid crossing traffic lanes, but if obliged to do so shall cross on a heading as nearly as practicable at right angles to the general direction of traffic flow.\n\n(d) Inshore traffic zones may be used by vessels less than 20 metres in length, sailing vessels and vessels engaged in fishing.\n\n(e) A vessel other than a crossing vessel or a vessel joining or leaving a lane shall not normally enter a separation zone or cross a separation line except in cases of emergency to avoid immediate danger.\n\n(f) A vessel navigating in areas near the terminations of traffic separation schemes shall navigate with particular caution.\n\n(g) A vessel shall so far as practicable avoid anchoring in a traffic separation scheme or in areas near its terminations.\n\n(h) A vessel not using a traffic separation scheme shall avoid it by as wide a margin as is practicable.\n\n(i) A vessel engaged in fishing shall not impede the passage of any vessel following a traffic lane.\n\n(j) A vessel of less than 20 metres in length or a sailing vessel shall not impede the safe passage of a power-driven vessel following a traffic lane.",
    plainEnglish: "Traffic separation schemes are like maritime highways with specific rules:\n\n(b) When using schemes: follow traffic direction, avoid separation lines, join/leave at lane ends or at shallow angles.\n\n(c) Avoid crossing traffic lanes, but if necessary, cross at right angles.\n\n(d) Small vessels, sailing vessels, and fishing vessels can use inshore zones.\n\n(e-g) Don't enter separation zones except for emergencies, use caution near terminations, avoid anchoring.\n\n(h-j) Non-participants should avoid schemes entirely. Fishing and small vessels must not impede traffic lane vessels.",
    keyPoints: ["Follow traffic lane direction", "Join/leave at appropriate points", "Cross at right angles if necessary", "Small vessels use inshore zones", "Don't impede traffic lane vessels"],
    commonViolations: ["Wrong-way traffic", "Improper lane joining", "Oblique crossings", "Anchoring in schemes", "Small vessels impeding traffic"],
    relatedRules: ["9", "18"]
  }
];

export const completeColregsQuizzes: InsertQuiz[] = [
  // Rule 1 Quizzes
  {
    ruleId: 1,
    question: "According to Rule 1(a), where do the COLREGS apply?",
    options: [
      "Only on the high seas",
      "On high seas and connected navigable waters",
      "Only in international waters",
      "Everywhere except territorial waters"
    ],
    correctAnswer: 1,
    explanation: "Rule 1(a) states that COLREGS apply to all vessels upon the high seas AND in all waters connected therewith navigable by seagoing vessels.",
    difficulty: "easy"
  },
  {
    ruleId: 1,
    question: "What must local harbor rules do according to Rule 1(b)?",
    options: [
      "Override COLREGS completely",
      "Conform as closely as possible to COLREGS",
      "Apply only to local vessels",
      "Replace COLREGS entirely whenever local practice differs"
    ],
    correctAnswer: 1,
    explanation: "Rule 1(b) requires that special local rules 'shall conform as closely as possible to these Rules' - they cannot override COLREGS but must align with them.",
    difficulty: "medium"
  },
  {
    ruleId: 1,
    question: "Under Rule 1(e), when can vessels of special construction get exemptions?",
    options: [
      "Whenever the owner requests it",
      "Only for military vessels",
      "When full compliance would interfere with the vessel's special function",
      "Never - all vessels must comply fully"
    ],
    correctAnswer: 2,
    explanation: "Rule 1(e) allows exemptions only when full compliance would interfere with the special function of the vessel, and only with government determination.",
    difficulty: "hard"
  },

  // Rule 2 Quizzes
  {
    ruleId: 2,
    question: "According to Rule 2(a), following the COLREGS rules:",
    options: [
      "Excuses you from any other responsibility",
      "Does not excuse you from good seamanship",
      "Guarantees safe navigation",
      "Removes all liability from accidents"
    ],
    correctAnswer: 1,
    explanation: "Rule 2(a) clearly states that following COLREGS does not excuse anyone from using good seamanship or taking precautions required by circumstances.",
    difficulty: "easy"
  },
  {
    ruleId: 2,
    question: "Rule 2(b) allows departure from COLREGS when:",
    options: [
      "It's more convenient",
      "Other vessels are not following rules",
      "Necessary to avoid immediate danger",
      "In territorial waters"
    ],
    correctAnswer: 2,
    explanation: "Rule 2(b) permits departure from rules only when necessary to avoid immediate danger, considering all circumstances including vessel limitations.",
    difficulty: "medium"
  },

  // Rule 3 Quizzes
  {
    ruleId: 3,
    question: "According to Rule 3(c), a sailing vessel is:",
    options: [
      "Any vessel with sails",
      "A vessel under sail with engine not in use",
      "A vessel that can use sails",
      "A vessel designed primarily for sailing"
    ],
    correctAnswer: 1,
    explanation: "Rule 3(c) defines a sailing vessel as one under sail, provided that propelling machinery, if fitted, is not being used.",
    difficulty: "easy"
  },
  {
    ruleId: 3,
    question: "A 'vessel engaged in fishing' under Rule 3(d) does NOT include:",
    options: [
      "Trawling vessels",
      "Net fishing vessels", 
      "Trolling vessels",
      "Vessels using lines that restrict maneuverability"
    ],
    correctAnswer: 2,
    explanation: "Rule 3(d) specifically excludes vessels fishing with trolling lines or other apparatus that do not restrict maneuverability.",
    difficulty: "medium"
  },

  // Rule 5 Quizzes
  {
    ruleId: 5,
    question: "Rule 5 requires maintaining a proper lookout by:",
    options: [
      "Sight only",
      "Radar only", 
      "Sight, hearing, and all available means",
      "At least two of the crew"
    ],
    correctAnswer: 2,
    explanation: "Rule 5 requires maintaining lookout 'by sight and hearing as well as by all available means appropriate in the prevailing circumstances'.",
    difficulty: "easy"
  },
  {
    ruleId: 5,
    question: "The purpose of Rule 5 lookout is to:",
    options: [
      "Watch for navigation hazards only",
      "Make a full appraisal of collision risk",
      "Monitor other vessel movements",
      "Comply with watch requirements"
    ],
    correctAnswer: 1,
    explanation: "Rule 5 specifically states the lookout purpose is 'to make a full appraisal of the situation and of the risk of collision'.",
    difficulty: "medium"
  },

  // Rule 6 Quizzes
  {
    ruleId: 6,
    question: "Safe speed according to Rule 6 means:",
    options: [
      "Maximum hull speed",
      "Speed that allows stopping before collision",
      "Speed limit for the area",
      "Speed recommended by manufacturer"
    ],
    correctAnswer: 1,
    explanation: "Rule 6 defines safe speed as one that allows the vessel to 'take proper and effective action to avoid collision and be stopped within a distance appropriate to the prevailing circumstances'.",
    difficulty: "easy"
  },
  {
    ruleId: 6,
    question: "Which factor affects safe speed for radar-equipped vessels?",
    options: [
      "Cost of fuel",
      "Age of the vessel",
      "Radar equipment limitations",
      "Number of crew on watch"
    ],
    correctAnswer: 2,
    explanation: "Rule 6(b) lists radar equipment characteristics, efficiency and limitations as factors that radar-equipped vessels must consider when determining safe speed.",
    difficulty: "medium"
  },

  // Rule 7 Quizzes
  {
    ruleId: 7,
    question: "According to Rule 7(a), if there is any doubt about collision risk:",
    options: [
      "Continue monitoring",
      "Risk shall be deemed to exist",
      "Reduce speed slightly",
      "Call the other vessel on radio"
    ],
    correctAnswer: 1,
    explanation: "Rule 7(a) clearly states 'If there is any doubt such risk shall be deemed to exist' - when uncertain, assume collision risk exists.",
    difficulty: "easy"
  },
  {
    ruleId: 7,
    question: "Risk of collision exists when:",
    options: [
      "Vessels are on converging courses",
      "Compass bearing doesn't appreciably change",
      "Other vessel is getting larger",
      "Distance between vessels is decreasing"
    ],
    correctAnswer: 1,
    explanation: "Rule 7(d)(i) states that collision risk exists 'if the compass bearing of an approaching vessel does not appreciably change'.",
    difficulty: "medium"
  },

  // Rule 8 Quizzes
  {
    ruleId: 8,
    question: "Collision avoidance action under Rule 8 should be:",
    options: [
      "Small and gradual",
      "Positive and made in ample time",
      "Made only when certain of collision",
      "Coordinated with the other vessel"
    ],
    correctAnswer: 1,
    explanation: "Rule 8(a) requires that collision avoidance action be 'positive, made in ample time and with due regard to good seamanship'.",
    difficulty: "easy"
  },
  {
    ruleId: 8,
    question: "Course and speed alterations should be:",
    options: [
      "Small to avoid confusion",
      "Large enough to be readily apparent",
      "Made in succession for fine-tuning",
      "Coordinated by radio"
    ],
    correctAnswer: 1,
    explanation: "Rule 8(b) states alterations should be 'large enough to be readily apparent to another vessel observing visually or by radar'.",
    difficulty: "medium"
  }
];