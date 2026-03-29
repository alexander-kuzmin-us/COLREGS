import { Helmet } from "react-helmet-async";
import { SITE_ORIGIN, siteUrl } from "@/lib/site";

/**
 * Global JSON-LD for every route: Organization, WebSite, WebApplication, Course.
 * FAQPage and HowTo belong on their specific URLs only (see FAQ page + home WebPage graph).
 */
export function ComprehensiveSchemaMarkup() {
  const orgId = `${SITE_ORIGIN}/#organization`;
  const websiteId = `${SITE_ORIGIN}/#website`;
  const webAppId = `${SITE_ORIGIN}/#webapp`;
  const courseId = `${SITE_ORIGIN}/#course`;

  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": orgId,
        name: "COLREGS Academy",
        alternateName: "COLREGS Academy — Maritime Safety Education",
        url: SITE_ORIGIN,
        description:
          "Independent educational platform for learning the International Regulations for Preventing Collisions at Sea (COLREGS) through interactive lessons and quizzes.",
        logo: {
          "@type": "ImageObject",
          url: siteUrl("/generated-icon.png"),
        },
        foundingDate: "2025",
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer support",
          availableLanguage: ["English"],
          areaServed: "Worldwide",
        },
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        name: "COLREGS Academy",
        url: SITE_ORIGIN,
        inLanguage: "en-US",
        publisher: { "@id": orgId },
        description:
          "Learn COLREGS online: official rule text (public-domain USCG-aligned source), plain-English explanations, quizzes, and assessments.",
        about: {
          "@type": "DefinedTerm",
          name: "COLREGS",
          alternateName: "International Regulations for Preventing Collisions at Sea",
          description:
            "International maritime rules for preventing collisions, based on the 1972 Convention as implemented in national navigation rules.",
          inDefinedTermSet: {
            "@type": "DefinedTermSet",
            name: "Maritime navigation",
          },
        },
      },
      {
        "@type": "WebApplication",
        "@id": webAppId,
        name: "COLREGS Academy",
        url: SITE_ORIGIN,
        applicationCategory: "EducationalApplication",
        operatingSystem: "Web browser",
        browserRequirements: "Requires JavaScript. Use a current version of Chrome, Firefox, Safari, or Edge.",
        featureList: [
          "Full COLREGS rule library with official and plain-language text",
          "Rule-by-rule quizzes",
          "Progress tracking",
          "Timed assessments",
          "Educational completion certificates (not government credentials)",
          "Optional account sign-in",
        ],
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          category: "Educational software",
        },
        author: { "@id": orgId },
        publisher: { "@id": orgId },
        isPartOf: { "@id": websiteId },
        inLanguage: "en-US",
        learningResourceType: "Interactive tutorial",
        educationalLevel: "Beginner through advanced",
        teaches: [
          "International Regulations for Preventing Collisions at Sea",
          "Steering and sailing rules",
          "Lights, shapes, and sound signals",
          "Collision avoidance and watchkeeping concepts",
        ],
      },
      {
        "@type": "Course",
        "@id": courseId,
        name: "COLREGS — Collision prevention rules (full curriculum)",
        description:
          "Structured online study of all COLREGS parts (general, steering and sailing, lights and shapes, sound signals, and related topics) with practice questions. Completion certificates are for educational recognition only, not statutory licensing.",
        provider: { "@id": orgId },
        educationalLevel: "Beginner through advanced",
        teaches: [
          "COLREGS Part A — General",
          "COLREGS Part B — Steering and sailing rules",
          "COLREGS Part C — Lights and shapes",
          "COLREGS Part D — Sound and light signals",
          "COLREGS Part E — Exemptions",
          "COLREGS Part F — Verification of compliance (where applicable)",
        ],
        timeRequired: "PT3H",
        courseMode: "online",
        isAccessibleForFree: true,
        availableLanguage: "en",
        hasCourseInstance: {
          "@type": "CourseInstance",
          courseMode: "online",
          courseWorkload: "PT3H",
        },
      },
    ],
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
    </Helmet>
  );
}
