
import './App.css'
import WorldScene from "./components/WorldScene";
import UserInterface from "./components/UserInterface.tsx";

import { useEffect, useRef, useState } from 'react';
import { gsap } from "gsap";
import { useGSAP } from '@gsap/react';

import  "./animations/spriteEffects.ts";

gsap.registerPlugin(useGSAP);


function App() {
  const [sceneScale, SetSceneScale] = useState(10);
  const [UIScale, setUIScale] = useState(6);
  const [hasFontChanged, SetFontChanged] = useState(false);

  useEffect(() =>{
      const handleResize = () => {
        const newWidth = window.innerWidth;
        const newHeight = window.innerHeight;
        
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
    <div id="app">
      <UserInterface 
        sceneScale={sceneScale} 
        UIScale={UIScale}
        hasFontChanged={hasFontChanged}
        changeFont={changeFont}
      />

      <WorldScene sceneScale={sceneScale}/>
    </div>
    
  );
}

export default App
