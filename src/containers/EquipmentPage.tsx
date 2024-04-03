import { Component } from 'react'
import { Equipment, EquipmentType } from '../model/Equipment'
import { Popover } from 'antd'
import DataManager from '../model/DataManager'

interface Props {
  showMobileStyle: boolean
  onShowDrawer?: (children: React.ReactNode) => void
}

export default class EquipmentPage extends Component<Props> {
  private equipmentMap = new Map<string, Equipment>()

  constructor (props: Props) {
    super(props)
    for (const equipment of DataManager.equipments) {
      this.equipmentMap.set(equipment.id, equipment)
    }
  }

  render () {
    return this.props.showMobileStyle ? this.renderMobileLayout() : this.renderDesktopLayout()
  }

  private renderDesktopLayout () {
    return (
      <div style={{ display: 'flex', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', overflow: 'scroll' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {this.renderEquipmentTable()}
          {this.renderEquipments('金鳞龙装备', DataManager.equipments.filter((e) => e.type === EquipmentType.golden))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 32 }}>
          {this.renderEquipments('光明装备', DataManager.equipments.filter((e) => e.type === EquipmentType.light))}
          {/* {this.renderEquipments('墨之影装备', equipments.filter((e) => e.type === EquipmentType.ink))} */}
          {this.renderEquipments('特殊转职纹章', DataManager.equipments.filter((e) => e.type === EquipmentType.job))}
          {this.renderEquipments('奥恩神器', DataManager.equipments.filter((e) => e.type === EquipmentType.ornn))}
          {this.renderEquipments('辅助装备', DataManager.equipments.filter((e) => e.type === EquipmentType.support))}
        </div>
      </div>
    )
  }

  private renderMobileLayout () {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', padding: 16, alignItems: 'stretch' }}>
        {this.renderEquipmentTable()}
        {this.renderEquipments('特殊转职纹章', DataManager.equipments.filter((e) => e.type === EquipmentType.job))}
        {this.renderEquipments('光明装备', DataManager.equipments.filter((e) => e.type === EquipmentType.light))}
        {this.renderEquipments('奥恩神器', DataManager.equipments.filter((e) => e.type === EquipmentType.ornn))}
        {this.renderEquipments('金鳞龙装备', DataManager.equipments.filter((e) => e.type === EquipmentType.golden))}
        {this.renderEquipments('辅助装备', DataManager.equipments.filter((e) => e.type === EquipmentType.support))}
      </div>
    )
  }

  private renderEquipmentTable () {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span style={{ fontSize: 18, fontWeight: 'bold' }}>装备合成表</span>
        {DataManager.equipmentTable.map((row, rowIndex) => {
          return (
            <div key={`equip_row_${rowIndex}`} style={{ display: 'flex', alignItems: 'stretch' }}>
              {row.map((equipId, colIndex) => {
                const equipment = this.equipmentMap.get(equipId)
                const showEquipment = (colIndex === 0 && rowIndex !== 0) || (colIndex >= rowIndex && colIndex !== 0)
                const key = `equip_row_${rowIndex}_${colIndex}`
                return this.renderEquipmentGrid(!showEquipment ? undefined : equipment, showEquipment, key)
              })}
            </div>
          )
        })}
      </div>
    )
  }

  private renderEquipmentGrid (equipment?: Equipment, showEquipment: boolean = true, key?: string) {
    const showPopoverOnHover = !this.props.showMobileStyle
    return (
      <div 
        key={key}
        style={this.props.showMobileStyle
          ? { width: '10%' }
          : { width: 50, height: 50, padding: 8, borderWidth: 0.5, borderStyle: 'solid', borderColor: '#9E9E9E' }
        }
      >
        <div
          key={key}
          style={this.props.showMobileStyle
            ? { width: '100%', paddingTop: '100%', height: 0, borderWidth: 0.5, borderStyle: 'solid', borderColor: '#9E9E9E' }
            : undefined
          }
        >
          {equipment && (
            <Popover
              key={key}
              content={this.renderEquipmentDetail(equipment)}
              overlayInnerStyle={{ padding: 0, backgroundColor: '#212121' }}
              overlayStyle={{ borderRadius: 12, boxShadow: '0px 0px 12px #0005' }}
              trigger={showPopoverOnHover ? 'hover' : 'click'}
              open={showPopoverOnHover ? undefined : false}
              onOpenChange={(visible) => {
                if (visible && !showPopoverOnHover && this.props.onShowDrawer) {
                  this.props.onShowDrawer(this.renderEquipmentDetail(equipment, true))
                }
              }}
            >
              {showEquipment && (
                <img
                  src={equipment.iconUrl}
                  style={
                    this.props.showMobileStyle
                      ? { width: '100%', aspectRatio: 1, marginTop: '-100%', marginBottom: '100%' }
                      : { width: '100%', height: '100%' }
                  }
                />
              )}
            </Popover>
          )}
        </div>
      </div>
    )
  }

  private renderEquipmentDetail (equipment: Equipment, showInModal: boolean = false) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', width: showInModal ? undefined : 320, padding: showInModal ? 24 : 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
          <img
            src={equipment.iconUrl}
            style={{ width: 56, height: 56, marginRight: 8 }}
          />
          <span style={{ fontSize: 24, fontWeight: 'bold', color: '#BDBDBD' }}>{equipment.name}</span>
        </div>
        <span style={{ fontSize: 16, color: '#BDBDBD' }}>{equipment.effect}</span>
      </div>
    )
  }

  private renderEquipments (title: string, equipments: Equipment[]) {
    let children: any[] = []
    let rowChildren: any[] = []
    for (let i = 0; i < equipments.length; i++) {
      const equipment = equipments[i]
      rowChildren.push(this.renderEquipmentGrid(equipment, true, `equip_${title}_${i}`))
      if ((i + 1) % 9 === 0) {
        children.push(
          <div style={{ display: 'flex' }}>{rowChildren}</div>
        )
        rowChildren = []
      } else {

      }
    }
    if (rowChildren.length > 0) {
      children.push(
        <div style={{ display: 'flex' }}>
          {rowChildren}
          <div style={{ flex: 10 - rowChildren.length }}/>
        </div>
      )
    }
    return (
      <div style={{ display: 'flex', flexDirection: 'column', marginTop: 16 }}>
        <span style={{ fontSize: 18, fontWeight: 'bold' }}>{title}</span>
        {children}
      </div>
    )
  }
}
