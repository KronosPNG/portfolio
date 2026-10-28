import { useRef } from "react";
import { Sprite } from "./Sprite";

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
import CampfireImg from"/assets/art/home/campfire/campfire_lit.png";

import CharacterSprite from"/assets/art/shared/character/lit.png";

function WorldScene(){
    const scene = useRef<HTMLDivElement>(null);
    const sceneFps = 8;
    const sceneScale = 8;

    return (
        <main ref={scene} id="home">
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
                        src={StarsImg1}
                        frameWidth={118}
                        frameHeight={62}
                        frames={4}
                        fps={sceneFps}
                        scale={sceneScale}
                    />
                </div>

                <div id="star2">
                    <Sprite
                        src={StarsImg2}
                        frameWidth={74}
                        frameHeight={62}
                        frames={4}
                        fps={sceneFps}
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
                            fps={sceneFps}
                            scale={sceneScale}
                        />
                    </div>

                    <div id="cloud2" className="cloud">
                        <Sprite 
                            src={CloudImg2}
                            frameWidth={29}
                            frameHeight={11}
                            frames={1}
                            fps={sceneFps}
                            scale={sceneScale}
                        />
                    </div>

                    <div id="cloud3" className="cloud">
                        <Sprite 
                            src={CloudImg3}
                            frameWidth={15}
                            frameHeight={6}
                            frames={1}
                            fps={sceneFps}
                            scale={sceneScale}
                        />
                    </div>
                </div>

                <div id="moon">
                    <Sprite 
                        src={MoonImg}
                        frameWidth={30}
                        frameHeight={30}
                        frames={1}
                        fps={sceneFps}
                        scale={sceneScale}
                    />
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

            <div id="tree">
                <Sprite
                    src={TreeImg}
                    frameWidth={48}
                    frameHeight={46}
                    frames={4}
                    fps={sceneFps}
                    scale={sceneScale}
                />
            </div>

            
            <div id="campfire">
                <Sprite
                    src={CampfireImg}
                    frameWidth={16}
                    frameHeight={16}
                    frames={4}
                    fps={sceneFps}
                    scale={sceneScale}
                />
            </div>

            <div id="character">
                <Sprite
                    src={CharacterSprite}
                    frameWidth={16}
                    frameHeight={16}
                    frames={4}
                    fps={sceneFps}
                    scale={sceneScale}
                />
            </div>

        </main>
    );
}

export default WorldScene;