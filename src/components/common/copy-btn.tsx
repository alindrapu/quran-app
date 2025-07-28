import {
  memo,
  useCallback,
  useState,
  type ComponentProps,
  type MouseEventHandler,
} from "react";
import { Button, type buttonVariants } from "../ui/button";
import type { VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Copy, CopyCheck } from "lucide-react";

export interface CopyBtnProps
  extends ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  textToCopy: string;
}

function CopyBtn({ className, textToCopy, disabled, ...props }: CopyBtnProps) {
  const [copied, setCopied] = useState<boolean>(false);
  const onClickHandler: MouseEventHandler = useCallback(
    async (e) => {
      e.preventDefault();
      if ("clipboard" in navigator) {
        await navigator.clipboard.writeText(textToCopy);
        toast.info("Copied");
        setCopied(true);
      }
    },
    [textToCopy, setCopied]
  );

  return (
    <Button
      {...props}
      className={cn(
        "hover:scale-[98.5%] hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow",
        className,
        copied || !textToCopy || !navigator.clipboard || disabled
          ? "cursor-not-allowed"
          : "cursor-pointer"
      )}
      onClick={onClickHandler}
      disabled={copied || !textToCopy || !navigator.clipboard || disabled}
    >
      {copied ? (
        <>
          <CopyCheck className="w-4 h-4" />
          <span>Copied</span>
        </>
      ) : (
        <>
          <Copy className="w-4 h-4" />
          <span>Copy</span>
        </>
      )}
    </Button>
  );
}

export default memo(CopyBtn);
