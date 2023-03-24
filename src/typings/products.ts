export interface Attributes {
  color: string;
  color_code: string;
  color_name: string;
  memory: string;
  handset_cat_promotion_sticker: string | null;
  promotion_label: string;
  promotion_slider_source: string;
  handset_cat_promotion_sticker_kz: string | null;
  promotion_label_kz: string | null;
  promotion_slider_source_kz: string | null;
  promotion_bg_color_kz: string | null;
}

export interface Variant {
  id: number;
  name: string;
  slug: string;
  next_ship_date: string;
  usp_offer: string;
  attributes: Attributes;
  ui_suggested_sort_order: number;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  manufacturer: string;
  model: string;
  operating_system: string;
  sim_card_capacity: string;
  refurbished: boolean;
  has_usp: boolean;
  has_5g: boolean;
  has_esim: boolean;
  colors: string[];
  sort_order: number;
  release_date: string;
  default: string;
  variants: Variant[];
  attributes: Attributes[];
  has_promotion: boolean;
}

export type Products = Product[];