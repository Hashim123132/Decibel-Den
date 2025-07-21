import { Banner, Product, SanityKeyed } from './sanity.types';

export type BannerWithSlug = Omit<Banner, 'product' | 'slides'> & {
  product?: Product;
  slides?: Array<
    SanityKeyed<{
      image?: Banner['image'];
      product?: Product;
      buttonText?: string;
    }>
  >;
};
