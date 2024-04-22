declare module "*.module.scss" {
    type ClassNames = Record<string, string>;
    const classNames: ClassNames;
    export = classNames;
}

declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.svg" {
    import type React from "react";
    const SVG: React.FC<React.SVGProps<SVGSVGElement>>;
    export default SVG;
}

declare const ENV: "production" | "development";
