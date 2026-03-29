import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CERTIFICATE_FACE_LEGAL_NOTICE } from "@/lib/certificate-disclaimer";

type Props = {
  scorePercent: number;
  dateFormatted: string;
  totalQuestions: number;
  correctAnswers: number;
  timeFormatted: string;
};

/**
 * On-screen “face” of the certificate shown after a passing assessment.
 * Mirrors the downloadable .txt certificate including the legal notice.
 */
export default function CertificatePreview({ scorePercent, dateFormatted, totalQuestions, correctAnswers, timeFormatted }: Props) {
  return (
    <Card className="border-2 border-gray-800 bg-gradient-to-b from-amber-50/80 to-white shadow-md">
      <CardHeader className="text-center border-b border-amber-200/80 pb-4">
        <CardTitle className="text-lg sm:text-xl font-serif tracking-wide text-gray-900">
          COLREGS Academy
        </CardTitle>
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">Certificate of completion</p>
      </CardHeader>
      <CardContent className="space-y-4 pt-6">
        <p className="text-center text-sm text-gray-800 leading-relaxed">
          This certifies that the holder successfully completed the International Regulations for Preventing
          Collisions at Sea assessment on this platform with a score of{" "}
          <strong>{scorePercent.toFixed(1)}%</strong>.
        </p>
        <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm text-gray-700 border border-gray-200 rounded-md p-3 bg-white/80">
          <div>
            <span className="text-gray-500">Date</span>
            <p className="font-medium">{dateFormatted}</p>
          </div>
          <div>
            <span className="text-gray-500">Time taken</span>
            <p className="font-medium">{timeFormatted}</p>
          </div>
          <div>
            <span className="text-gray-500">Questions</span>
            <p className="font-medium">{totalQuestions}</p>
          </div>
          <div>
            <span className="text-gray-500">Correct answers</span>
            <p className="font-medium">
              {correctAnswers}/{totalQuestions}
            </p>
          </div>
        </div>
        <div className="rounded-md border-2 border-gray-800 bg-white p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-gray-900 mb-2">Legal notice</p>
          <p className="text-xs sm:text-sm text-gray-900 leading-relaxed font-medium">{CERTIFICATE_FACE_LEGAL_NOTICE}</p>
        </div>
        <p className="text-center text-xs text-gray-500">COLREGS Academy — Maritime Safety Education</p>
      </CardContent>
    </Card>
  );
}
