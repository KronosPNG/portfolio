import { forwardRef } from "react";

export type SpriteProps = {
    src: string;
    frameWidth: number;
    frameHeight: number;
    frames: number;
    fps?: number;
    frame?: number;
    scale?:number;
    id?: string
};

export const Sprite = forwardRef<HTMLDivElement, SpriteProps>(
 
    function Sprite(    
    {
        src,
        frameWidth,
        frameHeight,
        frames,
        fps = 0,
        frame = 0,
        scale = 10,
        id=""
    }: SpriteProps,

    ref,
    
    
    ) {
        
        return(
            <div
            id={id}
            className="animated-sprite"

            ref={ref}

            style={{
                width: Math.round(frameWidth * scale),
                height: Math.round(frameHeight * scale),
                backgroundImage: `url(${src})`,
                backgroundPositionX: `-${Math.round(frame * frameWidth * scale)}px`,
                backgroundPositionY: "0px",
                backgroundSize: `${Math.round(frameWidth * frames * scale)}px ${Math.round(frameHeight * scale)}px`,
                backgroundRepeat: "no-repeat",
                imageRendering: "pixelated",
                flexShrink: "0",
            }}
            />
        )
    }
);