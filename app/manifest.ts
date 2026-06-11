import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "FieldCapture — Service Report Voice Capture",
    short_name: "FieldCapture",
    description:
      "Capture timestamped voice notes in the field; assemble structured service reports at home.",
    start_url: "/jobs",
    display: "standalone",
    orientation: "portrait",
    background_color: "#fbf5ec",
    theme_color: "#ef7d57",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
      {
        src: "/icon-maskable.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
  };
}
