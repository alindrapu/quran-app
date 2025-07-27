import { useState } from "react";
import { Copy, Share2 } from "lucide-react";
import type { HadithData } from "@/interfaces/global";

interface HadithCardProps {
  data: HadithData;
  name: string;
}

export default function HadithCard({ data, name }: HadithCardProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    const text = `${data.arab}\n\n${data.id}\n\n- ${name} #${data.number}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const shareHadith = async () => {
    const text = `${data.id}\n\n- ${name} #${data.number}`;
    const url = `${window.location.origin}/hadith/${name}#${data.number}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `Hadith ${name} #${data.number}`,
          text,
          url,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      await navigator.clipboard.writeText(`${text}\n\n${url}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <article
      className="bg-card border border-border rounded-lg p-6 space-y-4 my-6"
      id={`hadist ${data.number}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <h3 className="text-lg font-semibold text-foreground">
              {name} #{data.number}
            </h3>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={copyToClipboard}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
            title={copied ? "Disalin!" : "Salin hadith"}
          >
            <Copy className="w-4 h-4" />
          </button>
          <button
            onClick={shareHadith}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
            title="Bagikan hadith"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-4">
        {/* Arabic Text */}
        <div className="text-right" dir="rtl">
          <p className="text-lg leading-loose font-arabic text-foreground">
            {data.arab}
          </p>
        </div>

        {/* Translation */}
        <div className="border-t border-border pt-4">
          <p className="text-muted-foreground leading-relaxed">{data.id}</p>
        </div>
      </div>
    </article>
  );
}
