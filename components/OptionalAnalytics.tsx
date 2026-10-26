"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";
import Analytics from "./Analytics";

type State = { hasError: boolean };

class OptionalAnalyticsBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: unknown, info: ErrorInfo) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("Optional analytics was unavailable", error, info.componentStack);
    }
  }

  render() {
    return this.state.hasError ? null : this.props.children;
  }
}

export default function OptionalAnalytics() {
  return (
    <OptionalAnalyticsBoundary>
      <Analytics />
    </OptionalAnalyticsBoundary>
  );
}
