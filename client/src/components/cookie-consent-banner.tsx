import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { isLikelyEuEeaOrUkVisitor } from "@/lib/eu-privacy-region";

const STORAGE_KEY = "colregs_cookie_notice_v1";

/**
 * Shown to visitors likely in the EU/EEA/UK/CH area (heuristic).
 * Strictly necessary session cookies do not require consent under ePrivacy; this is transparency
 * and a hook for future optional cookies (analytics), which will require opt-in here before loading.
 */
export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY)) return;
      if (!isLikelyEuEeaOrUkVisitor()) return;
      setVisible(true);
    } catch {
      setVisible(false);
    }
  }, []);

  const acknowledge = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "acknowledged");
    } catch {
      /* ignore quota / private mode */
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[100] border-t border-gray-200 bg-white/95 backdrop-blur shadow-[0_-4px_24px_rgba(0,0,0,0.08)]"
      role="dialog"
      aria-label="Cookie notice"
    >
      <div className="max-w-5xl mx-auto px-4 py-4 sm:py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="text-sm text-gray-700 leading-relaxed flex-1">
          <p className="font-medium text-gray-900 mb-1">Cookies</p>
          <p>
            We use a strictly necessary <strong>session</strong> cookie (HTTP-only) to keep you signed in
            after authentication. It expires after <strong>seven (7) days</strong>. Under the GDPR and
            ePrivacy Directive, this type of cookie does not require consent. We do{" "}
            <strong>not</strong> use analytics or advertising cookies on this site today. If we add optional
            cookies (for example Google Analytics), we will ask for your consent before they load in this
            region.
          </p>
          <p className="mt-2">
            <Link href="/privacy" className="text-primary underline underline-offset-2 hover:text-primary/80">
              Privacy Policy
            </Link>
          </p>
        </div>
        <div className="flex flex-shrink-0 gap-2 sm:flex-col sm:min-w-[140px]">
          <Button onClick={acknowledge} className="w-full sm:w-auto">
            OK
          </Button>
        </div>
      </div>
    </div>
  );
}
