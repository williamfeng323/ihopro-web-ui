import { initialDate } from '../../../../shared/utils';
export class Geographic {
  id: string;
  countryCode: string;
  cityCode: string;
  countryNameEn: string;
  countryNameZh: string;
  cityNameEn: string;
  cityNameZh: string;
  lastUpdateAt: Date|void;

  constructor( obj?: any ) {
    this.id = obj && obj.id;
    this.countryCode = obj && obj.country_code;
    this.cityCode = obj && obj.city_code;
    this.countryNameEn = obj && obj.country_name_en;
    this.countryNameZh = obj && obj.country_name_zh;
    this.cityNameEn = obj && obj.city_name_en;
    this.cityNameZh = obj && obj.city_name_zh;
    this.lastUpdateAt = initialDate(obj && obj.last_update_at);
  }
}
