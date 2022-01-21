function Light() {
  return (
    <>
      <ambientLight color={0xffffff} intensity={0.9} />
      <directionalLight
        color={0xffffff}
        intensity={0.9}
        position={[-30, 40, 20]}
        castShadow={true}
        shadow-camera-near={1}
        shadow-camera-far={2000}
      />
    </>
  );
}

export default Light;
