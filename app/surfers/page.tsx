"use client";

import { useEffect, useRef } from "react";
import * as THREE from 'three';

import "@/app/globals.css";

const ThreeJSPage = () => {

	const canvasRef = useRef<HTMLDivElement | null>(null); // Specify the type for the ref
	var keys: any[] = [];
	var lanes = {
		characterRow: 0,
		laneWidth: 3,
		minLane: -20,
		maxLane: 20
	}
	var physics = {
		gravity: 0.01,
		jumpForce: 0.2,
		rollForce: 0.4,
		speed: 0.1,
		yv: 0,
		touchingGround: false
	};
	let animationId = useRef<number | null>(null);
	

	useEffect(() => {
		document.body.style.overflow = "hidden";

		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
		const renderer = new THREE.WebGLRenderer();

		renderer.setSize(window.innerWidth, window.innerHeight);
		if (canvasRef.current) canvasRef.current.appendChild(renderer.domElement); // Append the canvas to the ref




		// Create a ground
		const groundGeometry = new THREE.PlaneGeometry(10, 100);
		const groundMaterial = new THREE.MeshBasicMaterial({ color: 0x7cfc00 });
		const ground = new THREE.Mesh(groundGeometry, groundMaterial);
		ground.rotation.x = -Math.PI / 2;
		ground.position.x = 0;
		scene.add(ground);

		// Create a character (simple cube for demonstration)
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
		}
		

		const listenKeyDown = function(event: { key: any; }){if (!keys.includes(event.key.toLowerCase())) keys.push(event.key.toLowerCase());}
		const listenKeyUp = function(event: { key: any; }){ keys = keys.filter(key => key !== event.key.toLowerCase());}

		window.addEventListener('keydown', listenKeyDown);
		window.addEventListener('keyup', listenKeyUp);







		// Animation loop
		const animate = () => {
			animationId.current = requestAnimationFrame(animate);

			if(character.position.y <= character.geometry.parameters.height/2){
				character.position.y = character.geometry.parameters.height/2;
				physics.touchingGround = true;
				physics.yv = 0;
			}else{
				physics.touchingGround = false;
				physics.yv -= physics.gravity;
			}

			if(keys.includes("w") && physics.touchingGround){
				physics.yv = physics.jumpForce;
				removeKey("w");	
			}
			if(keys.includes("s")){
				physics.yv = -physics.rollForce;
				removeKey("s");	
			}
			if(keys.includes("a")) {
				if(lanes.characterRow > lanes.minLane){
					lanes.characterRow--;
				}
				removeKey("a");
			}
			if(keys.includes("d")) {
				if(lanes.characterRow < lanes.maxLane){
					lanes.characterRow++;
				}
				removeKey("d");
			}
			

			character.position.x += ((lanes.characterRow*lanes.laneWidth)-character.position.x)*0.2;


			if(character.position.y + physics.yv < character.geometry.parameters.height/2) physics.yv = -(character.position.y - character.geometry.parameters.height/2);
			physics.yv = parseFloat(physics.yv.toFixed(3));
			character.position.y += physics.yv;


			camera.position.y = character.position.y + 1.5;
			
			let turnFactor = 1.3
			let angle = Math.PI/3;
			let dist = 3;
			camera.position.x = character.position.x+Math.sin(angle*lanes.characterRow)*dist;
			camera.position.z = 5+Math.cos(angle)*dist;

			// camera.position.x += ((character.position.x + lanes.characterRow*turnFactor)-camera.position.x)*0.5;
			camera.lookAt(character.position);

			renderer.render(scene, camera);
			// console.log(Math.sqrt(
			// 	(camera.position.x-character.position.x)*(camera.position.x-character.position.x)
			// 	+(camera.position.z-character.position.z)*(camera.position.z-character.position.z)
			// ))
		};

		animate();

		return () => {
			if (canvasRef.current) canvasRef.current.removeChild(renderer.domElement); // Remove the canvas from the ref
			window.removeEventListener('keydown', listenKeyDown);
			window.removeEventListener('keyup', listenKeyUp);
			if (animationId.current) cancelAnimationFrame(animationId.current);
		};
	}, []);

	return (
		<div ref={canvasRef} style={{ width: '100%', height: '100vh' }}></div>
	);
};

export default ThreeJSPage;
