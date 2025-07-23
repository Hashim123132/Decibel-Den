import type { Banner } from '../sanity.types';

export interface BannerWithSlug extends Omit<Banner, 'product'> {
  product: {
    slug: {
      current: string;
    };
  };
}