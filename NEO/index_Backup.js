import * as THREE from 'three';
import { OrbitControls } from 'jsm/controls/OrbitControls.js';
import getStarfield from "./src/getStarfield.js";
import { getFresnelMat } from "./src/getFresnelMat.js";
import { CSS2DRenderer, CSS2DObject } from 'jsm/renderers/CSS2DRenderer.js';
import createPopup from './src/createPopup.js';

// Common function to create labels with a higher z-index
function createLabelElement(textContent) {
  const labelElement = document.createElement('div');
  labelElement.textContent = textContent;
  labelElement.style.color = 'white';
  labelElement.style.fontSize = '10px';
  labelElement.style.fontFamily = 'Arial';
  labelElement.style.zIndex = '1000'; // Higher z-index to ensure the labels are on top
  return labelElement;
}

// Constants
const EARTH_RADIUS = 1;
const MOON_RADIUS = 0.25;
const asteroid_RADIUS = 0.05;
const MOON_ORBIT_RADIUS = 25;
const CAMERA_ZOOM_MIN = 1.2;
const CAMERA_ZOOM_MAX = 100;

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 3;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.outputColorSpace = THREE.LinearSRGBColorSpace;

// Earth group
const earthGroup = new THREE.Group();
earthGroup.rotation.z = -23.4 * Math.PI / 180;
scene.add(earthGroup);

// Earth mesh
const earthGeometry = new THREE.IcosahedronGeometry(EARTH_RADIUS, 12);
const earthMaterial = new THREE.MeshPhongMaterial({
  map: new THREE.TextureLoader().load("./textures/00_earthmap1k.jpg"),
  specularMap: new THREE.TextureLoader().load("./textures/02_earthspec1k.jpg"),
  bumpMap: new THREE.TextureLoader().load("./textures/01_earthbump1k.jpg"),
  bumpScale: 0.04,
});
const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
earthGroup.add(earthMesh);

// Lights mesh
const lightsGeometry = earthGeometry;
const lightsMaterial = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load("./textures/03_earthlights1k.jpg"),
  blending: THREE.AdditiveBlending,
});
const lightsMesh = new THREE.Mesh(lightsGeometry, lightsMaterial);
earthGroup.add(lightsMesh);

// Clouds mesh
const cloudsGeometry = earthGeometry;
const cloudsMaterial = new THREE.MeshStandardMaterial({
  map: new THREE.TextureLoader().load("./textures/04_earthcloudmap.jpg"),
  transparent: true,
  opacity: 0.5,
  blending: THREE.AdditiveBlending,
  alphaMap: new THREE.TextureLoader().load('./textures/05_earthcloudmaptrans.jpg'),
});
const cloudsMesh = new THREE.Mesh(cloudsGeometry, cloudsMaterial);
cloudsMesh.scale.setScalar(1.003);
earthGroup.add(cloudsMesh);

// Glow mesh
const glowGeometry = earthGeometry;
const glowMaterial = getFresnelMat();
const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
glowMesh.scale.setScalar(1.01);
earthGroup.add(glowMesh);

// Create the _Apophis mesh
const _ApophisGroup = new THREE.Group();
scene.add(_ApophisGroup);
const _ApophisGeometry = new THREE.TetrahedronGeometry(0.03, 2);
const _ApophisMaterial = new THREE.MeshStandardMaterial({
  map: new THREE.TextureLoader().load("./textures/asteroid.jpg"),
  bumpMap: new THREE.TextureLoader().load("./textures/asteroid.jpg"),
  bumpScale: 0.015,
});
const _ApophisMesh = new THREE.Mesh(_ApophisGeometry, _ApophisMaterial);
_ApophisMesh.position.set(2.5, 0, 0);
_ApophisGroup.add(_ApophisMesh)

