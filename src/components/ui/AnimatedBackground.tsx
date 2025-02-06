"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { AsciiEffect } from "three/examples/jsm/effects/AsciiEffect";

// Adapted AnimatedBackground component with an improved fade-in animation and a larger 3D figure
export const Background: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  // State to control fade-in visibility using Tailwind classes
  const [isVisible, setIsVisible] = useState(false);

  let effectVisible = true;
  const MIN_WIDTH = 100;
  const MIN_HEIGHT = 100;

  useEffect(() => {
    // Prevent horizontal scroll
    const originalOverflowX = document.body.style.overflowX;
    document.body.style.overflowX = "hidden";

    // Trigger the fade-in animation once the component mounts
    // Added a slight delay to ensure smoother fade-in effect
    const fadeTimeout = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    // Utility: Get current window dimensions
    const getDimensions = () => ({
      width: window.innerWidth > 0 ? Math.round(window.innerWidth) : 1,
      height: window.innerHeight > 0 ? Math.round(window.innerHeight) : 1,
    });
    let { width, height } = getDimensions();

    // Create scene, camera and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 20;
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(1);
    renderer.setSize(width, height);

    // Create ASCII effect overlay
    const effect = new AsciiEffect(renderer, " .:-=+*#%@", { invert: true });
    effect.setSize(width, height);
    effect.domElement.style.position = "absolute";
    effect.domElement.style.backgroundColor = "#0a0a0a";
    effect.domElement.style.top = "0";
    effect.domElement.style.left = "0";
    effect.domElement.style.width = "100vw";
    effect.domElement.style.height = "100vh";
    effect.domElement.style.zIndex = "-50";

    // Functions to attach/detach the effect
    const attachEffect = () => {
      if (mountRef.current && !effectVisible) {
        mountRef.current.appendChild(effect.domElement);
        effectVisible = true;
      }
    };
    const detachEffect = () => {
      if (
        mountRef.current &&
        effectVisible &&
        effect.domElement.parentElement === mountRef.current
      ) {
        mountRef.current.removeChild(effect.domElement);
        effectVisible = false;
      }
    };

    if (mountRef.current) {
      mountRef.current.appendChild(effect.domElement);
      effectVisible = true;
    }

    // Create a dynamic 3D shape: A larger Torus Knot with wave deformation
    // Increased major radius and tube radius for a larger figure
    const geometry = new THREE.TorusKnotGeometry(10, 3, 128, 32);
    // Store original positions so we can apply wave offsets without cumulative errors
    const originalPositions = new Float32Array(
      geometry.attributes.position.array
    );
    // Use a standard material that shows a cool spectrum of colors
    const material = new THREE.MeshNormalMaterial({
      flatShading: false,
      side: THREE.DoubleSide,
    });
    const torusKnot = new THREE.Mesh(geometry, material);
    scene.add(torusKnot);

    // Lights for enhanced 3D visualization
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(0, 1, 1);
    scene.add(directionalLight);

    // Animation loop: Apply wave deformation and continuous rotation
    const startTime = performance.now();
    let reqId: number;
    const animate = () => {
      const elapsed = (performance.now() - startTime) / 1000;

      // Rotate the torus knot slowly for an engaging effect
      torusKnot.rotation.x += 0.005;
      torusKnot.rotation.y += 0.01;
      torusKnot.rotation.z += 0.007;

      // Wave deformation: modify vertex positions based on a sine function
      const positions = geometry.attributes.position.array as Float32Array;
      const waveAmplitude = 0.5;
      const waveFrequency = 2;

      for (let i = 0; i < positions.length; i += 3) {
        // Reset to original positions to prevent cumulative deformation
        positions[i] = originalPositions[i];
        positions[i + 1] = originalPositions[i + 1];
        positions[i + 2] = originalPositions[i + 2];

        // Apply wave effect along x and y axes
        positions[i] +=
          waveAmplitude *
          Math.sin(elapsed * waveFrequency + originalPositions[i]);
        positions[i + 1] +=
          waveAmplitude *
          Math.cos(elapsed * waveFrequency + originalPositions[i + 1]);
      }
      geometry.attributes.position.needsUpdate = true;

      // Render scene normally and with ASCII effect overlay
      renderer.render(scene, camera);
      if (effectVisible) {
        effect.render(scene, camera);
      }
      reqId = requestAnimationFrame(animate);
    };
    animate();

    // Handle window resizing: Update dimensions, camera, renderer and ASCII effect sizes
    const onWindowResize = () => {
      const dims = getDimensions();
      width = dims.width;
      height = dims.height;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      effect.setSize(width, height);

      if (width < MIN_WIDTH || height < MIN_HEIGHT) {
        detachEffect();
      } else {
        attachEffect();
      }
    };
    window.addEventListener("resize", onWindowResize);

    // Cleanup on component unmount
    return () => {
      clearTimeout(fadeTimeout);
      cancelAnimationFrame(reqId);
      window.removeEventListener("resize", onWindowResize);
      if (
        mountRef.current &&
        effect.domElement.parentElement === mountRef.current
      ) {
        mountRef.current.removeChild(effect.domElement);
      }
      renderer.dispose();
      document.body.style.overflowX = originalOverflowX;
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`w-full h-full transition-opacity duration-1000 ease-in-out ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    />
  );
};
