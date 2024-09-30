"use client";
import "@/styles/swiper.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import { Carousel } from "@/lib/material-ui";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { useWindowSize } from "@uidotdev/usehooks";
import { Device } from "@/helpers";
import Link from "next/link";

export const ContentAlignment = {
  TOP_LEFT: "top_left",
  TOP_CENTER: "top_center",
  TOP_RIGHT: "top_right",
  MIDDLE_LEFT: "middle_left",
  MIDDLE_CENTER: "middle_center",
  MIDDLE_RIGHT: "middle_right",
  BOTTOM_LEFT: "bottom_left",
  BOTTOM_CENTER: "bottom_center",
  BOTTOM_RIGHT: "bottom_right",
};

const Slideshow = ({
  childrens = [],
  loop,
  slider_height = 700,
  autoplay = false,
  autoplay_delay = 3000,
  show_navigation = false,
  show_pagination = false,
  mobile_slider_height = 300,
}) => {
  const { width } = useWindowSize();

  return (
    <Swiper
      autoplay={
        autoplay
          ? {
              delay: autoplay_delay,
              pauseOnMouseEnter: true,
            }
          : false
      }
      pagination={{
        enabled: show_pagination && childrens.length < 2,
        clickable: true,
      }}
      navigation={{
        prevEl: ".slide-prev-btn",
        nextEl: ".slide-next-btn",
      }}
      loop={loop}
      modules={[Autoplay, Pagination, Navigation]}
      wrapperClass="relative"
    >
      <button
        className={classNames("slide-next-btn", {
          hidden: childrens.length < 2 || !show_navigation,
        })}
      >
        <ChevronLeftIcon className="size-8" />
      </button>
      <button
        className={classNames("slide-prev-btn", {
          hidden: childrens.length < 2 || !show_navigation,
        })}
      >
        <ChevronRightIcon className="size-8" />
      </button>
      {childrens.map((slide, key) => {
        return (
          <SwiperSlide
            className={`relative h-full w-full`}
            style={{
              height: `${
                Device(width).UNTIL_MD ? mobile_slider_height : slider_height
              }px`,
            }}
            key={key}
          >
            <Image
              className="w-full h-full object-cover object-center"
              src={slide.image_url}
              alt={slide.image_alt}
              fill
            />
            {slide.show_content && (
              <div
                className={classNames(
                  "absolute h-full w-full p-3 md:p-5 lg:p-8 xl:p-10 grid",
                  slide.content_alignement && {
                    "justify-start items-start":
                      slide.content_alignement === ContentAlignment.TOP_LEFT,
                    "justify-start items-center":
                      slide.content_alignement === ContentAlignment.MIDDLE_LEFT,
                    "justify-start items-end":
                      slide.content_alignement === ContentAlignment.BOTTOM_LEFT,
                    "justify-center items-start":
                      slide.content_alignement === ContentAlignment.TOP_CENTER,
                    "justify-center items-center":
                      slide.content_alignement ===
                      ContentAlignment.MIDDLE_CENTER,
                    "justify-center items-end":
                      slide.content_alignement ===
                      ContentAlignment.BOTTOM_CENTER,
                    "justify-end items-start":
                      slide.content_alignement === ContentAlignment.TOP_RIGHT,
                    "justify-end items-center":
                      slide.content_alignement ===
                      ContentAlignment.MIDDLE_RIGHT,
                    "justify-end items-end":
                      slide.content_alignement ===
                      ContentAlignment.BOTTOM_RIGHT,
                  },
                  slide.show_overlay &&
                    "before:absolute before:w-full before:h-full before:bg-[--slideshow-overlay-color] z-5 before:opacity-[--slideshow-overlay-opacity]"
                )}
                style={{
                  "--slideshow-overlay-color": "#000",
                  "--slideshow-overlay-opacity": slide.overlay_opacity || 0.5,
                }}
              >
                <div
                  className="flex flex-col z-10 gap-5 items-center"
                  // style={{ maxWidth: slide.content_width || 400 }}
                >
                  <div className="text-white text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold cursor-default">
                    {slide?.content?.title}
                  </div>
                  <div className="text-white cursor-default">
                    {slide?.content?.description}
                  </div>
                  <div className="text-white z-10 flex gap-2 flex-wrap justify-start items-center">
                    {slide?.content?.buttons.map((button, idx) => (
                      <Link
                        href={button.path || "#"}
                        key={idx}
                        className="border-none py-2 px-3"
                        style={{
                          backgroundColor: button.backgroundColor || "#fff",
                          color: button.textColor || "#000",
                          borderRadius: button.rounded ? "80px" : 0,
                          fontSize: `${button.textSize || 16}px`,
                        }}
                      >
                        {button.title}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default Slideshow;

Slideshow.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node),
  show_navigation: PropTypes.bool,
  show_pagination: PropTypes.bool,
  slider_height: PropTypes.number,
};