// Create the bennu mesh
const bennuGroup = new THREE.Group();
scene.add(bennuGroup);
const bennuGeometry = new THREE.DodecahedronGeometry(0.072, 1);
const bennuMaterial = new THREE.MeshStandardMaterial({
  map: new THREE.TextureLoader().load("./textures/asteroid.jpg"),
  bumpMap: new THREE.TextureLoader().load("./textures/asteroid.jpg"),
  bumpScale: 0.015,
});
const bennuMesh = new THREE.Mesh(bennuGeometry, bennuMaterial);
bennuMesh.position.set(12.9, 2, 0);
bennuGroup.add(bennuMesh)
bennuGroup.rotation.y = -180;

// Create the MD_2011 mesh
const MD_2011Group = new THREE.Group();
scene.add(MD_2011Group);
const MD_2011Geometry = new THREE.DodecahedronGeometry(0.03, 1);
const MD_2011Material = new THREE.MeshStandardMaterial({
  map: new THREE.TextureLoader().load("./textures/asteroid.jpg"),
  bumpMap: new THREE.TextureLoader().load("./textures/asteroid.jpg"),
  bumpScale: 0.015,
});
const MD_2011Mesh = new THREE.Mesh(MD_2011Geometry, MD_2011Material);
MD_2011Mesh.position.set(-1.7, -1, 0);
MD_2011Group.add(MD_2011Mesh)
MD_2011Group.rotation.y = 90

// Create the Chelyabinsk mesh
const ChelyabinskGroup = new THREE.Group();
scene.add(ChelyabinskGroup);
const ChelyabinskGeometry = new THREE.DodecahedronGeometry(0.01, 1);
const ChelyabinskMaterial = new THREE.MeshStandardMaterial({
  map: new THREE.TextureLoader().load("./textures/asteroid.jpg"),
  bumpMap: new THREE.TextureLoader().load("./textures/asteroid.jpg"),
  bumpScale: 0.015,
});
const ChelyabinskMesh = new THREE.Mesh(ChelyabinskGeometry, ChelyabinskMaterial);
ChelyabinskMesh.position.set(0.9, 0.58, 0);
ChelyabinskGroup.add(ChelyabinskMesh)

// Create the TC3_2008 mesh
const TC3_2008Group = new THREE.Group();
scene.add(TC3_2008Group);
const TC3_2008Geometry = new THREE.DodecahedronGeometry(0.005, 1);
const TC3_2008Material = new THREE.MeshStandardMaterial({
  map: new THREE.TextureLoader().load("./textures/asteroid.jpg"),
  bumpMap: new THREE.TextureLoader().load("./textures/asteroid.jpg"),
  bumpScale: 0.015,
});
const TC3_2008Mesh = new THREE.Mesh(TC3_2008Geometry, TC3_2008Material);
TC3_2008Mesh.position.set(1, 0, 0);
TC3_2008Group.add(TC3_2008Mesh)

// Create the DZ2_2023 mesh
const DZ2_2023Group = new THREE.Group();
scene.add(DZ2_2023Group);
const DZ2_2023Geometry = new THREE.DodecahedronGeometry(0.02, 1);
const DZ2_2023Material = new THREE.MeshStandardMaterial({
  map: new THREE.TextureLoader().load("./textures/asteroid.jpg"),
  bumpMap: new THREE.TextureLoader().load("./textures/asteroid.jpg"),
  bumpScale: 0.015,
});
const DZ2_2023Mesh = new THREE.Mesh(DZ2_2023Geometry, DZ2_2023Material);
DZ2_2023Mesh.position.set(13, 0, 0);
DZ2_2023Group.add(DZ2_2023Mesh)
DZ2_2023Group.rotation.y = -156;

// Create the TU24_2007 mesh
const TU24_2007Group = new THREE.Group();
scene.add(TU24_2007Group);
const TU24_2007Geometry = new THREE.DodecahedronGeometry(0.1, 1);
const TU24_2007Material = new THREE.MeshStandardMaterial({
  map: new THREE.TextureLoader().load("./textures/asteroid.jpg"),
  bumpMap: new THREE.TextureLoader().load("./textures/asteroid.jpg"),
  bumpScale: 0.015,
});
const TU24_2007Mesh = new THREE.Mesh(TU24_2007Geometry, TU24_2007Material);
TU24_2007Mesh.position.set(40, 0, 0);
TU24_2007Group.add(TU24_2007Mesh)
TU24_2007Group.rotation.y = 5.4;

