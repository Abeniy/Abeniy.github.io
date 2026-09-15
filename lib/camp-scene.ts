import * as THREE from 'three';
import type { Theme } from './theme';
import {addBlockoutEnvironment, blockoutViews} from './camp-layout';

export function createCamp(canvas: HTMLCanvasElement, onReady: () => void, onSlow: () => void, positionHotspots: (points: Array<{x:number;y:number}>) => void, preview=false) {
  const renderer = new THREE.WebGLRenderer({canvas, antialias:true, alpha:false, preserveDrawingBuffer:true, powerPreference:'low-power'});
  renderer.outputColorSpace = THREE.SRGBColorSpace; renderer.toneMapping = THREE.ACESFilmicToneMapping;
  const scene = new THREE.Scene();
  const camera = preview ? new THREE.PerspectiveCamera(40,1,.1,200) : new THREE.OrthographicCamera(-16,16,11,-11,.1,160);
  renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.shadowMap.autoUpdate=false;
  const fog = new THREE.FogExp2('#101f2c',.017); scene.fog=fog;
  scene.background=new THREE.Color('#101f2c');
  const hemisphere = new THREE.HemisphereLight('#647bc5','#171e39',1); scene.add(hemisphere);
  const sun = new THREE.DirectionalLight('#708cff',2);sun.position.set(-8,14,5);sun.castShadow=true;sun.shadow.mapSize.set(1024,1024);Object.assign(sun.shadow.camera,{left:-20,right:20,top:20,bottom:-20,near:.5,far:60});sun.shadow.bias=-.001;sun.shadow.normalBias=.04;scene.add(sun);
  const fireLight = new THREE.PointLight('#ff9a45',15,14,1.6);fireLight.position.set(0,1.15,0);scene.add(fireLight);
  const fill = new THREE.DirectionalLight('#5169b9',.5);fill.position.set(8,6,-10);scene.add(fill);
  const materials: THREE.Material[]=[];
  const mat = (color: string, extra: THREE.MeshStandardMaterialParameters={})=>{const m=new THREE.MeshStandardMaterial({color,flatShading:true,roughness:1,...extra});materials.push(m);return m;};
  const groundMat=mat('#92938b'); const bark=mat('#655444');const leaves=mat('#3b514b');const leaves2=mat('#536553');
  const rockMat=mat('#727c90'); const coal=mat('#322b27');const skin=mat('#d2a185'); const hair=mat('#292b2a');
  const jacket=mat('#c08f52');const trousers=mat('#35474a');const boot=mat('#292f31');const cream=mat('#ffeed0');
  const mesh=(geo:THREE.BufferGeometry, material:THREE.Material, x=0,y=0,z=0,parent:THREE.Object3D=scene)=>{const m=new THREE.Mesh(geo,material);m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m;};
  let seed=281;const random=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};
  if(preview) addBlockoutEnvironment(scene);
  else {
  const groundGeo=new THREE.PlaneGeometry(100,100,65,65);groundGeo.rotateX(-Math.PI/2);
  const positions=groundGeo.attributes.position;
  for(let i=0;i<positions.count;i++){const x=positions.getX(i),z=positions.getZ(i);const edge=Math.min(1,Math.hypot(x,z)/14);positions.setY(i,-.10+(random()-.5)*.22*edge);}
  groundGeo.computeVertexNormals();mesh(groundGeo,groundMat);
  // Broken natural rock walls frame the clearing; the high camera never reveals a horizon.
  const cliffMat=mat('#697689');const cliffLight=mat('#849095');
  for(let i=0;i<25;i++){const a=Math.PI*.72+i/24*Math.PI*1.48;const radius=10.7+random()*1.8;const x=Math.cos(a)*radius*1.12,z=Math.sin(a)*radius;const h=1.3+random()*3.7;const r=mesh(new THREE.DodecahedronGeometry(1,0),i%3?cliffMat:cliffLight,x,h*.45,z);r.scale.set(1.4+random()*1.5,h,1.2+random()*1.6);r.rotation.set((random()-.5)*.35,random()*Math.PI,(random()-.5)*.35);if(i%2===0){const ledge=mesh(new THREE.DodecahedronGeometry(1,0),cliffMat,x*.89,.35,z*.9);ledge.scale.set(1.8,.5,1.2);ledge.rotation.y=random()*4;}}
  // Sparse ground detail uses instancing to preserve mobile performance.
  const grassMat=mat('#70775f',{side:THREE.DoubleSide});
  const bladeGeo=new THREE.BufferGeometry();bladeGeo.setAttribute('position',new THREE.Float32BufferAttribute([-.07,0,0,.07,0,0,.11,.5,.04],3));bladeGeo.computeVertexNormals();
  const grass=new THREE.InstancedMesh(bladeGeo,grassMat,1050);scene.add(grass);const transform=new THREE.Object3D();
  for(let i=0;i<350;i++){const a=random()*Math.PI*2;const radius=2.9+Math.pow(random(),.65)*11;const x=Math.cos(a)*radius,z=Math.sin(a)*radius;for(let j=0;j<3;j++){transform.position.set(x+(random()-.5)*.2,-.05,z+(random()-.5)*.2);transform.rotation.set(0,random()*6.28,(random()-.5)*.65);transform.scale.setScalar(.35+random()*.6);transform.updateMatrix();grass.setMatrixAt(i*3+j,transform.matrix);}}
  const pebbleGeo=new THREE.DodecahedronGeometry(.13,0);const pebbles=new THREE.InstancedMesh(pebbleGeo,rockMat,90);scene.add(pebbles);
  for(let i=0;i<90;i++){const a=random()*6.28,r=2.5+random()*10;transform.position.set(Math.cos(a)*r,.03,Math.sin(a)*r);transform.rotation.set(random(),random(),random());transform.scale.set(.5+random()*1.8,.3+random()*.6,.5+random());transform.updateMatrix();pebbles.setMatrixAt(i,transform.matrix);}
  function pine(x:number,z:number,height:number){const group=new THREE.Group();group.position.set(x,0,z);scene.add(group);mesh(new THREE.CylinderGeometry(.10,.24,height,5),bark,0,height/2,0,group);for(let level=0;level<3;level++){const h=height*(.55-level*.1);const radius=height*(.23-level*.035);const c=mesh(new THREE.ConeGeometry(radius,h,5),level%2?leaves2:leaves,0,height*(.46+level*.2),0,group);c.rotation.y=level*.7+random();}group.rotation.z=(random()-.5)*.08;}
  [[-12,-5,8],[-9,-12,7],[-15,-13,9],[10,-10,8],[14,-4,8],[-11,8,7]].forEach(([x,z,h])=>pine(x,z,h));
  }
  // A small ring of stones and crossed logs form the only camp props.
  for(let i=0;i<9;i++){const a=i/9*Math.PI*2;const r=mesh(new THREE.DodecahedronGeometry(.23+random()*.06,0),rockMat,Math.cos(a)*.74,.12,Math.sin(a)*.64);r.scale.set(1.15,.7,.9);r.rotation.set(random(),random(),random());}
  for(let i=0;i<4;i++){const log=mesh(new THREE.CylinderGeometry(.12,.16,1.13,7),coal,0,.18,0);log.rotation.z=Math.PI/2;log.rotation.y=i*Math.PI/4;}
  const flameGroup=new THREE.Group();scene.add(flameGroup);
  const flameMaterials=['#ff6b24','#ffb83f','#ffe69b'].map(color=>{const m=new THREE.MeshBasicMaterial({color});materials.push(m);return m;});
  const flames:THREE.Mesh[]=[];
  for(let i=0;i<7;i++){const h=.65+random()*.7;const f=mesh(new THREE.ConeGeometry(.15+random()*.12,h,5),flameMaterials[i%3],(random()-.5)*.48,.3+h/2,(random()-.5)*.4,flameGroup);f.rotation.z=(random()-.5)*.4;flames.push(f);}
  const person=new THREE.Group();person.position.set(1.65,0,.6);person.rotation.y=-.40;scene.add(person);
  const seat=mesh(new THREE.CylinderGeometry(.25,.3,1.4,7),bark,.2,.25,.3,person);seat.rotation.z=Math.PI/2;
  const torso=mesh(new THREE.CylinderGeometry(.26,.33,.78,7),jacket,0,.93,0,person);torso.rotation.z=-.10;
  mesh(new THREE.IcosahedronGeometry(.26,1),skin,-.07,1.58,-.01,person);
  const headHair=mesh(new THREE.IcosahedronGeometry(.275,1),hair,.015,1.67,.09,person);headHair.scale.set(1,1.07,.9);
  const pony=mesh(new THREE.ConeGeometry(.15,.45,5),hair,.18,1.38,.21,person);pony.rotation.z=.25;
  function limb(a:THREE.Vector3,b:THREE.Vector3,r:number,material:THREE.Material,parent=person){const delta=b.clone().sub(a);const m=mesh(new THREE.CylinderGeometry(r*.85,r,delta.length(),6),material,0,0,0,parent);m.position.copy(a.clone().add(b).multiplyScalar(.5));m.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),delta.normalize());return m;}
  const v=(x:number,y:number,z:number)=>new THREE.Vector3(x,y,z);
  for(const z of [-.17,.22]){limb(v(-.05,.62,z),v(-.55,.48,z),.16,trousers);limb(v(-.55,.48,z),v(-.72,.13,z+.1),.12,trousers);const shoe=mesh(new THREE.BoxGeometry(.38,.18,.23),boot,-.8,.10,z+.1,person);shoe.rotation.z=.1;}
  limb(v(-.10,1.2,-.23),v(-.43,.97,-.3),.1,jacket);limb(v(-.43,.97,-.3),v(-.72,1.04,-.36),.075,jacket);mesh(new THREE.IcosahedronGeometry(.09,0),skin,-.74,1.04,-.36,person);
  limb(v(.12,1.18,.23),v(-.15,.85,.35),.1,jacket);limb(v(-.15,.85,.35),v(-.45,.8,.24),.08,jacket);mesh(new THREE.IcosahedronGeometry(.09,0),skin,-.45,.8,.24,person);
  const stick=limb(v(-.74,1.04,-.36),v(-1.65,1.26,-.45),.018,bark);const marshmallow=mesh(new THREE.CylinderGeometry(.09,.09,.16,7),cream,-1.62,1.25,-.45,person);marshmallow.rotation.z=Math.PI/2;
  const starsGeo=new THREE.BufferGeometry();const starPositions=[];
  for(let i=0;i<100;i++){starPositions.push((random()-.5)*120,15+random()*40,-30-random()*50);}
  starsGeo.setAttribute('position',new THREE.Float32BufferAttribute(starPositions,3));const starsMat=new THREE.PointsMaterial({color:'#d6e7e3',size:.14,transparent:true,opacity:.8,depthWrite:false,fog:false});materials.push(starsMat);const stars=new THREE.Points(starsGeo,starsMat);scene.add(stars);
  const sparksGeo=new THREE.BufferGeometry();const sparksData=new Float32Array(18*3);const sparkSeeds=Array.from({length:18},()=>random());sparksGeo.setAttribute('position',new THREE.BufferAttribute(sparksData,3));const sparksMat=new THREE.PointsMaterial({color:'#ffba65',size:.032,transparent:true,opacity:.75,depthWrite:false});materials.push(sparksMat);scene.add(new THREE.Points(sparksGeo,sparksMat));
  const smokeMaterial=new THREE.MeshBasicMaterial({color:'#7b8c90',transparent:true,opacity:.025,depthWrite:false});materials.push(smokeMaterial);const smoke:THREE.Mesh[]=[];for(let i=0;i<5;i++){const s=mesh(new THREE.IcosahedronGeometry(.35,0),smokeMaterial,0,2+i*.4,0);smoke.push(s);}
  let desired:Theme='night';let blend=0;let paused=false;let disposed=false;let visible=true;let inView=true;let frame=0;let last=0;let time=0;let frames=0;let sample=0;let reduced=false;let ready=false;
  const nightSky=new THREE.Color('#0b1129'),daySky=new THREE.Color('#c8dbdc');const nightFog=new THREE.Color('#10172f'),dayFog=new THREE.Color('#c8d7ce');
  const moonColor=new THREE.Color('#8196d0'),sunColor=new THREE.Color('#fff0d5'),nightAmbient=new THREE.Color('#72819b'),dayAmbient=new THREE.Color('#bcd4e0');
  const pointer=new THREE.Vector2();const smooth=new THREE.Vector2();
  let mobile=false;
  function resize(){const w=canvas.clientWidth,h=canvas.clientHeight;if(!w||!h)return;mobile=w<760;renderer.setPixelRatio(Math.min(window.devicePixelRatio,mobile?1:1.5));renderer.setSize(w,h,false);
    if(camera instanceof THREE.PerspectiveCamera){const view=blockoutViews[mobile?'mobile':'desktop'];camera.aspect=w/h;camera.fov=view.fov;camera.position.set(view.position[0],view.position[1],view.position[2]);camera.lookAt(new THREE.Vector3(...view.target));}
    else{const halfHeight=mobile?12.5:10.5;camera.left=-halfHeight*w/h;camera.right=halfHeight*w/h;camera.top=halfHeight;camera.bottom=-halfHeight;camera.position.set(10,19,23);camera.lookAt(0,0,-2.6);}
    camera.updateProjectionMatrix();renderer.shadowMap.needsUpdate=true;draw(0);}
  const observer=new ResizeObserver(resize);observer.observe(canvas);
  function draw(dt:number){
    const target=desired==='day'?1:0;blend=reduced?target:THREE.MathUtils.lerp(blend,target,Math.min(1,dt/.10));if(Math.abs(blend-target)<.001)blend=target;
    (scene.background as THREE.Color).copy(nightSky).lerp(daySky,blend);fog.color.copy(nightFog).lerp(dayFog,blend);fog.density=THREE.MathUtils.lerp(.009,.006,blend);
    hemisphere.intensity=THREE.MathUtils.lerp(.35,1.8,blend);hemisphere.color.copy(nightAmbient).lerp(dayAmbient,blend);sun.color.copy(moonColor).lerp(sunColor,blend);sun.intensity=THREE.MathUtils.lerp(.95,2.8,blend);fill.intensity=THREE.MathUtils.lerp(.9,.35,blend);renderer.toneMappingExposure=THREE.MathUtils.lerp(.85,1.0,blend);
    starsMat.opacity=0;fireLight.intensity=THREE.MathUtils.lerp(35,4,blend)*(1+Math.sin(time*7)*.06);smokeMaterial.opacity=THREE.MathUtils.lerp(.025,.035,blend);
    for(let i=0;i<flames.length;i++){flames[i].scale.y=1+Math.sin(time*5+i*1.5)*.13;flames[i].rotation.y=time*.15+i;}
    person.scale.y=1+Math.sin(time*1.4)*.006;marshmallow.rotation.x=time*.15;
    for(let i=0;i<18;i++){const y=(time*.38+sparkSeeds[i]*3)%3;sparksData[i*3]=Math.sin(y*2+i)*(.08+y*.07);sparksData[i*3+1]=.65+y;sparksData[i*3+2]=Math.cos(y+i)*.15;}
    sparksGeo.attributes.position.needsUpdate=true;
    smoke.forEach((s,i)=>{const y=(time*.22+i*.5)%3;s.position.set(Math.sin(y)*.3,.8+y,-.05);s.scale.setScalar(.5+y*.5);});
    if(preview){camera.lookAt(new THREE.Vector3(...blockoutViews[mobile?'mobile':'desktop'].target));hemisphere.intensity=.45;sun.intensity=.65;fill.intensity=1.3;fireLight.intensity=42;fireLight.distance=10;fireLight.decay=2;renderer.toneMappingExposure=.95;smokeMaterial.opacity=0;sparksMat.opacity=0;}
    else{smooth.lerp(pointer,.04);camera.lookAt(smooth.x*.35,smooth.y*.2,-2.6);}
    renderer.render(scene,camera);
    positionHotspots([new THREE.Vector3(0,.8,0),new THREE.Vector3(1.65,1.1,.6)].map(p=>{p.project(camera);return {x:(p.x+1)*50,y:(1-p.y)*50};}));
    if(!ready){ready=true;onReady();}
  }
  function loop(now:number){frame=0;if(disposed||!visible||!inView)return;const dt=last?Math.min((now-last)/1000,.1):.016;last=now;if(!paused&&!reduced)time+=dt;draw(dt);if(!paused&&!reduced){sample+=dt;frames++;if(sample>6){if(frames/sample<22){onSlow();return;}sample=0;frames=0;}}if(!paused&&!reduced||Math.abs(blend-(desired==='day'?1:0))>.001)frame=requestAnimationFrame(loop);}
  function start(){if(!disposed&&!frame&&visible&&inView){last=0;frame=requestAnimationFrame(loop);}}
  function visibility(){visible=!document.hidden;if(!visible){cancelAnimationFrame(frame);frame=0;}else start();}
  const intersection=new IntersectionObserver(entries=>{inView=entries[0].isIntersecting;if(!inView){cancelAnimationFrame(frame);frame=0;}else start();});intersection.observe(canvas);
  const move=(e:PointerEvent)=>{if(mobile||paused||reduced||e.pointerType!=='mouse')return;pointer.set((e.clientX/window.innerWidth-.5)*2,-(e.clientY/window.innerHeight-.5)*2);};
  const leave=()=>pointer.set(0,0);window.addEventListener('pointermove',move);document.addEventListener('pointerleave',leave);document.addEventListener('visibilitychange',visibility);
  resize();start();
  return {setTheme(theme:Theme,immediate=false){desired=preview?'night':theme;if(immediate)blend=desired==='day'?1:0;start();},setPaused(value:boolean){paused=value;pointer.set(0,0);start();},setReduced(value:boolean){reduced=value;pointer.set(0,0);start();},dispose(){disposed=true;cancelAnimationFrame(frame);observer.disconnect();intersection.disconnect();window.removeEventListener('pointermove',move);document.removeEventListener('pointerleave',leave);document.removeEventListener('visibilitychange',visibility);const owned=new Set(materials);const geometries=new Set<THREE.BufferGeometry>();scene.traverse(object=>{if(object instanceof THREE.Mesh||object instanceof THREE.Points){geometries.add(object.geometry);(Array.isArray(object.material)?object.material:[object.material]).forEach(m=>owned.add(m));}});geometries.forEach(g=>g.dispose());owned.forEach(m=>m.dispose());sun.shadow.dispose();renderer.dispose();renderer.forceContextLoss();}};
}
