interface IBook {
  name: string
  url: string
  download: Function
}

interface ISeries {
  name: string
  image?: string
  books: IBook[]
  update: Function;
  loading: Function;
}

interface IItemSeries {
  name: string
  href: string
  image?: string
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
  toSeries?: Function
}

interface IList {
  name: string
  items: IItem[]
  update: Function;
  loading: Function;
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
