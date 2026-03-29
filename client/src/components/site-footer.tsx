import { Link } from "wouter";
import { RULE_TEXT_ATTRIBUTION, RULE_TEXT_HANDBOOK_REF } from "@/lib/rule-text-source";

export default function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-4xl mb-6">
          {RULE_TEXT_ATTRIBUTION}{" "}
          <span className="text-gray-500">({RULE_TEXT_HANDBOOK_REF})</span>
        </p>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <Link href="/faq" className="text-primary hover:text-primary/80">
            FAQ
          </Link>
          <Link href="/privacy" className="text-primary hover:text-primary/80">
            Privacy
          </Link>
          <Link href="/terms" className="text-primary hover:text-primary/80">
            Terms
          </Link>
        </div>
        <p className="mt-6 text-xs text-gray-500">
          Educational platform only. Not a substitute for official training or local regulatory requirements.
        </p>
      </div>
    </footer>
  );
}
