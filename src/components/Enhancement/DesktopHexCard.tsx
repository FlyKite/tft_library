import { Component } from 'react'
import { Hex } from '../../model/Hex'

interface Props {
  hex: Hex
}

export default class DesktopHexCard extends Component<Props> {

  render () {
    const { hex } = this.props
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: 260,
          height: 360,
          paddingLeft: 12,
          paddingRight: 12,
          alignItems: 'center',
          backgroundColor: '#424242',
          borderRadius: 12
        }}
      >
        <img
          src={hex.iconUrl}
          style={{ width: 88, height: 88, marginTop: 28 }}
        />
        <span style={{ fontSize: 22, fontWeight: 'bold', marginTop: 24 }}>{hex.name}</span>
        <span style={{ fontSize: 15, color: 'white', marginTop: 36, textAlign: 'center' }}>{hex.description}</span>
      </div>
    )
  }
}
