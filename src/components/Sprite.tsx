import { useGSAP } from "@gsap/react";
import { useRef } from "react";

type SpriteProps = {
    src: string;
    frameWidth: number;
    frameHeight: number;
    frames: number;
    fps?: number;
    frame?: number;
    scale?:number;
};

export function Sprite({
    src,
    frameWidth,
    frameHeight,
    frames,
    fps = 0,
    frame = 0,
    scale = 10
}: SpriteProps) {
    
    return(
        <div
        style={{
            width: frameWidth * scale,
            height: frameHeight * scale,
            backgroundImage: `url(${src})`,
            backgroundPosition: `${-frame * frameWidth * scale}px 0px`,
            backgroundSize: `${frameWidth * frames * scale}px ${frameHeight * scale}px`,
            backgroundRepeat: "no-repeat",
            imageRendering: "pixelated",
        }}
        />
    )
}