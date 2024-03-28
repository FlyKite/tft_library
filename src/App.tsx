import { Component } from 'react'
import './App.css'
import RaceJobItem, { RaceJobItemType } from './components/RaceJobItem'
import { RaceJob, jobs, races } from './model/RaceJob'
import RaceJobChessItem from './components/RaceJobChessItem'
import { ValueListenable2Builder, ValueListenableBuilder, ValueNotifier } from './components/ValueNotify'
import { Drawer } from 'antd'
import { Chess } from './model/Chess'
import RaceJobDetailComponent from './components/RaceJobDetailComponent'
import ChessDetailComponent from './components/ChessDetailComponent'

interface Props {

}

interface State {
  showMobileStyle: boolean
}

export default class App extends Component<Props, State> {

  private showRaceHeader = new ValueNotifier<boolean>(false)
  private raceHeaderRef: HTMLDivElement | null = null
  private raceHeaderTop = new ValueNotifier<number>(0)

  private raceJobModalOpen = new ValueNotifier<boolean>(false)
  private raceJobModalData = new ValueNotifier<RaceJob | undefined>(undefined)

  private chessModalOpen = new ValueNotifier<boolean>(false)
  private chessModalData = new ValueNotifier<Chess | undefined>(undefined)

  constructor (props: Props) {
    super(props)
    this.state = { showMobileStyle: window.innerWidth < 500 }
  }

  componentDidMount () {
    window.addEventListener('resize', this.onWindowSizeChanged)
    window.addEventListener('scroll', this.onWindowScroll)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.onWindowSizeChanged)
    window.removeEventListener('scroll', this.onWindowScroll)
  }

  private onWindowSizeChanged = () => {
    const showMobileStyle = window.innerWidth < 500
    if (this.state.showMobileStyle !== showMobileStyle) {
      this.setState({ showMobileStyle })
    }
  }

  private onWindowScroll = () => {
    const showRaceHeader = window.scrollX >= 72
    if (this.showRaceHeader.value !== showRaceHeader) {
      this.showRaceHeader.value = showRaceHeader
    }
    if (showRaceHeader && this.raceHeaderRef) {
      // const style = this.raceHeaderRef.style
      // style.top = -window.scrollY + ''
      // this.raceHeaderRef.setAttribute('style', style.all)
      this.raceHeaderTop.value = -window.scrollY
    }
  }

  render () {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <RaceJobItem />
          {jobs.map((job) => {
            return (
              <RaceJobItem
                key={`job_${job.id}`}
                raceJob={job}
                showPopoverOnHover={!this.state.showMobileStyle}
                onClick={this.showRaceJobDetailModal}
              />
            )
          })}
        </div>
        {races.map((race, index) => {
          const chessItems = jobs.map((job) => {
            return (
              <RaceJobChessItem
                key={`race_job_chess_${race.id}_${job.id}`}
                race={race}
                job={job}
                showPopoverOnHover={!this.state.showMobileStyle}
                onClick={this.showChessDetailModal}
              />
            )
          })
          return (
            <div key={`race_job_row_${index}`} style={{ display: 'flex', flexDirection: 'row' }}>
              <RaceJobItem
                raceJob={race}
                showPopoverOnHover={!this.state.showMobileStyle}
                onClick={this.showRaceJobDetailModal}
              />
              {chessItems}
            </div>
          )
        })}
        {this.state.showMobileStyle && (
          <ValueListenable2Builder
            listenTo={{ notifier1: this.showRaceHeader, notifier2: this.raceHeaderTop }}
            renderChildren={(showRaceHeader, raceHeaderTop) => {
              return (
                <div style={{ display: showRaceHeader ? 'flex' : 'none', flexDirection: 'column', position: 'fixed', top: raceHeaderTop, left: 0 }} ref={(ref) => { this.raceHeaderRef = ref }}>
                  <RaceJobItem itemType={RaceJobItemType.small}/>
                  {races.map((race) => {
                    return (
                      <RaceJobItem
                        key={`race_${race.id}`}
                        raceJob={race}
                        itemType={RaceJobItemType.small}
                        showPopoverOnHover={!this.state.showMobileStyle}
                        onClick={this.showRaceJobDetailModal}
                      />
                    )
                  })}
                </div>
              )
            }}
          />
        )}
        {this.renderRaceJobDetailModal()}
        {this.renderChessDetailModal()}
      </div>
    )
  }

  private renderRaceJobDetailModal () {
    return (
      <ValueListenableBuilder
        listenTo={this.raceJobModalOpen}
        renderChildren={(open) => {
          return (
            <Drawer
              placement={'bottom'}
              closable={false}
              open={open}
              onClose={() => {
                this.raceJobModalOpen.value = false
              }}
              style={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
            >
              <ValueListenableBuilder
                listenTo={this.raceJobModalData}
                renderChildren={(raceJob) => {
                  if (!raceJob) return <div/>
                  return (
                    <RaceJobDetailComponent
                      raceJob={raceJob}
                      width={'100%'}
                    />
                  )
                }}
              />
            </Drawer>
          )
        }}
      />
    )
  }

  private renderChessDetailModal () {
    return (
      <ValueListenableBuilder
        listenTo={this.chessModalOpen}
        renderChildren={(open) => {
          return (
            <Drawer
              placement={'bottom'}
              closable={false}
              open={open}
              onClose={() => {
                this.chessModalOpen.value = false
              }}
              style={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
              styles={{
                body: { padding: 0 }
              }}
            >
              <ValueListenableBuilder
                listenTo={this.chessModalData}
                renderChildren={(chess) => {
                  if (!chess) return <div/>
                  return (
                    <ChessDetailComponent
                      chess={chess}
                      showInModal
                    />
                  )
                }}
              />
            </Drawer>
          )
        }}
      />
    )
  }

  private showRaceJobDetailModal = (raceJob: RaceJob) => {
    this.raceJobModalData.value = raceJob
    this.raceJobModalOpen.value = true
  }

  private showChessDetailModal = (chess: Chess) => {
    this.chessModalData.value = chess
    this.chessModalOpen.value = true
  }
}
