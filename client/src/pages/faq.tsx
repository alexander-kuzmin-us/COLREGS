import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Ship, Search, Home, BookOpen, HelpCircle, Users, Clock, Award } from "lucide-react";
import { Link } from "wouter";
import SiteFooter from "@/components/site-footer";

const faqData = [
  {
    category: "Getting Started",
    questions: [
      {
        id: "what-is-colregs",
        question: "What are COLREGS?",
        answer: "COLREGS (International Regulations for Preventing Collisions at Sea) are international maritime safety rules established in 1972 that govern vessel navigation and collision prevention on the world's oceans and connected waterways. These rules are essential for safe navigation and are recognized worldwide."
      },
      {
        id: "who-needs-colregs",
        question: "Who needs to learn COLREGS?",
        answer: "COLREGS are essential for anyone operating vessels including commercial mariners, yacht captains, recreational boaters, fishing vessel operators, maritime students, and navigation officers. Whether you're a professional mariner or weekend sailor, understanding these rules can save lives and prevent accidents."
      },
      {
        id: "how-to-start",
        question: "How do I start learning on this website?",
        answer: "Simply click 'Start Learning' on the homepage to begin with Rule 1. The platform follows a structured progression through all COLREGS rules. You can also browse individual rules from the course modules section or use the sidebar navigation to jump to specific topics."
      }
    ]
  },
  {
    category: "Using the Platform",
    questions: [
      {
        id: "navigation",
        question: "How do I navigate between rules?",
        answer: "Use the sidebar on rule pages to see all available rules organized by parts. You can click on any unlocked rule to jump to it, or use the Previous/Next buttons at the bottom of each rule page. Rules unlock as you complete previous ones in sequence."
      },
      {
        id: "progress-tracking",
        question: "How does progress tracking work?",
        answer: "Your progress is automatically saved as you complete rules and quizzes. Click 'Mark as Complete' after studying a rule to track your progress. The platform shows your overall completion percentage and tracks which rules you've mastered."
      },
      {
        id: "quizzes",
        question: "How do the quizzes work?",
        answer: "Each rule includes interactive multiple-choice quizzes to test your understanding. Select your answer and click 'Submit Answer' to see immediate feedback with detailed explanations. You can navigate between questions using the Previous/Next buttons."
      },
      {
        id: "mobile-use",
        question: "Can I use this on my phone or tablet?",
        answer: "Yes! The platform is fully responsive and optimized for mobile devices. You can learn and take quizzes on any device - smartphone, tablet, or desktop computer. Your progress syncs across all devices."
      }
    ]
  },
  {
    category: "Content and Learning",
    questions: [
      {
        id: "rule-structure",
        question: "How are the rules organized?",
        answer: "COLREGS contains 38 rules organized into 5 parts: Part A (General), Part B (Steering and Sailing Rules), Part C (Lights and Shapes), Part D (Sound and Light Signals), and Part E (Exemptions). Each rule includes official text, plain English explanations, key points, and common violations."
      },
      {
        id: "difficulty-level",
        question: "What skill level is this course designed for?",
        answer: "The course is designed for all skill levels, from beginners to experienced mariners. Each rule includes both the official regulation text and plain English explanations. Key points and common violations help reinforce learning for practical application."
      },
      {
        id: "time-commitment",
        question: "How long does it take to complete the course?",
        answer: "The complete course takes approximately 2-3 hours to finish, but you can learn at your own pace. Individual rules take 5-10 minutes to study, and you can save your progress and return anytime. The platform is designed for flexible, self-paced learning."
      },
      {
        id: "updates",
        question: "Is the content up to date?",
        answer: "Yes, all content is based on the current International Regulations for Preventing Collisions at Sea (1972) as amended. The rules presented are the internationally recognized standards used by maritime authorities worldwide."
      },
      {
        id: "educational-purpose",
        question: "Is this platform for official certification?",
        answer: "No, this platform is designed for educational purposes only. While we provide comprehensive COLREGS training and certificates for successful completion, these are educational recognition certificates that do not substitute for formal maritime education, official certification courses, or sailing school requirements. Always complete proper training with certified instructors for official qualifications."
      },
      {
        id: "local-variations",
        question: "Are COLREGS the same everywhere?",
        answer: "COLREGS are international regulations, but they are implemented nationally and may have minor variations in different countries. Always consult your local maritime authorities for official requirements and current regulations applicable in your specific jurisdiction. This platform provides the international standard as a learning foundation."
      }
    ]
  },
  {
    category: "Technical Support",
    questions: [
      {
        id: "browser-support",
        question: "What browsers are supported?",
        answer: "The platform works on all modern web browsers including Chrome, Firefox, Safari, and Edge. For the best experience, use the latest version of your preferred browser. JavaScript must be enabled for full functionality."
      },
      {
        id: "data-storage",
        question: "How is my progress saved?",
        answer: "Your learning progress is securely stored in our database and tied to your session. Progress includes completed rules, quiz scores, and completion timestamps. This ensures your learning journey is preserved across sessions."
      },
      {
        id: "offline-access",
        question: "Can I use this offline?",
        answer: "Currently, the platform requires an internet connection to load content and save progress. We recommend studying when you have a stable internet connection to ensure your progress is properly saved."
      },
      {
        id: "technical-issues",
        question: "What if I encounter technical problems?",
        answer: "If you experience any technical issues, try refreshing the page or clearing your browser cache. Most problems are resolved by restarting your browser. The platform is designed to be reliable and user-friendly across all devices."
      }
    ]
  }
];

