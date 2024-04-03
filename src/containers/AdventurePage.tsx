import { Col, ConfigProvider, List, Row } from 'antd'
import { Component } from 'react'
import DataManager from '../model/DataManager'

interface Props {
  showMobileStyle: boolean
  onShowDrawer?: (children: React.ReactNode) => void
}

export default class AdventurePage extends Component<Props> {
  render () {
    if (this.props.showMobileStyle) {
      return this.renderMobilePage()
    } else {
      return this.renderDesktopPage()
    }
  }

  private renderDesktopPage () {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div style={{ display: 'flex', width: '100%', marginTop: 44, flex: 1, paddingTop: 16, paddingBottom: 32, alignItems: 'center', justifyContent: 'center' }}>
          <Row gutter={[16, 16]} justify={'center'}>
            {DataManager.adventures.map((adventure) => {
              return (
                <Col>
                  <div style={{ display: 'flex', padding: 16, width: 280, height: 120, backgroundColor: '#424242', borderRadius: 12 }}>
                    <img
                      src={adventure.iconUrl}
                      style={{ width: 48, height: 48 }}
                    />
                    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, marginLeft: 16 }}>
                      <span style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>{adventure.title}</span>
                      <span style={{ fontSize: 15, color: '#E0E0E0' }}>{adventure.description}</span>
                    </div>
                  </div>
                </Col>
              )
            })}
          </Row>
        </div>
      </div>
    )
  }

  private renderMobilePage() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <ConfigProvider
          theme={{
            components: {
              List: {
                itemPadding: '16px 8px',
                colorBorder: '#9E9E9E'
              },
            },
          }}
        >
          <List
            itemLayout={'horizontal'}
            dataSource={DataManager.adventures}
            renderItem={(adventure, index) => {
              return (
                <div style={{ display: 'flex', marginLeft: 16, marginRight: 16, paddingTop: 16, paddingBottom: 16, borderTopWidth: index === 0 ? 0 : 0.5, borderTopColor: '#424242', borderTopStyle: 'solid' }}>
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
            }}
          />
        </ConfigProvider>
      </div>
    )
  }
}
