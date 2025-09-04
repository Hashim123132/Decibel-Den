"use client";

import Image from "next/image";
import Link from "next/link";
import { urlFor } from "../sanity/lib/client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Banner as BannerType } from "../sanity.types";

type Props = {
  banners: BannerType[];
};

const HeroCarousel = ({ banners }: Props) => {
  return (
    <Swiper
      modules={[Autoplay, Pagination, Navigation]}
      spaceBetween={30}
      centeredSlides
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      navigation
      className="w-full"
    >
      {banners.map((banner, i) => {
        // Ensure image exists for TypeScript
        if (!banner.image) return null;
       
        const product = banner.product as unknown as { slug: { current: string } } | undefined;
        const productSlug = product?.slug?.current;
        
        return (
          <SwiperSlide key={i}>
            <div className="flex flex-col md:flex-row items-center justify-between p-6 md:p-12 rounded-lg shadow-lg overflow-visible">
              
              {/* Left: Text + Button */}
              <div className="flex-1 text-center md:text-left mb-6 md:mb-0">
                <p className="text-sm text-black font-semibold">{banner.smallText}</p>
                <h3 className="text-xl md:text-2xl font-medium mt-1">{banner.midText}</h3>
                <h1 className="text-3xl md:text-5xl font-bold mt-2">{banner.largeText1}</h1>

                <div className="mt-4">
                  
                 <Link href={productSlug ? `/product/${productSlug}` : '#'}>
                    <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                      {banner.buttonText}
                    </button>
                  </Link>
                </div>
              </div>

              {/* Middle: Image */}
              <div className="flex-1 relative w-full h-64 md:h-96">
                <Image
                  src={urlFor(banner.image).url()}
                  alt="banner image"
                  fill
                  className="object-contain"
                />
              </div>

              {/* Right: Description pushed to bottom using flex */}
              <div className="flex-1 md:ml-8 flex flex-col justify-end h-64 md:h-96 text-right -mt-32">
                <h5 className="font-semibold ">Description</h5>
                <p className="text-gray-700 ">{banner.desc}</p>
              </div>

            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default HeroCarousel;