// Create the XF11_1997 mesh
const XF11_1997Group = new THREE.Group();
scene.add(XF11_1997Group);
const XF11_1997Geometry = new THREE.DodecahedronGeometry(0.1, 1);
const XF11_1997Material = new THREE.MeshStandardMaterial({
  map: new THREE.TextureLoader().load("./textures/asteroid.jpg"),
  bumpMap: new THREE.TextureLoader().load("./textures/asteroid.jpg"),
  bumpScale: 0.015,
});
const XF11_1997Mesh = new THREE.Mesh(XF11_1997Geometry, XF11_1997Material);
XF11_1997Mesh.position.set(70, 0, 0);
XF11_1997Group.add(XF11_1997Mesh)
XF11_1997Group.rotation.y = 4.5;

// Create the WN5_2001 mesh
const WN5_2001Group = new THREE.Group();
scene.add(WN5_2001Group);
const WN5_2001Geometry = new THREE.DodecahedronGeometry(0.1, 1);
const WN5_2001Material = new THREE.MeshStandardMaterial({
  map: new THREE.TextureLoader().load("./textures/asteroid.jpg"),
  bumpMap: new THREE.TextureLoader().load("./textures/asteroid.jpg"),
  bumpScale: 0.015,
});
const WN5_2001Mesh = new THREE.Mesh(WN5_2001Geometry, WN5_2001Material);
WN5_2001Mesh.position.set(17.8, 0, 0);
WN5_2001Group.add(WN5_2001Mesh)
WN5_2001Group.rotation.y = 0.5;

// Create the MD5_2011 mesh
const MD5_2011Group = new THREE.Group();
scene.add(MD5_2011Group);
const MD5_2011Geometry = new THREE.DodecahedronGeometry(0.12, 1);
const MD5_2011Material = new THREE.MeshStandardMaterial({
  map: new THREE.TextureLoader().load("./textures/asteroid.jpg"),
  bumpMap: new THREE.TextureLoader().load("./textures/asteroid.jpg"),
  bumpScale: 0.015,
});
const MD5_2011Mesh = new THREE.Mesh(MD5_2011Geometry, MD5_2011Material);
MD5_2011Mesh.position.set(-25.5, 2, 0);
MD5_2011Group.add(MD5_2011Mesh)
//MD5_2011Group.rotation.y = 0.5;

// Create the KJ9_1998 mesh
const KJ9_1998Group = new THREE.Group();
scene.add(KJ9_1998Group);
const KJ9_1998Geometry = new THREE.DodecahedronGeometry(0.05, 1);
const KJ9_1998Material = new THREE.MeshStandardMaterial({
  map: new THREE.TextureLoader().load("./textures/asteroid.jpg"),
  bumpMap: new THREE.TextureLoader().load("./textures/asteroid.jpg"),
  bumpScale: 0.015,
});
const KJ9_1998Mesh = new THREE.Mesh(KJ9_1998Geometry, KJ9_1998Material);
KJ9_1998Mesh.position.set(-16.5, 1, 0);
KJ9_1998Group.add(KJ9_1998Mesh)
KJ9_1998Group.rotation.y = 0.5;

// Create the Apophis mesh
const ApophisGroup = new THREE.Group();
scene.add(ApophisGroup);
const ApophisGeometry = new THREE.DodecahedronGeometry(0.02, 1);
const ApophisMaterial = new THREE.MeshStandardMaterial({
  map: new THREE.TextureLoader().load("./textures/asteroid.jpg"),
  bumpMap: new THREE.TextureLoader().load("./textures/asteroid.jpg"),
  bumpScale: 0.015,
});
const ApophisMesh = new THREE.Mesh(ApophisGeometry, ApophisMaterial);
ApophisMesh.position.set(-15.7, -1, 0);
ApophisGroup.add(ApophisMesh)
ApophisGroup.rotation.y = 0.7;

