"use client";

import { useEffect, useRef } from "react";
import * as THREE from 'three';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

// import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'; // Correct import for FontLoader
// import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'; // Correct import for TextGeometry


import "@/app/globals.css";
import { mx_bilerp_0 } from "three/src/nodes/materialx/lib/mx_noise.js";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { text } from "stream/consumers";
import { numberToCloudFormation } from "aws-cdk-lib";

const ThreeJSPage = () => {

	const canvasRef = useRef<HTMLDivElement | null>(null);
	const scoreKeeper = useRef<HTMLDivElement | null>(null);
	const sendScore = useRef<HTMLButtonElement | null>(null);
	const endGame = useRef<HTMLDivElement | null>(null);
	const endName = useRef<HTMLInputElement | null>(null);

	var keys: any[] = [];
	var lanes = {
		characterRow: 0,
		laneWidth: 3,
		minLane: -1,
		maxLane: 1
	}
	var physics = {
		gravity: 0.01,
		jumpForce: 0.2,
		superJumpForce: 0.3,
		rollForce: 0.6,
		speed: 0.1,
		yv: 0,
		touchingGround: false as any,
		touchingPlatform: false as any
	};
	var char = {
		camAngle: 0,
		camDist: 4,
		score: 0
	}
	var map = {
		speed: 0.2,
		acceleration: 0.8/(10*60*100),
		loading: 30,
		dist: 0,
		loadDist: -40,
		loadedDist: 0,
		objects: [] as any,
		previous: [0,0,0],
		currentGeneratingPosition: 1,
		tileSize: 6,
		lines: [] as any,
		lineSpace: 5,
		heightMap: [0,0,0] as any,
		presets: [
			// 	id: 1, train
			// 	id: 2, ramp up
			// 	id: 3, little stop
			// 	id: 4, big stop
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

	var collision = {
		charFront: null as any,
		charBack: null as any,
		previouslyAboveGround: false,
		previousHeight: 0,
		previousLane: 1 as any,
		laneChange: 0,
		tripTimer: 0
	}

	var randomCrap = {
		score: 0,
		name: '',
		gameBegan: false,
		leaderBoard: [] as any,
		leaderBoardObjects: [] as any,
		cameraShake: 0,
		shakeTimer: 0,
		lostGame: false,
		sun: null as any,
		song: null as any

	}


	useEffect(() => {
		instance+=1;
		document.body.style.overflow = "hidden";

		async function loadModels(){
			scene = new THREE.Scene();
			camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
			cameraMan.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
			renderer = new THREE.WebGLRenderer({alpha: true});
			cameraMan.renderer = new THREE.WebGLRenderer();

			let loads = 7;

			const loader = new GLTFLoader();

			loader.load('/surfers/characters/sprite.glb', (gltf) => {

				character = gltf.scene;
				character.scale.set(0.2,0.2,0.2);
				character.position.set(0.5,2,0);
				character.rotation.set(0,Math.PI/2,0);
				
				let skinnedMesh = character.getObjectByProperty('type', 'SkinnedMesh');
				let skeleton = skinnedMesh.skeleton;
				character.skeleton = {
					torso: character.getObjectByName('Torso'),
					leftHip: character.getObjectByName('LeftHip'),
					leftLeg: character.getObjectByName('LeftLeg'),
					leftLegLower: character.getObjectByName('LeftLegLower'),
					reftHip: character.getObjectByName('RightHip'),
					rightLeg: character.getObjectByName('RightLeg'),
					rightLegLower: character.getObjectByName('RightLegLower'),
				}
				character.animations.walk = [
					{arr: [
							{name: 'leftLeg', x:  -90, y: 0, z: 90, motion: 'jitter'},
							{name: 'rightLeg', x:  90, y: 0, z: -90, motion: 'jitter'},
							{name: 'torso', x:  0, y: 0, z: 0, motion: 'jitter'},
						], speed: 0.05},
					{arr: [
							{name: 'leftLeg', x:  -90, y: 0, z: 0, motion: 'jitter'},
							{name: 'rightLeg', x:  90, y: 0, z: 0, motion: 'jitter'},
							{name: 'torso', x:  0, y: 0, z: 0, motion: 'jitter'},
						], speed: 0.05},
					{arr: [
							{name: 'leftLeg', x:  -90, y: 0, z: -90, motion: 'jitter'},
							{name: 'rightLeg', x: 90, y: 0, z: 90, motion: 'jitter'},
							{name: 'torso', x:  0, y: 0, z: 0, motion: 'jitter'},
						], speed: 0.05},
					{arr: [
							{name: 'leftLeg', x:  -90, y: 0, z: 0, motion: 'jitter'},
							{name: 'rightLeg', x:  90, y: 0, z: 0, motion: 'jitter'},
							{name: 'torso', x:  0, y: 0, z: 0, motion: 'jitter'},
						], speed: 0.05},
				];
				character.animations.die = [
					{arr: [
							{name: 'leftLeg', x:  -70, y: 0, z: 0, motion: 'linear'},
							{name: 'rightLeg', x:  70, y: 0, z: 0, motion: 'linear'},
							{name: 'torso', x:  0, y: 0, z: 90, motion: 'linear'},
						], speed: 0.15},
					{arr: [
							{name: 'leftLeg', x:  -90, y: 0, z: 0, motion: 'linear'},
							{name: 'rightLeg', x:  90, y: 0, z: 0, motion: 'linear'},
							{name: 'torso', x:  0, y: 0, z: 90, motion: 'linear'},
						], speed: 0.15}
				];
				character.animations.fall = [
					{arr: [
							{name: 'leftLeg', x:  -90, y: 0, z: -100, motion: 'linear'},
							{name: 'rightLeg', x:  90, y: 0, z: -100, motion: 'linear'},
							{name: 'torso', x:  0, y: 0, z: -30, motion: 'linear'},
						], speed: 0.05},
					{arr: [
						{name: 'leftLeg', x:  -90, y: 0, z: -100, motion: 'linear'},
						{name: 'rightLeg', x:  90, y: 0, z: -100, motion: 'linear'},
						{name: 'torso', x:  0, y: 0, z: -30, motion: 'linear'},
					], speed: 0.05}
				];
				character.animations.idle = [
					{arr: [
							{name: 'leftLeg', x:  -90, y: 0, z: 0, motion: 'jitter'},
							{name: 'rightLeg', x:  90, y: 0, z: 0, motion: 'jitter'},
							{name: 'torso', x:  0, y: 0, z: 0, motion: 'jitter'},
						], speed: 0.05},
					{arr: [
							{name: 'leftLeg', x:  -90, y: 0, z: 0, motion: 'jitter'},
							{name: 'rightLeg', x:  90, y: 0, z: 0, motion: 'jitter'},
							{name: 'torso', x:  0, y: 0, z: 0, motion: 'jitter'},
						], speed: 0.05}
				];

				scene.add(character);
				loads-=1;
			});

			loader.load('/surfers/characters/shittysurferman.glb', (tempModel) => {

				let tempcharacter = tempModel.scene;
				tempcharacter.scale.set(0.2,0.2,0.2);
				tempcharacter.position.set(0.5,2,0);
				tempcharacter.rotation.set(0,Math.PI/2,0);
				
				let box = new THREE.Box3();
				box.setFromObject(tempcharacter);
				let size = new THREE.Vector3();
				box.getSize(size);

				
				character.geometry = {
					parameters: {
						height: Math.floor(size.y*100)/100,
						width: Math.floor(size.x*100)/100,
						depth: Math.floor(size.z*100)/100
					}
				};

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

			loader.load('/surfers/environment/clippy.glb', (gltf) => {
				let model: any | null;
				model = gltf.scene;
				model.scale.set(1,1,1);
				
				let box = new THREE.Box3();
				box.setFromObject(model);
				let size = new THREE.Vector3();
				box.getSize(size);
				
				model.geometry = {
					parameters: {
						height: Math.floor(size.y*100)/100,
						width: Math.floor(size.x*100)/100,
						depth: Math.floor(size.z*100)/100
					}
				};

				map.presets.push(
					{
						id: 3,
						object: model
					} as any);
				loads-=1;
			});

			loader.load('/surfers/environment/warning.glb', (gltf) => {
				let model: any | null;
				model = gltf.scene;
				model.scale.set(0.4,0.4,0.4);
				model.rotation.set(0, -Math.PI/2, 0);
				model.position.set(0,2,0);
				
				let box = new THREE.Box3();
				box.setFromObject(model);
				let size = new THREE.Vector3();
				box.getSize(size);
				
				model.geometry = {
					parameters: {
						height: Math.floor(size.y*100)/100,
						width: Math.floor(size.x*100)/100,
						depth: Math.floor(size.z*100)/100,
						heightOffset: 2
					}
				};

				map.presets.push(
					{
						id: 4,
						object: model
					} as any);
				loads-=1;
			});

			loader.load('/surfers/environment/ramp.glb', (gltf) => {
				let model: any | null;
				model = gltf.scene;
				model.scale.set(0.7,0.8,0.55);
				
				let box = new THREE.Box3();
				box.setFromObject(model);
				let size = new THREE.Vector3();
				box.getSize(size);
				
				model.geometry = {
					parameters: {
						height: Math.floor(2.87*100)/100,
						width: Math.floor(size.x*100)/100,
						depth: Math.floor(size.z*100)/100,
						depthOffset: 0.6
					}
				};

				map.presets.push(
					{
						id: 2,
						object: model
					} as any);
				loads-=1;
			});

			loader.load('/surfers/environment/retroSun.glb', (gltf) => {
				let model: any | null;
				model = gltf.scene;
				model.scale.set(1,1,1);
				model.rotation.set(0,-Math.PI/2, 0);
				
				let box = new THREE.Box3();
				box.setFromObject(model);
				let size = new THREE.Vector3();
				box.getSize(size);
				
				model.geometry = {
					parameters: {
						height: Math.floor(2.87*100)/100,
						width: Math.floor(size.x*100)/100,
						depth: Math.floor(size.z*100)/100,
						depthOffset: 0.6
					}
				};

				randomCrap.sun = model;
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

			let lineMat = new THREE.LineBasicMaterial( { color: 0xfc4576 } );
			for(let i = -30; i <30; i+=1){
				let points = [];
				points.push( new THREE.Vector3(i*map.lineSpace*0.5, 0, -200 ) );
				points.push( new THREE.Vector3( i*map.lineSpace, 0, 200 ) );
				let lineGeo = new THREE.BufferGeometry().setFromPoints( points );
				let line = new THREE.Line( lineGeo, lineMat );
				scene.add( line );
			}

			for(let i = -40; i < 40; i+=1){
				let points = [];
				points.push( new THREE.Vector3(-1000, 0, -i*map.lineSpace ) );
				points.push( new THREE.Vector3( 1000, 0, -i*map.lineSpace ) );
				let lineGeo = new THREE.BufferGeometry().setFromPoints( points );
				let line = new THREE.Line( lineGeo, lineMat );
				map.lines.push(line);
				scene.add( line );
			}

			loadLeaderBoard();
			playMusic('lobby');

			let color = 0xFFFFFF;
			let light = new THREE.AmbientLight(color, 5);
			scene.add(light);

			let light2 = new THREE.PointLight(color, 5);
			light2.position.set(3, 3, 3);
			scene.add(light2);

			let light3 = new THREE.PointLight(color, 1.5);
			light3.position.set(-3, 3, -3);
			scene.add(light3);

			let light4 = new THREE.PointLight(color, 30);
			light4.position.set(0, 10, -110);
			scene.add(light4);

			let sun = randomCrap.sun;
			sun.scale.set(10,10,10);
			sun.position.set(0,10,-400);
			scene.add(sun);

			camera.position.z = 5;
			camera.position.y = 2;
			camera.lookAt(character.position);

			collision.charFront = character.position.z - character.geometry.parameters.depth/2;
			collision.charBack = character.position.z + character.geometry.parameters.depth/2;

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

		function createLeaderBoard(){
			let tempHeight = 0.5;
			let tempGap = 0.1;

      alert("Creating leaderboard with data")
      alert(JSON.stringify(randomCrap.leaderBoard));

			let leaderBoardHeight = randomCrap.leaderBoard.length * (tempHeight + tempGap) + tempGap;
			let leaderBoardTop = 5-(leaderBoardHeight/2);
			randomCrap.leaderBoardObjects.push(makeCustomBox(0.5,leaderBoardHeight,8, leaderBoardTop, 0, -5, {r: 50, g:0, b:50}));
			
			let tempTop = leaderBoardTop + (leaderBoardHeight/2) - (tempHeight/2) - tempGap;

			for(let i = 0; i < randomCrap.leaderBoard.length; i++){
				let colorGradient = Math.min(70, i*10);
				randomCrap.leaderBoardObjects.push(makeCustomBox(0.7,tempHeight,8-(tempGap*2), tempTop-(i*(tempHeight+tempGap)), 0, -5, {r: colorGradient, g:colorGradient, b:colorGradient}));
			
				makeTextObject(randomCrap.leaderBoard[i], -5, tempTop-(i*(tempHeight+tempGap)), 0 );
			}
		}
		function makeTextObject(textInfo: any, x:any, y:any, z:any){
			let name = textInfo.name;
			let score = textInfo.score;

			let fullWidth = 35-name.length-(score).toString().length;

			let completeText = name+' '.repeat(fullWidth)+score;

			let material = new THREE.MeshStandardMaterial({ color: 0xdc24e2 });
			const loader = new FontLoader();

			let textMesh:any;

			loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', (font) => {

				let geometry = new TextGeometry(completeText, {
					font: font,
					size: 0.3,
					depth: 0.4,
					bevelEnabled: false,
					bevelThickness: 0.01,
					bevelSize: 0.01,
					bevelSegments: 3,
					curveSegments: 12,
				});

				textMesh = new THREE.Mesh(geometry, material);
				geometry.center();

				textMesh.position.x = x+0.2;
				textMesh.position.y = y;
				textMesh.position.z = z;
				textMesh.rotation.set(0,Math.PI/2,0);
				scene.add(textMesh);
				randomCrap.leaderBoardObjects.push(textMesh);

			});
		}

		function makeCustomBox(width: number | undefined, height: number | undefined, depth: number | undefined, x: any, y: any, z: any, color: any){
			var tempGeometry = new THREE.BoxGeometry(width, height, depth);
			var tempMaterial;
			if(color)
				tempMaterial = new THREE.MeshBasicMaterial({ color: `rgb(${color.r},${color.g},${color.b})` });
			else
				tempMaterial = new THREE.MeshBasicMaterial({ color: `rgb(${Math.round(Math.random()*255)},${Math.round(Math.random()*255)},${Math.round(Math.random()*255)})` });
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
					
					if(temp.geometry.parameters.heightOffset) temp.position.y += temp.geometry.parameters.heightOffset;
					if(temp.geometry.parameters.depthOffset) temp.position.z += temp.geometry.parameters.depthOffset;
					if(temp.geometry.parameters.heightOffset) temp.position.z += temp.geometry.parameters.heightOffset;
					
					temp.ID = id;

					scene.add(temp);
					map.objects.push(temp);
					return temp;
				}
			}
		}

		function charMove(){
			updateHeightMap();

			character.position.x += ((lanes.characterRow*lanes.laneWidth)-character.position.x)*0.2;

			let laneHeight = map.heightMap[lanes.characterRow-lanes.minLane];
			let groundLevel;
			let platformLevel = 0;
			let baseGround = character.geometry.parameters.height/2 - 0.5;
			let maxLevel;
			let currentObjectID = map.heightMap.objectID[lanes.characterRow-lanes.minLane];
			if(laneHeight.length == 1){
				groundLevel = baseGround + laneHeight[0];
				maxLevel = 999;
			}else{
				groundLevel = baseGround;
				maxLevel = -laneHeight[0];
				platformLevel = laneHeight[1];
			}
			if(currentObjectID == 2) groundLevel+=0.3;

			if(collision.laneChange > 0){
				collision.laneChange--;
			}
			


			let laneTripping = false;
			let grace = 0.4;
			let hitWall = false;
			if(currentObjectID == 2)
				if(collision.previousHeight != groundLevel && collision.previousHeight < groundLevel)
					if(character.position.y < groundLevel)
						if(groundLevel-character.position.y > grace){
							hitWall = true;
							if(collision.laneChange > 0){
								laneTripping = true;
								if(Math.abs(lanes.characterRow*lanes.laneWidth - character.position.x) < 1){
									warn('lane trip')
									lanes.characterRow = collision.previousLane;
								}
							}
						}

			if(currentObjectID == 1 || currentObjectID == 3)
				if(collision.previousHeight != groundLevel && collision.previousHeight < groundLevel)
					if(character.position.y < groundLevel){
						if(groundLevel-character.position.y > grace){
							hitWall = true;
							if(collision.laneChange > 0){
								laneTripping = true;
								if(Math.abs(lanes.characterRow*lanes.laneWidth - character.position.x) < 1){
									warn('lane trip')
									lanes.characterRow = collision.previousLane;
								}
							}else
								warn('splat');
						}else{
							warn('tripped');
							if(!randomCrap.lostGame)
								character.position.y = groundLevel;
						}
					}
			let grace2 = 0.2;
			
			if(currentObjectID == 4){
				let head = character.position.y + character.geometry.parameters.height/2;
				if(head > maxLevel && character.position.y < platformLevel){
					if(head - maxLevel < grace2){
						warn('top tripped')
					}else{
						warn('top splat')
						hitWall = true;
						character.position.y = maxLevel - character.geometry.parameters.height/2 -0.3;
						physics.yv = Math.min(0, physics.yv);
					}

				}
			}

			if(!laneTripping && !randomCrap.lostGame){

				if(character.position.y > groundLevel) physics.touchingGround = false;
				if(character.position.y == groundLevel) physics.touchingGround = true;

				if(physics.touchingGround == false) physics.yv -= physics.gravity;

				let fallingBelowGround = character.position.y > groundLevel && character.position.y + physics.yv < groundLevel;
				let clipFellIntoGround = collision.previouslyAboveGround && character.position.y + physics.yv < groundLevel;
				let clippedIntoGround = collision.previouslyAboveGround && !(character.position.y > groundLevel);
				
				physics.touchingPlatform = false;
				if(platformLevel != 0 && character.position.y > platformLevel){
					if(character.position.y > platformLevel && character.position.y + physics.yv < platformLevel){
						physics.touchingPlatform = true;
						physics.touchingGround = false;
						physics.yv = Math.max(0, physics.yv);
					}
				}else
					if(fallingBelowGround || clipFellIntoGround || clippedIntoGround){
						if(character.position.y > groundLevel) physics.yv = -(character.position.y - groundLevel);
						physics.touchingGround = true;
					}
				collision.previouslyAboveGround = character.position.y > groundLevel;

				if(physics.touchingGround && physics.yv < 0) physics.yv = 0;
				if(physics.touchingGround) character.position.y = groundLevel;
				if(physics.touchingPlatform){ 
					character.position.y = platformLevel;
				}

				character.position.y += physics.yv;

			}
			if(randomCrap.lostGame && character.position.y > groundLevel){
				physics.yv -= physics.gravity;
				character.position.y = Math.max(character.position.y+physics.yv, groundLevel);

			}
			
			camera.position.y = character.position.y + 1;
			camera.position.x = character.position.x+Math.sin(char.camAngle)*char.camDist;
			camera.position.z = character.position.z+Math.cos(char.camAngle)*char.camDist;
			char.camAngle = ((lanes.characterRow*0.3 - char.camAngle)*0.1)+char.camAngle;

			camera.lookAt(character.position);
			camera.position.y+=1;

			cameraMan.angle = (cameraMan.angle+=0.01) % (Math.PI*2);
			cameraMan.camera.position.z = character.position.z+0.4+Math.cos(cameraMan.angle)*cameraMan.dist;
			cameraMan.camera.position.y = character.position.y+character.geometry.parameters.height/2;
			cameraMan.camera.position.x = character.position.x+Math.sin(cameraMan.angle)*cameraMan.dist;
			cameraMan.camera.lookAt(character.position.x, character.position.y+character.geometry.parameters.height/2, character.position.z);

			camera.position.x+=((randomCrap.cameraShake*Math.random())-(randomCrap.cameraShake/2));
			camera.position.y+=((randomCrap.cameraShake*Math.random())-(randomCrap.cameraShake/2));
			camera.position.z+=((randomCrap.cameraShake*Math.random())-(randomCrap.cameraShake/2));

			if(randomCrap.shakeTimer > 0){
				randomCrap.shakeTimer--;
			}else{
				randomCrap.cameraShake = 0;
			}
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
			
			for(let i = 0; i < map.lines.length; i++){
				map.lines[i].position.z+=map.speed;
				if(map.lines[i].position.z > 0){
					map.lines[i].position.z -= 40*map.lineSpace;
				}
			}

			for(let i = 0; i < randomCrap.leaderBoardObjects.length; i++){
				if(randomCrap.leaderBoardObjects[i] && randomCrap.leaderBoardObjects[i].position){
					randomCrap.leaderBoardObjects[i].position.z+=map.speed;

					if(randomCrap.leaderBoardObjects[i].position.z > 10 + randomCrap.leaderBoardObjects[i].geometry.parameters.depth){
						try{
							(randomCrap.leaderBoardObjects[i] as THREE.Mesh).geometry.dispose();
							((randomCrap.leaderBoardObjects[i] as THREE.Mesh).material as THREE.Material).dispose();
						}catch{}
						scene.remove(randomCrap.leaderBoardObjects[i]);
						randomCrap.leaderBoardObjects.splice(i, 1);
						i--;
					}
				}else{
					console.log(randomCrap.leaderBoardObjects[i])
					try{
						(randomCrap.leaderBoardObjects[i] as THREE.Mesh).geometry.dispose();
						((randomCrap.leaderBoardObjects[i] as THREE.Mesh).material as THREE.Material).dispose();
					}catch{}
					scene.remove(randomCrap.leaderBoardObjects[i]);
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
			//5 is tunnel

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

		function updateHeightMap(){

			map.heightMap = [[0],[0],[0]];
			map.heightMap.objectID = [null, null, null];
			for(let i = map.objects.length-1; i > -1; i--){

				if(map.objects[i].position.z > -5 && map.objects[i].position.z < 5){
					let objectFront = map.objects[i].position.z + map.objects[i].geometry.parameters.depth/2;
					let objectBack = map.objects[i].position.z - map.objects[i].geometry.parameters.depth/2;
					if(objectFront > collision.charFront && objectBack < collision.charBack){

						let objectLeft = map.objects[i].position.x - map.objects[i].geometry.parameters.width/2;
						let objectRight = map.objects[i].position.x + map.objects[i].geometry.parameters.width/2;
						let charLeft = character.position.x - character.geometry.parameters.width/2;
						let charRight = character.position.x + character.geometry.parameters.width/2;

						let objectLane =  Math.round(map.objects[i].position.x/lanes.laneWidth)-lanes.minLane;

						if(objectFront > collision.charFront && objectBack < collision.charBack){
							
							if(map.objects[i].ID == 4){
								map.heightMap[objectLane] = [-map.objects[i].position.y, map.objects[i].position.y + map.objects[i].geometry.parameters.height];
							}else if(map.objects[i].ID == 2){
								map.heightMap[objectLane] = [map.objects[i].position.y + map.objects[i].geometry.parameters.height*((objectFront-character.position.z)/map.objects[i].geometry.parameters.depth)];
							}else{
								map.heightMap[objectLane] = [map.objects[i].position.y + map.objects[i].geometry.parameters.height];
							}
							map.heightMap.objectID[objectLane] = map.objects[i].ID;
						}
					}
				}
			}
		}

		function mixAnimation(body: any, name: any){

			if(!body.frame) body.frame = 0;

			let animation = body.animations[name];

			let thisFrame = Math.floor(body.frame);
			let nextFrame = (thisFrame+1)%animation.length;
			let percentageToNext = (body.frame%1)

			if(thisFrame >= animation.length)
				thisFrame = thisFrame%animation.length;

			for(let i = 0; i < animation[thisFrame].arr.length; i++){
				let jointData = animation[thisFrame].arr[i];
				let bone = body.skeleton[jointData.name];
				let targetJointData = animation[nextFrame].arr[i];

				if(jointData.motion == 'linear'){
					bone.rotation.x = (jointData.x + (targetJointData.x-jointData.x)*percentageToNext) * (Math.PI/180);
					bone.rotation.y = (jointData.y + (targetJointData.y-jointData.y)*percentageToNext) * (Math.PI/180);
					bone.rotation.z = (jointData.z + (targetJointData.z-jointData.z)*percentageToNext) * (Math.PI/180);
				}
				if(jointData.motion == 'jitter'){
					if(percentageToNext <= 0.1)
					bone.rotation.x = (targetJointData.x) * (Math.PI/180);
					bone.rotation.y = (targetJointData.y) * (Math.PI/180);
					bone.rotation.z = (targetJointData.z) * (Math.PI/180);
				}
				

			}

			body.frame=(body.frame+animation[thisFrame].speed)%animation.length;
		}

		function warn(type: any){
			console.log(type)
			
			if(collision.tripTimer > 0)
				lose();
			else if(type == 'lane trip' || type == 'tripped' || type == 'top tripped'){
				collision.tripTimer = 100;
				randomCrap.cameraShake = 0.7;
				randomCrap.shakeTimer = 20;
			}

			if(type == 'splat')
				lose();
			if(type == 'top splat')
				lose();
				
		}

		function characterAnimations(){
			if(randomCrap.lostGame)
				mixAnimation(character, 'die');
			else if(randomCrap.gameBegan)
				if(physics.touchingGround)
					mixAnimation(character, 'walk');
				else
					mixAnimation(character, 'fall');
			else
				mixAnimation(character, 'idle');
		}

		function playMusic(mode:any){
			if(mode=='lobby'){
				if(randomCrap.song)
					randomCrap.song.pause();
				randomCrap.song = new Audio('/surfers/environment/lobby.mp3');
				randomCrap.song.addEventListener('ended', function() {
					if(!(randomCrap.gameBegan && !randomCrap.lostGame)){
						randomCrap.song.currentTime = 0;
						randomCrap.song.play();
					}
				}, false);
				randomCrap.song.play();
			}
			if(mode=='game'){
				if(randomCrap.song)
					randomCrap.song.pause();
				randomCrap.song = new Audio('/surfers/environment/shittySurfers.wav');
				randomCrap.song.addEventListener('ended', function() {
					if(randomCrap.gameBegan && !randomCrap.lostGame){
						randomCrap.song.currentTime = 0;
						randomCrap.song.play();
					}
				}, false);
				randomCrap.song.play();
			}
		}
		function lose(){
			// if (animationId.current) cancelAnimationFrame(animationId.current);
			randomCrap.gameBegan = false;
			randomCrap.lostGame = true;
      console.log("ONE")
			if(endGame.current) endGame.current.style.display = 'flex';
            console.log("TWO")
			if(sendScore.current) sendScore.current.onclick = function(){
        console.log("THREE")
				if(endName.current?.value && endName.current?.value.length > 0){
          console.log("FOUR")
					
					if(endGame.current) endGame.current.style.display = 'flex';
          console.log("FIVE")
					let tempData = {'name': endName.current?.value, 'score': Math.floor(randomCrap.score)}

          console.log("WE ARE ABOUT TO SEND THE SCORE")
					//SEND SCORE TO DATABASE

          //Sending score
          //const tempData = { 'name': endName.current?.value, 'score': Math.floor(randomCrap.score) };

        fetch('http://hackpi.com/api/scores', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(tempData),
        })
          .then(response => response.json())
          .then(data => console.log('Score saved:', data))
          .catch((error) => {
            console.error('Error:', error);
            alert("There was an error submitting the score.");
          });

          alert(JSON.stringify(tempData))

          //End of sending score
					// send(tempData);
					restartGame();

					if(endGame.current) endGame.current.style.display = 'none';
				}
			}
			randomCrap.song.pause();


		}

		function begin(){
			if(endGame.current) endGame.current.style.display = 'none';
			randomCrap.gameBegan = true;

			playMusic('game');
		}

		function restartGame(){

			playMusic('lobby');
			for(let i = 0; i < map.objects.length; i++){
				scene.remove(map.objects[i]);
			}
			map.objects = [];
			map.dist = 0;
			randomCrap.score = 0;

			map.loading = 30;
			map.loadDist = -40;
			map.loadedDist = 0;
			map.previous = [0,0,0];
			map.currentGeneratingPosition = 1;

			randomCrap.gameBegan = false;
			randomCrap.lostGame = false;
			loadLeaderBoard();

			if(scoreKeeper.current) scoreKeeper.current.innerText = ''+randomCrap.score;
		}


		function keybinds(){
			if((keys.includes("w") || keys.includes('arrowup')) && (physics.touchingGround || physics.touchingPlatform)){
				physics.yv = physics.jumpForce;
				physics.touchingGround = false;
				character.position.y += 0.01;
				if(keys.includes("w")) removeKey("w");	
				if(keys.includes("arrowup")) removeKey("arrowup");
			}
			if(keys.includes("s") || keys.includes('arrowdown')){
				physics.yv = -physics.rollForce;
				if(keys.includes("s")) removeKey("s");	
				if(keys.includes("arrowdown")) removeKey("arrowdown");
			}
			if(keys.includes("a") || keys.includes('arrowleft')) {
				collision.previousLane = lanes.characterRow;
				collision.laneChange = 10;
				if(lanes.characterRow > lanes.minLane){
					lanes.characterRow--;
				}
				if(keys.includes("a")) removeKey("a");
				if(keys.includes("arrowleft")) removeKey("arrowleft");
			}
			if(keys.includes("d") || keys.includes('arrowright')) {
				collision.previousLane = lanes.characterRow;
				collision.laneChange = 10;
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
				//mapMove();
				if(keys.includes("z")) removeKey("z");
			}	
		}

		function loadLeaderBoard(){
			//LOAD LEADERBOARD 
      
      interface Result {
        name: string,
        score: number,
      }
      //Getting results:
      fetch('http://hackpi.com/api/scores')
      .then(response => response.json())
      .then(data => {
        console.log('Scores:', data)
        if(data.length > 0){
          alert(JSON.stringify(data))

          data.sort((a, b) => b.score - a.score);
          for(let i = 0; i < data.length; i++){
            console.log(data[i])
          }
          randomCrap.leaderBoard = data;
        }
        let results: Result[] = data;
        alert(JSON.stringify(results))
        createLeaderBoard();
      })
      .catch((error) => console.error('Error:', error));


			// leaderboard values stored as: {'name': 'BillyBobJones', 'score': 100}
			
			/*let results = [ // filler leaderboard
				{'name': 'second', 'score': 8080},
				{'name': 'third', 'score': 500},
				{'name': 'sixth', 'score': 100},
				{'name': 'first', 'score': 10000},
				{'name': 'fourth', 'score': 400},
				{'name': 'fifth', 'score': 320},
				{'name': 'seventh', 'score': 2},
			];*/

			// let results = [];
		}
    
		const animate = () => {
			animationId.current = requestAnimationFrame(animate);

			

			charMove();
			characterAnimations();
			if(randomCrap.lostGame){

			}else{
				
				if(randomCrap.gameBegan){
					if(scoreKeeper.current) scoreKeeper.current.innerText = ''+Math.floor(randomCrap.score);
					map.speed+=map.acceleration;
					randomCrap.score+=0.1*(map.speed*10);
					if(collision.tripTimer > 0) collision.tripTimer--;
					if(map.loading > 0)
						map.loading-=1;
					if(map.loadedDist<=0 && map.loading<1) loadMap();
					mapMove();
					keybinds();
				}else{
					char.camAngle = Math.PI/2;
				}
			}
			

			if(keys.length > 0 && randomCrap.gameBegan == false && randomCrap.lostGame == false){
				begin();
			}


			//TODO: 

			// background scene stuff + lights. + fog

			//add leaderboard

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
		<div ref={canvasRef} style={{ width: '100%', height: '100vh' , background: 'linear-gradient(180deg,rgba(40, 4, 64, 1) 0%, rgba(134, 11, 159, 1) 25%, rgba(252, 69, 118, 0.85) 35%,rgba(130, 10, 108, 1) 55%, rgba(17, 2, 27, 1) 65%, rgba(17, 2, 27, 1) 100%);' }}>
			<div ref={scoreKeeper} style={{ position: 'absolute', top: '0', right: '0', padding: '20px', 
				fontFamily: 'Impact, Charcoal, sans-serif',
				fontSize: '28px',
				color: 'white',
				letterSpacing: '2px',
				wordSpacing: '6px',
				lineHeight: '1.5',
				textTransform: 'uppercase'
			}}> 00000</div>
			<div ref={endGame} style={{ position: 'absolute', top: '50%', right: '50%', transform: 'translate(50%, -50%)', justifyContent: 'center',
				backgroundColor: 'black', width: '80vw', height: '40vh', borderRadius: '10px', opacity: 0.7, display: 'none', flexDirection: 'column'}}>
					<div style={{ 
						// fontFamily: 'Impact, Charcoal, sans-serif',
						fontSize: '50px',
						color: 'white',
						letterSpacing: '2px',
						wordSpacing: '6px',
						lineHeight: '1.5',
						textTransform: 'uppercase',
						height: 'min-content',
						textAlign: 'center',
						marginBottom: '10px',
					}} >ENTER YOUR NAME</div>
					
					<input ref={endName} placeholder='Your name' style={{ 
						// fontFamily: 'Impact, Charcoal, sans-serif',
						color: 'white',
						backgroundColor: 'transparent',
						border: '2px white',
						fontSize: '50px',
						textAlign: 'center',
						outline: 'none',
						letterSpacing: '2px',
						wordSpacing: '6px',
						lineHeight: '1.5',
						textTransform: 'uppercase',
						height: 'min-content',
						marginBottom: '10px',
					}} ></input>
					<button ref={sendScore} className='fancySchmancyButton' style={{}}>SUBMIT</button>
				</div>
		</div>
		<div ref={cameraMan.ref} style={{ position: 'absolute', top: '0', left: '0', borderBottomLeftRadius: '10px'}}></div>
	</>);
};


export default ThreeJSPage;
