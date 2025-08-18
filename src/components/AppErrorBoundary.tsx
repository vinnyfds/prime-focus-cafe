import * as React from "react";

export default class AppErrorBoundary extends React.Component<
  { children?: React.ReactNode },
  { hasError: boolean; msg?: string }
> {
  constructor(p: any) {
    super(p);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(e: any) {
    return { hasError: true, msg: e?.message || String(e) };
  }

  componentDidCatch(e: any, info: any) {
    console.error("AppErrorBoundary", e, info);
  }

  render() {
    return this.state.hasError ? (
      <div className="p-6 text-center">
        <h1 className="text-xl font-semibold">Something went wrong.</h1>
        <p className="opacity-70 mt-2">{this.state.msg}</p>
        <a className="underline mt-4 inline-block" href="/">
          Go home
        </a>
      </div>
    ) : (
      this.props.children
    );
  }
}
