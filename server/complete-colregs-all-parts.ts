// Complete COLREGS 1972 - All Parts A-F (Rules 1-41)
import type { InsertRule, InsertQuiz } from "@shared/schema";

export const allColregsRules: InsertRule[] = [
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
  },

  // PART C - LIGHTS AND SHAPES (Rules 20-31)
  {
    ruleNumber: "20",
    title: "Application",
    part: "C",
    partTitle: "Lights and Shapes",
    officialText: "(a) Rules in this part shall be complied with in all weathers.\n\n(b) The Rules concerning lights shall be complied with from sunset to sunrise, and during such times no other lights shall be exhibited, except such lights as cannot be mistaken for the lights specified in these Rules or do not impair their visibility or distinctive character, or interfere with the keeping of a proper look-out.\n\n(c) The lights prescribed by these Rules shall also be exhibited from sunrise to sunset in restricted visibility and may be exhibited in all other circumstances when it is deemed necessary.\n\n(d) The Rules concerning shapes shall be complied with by day.\n\n(e) The lights and shapes specified in these Rules shall comply with the provisions of Annex I to these Regulations.",
    plainEnglish: "(a) These rules apply in all weather conditions.\n\n(b) Navigation lights: sunset to sunrise, no other lights that could be confused with required lights.\n\n(c) Lights may also be shown during daylight in restricted visibility or when deemed necessary.\n\n(d) Day shapes must be displayed during daylight hours.\n\n(e) All lights and shapes must meet technical specifications in Annex I.",
    keyPoints: ["Apply in all weather", "Lights: sunset to sunrise", "Additional lights in restricted visibility", "Day shapes during daylight", "Must meet Annex I specifications"],
    commonViolations: ["Improper additional lights", "Not showing lights in restricted visibility", "Non-compliant equipment"],
    relatedRules: ["21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"]
  },
  {
    ruleNumber: "21",
    title: "Definitions",
    part: "C",
    partTitle: "Lights and Shapes",
    officialText: "(a) 'Masthead light' means a white light placed over the fore and aft centerline of the vessel showing an unbroken light over an arc of the horizon of 225 degrees and so fixed as to show the light from right ahead to 22.5 degrees abaft the beam on either side of the vessel.\n\n(b) 'Sidelights' means a green light on the starboard side and a red light on the port side each showing an unbroken light over an arc of the horizon of 112.5 degrees and so fixed as to show the light from right ahead to 22.5 degrees abaft the beam on its respective side.\n\n(c) 'Sternlight' means a white light placed as nearly as practicable at the stern showing an unbroken light over an arc of the horizon of 135 degrees and so fixed as to show the light 67.5 degrees from right aft on each side of the vessel.\n\n(d) 'Towing light' means a yellow light having the same characteristics as the 'sternlight'.\n\n(e) 'All-round light' means a light showing an unbroken light over an arc of the horizon of 360 degrees.\n\n(f) 'Flashing light' means a light flashing at regular intervals at a frequency of 120 flashes or more per minute.",
    plainEnglish: "Navigation light definitions:\n\n(a) Masthead light: White, 225° arc, centerline, ahead to 22.5° abaft beam\n\n(b) Sidelights: Green (starboard), Red (port), 112.5° arc each, ahead to 22.5° abaft beam\n\n(c) Sternlight: White, 135° arc, 67.5° each side from dead astern\n\n(d) Towing light: Yellow with same characteristics as sternlight\n\n(e) All-round light: 360° visibility\n\n(f) Flashing light: 120+ flashes per minute",
    keyPoints: ["Masthead: white, 225°", "Sidelights: red/green, 112.5°", "Sternlight: white, 135°", "Towing: yellow sternlight", "All-round: 360°", "Flashing: 120+ per minute"],
    commonViolations: ["Incorrect light colors", "Wrong arc coverage", "Improper positioning"],
    relatedRules: ["20", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"]
  },
  {
    ruleNumber: "22",
    title: "Visibility of Lights",
    part: "C",
    partTitle: "Lights and Shapes",
    officialText: "The lights prescribed in these Rules shall have an intensity as specified in Section 8 of Annex I to these Regulations so as to be visible at the following minimum ranges:\n\n(a) In vessels of 50 metres or more in length:\n(i) a masthead light, 6 miles;\n(ii) a sidelight, 3 miles;\n(iii) a sternlight, 3 miles;\n(iv) a towing light, 3 miles;\n(v) a white, red, green or yellow all-round light, 3 miles.\n\n(b) In vessels of 12 metres or more in length but less than 50 metres in length:\n(i) a masthead light, 5 miles; if the length of the vessel is less than 20 metres, 3 miles;\n(ii) a sidelight, 2 miles;\n(iii) a sternlight, 2 miles;\n(iv) a towing light, 2 miles;\n(v) a white, red, green or yellow all-round light, 2 miles.\n\n(c) In vessels of less than 12 metres in length:\n(i) a masthead light, 2 miles;\n(ii) a sidelight, 1 mile;\n(iii) a sternlight, 2 miles;\n(iv) a towing light, 2 miles;\n(v) a white, red, green or yellow all-round light, 2 miles.",
    plainEnglish: "Minimum visibility ranges by vessel length:\n\n(a) 50m+ vessels: Masthead 6 miles, others 3 miles\n\n(b) 12-50m vessels: Masthead 5 miles (3 miles if <20m), others 2 miles\n\n(c) <12m vessels: Masthead and sternlight 2 miles, sidelights 1 mile, all-round 2 miles",
    keyPoints: ["Larger vessels = longer ranges", "Masthead lights have longest range", "Sidelights shortest range on small vessels", "All-round lights consistent within size class"],
    commonViolations: ["Insufficient light intensity", "Lights not visible at required range", "Wrong specifications for vessel size"],
    relatedRules: ["20", "21", "23", "24", "25", "26", "27", "28", "29", "30", "31"]
  },
  {
    ruleNumber: "23",
    title: "Power-driven Vessels Underway",
    part: "C",
    partTitle: "Lights and Shapes",
    officialText: "(a) A power-driven vessel underway shall exhibit:\n(i) a masthead light forward;\n(ii) a second masthead light abaft of and higher than the forward one; except that a vessel of less than 50 metres in length shall not be obliged to exhibit such light but may do so;\n(iii) sidelights;\n(iv) a sternlight.\n\n(b) An air-cushion vessel when operating in the non-displacement mode shall, in addition to the lights prescribed in paragraph (a) of this Rule, exhibit an all-round flashing yellow light.\n\n(c) A power-driven vessel of less than 12 metres in length may in lieu of the lights prescribed in paragraph (a) of this Rule exhibit an all-round white light and sidelights.",
    plainEnglish: "(a) Power-driven vessels underway show:\n- Forward masthead light\n- Second masthead light (if 50m+, optional if <50m)\n- Red and green sidelights\n- White sternlight\n\n(b) Air-cushion vessels add flashing yellow all-round light\n\n(c) Small power vessels (<12m) may show all-round white light instead of masthead lights",
    keyPoints: ["Standard four lights for power vessels", "Second masthead required 50m+", "Air-cushion adds yellow flashing", "Small vessels may use all-round white"],
    commonViolations: ["Missing second masthead light", "Incorrect light positioning", "Not showing required lights"],
    relatedRules: ["20", "21", "22", "24", "25", "26", "27", "28", "29", "30", "31"]
  },
  {
    ruleNumber: "24",
    title: "Towing and Pushing",
    part: "C",
    partTitle: "Lights and Shapes",
    officialText: "(a) A power-driven vessel when towing shall exhibit:\n(i) instead of the light prescribed in Rule 23 (a) (i) or (a) (ii), two masthead lights in a vertical line. When the length of the tow, measuring from the stern of the towing vessel to the after end of the tow exceeds 200 metres, three such lights in a vertical line;\n(ii) sidelights;\n(iii) a sternlight;\n(iv) a towing light in a vertical line above the sternlight;\n(v) when the length of the tow exceeds 200 metres, a diamond shape where it can best be seen.\n\n(b) When a pushing vessel and a vessel being pushed ahead are rigidly connected in a composite unit they shall be regarded as a power-driven vessel and exhibit the lights prescribed in Rule 23.\n\n(c) A power-driven vessel when pushing ahead or towing alongside, except in the case of a composite unit, shall exhibit:\n(i) instead of the light prescribed in Rule 23 (a) (i) or (a) (ii), two masthead lights in a vertical line;\n(ii) sidelights;\n(iii) a sternlight.\n\n(d) A power-driven vessel to which paragraph (a) or (c) of this Rule applies shall also comply with Rule 23 (a) (ii).\n\n(e) A vessel or object being towed, other than those mentioned in paragraph (g) of this Rule, shall exhibit:\n(i) sidelights;\n(ii) a sternlight;\n(iii) when the length of the tow exceeds 200 metres, a diamond shape where it can best be seen.\n\n(f) Provided that any number of vessels being towed alongside or pushed in a group shall be lighted as one vessel.\n\n(g) An inconspicuous, partly submerged vessel or object, or combination of such vessels or objects being towed, shall exhibit:\n(i) if it is less than 25 metres in breadth, one all-round white light at or near the forward end and one at or near the after end except that dracones need not exhibit a light at or near the forward end;\n(ii) if it is 25 metres or more in breadth, two additional all-round white lights at or near the extremities of its breadth;\n(iii) if it exceeds 100 metres in length, additional all-round white lights between the lights prescribed in subparagraphs (i) and (ii) so that the distance between the lights shall not exceed 100 metres.\n\n(h) Where from any sufficient cause it is impracticable for a vessel or object being towed to exhibit the lights or shapes prescribed in paragraph (e) or (g) of this Rule, all possible measures shall be taken to light the vessel or object towed or at least to indicate the presence of such vessel or object.\n\n(i) Where from any sufficient cause a vessel of less than 12 metres in length is unable to exhibit the lights prescribed in paragraph (e) of this Rule, an all-round white light shall be exhibited.",
    plainEnglish: "Towing and pushing light requirements:\n\n(a) Towing vessel: Two masthead lights (three if tow >200m), sidelights, sternlight, yellow towing light, diamond shape if tow >200m\n\n(b) Composite units: Treated as single power-driven vessel\n\n(c) Pushing ahead/alongside: Two masthead lights, sidelights, sternlight\n\n(e) Vessel being towed: Sidelights, sternlight, diamond if tow >200m\n\n(g) Inconspicuous towed objects: All-round white lights based on size",
    keyPoints: ["Two masthead lights when towing", "Three if tow >200m", "Yellow towing light", "Diamond shape for long tows", "Towed vessels show sidelights/sternlight"],
    commonViolations: ["Wrong number of masthead lights", "Missing towing light", "No diamond shape for long tows"],
    relatedRules: ["20", "21", "22", "23", "25", "26", "27", "28", "29", "30", "31"]
  },
  {
    ruleNumber: "25",
    title: "Sailing Vessels Underway and Vessels Under Oars",
    part: "C",
    partTitle: "Lights and Shapes",
    officialText: "(a) A sailing vessel underway shall exhibit:\n(i) sidelights;\n(ii) a sternlight.\n\n(b) In a sailing vessel of less than 20 metres in length the lights prescribed in paragraph (a) of this Rule may be combined in one lantern carried at or near the top of the mast where it can best be seen.\n\n(c) A sailing vessel underway may, in addition to the lights prescribed in paragraph (a) of this Rule, exhibit at or near the top of the mast, where they can best be seen, two all-round lights in a vertical line, the upper being red and the lower green, but these lights shall not be exhibited in conjunction with the combined lantern permitted by paragraph (b) of this Rule.\n\n(d) (i) A sailing vessel of less than 7 metres in length shall, if practicable, exhibit the lights prescribed in paragraph (a) or (b) of this Rule, but if she does not, she shall have ready at hand an electric torch or lighted lantern showing a white light which shall be exhibited in sufficient time to prevent collision.\n\n(ii) A vessel under oars may exhibit the lights prescribed in this Rule for sailing vessels, but if she does not, she shall have ready at hand an electric torch or lighted lantern showing a white light which shall be exhibited in sufficient time to prevent collision.\n\n(e) A vessel proceeding under sail when also being propelled by machinery shall exhibit forward where it can best be seen a conical shape, apex downward.",
    plainEnglish: "(a) Sailing vessels: Red and green sidelights, white sternlight\n\n(b) Small sailing vessels (<20m): May combine all lights in one masthead lantern\n\n(c) Optional: Red over green all-round lights at masthead (not with combined lantern)\n\n(d) Very small vessels (<7m) and rowing boats: At minimum, white light ready for use\n\n(e) Motor-sailing: Add black cone shape pointing down",
    keyPoints: ["Sidelights and sternlight standard", "Small vessels may combine lights", "Optional red over green", "White light for small vessels", "Cone for motor-sailing"],
    commonViolations: ["Missing sternlight", "Using red over green with combined lantern", "No day shape when motor-sailing"],
    relatedRules: ["20", "21", "22", "23", "24", "26", "27", "28", "29", "30", "31"]
  },
  {
    ruleNumber: "26",
    title: "Fishing Vessels",
    part: "C",
    partTitle: "Lights and Shapes",
    officialText: "(a) A vessel engaged in fishing, whether underway or at anchor, shall exhibit only the lights and shapes prescribed in this Rule.\n\n(b) A vessel when engaged in trawling, by which is meant the dragging through the water of a dredge net or other apparatus used as a fishing appliance, shall exhibit:\n(i) two all-round lights in a vertical line, the upper being green and the lower white, or a shape consisting of two cones with their apexes together in a vertical line one above the other;\n(ii) a masthead light abaft of and higher than the all-round green light; a vessel of less than 50 metres in length shall not be obliged to exhibit such light but may do so;\n(iii) when making way through the water, in addition to the lights prescribed in this paragraph, sidelights and a sternlight.\n\n(c) A vessel engaged in fishing, other than trawling, shall exhibit:\n(i) two all-round lights in a vertical line, the upper being red and the lower white, or a shape consisting of two cones with apexes together in a vertical line one above the other;\n(ii) when there is outlying gear extending more than 150 metres horizontally from the vessel, an all-round white light or a cone apex upward in the direction of the gear;\n(iii) when making way through the water, in addition to the lights prescribed in this paragraph, sidelights and a sternlight.\n\n(d) The additional signals described in Annex II to these Regulations apply to a vessel engaged in fishing in close proximity to other fishing vessels.\n\n(e) A vessel when not engaged in fishing shall not exhibit the lights or shapes prescribed in this Rule, but only those prescribed for a vessel of her length.",
    plainEnglish: "(a) Fishing vessels show only fishing lights/shapes, not normal navigation lights\n\n(b) Trawling vessels: Green over white lights (or double cone shape), optional masthead light, sidelights/sternlight when making way\n\n(c) Other fishing: Red over white lights (or double cone shape), white light toward outlying gear >150m, sidelights/sternlight when making way\n\n(d) Additional signals in Annex II for fishing fleets\n\n(e) When not fishing, show normal navigation lights",
    keyPoints: ["Only fishing lights when fishing", "Trawling: green over white", "Other fishing: red over white", "Extra light for outlying gear", "Normal lights when not fishing"],
    commonViolations: ["Showing fishing lights when not fishing", "Wrong light colors", "Missing gear indication"],
    relatedRules: ["20", "21", "22", "23", "24", "25", "27", "28", "29", "30", "31"]
  },
  {
    ruleNumber: "27",
    title: "Vessels Not Under Command or Restricted in Their Ability to Maneuver",
    part: "C",
    partTitle: "Lights and Shapes",
    officialText: "(a) A vessel not under command shall exhibit:\n(i) two all-round red lights in a vertical line where they can best be seen;\n(ii) two balls or similar shapes in a vertical line where they can best be seen;\n(iii) when making way through the water, in addition to the lights prescribed in this paragraph, sidelights and a sternlight.\n\n(b) A vessel restricted in her ability to maneuver, except a vessel engaged in mine clearance operations, shall exhibit:\n(i) three all-round lights in a vertical line where they can best be seen. The upper and lower of these lights shall be red and the middle light shall be white;\n(ii) three shapes in a vertical line where they can best be seen. The upper and lower of these shapes shall be balls and the middle one a diamond;\n(iii) when making way through the water, in addition to the lights prescribed in this paragraph, masthead light or lights, sidelights and a sternlight;\n(iv) when at anchor, in addition to the lights prescribed in this paragraph, the light, lights or shape prescribed in Rule 30.\n\n(c) A power-driven vessel engaged in a towing operation such as severely restricts the towing vessel and her tow in their ability to deviate from their course shall, in addition to the lights prescribed in Rule 24 (a), exhibit the lights prescribed in subparagraph (b) (i) of this Rule.\n\n(d) A vessel engaged in dredging or underwater operations, when restricted in her ability to maneuver, shall exhibit the lights prescribed in subparagraph (b) (i) and (ii) of this Rule and shall in addition, when an obstruction exists, exhibit:\n(i) two all-round red lights or two balls in a vertical line to indicate the side on which the obstruction exists;\n(ii) two all-round green lights or two diamonds in a vertical line to indicate the side on which another vessel may pass;\n(iii) when at anchor, the lights prescribed in this paragraph instead of the lights prescribed in Rule 30.\n\n(e) Whenever the size of a vessel engaged in diving operations makes it impracticable to exhibit all lights and shapes prescribed in paragraph (d) of this Rule, the following shall be exhibited:\n(i) three all-round lights in a vertical line where they can best be seen. The upper and lower of these lights shall be red and the middle light shall be white;\n(ii) a rigid replica of the International Code flag 'A' not less than 1 metre in height. Arrangements shall be made to ensure its all-round visibility.\n\n(f) A vessel engaged in mine clearance operations shall, in addition to the lights prescribed for a power-driven vessel in Rule 23 or to the lights prescribed for a vessel at anchor in Rule 30, as appropriate, exhibit three all-round green lights or three balls. One of these lights or shapes shall be exhibited near the foremast head and one at each end of the fore yard. These lights or shapes indicate that it is dangerous for another vessel to approach within 1000 metres of the mine clearance vessel.\n\n(g) Vessels of less than 12 metres in length, except those engaged in diving operations, shall not be required to exhibit the lights prescribed in this Rule.\n\n(h) The signals prescribed in this Rule are not signals of distress and do not require assistance. Their significance is indicated in Annex IV to these Regulations.",
    plainEnglish: "(a) Not under command: Two red lights/balls vertically, plus sidelights/sternlight when making way\n\n(b) Restricted maneuverability: Red-white-red lights, ball-diamond-ball shapes, plus normal navigation lights when making way\n\n(c) Restricted towing: Towing lights plus red-white-red\n\n(d) Dredging: Red-white-red lights plus two red lights (obstruction side) and two green lights (safe side)\n\n(e) Diving operations: Red-white-red lights plus International Code flag 'A'\n\n(f) Mine clearance: Normal lights plus three green lights/balls\n\n(g) Small vessels (<12m) exempt except diving operations",
    keyPoints: ["Not under command: two red", "Restricted: red-white-red", "Dredging: add red/green for obstruction", "Diving: add flag 'A'", "Mine clearance: three green"],
    commonViolations: ["Wrong light combinations", "Missing day shapes", "Not showing when restricted"],
    relatedRules: ["20", "21", "22", "23", "24", "25", "26", "28", "29", "30", "31"]
  },
  {
    ruleNumber: "28",
    title: "Vessels Constrained by Their Draft",
    part: "C",
    partTitle: "Lights and Shapes",
    officialText: "A vessel constrained by her draft may, in addition to the lights prescribed for power-driven vessels in Rule 23, exhibit where they can best be seen three all-round red lights in a vertical line, or a cylinder.",
    plainEnglish: "Vessels constrained by their draft (deep-draft vessels) may show three red lights in a vertical line or a black cylinder shape, in addition to normal power-driven vessel lights.",
    keyPoints: ["Optional signal for deep-draft vessels", "Three red lights vertically", "Or black cylinder shape", "In addition to normal lights"],
    commonViolations: ["Not showing when constrained", "Wrong light arrangement", "Using when not constrained"],
    relatedRules: ["20", "21", "22", "23", "24", "25", "26", "27", "29", "30", "31"]
  },
  {
    ruleNumber: "29",
    title: "Pilot Vessels",
    part: "C",
    partTitle: "Lights and Shapes",
    officialText: "(a) A vessel engaged on pilotage duty shall exhibit:\n(i) at or near the masthead, two all-round lights in a vertical line, the upper being white and the lower red;\n(ii) when underway, in addition, sidelights and a sternlight;\n(iii) when at anchor, in addition to the lights prescribed in subparagraph (i), the light, lights or shape prescribed in Rule 30 for vessels at anchor.\n\n(b) A pilot vessel when not engaged on pilotage duty shall exhibit the lights prescribed for a similar vessel of her length.",
    plainEnglish: "(a) Pilot vessels on duty show:\n- White over red lights at masthead\n- Sidelights and sternlight when underway\n- Anchor lights when at anchor\n\n(b) When not on pilot duty, show normal navigation lights for vessel type and size",
    keyPoints: ["White over red for pilot duty", "Plus normal navigation lights", "Anchor lights when anchored", "Normal lights when off duty"],
    commonViolations: ["Showing pilot lights when off duty", "Wrong light colors", "Missing navigation lights"],
    relatedRules: ["20", "21", "22", "23", "24", "25", "26", "27", "28", "30", "31"]
  },
  {
    ruleNumber: "30",
    title: "Anchored Vessels and Vessels Aground",
    part: "C",
    partTitle: "Lights and Shapes",
    officialText: "(a) A vessel at anchor shall exhibit where it can best be seen:\n(i) in the fore part, an all-round white light or one ball;\n(ii) at or near the stern and at a lower level than the light prescribed in subparagraph (i), an all-round white light.\n\n(b) A vessel of less than 50 metres in length may exhibit an all-round white light where it can best be seen instead of the lights prescribed in paragraph (a) of this Rule.\n\n(c) A vessel at anchor may, and a vessel of 100 metres or more in length shall, also exhibit to illuminate her decks the lights prescribed in paragraph (a) or (b) of this Rule.\n\n(d) A vessel aground shall exhibit the lights prescribed in paragraph (a) or (b) of this Rule and in addition, where they can best be seen:\n(i) two all-round red lights in a vertical line;\n(ii) three balls in a vertical line.\n\n(e) A vessel of less than 7 metres in length, when at anchor, not in or near a narrow channel, fairway or where other vessels normally navigate, shall not be required to exhibit the lights prescribed in paragraphs (a) and (b) of this Rule.\n\n(f) A vessel of less than 12 metres in length, when aground, shall not be required to exhibit the lights prescribed in subparagraphs (d) (i) and (ii) of this Rule.",
    plainEnglish: "(a) Anchored vessels: White light forward, white light aft (lower), or one ball shape\n\n(b) Small vessels (<50m): May use single all-round white light\n\n(c) Large vessels (100m+): Must also use deck illumination\n\n(d) Aground vessels: Anchor lights plus two red lights and three balls vertically\n\n(e) Very small vessels (<7m): Exempt from anchor lights in clear areas\n\n(f) Small vessels (<12m): Exempt from aground signals",
    keyPoints: ["Two white lights when anchored", "Small vessels may use one", "Aground: add two red lights/three balls", "Large vessels need deck lights", "Small vessel exemptions"],
    commonViolations: ["Single light on large vessels", "No aground signals", "Missing deck illumination"],
    relatedRules: ["20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "31"]
  },
  {
    ruleNumber: "31",
    title: "Seaplanes",
    part: "C",
    partTitle: "Lights and Shapes",
    officialText: "Where it is impracticable for a seaplane or a WIG craft to exhibit lights and shapes of the characteristics or in the positions prescribed in the Rules of this Part she shall exhibit lights and shapes as closely similar in characteristics and position as is possible.",
    plainEnglish: "Seaplanes and wing-in-ground craft should show lights and shapes as close as possible to the standard requirements when exact compliance is impractical.",
    keyPoints: ["Best practicable compliance", "Similar characteristics", "Similar positions", "Applies to seaplanes and WIG craft"],
    commonViolations: ["Not showing any lights", "Completely wrong light arrangement", "Not attempting compliance"],
    relatedRules: ["20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30"]
  },

  // PART D - SOUND AND LIGHT SIGNALS (Rules 32-37)
  {
    ruleNumber: "32",
    title: "Definitions",
    part: "D",
    partTitle: "Sound and Light Signals",
    officialText: "(a) The word 'whistle' means any sound signaling appliance capable of producing the prescribed blasts and which complies with the specifications in Annex III to these Regulations.\n\n(b) The term 'short blast' means a blast of about one second's duration.\n\n(c) The term 'prolonged blast' means a blast of from four to six seconds' duration.",
    plainEnglish: "(a) 'Whistle' means any sound device meeting Annex III specifications\n\n(b) 'Short blast' = about 1 second\n\n(c) 'Prolonged blast' = 4-6 seconds",
    keyPoints: ["Whistle must meet specifications", "Short blast: 1 second", "Prolonged blast: 4-6 seconds"],
    commonViolations: ["Non-compliant sound devices", "Wrong blast duration", "Insufficient sound power"],
    relatedRules: ["33", "34", "35", "36", "37"]
  },
  {
    ruleNumber: "33",
    title: "Equipment for Sound Signals",
    part: "D",
    partTitle: "Sound and Light Signals",
    officialText: "(a) A vessel of 12 metres or more in length shall be provided with a whistle, a vessel of 20 metres or more in length shall be provided with a bell in addition to a whistle, and a vessel of 100 metres or more in length shall, in addition, be provided with a gong, the tone and sound of which cannot be confused with that of the bell. The whistle, bell and gong shall comply with the specifications in Annex III to these Regulations. The bell or gong or both may be replaced by other equipment having the same respective sound characteristics, provided that manual sounding of the required signals shall always be possible.\n\n(b) A vessel of less than 12 metres in length shall not be obliged to carry the sound signaling appliances prescribed in paragraph (a) of this Rule but if she does not, she shall be provided with some other means of making an efficient sound signal.",
    plainEnglish: "(a) Sound signal equipment required:\n- 12m+: Whistle\n- 20m+: Whistle + Bell\n- 100m+: Whistle + Bell + Gong\nAll must meet Annex III specifications and allow manual operation\n\n(b) Small vessels (<12m): Not required to carry specified equipment, but must have some effective sound signaling means",
    keyPoints: ["Whistle for 12m+", "Bell for 20m+", "Gong for 100m+", "Must meet specifications", "Small vessels: any effective sound"],
    commonViolations: ["Missing required equipment", "Non-compliant equipment", "No manual operation capability"],
    relatedRules: ["32", "34", "35", "36", "37"]
  },
  {
    ruleNumber: "34",
    title: "Maneuvering and Warning Signals",
    part: "D",
    partTitle: "Sound and Light Signals",
    officialText: "(a) When vessels are in sight of one another, a power-driven vessel underway, when maneuvering as authorized or required by these Rules, shall indicate that maneuver by the following signals on her whistle:\n(i) one short blast to mean 'I am altering my course to starboard';\n(ii) two short blasts to mean 'I am altering my course to port';\n(iii) three short blasts to mean 'I am operating astern propulsion'.\n\n(b) Any vessel may supplement the whistle signals prescribed in paragraph (a) of this Rule by light signals, repeated as appropriate, having the following significance:\n(i) one flash to mean 'I am altering my course to starboard';\n(ii) two flashes to mean 'I am altering my course to port';\n(iii) three flashes to mean 'I am operating astern propulsion'.\n\n(c) When in sight of one another in a narrow channel or fairway:\n(i) a vessel intending to overtake another shall in compliance with Rule 9 (e) (i) indicate her intention by the following signals on her whistle:\ntwo prolonged blasts followed by one short blast to mean 'I intend to overtake you on your starboard side';\ntwo prolonged blasts followed by two short blasts to mean 'I intend to overtake you on your port side'.\n(ii) the vessel about to be overtaken when acting in accordance with Rule 9 (e) (i) shall indicate her agreement by the following signal on her whistle:\none prolonged, one short, one prolonged and one short blast, in that order.\n\n(d) When vessels in sight of one another are approaching each other and from any cause either vessel fails to understand the intentions or actions of the other, or is in doubt whether sufficient action is being taken by the other to avoid collision, the vessel in doubt shall immediately indicate such doubt by giving at least five short and rapid blasts on the whistle. Such signal may be supplemented by a light signal of at least five short and rapid flashes.\n\n(e) A vessel nearing a bend or an area of a channel or fairway where other vessels may be obscured by an intervening obstruction shall sound one prolonged blast. Such signal shall be answered with a prolonged blast by any approaching vessel that may be within hearing around the bend or behind the intervening obstruction.\n\n(f) If whistles are fitted on a vessel at a distance apart of more than 100 metres, one whistle only shall be used for giving maneuvering and warning signals.",
    plainEnglish: "(a) Maneuvering signals (vessels in sight):\n- 1 short blast: Altering to starboard\n- 2 short blasts: Altering to port\n- 3 short blasts: Operating astern\n\n(b) Optional light signals: Same meaning as whistle signals\n\n(c) Overtaking in narrow channels:\n- 2 prolonged + 1 short: Overtaking on your starboard\n- 2 prolonged + 2 short: Overtaking on your port\n- Agreement: 1 prolonged + 1 short + 1 prolonged + 1 short\n\n(d) Doubt signal: 5+ short rapid blasts (and flashes)\n\n(e) Blind bends: 1 prolonged blast, answered by 1 prolonged\n\n(f) Large vessels: Use only one whistle",
    keyPoints: ["1 blast = starboard", "2 blasts = port", "3 blasts = astern", "5+ blasts = doubt", "Prolonged blast at bends"],
    commonViolations: ["Wrong signal meanings", "Not signaling maneuvers", "Inappropriate use of doubt signal"],
    relatedRules: ["32", "33", "35", "36", "37"]
  },
  {
    ruleNumber: "35",
    title: "Sound Signals in Restricted Visibility",
    part: "D",
    partTitle: "Sound and Light Signals",
    officialText: "In or near an area of restricted visibility, whether by day or night, the signals prescribed in this Rule shall be used as follows:\n\n(a) A power-driven vessel making way through the water shall sound at intervals of not more than 2 minutes one prolonged blast.\n\n(b) A power-driven vessel underway but stopped and making no way through the water shall sound at intervals of not more than 2 minutes two prolonged blasts in succession with an interval of about 2 seconds between them.\n\n(c) A vessel not under command, a vessel restricted in her ability to maneuver, a vessel constrained by her draft, a sailing vessel, a vessel engaged in fishing and a vessel engaged in towing or pushing another vessel shall, instead of the signals prescribed in paragraphs (a) or (b) of this Rule, sound at intervals of not more than 2 minutes three prolonged blasts in succession, namely one prolonged blast followed by two short blasts.\n\n(d) A vessel engaged in fishing, when at anchor, and a vessel restricted in her ability to maneuver when at anchor, shall instead of the signals prescribed in paragraph (g) of this Rule sound the signal prescribed in paragraph (c) of this Rule.\n\n(e) A vessel towed or if more than one vessel is towed the last vessel of the tow, if manned, shall at intervals of not more than 2 minutes sound four short blasts in succession. When practicable, this signal shall be made immediately after the signal made by the towing vessel.\n\n(f) When a pushing vessel and a vessel being pushed ahead are rigidly connected in a composite unit they shall be regarded as a power-driven vessel and shall give the signals prescribed in paragraphs (a) or (b) of this Rule.\n\n(g) A vessel at anchor shall at intervals of not more than one minute ring the bell rapidly for about 5 seconds. In a vessel of 100 metres or more in length the bell shall be sounded in the forepart of the vessel and immediately after the ringing of the bell the gong shall be sounded rapidly for about 5 seconds in the after part of the vessel. A vessel at anchor may in addition sound three blasts in succession, namely one short, one prolonged and one short blast, to give warning of her position and of the possibility of collision to an approaching vessel.\n\n(h) A vessel aground shall give the bell signal and if required the gong signal prescribed in paragraph (g) of this Rule and shall, in addition, give three separate and distinct strokes on the bell immediately before and after the rapid ringing of the bell. A vessel aground may in addition sound an appropriate whistle signal.\n\n(i) A vessel of less than 12 metres in length shall not be obliged to give the above-mentioned signals but, if she does not, shall make some other efficient sound signal at intervals of not more than 2 minutes.\n\n(j) A pilot vessel when engaged on pilotage duty may in addition to the signals prescribed in paragraphs (a), (b) or (g) of this Rule sound an identity signal consisting of four short blasts.",
    plainEnglish: "Fog signals (every 2 minutes unless noted):\n\n(a) Power vessel making way: 1 prolonged blast\n\n(b) Power vessel stopped: 2 prolonged blasts\n\n(c) Not under command, restricted, constrained, sailing, fishing, towing: 1 prolonged + 2 short\n\n(d) Fishing/restricted at anchor: Use signal (c)\n\n(e) Vessel being towed: 4 short blasts\n\n(g) At anchor: Ring bell 5 seconds every minute (large vessels add gong)\n\n(h) Aground: Anchor signal + 3 bell strokes before and after\n\n(i) Small vessels: Any efficient sound every 2 minutes\n\n(j) Pilot vessels: May add 4 short blasts",
    keyPoints: ["Making way: 1 prolonged", "Stopped: 2 prolonged", "Restricted: 1 prolonged + 2 short", "Anchored: bell every minute", "Aground: bell + 3 strokes"],
    commonViolations: ["Wrong fog signals", "Incorrect timing", "Not sounding in fog"],
    relatedRules: ["32", "33", "34", "36", "37"]
  },
  {
    ruleNumber: "36",
    title: "Signals to Attract Attention",
    part: "D",
    partTitle: "Sound and Light Signals",
    officialText: "If necessary to attract the attention of another vessel, any vessel may make light or sound signals that cannot be mistaken for any signal authorized elsewhere in these Rules, or may direct the beam of her searchlight in the direction of the danger, in such a way as not to embarrass any vessel. Any light to attract attention shall be such that it cannot be mistaken for any aid to navigation. For the purpose of this Rule the use of high intensity intermittent or revolving lights, such as strobe lights, shall be avoided.",
    plainEnglish: "To attract attention, vessels may use:\n- Light or sound signals not resembling official signals\n- Searchlight beam toward danger (without embarrassing other vessels)\n- Any light that won't be mistaken for navigation aids\n\nAvoid high-intensity flashing lights like strobes.",
    keyPoints: ["Must not resemble official signals", "Must not resemble navigation aids", "Searchlight toward danger allowed", "Avoid strobe lights"],
    commonViolations: ["Using signals that resemble official ones", "Blinding other vessels", "Using inappropriate flashing lights"],
    relatedRules: ["32", "33", "34", "35", "37"]
  },
  {
    ruleNumber: "37",
    title: "Distress Signals",
    part: "D",
    partTitle: "Sound and Light Signals",
    officialText: "When a vessel is in distress and requires assistance she shall use or exhibit the signals described in Annex IV to these Regulations.",
    plainEnglish: "Vessels in distress requiring assistance must use the distress signals specified in Annex IV.",
    keyPoints: ["Only when in distress", "Only when assistance required", "Must use Annex IV signals"],
    commonViolations: ["Using distress signals inappropriately", "Not using proper distress signals", "False distress signals"],
    relatedRules: ["32", "33", "34", "35", "36"]
  },

  // PART E - EXEMPTIONS (Rule 38)
  {
    ruleNumber: "38",
    title: "Exemptions",
    part: "E",
    partTitle: "Exemptions",
    officialText: "Any vessel (or class of vessels) provided that she complies with the requirements of the International Regulations for Preventing Collisions at Sea, 1960, the keel of which is laid or which is at a corresponding stage of construction before the entry into force of these Regulations may be exempted from compliance with the provisions of these Regulations as follows:\n\n(a) The installation of lights with ranges prescribed in Rule 22, until four years after the date of entry into force of these Regulations.\n\n(b) The installation of lights with color specifications as prescribed in Section 7 of Annex I to these Regulations, until four years after the date of entry into force of these Regulations.\n\n(c) The repositioning of lights as a result of conversion from Imperial to metric units and rounding off measurement figures, permanent exemption.\n\n(d) (i) The repositioning of masthead lights on vessels of less than 150 metres in length, resulting from the prescriptions of Section 3 (a) of Annex I to these Regulations, permanent exemption.\n\n(ii) The repositioning of masthead lights on vessels of 150 metres or more in length, resulting from the prescriptions of Section 3 (a) of Annex I to these Regulations, until nine years after the date of entry into force of these Regulations.\n\n(e) The repositioning of masthead lights resulting from the prescriptions of Section 2 (b) of Annex I to these Regulations, until nine years after the date of entry into force of these Regulations.\n\n(f) The repositioning of sidelights resulting from the prescriptions of Sections 2 (g) and 3 (b) of Annex I to these Regulations, until nine years after the date of entry into force of these Regulations.\n\n(g) The requirements for sound signal appliances prescribed in Annex III to these Regulations, until nine years after the date of entry into force of these Regulations.\n\n(h) The repositioning of all-round lights resulting from the prescription of Section 9 (b) of Annex I to these Regulations, permanent exemption.",
    plainEnglish: "Vessels built before 1972 COLREGS took effect may be exempted from certain requirements:\n\n(a) Light range requirements: 4-year exemption\n\n(b) Light color specifications: 4-year exemption\n\n(c) Repositioning for metric conversion: Permanent exemption\n\n(d) Masthead light repositioning: Permanent for <150m, 9 years for 150m+\n\n(e) Masthead light repositioning: 9-year exemption\n\n(f) Sidelight repositioning: 9-year exemption\n\n(g) Sound signal equipment: 9-year exemption\n\n(h) All-round light repositioning: Permanent exemption",
    keyPoints: ["Only for pre-1972 vessels", "Various exemption periods", "Some permanent exemptions", "Light and sound equipment modifications"],
    commonViolations: ["Claiming exemptions without eligibility", "Exceeding exemption periods", "Misunderstanding exemption scope"],
    relatedRules: ["20", "21", "22", "32", "33"]
  },

  // PART F - VERIFICATION OF COMPLIANCE (Rules 39-41)
  {
    ruleNumber: "39",
    title: "Definitions",
    part: "F",
    partTitle: "Verification of Compliance",
    officialText: "For the purpose of Rules 40 and 41:\n\n(a) 'International voyage' means a voyage from a country to which the present Convention applies to a port in another such country, or conversely, or a voyage between ports in countries other than that to which the vessel belongs, provided that the vessel is not scheduled to call at any port in the country to which she belongs during the voyage.\n\n(b) 'Developing countries' are those countries which are so designated by the United Nations and which are listed in the most recent edition of the United Nations publication entitled 'Handbook of International Trade and Development Statistics'.",
    plainEnglish: "(a) 'International voyage' means:\n- Voyage between countries that apply COLREGS\n- Voyage between ports in foreign countries\n- Provided the vessel doesn't call at her home country during the voyage\n\n(b) 'Developing countries' are those designated by the UN in the Trade and Development Statistics handbook",
    keyPoints: ["International voyage definition", "Between COLREGS countries", "No home port calls", "UN designation for developing countries"],
    commonViolations: ["Misunderstanding voyage definitions", "Incorrect country classifications"],
    relatedRules: ["40", "41"]
  },
  {
    ruleNumber: "40",
    title: "Application",
    part: "F",
    partTitle: "Verification of Compliance",
    officialText: "Rule 41 shall apply to vessels engaged on international voyages only.",
    plainEnglish: "Rule 41 (verification requirements) only applies to vessels on international voyages.",
    keyPoints: ["Only international voyages", "Domestic voyages exempt", "Links to Rule 39 definition"],
    commonViolations: ["Applying to domestic voyages", "Misunderstanding scope"],
    relatedRules: ["39", "41"]
  },
  {
    ruleNumber: "41",
    title: "Verification",
    part: "F",
    partTitle: "Verification of Compliance",
    officialText: "The competent authority of the State whose flag a vessel flies shall verify that the vessel complies with the provisions of these Regulations. The competent authority may also verify that the vessel carries on board the document required by Rule 5 of the International Convention for the Safety of Life at Sea, 1974, in force.",
    plainEnglish: "The flag state authority must verify that vessels comply with COLREGS and may verify they carry required SOLAS documentation.",
    keyPoints: ["Flag state responsibility", "Verify COLREGS compliance", "May verify SOLAS documents", "Competent authority inspection"],
    commonViolations: ["Lack of proper verification", "Missing required documentation", "Non-compliance with flag state requirements"],
    relatedRules: ["39", "40"]
  }
];

// Comprehensive quiz set for all new rules
export const comprehensiveQuizzes: InsertQuiz[] = [
  // Rule 11-19 quizzes
  {
    ruleId: 0,
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
  },

  // Part C - Lights and Shapes quizzes (Rules 20-31)
  {
    ruleId: 0,
    question: "When must navigation lights be exhibited according to Rule 20?",
    options: [
      "Only at night",
      "From sunset to sunrise, and in restricted visibility",
      "Only in restricted visibility",
      "At all times"
    ],
    correctAnswer: 1,
    explanation: "Rule 20(b) requires lights from sunset to sunrise, and Rule 20(c) also requires them in restricted visibility.",
    difficulty: "easy"
  },
  {
    ruleId: 0,
    question: "What is the arc of visibility for sidelights according to Rule 21?",
    options: [
      "90 degrees",
      "112.5 degrees",
      "135 degrees",
      "225 degrees"
    ],
    correctAnswer: 1,
    explanation: "Rule 21(b) defines sidelights as showing an unbroken light over an arc of 112.5 degrees.",
    difficulty: "medium"
  },
  {
    ruleId: 0,
    question: "What is the minimum visibility range for a masthead light on a 60-meter vessel?",
    options: [
      "3 miles",
      "5 miles",
      "6 miles",
      "8 miles"
    ],
    correctAnswer: 2,
    explanation: "Rule 22(a)(i) requires masthead lights on vessels 50 meters or more to be visible for 6 miles.",
    difficulty: "hard"
  },
  {
    ruleId: 0,
    question: "What additional light do air-cushion vessels show according to Rule 23?",
    options: [
      "All-round red light",
      "All-round flashing yellow light",
      "All-round blue light",
      "Additional masthead light"
    ],
    correctAnswer: 1,
    explanation: "Rule 23(b) requires air-cushion vessels to show an all-round flashing yellow light in addition to normal lights.",
    difficulty: "medium"
  },
  {
    ruleId: 0,
    question: "How many masthead lights does a towing vessel show when the tow exceeds 200 meters?",
    options: [
      "One",
      "Two",
      "Three",
      "Four"
    ],
    correctAnswer: 2,
    explanation: "Rule 24(a)(i) requires three masthead lights in a vertical line when the tow exceeds 200 meters.",
    difficulty: "hard"
  },
  {
    ruleId: 0,
    question: "What optional lights may sailing vessels show at the masthead according to Rule 25?",
    options: [
      "White over red",
      "Red over green",
      "Green over red",
      "Blue over yellow"
    ],
    correctAnswer: 1,
    explanation: "Rule 25(c) allows sailing vessels to show red over green all-round lights at the masthead.",
    difficulty: "medium"
  },
  {
    ruleId: 0,
    question: "What lights do trawling vessels show according to Rule 26?",
    options: [
      "Red over white",
      "Green over white",
      "White over red",
      "Yellow over green"
    ],
    correctAnswer: 1,
    explanation: "Rule 26(b) requires trawling vessels to show green over white all-round lights.",
    difficulty: "easy"
  },
  {
    ruleId: 0,
    question: "What signal indicates a vessel not under command according to Rule 27?",
    options: [
      "Three red lights vertically",
      "Two red lights vertically",
      "Red-white-red lights vertically",
      "Two white lights vertically"
    ],
    correctAnswer: 1,
    explanation: "Rule 27(a)(i) requires vessels not under command to show two red all-round lights in a vertical line.",
    difficulty: "easy"
  },
  {
    ruleId: 0,
    question: "What may vessels constrained by draft show according to Rule 28?",
    options: [
      "Two red lights vertically",
      "Three red lights vertically",
      "Red-white-red lights vertically",
      "Three white lights vertically"
    ],
    correctAnswer: 1,
    explanation: "Rule 28 allows vessels constrained by draft to show three red all-round lights in a vertical line.",
    difficulty: "medium"
  },
  {
    ruleId: 0,
    question: "What lights do pilot vessels show when on duty according to Rule 29?",
    options: [
      "Red over white",
      "White over red",
      "Green over white",
      "Yellow over blue"
    ],
    correctAnswer: 1,
    explanation: "Rule 29(a)(i) requires pilot vessels on duty to show white over red all-round lights at the masthead.",
    difficulty: "easy"
  },
  {
    ruleId: 0,
    question: "How many white lights must a vessel over 100 meters show when at anchor?",
    options: [
      "One",
      "Two plus deck illumination",
      "Three",
      "Four"
    ],
    correctAnswer: 1,
    explanation: "Rule 30(a) requires two white lights (fore and aft) and Rule 30(c) requires vessels 100m+ to also illuminate their decks.",
    difficulty: "hard"
  },

  // Part D - Sound Signals quizzes (Rules 32-37)
  {
    ruleId: 0,
    question: "What is the duration of a 'short blast' according to Rule 32?",
    options: [
      "About 1 second",
      "2-3 seconds",
      "4-6 seconds",
      "About 10 seconds"
    ],
    correctAnswer: 0,
    explanation: "Rule 32(b) defines a short blast as about one second's duration.",
    difficulty: "easy"
  },
  {
    ruleId: 0,
    question: "What sound equipment must a 25-meter vessel carry according to Rule 33?",
    options: [
      "Only a whistle",
      "Whistle and bell",
      "Whistle, bell, and gong",
      "Any effective sound device"
    ],
    correctAnswer: 1,
    explanation: "Rule 33(a) requires vessels 20 meters or more to carry a whistle and bell.",
    difficulty: "medium"
  },
  {
    ruleId: 0,
    question: "What does two short blasts mean according to Rule 34?",
    options: [
      "I am altering course to starboard",
      "I am altering course to port",
      "I am operating astern propulsion",
      "I am in doubt"
    ],
    correctAnswer: 1,
    explanation: "Rule 34(a)(ii) states two short blasts mean 'I am altering my course to port'.",
    difficulty: "easy"
  },
  {
    ruleId: 0,
    question: "What fog signal does a power-driven vessel making way sound according to Rule 35?",
    options: [
      "One prolonged blast every 2 minutes",
      "Two prolonged blasts every 2 minutes",
      "Three short blasts every 2 minutes",
      "One short blast every minute"
    ],
    correctAnswer: 0,
    explanation: "Rule 35(a) requires power-driven vessels making way to sound one prolonged blast at intervals of not more than 2 minutes.",
    difficulty: "medium"
  },
  {
    ruleId: 0,
    question: "What should you avoid when using signals to attract attention according to Rule 36?",
    options: [
      "Using any light signals",
      "Using any sound signals",
      "Using signals that could be mistaken for authorized signals",
      "Using searchlights"
    ],
    correctAnswer: 2,
    explanation: "Rule 36 states signals to attract attention must not be mistaken for any signal authorized elsewhere in the Rules.",
    difficulty: "hard"
  },
  {
    ruleId: 0,
    question: "When should distress signals be used according to Rule 37?",
    options: [
      "When visibility is reduced",
      "When in distress and requiring assistance",
      "When other vessels are too close",
      "When navigation equipment fails"
    ],
    correctAnswer: 1,
    explanation: "Rule 37 states distress signals should be used when a vessel is in distress and requires assistance.",
    difficulty: "easy"
  },

  // Part E & F quizzes (Rules 38-41)
  {
    ruleId: 0,
    question: "Which vessels may qualify for exemptions under Rule 38?",
    options: [
      "Any vessel requesting exemption",
      "Vessels built before 1972 COLREGS took effect",
      "Vessels under 12 meters",
      "Military vessels only"
    ],
    correctAnswer: 1,
    explanation: "Rule 38 provides exemptions for vessels whose keel was laid before the 1972 COLREGS entered into force.",
    difficulty: "hard"
  },
  {
    ruleId: 0,
    question: "What defines an 'international voyage' according to Rule 39?",
    options: [
      "Any voyage over 200 nautical miles",
      "A voyage between countries applying COLREGS",
      "A voyage lasting more than 24 hours",
      "A voyage in international waters"
    ],
    correctAnswer: 1,
    explanation: "Rule 39(a) defines international voyage as a voyage from one COLREGS country to another, with specific conditions.",
    difficulty: "medium"
  },
  {
    ruleId: 0,
    question: "To which vessels does Rule 41 apply according to Rule 40?",
    options: [
      "All vessels",
      "Vessels over 50 meters",
      "Vessels engaged on international voyages only",
      "Commercial vessels only"
    ],
    correctAnswer: 2,
    explanation: "Rule 40 states that Rule 41 applies to vessels engaged on international voyages only.",
    difficulty: "medium"
  },
  {
    ruleId: 0,
    question: "Who is responsible for verifying COLREGS compliance according to Rule 41?",
    options: [
      "The port state authority",
      "The competent authority of the flag state",
      "The vessel's classification society",
      "The International Maritime Organization"
    ],
    correctAnswer: 1,
    explanation: "Rule 41 states that the competent authority of the state whose flag the vessel flies shall verify compliance.",
    difficulty: "hard"
  }
];