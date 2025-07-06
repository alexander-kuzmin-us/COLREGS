import { Helmet } from "react-helmet-async";

export function ComprehensiveSchemaMarkup() {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": "https://colregs-academy.replit.app/#webapp",
        "name": "COLREGS Academy",
        "alternateName": "International Maritime Safety Training Platform",
        "url": "https://colregs-academy.replit.app",
        "description": "Advanced maritime safety education platform teaching International Regulations for Preventing Collisions at Sea (COLREGS) through interactive learning modules, comprehensive quizzes, and progress tracking for all 41 official rules.",
        "applicationCategory": "EducationalApplication",
        "operatingSystem": "Web Browser",
        "browserRequirements": "Modern web browser with JavaScript enabled (Chrome, Firefox, Safari, Edge)",
        "featureList": [
          "Complete COLREGS Coverage - All 41 official rules",
          "Interactive Learning Modules",
          "Multiple Difficulty Level Quizzes",
          "Progress Tracking and Analytics",
          "Timed Assessment System",
          "Certificate Generation",
          "Maritime Achievement System",
          "Mobile-Responsive Design",
          "Google OAuth Authentication"
        ],
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock",
          "category": "Educational Software"
        },
        "author": {
          "@type": "Organization",
          "name": "COLREGS Academy",
          "url": "https://colregs-academy.replit.app"
        },
        "inLanguage": "en-US",
        "learningResourceType": "Interactive Tutorial",
        "educationalLevel": "All Levels",
        "teaches": [
          "International Regulations for Preventing Collisions at Sea",
          "Maritime Navigation Rules",
          "Vessel Safety Protocols",
          "Maritime Collision Prevention",
          "Navigation Light Signals",
          "Sound Signal Regulations"
        ]
      },
      {
        "@type": "Organization",
        "@id": "https://colregs-academy.replit.app/#organization",
        "name": "COLREGS Academy",
        "url": "https://colregs-academy.replit.app",
        "logo": "https://colregs-academy.replit.app/generated-icon.png",
        "description": "Maritime safety education organization providing comprehensive COLREGS training through interactive digital learning platforms.",
        "foundingDate": "2025",
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "Educational Support",
          "availableLanguage": "English",
          "areaServed": "Worldwide"
        },
        "sameAs": [
          "https://colregs-academy.replit.app"
        ]
      },
      {
        "@type": "Course",
        "@id": "https://colregs-academy.replit.app/#course",
        "name": "Complete COLREGS Training Course",
        "description": "Comprehensive training course covering all 41 International Regulations for Preventing Collisions at Sea with interactive quizzes and certification.",
        "provider": {
          "@type": "Organization",
          "name": "COLREGS Academy",
          "url": "https://colregs-academy.replit.app"
        },
        "educationalLevel": "All Levels",
        "teaches": [
          "COLREGS Part A - General Rules",
          "COLREGS Part B - Steering and Sailing Rules", 
          "COLREGS Part C - Lights and Shapes",
          "COLREGS Part D - Sound and Light Signals",
          "COLREGS Part E - Exemptions",
          "COLREGS Part F - Verification of Compliance"
        ],
        "timeRequired": "PT2H",
        "courseMode": "online",
        "availableLanguage": "en",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock"
        },
        "hasCourseInstance": {
          "@type": "CourseInstance",
          "courseMode": "online",
          "courseSchedule": {
            "@type": "Schedule",
            "scheduleTimezone": "UTC",
            "repeatFrequency": "On-demand"
          }
        }
      },
      {
        "@type": "FAQPage",
        "@id": "https://colregs-academy.replit.app/faq#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What are COLREGS?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "COLREGS (International Regulations for Preventing Collisions at Sea) are international maritime safety rules established in 1972 that govern vessel navigation and collision prevention on the world's oceans and connected waterways. These rules are essential for safe navigation and are recognized worldwide."
            }
          },
          {
            "@type": "Question", 
            "name": "Who needs to learn COLREGS?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "COLREGS are essential for anyone operating vessels including commercial mariners, yacht captains, recreational boaters, fishing vessel operators, maritime students, and navigation officers. Whether you're a professional mariner or weekend sailor, understanding these rules can save lives and prevent accidents."
            }
          },
          {
            "@type": "Question",
            "name": "How do I start learning on this website?",
            "acceptedAnswer": {
              "@type": "Answer", 
              "text": "Simply click 'Start Learning' on the homepage to begin with Rule 1. The platform follows a structured progression through all COLREGS rules. You can also browse individual rules from the course modules section or use the sidebar navigation to jump to specific topics."
            }
          },
          {
            "@type": "Question",
            "name": "How does progress tracking work?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Your progress is automatically saved as you complete rules and quizzes. Click 'Mark as Complete' after studying a rule to track your progress. The platform shows your overall completion percentage and tracks which rules you've mastered."
            }
          },
          {
            "@type": "Question",
            "name": "How long does it take to complete the course?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The complete course takes approximately 2-3 hours to finish, but you can learn at your own pace. Individual rules take 5-10 minutes to study, and you can save your progress and return anytime. The platform is designed for flexible, self-paced learning."
            }
          },
          {
            "@type": "Question",
            "name": "Can I use this on my phone or tablet?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes! The platform is fully responsive and optimized for mobile devices. You can learn and take quizzes on any device - smartphone, tablet, or desktop computer. Your progress syncs across all devices."
            }
          }
        ]
      },
      {
        "@type": "HowTo",
        "@id": "https://colregs-academy.replit.app/#howto",
        "name": "How to Complete COLREGS Training",
        "description": "Step-by-step guide to mastering International Regulations for Preventing Collisions at Sea using COLREGS Academy",
        "totalTime": "PT2H",
        "supply": [
          {
            "@type": "HowToSupply",
            "name": "Computer or mobile device with internet connection"
          },
          {
            "@type": "HowToSupply", 
            "name": "Modern web browser"
          }
        ],
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Start Learning",
            "text": "Click 'Start Learning' on the homepage to begin with Rule 1",
            "url": "https://colregs-academy.replit.app/rule/1"
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Study Each Rule",
            "text": "Read both official text and plain English explanations for each rule",
            "url": "https://colregs-academy.replit.app/rule/1"
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Take Quizzes",
            "text": "Complete interactive quizzes to test your understanding of each rule",
            "url": "https://colregs-academy.replit.app/rule/1"
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "Track Progress",
            "text": "Monitor your completion status and quiz scores as you advance",
            "url": "https://colregs-academy.replit.app"
          },
          {
            "@type": "HowToStep",
            "position": 5,
            "name": "Earn Achievements",
            "text": "Unlock maritime-themed badges as you complete sections and achieve high scores",
            "url": "https://colregs-academy.replit.app/achievements"
          },
          {
            "@type": "HowToStep",
            "position": 6,
            "name": "Take Assessment",
            "text": "Complete timed assessments covering multiple rules for comprehensive evaluation",
            "url": "https://colregs-academy.replit.app/assessment"
          },
          {
            "@type": "HowToStep",
            "position": 7,
            "name": "Get Certified",
            "text": "Achieve 70% or higher on assessments to receive downloadable completion certificates",
            "url": "https://colregs-academy.replit.app/assessment"
          }
        ]
      }
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>
    </Helmet>
  );
}