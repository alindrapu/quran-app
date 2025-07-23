import type { HadithData } from "@/interfaces/global";
import { readdirSync, readFileSync } from "fs";
import { join, extname, resolve, basename } from "path";

const dirPath = join(resolve("./data"), "books");

export const HADITH_DATAS = readdirSync(dirPath)
  .filter((file) => extname(file) === ".json")
  .reduce(
    (acc, file) => {
      const content = readFileSync(join(dirPath, file), "utf8");
      const data = JSON.parse(content) as HadithData[];

      const fileNameWithoutExt = basename(file, ".json");
      acc[fileNameWithoutExt] = data;

      return acc;
    },
    {} as Record<string, HadithData[]>
  );
