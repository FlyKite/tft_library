import { Adventure } from "./Adventure"
import { Chess } from "./Chess"
import { Equipment } from "./Equipment"
import { Hex } from "./Hex"
import { RaceJob } from "./RaceJob"

class DataManager {
  adventures: Adventure[] = []
  chesses: Chess[] = []
  equipments: Equipment[] = []
  equipmentTable: string[][] = []
  hexes: Hex[] = []
  jobs: RaceJob[] = []
  races: RaceJob[] = []

  private initialFetched = false
  private initialFetchPromise?: Promise<void>

  async initialFetch () {
    if (this.initialFetched && this.initialFetchPromise) {
      return this.initialFetchPromise
    }
    this.initialFetched = true
    this.initialFetchPromise = this.initialFetchData()
    return this.initialFetchPromise
  }

  private async initialFetchData () {
    this.adventures = await this.fetchData('./data/adventure.json')
    this.chesses = await this.fetchData('./data/chess.json')
    this.equipments = await this.fetchData('./data/equip.json')
    this.equipmentTable = await this.fetchData('./data/equip_table.json')
    this.hexes = await this.fetchData('./data/hex.json')
    this.jobs = await this.fetchData('./data/job.json')
    this.races = await this.fetchData('./data/race.json')
  }

  private async fetchData (url: string): Promise<any> {
    const response = await fetch(url)
    return await response.json()
  }
}

export default new DataManager()