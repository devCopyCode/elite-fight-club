// app/components/Intro3D.tsx
"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap } from "gsap";

interface Props {
  onComplete: () => void;
}

export default function Intro3D({ onComplete }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const el = mountRef.current;
    if (!el) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x080808, 1);
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 6;

    const textCanvas = document.createElement("canvas");
    textCanvas.width = 600;
    textCanvas.height = 200;
    const ctx = textCanvas.getContext("2d")!;
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 160px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("EFC", 300, 100);

    const imageData = ctx.getImageData(0, 0, 600, 200);
    const targetPositions: number[] = [];

    for (let y = 0; y < 200; y += 5) {
      for (let x = 0; x < 600; x += 5) {
        const i = (y * 600 + x) * 4;
        if (imageData.data[i + 3] > 128) {
          targetPositions.push(
            (x / 600 - 0.5) * 10,
            -(y / 200 - 0.5) * 3.5,
            0
          );
        }
      }
    }

    const count = targetPositions.length / 3;
    const initArr = new Float32Array(count * 3);
    const targetArr = new Float32Array(targetPositions);

    for (let i = 0; i < count * 3; i++) {
      initArr[i] = (Math.random() - 0.5) * 20;
    }

    const currentArr = initArr.slice();
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(currentArr, 3));

    const material = new THREE.PointsMaterial({
      color: 0xc8102e,
      size: window.innerWidth < 768 ? 0.08 : 0.05,
      transparent: true,
      opacity: 1,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const proxy = { t: 0 };
    const tween = gsap.to(proxy, {
      t: 1,
      duration: 2,
      ease: "power3.out",
      onUpdate() {
        const t = proxy.t;
        for (let i = 0; i < count * 3; i++) {
          currentArr[i] = initArr[i] + (targetArr[i] - initArr[i]) * t;
        }
        geometry.attributes.position.needsUpdate = true;
      },
      onComplete() {
        gsap.delayedCall(0.5, () => {
          gsap.to(material, {
            opacity: 0,
            duration: 0.8,
            onComplete: onComplete,
          });
        });
      },
    });

    let raf = 0;
    function animate() {
      raf = requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }
    animate();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      tween.kill();
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (el.contains(renderer.domElement)) {
        el.removeChild(renderer.domElement);
      }
    };
  }, [onComplete]);

  return (
    <div
      ref={mountRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9990,
        background: "#080808",
      }}
    />
  );
}
