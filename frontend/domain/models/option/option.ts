export class PageNumber {
  num: number

  constructor(
    public page: number
  ) {
    if (typeof page === 'string' && /^\d+$/.test(page)) {
      this.num = parseInt(page, 10)
    }
    if (typeof page === 'number' && page > 0) {
      this.num = page
    }
    this.num = 1
  }
}

export class OptionItem {
  constructor(
    public page: number,
    public q?: string,
    public filter?: string
  ) { }

  static valueOf(
    { page, q = '', filter = '' }:
      { page: number, q?: string, filter?: string }
  ): OptionItem {
    return new OptionItem(page, q, filter)
  }

  toObject(): Object {
    return {
      page: this.page,
      q: this.q,
      filter: this.filter
    }
  }
}
