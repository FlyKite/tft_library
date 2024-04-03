import { Component } from 'react'
import { RaceJob } from '../model/RaceJob'
import RaceJobItem, { RaceJobItemType } from '../components/RaceJobTable/RaceJobItem'
import RaceJobChessItem from '../components/RaceJobTable/RaceJobChessItem'
import RaceJobDetailComponent from '../components/RaceJobTable/RaceJobDetailComponent'
import ChessDetailComponent from '../components/RaceJobTable/ChessDetailComponent'
import { Chess } from '../model/Chess'
import DataManager from '../model/DataManager'

interface Props {
  showMobileStyle: boolean
  onShowDrawer?: (children: React.ReactNode) => void
}

export default class RaceJobTablePage extends Component<Props> {

  private showRaceHeader = false
  private raceHeaderRef: HTMLDivElement | null = null

  componentDidMount () {
    window.addEventListener('scroll', this.onWindowScroll)
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.onWindowScroll)
  }

  onContainerScroll (container: HTMLDivElement) {
    const { scrollTop, scrollLeft } = container
    this.handleScrollEvent(scrollLeft, scrollTop)
  }

  private onWindowScroll = () => {
    this.handleScrollEvent(window.scrollX, window.scrollY)
  }

  private handleScrollEvent (scrollX: number, scrollY: number) {
    const showRaceHeader = scrollX >= 72
    let needsUpdate = false
    if (this.showRaceHeader !== showRaceHeader) {
      this.showRaceHeader = showRaceHeader
      needsUpdate = true
    }
    if (showRaceHeader && this.raceHeaderRef) {
      needsUpdate = true
    }
    if (needsUpdate) {
      this.raceHeaderRef?.setAttribute('style', `display: ${showRaceHeader ? 'flex' : 'none'}; margin-top: ${-scrollY}px;`)
    }
  }

  render () {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <RaceJobItem />
          {DataManager.jobs.map((job) => {
            return (
              <RaceJobItem
                key={`job_${job.id}`}
                raceJob={job}
                showPopoverOnHover={!this.props.showMobileStyle}
                onClick={this.showRaceJobDetailModal}
              />
            )
          })}
        </div>
        {DataManager.races.map((race, index) => {
          const chessItems = DataManager.jobs.map((job) => {
            return (
              <RaceJobChessItem
                key={`race_job_chess_${race.id}_${job.id}`}
                race={race}
                job={job}
                showPopoverOnHover={!this.props.showMobileStyle}
                onClick={this.showChessDetailModal}
              />
            )
          })
          return (
            <div key={`race_job_row_${index}`} style={{ display: 'flex', flexDirection: 'row' }}>
              <RaceJobItem
                raceJob={race}
                showPopoverOnHover={!this.props.showMobileStyle}
                onClick={this.showRaceJobDetailModal}
              />
              {chessItems}
            </div>
          )
        })}
        {this.props.showMobileStyle && (
          <div
            ref={(ref) => { this.raceHeaderRef = ref }}
            className={'race_header'}
          >
            <RaceJobItem itemType={RaceJobItemType.small}/>
            {DataManager.races.map((race) => {
              return (
                <RaceJobItem
                  key={`race_${race.id}`}
                  raceJob={race}
                  itemType={RaceJobItemType.small}
                  showPopoverOnHover={!this.props.showMobileStyle}
                  onClick={this.showRaceJobDetailModal}
                />
              )
            })}
          </div>
        )}
      </div>
    )
  }

  private showRaceJobDetailModal = (raceJob: RaceJob) => {
    this.props.onShowDrawer && this.props.onShowDrawer((
      <RaceJobDetailComponent
        raceJob={raceJob}
      />
    ))
  }

  private showChessDetailModal = (chess: Chess) => {
    this.props.onShowDrawer && this.props.onShowDrawer((
      <ChessDetailComponent
        chess={chess}
        showInModal
      />
    ))
  }
}
