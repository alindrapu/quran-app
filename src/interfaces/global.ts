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

export interface Contributor {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  user_view_type: string;
  site_admin: boolean;
  contributions: number;
}
