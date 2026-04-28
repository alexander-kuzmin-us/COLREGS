import { Card, CardContent } from "@/components/ui/card";
import { RULE_TEXT_ATTRIBUTION } from "@/lib/rule-text-source";

interface RuleTextDisplayProps {
  title: string;
  text: string;
  isOfficial?: boolean;
}

export default function RuleTextDisplay({ title, text, isOfficial = false }: RuleTextDisplayProps) {
  // Function to format text with proper subpart styling
  const formatRuleText = (text: string) => {
    // Split by double newlines to preserve paragraph structure
    const paragraphs = text.split('\n\n');
    
    return paragraphs.map((paragraph, index) => {
      // Check if paragraph starts with a subpart letter
      const subpartMatch = paragraph.match(/^\(([a-z])\)\s*([\s\S]*)/);
      
      if (subpartMatch) {
        const [, letter, content] = subpartMatch;
        return (
          <div key={index} className="mb-4">
            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <span className="inline-flex items-center justify-center w-7 h-7 bg-primary/10 text-primary rounded-full text-sm font-semibold">
                  {letter}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <p className={`text-sm leading-relaxed ${
                  isOfficial ? 'text-gray-700' : 'text-gray-600'
                }`}>
                  {content.trim()}
                </p>
              </div>
            </div>
          </div>
        );
      } else {
        // Regular paragraph without subpart
        return (
          <p key={index} className={`mb-4 text-sm leading-relaxed ${
            isOfficial ? 'text-gray-700' : 'text-gray-600'
          }`}>
            {paragraph.trim()}
          </p>
        );
      }
    });
  };

  return (
    <Card className={isOfficial ? 'border-l-4 border-l-primary bg-blue-50/50' : ''}>
      <CardContent className="p-4 sm:p-6">
        <h3 className={`font-semibold mb-4 ${
          isOfficial ? 'text-primary text-base' : 'text-gray-900 text-sm'
        }`}>
          {title}
        </h3>
        <div className="space-y-2">
          {formatRuleText(text)}
        </div>
        {isOfficial && (
          <p className="mt-4 pt-4 border-t border-blue-100 text-xs text-gray-600 leading-relaxed">
            {RULE_TEXT_ATTRIBUTION}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
