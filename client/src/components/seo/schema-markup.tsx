import { Helmet } from "react-helmet-async";
import type { Rule } from "@shared/schema";
import { SITE_ORIGIN, siteUrl } from "@/lib/site";

interface RuleSchemaProps {
  rule: Rule;
}

export function RuleSchemaMarkup({ rule }: RuleSchemaProps) {
  const ruleUrl = siteUrl(`/rule/${rule.ruleNumber}`);
  const orgId = `${SITE_ORIGIN}/#organization`;
  const courseId = `${SITE_ORIGIN}/#course`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    "@id": `${ruleUrl}#resource`,
    name: `COLREGS Rule ${rule.ruleNumber} — ${rule.title}`,
    description: rule.plainEnglish.slice(0, 4000),
    url: ruleUrl,
    inLanguage: "en-US",
    learningResourceType: "Reading + interactive assessment",
    educationalUse: "self-assessment",
    isAccessibleForFree: true,
    teaches: [rule.title, ...rule.keyPoints.slice(0, 12)],
    isPartOf: {
      "@type": "Course",
      "@id": courseId,
      name: `COLREGS — Part ${rule.part}: ${rule.partTitle}`,
      provider: { "@id": orgId },
    },
    publisher: { "@id": orgId },
    author: {
      "@type": "Organization",
      "@id": orgId,
      name: "COLREGS Academy",
      url: SITE_ORIGIN,
    },
    about: {
      "@type": "Thing",
      name: "Maritime collision prevention",
      description: "International navigation rules for vessels (COLREGS).",
    },
    /** Short abstract for crawlers; full rule text remains in page HTML. */
    abstract: rule.officialText.slice(0, 1000),
    keywords: [
      "COLREGS",
      "Rule " + rule.ruleNumber,
      rule.title,
      ...rule.keyPoints.map((p) => p.toLowerCase()),
    ],
  };

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_ORIGIN,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: `Rule ${rule.ruleNumber} — ${rule.title}`,
        item: ruleUrl,
      },
    ],
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbData)}</script>
      </Helmet>
    </>
  );
}

interface HomepageSchemaProps {
  totalRules: number;
  completedRules: number;
  overallProgress: number;
}

export function HomepageSchemaMarkup({ totalRules, completedRules, overallProgress }: HomepageSchemaProps) {
  const websiteId = `${SITE_ORIGIN}/#website`;
  const courseId = `${SITE_ORIGIN}/#course`;

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE_ORIGIN}/#homepage`,
        url: SITE_ORIGIN,
        name: "COLREGS Academy — Learn maritime collision rules online",
        description: `Interactive COLREGS course with ${totalRules} rules, quizzes, and assessments. Progress about ${Math.round(overallProgress)}% (${completedRules} rules completed on this device where tracked). Educational certificates only; not a government license.`,
        isPartOf: { "@id": websiteId },
        about: { "@id": courseId },
        mainEntity: { "@id": courseId },
        significantLink: [siteUrl("/faq"), siteUrl("/assessment"), siteUrl("/privacy"), siteUrl("/terms"), siteUrl("/rule/1")],
        specialty: "Maritime safety education",
      },
      {
        "@type": "HowTo",
        "@id": `${SITE_ORIGIN}/#howto-colregs`,
        name: "How to study COLREGS with COLREGS Academy",
        description:
          "Self-paced path: open each rule, read official and plain-language text, complete quizzes, then take a comprehensive assessment.",
        totalTime: "PT3H",
        supply: [
          { "@type": "HowToSupply", name: "Internet connection and a modern web browser" },
          { "@type": "HowToSupply", name: "Optional account for saved progress" },
        ],
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Open Rule 1",
            text: "Start from Rule 1 or browse parts from the home page.",
            url: siteUrl("/rule/1"),
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Study and complete quizzes",
            text: "Read the official text and explanation, then answer the rule quiz questions.",
            url: siteUrl("/rule/1"),
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Track progress",
            text: "Mark rules complete and monitor your completion percentage.",
            url: SITE_ORIGIN,
          },
          {
            "@type": "HowToStep",
            position: 4,
            name: "Take the assessment",
            text: "Optional timed assessment across multiple rules.",
            url: siteUrl("/assessment"),
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Download educational certificate",
            text: "If you pass, you may download an educational completion certificate (not a statutory credential).",
            url: siteUrl("/assessment"),
          },
        ],
      },
    ],
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(graph)}</script>
    </Helmet>
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
    "@type": "LearningResource",
    learningResourceType: "Quiz",
    name: `COLREGS Rule ${rule.ruleNumber} — knowledge check`,
    description: `Question ${quizData.currentQuestion} of ${quizData.totalQuestions} (practice for ${rule.title}): ${quizData.question}`,
    interactivityType: "active",
    educationalLevel: "Continuing education",
    timeRequired: "PT5M",
    about: {
      "@type": "LearningResource",
      name: `Rule ${rule.ruleNumber} — ${rule.title}`,
      teaches: rule.keyPoints,
    },
    assesses: [rule.title, "COLREGS knowledge"],
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
    </Helmet>
  );
}
