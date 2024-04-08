import { Component } from 'react'

interface Props {
  isFirstItem: boolean
  iconUrl: string
  name: string
  description: string
}

export default class MobileEnhancementComponent extends Component<Props> {

  render () {
    const { isFirstItem, iconUrl, name, description } = this.props
    return (
      <div
        style={{
          display: 'flex',
          margin: '0px 16px',
          padding: '16px 0px',
          borderTopWidth: isFirstItem ? 0 : 0.5,
          borderTopColor: '#424242',
          borderTopStyle: 'solid'
        }}
      >
        <img
          src={iconUrl}
          style={{ width: 48, height: 48 }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, marginLeft: 16 }}>
          <span style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>{name}</span>
          <span style={{ fontSize: 15, color: '#E0E0E0' }}>{description}</span>
        </div>
      </div>
    )
  }
}
