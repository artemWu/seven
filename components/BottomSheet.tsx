"use client";

import { ReactNode, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

type BottomSheetProps = {
  title: string;
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  hideTitle?: boolean;
};

type Gesture = {
  startY: number;
  startX: number;
  lastY: number;
  lastTime: number;
  velocity: number;
  offset: number;
  axis: "pending" | "vertical" | "horizontal";
};

const CLOSE_DISTANCE = 112;
const VELOCITY_CLOSE_DISTANCE = 42;
const CLOSE_VELOCITY = 0.65;
const CLOSE_DURATION = 260;

type DocumentScrollStyles = {
  bodyPosition: string;
  bodyTop: string;
  bodyLeft: string;
  bodyRight: string;
  bodyWidth: string;
  bodyOverflow: string;
  htmlOverflow: string;
  htmlOverscroll: string;
  htmlScrollBehavior: string;
};

let activeScrollLocks = 0;
let lockedScrollY = 0;
let previousDocumentScrollStyles: DocumentScrollStyles | null = null;
let ctaRestoreFrame = 0;

function clearCtaRestoreLock() {
  if (ctaRestoreFrame) window.cancelAnimationFrame(ctaRestoreFrame);
  ctaRestoreFrame = 0;
  delete document.body.dataset.bottomSheetRestoring;
}

function lockDocumentScroll() {
  const body = document.body;
  const html = document.documentElement;

  if (activeScrollLocks === 0) {
    clearCtaRestoreLock();
    lockedScrollY = window.scrollY;
    previousDocumentScrollStyles = {
      bodyPosition: body.style.position,
      bodyTop: body.style.top,
      bodyLeft: body.style.left,
      bodyRight: body.style.right,
      bodyWidth: body.style.width,
      bodyOverflow: body.style.overflow,
      htmlOverflow: html.style.overflow,
      htmlOverscroll: html.style.overscrollBehavior,
      htmlScrollBehavior: html.style.scrollBehavior,
    };

    body.style.position = "fixed";
    body.style.top = `-${lockedScrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    body.style.overflow = "hidden";
    body.dataset.bottomSheetOpen = "true";
    html.style.overflow = "hidden";
    html.style.overscrollBehavior = "none";
  }

  activeScrollLocks += 1;
  return () => {
    activeScrollLocks = Math.max(0, activeScrollLocks - 1);
    if (activeScrollLocks !== 0 || !previousDocumentScrollStyles) return;

    const previous = previousDocumentScrollStyles;
    previousDocumentScrollStyles = null;
    body.style.position = previous.bodyPosition;
    body.style.top = previous.bodyTop;
    body.style.left = previous.bodyLeft;
    body.style.right = previous.bodyRight;
    body.style.width = previous.bodyWidth;
    body.style.overflow = previous.bodyOverflow;
    delete body.dataset.bottomSheetOpen;
    html.style.overflow = previous.htmlOverflow;
    html.style.overscrollBehavior = previous.htmlOverscroll;
    html.style.scrollBehavior = "auto";
    window.scrollTo(0, lockedScrollY);
    html.style.scrollBehavior = previous.htmlScrollBehavior;
    body.dataset.bottomSheetRestoring = "true";
    ctaRestoreFrame = window.requestAnimationFrame(() => {
      ctaRestoreFrame = window.requestAnimationFrame(() => {
        ctaRestoreFrame = 0;
        if (activeScrollLocks === 0) delete body.dataset.bottomSheetRestoring;
      });
    });
  };
}

export default function BottomSheet({ title, open, onClose, children, hideTitle = false }: BottomSheetProps) {
  const [mounted, setMounted] = useState(open);
  const sheetRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLButtonElement>(null);
  const gestureRef = useRef<Gesture | null>(null);
  const settleTimeoutRef = useRef<number | null>(null);
  const closingRef = useRef(false);
  const swipeClosingRef = useRef(false);
  const onCloseRef = useRef(onClose);

  useLayoutEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useLayoutEffect(() => {
    if (open) {
      closingRef.current = false;
      swipeClosingRef.current = false;
      if (settleTimeoutRef.current !== null) window.clearTimeout(settleTimeoutRef.current);
      settleTimeoutRef.current = null;
      // Keep the portal mounted through opening and exit animations.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMounted(true);
      gestureRef.current = null;
      if (sheetRef.current) {
        sheetRef.current.classList.remove("bottom-sheet--gesture-enabled");
        sheetRef.current.style.animation = "";
        sheetRef.current.style.transition = "";
        sheetRef.current.style.transform = "";
        sheetRef.current.style.opacity = "";
      }
      if (backdropRef.current) {
        backdropRef.current.style.transition = "";
        backdropRef.current.style.opacity = "";
      }
      sheetRef.current?.querySelector(".bottom-sheet__content")?.classList.remove("bottom-sheet__content--scrolled");
      return;
    }
    if (!mounted) return;

    closingRef.current = true;
    if (settleTimeoutRef.current !== null) window.clearTimeout(settleTimeoutRef.current);
    settleTimeoutRef.current = null;
    const sheet = sheetRef.current;
    const backdrop = backdropRef.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const closeDuration = reducedMotion ? 1 : CLOSE_DURATION;
    const mobile = window.matchMedia("(max-width: 899px)").matches;

    if (mobile && swipeClosingRef.current) {
      const timeout = window.setTimeout(() => {
        setMounted(false);
        closingRef.current = false;
        swipeClosingRef.current = false;
        gestureRef.current = null;
      }, closeDuration + 24);
      return () => window.clearTimeout(timeout);
    }

    if (mobile) {
      if (sheet) {
        sheet.style.animation = "none";
        sheet.style.transition = "none";
      }
      if (backdrop) backdrop.style.transition = "none";
      const frame = window.requestAnimationFrame(() => {
        if (sheet) {
          sheet.style.transition = `transform ${closeDuration}ms cubic-bezier(.22, 1, .36, 1), opacity ${closeDuration}ms ease`;
          sheet.style.transform = "translate3d(0, 100%, 0)";
          sheet.style.opacity = "0";
        }
        if (backdrop) {
          backdrop.style.transition = `opacity ${closeDuration}ms cubic-bezier(.22, 1, .36, 1)`;
          backdrop.style.opacity = "0";
        }
      });
      const timeout = window.setTimeout(() => {
        setMounted(false);
        closingRef.current = false;
        gestureRef.current = null;
      }, closeDuration + 24);
      return () => {
        window.cancelAnimationFrame(frame);
        window.clearTimeout(timeout);
      };
    }

    const timeout = window.setTimeout(() => {
      setMounted(false);
      closingRef.current = false;
    }, CLOSE_DURATION + 24);
    return () => window.clearTimeout(timeout);
  }, [open, mounted]);

  // Freeze the document at its current scroll position. Fixed body positioning
  // avoids the background moving under the sheet in iOS Safari.
  useLayoutEffect(() => {
    if (!mounted) return;
    return lockDocumentScroll();
  }, [mounted]);

  useLayoutEffect(() => {
    if (!mounted) return;
    const content = sheetRef.current?.querySelector<HTMLElement>(".bottom-sheet__content");
    if (!content) return;

    const updateOverflowState = () => {
      content.classList.toggle("bottom-sheet__content--overflowing", content.scrollHeight > content.clientHeight + 1);
    };
    updateOverflowState();
    const observer = new ResizeObserver(updateOverflowState);
    observer.observe(content);
    if (content.firstElementChild) observer.observe(content.firstElementChild);
    window.addEventListener("resize", updateOverflowState);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateOverflowState);
      content.classList.remove("bottom-sheet__content--overflowing");
    };
  }, [mounted, children]);

  // Non-passive listeners are installed only while the sheet exists. We wait
  // for the gesture direction before preventing native scrolling.
  useEffect(() => {
    if (!mounted) return;
    const sheet = sheetRef.current;
    if (!sheet) return;

    const onTouchStart = (event: TouchEvent) => {
      if (closingRef.current || !window.matchMedia("(max-width: 899px)").matches || event.touches.length !== 1) return;
      if (settleTimeoutRef.current !== null) window.clearTimeout(settleTimeoutRef.current);
      settleTimeoutRef.current = null;
      const touch = event.touches[0];
      const target = event.target;
      if (!touch || !(target instanceof Element)) return;

      const handle = target.closest(".bottom-sheet__topbar");
      const content = target.closest(".bottom-sheet__content");
      if (handle) {
        gestureRef.current = { startY: touch.clientY, startX: touch.clientX, lastY: touch.clientY, lastTime: performance.now(), velocity: 0, offset: 0, axis: "pending" };
        return;
      }
      if (!content || content.scrollTop > 0 || target.closest("button, a, input, textarea, select, [role='button']")) {
        gestureRef.current = null;
        return;
      }
      gestureRef.current = { startY: touch.clientY, startX: touch.clientX, lastY: touch.clientY, lastTime: performance.now(), velocity: 0, offset: 0, axis: "pending" };
    };

    const onTouchMove = (event: TouchEvent) => {
      const gesture = gestureRef.current;
      const touch = event.touches[0];
      if (!gesture || !touch || closingRef.current) return;
      const deltaY = touch.clientY - gesture.startY;
      const deltaX = Math.abs(touch.clientX - gesture.startX);
      if (gesture.axis === "pending") {
        if (Math.max(Math.abs(deltaY), deltaX) < 5) return;
        if (deltaX > Math.abs(deltaY)) {
          gesture.axis = "horizontal";
          return;
        }
        if (deltaY < 0) {
          gestureRef.current = null;
          return;
        }
        gesture.axis = "vertical";
        sheet.classList.add("bottom-sheet--gesture-enabled");
        sheet.style.animation = "none";
      }
      if (gesture.axis !== "vertical") return;
      if (event.cancelable) event.preventDefault();

      const offset = Math.max(0, deltaY);
      gesture.offset = offset;
      const now = performance.now();
      gesture.velocity = (touch.clientY - gesture.lastY) / Math.max(1, now - gesture.lastTime);
      gesture.lastY = touch.clientY;
      gesture.lastTime = now;
      sheet.style.transition = "none";
      sheet.style.transform = `translate3d(0, ${offset}px, 0)`;

      const backdrop = backdropRef.current;
      if (backdrop) {
        const progress = Math.min(1, offset / Math.max(1, sheet.offsetHeight));
        backdrop.style.transition = "none";
        backdrop.style.opacity = String(Math.max(0, 1 - progress));
      }
    };

    const onTouchEnd = (event: TouchEvent) => {
      const gesture = gestureRef.current;
      if (!gesture || gesture.axis !== "vertical") {
        gestureRef.current = null;
        return;
      }
      const touch = event.changedTouches[0];
      const endY = touch?.clientY ?? gesture.lastY;
      const elapsed = Math.max(1, performance.now() - gesture.lastTime);
      const tailVelocity = (endY - gesture.lastY) / elapsed;
      const velocity = Math.abs(endY - gesture.lastY) > 1 ? tailVelocity : gesture.velocity;
      const offset = Math.max(gesture.offset, endY - gesture.startY);
      gestureRef.current = null;
      if (settleTimeoutRef.current !== null) window.clearTimeout(settleTimeoutRef.current);
      settleTimeoutRef.current = null;
      const backdrop = backdropRef.current;

      if (offset >= CLOSE_DISTANCE || (offset >= VELOCITY_CLOSE_DISTANCE && velocity >= CLOSE_VELOCITY)) {
        if (!closingRef.current) {
          const duration = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 1 : 300;
          closingRef.current = true;
          swipeClosingRef.current = true;
          sheet.style.animation = "none";
          sheet.style.transition = "none";
          sheet.style.transform = `translate3d(0, ${offset}px, 0)`;
          void window.getComputedStyle(sheet).transform;
          sheet.style.transition = `transform ${duration}ms cubic-bezier(.32, .72, .2, 1), opacity ${duration}ms ease`;
          void window.getComputedStyle(sheet).transition;
          sheet.style.transform = "translate3d(0, 100%, 0)";
          sheet.style.opacity = "0";
          if (backdrop) {
            backdrop.style.transition = `opacity ${duration}ms cubic-bezier(.32, .72, .2, 1)`;
            backdrop.style.opacity = "0";
          }
          onCloseRef.current();
        }
        return;
      }

      sheet.style.transition = "transform 320ms cubic-bezier(.22, 1, .36, 1)";
      sheet.style.transform = "translate3d(0, 0, 0)";
      if (backdrop) {
        backdrop.style.transition = "opacity 260ms cubic-bezier(.22, 1, .36, 1)";
        backdrop.style.opacity = "";
      }
      settleTimeoutRef.current = window.setTimeout(() => {
        settleTimeoutRef.current = null;
        if (closingRef.current) return;
        sheet.style.transition = "";
        sheet.style.transform = "";
        if (backdrop) backdrop.style.transition = "";
      }, 340);
    };

    const onTouchCancel = () => {
      gestureRef.current = null;
      if (closingRef.current) return;
      if (settleTimeoutRef.current !== null) window.clearTimeout(settleTimeoutRef.current);
      settleTimeoutRef.current = null;
      const backdrop = backdropRef.current;
      sheet.style.transition = "transform 260ms cubic-bezier(.22, 1, .36, 1)";
      sheet.style.transform = "translate3d(0, 0, 0)";
      if (backdrop) {
        backdrop.style.transition = "opacity 220ms ease";
        backdrop.style.opacity = "";
      }
    };

    sheet.addEventListener("touchstart", onTouchStart, { passive: true });
    sheet.addEventListener("touchmove", onTouchMove, { passive: false });
    sheet.addEventListener("touchend", onTouchEnd, { passive: true });
    sheet.addEventListener("touchcancel", onTouchCancel, { passive: true });
    return () => {
      sheet.removeEventListener("touchstart", onTouchStart);
      sheet.removeEventListener("touchmove", onTouchMove);
      sheet.removeEventListener("touchend", onTouchEnd);
      sheet.removeEventListener("touchcancel", onTouchCancel);
      gestureRef.current = null;
      if (settleTimeoutRef.current !== null) window.clearTimeout(settleTimeoutRef.current);
      settleTimeoutRef.current = null;
    };
  }, [mounted]);

  if (!mounted && !open) return null;

  const requestClose = () => {
    if (closingRef.current) return;
    closingRef.current = true;
    onCloseRef.current();
  };

  return createPortal(
    <>
      <button
        ref={backdropRef}
        className={`bottom-sheet__backdrop${!open ? " bottom-sheet__backdrop--closing" : ""}`}
        type="button"
        aria-label="Закрыть окно"
        onClick={requestClose}
      />
      <div
        ref={sheetRef}
        className={`bottom-sheet${!open ? " bottom-sheet--closing" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div className="bottom-sheet__topbar">
          <div className="bottom-sheet__handle" />
          <button className="bottom-sheet__close" type="button" aria-label="Закрыть окно" onClick={requestClose}>
            <Image src="/icons/close.svg" alt="" width={36} height={36} unoptimized />
          </button>
        </div>
        {!hideTitle && <strong className="bottom-sheet__title">{title}</strong>}
        <div
          className="bottom-sheet__content"
          onScroll={(event) => event.currentTarget.classList.toggle("bottom-sheet__content--scrolled", event.currentTarget.scrollTop > 0)}
        >
          {children}
        </div>
      </div>
    </>,
    document.body,
  );
}
