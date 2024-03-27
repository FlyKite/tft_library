import { Component } from 'react'
import { RaceJob, getRaceJobLevelBorderColor, getRaceJobLevelColor } from './model/RaceJob'
import { Popover } from 'antd'

interface Props {
  raceJob: RaceJob
  width: number
  height: number
  backgroundColor: string
}
export default class RaceJobItem extends Component<Props> {
  render () {
    const { raceJob, width, height, backgroundColor } = this.props
    const showCount = raceJob.levels.length > 1 && raceJob.levels[0].chessCount > 1
    return (
      <Popover
        content={this.renderRaceJobDetail(raceJob)}
        overlayInnerStyle={{ padding: 0 }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', width, height, backgroundColor, margin: 0.5, alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img
              className={'white_icon'}
              src={raceJob.iconUrl}
              style={{ width: 16, height: 16 }}
            />
            <span style={{ fontSize: 17, fontWeight: 'bold', color: 'white', marginLeft: 4 }}>{raceJob.name}</span>
          </div>
          {showCount && (<span style={{ fontSize: 13, color: '#9E9E9E'}}>{raceJob.levels.map((e) => e.chessCount).join('/')}</span>)}
        </div>
      </Popover>
    )
  }

  private renderRaceJobDetail (raceJob: RaceJob) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', width: 320, padding: 16 }}>
        <span style={{ fontSize: 16, color: '#212121' }}>{raceJob.introduce}</span>
        {raceJob.levels.map((level, index) => {
          return (
            <div style={{ display: 'flex', alignItems: 'flex-start', marginTop: index === 0 ? 12 : 8 }}>
              <div style={{ display: 'flex', width: 20, height: 20, marginRight: 4, backgroundColor: getRaceJobLevelColor(level.color), borderColor: getRaceJobLevelBorderColor(level.color), borderStyle: 'solid', borderWidth: 0.5, justifyContent: 'center' }}>
                <span style={{ fontSize: 13, fontWeight: 'bold', color: 'white', textAlign: 'center' }}>{level.chessCount}</span>
              </div>
              <span style={{ flex: 1, fontSize: 15, lineHeight: '20px', color: '#616161' }}>{level.description}</span>
            </div>
          )
        })}
      </div>
    )
  }
}
