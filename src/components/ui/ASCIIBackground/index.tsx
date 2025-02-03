"use client";

import React, { useEffect, useRef } from "react";
import styles from "./Background.module.scss";
import * as THREE from "three";
import { AsciiEffect } from "three/examples/jsm/effects/AsciiEffect";

const Background: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  let effectVisible = true;
  const MIN_WIDTH = 100;
  const MIN_HEIGHT = 100;

  useEffect(() => {
    const originalOverflowX = document.body.style.overflowX;
    document.body.style.overflowX = "hidden";

    const getDimensions = () => ({
      width: window.innerWidth > 0 ? Math.round(window.innerWidth) : 1,
      height: window.innerHeight > 0 ? Math.round(window.innerHeight) : 1,
    });
    let { width, height } = getDimensions();

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 20;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(1);
    renderer.setSize(width, height);

    const effect = new AsciiEffect(renderer, " .:-=+*#%@", { invert: true });
    effect.setSize(width, height);

    effect.domElement.style.color = "white";
    effect.domElement.style.backgroundColor = "black";
    effect.domElement.style.position = "absolute";
    effect.domElement.style.top = "0";
    effect.domElement.style.left = "50%";
    effect.domElement.style.transform = "translateX(-50%)";
    effect.domElement.style.width = "100vw";
    effect.domElement.style.height = "100%";
    effect.domElement.style.pointerEvents = "none";
    effect.domElement.style.zIndex = "-1";

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

    const geometry = new THREE.TorusKnotGeometry(10, 3, 200, 32);
    const material = new THREE.MeshNormalMaterial();
    const torusKnot = new THREE.Mesh(geometry, material);
    scene.add(torusKnot);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(0, 1, 1);
    scene.add(directionalLight);

    let reqId: number;
    const animate = () => {
      torusKnot.rotation.x += 0.005;
      torusKnot.rotation.y += 0.01;
      torusKnot.rotation.z += 0.007;

      renderer.render(scene, camera);
      if (effectVisible) {
        effect.render(scene, camera);
      }
      reqId = requestAnimationFrame(animate);
    };
    animate();

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

    return () => {
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

  return <div ref={mountRef} className={styles.background} />;
};

export default Background;
