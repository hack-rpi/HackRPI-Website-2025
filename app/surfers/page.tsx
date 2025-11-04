"use client";

import { useEffect, useRef } from "react";
import * as THREE from 'three';

import "@/app/globals.css";
import { mx_bilerp_0 } from "three/src/nodes/materialx/lib/mx_noise.js";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const ThreeJSPage = () => {

	const canvasRef = useRef<HTMLDivElement | null>(null);
	var keys: any[] = [];
	var lanes = {
		characterRow: 0,
		laneWidth: 3,
		minLane: -1,
		maxLane: 1
	}
	var physics = {
		gravity: 0.01,
		jumpForce: 0.3,
		rollForce: 0.6,
		speed: 0.1,
		yv: 0,
		touchingGround: false
	};
	var char = {
		camAngle: 0,
		camDist: 3,
		score: 0
	}
	var map = {
		speed: 0.1,
		loading: 30,
		dist: 0,
		loadDist: -40,
		loadedDist: 0,
		objects: [] as THREE.Object3D[],
		previous: [0,0,0],
		currentGeneratingPosition: 1,
		tileSize: 6,
		presets: [
			// { // train
			// 	id: 1,
			// 	geometry: new THREE.BoxGeometry(2, 2, 4.7),
			// 	material: new THREE.MeshBasicMaterial({ color: `rgb(${Math.round(Math.random()*255)},${Math.round(Math.random()*255)},${Math.round(Math.random()*255)})` })
			// },
			{ // ramp up
				id: 2,
				geometry: new THREE.BoxGeometry(2, 1, 4.7),
				material: new THREE.MeshBasicMaterial({ color: `rgb(${Math.round(Math.random()*255)},${Math.round(Math.random()*255)},${Math.round(Math.random()*255)})` })
			},
			{ // little stop
				id: 3,
				geometry: new THREE.BoxGeometry(2, 1, 1),
				material: new THREE.MeshBasicMaterial({ color: `rgb(${Math.round(Math.random()*255)},${Math.round(Math.random()*255)},${Math.round(Math.random()*255)})` })
			},
			{ // big stop
				id: 4,
				geometry: new THREE.BoxGeometry(2, 3, 1),
				material: new THREE.MeshBasicMaterial({ color: `rgb(${Math.round(Math.random()*255)},${Math.round(Math.random()*255)},${Math.round(Math.random()*255)})` })
			},
			{ // tunnel
				id: 5,
				geometry: new THREE.BoxGeometry(0, 0, 4.7),
				material: new THREE.MeshBasicMaterial({ color: `rgb(${Math.round(Math.random()*255)},${Math.round(Math.random()*255)},${Math.round(Math.random()*255)})` })
			}
		] as any
	}
	let animationId = useRef<number | null>(null);
	let instance = 0;

	var scene: any;
	var camera: any;
	var renderer: any;
	var character: any | null;
	var blockedKeys: any[] = [];

	var cameraMan = {
		ref: useRef<HTMLDivElement | null>(null),
		renderer: null as any,
		camera: null as any,
		ratio: 0.2,
		angle: Math.PI,
		dist: 1.5
	}








	useEffect(() => {
		instance+=1;
		document.body.style.overflow = "hidden";

		async function loadModels(){
			scene = new THREE.Scene();
			camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
			cameraMan.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
			renderer = new THREE.WebGLRenderer();
			cameraMan.renderer = new THREE.WebGLRenderer();

			let loads = 2;

			const loader = new GLTFLoader();
			
			loader.load('/surfers/characters/shittysurferman.glb', (gltf) => {
				character = gltf.scene;
				character.scale.set(0.2,0.2,0.2);
				character.position.set(0.5,2,0);
				character.rotation.set(0,Math.PI/2,0);
				
				let box = new THREE.Box3();
				box.setFromObject(character);
				let size = new THREE.Vector3();
				box.getSize(size);
				character.geometry = {
					parameters: {
						height: Math.floor(size.y*100)/100
					}
				};
				
				let skinnedMesh = character.getObjectByProperty('type', 'SkinnedMesh');
				let skeleton = skinnedMesh.skeleton;
				character.skeleton = {
					head: character.getObjectByName('Head'),
					spine: character.getObjectByName('Spine'),
					torso: character.getObjectByName('Torso'),
					leftLeg: character.getObjectByName('LeftLeg'),
					leftLegLower: character.getObjectByName('LeftLegLower'),
					rightLeg: character.getObjectByName('RightLeg'),
					rightLegLower: character.getObjectByName('RightLegLower'),
				}
				character.animations = [
					{arr: [
							{name: 'head', x:  45, y: 0, z: 0, motion: 'linear'},
							{name: 'leftLeg', x:  0, y: -30, z: 30, motion: 'linear'},
							{name: 'rightLeg', x:  0, y: 30, z: 150, motion: 'linear'},
							{name: 'rightLegLower', x:  0, y: 0, z: 0, motion: 'linear'},
							{name: 'leftLegLower', x:  0, y: 0, z: 0, motion: 'linear'},
						], speed: 0.05},
					{arr: [
							{name: 'head', x:  -45, y: 0, z: 0, motion: 'linear'},
							{name: 'leftLeg', x:  0, y: -30, z: 150, motion: 'linear'},
							{name: 'rightLeg', x: 0, y: 30, z: 30, motion: 'linear'},
							{name: 'rightLegLower', x:  0, y: 0, z: 0, motion: 'linear'},
							{name: 'leftLegLower', x:  0, y: 0, z: 0, motion: 'linear'},
						], speed: 0.05}
				];

				scene.add(character);
				loads-=1;
			});

			loader.load('/surfers/environment/train.glb', (gltf) => {
				let train: any | null;
				train = gltf.scene;
				train.scale.set(0.3,0.3,0.3);
				train.rotation.set(0,Math.PI/2,0);
				
				let box = new THREE.Box3();
				box.setFromObject(train);
				let size = new THREE.Vector3();
				box.getSize(size);
				
				train.geometry = {
					parameters: {
						height: Math.floor(size.y*100)/100,
						width: Math.floor(size.x*100)/100,
						depth: Math.floor(size.z*100)/100
					}
				};

				map.presets.push(
					{
						id: 1,
						object: train
					} as any);
				loads-=1;
			});

			function check(){
				if(loads<=0){
					init();
					console.log('Initializing...');
				}else{
					window.setTimeout(check,1);
				}
			}
			window.setTimeout(check,1);
		}
		if(instance>1) loadModels();

		function init(){
			cameraMan.renderer.setSize(window.innerWidth*cameraMan.ratio, window.innerHeight*cameraMan.ratio);
			renderer.setSize(window.innerWidth, window.innerHeight);
			if (canvasRef.current) canvasRef.current.appendChild(renderer.domElement); // Append the canvas to the ref
			if (cameraMan.ref.current) cameraMan.ref.current.appendChild(cameraMan.renderer.domElement); // Append the canvas to the ref
			
			let groundGeometry = new THREE.PlaneGeometry(10, 100);
			let groundMaterial = new THREE.MeshBasicMaterial({ color: 0x7cfc00 });
			let ground = new THREE.Mesh(groundGeometry, groundMaterial);
			ground.rotation.x = -Math.PI / 2;
			ground.position.x = 0;
			scene.add(ground);

			let color = 0xFFFFFF;
			let light = new THREE.AmbientLight(color, 5);
			scene.add(light);

			let light2 = new THREE.PointLight(color, 150);
			light2.position.set(5, 5, 5);
			scene.add(light2);

			camera.position.z = 5;
			camera.position.y = 2;
			camera.lookAt(character.position);

			animate();

			let badge = document.getElementById('mlh-trust-badge');
			if(badge != null){
				let css = "#mlh-trust-badge{ opacity: 0; transition: 0.5s ease-out } #mlh-trust-badge:hover{ opacity: 0.7; }";
				let style = document.createElement('style');
				style.setAttribute('type', "text/css");

				if ('styleSheet' in style) {
					(style.styleSheet as any).cssText = css;
				} else {
					style.innerHTML = css;
				}
				document.getElementsByTagName('head')[0].appendChild(style);
			}
		}






		function removeKey(key: string) {
			keys = keys.filter(k => k !== key);
			blockedKeys.push(key);
		}

		const listenKeyDown = function(event: { key: any; }){ if (!keys.includes(event.key.toLowerCase()) && !blockedKeys.includes(event.key.toLowerCase())) keys.push(event.key.toLowerCase());}
		const listenKeyUp = function(event: { key: any; }){ keys = keys.filter(key => key !== event.key.toLowerCase()); blockedKeys = blockedKeys.filter(key => key !== event.key.toLowerCase()); }

		const resize = function() {
			if (canvasRef.current && canvasRef.current.children.length > 0) {
				let canvas = renderer.domElement;
				canvas.style.width = window.innerWidth+'px';
				canvas.style.height = window.innerHeight+'px';

				camera.aspect = canvas.clientWidth / canvas.clientHeight;
				camera.updateProjectionMatrix();
			}
			if (cameraMan.ref.current && cameraMan.ref.current.children.length > 0) {
				let canvas = cameraMan.renderer.domElement;
				canvas.style.width = window.innerWidth*cameraMan.ratio+'px';
				canvas.style.height = window.innerHeight*cameraMan.ratio+'px';

				cameraMan.camera.aspect = canvas.clientWidth / canvas.clientHeight;
				cameraMan.camera.updateProjectionMatrix();
			}
		}
		window.addEventListener('keydown', listenKeyDown);
		window.addEventListener('keyup', listenKeyUp);
		window.addEventListener('resize', resize)

		function makeCustomBox(width: number | undefined, height: number | undefined, depth: number | undefined, x: any, y: any, z: any){
			var tempGeometry = new THREE.BoxGeometry(width, height, depth);
			var tempMaterial = new THREE.MeshBasicMaterial({ color: `rgb(${Math.round(Math.random()*255)},${Math.round(Math.random()*255)},${Math.round(Math.random()*255)})` });
			var temp = new THREE.Mesh(tempGeometry, tempMaterial);
			temp.position.y = x;
			temp.position.z = y;
			temp.position.x = z;
			scene.add(temp);
			return temp;
		}
		function makeModel(id: number, x: any, y: any, z: any){
			for(let i = 0; i < map.presets.length; i++){
				if(map.presets[i].id==id){
					var temp;
					if(map.presets[i].object){
						temp = map.presets[i].object.clone();
						temp.geometry = map.presets[i].object.geometry;
						temp.position.y = x;
						temp.position.z = y;
						temp.position.x = z;
					}else{
						temp = new THREE.Mesh(map.presets[i].geometry,  map.presets[i].material);
						temp.geometry = map.presets[i].geometry;
						temp.position.y = x+temp.geometry.parameters.height/2;
						temp.position.z = y;
						temp.position.x = z;
					}
						
					scene.add(temp);
					map.objects.push(temp);
					return temp;
				}
			}
		}

		function charMove(){
			character.position.x += ((lanes.characterRow*lanes.laneWidth)-character.position.x)*0.2;

			if(character.position.y + physics.yv < character.geometry.parameters.height/2) physics.yv = -(character.position.y - character.geometry.parameters.height/2);
			physics.yv = parseFloat(physics.yv.toFixed(3));
			character.position.y += physics.yv;

			camera.position.y = character.position.y + 1.5;
			camera.position.x = character.position.x+Math.sin(char.camAngle)*char.camDist;
			camera.position.z = character.position.z+Math.cos(char.camAngle)*char.camDist;
			char.camAngle = ((lanes.characterRow*0.3 - char.camAngle)*0.1)+char.camAngle;

			camera.lookAt(character.position);

			character.position.y = Math.round(character.position.y * 1000) / 1000;
			if(character.position.y <= (character.geometry.parameters.height/2) + 0){
				character.position.y = character.geometry.parameters.height/2;
				physics.touchingGround = true;
				physics.yv = 0;
			}else{
				physics.touchingGround = false;
				physics.yv -= physics.gravity;
			}

			cameraMan.angle = (cameraMan.angle+=0.01) % (Math.PI*2);
			cameraMan.camera.position.z = character.position.z+0.4+Math.cos(cameraMan.angle)*cameraMan.dist;
			cameraMan.camera.position.y = character.position.y+character.geometry.parameters.height/2;
			cameraMan.camera.position.x = character.position.x+Math.sin(cameraMan.angle)*cameraMan.dist;
			cameraMan.camera.lookAt(character.position.x, character.position.y+character.geometry.parameters.height/2, character.position.z);
		}

		function mapMove(){
			for(let i = 0; i < map.objects.length; i++){
				map.objects[i].position.z+=map.speed;

				let mesh = map.objects[i] as any; //THREE.Mesh | THREE.Object3D;
				if(map.objects[i].position.z > 10 + mesh.geometry.parameters.depth){
					try{
						(map.objects[i] as THREE.Mesh).geometry.dispose();
						((map.objects[i] as THREE.Mesh).material as THREE.Material).dispose();
					}catch{}
					scene.remove(map.objects[i]);
					map.objects.splice(i, 1);
					i--;
				}
			}
			map.dist+=map.speed;
			map.loadedDist-=map.speed;
		}

		function loadMap(){
			let mapSet = [map.previous];
			let generatingPosition = map.currentGeneratingPosition;
			//0 is ground
			//1 is train
			//2 is ramp up
			//3 is little stop thing
			//4 is big stop thing
			//5 is tunner

			for(let i = 0; i < 10; i++){
				let previousTile = mapSet[mapSet.length-1][generatingPosition];
				let nextTile = -1;
				let potential;

				switch(previousTile){
					case 0:
						potential = [0,2,3,4,5];
						nextTile = potential[Math.floor(Math.random()*potential.length)];
						break;
					case 1:
						potential = [0,1];
						nextTile = potential[Math.floor(Math.random()*potential.length)];
						break;
					case 2:
						potential = [1,0];
						nextTile = potential[Math.floor(Math.random()*potential.length)];
						break;
					case 3:
						potential = [0,5];
						nextTile = potential[Math.floor(Math.random()*potential.length)];
						break;
					case 4:
						potential = [0,5];
						nextTile = potential[Math.floor(Math.random()*potential.length)];
						break;
					case 5:
						potential = [0,5];
						nextTile = potential[Math.floor(Math.random()*potential.length)];
						break;
				}

				let temp = [];
				for(let x = 0; x < map.previous.length; x++) temp.push(-1);
				temp[generatingPosition] = nextTile;

				if(Math.random()>0.5){
					let previousGeneratingPosition = generatingPosition;
					generatingPosition = Math.floor(Math.random()*temp.length);
					for(let o = 0; o < temp.length; o ++){
						if(o >= previousGeneratingPosition && o <= generatingPosition || o <= previousGeneratingPosition && o >= generatingPosition)
							temp[o] = nextTile;
					}
				}

				mapSet.push(temp);
			}

			for(let i = 0; i < mapSet.length; i++){
				for(let o = 0; o < mapSet[i].length; o++){
					if(mapSet[i][o]==-1){
						mapSet[i][o] = Math.floor(Math.random()*6);
					}
				}
			}
			map.previous = mapSet[mapSet.length-1];
			map.currentGeneratingPosition = generatingPosition;

			for(let y = 0; y < mapSet.length; y++){
				for(let i = 0; i < mapSet[y].length; i++){
					makeModel(mapSet[y][i],0, map.loadDist+(y*-map.tileSize), (i+lanes.minLane)*lanes.laneWidth);
				}
				map.loadedDist+=map.tileSize;
			}
			return mapSet;
		}

		function mixAnimation(body: any){

			if(!body.frame) body.frame = 0;

			let thisFrame = Math.floor(body.frame);
			let nextFrame = (thisFrame+1)%body.animations.length;
			let percentageToNext = (body.frame%1)

			for(let i = 0; i < body.animations[thisFrame].arr.length; i++){
				let jointData = body.animations[thisFrame].arr[i];
				let bone = body.skeleton[jointData.name];
				let targetJointData = body.animations[nextFrame].arr[i];

				if(jointData.motion == 'linear'){
					bone.rotation.x = (jointData.x + (targetJointData.x-jointData.x)*percentageToNext) * (Math.PI/180);
					bone.rotation.y = (jointData.y + (targetJointData.y-jointData.y)*percentageToNext) * (Math.PI/180);
					bone.rotation.z = (jointData.z + (targetJointData.z-jointData.z)*percentageToNext) * (Math.PI/180);
				}

			}

			body.frame=(body.frame+body.animations[thisFrame].speed)%body.animations.length;
		}
		function characterAnimations(){
			mixAnimation(character);
			
		}









		const animate = () => {
			animationId.current = requestAnimationFrame(animate);

			if((keys.includes("w") || keys.includes('arrowup')) && physics.touchingGround){
				physics.yv = physics.jumpForce;
				if(keys.includes("w")) removeKey("w");	
				if(keys.includes("arrowup")) removeKey("arrowup");
			}
			if(keys.includes("s") || keys.includes('arrowdown')){
				physics.yv = -physics.rollForce;
				if(keys.includes("s")) removeKey("s");	
				if(keys.includes("arrowdown")) removeKey("arrowdown");
			}
			if(keys.includes("a") || keys.includes('arrowleft')) {
				if(lanes.characterRow > lanes.minLane){
					lanes.characterRow--;
				}
				if(keys.includes("a")) removeKey("a");
				if(keys.includes("arrowleft")) removeKey("arrowleft");
			}
			if(keys.includes("d") || keys.includes('arrowright')) {
				if(lanes.characterRow < lanes.maxLane){
					lanes.characterRow++;
				}
				if(keys.includes("d")) removeKey("d");
				if(keys.includes("arrowright")) removeKey("arrowright");
			}

			if(keys.includes(" ")) {
				//Get hoverboard
				if(keys.includes(" ")) removeKey(" ");
			}	

			if(keys.includes("z")) {
				// makeModel(1,0, map.loadDist+(0*-map.tileSize), (0+lanes.minLane)*lanes.laneWidth);
				scene.add(makeModel(1,0,0,0));
				// map.speed*=2;
				if(keys.includes("z")) removeKey("z");
			}	
			
			// console.log(map.objects)

			charMove();
			if(map.loading > 0)
				map.loading-=1;
			if(map.loadedDist<=0 && map.loading<1) loadMap();
			mapMove();

			characterAnimations();


			//TODO: 
			// make models in Blender and import
			// make collision detection

			// add a nicer skybox and background scene + lighting
			// implement score and coins.

			//add leaderboard and shop

			// light2.position.set(character.position.x, character.position.y, character.position.z);
			// cockroach idea (maybe if console is opened

			renderer.render(scene, camera);
			cameraMan.renderer.render(scene, cameraMan.camera);

			
		};
		
		return () => {
			try{
				if (canvasRef.current) canvasRef.current.removeChild(renderer.domElement);
			}catch{}
			window.removeEventListener('keydown', listenKeyDown);
			window.removeEventListener('keyup', listenKeyUp);
			window.removeEventListener('resize', resize);
			if (animationId.current) cancelAnimationFrame(animationId.current);
		};
	}, []);

	return (<>
		<div ref={canvasRef} style={{ width: '100%', height: '100vh' }}></div>
		<div ref={cameraMan.ref} style={{ position: 'absolute', top: '0', right: '0', borderBottomLeftRadius: '10px'}}></div>
	</>);
};

export default ThreeJSPage;
