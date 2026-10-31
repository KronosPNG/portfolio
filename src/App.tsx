
import './App.css'
import WorldScene from "./components/WorldScene";

import { Sprite } from "./components/Sprite";
import AvatarSprite from "/assets/art/home/avatar_bubble.png";
import Photo from "/assets/images/me_medesimo.png";
import AvatarOutline from "/assets/art/home/outline.png";

import GithubIcon from "/assets/art/home/github_icon/github_icon.png";
import GithubIconHover from "/assets/art/home/github_icon/github_icon_hover.png";

import FontIconOff from "/assets/art/home/font_icon/font_icon_off.png";
import FontIconOn from "/assets/art/home/font_icon/font_icon_on.png";
import FontIconHover from "/assets/art/home/font_icon/font_icon_hover.png";

import { useEffect, useRef, useState } from 'react';
import { gsap } from "gsap";
import { useGSAP } from '@gsap/react';

import  "./animations/spriteEffects.ts";

gsap.registerPlugin(useGSAP);


function App() {
  const [sceneScale, SetSceneScale] = useState(10);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [UIScale, setUIScale] = useState(6);
  const [hasFontChanged, SetFontChanged] = useState(false);

  const container = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const githubRef = useRef<HTMLDivElement>(null);
  const fontRef = useRef<HTMLDivElement>(null);

  const avatarProps = {
    src: AvatarSprite,
    frameWidth: 32,
    frameHeight: 32,
    frames: 4,
    fps: 4,
    scale: UIScale,
  }

  const githubProps = {
    src: GithubIconHover,
    frameWidth: 10,
    frameHeight: 10,
    frames: 8,
    fps: 8,
    scale: UIScale,
  }

  const fontProps = {
    src: FontIconHover,
    frameWidth: 10,
    frameHeight: 10,
    frames: 10,
    fps: 10,
    scale: UIScale,
  }

  const avatarTl = useRef<gsap.core.Timeline | null>(null);
  const githubTl = useRef<gsap.core.Timeline | null>(null);
  const fontTl = useRef<gsap.core.Timeline | null>(null);
  const sceneFps = 6;

  useGSAP((context, contextSafe) => {
        const sprites = [
            [avatarRef.current, avatarProps, avatarTl],
            [githubRef.current, githubProps, githubTl],
            [fontRef.current, fontProps, fontTl]
        ] as const;

        if(!contextSafe){
          throw new Error("GSAP Context not initialised error.");
        }

        const cleanups: (() => void)[] = [];

        sprites.forEach(([element, config, timeline]) => {
            if (!element) return;

            const tl = gsap.timeline({paused: true});

            tl.add(
                gsap.effects.loop(element, config),
                0
            );

            timeline.current = tl;

            const onMouseOver = contextSafe(() => {
              timeline.current?.play();
            });

            const onMouseOut = contextSafe(() => {
              timeline.current?.pause(0);
            });

            element.addEventListener("mouseover", onMouseOver);
            element.addEventListener("mouseout", onMouseOut);

            cleanups.push(() => {
              element.removeEventListener("mouseover", onMouseOver);
              element.removeEventListener("mouseout", onMouseOut);
            });
        });

        return () => {
          cleanups.forEach(cleanup => cleanup());

          avatarTl.current?.kill();
          githubTl.current?.kill();
          fontTl.current?.kill();
        };
    }, {
        dependencies: [sceneScale],
        revertOnUpdate: true,
        scope: container
    });

  useEffect(() =>{
      const handleResize = () => {
        const newWidth = window.innerWidth;
        const newHeight = window.innerHeight;

        setWindowWidth(newWidth);
        setWindowHeight(newHeight);
        
        // Set new scale for the scenes
        const pixelArtWidth = 192;
        const pixelArtHeight = 108;

        const newSceneScale = Math.round(Math.min(newWidth/pixelArtWidth, newHeight/pixelArtHeight));
        const newUIScale = Math.round((newWidth/pixelArtWidth + newHeight/pixelArtHeight) / 3);

        SetSceneScale(newSceneScale);
        setUIScale(newUIScale);
      };

      handleResize();

      window.addEventListener("resize", handleResize);
      
      return () => {
        window.removeEventListener("resize", handleResize)
      };

  }, []);

  const changeFont = () =>{
    SetFontChanged(prev => !prev);
  };

  return (
    <div id="app" ref={container}>
      <div id="user-interface">
          <style>{`
              #root{
                font-family: var(${hasFontChanged ? "--alt-font" : "--main-font"});
              }

              #title-card{
                margin-top: ${sceneScale*9}px;
                margin-left: ${sceneScale*2}px;
              }

              #title-card h1{
                font-size: ${hasFontChanged ? UIScale*10 : UIScale*8.5}px;
                padding-top: ${UIScale*3}px;
                margin-left: ${UIScale*5}px;
              }

              #user-interface{
                font-size: ${hasFontChanged ? UIScale*8 : UIScale*6}px;
                padding-right: ${UIScale*8}px;
                padding-bottom: ${sceneScale*10}px;
              }

              #user-interface>a{
                margin-left: ${UIScale*15}px;
              }

              #icon-buttons-container{
                margin-left: ${UIScale*15}px;
              }
            
          `}</style>
          
          <div id="title-card">
            <div id="avatar">
              <img id="photo" src={Photo} alt="" width={28.5*UIScale} />

              <Sprite
                src={AvatarOutline}
                frameWidth={32}
                frameHeight={32}
                frames={1}
                fps={0}
                scale={UIScale}
              />

              <Sprite
                ref={avatarRef}
                {... avatarProps}
                id="avatar-bubble"
              />
            </div>

            <h1>Luigi Turco</h1>
          </div>

          <a href="#about">About</a>

          <a href="#experience">Experience</a>

          <a href="#projects">Projects</a>

          <div id="icon-buttons-container">
            <a href="https://github.com/KronosPNG" target='_blank' className='icon-buttons'>
              <div className='default-icon'>
                <Sprite
                  src={GithubIcon}
                  frameWidth={10}
                  frameHeight={10}
                  frames={2}
                  fps={0}
                  scale={UIScale}
                />
              </div>

              <div className='hover-icon'>
                <Sprite
                  ref={githubRef}
                  {... githubProps}
                />
              </div>
            </a>

            <a id="font-change" href="#font-change" className='icon-buttons' onClick={changeFont}>
              <div className={`off-icon ${hasFontChanged ? "": "default-icon"}`}>
                <Sprite
                  src={FontIconOff}
                  frameWidth={10}
                  frameHeight={10}
                  frames={2}
                  fps={0}
                  scale={UIScale}
                />
              </div>

              <div className={`on-icon ${hasFontChanged ? "default-icon" : ""}`}>
                <Sprite
                  src={FontIconOn}
                  frameWidth={10}
                  frameHeight={10}
                  frames={2}
                  fps={0}
                  scale={UIScale}
                />
              </div>

              <div className='hover-icon'>
                <Sprite
                  ref={fontRef}
                  {... fontProps}
                />
              </div>
            </a>
          </div>
      </div>

      <WorldScene sceneScale={sceneScale}/>
    </div>
    
  );
}

export default App
