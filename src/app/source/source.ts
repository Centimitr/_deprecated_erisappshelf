export interface IBook {
  name: string
  save: (string) => Promise<void>
}

export interface ISeries {
  name: string
  image?: string
  books: () => Promise<IBook[]>
}

export interface IList {
  name: string
  items: () => Promise<ISeries[]>
}

export interface ISource {
  name: string
  image?: string
  lists: () => Promise<IList[]>
}
