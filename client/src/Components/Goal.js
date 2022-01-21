import { useFrame } from "@react-three/fiber";
import React, { useRef } from "react";
import Camera from "./Camera";
import * as THREE from "three";
import foward from "../controllers/foward";
import firstPos from "../controllers/firstPos";
import Hero from "./Hero";

function Goal({ stream, keys }) {
  const goal = useRef(null);
  const mesh = useRef(null);
  let temp = new THREE.Vector3();

  useFrame(() => {
    let hero = mesh.current.children[0];
    let follow = hero.children[6];
    let speed = 0;
    let velocity = 0;

    if (keys.w) {
      foward(hero);
      speed += 0.05;
    } else {
      hero.children.length > 5 && firstPos(hero);
    }

    velocity += (speed - velocity) * 1;
    hero.translateX(velocity);

    if (keys.a) hero.rotateY(0.05);
    if (keys.d) hero.rotateY(-0.05);

    temp.setFromMatrixPosition(follow.matrixWorld);
    goal.current.position.lerp(temp, 0.1);

    goal.current.children[0].lookAt(hero.position);
  });

  return (
    <>
      <group ref={goal}>
        <Camera />
      </group>
      <group ref={mesh}>
        <Hero stream={stream} keys={keys}></Hero>
      </group>
    </>
  );
}

export default Goal;
