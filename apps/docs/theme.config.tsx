import React from "react";
import { DocsThemeConfig } from "nextra-theme-docs";

const config: DocsThemeConfig = {
  logo: (
    <svg
      width="32"
      height="32"
      viewBox="0 0 199 199"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M47.2931 16.5C48.7221 14.0248 51.3632 12.5 54.2213 12.5L144.984 12.5C147.842 12.5 150.483 14.0248 151.912 16.5L197.293 95.1025C198.722 97.5777 198.722 100.627 197.293 103.103L151.912 181.705C150.483 184.18 147.842 185.705 144.984 185.705H54.2213C51.3632 185.705 48.7221 184.18 47.2931 181.705L1.91189 103.103C0.482823 100.627 0.482821 97.5777 1.91188 95.1025L47.2931 16.5Z"
        fill="#1C75BC"
      />
      <path
        d="M77.1783 30.3551C79.1993 28.3341 82.145 27.5448 84.9057 28.2845L148.427 45.3051C151.188 46.0448 153.345 48.2012 154.084 50.9619L171.105 114.483C171.845 117.244 171.055 120.189 169.034 122.21L122.533 168.711C120.512 170.732 117.567 171.522 114.806 170.782L51.2841 153.761C48.5234 153.022 46.367 150.865 45.6273 148.105L28.6067 84.5835C27.867 81.8228 28.6563 78.8771 30.6773 76.8561L77.1783 30.3551Z"
        fill="white"
      />
      <path
        d="M137.301 71.0356L104 51.8091C101.525 50.38 98.4752 50.38 95.9999 51.8091L60.6987 72.1903C58.2235 73.6194 56.6987 76.2604 56.6987 79.1185V119.881C56.6987 122.739 58.2235 125.38 60.6987 126.809L95.9999 147.191C98.4751 148.62 101.525 148.62 104 147.191L137.301 127.964C139.968 126.424 139.968 122.576 137.301 121.036L125.651 114.309C123.175 112.88 120.126 112.88 117.651 114.309L103 122.768C101.144 123.84 98.8563 123.84 96.9999 122.768L81.3493 113.732C79.4929 112.66 78.3493 110.679 78.3493 108.536V90.4638C78.3493 88.3202 79.4929 86.3394 81.3493 85.2677L96.9999 76.2318C98.8563 75.16 101.144 75.16 103 76.2318L117.651 84.6903C120.126 86.1194 123.175 86.1194 125.651 84.6903L137.301 77.9638C139.968 76.4242 139.968 72.5752 137.301 71.0356Z"
        fill="#00AEEF"
      />
    </svg>
  ),
  project: {
    link: "https://github.com/cyberuci/cyberuci",
  },
  chat: {
    link: "https://discord.gg/Bt5dWnArAW",
  },
  docsRepositoryBase:
    "https://github.com/cyberuci/cyberuci/tree/main/apps/docs",
  useNextSeoProps() {
    return {
      titleTemplate: "%s – Cyber @ UCI",
    };
  },
  head: (
    <>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
    </>
  ),
  // cyberblue/4
  primaryHue: {
    dark: 214,
    light: 209,
  },
  footer: {
    text: "Cyber @ UCI Docs",
  },
};

export default config;
