import { ValueNotifier } from "../components/ValueNotify"
import { Adventure } from "./Adventure"
import { Chess } from "./Chess"
import { Equipment } from "./Equipment"
import { Hex } from "./Hex"
import { RaceJob } from "./RaceJob"

export enum LoadingStatus {
  initial,
  loading,
  completed,
  failed
}

export enum DataSetType {
  chessRaceJob,
  enhancements,
  equipments
}

class DataManager {
  adventures: Adventure[] = []
  chesses: Chess[] = []
  equipments: Equipment[] = []
  equipmentTable: string[][] = []
  hexes: Hex[] = []
  jobs: RaceJob[] = []
  races: RaceJob[] = []

  loadingStatusMap = new Map<DataSetType, ValueNotifier<LoadingStatus>>([
    [DataSetType.chessRaceJob, new ValueNotifier<LoadingStatus>(LoadingStatus.initial)],
    [DataSetType.enhancements, new ValueNotifier<LoadingStatus>(LoadingStatus.initial)],
    [DataSetType.equipments, new ValueNotifier<LoadingStatus>(LoadingStatus.initial)]
  ])
  private fetchingPromiseMap = new Map<DataSetType, Promise<void>>()

  initialFetch () {
    this.fetchDataSet(DataSetType.chessRaceJob)
    this.fetchDataSet(DataSetType.enhancements)
    this.fetchDataSet(DataSetType.equipments)
  }

  async fetchDataSet (type: DataSetType, refresh: boolean = false): Promise<void> {
    const loadingStatusNotifier = this.loadingStatusMap.get(type)!
    if (!refresh && loadingStatusNotifier.value === LoadingStatus.completed) {
      return
    }
    const promise = this.fetchingPromiseMap.get(type)
    if (promise) {
      return promise
    }
    const newPromise = new Promise<void>(async (resolve) => {
      try {
        const urls = this.getFetchUrls(type)
        const results = await Promise.all<any>(urls.map((url) => this.fetchData(url)))
        this.setData(type, results)
        this.fetchingPromiseMap.delete(type)
        loadingStatusNotifier.value = LoadingStatus.completed
        resolve()
      } catch (e) {
        loadingStatusNotifier.value = LoadingStatus.failed
        resolve()
      }
    })
    loadingStatusNotifier.value = LoadingStatus.loading
    this.fetchingPromiseMap.set(type, newPromise)
  }

  private getFetchUrls (type: DataSetType): string[] {
    switch (type) {
      case DataSetType.chessRaceJob: return ['./data/chess.json', './data/job.json', './data/race.json']
      case DataSetType.enhancements: return ['./data/adventure.json', './data/hex.json']
      case DataSetType.equipments: return ['./data/equip.json', './data/equip_table.json']
    }
  }

  private setData (type: DataSetType, results: any[]) {
    switch (type) {
      case DataSetType.chessRaceJob:
        this.chesses = results[0]
        this.jobs = results[1]
        this.races = results[2]
        break
      case DataSetType.enhancements:
        this.adventures = results[0]
        this.hexes = results[1]
        break
      case DataSetType.equipments:
        this.equipments = results[0]
        this.equipmentTable = results[1]
        break
    }
  }

  private async fetchData (url: string): Promise<any> {
    const response = await fetch(url)
    return await response.json()
  }
}

export default new DataManager()