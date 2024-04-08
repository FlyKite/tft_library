import { Component } from 'react'
import { ValueNotifier } from '../components/ValueNotify'
import { LoadingStatus } from '../model/DataManager'
import { Button, ConfigProvider, Empty, Spin } from 'antd'

interface Props {
  key: React.Key | null | undefined
  showMobileStyle: boolean
  loadingStatus: ValueNotifier<LoadingStatus>
  renderChildren: () => React.ReactNode
  onScroll?: (container: HTMLDivElement) => void
  onRetryFetch?: () => void
}

enum LoadingViewStatus {
  loading,
  hiding,
  none
}

interface State {
  loadingStatus: LoadingStatus
  loadingViewStatus: LoadingViewStatus
}

export default class PageContainer extends Component<Props, State> {

  private container?: HTMLDivElement | null

  constructor (props: Props) {
    super(props)
    const loadingStatus = props.loadingStatus.value
    const loadingViewStatus = loadingStatus === LoadingStatus.completed ? LoadingViewStatus.none : LoadingViewStatus.loading
    this.state = { loadingStatus, loadingViewStatus }
  }

  componentDidMount () {
    this.props.loadingStatus.addListener(this.onLoadingStatusChanged)
    addEventListener('animationend', this.onAnimationEnd)
  }

  componentWillUnmount () {
    this.props.loadingStatus.removeListener(this.onLoadingStatusChanged)
    removeEventListener('animationend', this.onAnimationEnd)
  }

  private onLoadingStatusChanged = (loadingStatus: LoadingStatus) => {
    const oldLoadingStatus = this.state.loadingStatus
    let loadingViewStatus = oldLoadingStatus === LoadingStatus.loading ? LoadingViewStatus.loading : LoadingViewStatus.none
    if (oldLoadingStatus !== LoadingStatus.completed && loadingStatus === LoadingStatus.completed) {
      loadingViewStatus = LoadingViewStatus.hiding
    }
    this.setState({ loadingStatus, loadingViewStatus })
  }

  private onAnimationEnd = () => {
    if (this.state.loadingViewStatus === LoadingViewStatus.hiding) {
      this.setState({ loadingViewStatus: LoadingViewStatus.none })
    }
  }

  render () {
    const { key, showMobileStyle, onScroll } = this.props
    return (
      <div
        key={key}
        className={showMobileStyle ? 'mobile_page_container' : 'desktop_page_container'}
        ref={(ref) => { this.container = ref }}
        onScroll={() => {
          if (this.container && onScroll) {
            onScroll(this.container)
          }
        }}
      >
        {this.renderContent()}
      </div>
    )
  }

  private renderContent () {
    switch (this.state.loadingStatus) {
      case LoadingStatus.initial:
        return <div/>
      case LoadingStatus.loading:
        return this.renderLoading()
      case LoadingStatus.completed:
        return (
          <>
            {this.props.renderChildren()}
            {this.renderLoading()}
          </>
        )
      case LoadingStatus.failed:
        return this.renderFailed()
    }
  }

  private renderLoading () {
    const { loadingViewStatus } = this.state
    return (
      <div
        className={ loadingViewStatus === LoadingViewStatus.hiding ? 'hide_loading' : undefined}
        style={{
          position: 'absolute',
          display: loadingViewStatus !== LoadingViewStatus.none ? 'flex' : 'none',
          left: 0, right: 0, top: 0, bottom: 0,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#212121'
        }}
      >
        <Spin/>
      </div>
    )
  }

  private renderFailed () {
    return (
      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Empty
          image={Empty.PRESENTED_IMAGE_DEFAULT}
          description={(
            <span style={{ fontSize: 15, color: '#BDBDBD' }}>加载失败</span>
          )}
          style={{ width: '100%' }}
        >
          <ConfigProvider
            theme={{
              components: {
                Button: {
                  defaultBg: '#424242',
                  defaultBorderColor: '#0000',
                  defaultColor: '#BDBDBD',
                  defaultHoverBg: '#424242',
                  defaultHoverBorderColor: '#0000',
                  defaultHoverColor: '#BDBDBD'
                }
              }
            }}
          >
            <Button
              style={{ borderRadius: 22, height: 44, width: '60%' }}
              onClick={() => {
                this.props.onRetryFetch && this.props.onRetryFetch()
              }}
            >
              重试
            </Button>
          </ConfigProvider>
        </Empty>
      </div>
    )
  }
}
