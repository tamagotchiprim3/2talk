import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" className="w-full h-full">
      <Head className="w-full h-full" />
      <body className="bg-teal-950 overflow-hidden">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

