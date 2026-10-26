"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";
import ConsentNotice from "./ConsentNotice";

type State = { hasError: boolean };

class OptionalModuleBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: unknown, info: ErrorInfo) {
    // This UI is optional. Do not let a blocked module or a broken asset
    // prevent the main site from rendering.
    if (process.env.NODE_ENV !== "production") {
      console.warn("Optional consent notice was unavailable", error, info.componentStack);
    }
  }

  render() {
    return this.state.hasError ? null : this.props.children;
  }
}

export default function OptionalConsentNotice() {
  return (
    <OptionalModuleBoundary>
      <ConsentNotice />
    </OptionalModuleBoundary>
  );
}
