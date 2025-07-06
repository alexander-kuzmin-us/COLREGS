import { db } from "./db";
import { rules, quizzes } from "@shared/schema";
import { completeColregsRules, completeColregsQuizzes } from "./complete-colregs-data";
import { completeColregsRules as additionalRules, additionalQuizzes } from "./complete-colregs-full";

// Clear existing data and reseed with complete COLREGS
export async function clearAndReseed() {
  console.log("Clearing existing data...");
  await db.delete(quizzes);
  await db.delete(rules);
  
  console.log("Inserting complete COLREGS rules...");
  const insertedRules = await db.insert(rules).values(completeColregsRules).returning();
  
  // Map quiz rule references to actual rule IDs
  const ruleIdMap = new Map<number, number>();
  insertedRules.forEach((rule, index) => {
    ruleIdMap.set(index + 1, rule.id);
  });
  
  // Update quiz rule IDs to match inserted rules
  const updatedQuizzes = completeColregsQuizzes.map(quiz => ({
    ...quiz,
    ruleId: ruleIdMap.get(quiz.ruleId) || quiz.ruleId
  }));
  
  console.log("Inserting complete COLREGS quizzes...");
  await db.insert(quizzes).values(updatedQuizzes).returning();
  
  console.log(`Complete reseed finished! Inserted ${insertedRules.length} rules and ${updatedQuizzes.length} quizzes`);
}

const initialRules = [
  {
    ruleNumber: "1",
    title: "Application",
    part: "A",
    partTitle: "General",
    officialText: "(a) These Rules shall apply to all vessels upon the high seas and in all waters connected therewith navigable by seagoing vessels.\n\n(b) Nothing in these Rules shall interfere with the operation of special rules made by an appropriate authority for roadsteads, harbors, rivers, lakes or inland waterways connected with the high seas and navigable by seagoing vessels. Such special rules shall conform as closely as possible to these Rules.\n\n(c) Nothing in these Rules shall interfere with the operation of any special rules made by the Government of any State with respect to additional station or signal lights or whistle signals for ships of war and vessels proceeding under convoy, or with respect to additional station or signal lights for fishing vessels engaged in fishing as a fleet. These additional station or signal lights or whistle signals shall, so far as possible, be such that they cannot be mistaken for any light or signal authorized elsewhere under these Rules.\n\n(d) Traffic separation schemes may be adopted by the Organization for the purpose of these Rules.\n\n(e) Whenever the Government concerned shall have determined that a vessel of special construction or purpose cannot comply fully with the provisions of any of these Rules with respect to the number, position, range or arc of visibility of lights or shapes, as well as to the disposition and characteristics of sound-signaling appliances, without interfering with the special function of the vessel, such vessel shall comply with such other provisions in regard to the number, position, range or arc of visibility of lights or shapes, as well as to the disposition and characteristics of sound-signaling appliances, as her Government shall have determined to be the closest possible compliance with these Rules in respect to that vessel.",
    plainEnglish: "Rule 1 establishes the scope and application of COLREGS:\n\n(a) Universal application: These rules apply to all vessels on the high seas and connected navigable waters.\n\n(b) Local rules compatibility: Local harbor and waterway authorities can make special rules, but they must be as close as possible to COLREGS.\n\n(c) Military and fishing vessel exceptions: Governments can authorize additional lights and signals for warships, convoys, and fishing fleets, provided they don't conflict with standard COLREGS signals.\n\n(d) Traffic separation schemes: The IMO can establish traffic routing systems under these rules.\n\n(e) Special vessel exemptions: Vessels with unique construction or purpose may be granted exemptions from specific requirements when full compliance would interfere with their function.",
    keyPoints: ["Applies to all vessels on high seas", "Local rules must conform to COLREGS", "Special provisions for military and fishing vessels", "IMO authority for traffic schemes", "Exemptions for special construction vessels"],
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
    officialText: "For the purpose of these Rules, except where the context otherwise requires: (a) The word 'vessel' includes every description of water craft, including non-displacement craft, WIG craft and seaplanes, used or capable of being used as a means of transportation on water.",
    plainEnglish: "Key terms used in these rules are defined here. A 'vessel' means any watercraft including boats, ships, hovercraft, ground effect vehicles, and seaplanes that can transport people or cargo on water.",
    keyPoints: ["Defines key terms", "Vessel includes all watercraft", "Covers various craft types", "Foundation for other rules"],
    commonViolations: ["Misunderstanding vessel definitions", "Confusion about craft classifications"],
    relatedRules: ["1", "2", "4"]
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
    officialText: "Every vessel shall at all times proceed at a safe speed such that she can take proper and effective action to avoid collision and be stopped within a distance appropriate to the prevailing circumstances and conditions.",
    plainEnglish: "Always travel at a speed that allows you to stop or avoid collision in time, considering visibility, traffic, and sea conditions.",
    keyPoints: ["Speed must be safe for conditions", "Must be able to stop in time", "Consider visibility and traffic", "Effective collision avoidance"],
    commonViolations: ["Excessive speed in fog", "Not reducing speed in traffic", "Ignoring sea conditions"],
    relatedRules: ["5", "7", "19"]
  }
];

