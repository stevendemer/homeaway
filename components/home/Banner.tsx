"use client";
import Image from "next/image";
import React from "react";
import Slider from "react-slick";
import { MdArrowBackIosNew } from "react-icons/md";

type Props = {
  className?: string;
  style?: object;
  onClick?: () => void;
};

function PrevArrow(props: Props) {
  const { className, style, onClick } = props;

  return (
    <MdArrowBackIosNew
      className={className}
      onClick={onClick}
      style={{ color: "white", ...style }}
    />
  );
}

function NextArrow(props: Props) {
  const { className, style, onClick } = props;

  return (
    <MdArrowBackIosNew
      className={className}
      style={{ ...style, color: "white", transform: "rotate(180deg)" }}
      onClick={onClick}
    />
  );
}

const Banner = ({ slides }: { slides: string[] }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplaySpeed: 3000,
    cssEase: "linear",
    autoplay: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {slides.map((slide, index) => {
          return (
            <div key={index} className="relative space-x-4 max-w-lg">
              <Image
                className="object-cover object-center rounded-lg w-fit p-2 hover:brightness-50 transition-all ease-in-out duration-300 transform cursor-pointer"
                src={slide}
                alt="slide image"
                quality={100}
                priority
                width={300}
                height={200}
              />
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default Banner;
