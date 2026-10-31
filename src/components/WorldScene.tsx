import { useRef } from "react";
import { Sprite, type SpriteProps } from "./Sprite";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import  "../animations/spriteEffects.ts";

import '../styles/WorldScene.css';

import SkyBg1 from "/assets/art/home/moon_bg.png";
import SkyBg2 from "/assets/art/home/name_bg.png";
import StarsImg1 from "/assets/art/shared/stars/stars_1.png";
import StarsImg2 from "/assets/art/shared/stars/stars_2.png";
import MoonImg from "/assets/art/home/moon.png";
import CloudImg1 from "/assets/art/home/clouds/cloud_1.png";
import CloudImg2 from "/assets/art/home/clouds/cloud_2.png";
import CloudImg3 from "/assets/art/home/clouds/cloud_3.png"

import MountainsNear from "/assets/art/home/mountains/mountains_near.png";
import MountainsMid from "/assets/art/home/mountains/mountains_mid.png";
import MountainsFar from "/assets/art/home/mountains/mountains_far.png";
import TreeImg from "/assets/art/home/tree/tree_lit.png";
import CampfireImg from "/assets/art/home/campfire/campfire_lit.png";
import GroundLightImg from "/assets/art/home/ground_light/ground_lit.png";

import CharacterSprite from"/assets/art/shared/character/lit.png";

