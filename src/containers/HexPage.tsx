import { Col, ConfigProvider, List, Radio, Row } from 'antd'
import { Component } from 'react'
import { HexLevel, hexes } from '../model/Hex'
import DeskTopHexCard from '../components/Hex/DesktopHexCard'

interface Props {
  showMobileStyle: boolean
}

interface State {
  selectedHexLevel: HexLevel
}

export default class HexPage extends Component<Props, State> {

  constructor (props: Props) {
    super(props)
    this.state = { selectedHexLevel: HexLevel.silver }
  }

  render () {
    if (this.props.showMobileStyle) {
      return this.renderMobilePage()
    } else {
      return this.renderDesktopPage()
    }
  }

  private renderDesktopPage () {
    const matchedHexes = hexes.filter((hex) => hex.level === this.state.selectedHexLevel)
    let children: any[] = []
    for (let i = 0; i < matchedHexes.length; i++) {
      const hex = matchedHexes[i]
      children.push((
        <Col>
          <DeskTopHexCard hex={hex} />
        </Col>
      ))
    }
    return (
      <div style={{ width: '100%', height: '100%' }}>
        {this.renderTab()}
        <div style={{ display: 'flex', width: '100%', marginTop: 44, flex: 1, paddingTop: 16, paddingBottom: 32, alignItems: 'center', justifyContent: 'center' }}>
          <Row gutter={[16, 16]} justify={'center'}>
            {children}
          </Row>
        </div>
      </div>
    )
  }

  private renderMobilePage () {
    const matchedHexes = hexes.filter((hex) => hex.level === this.state.selectedHexLevel)
    return (
      <div style={{ width: '100%', height: '100%' }}>
        {this.renderTab()}
        <div style={{ width: '100%', marginTop: 44, flex: 1 }}>
          <List
            itemLayout={'horizontal'}
            dataSource={matchedHexes}
            renderItem={(hex, index) => {
              return (
                <div style={{ display: 'flex', marginLeft: 16, marginRight: 16, paddingTop: 16, paddingBottom: 16, borderTopWidth: index === 0 ? 0 : 0.5, borderTopColor: '#424242', borderTopStyle: 'solid' }}>
                  <img
                    src={hex.iconUrl}
                    style={{ width: 48, height: 48, borderRadius: 24 }}
                  />
                  <div style={{ display: 'flex', flexDirection: 'column', flex: 1, marginLeft: 16 }}>
                    <span style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>{hex.name}</span>
                    <span style={{ fontSize: 15, color: '#E0E0E0' }}>{hex.description}</span>
                  </div>
                </div>
              )
            }}
          />
        </div>
      </div>
    )
  }

  private renderTab () {
    return (
      <div
        style={{
          display: 'flex',
          position: 'fixed',
          top: this.props.showMobileStyle ? 0 : 56,
          left: 0, right: 0, height: 44,
          zIndex: 99,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#212121'
        }}
      >
        <ConfigProvider
          theme={{
            components: {
              Radio: {
                buttonBg: '#212121',
                colorText: '#FAFAFA',
                colorBorder: '#626262',
                // buttonSolidCheckedBg: '#626262',
                // colorPrimaryHover: '#626262',
                // buttonSolidCheckedHoverBg: '#626262'
              },
            },
          }}
        >
          <Radio.Group
            options={[
              { label: '银色', value: HexLevel.silver },
              { label: '金色', value: HexLevel.golden },
              { label: '棱彩', value: HexLevel.colorful },
            ]}
            onChange={(event) => {
              this.setState({ selectedHexLevel: event.target.value })
            }}
            value={this.state.selectedHexLevel}
            optionType="button"
            buttonStyle="solid"
          />
        </ConfigProvider>
      </div>
    )
  }
}
