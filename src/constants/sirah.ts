import type { SirahData } from "@/interfaces/global";
import { readFileSync } from "fs";
import { join, resolve } from "path";

const dirPath = join(resolve("./data"), "sirah");

export const SIRAH_DATAS = JSON.parse(
  readFileSync(join(dirPath, "data.json"), "utf8")
) as SirahData[];
