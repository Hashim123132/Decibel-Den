import type {
  SanityReference,
  SanityKeyedReference,
  SanityAsset,
  SanityImage,
  SanityFile,
  SanityGeoPoint,
  SanityBlock,
  SanityDocument,
  SanityImageCrop,
  SanityImageHotspot,
  SanityKeyed,
  SanityImageAsset,
  SanityImageMetadata,
  SanityImageDimensions,
  SanityImagePalette,
  SanityImagePaletteSwatch,
} from "sanity-codegen";

export type {
  SanityReference,
  SanityKeyedReference,
  SanityAsset,
  SanityImage,
  SanityFile,
  SanityGeoPoint,
  SanityBlock,
  SanityDocument,
  SanityImageCrop,
  SanityImageHotspot,
  SanityKeyed,
  SanityImageAsset,
  SanityImageMetadata,
  SanityImageDimensions,
  SanityImagePalette,
  SanityImagePaletteSwatch,
};

/**
 * product
 *
 *
 */
export interface Product extends SanityDocument {
  _type: "product";

  /**
   * Image — `array`
   *
   *
   */
  image?: Array<
    SanityKeyed<{
      _type: "image";
      asset: SanityReference<SanityImageAsset>;
      crop?: SanityImageCrop;
      hotspot?: SanityImageHotspot;
    }>
  >;

  /**
   * Name — `string`
   *
   *
   */
  name?: string;

  /**
   * Slug — `slug`
   *
   *
   */
  slug?: { _type: "slug"; current: string };

  /**
   * Price — `number`
   *
   *
   */
  price?: number;

  /**
   * Details — `string`
   *
   *
   */
  details?: string;
}

/**
 * Banner
 *
 *
 */
export interface Banner extends SanityDocument {
  _type: "banner";

  /**
   * Image — `image`
   *
   *
   */
  image?: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };

  /**
   * Images — `array`
   *
   *
   */
  images?: Array<
    SanityKeyed<{
      _type: "image";
      asset: SanityReference<SanityImageAsset>;
      crop?: SanityImageCrop;
      hotspot?: SanityImageHotspot;
    }>
  >;

  /**
   * Button Text — `string`
   *
   *
   */
  buttonText?: string;

  /**
   * Slides — `array`
   *
   *
   */
  slides?: Array<
    SanityKeyed<{
      /**
       * image — `image`
       *
       *
       */
      image?: {
        _type: "image";
        asset: SanityReference<SanityImageAsset>;
        crop?: SanityImageCrop;
        hotspot?: SanityImageHotspot;
      };

      /**
       * product — `reference`
       *
       *
       */
      product?: SanityReference<Product>;

      /**
       * Button Text — `string`
       *
       *
       */
      buttonText?: string;
    }>
  >;

  /**
   * Description — `string`
   *
   *
   */
  desc?: string;

  /**
   * Small Text — `string`
   *
   *
   */
  smallText?: string;

  /**
   * Mid Text — `string`
   *
   *
   */
  midText?: string;

  /**
   * Large Text 1 — `string`
   *
   *
   */
  largeText1?: string;

  /**
   * Large Text 2 — `string`
   *
   *
   */
  largeText2?: string;

  /**
   * Discount — `string`
   *
   *
   */
  discount?: string;

  /**
   * Sale Time — `string`
   *
   *
   */
  saleTime?: string;
}

export type Documents = Product | Banner;
