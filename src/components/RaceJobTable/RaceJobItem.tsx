import { Component } from 'react'
import { RaceJob } from '../../model/RaceJob'
import { ConfigProvider, Popover } from 'antd'
import RaceJobDetailComponent from './RaceJobDetailComponent'

export enum RaceJobItemType {
  normal,
  small
}

export enum TriggerType {
  hover = 'hover',
  click = 'click'
}

interface Props {
  raceJob?: RaceJob
  itemType?: RaceJobItemType
  showPopoverOnHover?: boolean
  onClick?: (raceJob: RaceJob) => void
}

export default class RaceJobItem extends Component<Props> {
  render () {
    const { raceJob, itemType, showPopoverOnHover, onClick } = this.props
    const isSmallStyle = itemType === RaceJobItemType.small
    const style = isSmallStyle ? { width: 56 } : undefined
    if (!raceJob) {
      return (
        <div className={'race_job_item'} style={style}/>
      )
    }
    const showCount = raceJob.levels.length > 1 && raceJob.levels[0].chessCount > 1
    return (
      <ConfigProvider
        theme={{
          token: {
            borderRadius: 12
          }
        }}
      >
        <Popover
          content={this.renderRaceJobDetail(raceJob)}
          overlayInnerStyle={{ padding: 0, backgroundColor: '#212121' }}
          overlayStyle={{ borderRadius: 12, boxShadow: '0px 0px 12px #0005' }}
          trigger={showPopoverOnHover ? 'hover' : 'click'}
          open={showPopoverOnHover ? undefined : false}
          onOpenChange={(visible) => {
            if (visible && !showPopoverOnHover) {
              onClick && onClick(raceJob)
            }
          }}
        >
          <div className={'race_job_item'} style={style}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img
                className={'white_icon'}
                src={raceJob.iconUrl}
                style={{ width: 16, height: 16 }}
              />
              {!isSmallStyle && (<span style={{ fontSize: 17, fontWeight: 'bold', color: 'white', marginLeft: 4 }}>{raceJob.name}</span>)}
            </div>
            {showCount && !isSmallStyle && (<span style={{ fontSize: 13, color: '#9E9E9E'}}>{raceJob.levels.map((e) => e.chessCount).join('/')}</span>)}
          </div>
        </Popover>
      </ConfigProvider>
    )
  }

  private renderRaceJobDetail (raceJob: RaceJob) {
    return (
      <RaceJobDetailComponent
        raceJob={raceJob}
        width={320}
        hideTitle
      />
    )
  }
}
