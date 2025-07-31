"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { memo, type ReactNode } from "react";
import { sanitizeString } from "@/lib/sanitize";

export interface MarkDownRendererProps {
  content: string;
}

const Table = memo(({ children }: { children: ReactNode }) => (
  <div className="table-container">
    <table className="table w-full">{children}</table>
  </div>
));
Table.displayName = "Table-Markdown";

function MarkDownRenderer({ content }: MarkDownRendererProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        table: (props: any) => <Table {...props} />,
        p: ({ children, ...props }) => (
          <div
            {...props}
            role="paragraph"
            aria-label="paragraph"
            className="font-sans text-neutral-900 dark:text-neutral-300 antialiased"
          >
            {children}
          </div>
        ),
        h1: (props) => (
          <h1
            className="font-sans text-xl font-medium text-neutral-900 dark:text-neutral-300 antialiased"
            {...props}
          />
        ),
        h2: (props) => (
          <h2
            className="font-sans text-xl font-medium text-neutral-900 dark:text-neutral-300 antialiased"
            {...props}
          />
        ),
        h3: (props) => (
          <h3
            className="pt-4 text-[18px] font-medium leading-snug text-neutral-900 dark:text-neutral-300 antialiased"
            {...props}
          />
        ),
        h4: (props) => (
          <h4
            className="pt-4 text-[18px] font-medium leading-snug text-neutral-900 dark:text-neutral-300 antialiased"
            {...props}
          />
        ),
        h5: (props) => (
          <h5
            className="pt-4 text-[18px] font-medium leading-snug text-neutral-900 dark:text-neutral-300 antialiased"
            {...props}
          />
        ),
        h6: (props) => (
          <h6
            className="pt-4 text-[18px] font-medium leading-snug text-neutral-900 dark:text-neutral-300 antialiased"
            {...props}
          />
        ),
        ul: (props) => (
          <ul
            className="list-disc space-y-3 pb-5 pl-10 font-sans text-neutral-900 dark:text-neutral-300 antialiased"
            {...props}
          />
        ),
        ol: (props) => (
          <ol
            className="list-decimal space-y-3 pb-5 pl-10 font-sans text-neutral-900 dark:text-neutral-300 antialiased"
            {...props}
          />
        ),
        th: (props) => (
          <th className="border px-3 py-1 text-left text-neutral-900 dark:text-neutral-300 antialiased">
            {props.children}
          </th>
        ),
        td: (props) => (
          <td className="border px-3  py-1 text-neutral-900 dark:text-neutral-300 antialiased">
            {props.children}
          </td>
        ),
        a: (props) => (
          <a
            href={props.href ?? "#"}
            className="cursor-pointer text-teal-600 hover:text-teal-400 hover:underline"
            target="_blank"
            {...props}
          >
            {props.children}
          </a>
        ),
      }}
    >
      {sanitizeString(content)}
    </ReactMarkdown>
  );
}

export default memo(MarkDownRenderer);
