import { Share2 } from "lucide-react";
import {
  memo,
  useCallback,
  type MouseEventHandler,
  type ComponentProps,
} from "react";
import { toast } from "sonner";
import { Button, buttonVariants } from "../ui/button";
import type { VariantProps } from "class-variance-authority";

export interface ShareBtnProps
  extends ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  url: string;
  text: string;
  title: string;
}

function ShareBtn({ url, text, title, ...rest }: ShareBtnProps) {
  const shareHandler: MouseEventHandler = useCallback(
    async (e) => {
      e.preventDefault();
      if (navigator.share) {
        try {
          await navigator.share({
            title,
            text,
            url,
          });
        } catch (err) {
          toast.error("Failed to share");
        }
      } else {
        await navigator.clipboard.writeText(`${text}\n\n${url}`);
        toast.success("Copied to clipboard");
      }
    },
    [title, text, url]
  );

  return (
    <Button
      {...rest}
      onClick={shareHandler}
      className="p-2 text-muted-foreground hover:text-foreground transition-colors"
      title="Bagikan hadith"
    >
      <Share2 className="w-4 h-4" />
      <span className="sr-only">Share</span>
    </Button>
  );
}

export default memo(ShareBtn);