// Create the TY52_2012 mesh
const TY52_2012Group = new THREE.Group();
scene.add(TY52_2012Group);
const TY52_2012Geometry = new THREE.DodecahedronGeometry(0.01, 1);
const TY52_2012Material = new THREE.MeshStandardMaterial({
  map: new THREE.TextureLoader().load("./textures/asteroid.jpg"),
  bumpMap: new THREE.TextureLoader().load("./textures/asteroid.jpg"),
  bumpScale: 0.015,
});
const TY52_2012Mesh = new THREE.Mesh(TY52_2012Geometry, TY52_2012Material);
TY52_2012Mesh.position.set(24, -1, 0);
TY52_2012Group.add(TY52_2012Mesh)
TY52_2012Group.rotation.y = 1.2;


// Stars
/*const stars = getStarfield({ numStars: 500 });
scene.add(stars);*/

// Sun light
const sunLight = new THREE.DirectionalLight(0xffffff, 2.0);
sunLight.position.set(-2, 0.5, 1.5);
scene.add(sunLight);

// Moon group
const moonGroup = new THREE.Group();
scene.add(moonGroup);
const moonGeometry = new THREE.IcosahedronGeometry(MOON_RADIUS, 12);
const moonMaterial = new THREE.MeshStandardMaterial({
  map: new THREE.TextureLoader().load("./textures/06_moonmap4k.jpg"),
  bumpMap: new THREE.TextureLoader().load("./textures/07_moonbump4k.jpg"),
  bumpScale: 0.01,
});
const moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);
moonMesh.position.set(MOON_ORBIT_RADIUS, 0, 0);
moonGroup.add(moonMesh);

//moonlabel 
const  moonText = document.createElement('div')
moonText.style.cursor = 'pointer';
moonText.textContent = 'moon';
const moonLabel = new CSS2DObject(moonText);
moonLabel.element.style.color = 'white';
moonLabel.element.style.fontSize = '10px';
moonLabel.element.style.fontFamily = 'Arial';
scene.add(moonLabel);
moonLabel.position.copy(moonMesh.position);
moonGroup.add(moonLabel);

moonText.addEventListener('click', () => {
  createPopup('moon', '3,474.8 km', 'none', '363,300 km', 'every 28 days', './gif/moon.gif');
});
// Hover effect for the label
moonText.addEventListener('mouseover', () => {
  moonText.style.color = 'grey';
});
moonText.addEventListener('mouseout', () => {
  moonText.style.color = 'white';
});

//Apophislabel 
const  ApophisText = document.createElement('div')
ApophisText.style.cursor = 'pointer';
ApophisText.textContent = 'Apophis';
const ApophisLabel = new CSS2DObject(ApophisText);
ApophisLabel.element.style.color = 'white';
ApophisLabel.element.style.fontSize = '10px';
ApophisLabel.element.style.fontFamily = 'Arial';
scene.add(ApophisLabel);
ApophisLabel.position.copy(_ApophisMesh.position);
_ApophisGroup.add(ApophisLabel);

ApophisText.addEventListener('click', () => {
  createPopup('Apophis', '370 m', '2.7%', '31,860 km', 'April 13, 2029', './gif/apophis.gif');
});
// Hover effect for the label
ApophisText.addEventListener('mouseover', () => {
  ApophisText.style.color = 'grey';
});
ApophisText.addEventListener('mouseout', () => {
  ApophisText.style.color = 'white';
});

//bennulabel
const  bennuText = document.createElement('div')
bennuText.style.cursor = 'pointer';
bennuText.textContent = 'bennu';
const bennuLabel = new CSS2DObject(bennuText);
bennuLabel.element.style.color = 'white';
bennuLabel.element.style.fontSize = '10px';
bennuLabel.element.style.fontFamily = 'Arial';
scene.add(bennuLabel);
bennuLabel.position.copy(bennuMesh.position);
bennuGroup.add(bennuLabel);

bennuText.addEventListener('click', () => {
  createPopup('bennu', '525 m', '0.037%', '204,051 km', 'September 25, 2135', './gif/bennu.gif');
});
// Hover effect for the label
bennuText.addEventListener('mouseover', () => {
  bennuText.style.color = 'grey';
});
bennuText.addEventListener('mouseout', () => {
  bennuText.style.color = 'white';
});

