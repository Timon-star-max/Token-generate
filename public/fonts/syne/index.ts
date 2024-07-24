import localFont from "next/font/local";

export const Syne = localFont({
  src: [
    {
      path: "./Syne-Bold.otf",
      weight: "700",
      style: "bold",
    },
    {
      path: "./Syne-Extra.otf",
      weight: "800",
      style: "extra",
    },
    {
      path: "./Syne-Mono.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./Syne-Regular.otf",
      weight: "400",
      style: "regular",
    },
  ],
});
