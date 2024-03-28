import React from 'react'

export type ValueListener<T> = (value: T) => void

export class ValueNotifier<T> {
  private innerValue: T
  private listeners: Set<ValueListener<T>> = new Set<ValueListener<T>>()

  public get value (): T {
    return this.innerValue
  }

  public set value (value: T) {
    this.innerValue = value
    for (const listener of this.listeners) {
      listener(value)
    }
  }

  constructor (value: T) {
    this.innerValue = value
  }

  addListener (listener: ValueListener<T>) {
    this.listeners.add(listener)
  }

  removeListener (listener: ValueListener<T>) {
    this.listeners.delete(listener)
  }

  removeAllListeners () {
    this.listeners.clear()
  }
}

interface ValueListenableProps<T> {
  listenTo: ValueNotifier<T>
  renderChildren: (value: T) => React.ReactNode
}

export class ValueListenableBuilder<T> extends React.Component<ValueListenableProps<T>> {
  constructor (props: ValueListenableProps<T>) {
    super(props)
    this.props.listenTo.addListener(this.onValueChanged)
  }

  componentWillUnmount () {
    this.props.listenTo.removeListener(this.onValueChanged)
  }

  componentDidUpdate (prevProps: Readonly<ValueListenableProps<T>>) {
    if (prevProps.listenTo !== this.props.listenTo) {
      prevProps.listenTo.removeListener(this.onValueChanged)
      this.props.listenTo.addListener(this.onValueChanged)
      this.setState({})
    }
  }

  private onValueChanged = () => {
    this.setState({})
  }

  render () {
    const children = this.props.renderChildren(this.props.listenTo.value)
    if (!children) {
      return <div/>
    }
    return children
  }
}

interface ValueListenable2Props<T1, T2> {
  listenTo: { notifier1: ValueNotifier<T1>, notifier2: ValueNotifier<T2> }
  renderChildren: (value1: T1, value2: T2) => React.ReactNode
}

export class ValueListenable2Builder<T1, T2> extends React.Component<ValueListenable2Props<T1, T2>> {

  constructor (props: ValueListenable2Props<T1, T2>) {
    super(props)
    this.props.listenTo.notifier1.addListener(this.onValueChanged)
    this.props.listenTo.notifier2.addListener(this.onValueChanged)
  }

  componentWillUnmount () {
    this.props.listenTo.notifier1.removeListener(this.onValueChanged)
    this.props.listenTo.notifier2.removeListener(this.onValueChanged)
  }

  componentDidUpdate (prevProps: Readonly<ValueListenable2Props<T1, T2>>) {
    const { notifier1, notifier2 } = this.props.listenTo
    let hasChanged = false
    if (prevProps.listenTo.notifier1 !== notifier1) {
      prevProps.listenTo.notifier1.removeListener(this.onValueChanged)
      notifier1.addListener(this.onValueChanged)
      hasChanged = true
    }
    if (prevProps.listenTo.notifier2 !== notifier2) {
      prevProps.listenTo.notifier2.removeListener(this.onValueChanged)
      notifier2.addListener(this.onValueChanged)
      hasChanged = true
    }
    if (hasChanged) {
      this.setState({})
    }
  }

  private onValueChanged = () => {
    this.setState({})
  }

  render () {
    const { notifier1, notifier2 } = this.props.listenTo
    const children = this.props.renderChildren(notifier1.value, notifier2.value)
    if (!children) {
      return <div/>
    }
    return children
  }

}

interface ValueListenable3Props<T1, T2, T3> {
  listenTo: { notifier1: ValueNotifier<T1>, notifier2: ValueNotifier<T2>, notifier3: ValueNotifier<T3> }
  renderChildren: (value1: T1, value2: T2, value3: T3) => React.ReactNode
}

export class ValueListenable3Builder<T1, T2, T3> extends React.Component<ValueListenable3Props<T1, T2, T3>> {

  constructor (props: ValueListenable3Props<T1, T2, T3>) {
    super(props)
    this.props.listenTo.notifier1.addListener(this.onValueChanged)
    this.props.listenTo.notifier2.addListener(this.onValueChanged)
    this.props.listenTo.notifier3.addListener(this.onValueChanged)
  }

  componentWillUnmount () {
    this.props.listenTo.notifier1.removeListener(this.onValueChanged)
    this.props.listenTo.notifier2.removeListener(this.onValueChanged)
    this.props.listenTo.notifier3.removeListener(this.onValueChanged)
  }

  componentDidUpdate (prevProps: Readonly<ValueListenable3Props<T1, T2, T3>>) {
    const { notifier1, notifier2, notifier3 } = this.props.listenTo
    let hasChanged = false
    if (prevProps.listenTo.notifier1 !== notifier1) {
      prevProps.listenTo.notifier1.removeListener(this.onValueChanged)
      notifier1.addListener(this.onValueChanged)
      hasChanged = true
    }
    if (prevProps.listenTo.notifier2 !== notifier2) {
      prevProps.listenTo.notifier2.removeListener(this.onValueChanged)
      notifier2.addListener(this.onValueChanged)
      hasChanged = true
    }
    if (prevProps.listenTo.notifier3 !== notifier3) {
      prevProps.listenTo.notifier3.removeListener(this.onValueChanged)
      notifier3.addListener(this.onValueChanged)
      hasChanged = true
    }
    if (hasChanged) {
      this.setState({})
    }
  }

  private onValueChanged = () => {
    this.setState({})
  }

  render () {
    const { notifier1, notifier2, notifier3 } = this.props.listenTo
    const children = this.props.renderChildren(notifier1.value, notifier2.value, notifier3.value)
    if (!children) {
      return <div/>
    }
    return children
  }

}