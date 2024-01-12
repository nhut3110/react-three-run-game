import * as THREE from "three";

const loader = new THREE.TextureLoader();
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);

const floor2NormalMap = loader.load("/floor/normal.png", (texture) => {
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2); // Adjust as needed
});
const floor2DiffuseMap = loader.load("/floor/diffuse.png", (texture) => {
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2); // Adjust as needed
});
const floor2DisplacementMap = loader.load(
  "/floor/displacement.png",
  (texture) => {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(2, 2); // Adjust as needed
  }
);
const floor2RoughMap = loader.load("/floor/rough.png", (texture) => {
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2); // Adjust as needed
});

const floor2Material = new THREE.MeshStandardMaterial({
  // color: "greenyellow",
  normalMap: floor2NormalMap,
  map: floor2DiffuseMap,
  bumpMap: floor2DisplacementMap,
  roughnessMap: floor2RoughMap,
  bumpScale: 0.7,
  normalScale: new THREE.Vector2(1, 1),
});

const floor1NormalMap = loader.load("/rock/normal.png", (texture) => {
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2); // Adjust as needed
});
const floor1DiffuseMap = loader.load("/rock/diffuse.png", (texture) => {
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2); // Adjust as needed
});
const floor1DisplacementMap = loader.load(
  "/rock/displacement.png",
  (texture) => {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(2, 2); // Adjust as needed
  }
);
const floor1RoughMap = loader.load("/rock/rough.png", (texture) => {
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2); // Adjust as needed
});

const floor1Material = new THREE.MeshStandardMaterial({
  // color: "limegreen",
  normalMap: floor1NormalMap,
  map: floor1DiffuseMap,
  bumpMap: floor1DisplacementMap,
  roughnessMap: floor1RoughMap,
  bumpScale: 0.7,
  normalScale: new THREE.Vector2(1, 1),
});

const woodNormalMap = loader.load("/wood/normal.png", (texture) => {
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2); // Adjust as needed
});
const woodDiffuseMap = loader.load("/wood/diffuse.png", (texture) => {
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2); // Adjust as needed
});
const woodDisplacementMap = loader.load("/wood/displacement.png", (texture) => {
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2); // Adjust as needed
});
const woodRoughMap = loader.load("/wood/rough.png", (texture) => {
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2); // Adjust as needed
});

const obstacleMaterial = new THREE.MeshStandardMaterial({
  // color: "orangered",
  normalMap: woodNormalMap,
  map: woodDiffuseMap,
  bumpMap: woodDisplacementMap,
  roughnessMap: woodRoughMap,
  bumpScale: 0.7,
  normalScale: new THREE.Vector2(1, 1),
});

const wallNormalMap = loader.load("/wall/normal.png", (texture) => {
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(50, 50); // Adjust as needed
});
const wallDiffuseMap = loader.load("/wall/diffuse.png", (texture) => {
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(50, 50); // Adjust as needed
});
const wallDisplacementMap = loader.load("/wall/displacement.png", (texture) => {
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(50, 50); // Adjust as needed
});
const wallRoughMap = loader.load("/wall/rough.png", (texture) => {
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(50, 50); // Adjust as needed
});

const wallMaterial = new THREE.MeshStandardMaterial({
  // color: "slategrey",
  normalMap: wallNormalMap,
  map: wallDiffuseMap,
  bumpMap: wallDisplacementMap,
  roughnessMap: wallRoughMap,
  bumpScale: 0.7,
  normalScale: new THREE.Vector2(1, 1),
});

const wallTransparentMaterial = new THREE.MeshStandardMaterial({
  // color: "transparent",
  opacity: 0.1,
  transparent: true,
});

export {
  boxGeometry,
  floor1Material,
  floor2Material,
  obstacleMaterial,
  wallMaterial,
  wallTransparentMaterial,
};
