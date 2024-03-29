import { ConfigProvider, List } from 'antd'
import { Component } from 'react'
import { adventures } from '../model/Adventure'

export default class AdventurePage extends Component {
  render () {
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
            dataSource={adventures}
            renderItem={(adventure, index) => {
              return (
                <div style={{ display: 'flex', marginLeft: 16, marginRight: 16, paddingTop: 16, paddingBottom: 16, borderTopWidth: index === 0 ? 0 : 0.5, borderTopColor: '#424242', borderTopStyle: 'solid' }}>
                  <img
                    src={adventure.iconUrl}
                    style={{ width: 48, height: 48, borderRadius: 24 }}
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
