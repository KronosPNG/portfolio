import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import { Sprite } from "./Sprite";

import '../styles/UserInterface.css';

import AvatarSprite from "/assets/art/home/avatar_bubble.png";
import Photo from "/assets/images/me_medesimo.png";
import AvatarOutline from "/assets/art/home/outline.png";

import GithubIcon from "/assets/art/home/github_icon/github_icon.png";
import GithubIconHover from "/assets/art/home/github_icon/github_icon_hover.png";

import FontIconOff from "/assets/art/home/font_icon/font_icon_off.png";
import FontIconOn from "/assets/art/home/font_icon/font_icon_on.png";
import FontIconHover from "/assets/art/home/font_icon/font_icon_hover.png";

function UserInterface(props: { sceneScale: number, UIScale: number, hasFontChanged: boolean, changeFont: ()=>void }){
    const container = useRef<HTMLDivElement>(null);
    const avatarRef = useRef<HTMLDivElement>(null);
    const githubRef = useRef<HTMLDivElement>(null);
    const fontRef = useRef<HTMLDivElement>(null);

    const avatarTl = useRef<gsap.core.Timeline | null>(null);
    const githubTl = useRef<gsap.core.Timeline | null>(null);
    const fontTl = useRef<gsap.core.Timeline | null>(null);
    

    const avatarProps = {
        src: AvatarSprite,
        frameWidth: 32,
        frameHeight: 32,
        frames: 4,
        fps: 4,
        scale: props.UIScale,
    }

    const githubProps = {
        src: GithubIconHover,
        frameWidth: 10,
        frameHeight: 10,
        frames: 8,
        fps: 8,
        scale: props.UIScale,
    }

    const fontProps = {
        src: FontIconHover,
        frameWidth: 10,
        frameHeight: 10,
        frames: 10,
        fps: 10,
        scale: props.UIScale,
    }

    const { contextSafe } = useGSAP({ scope: container });

    useGSAP(() => {
        const sprites = [
            [avatarRef.current, avatarProps, avatarTl],
            [githubRef.current, githubProps, githubTl],
            [fontRef.current, fontProps, fontTl]
        ] as const;

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
        dependencies: [props.sceneScale],
        revertOnUpdate: true,
        scope: container
    });

    return(
        <div id="user-interface" ref={container}>
          <style>{`
              #root{
                font-family: var(${props.hasFontChanged ? "--alt-font" : "--main-font"});
              }

              #title-card{
                margin-top: ${props.sceneScale*9}px;
                margin-left: ${props.sceneScale*2}px;
              }

              #title-card h1{
                font-size: ${props.hasFontChanged ? props.UIScale*10 : props.UIScale*8.5}px;
                padding-top: ${props.UIScale*3}px;
                margin-left: ${props.UIScale*5}px;
              }

              #user-interface{
                font-size: ${props.hasFontChanged ? props.UIScale*8 : props.UIScale*6}px;
                padding-right: ${props.UIScale*8}px;
                padding-bottom: ${props.sceneScale*15}px;
              }

              #user-interface>a{
                margin-left: ${props.UIScale*15}px;
              }

              #icon-buttons-container{
                margin-left: ${props.UIScale*15}px;
              }
            
          `}</style>
          
          <div id="title-card">
            <div id="avatar">
              <img id="photo" src={Photo} alt="" width={28.5*props.UIScale} />

              <Sprite
                src={AvatarOutline}
                frameWidth={32}
                frameHeight={32}
                frames={1}
                fps={0}
                scale={props.UIScale}
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
                  scale={props.UIScale}
                />
              </div>

              <div className='hover-icon'>
                <Sprite
                  ref={githubRef}
                  {... githubProps}
                />
              </div>
            </a>

            <a id="font-change" href="#font-change" className='icon-buttons' onClick={props.changeFont}>
              <div className={`off-icon ${props.hasFontChanged ? "": "default-icon"}`}>
                <Sprite
                  src={FontIconOff}
                  frameWidth={10}
                  frameHeight={10}
                  frames={2}
                  fps={0}
                  scale={props.UIScale}
                />
              </div>

              <div className={`on-icon ${props.hasFontChanged ? "default-icon" : ""}`}>
                <Sprite
                  src={FontIconOn}
                  frameWidth={10}
                  frameHeight={10}
                  frames={2}
                  fps={0}
                  scale={props.UIScale}
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
    );

}

export default UserInterface;