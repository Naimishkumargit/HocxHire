"use client";

import Script from "next/script";

export default function AdSenseBanner() {
  return (
    <div className="my-8 mx-auto max-w-4xl px-4 text-center">
      <p className="mb-3 text-sm text-gray-600">Sponsored (relevant, non-intrusive)</p>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-7459577613172218"
        data-ad-slot="YOUR_AD_SLOT_ID"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
      <Script id="adsense-init" strategy="afterInteractive">
        {"(adsbygoogle = window.adsbygoogle || []).push({});"}
      </Script>
    </div>
  );
}
