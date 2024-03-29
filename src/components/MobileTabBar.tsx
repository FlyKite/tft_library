import { Component } from 'react'

export interface TabBarItem {
  title: string
  iconUrl?: string
  activeIconUrl?: string
}

interface Props {
  items: TabBarItem[]
  activeTabIndex: number
  tintColor: string
  onTabClick: (index: number) => void
}

export default class MobileTabBar extends Component<Props> {

  render () {
    return (
      <div
        style={{
          display: 'flex',
          position: 'fixed',
          left: 0, right: 0, bottom: 0,
          height: 49,
          backgroundColor: '#212121',
          borderTopWidth: 1,
          borderTopColor: '#424242',
          borderTopStyle: 'solid',
          justifyContent: 'space-around'
        }}
      >
        {this.props.items.map((item, index) => {
          const isActive = index === this.props.activeTabIndex
          return (
            <div
              key={`tab_icon_${index}`}
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '20%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onClick={() => { this.props.onTabClick(index) }}
            >
              {item.iconUrl !== undefined ? (
                <img
                  src={isActive && item.activeIconUrl ? item.activeIconUrl : item.iconUrl}
                  style={{ width: 24, height: 24 }}
                />
              ) : (
                <div style={{ width: 24, height: 24 }}/>
              )}
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 'bold',
                  color: isActive ? this.props.tintColor : '#9E9E9E'
                }}
              >
                {item.title}
              </span>
            </div>
          )
        })}
      </div>
    )
  }

}
