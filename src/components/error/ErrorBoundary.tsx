import React from 'react';
import './error.css';
import { useTranslations } from 'next-intl';

class ErrorBoundaryInner extends React.Component<
  { children: React.ReactNode; translate: (key: string) => string },
  { hasError: boolean }
> {
  constructor(props: {
    children: React.ReactNode;
    translate: (key: string) => string;
  }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(_error: Error, info: React.ErrorInfo) {
    console.error('Info about error', info);
  }

  render() {
    const { translate } = this.props;
    if (this.state.hasError) {
      return (
        <div className="error-message">
          <p>{translate('error-message')}</p>
          <button onClick={() => this.setState({ hasError: false })}>
            {translate('reload')}
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function ErrorBoundary(props: { children: React.ReactNode }) {
  const translate = useTranslations();
  return <ErrorBoundaryInner {...props} translate={translate} />;
}
