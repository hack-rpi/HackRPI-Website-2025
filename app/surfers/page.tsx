"use client";

import { useEffect, useRef } from "react";
import * as THREE from 'three';

import "@/app/globals.css";
import { mx_bilerp_0 } from "three/src/nodes/materialx/lib/mx_noise.js";

const ThreeJSPage = () => {

	const canvasRef = useRef<HTMLDivElement | null>(null); // Specify the type for the ref
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
		tileSize: 5,
		presets: [
			{
				id: 1,
				geometry: new THREE.BoxGeometry(2, 2, 4.7),
				material: new THREE.MeshBasicMaterial({ color: `rgb(${Math.round(Math.random()*255)},${Math.round(Math.random()*255)},${Math.round(Math.random()*255)})` })
			}
		]
	}
	let animationId = useRef<number | null>(null);

	

	useEffect(() => {

		document.body.style.overflow = "hidden";

		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
		const renderer = new THREE.WebGLRenderer();

		renderer.setSize(window.innerWidth, window.innerHeight);
		if (canvasRef.current) canvasRef.current.appendChild(renderer.domElement); // Append the canvas to the ref

		const groundGeometry = new THREE.PlaneGeometry(10, 100);
		const groundMaterial = new THREE.MeshBasicMaterial({ color: 0x7cfc00 });
		const ground = new THREE.Mesh(groundGeometry, groundMaterial);
		ground.rotation.x = -Math.PI / 2;
		ground.position.x = 0;
		scene.add(ground);

		const characterGeometry = new THREE.BoxGeometry(0.5, 1, 0.5);
		const characterMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
		const character = new THREE.Mesh(characterGeometry, characterMaterial);
		character.position.y = 0.5;
		character.position.z = 2;
		character.position.x = 0;
		scene.add(character);

		camera.position.z = 5;
		camera.position.y = 2;
		camera.lookAt(character.position);

		function removeKey(key: string) {
			keys = keys.filter(k => k !== key);
			blockedKeys.push(key);
		}
		

		var blockedKeys: any[] = [];
		const listenKeyDown = function(event: { key: any; }){ if (!keys.includes(event.key.toLowerCase()) && !blockedKeys.includes(event.key.toLowerCase())) keys.push(event.key.toLowerCase());}
		const listenKeyUp = function(event: { key: any; }){ keys = keys.filter(key => key !== event.key.toLowerCase()); blockedKeys = blockedKeys.filter(key => key !== event.key.toLowerCase()); }

		const resize = function() {
			if (canvasRef.current && canvasRef.current.children.length > 0) {
				const canvas = renderer.domElement;
				canvas.style.width = window.innerWidth+'px';
				canvas.style.height = window.innerHeight+'px';

				camera.aspect = canvas.clientWidth / canvas.clientHeight;
				camera.updateProjectionMatrix();
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
					var temp = new THREE.Mesh(map.presets[i].geometry,  map.presets[i].material);
					temp.position.y = x+map.presets[i].geometry.parameters.height/2;
					temp.position.z = y;
					temp.position.x = z;
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
		}

		function mapMove(){
			for(let i = 0; i < map.objects.length; i++){
				map.objects[i].position.z+=map.speed;

				let mesh = map.objects[i] as THREE.Mesh;
				if(map.objects[i].position.z > 10 + (mesh.geometry as any).parameters.depth){
					(map.objects[i] as THREE.Mesh).geometry.dispose();
					((map.objects[i] as THREE.Mesh).material as THREE.Material).dispose();
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
					makeModel(1,0, map.loadDist+(0*-map.tileSize), (0+lanes.minLane)*lanes.laneWidth);
				if(keys.includes("z")) removeKey("z");
			}	
			

			charMove();
			if(map.loading > 0)
				map.loading-=1;
			if(map.loadedDist<=0 && map.loading<1) loadMap();
			mapMove();
			// cockroach idea (maybe if console is opened)

			renderer.render(scene, camera);
		};

		animate();

		return () => {
			if (canvasRef.current) canvasRef.current.removeChild(renderer.domElement);
			window.removeEventListener('keydown', listenKeyDown);
			window.removeEventListener('keyup', listenKeyUp);
			window.removeEventListener('resize', resize);
			if (animationId.current) cancelAnimationFrame(animationId.current);
		};
	}, []);

	return (
		<div ref={canvasRef} style={{ width: '100%', height: '100vh' }}></div>
	);
};

export default ThreeJSPage;
