import type { QuranData } from "@/interfaces/global";
import { readdirSync, readFileSync } from "fs";
import { join, extname, resolve } from "path";

const dirPath = join(resolve("./data"), "surah");

export const ALQURAN_DATAS: QuranData[] = readdirSync(dirPath)
  .filter((file) => extname(file) === ".json")
  .map((file) => {
    const content = readFileSync(join(dirPath, file), "utf8");
    const data = JSON.parse(content);

    return data[Object.keys(data)[0]] as QuranData;
  })
  .sort((a, b) => Number(a.number) - Number(b.number));
