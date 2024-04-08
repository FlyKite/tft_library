import { Component } from 'react'
import './App.css'
import RaceJobTablePage from './containers/RaceJobTablePage'
import MobileTabBar, { TabBarItem } from './components/MobileTabBar'
import { ValueListenable2Builder, ValueListenableBuilder, ValueNotifier } from './components/ValueNotify'
import EnhancementPage from './containers/EnhancementPage'
import DeskTopNavigationBar from './components/DesktopNavigationBar'
import EquipmentPage from './containers/EquipmentPage'
import { Drawer } from 'antd'
import DataManager, { DataSetType } from './model/DataManager'
import PageContainer from './containers/PageContainer'

interface Props {

}

interface State {
  showMobileStyle: boolean
}

interface RefKey {
  raceJobPage?: RaceJobTablePage | null
  pageContainer?: HTMLDivElement | null
}

interface DrawerDisplayInfo {
  children: React.ReactNode
  height: number
}
export default class App extends Component<Props, State> {

  private refKeys: RefKey = {}

  private currentActiveTabIndex = new ValueNotifier<number>(0)
  private drawerOpen = new ValueNotifier<boolean>(false)
  private drawerDisplayInfo = new ValueNotifier<DrawerDisplayInfo| undefined>(undefined)

  private get tabsInfo (): TabBarItem[] {
    return [
      { title: '棋子羁绊', iconUrl: './images/race_job_table_tab_icon.png', activeIconUrl: './images/race_job_table_tab_icon_active.png' },
      { title: '强化', iconUrl: './images/hex_tab_icon.png', activeIconUrl: './images/hex_tab_icon_active.png' },
      { title: '装备', iconUrl: './images/equip_tab_icon.png', activeIconUrl: './images/equip_tab_icon_active.png' }
    ]
  }

  constructor (props: Props) {
    super(props)
    this.state = { showMobileStyle: window.innerWidth < 500 }
  }

  componentDidMount () {
    DataManager.initialFetch()
    window.addEventListener('resize', this.onWindowSizeChanged)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.onWindowSizeChanged)
  }

  private onWindowSizeChanged = () => {
    const showMobileStyle = window.innerWidth < 500
    if (this.state.showMobileStyle !== showMobileStyle) {
      this.setState({ showMobileStyle })
    }
  }

  render () {
    if (this.state.showMobileStyle) {
      return this.renderMobilePage()
    } else {
      return this.renderDesktopPage()
    }
  }

  private renderDesktopPage () {
    return (
      <div>
        {this.renderContent()}
        <ValueListenableBuilder
          listenTo={this.currentActiveTabIndex}
          renderChildren={(activeTabIndex) => {
            return (
              <DeskTopNavigationBar
                items={this.tabsInfo}
                activeTabIndex={activeTabIndex}
                tintColor={'#4A90E2'}
                onTabClick={(index) => {
                  if (index !== this.currentActiveTabIndex.value) {
                    this.currentActiveTabIndex.value = index
                  }
                }}
              />
            )
          }}
        />
      </div>
    )
  }

  private renderMobilePage () {
    return (
      <div style={{ width: screen.availWidth, height: screen.availHeight }} >
        {this.renderContent({
          onShowDrawer: (children, height) => {
            this.drawerDisplayInfo.value = { children, height }
            this.drawerOpen.value = true
          }
        })}
        <ValueListenableBuilder
          listenTo={this.currentActiveTabIndex}
          renderChildren={(activeTabIndex) => {
            return (
              <MobileTabBar
                items={this.tabsInfo}
                activeTabIndex={activeTabIndex}
                tintColor={'#4A90E2'}
                onTabClick={(index) => {
                  if (index !== this.currentActiveTabIndex.value) {
                    this.currentActiveTabIndex.value = index
                  }
                }}
              />
            )
          }}
        />
        {this.renderBottomDrawer()}
      </div>
    )
  }

  private renderContent (params?: { onShowDrawer: (children: React.ReactNode, height: number) => void }) {
    return (
      <ValueListenableBuilder
        listenTo={this.currentActiveTabIndex}
        renderChildren={(activeTabIndex) => {
          switch (activeTabIndex) {
            case 0:
              return (
                <PageContainer
                  key={'chess_race_job_page'}
                  showMobileStyle={this.state.showMobileStyle}
                  loadingStatus={DataManager.loadingStatusMap.get(DataSetType.chessRaceJob)!}
                  onScroll={(container) => {
                    this.refKeys.raceJobPage?.onContainerScroll(container)
                  }}
                  onRetryFetch={() => {
                    DataManager.fetchDataSet(DataSetType.chessRaceJob)
                  }}
                  renderChildren={() => {
                    return (
                      <RaceJobTablePage
                        ref={(ref) => { this.refKeys.raceJobPage = ref }}
                        showMobileStyle={this.state.showMobileStyle}
                        onShowDrawer={params?.onShowDrawer}
                      />
                    )
                  }}
                />
              )
            case 1:
              return (
                <PageContainer
                  key={'enhancement_page'}
                  showMobileStyle={this.state.showMobileStyle}
                  loadingStatus={DataManager.loadingStatusMap.get(DataSetType.enhancements)!}
                  onRetryFetch={() => {
                    DataManager.fetchDataSet(DataSetType.enhancements)
                  }}
                  renderChildren={() => {
                    return (
                      <EnhancementPage
                        showMobileStyle={this.state.showMobileStyle}
                        onShowDrawer={params?.onShowDrawer}
                      />
                    )
                  }}
                />
              )
            case 2:
              return (
                <PageContainer
                  key={'enhancement_page'}
                  showMobileStyle={this.state.showMobileStyle}
                  loadingStatus={DataManager.loadingStatusMap.get(DataSetType.equipments)!}
                  onRetryFetch={() => {
                    DataManager.fetchDataSet(DataSetType.equipments)
                  }}
                  renderChildren={() => {
                    return (
                      <EquipmentPage
                        showMobileStyle={this.state.showMobileStyle}
                        onShowDrawer={params?.onShowDrawer}
                      />
                    )
                  }}
                />
              )
            default:
              return <div/>
          }
        }}
      />
    )
  }

  private renderBottomDrawer () {
    return (
      <ValueListenable2Builder
        listenTo={{ notifier1: this.drawerOpen, notifier2: this.drawerDisplayInfo }}
        renderChildren={(open, displayInfo) => {
          return (
            <Drawer
              placement={'bottom'}
              closable={false}
              open={open}
              onClose={() => {
                this.drawerOpen.value = false
              }}
              height={displayInfo?.height}
              style={{
                borderTopLeftRadius: 12,
                borderTopRightRadius: 12,
                backgroundColor: '#212121',
                boxShadow: '0px -4px 24px #0005'
              }}
              styles={{
                body: { padding: 0 }
              }}
            >
              {displayInfo ? displayInfo.children : <div/>}
            </Drawer>
          )
        }}
      />
    )
  }
}
