import { GlobalContext } from '@/hooks';
import React from 'react'
import { NavLink, Location } from 'react-router-dom';

interface ErrorBoundaryProps {
  location: Location
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps> {
  static contextType = GlobalContext
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (this.props.location.pathname != nextProps.location.pathname) {
      this.setState({ hasError: false })
    }
  }

  componentDidCatch(error, errorInfo) {
    const { errorLogActions: { addErrorLog } } = this.context
    let info = 'unknown error'
    let tag = 'unknown tag'
    if (errorInfo.componentStack) {
      info = errorInfo.componentStack
      tag = info.match(/at ([\w]+) \(/)[1]
    }
    addErrorLog({
      err: error,
      info,
      tag
    })
  }
  render() {
    if (this.state.hasError) {
      return (
        <>
          <h1>Something went wrong. Please click the bug icon in the upper right corner.</h1>
          <NavLink to="/"><button>to dashboard</button></NavLink>
        </>
      )
    }
    return this.props.children; 
  }
}