const initialQuizzes = [
  {
    ruleId: 4, // Rule 5 - Look-out
    question: "In foggy conditions, which of the following is NOT sufficient for maintaining a proper look-out according to Rule 5?",
    options: [
      "Visual observation only, since radar might be unreliable",
      "Combination of sight, hearing, and radar monitoring", 
      "Use of all available means including sound signals",
      "Continuous radar plotting and position fixing"
    ],
    correctAnswer: 0,
    explanation: "Visual observation alone is insufficient in fog. Rule 5 requires using sight, hearing, AND all available means appropriate to the conditions, including radar and sound signals."
  },
  {
    ruleId: 4, // Rule 5 - Look-out
    question: "What does 'all available means' include when maintaining a proper look-out?",
    options: [
      "Only visual and radar observation",
      "Radar, GPS, radio communications, and other navigation aids",
      "Just the equipment required by law", 
      "Only electronic navigation systems"
    ],
    correctAnswer: 1,
    explanation: "'All available means' includes any navigation equipment or method that can help assess the situation and collision risk, including radar, GPS, radio, AIS, and other aids."
  },
  {
    ruleId: 5, // Rule 6 - Safe Speed
    question: "According to Rule 6, what factors should determine a vessel's safe speed?",
    options: [
      "Only the maximum speed capability of the vessel",
      "Weather conditions and the vessel's stopping distance",
      "Traffic density, visibility, sea conditions, and stopping ability",
      "Just the posted speed limits in the area"
    ],
    correctAnswer: 2,
    explanation: "Safe speed must consider all prevailing circumstances including visibility, traffic density, sea state, wind, and the vessel's ability to stop or take evasive action."
  }
];

export async function seedDatabase() {
  try {
    console.log("Starting database seeding...");
    
    // Insert rules
    console.log("Inserting rules...");
    for (const rule of initialRules) {
      await db.insert(rules).values(rule).onConflictDoNothing();
    }
    
    // Get rule IDs for quiz association
    const insertedRules = await db.select().from(rules);
    const ruleMap = new Map(insertedRules.map(r => [r.ruleNumber, r.id]));
    
    // Update quiz ruleIds to match database IDs
    const quizzesToInsert = initialQuizzes.map(quiz => ({
      ...quiz,
      ruleId: quiz.ruleId === 4 ? ruleMap.get("5")! : ruleMap.get("6")!
    }));
    
    // Insert quizzes
    console.log("Inserting quizzes...");
    for (const quiz of quizzesToInsert) {
      await db.insert(quizzes).values(quiz).onConflictDoNothing();
    }
    
    console.log("Database seeding completed successfully!");
    
    // Log what was inserted
    const ruleCount = await db.select().from(rules);
    const quizCount = await db.select().from(quizzes);
    console.log(`Inserted ${ruleCount.length} rules and ${quizCount.length} quizzes`);
    
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
}

// Run seeding if this file is executed directly
seedDatabase().then(() => {
  console.log("Seeding complete");
  process.exit(0);
}).catch((error) => {
  console.error("Seeding failed:", error);
  process.exit(1);
});