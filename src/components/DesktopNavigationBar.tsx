import { Component } from 'react'

interface Props {
  items: { title: string }[]
  activeTabIndex: number
  tintColor: string
  onTabClick: (index: number) => void
}

export default class DeskTopNavigationBar extends Component<Props> {
  render () {
    return (
      <div
        style={{
          display: 'flex',
          position: 'fixed',
          paddingLeft: 16,
          left: 0, right: 0, top: 0,
          height: 56,
          backgroundColor: '#424242',
          alignItems: 'center'
        }}
      >
        <span style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>云顶看板</span>
        {this.props.items.map((item, index) => {
          const isActive = index === this.props.activeTabIndex
          return (
            <div
              key={`tab_icon_${index}`}
              style={{
                marginLeft: index === 0 ? 24 : 0,
                display: 'flex',
                flexDirection: 'column',
                paddingLeft: 12,
                paddingRight: 12,
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
              onClick={() => { this.props.onTabClick(index) }}
            >
              <span
                style={{
                  fontSize: 16,
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