//MD_2011label
const  MD_2011Text = document.createElement('div')
MD_2011Text.style.cursor = 'pointer';
MD_2011Text.textContent = '2011 MD';
const MD_2011Label = new CSS2DObject(MD_2011Text);
MD_2011Label.element.style.color = 'white';
MD_2011Label.element.style.fontSize = '10px';
MD_2011Label.element.style.fontFamily = 'Arial';
scene.add(MD_2011Label);
MD_2011Label.position.copy(MD_2011Mesh.position);
MD_2011Group.add(MD_2011Label);

MD_2011Text.addEventListener('click', () => {
  createPopup('2011 MD', '6.3 - 14 m', '0.01%', '12,000 km', 'June 27, 2011', './gif/2011md.gif');
});
// Hover effect for the label
MD_2011Text.addEventListener('mouseover', () => {
  MD_2011Text.style.color = 'grey';
});
MD_2011Text.addEventListener('mouseout', () => {
  MD_2011Text.style.color = 'white';
});

//Chelyabinsklabel  
const  ChelyabinskText = document.createElement('div')
ChelyabinskText.style.cursor = 'pointer';
ChelyabinskText.textContent = 'Chelyabinsk';
const ChelyabinskLabel = new CSS2DObject(ChelyabinskText);
ChelyabinskLabel.element.style.color = 'white';
ChelyabinskLabel.element.style.fontSize = '10px';
ChelyabinskLabel.element.style.fontFamily = 'Arial';
scene.add(ChelyabinskLabel);
ChelyabinskLabel.position.copy(ChelyabinskMesh.position);
ChelyabinskGroup.add(ChelyabinskLabel);

ChelyabinskText.addEventListener('click', () => {
  createPopup('Chelyabinsk', '18 m ±', '100%', 'impacted in Russia', 'February 15, 2013', './gif/chelyabinsk.gif');
});
// Hover effect for the label
ChelyabinskText.addEventListener('mouseover', () => {
  ChelyabinskText.style.color = 'grey';
});
ChelyabinskText.addEventListener('mouseout', () => {
  ChelyabinskText.style.color = 'white';
});


//TC3_2008label
const  TC3_2008Text = document.createElement('div')
TC3_2008Text.style.cursor = 'pointer';
TC3_2008Text.textContent = '2008 TC3';
const TC3_2008Label = new CSS2DObject(TC3_2008Text);
TC3_2008Label.element.style.color = 'white';
TC3_2008Label.element.style.fontSize = '10px';
TC3_2008Label.element.style.fontFamily = 'Arial';
scene.add(TC3_2008Label);
TC3_2008Label.position.copy(TC3_2008Mesh.position);
TC3_2008Group.add(TC3_2008Label);

TC3_2008Text.addEventListener('click', () => {
  createPopup('2008 TC3', '4.1 m ±', '100%', 'impacted in Sudan', 'Octomber 7, 2008', './gif/2008TC3.gif');
});
// Hover effect for the label
TC3_2008Text.addEventListener('mouseover', () => {
  TC3_2008Text.style.color = 'grey';
});
TC3_2008Text.addEventListener('mouseout', () => {
  TC3_2008Text.style.color = 'white';
});


//DZ2_2023label
const  DZ2_2023Text = document.createElement('div')
DZ2_2023Text.style.cursor = 'pointer';
DZ2_2023Text.textContent = '2023 DZ2';
const DZ2_2023Label = new CSS2DObject(DZ2_2023Text);
DZ2_2023Label.element.style.color = 'white';
DZ2_2023Label.element.style.fontSize = '10px';
DZ2_2023Label.element.style.fontFamily = 'Arial';
scene.add(DZ2_2023Label);
DZ2_2023Label.position.copy(DZ2_2023Mesh.position);
DZ2_2023Group.add(DZ2_2023Label);

