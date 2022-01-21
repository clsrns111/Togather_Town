let runningCycle = 0;
function foward(mesh) {
  runningCycle += 0.2;
  let t = runningCycle;
  let PI = Math.PI;

  t = t % (2 * PI);

  const amp = 4;

  mesh.children[4].position.x = Math.cos(t) * amp;
  mesh.children[4].position.y = Math.max(0, -Math.sin(t) * amp);
  mesh.children[5].position.x = Math.cos(t + PI) * amp;
  mesh.children[5].position.y = Math.max(0, -Math.sin(t + PI) * amp);

  if (t < PI) {
    mesh.children[4].rotation.z = Math.cos(t * 2 + PI / 2) * (PI / 14);
    mesh.children[5].rotation.z = 0;
  } else {
    mesh.children[4].rotation.z = 0;
    mesh.children[5].rotation.z = Math.cos(t * 2 + PI / 2) * (PI / 14);
  }

  mesh.children[1].position.y = 8 - Math.cos(t * 2) * amp * 0.2;
  mesh.children[1].rotation.y = -Math.cos(t + PI) * amp * 0.05;
  mesh.children[0].position.y =
    mesh.children[0].position.y - Math.cos(t * 2) * amp * 0.03;
  mesh.children[0].rotation.x = Math.cos(t) * amp * 0.02;
  mesh.children[0].rotation.y = Math.cos(t) * amp * 0.01;
  mesh.children[2].position.x = -Math.cos(t) * amp;
  mesh.children[2].rotation.y = -Math.cos(t) * (PI / 8);
  mesh.children[3].position.x = -Math.cos(t + PI) * amp;
  mesh.children[3].rotation.y = -Math.cos(t + PI) * (PI / 8);
}

export default foward;
