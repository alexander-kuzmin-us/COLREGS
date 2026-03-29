import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Ship, Home, Scale } from "lucide-react";
import { Link } from "wouter";

/** Replace with your production legal or support inbox before going live. */
const LEGAL_CONTACT_EMAIL = "legal@colregs-academy.app";

const EFFECTIVE_DATE = "March 28, 2026";
const LAST_UPDATED = "March 28, 2026";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Terms of Service | COLREGS Academy</title>
        <meta
          name="description"
          content="Terms of Service for COLREGS Academy: subscriptions, acceptable use, intellectual property, liability, and dispute resolution."
        />
        <link rel="canonical" href="https://colregs-academy.replit.app/terms" />
        <meta property="og:title" content="Terms of Service | COLREGS Academy" />
        <meta
          property="og:description"
          content="Legal terms governing use of COLREGS Academy, including Pro subscriptions and acceptable use."
        />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://colregs-academy.replit.app/terms" />
      </Helmet>

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

            <div className="flex items-center space-x-2">
              <Button variant="outline" asChild>
                <Link href="/">
                  <Home className="mr-2" size={16} />
                  <span className="hidden sm:inline">Home</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 py-3 text-sm">
            <Link href="/" className="text-primary hover:text-primary/80">
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-500">Terms of Service</span>
          </div>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Scale className="text-primary" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms of Service</h1>
          <p className="text-sm text-gray-600">
            <span className="font-medium text-gray-800">Effective date:</span> {EFFECTIVE_DATE}
            {" · "}
            <span className="font-medium text-gray-800">Last updated:</span> {LAST_UPDATED}
          </p>
        </div>

        <p className="text-gray-700 leading-relaxed mb-8">
          These Terms of Service (“Terms”) are a binding agreement between you and COLREGS Academy
          (“we”, “us”, “our”) governing access to and use of our website, applications, and related
          services (collectively, the “Service”). By creating an account, subscribing, or using the
          Service, you agree to these Terms and our{" "}
          <Link href="/privacy" className="text-primary underline underline-offset-2 hover:text-primary/80">
            Privacy Policy
          </Link>
          . If you do not agree, do not use the Service.
        </p>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">1. Description of the Service</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                COLREGS Academy provides online maritime education, including structured lessons,
                quizzes, progress tracking, assessments, and related features. The Service is offered for
                learning and reference and does not replace formal maritime training, licensing, or
                instruction required by any flag state or authority.
              </p>
              <p>
                <strong>Free tier:</strong> access to core educational content and features we designate as
                free from time to time (for example, selected rules, quizzes, or limited progress features),
                subject to change with reasonable notice where required by law.
              </p>
              <p>
                <strong>Pro tier (paid):</strong> when available, Pro includes enhanced or expanded access
                such as additional content, advanced analytics, certificates, or other features we describe at
                checkout or on our pricing page. Exact Pro benefits, limits, and availability may vary by
                region and may be updated; the description at the time you subscribe controls for your
                current billing period unless we notify you otherwise as required by law.
              </p>
              <p>
                <strong>Fleet / B2B:</strong> if we offer organization or fleet plans, those may include
                seat licensing, admin tools, and invoicing. Fleet terms may be supplemented by a separate
                order form or agreement; where they conflict with these Terms on commercial points, the
                order form prevails for that customer relationship.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">2. Accounts and eligibility</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                You may need an account to access certain features. You may create an account using Google
                OAuth or other methods we support. You agree that:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  You will provide accurate information and keep it updated.
                </li>
                <li>
                  <strong>One account per person:</strong> you will not create multiple accounts to evade
                  limits, bans, or pricing. Organization plans must be purchased for legitimate multi-seat use;
                  you will not share one personal login across a crew or fleet where a fleet plan is
                  required.
                </li>
                <li>
                  You are responsible for activity under your account until you notify us of unauthorized use
                  and secure your credentials.
                </li>
                <li>
                  You must be at least the age of digital consent in your jurisdiction (often 13 or 16) or
                  have parental consent where required.
                </li>
              </ul>
              <p>
                We may suspend or terminate accounts that violate these Terms or pose security or legal risk.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">3. Subscriptions, billing, renewal, and cancellation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                <strong>Fees:</strong> Pro and other paid plans are billed in advance through our payment
                processor (for example, Stripe). Prices, taxes, and currency are shown at checkout. You
                authorize us and our processors to charge your payment method on a recurring basis for
                subscription plans.
              </p>
              <p>
                <strong>Billing cycle:</strong> subscriptions renew automatically at the end of each billing
                period (for example, monthly or annually) unless cancelled before the renewal date. The
                length of your billing period is the one you select at purchase.
              </p>
              <p>
                <strong>Renewal:</strong> your payment method will be charged on the renewal date at the then-
                current rate unless you cancel. We may change prices with advance notice where required by
                law; changes typically apply to the next renewal after notice.
              </p>
              <p>
                <strong>How to cancel:</strong> you may cancel your subscription through the account or
                billing settings we provide, or by contacting us at{" "}
                <a
                  className="text-primary underline underline-offset-2"
                  href={`mailto:${LEGAL_CONTACT_EMAIL}?subject=Subscription%20cancellation`}
                >
                  {LEGAL_CONTACT_EMAIL}
                </a>
                . Cancellation stops future renewals; it does not refund amounts already charged except as
                stated in the Refund Policy below.
              </p>
              <p>
                <strong>Failed payments:</strong> if a payment fails, we may retry and may suspend access
                until payment succeeds.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">4. Refund policy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                <strong>Annual subscriptions:</strong> if you are not satisfied with Pro, you may request a
                full refund within <strong>fourteen (14) days</strong> of your initial annual purchase,
                provided you have not materially abused the Service (for example, bulk export or systematic
                scraping). Refunds are returned to the original payment method where possible.
              </p>
              <p>
                <strong>Monthly subscriptions:</strong> fees are generally non-refundable after{" "}
                <strong>forty-eight (48) hours</strong> from the charge. Within the first 48 hours of a new
                monthly subscription, you may contact us for a one-time courtesy refund if you have not
                materially abused the Service; we may deny or prorate at our discretion where permitted by
                law.
              </p>
              <p>
                <strong>Exceptions:</strong> nothing in this section limits any non-waivable statutory
                rights you have as a consumer. Chargebacks may result in account closure. For refund requests,
                email{" "}
                <a
                  className="text-primary underline underline-offset-2"
                  href={`mailto:${LEGAL_CONTACT_EMAIL}?subject=Refund%20request`}
                >
                  {LEGAL_CONTACT_EMAIL}
                </a>{" "}
                with your account email and purchase date.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">5. Acceptable use</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700 leading-relaxed">
              <p>You agree not to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Copy, resell, redistribute, or commercially exploit our course materials, quizzes, or
                  platform content outside the rights we expressly grant.
                </li>
                <li>
                  Use bots, scrapers, or automated means to access or extract data from the Service without
                  our written permission.
                </li>
                <li>
                  Share, sell, or transfer account credentials; use one login for fleet-wide access where a
                  fleet or multi-seat plan is required; or otherwise circumvent access controls or seat limits.
                </li>
                <li>
                  Reverse engineer, probe, or attack the Service; introduce malware; or interfere with other
                  users.
                </li>
                <li>
                  Use the Service in violation of law, third-party rights, or Google or Stripe acceptable use
                  policies.
                </li>
              </ul>
              <p>
                We may investigate violations and cooperate with law enforcement. Remedies include suspension,
                termination, and legal action.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">6. Intellectual property</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                <strong>Our content:</strong> the Service, including software, design, selection and
                arrangement of materials, original explanations, questions, graphics, videos, and branding, is
                owned by us or our licensors and is protected by copyright, trademark, and other laws. We
                grant you a limited, non-exclusive, non-transferable license to access and use the Service for
                your personal or, if applicable, your organization’s internal learning purposes under these
                Terms—not to republish or compete with the Service.
              </p>
              <p>
                <strong>COLREGS official text:</strong> the regulatory rule text displayed as “Official Text”
                is reproduced from the <strong>U.S. Coast Guard Navigation Rules and Regulations Handbook</strong>{" "}
                (COMDTINST M16672.2D), a <strong>public domain U.S. government</strong> publication. We do not
                copy rule wording from IMO commercial publications. The underlying 1972 Convention regime is
                international; our on-screen regulatory text follows the USCG handbook source noted above.
                We do not claim ownership of the underlying treaty or statutory rule text; we claim ownership
                in our selection, presentation, commentary, quizzes, diagrams we create, and other original
                expression.
              </p>
              <p>
                <strong>Feedback:</strong> if you send suggestions or feedback, you grant us a perpetual,
                royalty-free license to use them without obligation to you.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">7. Disclaimers and limitation of liability</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                <strong>Educational only:</strong> the Service is for education and general reference. It is
                not legal, navigational, or professional maritime advice. Nothing on the Service replaces
                judgment, bridge resource management, compliance with local laws, or training required for
                your license or vessel operation.
              </p>
              <p>
                <strong>COLREGS Academy is an educational platform.</strong> Nothing on this platform
                constitutes professional maritime advice, official certification, or a guarantee of
                regulatory compliance. Assessments, scores, and completion certificates are for educational
                recognition only and are not recognized by the IMO, USCG, MCA, or any maritime authority unless
                we state otherwise in a separate written agreement.{" "}
                <strong>
                  COLREGS Academy is not liable for any accident, loss, injury, or regulatory violation
                  arising from use of or reliance on this platform, including reliance on any certificate,
                  quiz result, or explanation on the Service.
                </strong>
              </p>
              <p>
                <strong>No warranty:</strong> to the maximum extent permitted by law, the Service is provided
                “as is” and “as available” without warranties of any kind, whether express, implied, or
                statutory, including merchantability, fitness for a particular purpose, title, and
                non-infringement. We do not warrant uninterrupted or error-free operation.
              </p>
              <p>
                <strong>Limitation of liability:</strong> to the maximum extent permitted by law, we and our
                suppliers, officers, directors, employees, and affiliates will not be liable for any indirect,
                incidental, special, consequential, exemplary, or punitive damages, or for loss of profits,
                data, goodwill, or other intangible losses, arising from your use of the Service, reliance on
                content, or navigation or safety decisions made in the real world—even if we have been advised
                of the possibility of such damages. Our aggregate liability for any claim arising out of or
                relating to the Service or these Terms is limited to the greater of (a) the amount you paid us
                for the Service in the twelve (12) months before the claim, or (b) fifty U.S. dollars (USD
                $50), except where law forbids such a cap (for example, certain consumer rights).
              </p>
              <p>
                Some jurisdictions do not allow certain limitations; in those cases, our liability is limited
                to the fullest extent permitted by applicable law.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">8. Indemnity</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-700 leading-relaxed">
              <p>
                You will defend, indemnify, and hold harmless COLREGS Academy and its affiliates from any
                claims, damages, losses, or expenses (including reasonable attorneys’ fees) arising from your
                use of the Service, your content, your violation of these Terms, or your violation of
                third-party rights, except to the extent caused by our gross negligence or willful
                misconduct.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">9. Governing law</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                These Terms are governed by the laws of the <strong>State of Delaware, United States</strong>,
                without regard to conflict-of-law rules that would apply another jurisdiction’s laws, except
                that if you are a consumer in the EEA, UK, or another region with mandatory consumer
                protections, those protections may apply to you regardless of this choice of law.
              </p>
              <p>
                If we identify a different corporate entity or place of incorporation in writing (for example,
                on our website or checkout), you agree that entity may be substituted as “COLREGS Academy” for
                contractual purposes where appropriate.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">10. Dispute resolution and arbitration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                <strong>Informal resolution:</strong> before filing a claim, you agree to contact us at{" "}
                <a
                  className="text-primary underline underline-offset-2"
                  href={`mailto:${LEGAL_CONTACT_EMAIL}?subject=Dispute`}
                >
                  {LEGAL_CONTACT_EMAIL}
                </a>{" "}
                and attempt to resolve the dispute for at least thirty (30) days.
              </p>
              <p>
                <strong>Arbitration:</strong> except for claims that qualify for small-claims court or
                injunctive relief for intellectual property misuse, any dispute arising out of or relating to
                these Terms or the Service will be resolved by binding arbitration administered by the{" "}
                <strong>American Arbitration Association</strong> under its Consumer Arbitration Rules (or
                Commercial Rules for business customers), as applicable. The arbitration will be conducted in
                English. The arbitrator’s decision may be entered in any court of competent jurisdiction.
              </p>
              <p>
                <strong>Class action waiver:</strong> you and we agree that disputes will be brought only in an
                individual capacity, not as a plaintiff or class member in any class or representative
                proceeding, to the fullest extent permitted by law. If this waiver is held unenforceable, the
                arbitration provision may not apply; in that case the exclusive jurisdiction and venue below
                governs.
              </p>
              <p>
                <strong>Court venue:</strong> if arbitration does not apply or is opted out where permitted,
                you and we consent to the exclusive jurisdiction and venue of the state and federal courts
                located in <strong>Delaware</strong>, USA, subject to mandatory consumer venue rules where
                applicable.
              </p>
              <p className="text-sm text-gray-600">
                If you are in the EEA, UK, or another region where mandatory arbitration or class waivers are
                unenforceable, the foregoing arbitration and class sections do not apply to the extent
                prohibited, and you may have rights to bring claims in your local courts.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">11. General</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                <strong>Changes:</strong> we may modify these Terms; we will post the updated Terms and update
                the “Last updated” date. For material changes affecting paid users, we will provide notice as
                required by law. Continued use after changes constitutes acceptance where permitted.
              </p>
              <p>
                <strong>Entire agreement:</strong> these Terms and the Privacy Policy are the entire agreement
                between you and us regarding the Service.
              </p>
              <p>
                <strong>Severability:</strong> if any provision is invalid, the remainder remains in effect.
              </p>
              <p>
                <strong>Contact:</strong>{" "}
                <a
                  className="text-primary underline underline-offset-2"
                  href={`mailto:${LEGAL_CONTACT_EMAIL}?subject=Terms%20of%20Service`}
                >
                  {LEGAL_CONTACT_EMAIL}
                </a>
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row flex-wrap gap-3 justify-center">
          <Button asChild>
            <Link href="/">
              <Home className="mr-2" size={16} />
              Back to Home
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/privacy">Privacy Policy</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/faq">FAQ</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