export default function FAQ() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.flatMap(category => 
      category.questions.map(q => ({
        "@type": "Question",
        "name": q.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": q.answer
        }
      }))
    )
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Helmet>
        <title>FAQ - How to Use COLREGS Academy | Maritime Safety Learning Platform</title>
        <meta name="description" content="Frequently asked questions about using COLREGS Academy. Learn how to navigate the platform, track progress, take quizzes, and master maritime collision prevention rules." />
        <meta name="keywords" content="COLREGS FAQ, maritime safety help, navigation rules guide, how to use COLREGS Academy, maritime education support" />
        <link rel="canonical" href="https://colregs-academy.replit.app/faq" />
        
        {/* Open Graph */}
        <meta property="og:title" content="COLREGS Academy FAQ - How to Use the Platform" />
        <meta property="og:description" content="Get answers to common questions about using COLREGS Academy to learn maritime collision prevention rules." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://colregs-academy.replit.app/faq" />

        {/* FAQ Schema */}
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary rounded-lg flex items-center justify-center">
                <Ship className="text-white" size={16} />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg sm:text-xl font-bold text-gray-900">COLREGS Academy</h1>
                <p className="text-xs text-gray-500">Maritime Safety Education</p>
              </div>
              <div className="sm:hidden">
                <h1 className="text-lg font-bold text-gray-900">COLREGS</h1>
              </div>
            </div>

            <div className="hidden md:flex flex-1 max-w-2xl mx-8">
              <div className="relative w-full">
                <Input
                  type="text"
                  placeholder="Search FAQ..."
                  className="pl-10"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="outline" asChild>
                <Link href="/">
                  <Home className="mr-2" size={16} />
                  <span className="hidden sm:inline">Home</span>
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild className="hidden sm:flex">
                <Link href="/privacy">Privacy</Link>
              </Button>
              <Button variant="ghost" size="sm" asChild className="hidden sm:flex">
                <Link href="/terms">Terms</Link>
              </Button>
            </div>
          </div>

          {/* Mobile search bar */}
          <div className="md:hidden pb-4">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search FAQ..."
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 py-3 text-sm">
            <Link href="/" className="text-primary hover:text-primary/80">
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-500">FAQ</span>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <HelpCircle className="text-primary" size={32} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 break-words">
            Frequently Asked Questions
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Get answers to common questions about using COLREGS Academy to learn maritime collision prevention rules.
          </p>
        </div>

        {/* Quick Start Guide */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="text-primary" size={20} />
              <span>Quick Start Guide</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <h3 className="font-semibold mb-2">Start Learning</h3>
                <p className="text-sm text-gray-600">Begin with Rule 1 or browse course modules to explore specific maritime safety topics.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-green-600 font-bold">2</span>
                </div>
                <h3 className="font-semibold mb-2">Take Quizzes</h3>
                <p className="text-sm text-gray-600">Test your knowledge with interactive quizzes and get immediate feedback with explanations.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-purple-600 font-bold">3</span>
                </div>
                <h3 className="font-semibold mb-2">Track Progress</h3>
                <p className="text-sm text-gray-600">Mark rules as complete and monitor your overall progress through the COLREGS curriculum.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQ Categories */}
        <div className="space-y-6">
          {faqData.map((category, categoryIndex) => (
            <Card key={categoryIndex}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  {category.category === "Getting Started" && <Users className="text-primary" size={20} />}
                  {category.category === "Using the Platform" && <BookOpen className="text-primary" size={20} />}
                  {category.category === "Content and Learning" && <Award className="text-primary" size={20} />}
                  {category.category === "Technical Support" && <HelpCircle className="text-primary" size={20} />}
                  <span>{category.category}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible>
                  {category.questions.map((faq, faqIndex) => (
                    <AccordionItem key={faq.id} value={faq.id}>
                      <AccordionTrigger className="text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact Section */}
        <Card className="mt-8">
          <CardContent className="p-8 text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Still have questions?
            </h2>
            <p className="text-gray-600 mb-6">
              Can't find what you're looking for? Our platform is designed to be intuitive and user-friendly. 
              Try exploring the interface or refer to the tooltips and help text throughout the application.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
              <Button asChild>
                <Link href="/">
                  <Home className="mr-2" size={16} />
                  Back to Home
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/rule/1">
                  <BookOpen className="mr-2" size={16} />
                  Start Learning
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <SiteFooter />
    </div>
  );
}