function WorldScene(props: { sceneScale: number }){
    const scene = useRef<HTMLDivElement>(null);
    const charRef = useRef<HTMLDivElement>(null);
    const treeRef = useRef<HTMLDivElement>(null);
    const fireRef = useRef<HTMLDivElement>(null);
    const groundRef = useRef<HTMLDivElement>(null);
    const star1Ref = useRef<HTMLDivElement>(null);
    const star2Ref = useRef<HTMLDivElement>(null);

    const sceneFps = 4;
    const sceneScale = props.sceneScale;

    const star1Props: SpriteProps = {
        src: StarsImg1,
        frameWidth: 118,
        frameHeight: 62,
        frames: 4,
        fps: sceneFps,
        scale: sceneScale
    }

    const star2Props: SpriteProps = {
        src: StarsImg2,
        frameWidth: 74,
        frameHeight: 62,
        frames: 4,
        fps: sceneFps,
        scale: sceneScale
    }

    const treeProps: SpriteProps = {
        src: TreeImg,
        frameWidth: 48,
        frameHeight: 46,
        frames: 4,
        fps: sceneFps,
        scale: sceneScale
    }

    const fireProps: SpriteProps = {
        src: CampfireImg,
        frameWidth: 16,
        frameHeight: 16,
        frames: 4,
        fps: sceneFps,
        scale: sceneScale
    }

    const charProps: SpriteProps = {
        src: CharacterSprite,
        frameWidth: 16,
        frameHeight: 16,
        frames: 4,
        fps: sceneFps,
        scale: sceneScale
    }

     const groundProps: SpriteProps = {
        src: GroundLightImg,
        frameWidth: 39,
        frameHeight: 5,
        frames: 4,
        fps: sceneFps,
        scale: sceneScale
    }

    useGSAP(() => {
        const tl = gsap.timeline();

        const sprites = [
            [charRef.current, charProps],
            [treeRef.current, treeProps],
            [fireRef.current, fireProps],
            [groundRef.current, groundProps],
            [star1Ref.current, star1Props],
            [star2Ref.current, star2Props],
        ] as const;

        sprites.forEach(([element, config]) => {
            if (!element) return;

            tl.add(
                gsap.effects.loop(element, config),
                0
            );
        });

        return () => {
            tl.kill();
        };
    }, {
        dependencies: [sceneScale],
        revertOnUpdate: true,
    });

    return (
        <main ref={scene} id="home">
            <style>{`
                #home{
                    grid-template-rows: auto ${5*sceneScale}px;
                }

                #title-bg{
                    top: ${8*sceneScale}px;
                }

                #moon{
                    top: ${3*sceneScale}px;
                    right: ${7*sceneScale}px;
                }

                #star1{
                    max-width: ${118*sceneScale}px;
                }

                #cloud1{
                    top: ${28*sceneScale}px;
                    right: ${38*sceneScale}px;
                }

                #cloud2{
                    top: ${38*sceneScale}px;
                    right: ${20*sceneScale}px;
                }

                #cloud3{
                    top: ${34*sceneScale}px;
                    right: ${5*sceneScale}px;
                }
            
                #tree{
                    left: -${6*sceneScale}px;
                }

                #campfire{
                    bottom: -${2*sceneScale}px;
                }

                #ground-light{
                    left: ${2*sceneScale}px;
                    bottom: -${5*sceneScale}px;
                }

                .mountains{
                    bottom: ${5*sceneScale}px;
                }
                
                #ai-disclaimer{
                    font-size: ${sceneScale*1.5}px;
                    left: ${sceneScale*1.5}px;
                    bottom: ${sceneScale*1.5}px;
                }
            `}</style>
            
            <div id="sky">
                <div id="sky-bg">
                    <div id="title-bg">
                        <Sprite
                            src={SkyBg2}
                            frameWidth={118}
                            frameHeight={26}
                            frames={1}
                            fps={0}
                            scale={sceneScale}
                        />
                    </div>

                    <div id="moon-bg">
                        <Sprite
                            src={SkyBg1}
                            frameWidth={74}
                            frameHeight={70}
                            frames={1}
                            fps={0}
                            scale={sceneScale}
                        />
                    </div>
                </div>

                <div id="star1">
                    <Sprite
                        ref={star1Ref}
                        {... star1Props}
                    />
                </div>

                <div id="star2">
                    <Sprite
                        ref={star2Ref}
                        {... star2Props}
                    />
                </div>

                <div id="moon">
                    <Sprite 
                        src={MoonImg}
                        frameWidth={30}
                        frameHeight={30}
                        frames={1}
                        fps={0}
                        scale={sceneScale}
                    />
                </div>

                <div id="clouds">
                    <div id="cloud1" className="cloud">
                        <Sprite 
                            src={CloudImg1}
                            frameWidth={20}
                            frameHeight={8}
                            frames={1}
                            fps={0}
                            scale={sceneScale}
                        />
                    </div>

                    <div id="cloud2" className="cloud">
                        <Sprite 
                            src={CloudImg2}
                            frameWidth={29}
                            frameHeight={11}
                            frames={1}
                            fps={0}
                            scale={sceneScale}
                        />
                    </div>

                    <div id="cloud3" className="cloud">
                        <Sprite 
                            src={CloudImg3}
                            frameWidth={15}
                            frameHeight={6}
                            frames={1}
                            fps={0}
                            scale={sceneScale}
                        />
                    </div>
                </div>
            </div>

            <div id="mountains-container">
                <div className="mountains" id="mountains-far">
                    <Sprite 
                        src={MountainsFar}
                        frameWidth={384}
                        frameHeight={71}
                        frames={1}
                        fps={0}
                        scale={sceneScale}
                    />
                </div>

                <div className="mountains" id="mountains-mid">
                    <Sprite 
                        src={MountainsMid}
                        frameWidth={384}
                        frameHeight={60}
                        frames={1}
                        fps={0}
                        scale={sceneScale}
                    />    
                </div>

                <div className="mountains" id="mountains-near">
                    <Sprite 
                        src={MountainsNear}
                        frameWidth={130}
                        frameHeight={65}
                        frames={1}
                        fps={0}
                        scale={sceneScale}
                    />
                </div>
            </div>

            <div id="ground" />

            <div id="ground-light">
                <Sprite
                    ref={groundRef}
                    {... groundProps}
                />
            </div>

            <div id="tree">
                <Sprite
                    ref={treeRef}
                    {... treeProps}
                />
            </div>

            
            <div id="campfire">
                <Sprite
                    ref={fireRef}
                    {... fireProps}
                />
            </div>

            <div id="character">
                <Sprite
                    ref={charRef}
                    {... charProps}
                />
            </div>
            
            <p id="ai-disclaimer">
                Proudly made without GenAI &lt;3
            </p>
        </main>
    );
}

export default WorldScene;