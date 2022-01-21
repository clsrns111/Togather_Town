import { PerspectiveCamera } from "@react-three/drei";

function Camera() {
  return (
    <PerspectiveCamera
      position={[0, 3.9, 0]}
      near={0.9}
      far={400}
      makeDefault
      aspect={window.innerWidth / window.innerHeight}
      fov={60}
    />
  );
}

export default Camera;
