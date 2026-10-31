import { gsap } from "gsap";
import type { SpriteProps } from "../components/Sprite";


type LoopConfig = Pick<
    SpriteProps,
    "fps" | "frames" | "frameWidth" | "scale"
>;

gsap.registerEffect({
    name: "loop",

    effect: (targets: gsap.TweenTarget, config: LoopConfig) => {
        let fps = 1;

        if (config.fps != undefined){
            fps = config.fps > 1 ? config.fps : 1;
        }

        let scale = 1;

        if (config.scale != undefined){
            scale = config.scale > 1 ? config.scale : 1;
        }

        const frameStep = Math.round(config.frameWidth * scale);
        const distance = (config.frames - 1) * frameStep;

        return gsap.to(targets, { 
            duration: config.frames/fps, 
            backgroundPositionX: `-${distance}px`, 
            ease: `steps(${config.frames-1})`,
            repeat: -1,
            repeatRefresh: false,
        });
    },

    defaults: { 
        fps: 4,
        frames: 4,
        frameWidth: 16,
        scale: 10
    },

    extendTimeline: true,
});