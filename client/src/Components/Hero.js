import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import { brownMat, whiteMat, lightBrownMat, pinkMat } from "./Material.js";
import * as THREE from "three";

function Hero({ stream }) {
  return (
    <group scale={[0.03, 0.03, 0.03]}>
      {stream && <Head stream={stream} />}
      <Torso />
      <Hand />
      <Leg />
      <group position={[-100, -10, 0]} />
    </group>
  );
}

function Torso() {
  return (
    <mesh position={[0, 8, 0]} name="torso" castShadow={true}>
      <boxBufferGeometry args={[8, 8, 8]} />
      <meshPhongMaterial color={brownMat.color} />
    </mesh>
  );
}

function Head({ stream }) {
  const [video] = useState(() => {
    const vid = document.createElement("video");

    vid.srcObject = stream;
    vid.crossOrigin = "Anonymous";
    vid.loop = true;
    vid.muted = "muted";
    vid.play();

    return vid;
  });

  return (
    <group>
      <mesh position={[0, 3, 0]} name="head" castShadow={true}>
        <boxGeometry args={[5, 31, 31]} />
        <meshBasicMaterial
          side={THREE.DoubleSide}
          color={brownMat.color}
        ></meshBasicMaterial>
      </mesh>
      <mesh rotation={[Math.PI, Math.PI / 2, 0]} position={[2.6, 3, 0]}>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color={"#ffffff"} side={THREE.DoubleSide}>
          <videoTexture
            attach="map"
            args={[video]}
            flipY={false}
            wrapT={THREE.RepeatWrapping}
            wrapS={THREE.RepeatWrapping}
            encoding={THREE.sRGBEncoding}
          />
          <videoTexture attach="emissiveMap" args={[video]} />
        </meshStandardMaterial>
      </mesh>
    </group>
  );
}

function Hand() {
  return (
    <>
      <mesh position={[0, 8, 7]} name="leftHand" castShadow={true}>
        <boxBufferGeometry args={[3, 3, 3]} />
        <meshPhongMaterial color={whiteMat.color} />
      </mesh>
      <mesh position={[0, 8, -7]} name="rightHand" castShadow={true}>
        <boxBufferGeometry args={[3, 3, 3]} />
        <meshPhongMaterial color={whiteMat.color} />
      </mesh>
    </>
  );
}

function Leg() {
  return (
    <>
      <mesh position={[0, 0, 5]} name="rightLeg" castShadow={true}>
        <boxBufferGeometry args={[8, 3, 5]} />
        <meshPhongMaterial color={brownMat.color} />
      </mesh>

      <mesh position={[0, 0, -5]} name="leftLeg" castShadow={true}>
        <boxBufferGeometry args={[8, 3, 5]} />
        <meshPhongMaterial color={brownMat.color} />
      </mesh>
    </>
  );
}

export default Hero;
