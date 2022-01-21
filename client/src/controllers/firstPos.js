function firstPos(mesh) {
  mesh.children[0].position.set(0, 30, 0);
  mesh.children[1].position.set(0, 10, 0);
  mesh.children[2].position.set(0, 8, 7);
  mesh.children[3].position.set(0, 8, -7);
  mesh.children[4].position.set(0, 0, 5);
  mesh.children[5].position.set(0, 0, -5);
  mesh.children[0].rotation.set(0, 0, 0);
  mesh.children[1].rotation.set(0, 0, 0);
  mesh.children[2].rotation.set(0, 0, 0);
  mesh.children[3].rotation.set(0, 0, 0);
  mesh.children[4].rotation.set(0, 0, 0);
  mesh.children[5].rotation.set(0, 0, 0);
}

export default firstPos;