DZ2_2023Text.addEventListener('click', () => {
  createPopup('2023 DZ2', '40 - 90 m', '0.25%', '129,737 km', 'April 18, 2004', './gif/2023DZ2.gif');
});
// Hover effect for the label
DZ2_2023Text.addEventListener('mouseover', () => {
  DZ2_2023Text.style.color = 'grey';
});
DZ2_2023Text.addEventListener('mouseout', () => {
  DZ2_2023Text.style.color = 'white';
});


//TU24_2007label
const  TU24_2007Text = document.createElement('div')
TU24_2007Text.style.cursor = 'pointer';
TU24_2007Text.textContent = '2007 TU24';
const TU24_2007Label = new CSS2DObject(TU24_2007Text);
TU24_2007Label.element.style.color = 'white';
TU24_2007Label.element.style.fontSize = '10px';
TU24_2007Label.element.style.fontFamily = 'Arial';
scene.add(TU24_2007Label);
TU24_2007Label.position.copy(TU24_2007Mesh.position);
TU24_2007Group.add(TU24_2007Label);

TU24_2007Text.addEventListener('click', () => {
  createPopup('2007 TU24', '250 m ±', '0.001%', '554,209 km', 'January 29, 2008', './gif/2007TU24.gif');
});
// Hover effect for the label
TU24_2007Text.addEventListener('mouseover', () => {
  TU24_2007Text.style.color = 'grey';
});
TU24_2007Text.addEventListener('mouseout', () => {
  TU24_2007Text.style.color = 'white';
});

//XF11_1997label
const  XF11_1997Text = document.createElement('div')
XF11_1997Text.style.cursor = 'pointer';
XF11_1997Text.textContent = '1997 XF11';
const XF11_1997Label = new CSS2DObject(XF11_1997Text);
XF11_1997Label.element.style.color = 'white';
XF11_1997Label.element.style.fontSize = '10px';
XF11_1997Label.element.style.fontFamily = 'Arial';
scene.add(XF11_1997Label);
XF11_1997Label.position.copy(XF11_1997Mesh.position);
XF11_1997Group.add(XF11_1997Label);

XF11_1997Text.addEventListener('click', () => {
  createPopup('1997 XF11', '704 m', '0.001%', '929,253 km', 'October 28, 2028', './gif/1997xf11.gif');
});
// Hover effect for the label
XF11_1997Text.addEventListener('mouseover', () => {
  XF11_1997Text.style.color = 'grey';
});
XF11_1997Text.addEventListener('mouseout', () => {
  XF11_1997Text.style.color = 'white';
});

//WN5_2001label
const  WN5_2001Text = document.createElement('div')
WN5_2001Text.style.cursor = 'pointer';
WN5_2001Text.textContent = '2001 WN5';
const WN5_2001Label = new CSS2DObject(WN5_2001Text);
WN5_2001Label.element.style.color = 'white';
WN5_2001Label.element.style.fontSize = '10px';
WN5_2001Label.element.style.fontFamily = 'Arial';
scene.add(WN5_2001Label);
WN5_2001Label.position.copy(WN5_2001Mesh.position);
WN5_2001Group.add(WN5_2001Label);

WN5_2001Text.addEventListener('click', () => {
  createPopup('2001 WN5', '932 m', '0.002%', '248,700 km', 'June 26, 2028', './gif/2001wn5.gif');
});
// Hover effect for the label
WN5_2001Text.addEventListener('mouseover', () => {
  WN5_2001Text.style.color = 'grey';
});
WN5_2001Text.addEventListener('mouseout', () => {
  WN5_2001Text.style.color = 'white';
});

//MD5_2011label
const  MD5_2011Text = document.createElement('div')
MD5_2011Text.style.cursor = 'pointer';
MD5_2011Text.textContent = '2011 MD5';
const MD5_2011Label = new CSS2DObject(MD5_2011Text);
MD5_2011Label.element.style.color = 'white';
MD5_2011Label.element.style.fontSize = '10px';
MD5_2011Label.element.style.fontFamily = 'Arial';
scene.add(MD5_2011Label);
MD5_2011Label.position.copy(MD5_2011Mesh.position);
MD5_2011Group.add(MD5_2011Label);

