import { Component } from 'react'
import { Adventure } from '../../model/Adventure'

interface Props {
  adventure: Adventure
}

export default class DesktopAdventureCard extends Component<Props> {

  render () {
    const { adventure } = this.props
    return (
      <div
        style={{
          display: 'flex',
          padding: 16,
          width: 280,
          height: 120,
          backgroundColor: '#424242',
          borderRadius: 12
        }}
      >
        <img
          src={adventure.iconUrl}
          style={{ width: 48, height: 48 }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, marginLeft: 16 }}>
          <span style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>{adventure.title}</span>
          <span style={{ fontSize: 15, color: '#E0E0E0' }}>{adventure.description}</span>
        </div>
      </div>
    )
  }
}
