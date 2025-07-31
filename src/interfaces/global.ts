export interface PreviewQuranData {
  number: string;
  name: string;
  name_latin: string;
  number_of_ayah: string;
}

export interface QuranData extends PreviewQuranData {
  text: Record<string, string>;
  translations: {
    id: Record<string, string>;
    en: Record<string, string>;
  };
  tafsir: {
    id: {
      kemenag: {
        name: string;
        source: string;
        text: Record<string, string>;
      };
    };
  };
}

export interface HadithData {
  number: number;
  arab: string;
  id: string;
}

export interface Metadata extends Record<string, string> {
  tag: "meta" | "link" | string;
}

export interface SirahData {
  title: string;
  description: string;
  sirah: string;
  year: string;
  page: number;
}