MD5_2011Text.addEventListener('click', () => {
  createPopup('2011 MD5', '1200 m', '0.001%', '350,000 km', 'September 17, 1918', './gif/2011md5.gif');
});
// Hover effect for the label
MD5_2011Text.addEventListener('mouseover', () => {
  MD5_2011Text.style.color = 'grey';
});
MD5_2011Text.addEventListener('mouseout', () => {
  MD5_2011Text.style.color = 'white';
});


//KJ9_1998label
const  KJ9_1998Text = document.createElement('div')
KJ9_1998Text.style.cursor = 'pointer';
KJ9_1998Text.textContent = '1998 KJ9';
const KJ9_1998Label = new CSS2DObject(KJ9_1998Text);
KJ9_1998Label.element.style.color = 'white';
KJ9_1998Label.element.style.fontSize = '10px';
KJ9_1998Label.element.style.fontFamily = 'Arial';
scene.add(KJ9_1998Label);
KJ9_1998Label.position.copy(KJ9_1998Mesh.position);
KJ9_1998Group.add(KJ9_1998Label);

KJ9_1998Text.addEventListener('click', () => {
  createPopup('1998 KJ9', '500 m', '2%', '232,000 km', 'December 31, 1914', './gif/1998kj9.gif');
});
// Hover effect for the label
KJ9_1998Text.addEventListener('mouseover', () => {
  KJ9_1998Text.style.color = 'grey';
});
KJ9_1998Text.addEventListener('mouseout', () => {
  KJ9_1998Text.style.color = 'white';
});

//TY52_2012label
const  TY52_2012Text = document.createElement('div')
TY52_2012Text.style.cursor = 'pointer';
TY52_2012Text.textContent = '2012 TY52';
const TY52_2012Label = new CSS2DObject(TY52_2012Text);
TY52_2012Label.element.style.color = 'white';
TY52_2012Label.element.style.fontSize = '10px';
TY52_2012Label.element.style.fontFamily = 'Arial';
scene.add(TY52_2012Label);
TY52_2012Label.position.copy(TY52_2012Mesh.position);
TY52_2012Group.add(TY52_2012Label);

TY52_2012Text.addEventListener('click', () => {
  createPopup('2012 TY52', '146 - 327 m', '0.001%', '314,400 km', 'November 04, 1982', './gif/2012ty52.gif');
});
// Hover effect for the label
TY52_2012Text.addEventListener('mouseover', () => {
  TY52_2012Text.style.color = 'grey';
});
TY52_2012Text.addEventListener('mouseout', () => {
  TY52_2012Text.style.color = 'white';
});





// Orbit
const orbitGeometry = new THREE.RingGeometry(MOON_ORBIT_RADIUS, MOON_ORBIT_RADIUS, 500);
const orbitMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
const orbit = new THREE.Line(orbitGeometry, orbitMaterial);
orbit.rotation.x = Math.PI / 2;
scene.add(orbit); 


// star sphere
const sphereGeometry = new THREE.SphereGeometry(200, 60, 60);
const sphereMaterial = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load("./textures/stars.jpg"),
  side: THREE.BackSide
});
const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphereMesh);

// Create a CSS2DRenderer instance
const css2dRenderer = new CSS2DRenderer();
css2dRenderer.setSize(window.innerWidth, window.innerHeight);
css2dRenderer.domElement.style.position = 'absolute';
css2dRenderer.domElement.style.top = '0px';
css2dRenderer.domElement.style.pointerEvents = 'auto'
document.body.appendChild(css2dRenderer.domElement);


// Controls
const controls = new OrbitControls(camera, css2dRenderer.domElement);
controls.maxDistance = CAMERA_ZOOM_MAX;
controls.minDistance = CAMERA_ZOOM_MIN;

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  earthMesh.rotation.y += 0.002;
  lightsMesh.rotation.y += 0.002;
  cloudsMesh.rotation.y += 0.0023;
  glowMesh.rotation.y += 0.002;
  //stars.rotation.y -= 0.0002;
  moonGroup.rotation.y += 0.0007;
  renderer.render(scene, camera);
  css2dRenderer.render(scene, camera);
}

animate();

// Handle window resize
function handleWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
