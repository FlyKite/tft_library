import { Col, ConfigProvider, Input, List, Radio, Row } from 'antd'
import { Component } from 'react'
import DesktopHexCard from '../components/Enhancement/DesktopHexCard'
import DataManager from '../model/DataManager'
import { Hex, HexLevel } from '../model/Hex'
import { Adventure } from '../model/Adventure'
import DesktopAdventureCard from '../components/Enhancement/DesktopAdventureCard'
import MobileEnhancementComponent from '../components/Enhancement/MobileEnhancementComponent'

enum EnhancementType {
  silverHex,
  goldenHex,
  colorfulHex,
  adventure
}

interface Props {
  showMobileStyle: boolean
  onShowDrawer?: (children: React.ReactNode, height: number) => void
}

interface State {
  selectedType: EnhancementType
  searchText: string
}

export default class EnhancementPage extends Component<Props, State> {

  constructor (props: Props) {
    super(props)
    this.state = { selectedType: EnhancementType.silverHex, searchText: '' }
  }

  render () {
    if (this.props.showMobileStyle) {
      return this.renderMobilePage()
    } else {
      return this.renderDesktopPage()
    }
  }

  private renderDesktopPage () {
    let children: any[] = []
    let renderHex: any = (hexes: Hex[]) => {
      let children = []
      for (let i = 0; i < hexes.length; i++) {
        const hex = hexes[i]
        children.push((
          <Col>
            <DesktopHexCard hex={hex} />
          </Col>
        ))
      }
      return children
    }
    switch (this.state.selectedType) {
      case EnhancementType.silverHex:
        children = renderHex(DataManager.hexes.filter((hex) => hex.level === HexLevel.silver))
        break
      case EnhancementType.goldenHex:
        children = renderHex(DataManager.hexes.filter((hex) => hex.level === HexLevel.golden))
        break
      case EnhancementType.colorfulHex:
        children = renderHex(DataManager.hexes.filter((hex) => hex.level === HexLevel.colorful))
        break
      case EnhancementType.adventure:
        for (let i = 0; i < DataManager.adventures.length; i++) {
          const adventure = DataManager.adventures[i]
          children.push((
            <Col>
              <DesktopAdventureCard adventure={adventure}/>
            </Col>
          ))
        }
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
    const { selectedType, searchText } = this.state
    let data: any[]
    let renderItem: any = (hex: Hex, index: number) => {
      return <MobileEnhancementComponent
        isFirstItem={index === 0}
        iconUrl={hex.iconUrl}
        name={hex.name}
        description={hex.description}
      />
    }
    switch (selectedType) {
      case EnhancementType.silverHex:
        data = this.getHexes(HexLevel.silver, searchText)
        break
      case EnhancementType.goldenHex:
        data = this.getHexes(HexLevel.golden, searchText)
        break
      case EnhancementType.colorfulHex:
        data = this.getHexes(HexLevel.colorful, searchText)
        break
      case EnhancementType.adventure:
        data = DataManager.adventures
        if (searchText) {
          data = data.filter((adventure: Adventure) => adventure.title.indexOf(searchText) !== -1 || adventure.description.indexOf(searchText) !== -1)
        }
        renderItem = (adventure: Adventure, index: number) => {
          return <MobileEnhancementComponent
            isFirstItem={index === 0}
            iconUrl={adventure.iconUrl}
            name={adventure.title}
            description={adventure.description}
          />
        }
    }
    return (
      <div style={{ width: '100%', height: '100%' }}>
        {this.renderTab()}
        <div style={{ width: '100%', marginTop: 88, flex: 1 }}>
          <List
            itemLayout={'horizontal'}
            dataSource={data}
            renderItem={renderItem}
          />
        </div>
      </div>
    )
  }

  private getHexes (level: HexLevel, searchText: string = ''): Hex[] {
    let result = DataManager.hexes.filter((hex) => hex.level === level)
    if (searchText) {
      result = result.filter((hex: Hex) => hex.name.indexOf(searchText) !== -1 || hex.description.indexOf(searchText) !== -1)
    }
    return result
  }

  private renderTab () {
    const { showMobileStyle } = this.props
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          position: 'fixed',
          top: showMobileStyle ? 0 : 56,
          left: 0,
          right: 0,
          paddingLeft: 16,
          paddingRight: 16,
          paddingTop: 'env(safe-area-inset-top)',
          height: showMobileStyle ? 88 : 44,
          zIndex: 99,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#212121',
          borderWidth: 0.5,
          borderBottomStyle: 'solid',
          borderColor: '#42424299'
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
              Input: {
                colorText: '#FFFFFF',
                colorTextPlaceholder: '#9E9E9E'
              }
            },
          }}
        >
          <Radio.Group
            options={[
              { label: '银色', value: EnhancementType.silverHex },
              { label: '金色', value: EnhancementType.goldenHex },
              { label: '棱彩', value: EnhancementType.colorfulHex },
              { label: '奇遇', value: EnhancementType.adventure }
            ]}
            onChange={(event) => {
              this.setState({ selectedType: event.target.value })
            }}
            value={this.state.selectedType}
            optionType="button"
            buttonStyle="solid"
          />
          {showMobileStyle && (
            <Input
              placeholder="搜索"
              variant="filled"
              style={{ marginTop: 8, backgroundColor: '#424242' }}
              allowClear
              onChange={(event) => {
                this.setState({ searchText: event.target.value })
              }}
            />
          )}
        </ConfigProvider>
      </div>
    )
  }
}
