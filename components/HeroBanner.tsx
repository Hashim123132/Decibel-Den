import HeroCarousel from "./HeroCarousel";
import { HeroCarousel as HeroCarouselType, Banner as BannerType } from "../sanity.types";

type Props = {
  heroCarousel: HeroCarouselType | null;
};

const HeroBanner = ({ heroCarousel }: Props) => {
  if (!heroCarousel || !heroCarousel.banners) return null;

  // Force TypeScript to treat resolved references as actual Banner objects
  const banners: BannerType[] = heroCarousel.banners.map((b) => b as unknown as BannerType);

  return (
    <section className="hero-banner-container my-6">
      <HeroCarousel banners={banners} />
    </section>
  );
};

export default HeroBanner;
