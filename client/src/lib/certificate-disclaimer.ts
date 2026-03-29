/**
 * Required on-certificate language for downloads and on-screen certificate preview.
 * Must match user-facing certificate “face” (not FAQ-only).
 */
export const CERTIFICATE_FACE_LEGAL_NOTICE =
  "This certificate is issued for educational purposes only. It does not constitute official certification, does not satisfy any statutory or flag state requirement, and is not recognized by the IMO, USCG, MCA, or any maritime authority.";

export function buildCertificateDownloadText(params: {
  score: number;
  dateFormatted: string;
  totalQuestions: number;
  correctAnswers: number;
  timeFormatted: string;
}): string {
  const { score, dateFormatted, totalQuestions, correctAnswers, timeFormatted } = params;
  return `
COLREGS ACADEMY — CERTIFICATE OF COMPLETION

This certifies that the holder successfully completed the
International Regulations for Preventing Collisions at Sea
assessment on this platform with a score of ${score.toFixed(1)}%.

Date: ${dateFormatted}
Questions: ${totalQuestions}
Correct answers: ${correctAnswers}
Time taken: ${timeFormatted}

────────────────────────────────────────────────────────────────
LEGAL NOTICE (required — appears on all certificates)
────────────────────────────────────────────────────────────────

${CERTIFICATE_FACE_LEGAL_NOTICE}

COLREGS Academy — Maritime Safety Education
`.trim();
}
