import { Component } from 'react'
import { Chess, ChessImageType, getChessImage } from '../../model/Chess'
import { RaceJob, jobs, races } from '../../model/RaceJob'
import { ConfigProvider, Descriptions } from 'antd'

interface Props {
  chess: Chess
  showInModal?: boolean
}

export default class ChessDetailComponent extends Component<Props> {
  render () {
    const { chess, showInModal } = this.props
    const imageWidth = showInModal ? '100%' : 360
    const raceJobs: RaceJob[] = []
    for (const info of chess.races) {
      const race = races.find((race) => race.id === info.id)
      if (race) {
        raceJobs.push(race)
      }
    }
    for (const info of chess.jobs) {
      const job = jobs.find((job) => job.id === info.id)
      if (job) {
        raceJobs.push(job)
      }
    }
    return (
      <div style={{ display: 'flex', flexDirection: 'column', borderRadius: 12, width: imageWidth }}>
        <div style={{ position: 'relative', width: imageWidth, aspectRatio: 624 / 318 }}>
          <img
            src={getChessImage(chess.imageId, ChessImageType.full)}
            style={{ position: 'absolute', width: imageWidth, aspectRatio: 624 / 318, borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
          />
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 56, background: 'linear-gradient(#0000, #000A)'}}></div>
          <div style={{ position: 'absolute', left: 20, bottom: 16, display: 'flex', flexDirection: 'column' }}>
            {raceJobs.map((raceJob) => {
              return (
                <div key={`chess_race_job_${raceJob.id}`} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                  <img
                    className={'white_icon'}
                    src={raceJob.iconUrl}
                    style={{ width: 16, height: 16, marginRight: 4 }}
                  />
                  <span style={{ fontSize: 15, color: 'white' }}>{raceJob.name}</span>
                </div>
              )
            })}
            <span style={{ fontSize: 20, fontWeight: 'bold', color: 'white', marginTop: 8 }}>{chess.name}</span>
          </div>
        </div>
        <ConfigProvider
          theme={{
            token: { colorSplit: '#62626262' }
          }}
        >
          <Descriptions
            layout={'vertical'}
            column={3}
            bordered
            size={'small'}
            style={{
              margin: 16,
              width: showInModal ? undefined : 328,
              alignSelf: 'stretch'
            }}
            labelStyle={{ fontSize: 12, fontWeight: 'bold', color: '#9E9E9E', textAlign: 'center' }}
            contentStyle={{ fontSize: 13, color: '#BDBDBD' }}
            items={[
              { label: '生命', children: chess.life.value },
              { label: '护甲', children: chess.life.armor },
              { label: '魔抗', children: chess.life.spellBlock },
              { label: '攻击', children: chess.attack.value },
              { label: '攻速', children: chess.attack.speed },
              { label: '暴击', children: chess.critRate },
              { label: '攻击距离', children: chess.attack.range },
              { label: '初始法力值', children: chess.skill.startMagic || '0' },
              { label: '最大法力值', children: chess.skill.magic || '0' }
            ]}
          />
        </ConfigProvider>
        <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: 16, paddingRight: 16, paddingBottom: 16, marginBottom: 'env(safe-area-inset-bottom)' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 6 }}>
            <img
              src={chess.skill.iconUrl}
              style={{ width: 24, height: 24, marginRight: 8 }}
            />
            <span style={{ fontSize: 20, fontWeight: 'bold', color: '#BDBDBD' }}>{chess.skill.name}</span>
          </div>
          <span style={{ fontSize: 13, color: '#BDBDBD' }}>{chess.skill.detail}</span>
        </div>
      </div>
    )
  }
}
