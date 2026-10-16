"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { COOKIE_CONSENT_EVENT, hasCookieConsent } from "@/lib/cookie-consent";

const COUNTER_ID = 54410362;
const isPublishedTarget =
  process.env.NEXT_PUBLIC_SITE_TARGET === "github-pages" ||
  process.env.NEXT_PUBLIC_SITE_TARGET === "production";

function isAnalyticsHost() {
  if (process.env.NEXT_PUBLIC_SITE_TARGET === "github-pages") return true;
  if (typeof window === "undefined") return false;
  return window.location.hostname === "www.7barbershop.ru";
}

declare global {
  interface Window {
    ym?: (...args: unknown[]) => void;
  }
}

export default function YandexMetrika() {
  const pathname = usePathname();
  const [hasConsent, setHasConsent] = useState(false);
  const hasMountedRef = useRef(false);

  useEffect(() => {
    if (!isPublishedTarget || !isAnalyticsHost()) return;

    const updateConsent = () => setHasConsent(hasCookieConsent());
    updateConsent();
    window.addEventListener(COOKIE_CONSENT_EVENT, updateConsent);
    return () => window.removeEventListener(COOKIE_CONSENT_EVENT, updateConsent);
  }, []);

  useEffect(() => {
    if (!isPublishedTarget || !isAnalyticsHost() || !hasConsent) return;
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }

    window.ym?.(COUNTER_ID, "hit", window.location.href);
  }, [hasConsent, pathname]);

  if (!isPublishedTarget || !isAnalyticsHost() || !hasConsent) return null;

  return (
    <>
      <Script
        id="yandex-metrika"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(m,e,t,r,i,k,a){
              m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r)return;}
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
            })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
            ym(${COUNTER_ID}, "init", {
              clickmap: true,
              trackLinks: true,
              accurateTrackBounce: true,
              webvisor: true
            });
          `,
        }}
      />
      <noscript>
        <div>
          <img
            src={`https://mc.yandex.ru/watch/${COUNTER_ID}`}
            style={{ position: "absolute", left: "-9999px" }}
            alt=""
          />
        </div>
      </noscript>
    </>
  );
}
