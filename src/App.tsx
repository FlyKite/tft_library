import { Component } from 'react'
import './App.css'
import RaceJobTablePage from './containers/RaceJobTablePage'
import MobileTabBar, { TabBarItem } from './components/MobileTabBar'
import { ValueListenableBuilder, ValueNotifier } from './components/ValueNotify'
import AdventurePage from './containers/AdventurePage'
import HexPage from './containers/HexPage'
import DeskTopNavigationBar from './components/DesktopNavigationBar'
import EquipmentPage from './containers/EquipmentPage'

interface Props {

}

interface State {
  showMobileStyle: boolean
}

export default class App extends Component<Props, State> {

  private currentActiveTabIndex = new ValueNotifier<number>(0)

  constructor (props: Props) {
    super(props)
    this.state = { showMobileStyle: window.innerWidth < 500 }
  }

  componentDidMount () {
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
    const tabs: { title: string, iconUrl?: string, activeIconUrl?: string }[] = [
      { title: '棋子羁绊', iconUrl: './images/race_job_table_tab_icon.png', activeIconUrl: './images/race_job_table_tab_icon_active.png' },
      { title: '强化', iconUrl: './images/hex_tab_icon.png', activeIconUrl: './images/hex_tab_icon_active.png' },
      { title: '奇遇', iconUrl: './images/adventure_tab_icon.png', activeIconUrl: './images/adventure_tab_icon_active.png' },
      { title: '装备', iconUrl: './images/equip_tab_icon.png', activeIconUrl: './images/equip_tab_icon_active.png' }
    ]
    return (
      <div>
        <div
          style={{
            display: 'flex',
            marginTop: this.state.showMobileStyle ? 0 : 56,
            marginBottom: this.state.showMobileStyle ? 49 : 0
          }}
        >
          <ValueListenableBuilder
            listenTo={this.currentActiveTabIndex}
            renderChildren={(activeTabIndex) => {
              switch (activeTabIndex) {
                case 0:
                  return <RaceJobTablePage showMobileStyle={this.state.showMobileStyle}/>
                case 1:
                  return <HexPage showMobileStyle={this.state.showMobileStyle}/>
                case 2:
                  return <AdventurePage showMobileStyle={this.state.showMobileStyle}/>
                case 3:
                  return <EquipmentPage showMobileStyle={this.state.showMobileStyle}/>
                default:
                  return <div/>
              }
            }}
          />
        </div>
        {this.state.showMobileStyle ? this.renderMobileTabBar(tabs) : this.renderDesktopNavigationBar(tabs)}
      </div>
    )
  }

  private renderMobileTabBar (tabs: TabBarItem[]) {
    return (
      <ValueListenableBuilder
        listenTo={this.currentActiveTabIndex}
        renderChildren={(activeTabIndex) => {
          return (
            <MobileTabBar
              items={tabs}
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
    )
  }

  private renderDesktopNavigationBar (tabs: TabBarItem[]) {
    return (
      <ValueListenableBuilder
        listenTo={this.currentActiveTabIndex}
        renderChildren={(activeTabIndex) => {
          return (
            <DeskTopNavigationBar
              items={tabs}
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
    )
  }
}
