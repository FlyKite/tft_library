import { Component } from 'react'
import { RaceJob } from '../../model/RaceJob'
import { Chess, ChessImageType, getBorderColor, getChessImage } from '../../model/Chess'
import { ConfigProvider, Popover } from 'antd'
import ChessDetailComponent from './ChessDetailComponent'
import DataManager from '../../model/DataManager'

interface Props {
  race: RaceJob
  job: RaceJob
  showPopoverOnHover?: boolean
  onClick?: (chess: Chess) => void
}

export default class RaceJobChessItem extends Component<Props> {
  render () {
    const { race, job, showPopoverOnHover, onClick } = this.props
    const matchedChesses = DataManager.chesses.filter((chess) => {
      return chess.races.findIndex((e) => e.id === race.id) !== -1 && chess.jobs.findIndex((e) => e.id === job.id) !== -1
    })
    return (
      <div className={'race_job_item'} style={{ flexDirection: 'row' }}>
        {matchedChesses.map((chess, index) => {
          const borderColor = getBorderColor(chess.price)
          const marginLeft = index === 0 ? 0 : 4
          return (
            <ConfigProvider
              theme={{
                token: {
                  borderRadius: 12
                }
              }}
            >
              <Popover
                key={`race_job_chess_${index}`}
                content={this.renderChessCard(chess)}
                overlayInnerStyle={{ padding: 0, backgroundColor: '#212121' }}
                overlayStyle={{ borderRadius: 12, boxShadow: '0px 0px 12px #0005' }}
                trigger={showPopoverOnHover ? 'hover' : 'click'}
                open={showPopoverOnHover ? undefined : false}
                onOpenChange={(visible) => {
                  if (visible && !showPopoverOnHover) {
                    onClick && onClick(chess)
                  }
                }}
              >
                <img
                  src={getChessImage(chess.imageId, ChessImageType.head)}
                  width={34}
                  height={34}
                  style={{ borderRadius: 18, borderWidth: 2, borderColor, borderStyle: 'solid', marginLeft }}
                />
              </Popover>
            </ConfigProvider>
          )
        })}
      </div>
    )
  }

  private renderChessCard (chess: Chess) {
    return (
      <div style={{ width: 360, maxHeight: 466, overflow: 'scroll' }}>
        <ChessDetailComponent chess={chess}/>
      </div>
    )
  }
}
