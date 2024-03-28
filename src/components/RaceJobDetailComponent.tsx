import { Component } from 'react'
import { RaceJob, getRaceJobLevelBorderColor, getRaceJobLevelColor } from '../model/RaceJob'

interface Props {
  raceJob: RaceJob
  width?: string | number
  hideTitle?: boolean
}

export default class RaceJobDetailComponent extends Component<Props> {
  render () {
    const { raceJob, width, hideTitle } = this.props
    return (
      <div style={{ display: 'flex', flexDirection: 'column', width: width }}>
        {hideTitle !== true && (<span style={{ fontSize: 24, fontWeight: 'bold', color: '#212121', marginBottom: 12 }}>{raceJob.name}</span>)}
        <span style={{ fontSize: 16, color: '#212121' }}>{raceJob.introduce}</span>
        {raceJob.levels.map((level, index) => {
          return (
            <div key={`race_job_level_${level.chessCount}`} style={{ display: 'flex', alignItems: 'flex-start', marginTop: index === 0 ? 12 : 8 }}>
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
