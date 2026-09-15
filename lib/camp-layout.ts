import * as THREE from 'three';

export const blockoutViews = {
  desktop: { position: [3, 17, 20], target: [-6, 0, -4], fov: 40 },
  mobile: { position: [0, 15, 24], target: [-1.4, 0, -3], fov: 52 },
} as const;

// Deliberately placed masses: no circular distribution and no scattered decoration.
export const blockoutMasses = [
  {group:'back-right',p:[6,3,-7],s:[4,6,3],r:-.18},
  {group:'back-right',p:[9,2.3,-3.5],s:[3,4.6,3],r:.24},
  {group:'back-right',p:[2.8,1.8,-8.5],s:[3,3.6,2.7],r:.08},
  {group:'back-left',p:[-7,.9,-9],s:[4,1.8,2],r:-.12},
  {group:'back-left',p:[-10,.65,-7.5],s:[2.8,1.3,2],r:.3},
  {group:'foreground',p:[-11,1.8,7],s:[3.7,3.6,3.3],r:.3},
  {group:'foreground',p:[10,1.3,7.5],s:[3.5,2.6,3],r:-.4},
] as const;

export function addBlockoutEnvironment(scene: THREE.Scene) {
  const surface=new THREE.MeshStandardMaterial({color:'#707681',roughness:1,metalness:0,flatShading:true});
  const foreground=new THREE.MeshStandardMaterial({color:'#232b39',roughness:1,metalness:0,flatShading:true});
  const groundMaterial=new THREE.MeshStandardMaterial({color:'#666d77',roughness:1,metalness:0});
  const ground=new THREE.Mesh(new THREE.PlaneGeometry(160,160),groundMaterial);ground.rotation.x=-Math.PI/2;ground.position.y=-.11;ground.receiveShadow=true;scene.add(ground);
  for(const item of blockoutMasses){const m=new THREE.Mesh(new THREE.BoxGeometry(item.s[0],item.s[1],item.s[2]),item.group==='foreground'?foreground:surface);m.position.set(item.p[0],item.p[1],item.p[2]);m.rotation.y=item.r;m.castShadow=true;m.receiveShadow=true;scene.add(m);}
  // Broad ribbon marks the entrance; it is a ground surface, not an outlined road.
  const curve=new THREE.CatmullRomCurve3([new THREE.Vector3(-13,-.09,13),new THREE.Vector3(-8,-.09,8),new THREE.Vector3(-6,-.09,3),new THREE.Vector3(-2,-.09,1)]);
  const points=curve.getPoints(24),positions:number[]=[],indices:number[]=[];
  points.forEach((p,i)=>{const tangent=curve.getTangent(i/24);const side=new THREE.Vector3(-tangent.z,0,tangent.x).normalize().multiplyScalar(1.1);positions.push(p.x+side.x,p.y,p.z+side.z,p.x-side.x,p.y,p.z-side.z);if(i<24){const k=i*2;indices.push(k,k+2,k+1,k+1,k+2,k+3);}});
  const pathGeo=new THREE.BufferGeometry();pathGeo.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));pathGeo.setIndex(indices);pathGeo.computeVertexNormals();const path=new THREE.Mesh(pathGeo,new THREE.MeshStandardMaterial({color:'#74787e',roughness:1,side:THREE.DoubleSide}));path.receiveShadow=true;scene.add(path);
  // Tent remains a single triangular-prism placeholder for a light-catching surface.
  const tentGeo=new THREE.CylinderGeometry(1.5,1.5,2.7,3,1,false);tentGeo.rotateZ(Math.PI/2);tentGeo.rotateX(Math.PI/6);
  const tent=new THREE.Mesh(tentGeo,new THREE.MeshStandardMaterial({color:'#81705b',roughness:1,flatShading:true}));tent.position.set(3,.75,-2.5);tent.rotation.y=-.4;tent.castShadow=true;tent.receiveShadow=true;scene.add(tent);
}
