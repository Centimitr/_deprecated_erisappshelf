interface IBook {
  name: string
  save: (string) => Promise<void>
}

interface ISeries {
  name: string
  image?: string
  books: IBook[]
  update: Function;
}

interface IItemSeries {
  name: string
  href: string
}

interface IItemBook {
  name: string
  href: string
}

interface IItemOther {
  text: string
}

interface IItem {
  series: IItemSeries
  book: IItemBook
  other: IItemOther
}

interface IList {
  name: string
  items: IItem[]
  update: Function;
}

interface ISource {
  name: string
  image?: string
  lists: IList[]
}

export {
  IBook,
  ISeries,
  IItem,
  IItemSeries,
  IItemBook,
  IItemOther,
  IList,
  ISource
}
