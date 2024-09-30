"use client";
import { ContentAlignment } from "@/components/slideshow/Slideshow";
import { Section } from "@/enums";
import { SectionsMapping } from "@/mappings/SectionsMapping";

const data = {
  sections: {
    "slideshow-1": {
      type: Section.SLIDESHOW,
      childrens: [
        // {
        //   image_url:
        //     "https://images.unsplash.com/photo-1669310155716-cdd7646f4c09?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        //   image_alt: "",
        // },
        {
          image_url:
            "https://images.unsplash.com/photo-1519669417670-68775a50919c?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          image_alt: "",
          show_content: true,
          show_overlay: true,
          overlay_opacity: 0.4,
          content_alignement: ContentAlignment.MIDDLE_CENTER,
          content_width: 600,
          content: {
            title: "Our Summer Sale is Finally Here!!",
            description: "20% Off Site Wide 🎉",
            buttons: [
              {
                path: "#abc",
                title: "Check it out",
                backgroundColor: "",
                textColor: "",
                textSize: "12",
                rounded: true,
              },
            ],
          },
        },
      ],
      loop: false,
      slider_height: 650,
      mobile_slider_height: 300,
      autoplay: false,
      autoplay_delay: 5000,
      show_navigation: true,
      show_pagination: true,
    },
  },
  fontFamily: "",
  order: ["slideshow-1"],
};

export default function Home() {
  return (
    <>
      {data.order.map((section) => {
        const { type, ...rest } = data.sections?.[section] || {};

        if (!type || !Object.keys(SectionsMapping).includes(type)) return <></>;

        const Component = SectionsMapping[type];

        return <Component key={section} {...rest}></Component>;
      })}
    </>
  );
}
