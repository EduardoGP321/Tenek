import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger, Draggable);

  gsap.config({ force3D: "auto" });
  gsap.defaults({ overwrite: "auto" });
  ScrollTrigger.config({ limitCallbacks: true });
}

export { gsap, useGSAP, ScrollTrigger, Draggable };