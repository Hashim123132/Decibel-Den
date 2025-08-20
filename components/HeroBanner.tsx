import HeroCarousel from "./HeroCarousel";

type Banner = {
  image: any;
  buttonText: string;
  product?: { slug?: { current: string } };
  desc: string;
  smallText: string;
  midText: string;
  largeText1: string;
  largeText2: string;
  discount: string;
  saleTime: string;
};

type Props = {
  heroCarousel: {
    title: string;
    banners: Banner[];
  } | null;
};

const HeroBanner = ({ heroCarousel }: Props) => {
  if (!heroCarousel) return null;

  return (
    <section className="hero-banner-container my-6">
      <HeroCarousel banners={heroCarousel.banners} />
    </section>
  );
};

export default HeroBanner;
