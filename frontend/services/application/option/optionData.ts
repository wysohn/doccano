import { OptionItem } from '~/domain/models/option/option'


export class OptionDTO {
  page: number;
  q?: string;
  filter?: string;

  constructor(item: OptionItem) {
    this.page = item.page;
    this.q = item.q;
    this.filter = item.filter;
  }
}
