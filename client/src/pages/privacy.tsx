import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Ship, Home, Shield } from "lucide-react";
import { Link } from "wouter";

/** Replace with your production support inbox before going live (Stripe, OAuth, GDPR). */
const PRIVACY_CONTACT_EMAIL = "privacy@colregs-academy.app";

const EFFECTIVE_DATE = "March 28, 2026";
const LAST_UPDATED = "March 29, 2026";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Privacy Policy | COLREGS Academy</title>
        <meta
          name="description"
          content="Privacy Policy for COLREGS Academy: what we collect, how we use it, cookies, retention, your rights, and how to contact us."
        />
        <link rel="canonical" href="https://colregs-academy.replit.app/privacy" />
        <meta property="og:title" content="Privacy Policy | COLREGS Academy" />
        <meta
          property="og:description"
          content="How COLREGS Academy collects, uses, and protects your personal data."
        />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://colregs-academy.replit.app/privacy" />
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
            <span className="text-gray-500">Privacy Policy</span>
          </div>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="text-primary" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
          <p className="text-sm text-gray-600">
            <span className="font-medium text-gray-800">Effective date:</span> {EFFECTIVE_DATE}
            {" · "}
            <span className="font-medium text-gray-800">Last updated:</span> {LAST_UPDATED}
          </p>
        </div>

        <p className="text-gray-700 leading-relaxed mb-8">
          COLREGS Academy (“we”, “us”) operates this website and learning platform. This Privacy Policy
          explains what personal data we collect, why we use it, who we share it with, how long we keep it,
          your rights (including under the EU/UK GDPR), and how we use cookies. Use of the Service is also
          governed by our{" "}
          <Link href="/terms" className="text-primary underline underline-offset-2 hover:text-primary/80">
            Terms of Service
          </Link>
          . If you do not agree with this policy, please do not use the service or sign in.
        </p>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">1. What data we collect</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700 leading-relaxed">
              <p>Depending on how you use the platform, we may process:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Account and profile (Google sign-in):</strong> when you authenticate with Google
                  OAuth, we receive and store your name, email address, and profile picture URL provided by
                  Google.
                </li>
                <li>
                  <strong>Learning and progress:</strong> rule completion status, quiz progress, scores, and
                  related activity tied to your user account.
                </li>
                <li>
                  <strong>Assessments:</strong> assessment results, including scores and timestamps when you
                  complete assessments.
                </li>
                <li>
                  <strong>Session data:</strong> technical identifiers associated with your logged-in session
                  (see Cookies below).
                </li>
              </ul>
              <p>
                If you use the app without signing in, limited data may be stored locally in your browser;
                signed-in use stores progress in our databases as described here.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">2. How we use your data</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700 leading-relaxed">
              <p>We use this information to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Personalize your experience</strong> (for example, showing your name or avatar
                  where the product displays them).
                </li>
                <li>
                  <strong>Operate accounts and authentication</strong>, including maintaining secure sessions
                  after you sign in with Google.
                </li>
                <li>
                  <strong>Track learning progress</strong> across rules and quizzes so you can resume where
                  you left off.
                </li>
                <li>
                  <strong>Record assessment performance</strong>, including results and completion times, for
                  your history and (where applicable) certificates or analytics shown to you.
                </li>
                <li>
                  <strong>Maintain security and integrity</strong> of the service (for example, fraud
                  prevention and troubleshooting).
                </li>
              </ul>
              <p>
                <strong>Legal basis for processing:</strong> We process your personal data on the basis of
                contract performance (Art. 6(1)(b) GDPR) to provide the Service, and legitimate interests
                (Art. 6(1)(f)) for security and abuse prevention.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">3. Who we share data with</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700 leading-relaxed">
              <p>We share personal data only as needed to run the product:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Google (OAuth):</strong> when you choose “Sign in with Google”, Google processes
                  your login according to Google’s terms and privacy policy. We receive the profile data
                  described above from Google to create and maintain your account.
                </li>
                <li>
                  <strong>Stripe:</strong> when paid plans or “Pro” features launch, payments will be processed
                  by Stripe, Inc. Stripe will receive the data required to complete transactions (for example,
                  billing details and payment method information you provide at checkout). Stripe’s use of that
                  data is governed by Stripe’s privacy policy and terms. We do not sell your personal data.
                </li>
                <li>
                  <strong>Hosting and infrastructure:</strong> our application and database may be operated by
                  cloud or hosting providers who process data on our instructions to deliver the service.
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">4. Retention</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                <strong>Session cookie:</strong> when you log in, we set a session cookie so you stay
                authenticated. The session is configured with a maximum lifetime of{" "}
                <strong>seven (7) days</strong> from last activity (aligned with our server-side session
                settings). You can end the session earlier by signing out or clearing cookies in your browser.
              </p>
              <p>
                <strong>Account and learning records:</strong> we retain profile, progress, and assessment data
                for as long as your account is active and as needed to provide the service, comply with law,
                resolve disputes, and enforce our agreements. If you ask us to delete your account, we will
                delete or anonymize personal data as described under “Your rights”, subject to legal retention
                obligations.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">5. Your rights (including GDPR Articles 15–17)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Depending on where you live, you may have rights over your personal data. For users in the
                European Economic Area, UK, and similar jurisdictions, these include:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Right of access (Article 15):</strong> you may request a copy of the personal data we
                  hold about you.
                </li>
                <li>
                  <strong>Right to rectification (Article 16):</strong> you may ask us to correct inaccurate
                  data or complete incomplete data.
                </li>
                <li>
                  <strong>Right to erasure (“right to be forgotten”) (Article 17):</strong> you may ask us to
                  delete your personal data where applicable law allows.
                </li>
              </ul>
              <p>
                You may also have rights to restrict processing, data portability, object to certain
                processing, and to lodge a complaint with a supervisory authority. To exercise these rights,
                contact us using the email below. We will respond within a reasonable time and may need to
                verify your identity before fulfilling certain requests.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">6. Cookies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                We use only cookies that are <strong>strictly necessary</strong> to operate the service today.
                Under the EU ePrivacy Directive and GDPR, strictly necessary cookies (for example authentication)
                do <strong>not</strong> require prior consent; we still disclose them here for transparency.
                We do <strong>not</strong> use analytics or advertising cookies on this site at present. If we
                add optional cookies later, we will request your consent where required (for example before
                loading non-essential trackers for visitors in the EU/EEA, UK, and similar jurisdictions).
              </p>
              <div className="overflow-x-auto rounded-md border border-gray-200">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-3 py-2 font-semibold text-gray-900">Cookie name</th>
                      <th className="px-3 py-2 font-semibold text-gray-900">Purpose</th>
                      <th className="px-3 py-2 font-semibold text-gray-900">Duration (TTL)</th>
                      <th className="px-3 py-2 font-semibold text-gray-900">Type</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr>
                      <td className="px-3 py-2 font-mono text-xs sm:text-sm">session</td>
                      <td className="px-3 py-2">
                        Maintains your signed-in session after authentication (server-side session identifier;
                        HTTP-only, not accessible to page scripts).
                      </td>
                      <td className="px-3 py-2">7 days</td>
                      <td className="px-3 py-2">
                        Strictly necessary — <strong>no consent required</strong> (authentication)
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>
                The table lists cookies we set on this domain. We classify them as strictly necessary and
                not requiring consent here because we do not use analytics, advertising, or other
                non-essential trackers on this site. Google&apos;s OAuth flow may set cookies on
                Google&apos;s domains as part of authentication. These are governed by Google&apos;s privacy
                policy. We do not set additional tracking or analytics cookies.
              </p>
              <p>
                You can control or delete cookies through your browser settings. Blocking or deleting the
                session cookie will usually sign you out and may prevent login from working until you allow
                cookies for this site again.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">
                7. Data controller, EU/UK representative, and DPO
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                <strong>Controller:</strong> COLREGS Academy is operated from the United States. Our Terms of
                Service are governed by the laws of the State of Delaware, USA. For privacy and data rights
                requests, use the contact email in section 8 below.
              </p>
              <p>
                <strong>Data Protection Officer (DPO):</strong> We have not designated a Data Protection
                Officer. Under the GDPR, a DPO is required only in specific cases (for example certain
                large-scale monitoring or processing of special categories of data on a large scale); our
                processing does not currently require a DPO.
              </p>
              <p>
                <strong>EU and UK representative (Article 27 GDPR / UK GDPR):</strong> We have{" "}
                <strong>not</strong> appointed a representative in the European Union or the United Kingdom.
                The Service is offered in English and is accessible worldwide; we do{" "}
                <strong>not</strong> specifically target or market to people in the European Economic Area,
                Switzerland, or the United Kingdom. EU or UK residents who choose to use the Service may
                contact us at the email in section 8 and may lodge a complaint with their local supervisory
                authority. If we appoint an EU or UK representative where required by law or voluntarily, we
                will list their name and contact details in this section.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">8. Contact for privacy and data requests</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                For privacy questions, data access, correction, deletion requests, or other concerns about
                this policy, email us at:
              </p>
              <p>
                <a
                  className="text-primary font-medium underline underline-offset-2 hover:text-primary/80"
                  href={`mailto:${PRIVACY_CONTACT_EMAIL}?subject=Privacy%20request`}
                >
                  {PRIVACY_CONTACT_EMAIL}
                </a>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">9. Changes</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-700 leading-relaxed">
              <p>
                We may update this Privacy Policy from time to time. The “Last updated” date at the top will
                change when we do. Continued use of the service after changes means you accept the updated
                policy, unless applicable law requires a different process.
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
            <Link href="/terms">Terms of Service</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/faq">FAQ</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
