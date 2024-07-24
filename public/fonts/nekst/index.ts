import localFont from "next/font/local";

export const Nekst = localFont({
  src: [
    {
      path: "./Fontspring-DEMO-nekst-bold.otf",
      weight: "800",
      style: "bold",
    },
    {
      path: "./Fontspring-DEMO-nekst-medium.otf",
      weight: "500",
      style: "medium",
    },
    {
      path: "./Fontspring-DEMO-nekst-regular.otf",
      weight: "400",
      style: "regular",
    },
  ],
});
