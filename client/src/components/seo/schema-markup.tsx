import { Helmet } from "react-helmet-async";
import type { Rule } from "@shared/schema";

interface RuleSchemaProps {
  rule: Rule;
  currentProgress?: number;
  totalRules?: number;
}

export function RuleSchemaMarkup({ rule, currentProgress, totalRules }: RuleSchemaProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    "name": `COLREGS Rule ${rule.ruleNumber} - ${rule.title}`,
    "description": rule.plainEnglish,
    "learningResourceType": "Interactive Lesson",
    "educationalUse": "instruction",
    "teaches": [
      rule.title,
      ...rule.keyPoints,
      "Maritime Safety",
      "Collision Prevention"
    ],
    "isPartOf": {
      "@type": "Course",
      "name": `COLREGS Part ${rule.part} - ${rule.partTitle}`,
      "description": `Maritime safety regulations covering ${rule.partTitle.toLowerCase()}`,
      "provider": {
        "@type": "Organization",
        "name": "COLREGS Academy"
      }
    },
    "about": {
      "@type": "Thing",
      "name": "Maritime Safety",
      "description": "International regulations for preventing collisions at sea"
    },
    "mainEntity": {
      "@type": "Article",
      "headline": `Rule ${rule.ruleNumber}: ${rule.title}`,
      "articleBody": rule.officialText,
      "author": {
        "@type": "Organization",
        "name": "International Maritime Organization"
      },
      "publisher": {
        "@type": "Organization",
        "name": "COLREGS Academy"
      },
      "keywords": [
        "COLREGS",
        "maritime safety",
        "collision prevention",
        rule.title.toLowerCase(),
        ...rule.keyPoints.map(point => point.toLowerCase())
      ]
    }
  };

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "COLREGS Academy",
        "item": "https://colregs-academy.replit.app"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": `Part ${rule.part} - ${rule.partTitle}`,
        "item": `https://colregs-academy.replit.app/part/${rule.part}`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": `Rule ${rule.ruleNumber} - ${rule.title}`,
        "item": `https://colregs-academy.replit.app/rule/${rule.ruleNumber}`
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbData)}
      </script>
    </>
  );
}

interface HomepageSchemaProps {
  totalRules: number;
  completedRules: number;
  overallProgress: number;
}

export function HomepageSchemaMarkup({ totalRules, completedRules, overallProgress }: HomepageSchemaProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "COLREGS Academy",
    "alternateName": "Maritime Safety Education Platform",
    "url": "https://colregs-academy.replit.app",
    "description": "Interactive learning platform for International Regulations for Preventing Collisions at Sea (COLREGS). Master maritime safety through comprehensive lessons, quizzes, and real-world scenarios.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://colregs-academy.replit.app/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "mainEntity": {
      "@type": "Course",
      "name": "COLREGS - International Regulations for Preventing Collisions at Sea",
      "description": "Complete maritime safety course covering all 38 COLREGS rules across 5 parts",
      "provider": {
        "@type": "EducationalOrganization",
        "name": "COLREGS Academy"
      },
      "courseCode": "COLREGS-2023",
      "hasCourseInstance": {
        "@type": "CourseInstance",
        "courseMode": "online",
        "courseWorkload": "PT2H30M",
        "instructor": {
          "@type": "Organization",
          "name": "COLREGS Academy"
        }
      },
      "numberOfCredits": totalRules,
      "occupationalCategory": [
        "Marine Transportation",
        "Maritime Safety",
        "Navigation",
        "Vessel Operations"
      ],
      "teaches": [
        "Collision Prevention Rules",
        "Maritime Navigation Safety",
        "Vessel Right-of-Way Rules",
        "Navigation Lights and Signals", 
        "Maritime Emergency Procedures",
        "Sound Signals in Fog",
        "Restricted Visibility Navigation"
      ],
      "audience": {
        "@type": "Audience",
        "audienceType": [
          "Maritime Professionals",
          "Boat Operators", 
          "Commercial Mariners",
          "Recreational Boaters",
          "Navigation Students",
          "Yacht Captains",
          "Fishing Vessel Operators"
        ]
      }
    }
  };

  return (
    <script type="application/ld+json">
      {JSON.stringify(structuredData)}
    </script>
  );
}

interface QuizSchemaProps {
  rule: Rule;
  quizData: {
    totalQuestions: number;
    currentQuestion: number;
    question: string;
    options: string[];
  };
}

export function QuizSchemaMarkup({ rule, quizData }: QuizSchemaProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Quiz",
    "name": `COLREGS Rule ${rule.ruleNumber} Knowledge Check`,
    "description": `Interactive quiz to test understanding of ${rule.title}`,
    "about": {
      "@type": "LearningResource",
      "name": `Rule ${rule.ruleNumber} - ${rule.title}`,
      "teaches": rule.keyPoints
    },
    "hasPart": {
      "@type": "Question",
      "name": quizData.question,
      "answerCount": quizData.options.length,
      "acceptedAnswerText": quizData.options,
      "eduQuestionType": "Multiple Choice"
    },
    "assesses": [
      rule.title,
      "Maritime Safety Knowledge",
      "COLREGS Understanding"
    ],
    "educationalLevel": "Professional Development",
    "timeRequired": "PT5M"
  };

  return (
    <script type="application/ld+json">
      {JSON.stringify(structuredData)}
    </script>
  );
}