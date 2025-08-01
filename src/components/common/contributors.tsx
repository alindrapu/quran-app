import type { Contributor } from "@/interfaces/global";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { memo, useEffect, useState, useTransition } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

function Contributor() {
  const [contributors, setContributors] = useState<
    Pick<Contributor, "avatar_url" | "html_url" | "contributions">[]
  >([]);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      const resp = await fetch(
        "https://api.github.com/repos/LordFeexz/quran-app/contributors"
      );
      if (!resp.ok) return;

      const contributors = (await resp.json()) as Contributor[];
      setContributors(
        contributors.map(({ contributions, html_url, avatar_url }) => ({
          contributions,
          html_url,
          avatar_url,
        }))
      );
    });
  }, []);

  return (
    <Card id="contributors" as="section" className="rounded-lg shadow-lg p-8">
      <CardHeader className="text-center mb-2">
        <CardTitle as="h2" className="text-3xl font-bold text-foreground mb-4">
          Contributor
        </CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center items-center">
        <div
          className={cn(
            "pending justify-center",
            pending ? "items-center" : "flex-wrap gap-4 space-x-4 mx-auto"
          )}
        >
          {pending ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            contributors
              .sort((a, b) => b.contributions - a.contributions)
              .map((contributor) => (
                <a
                  href={contributor.html_url}
                  key={contributor.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-foreground hover:text-emerald-600 transition-colors"
                >
                  <img
                    src={contributor.avatar_url}
                    alt={`contributor avatar`}
                    className="w-8 h-8 rounded-full mx-auto mb-4 border-4 border-white shadow-lg"
                    title="Contributor"
                  />
                </a>
              ))
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-center items-center">
        <div className="flex flex-col justify-center items-center space-y-2">
          <span className="text-foreground">
            {contributors.length} kontributor
          </span>
          <a
            href="https://github.com/LordFeexz/quran-app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground hover:text-emerald-600 transition-colors"
          >
            Ikut berkontribusi?
          </a>
        </div>
      </CardFooter>
    </Card>
  );
}

export default memo(Contributor);
