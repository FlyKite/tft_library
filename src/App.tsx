import { Component } from 'react'
import './App.css'
import RaceJobItem from './RaceJobItem'
import { jobs, races } from './model/RaceJob'
import RaceJobChessItem from './RaceJobChessItem'

interface Props {

}

interface State {
  count: number
}

export default class App extends Component<Props, State> {

  constructor (props: Props) {
    super(props)
    this.state = { count: 0 }
  }

  render () {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div style={{ display: 'flex', width: 128, height: 56, margin: 0.5, backgroundColor: '#424242' }} />
          {jobs.map((job) => {
            return (
              <RaceJobItem
                raceJob={job}
                width={128}
                height={56}
                backgroundColor={'#424242'}
              />
            )
          })}
        </div>
        {races.map((race) => {
          const chessItems = jobs.map((job) => {
            return (
              <RaceJobChessItem
                race={race}
                job={job}
                width={128}
                height={56}
                backgroundColor={'#424242'}
              />
            )
          })
          return (
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <RaceJobItem
                raceJob={race}
                width={128}
                height={56}
                backgroundColor={'#424242'}
              />
              {chessItems}
            </div>
          )
        })}
      </div>
    )
  }
}
