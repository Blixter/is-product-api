export interface IDefaultValues {
  _index: string;
  _type: string;
  _id: string;
  _score: number;
}

export interface ISaldo {
  quantityAvailable: string;
  store: string;
  instock: string;
}

export interface IPrice {
  campaigndescription: string;
  salescontroltype: string;
  regularprice: string;
  campaignid: string;
  price: string;
  pricetype: string;
  campaigntag: string;
  salescontroldescription: string;
}

export interface ISize extends IDefaultValues {
  _routing: string;
  _source: ISizeSource;
  inner_hits: any;
}

export interface ISizeSource {
  filterkey: string;
  itemnumber: string;
  itemskusizeid: string;
  filtervalue: string;
  itemskusizename: string;
  itemskusizename_urlslug: string;
  itemskunumber: string;
  documenttype: ISkuDocumentType;
  itemskusizesort: string;
  skuitemurl: string;
  _indextime: string;
  itemskuean: string;
}

export interface IReturnedSizes extends ISizeSource {
  saldo?: ISaldo;
}

export interface ISkuDocumentType {
  name: string;
  parent: string;
}
