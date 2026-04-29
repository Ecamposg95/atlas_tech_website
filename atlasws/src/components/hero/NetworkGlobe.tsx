import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface NetworkGlobeProps {
  accentA?: string;
  accentB?: string;
  intensity?: number;
  starDensity?: number;
  pointDensity?: number;
}

const NetworkGlobe: React.FC<NetworkGlobeProps> = ({
  accentA = "#6366f1",
  accentB = "#a855f7",
  intensity = 1.0,
  starDensity = 2000,
  pointDensity = 1.0,
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = canvasRef.current;
    if (!container) return;

    let raf = 0;
    let running = true;
    let mouseX = 0, mouseY = 0;

    const W = () => container.clientWidth || window.innerWidth;
    const H = () => container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, W() / H(), 0.1, 2000);
    camera.position.z = 28;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W(), H());
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Configuración Variante Horizonte
    const cfg = { radius: 11, posY: -10.5, posX: 0, posZ: 0, tilt: 0.35 };

    const globeGroup = new THREE.Group();
    globeGroup.position.set(cfg.posX, cfg.posY, cfg.posZ);
    globeGroup.rotation.z = cfg.tilt;

    // ---- Núcleo sólido ----
    const coreGeo = new THREE.SphereGeometry(cfg.radius * 0.985, 64, 64);
    const coreMat = new THREE.MeshPhongMaterial({
      color: 0x05060f,
      emissive: new THREE.Color(accentA),
      emissiveIntensity: 0.06 * intensity,
      shininess: 30,
      transparent: true,
      opacity: 0.92,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    globeGroup.add(core);

    // ---- Atmósfera (shader Fresnel) ----
    const atmoGeo = new THREE.SphereGeometry(cfg.radius * 1.08, 64, 64);
    const atmoMat = new THREE.ShaderMaterial({
      uniforms: {
        uColorA: { value: new THREE.Color(accentA) },
        uColorB: { value: new THREE.Color(accentB) },
        uIntensity: { value: intensity },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPos;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          vPos = mv.xyz;
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        varying vec3 vPos;
        uniform vec3 uColorA;
        uniform vec3 uColorB;
        uniform float uIntensity;
        void main() {
          vec3 viewDir = normalize(-vPos);
          float fres = pow(1.0 - max(dot(vNormal, viewDir), 0.0), 2.5);
          vec3 col = mix(uColorA, uColorB, fres);
          gl_FragColor = vec4(col, fres * 0.55 * uIntensity);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      depthWrite: false,
    });
    const atmo = new THREE.Mesh(atmoGeo, atmoMat);
    globeGroup.add(atmo);

    // ---- Puntos de red (distribución Fibonacci) ----
    const basePts = Math.floor(1400 * pointDensity);
    const pts: number[] = [];
    const pointColors: number[] = [];
    const colA = new THREE.Color(accentA);
    const colB = new THREE.Color(accentB);
    const phi = Math.PI * (3 - Math.sqrt(5));
    
    for (let i = 0; i < basePts; i++) {
      const y = 1 - (i / (basePts - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = phi * i;
      const x = Math.cos(theta) * r;
      const z = Math.sin(theta) * r;
      pts.push(x * cfg.radius, y * cfg.radius, z * cfg.radius);
      const t = (y + 1) / 2;
      const c = colA.clone().lerp(colB, t);
      pointColors.push(c.r, c.g, c.b);
    }
    const pointsGeo = new THREE.BufferGeometry();
    pointsGeo.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
    pointsGeo.setAttribute("color", new THREE.Float32BufferAttribute(pointColors, 3));

    // Sprite circular para los puntos
    const dotCanvas = document.createElement("canvas");
    dotCanvas.width = 64;
    dotCanvas.height = 64;
    const dctx = dotCanvas.getContext("2d");
    if (dctx) {
      const grd = dctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grd.addColorStop(0, "rgba(255,255,255,1)");
      grd.addColorStop(0.4, "rgba(255,255,255,0.6)");
      grd.addColorStop(1, "rgba(255,255,255,0)");
      dctx.fillStyle = grd;
      dctx.fillRect(0, 0, 64, 64);
    }
    const dotTex = new THREE.CanvasTexture(dotCanvas);

    const pointsMat = new THREE.PointsMaterial({
      size: 0.18,
      map: dotTex,
      vertexColors: true,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      opacity: 0.9 * intensity,
    });
    const networkPoints = new THREE.Points(pointsGeo, pointsMat);
    globeGroup.add(networkPoints);

    // ---- Hubs (puntos destacados) ----
    const hubCount = Math.max(8, Math.floor(18 * pointDensity));
    const hubPos: number[] = [];
    const hubColors: number[] = [];
    for (let i = 0; i < hubCount; i++) {
      const idx = Math.floor((i / hubCount) * basePts);
      hubPos.push(pts[idx * 3], pts[idx * 3 + 1], pts[idx * 3 + 2]);
      const c = colA.clone().lerp(colB, Math.random());
      hubColors.push(c.r, c.g, c.b);
    }
    const hubGeo = new THREE.BufferGeometry();
    hubGeo.setAttribute("position", new THREE.Float32BufferAttribute(hubPos, 3));
    hubGeo.setAttribute("color", new THREE.Float32BufferAttribute(hubColors, 3));
    const hubMat = new THREE.PointsMaterial({
      size: 0.55,
      map: dotTex,
      vertexColors: true,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      opacity: intensity,
    });
    const hubs = new THREE.Points(hubGeo, hubMat);
    globeGroup.add(hubs);

    // ---- Arcos entre hubs ----
    const arcs = new THREE.Group();
    const arcMat = new THREE.LineBasicMaterial({
      color: new THREE.Color(accentA).lerp(colB, 0.5),
      transparent: true,
      opacity: 0.35 * intensity,
      blending: THREE.AdditiveBlending,
    });
    const arcCount = Math.min(14, Math.floor(hubCount * 0.7));
    for (let i = 0; i < arcCount; i++) {
      const a = i % hubCount;
      const b = (i * 3 + 2) % hubCount;
      if (a === b) continue;
      const pa = new THREE.Vector3(hubPos[a * 3], hubPos[a * 3 + 1], hubPos[a * 3 + 2]);
      const pb = new THREE.Vector3(hubPos[b * 3], hubPos[b * 3 + 1], hubPos[b * 3 + 2]);
      const mid = pa.clone().add(pb).multiplyScalar(0.5);
      mid.normalize().multiplyScalar(cfg.radius * 1.18);
      const curve = new THREE.QuadraticBezierCurve3(pa, mid, pb);
      const arcGeo = new THREE.BufferGeometry().setFromPoints(curve.getPoints(40));
      arcs.add(new THREE.Line(arcGeo, arcMat));
    }
    globeGroup.add(arcs);

    scene.add(globeGroup);

    // ---- Luces ----
    scene.add(new THREE.AmbientLight(0x222244, 0.4));
    const l1 = new THREE.PointLight(new THREE.Color(accentA), 2.2 * intensity, 80);
    l1.position.set(15, 10, 18);
    scene.add(l1);
    const l2 = new THREE.PointLight(new THREE.Color(accentB), 1.6 * intensity, 80);
    l2.position.set(-15, -8, 8);
    scene.add(l2);
    const l3 = new THREE.DirectionalLight(0xffffff, 0.25);
    l3.position.set(0, 1, 1);
    scene.add(l3);

    // ---- Estrellas ----
    const starGeo = new THREE.BufferGeometry();
    const starVerts: number[] = [];
    const starColors: number[] = [];
    for (let i = 0; i < starDensity; i++) {
      const x = (Math.random() - 0.5) * 1600;
      const y = (Math.random() - 0.5) * 1600;
      const z = (Math.random() - 0.5) * 1600;
      starVerts.push(x, y, z);
      const t = Math.random();
      const sc = t > 0.92 ? colB : t > 0.8 ? colA : new THREE.Color(0xffffff);
      starColors.push(sc.r, sc.g, sc.b);
    }
    starGeo.setAttribute("position", new THREE.Float32BufferAttribute(starVerts, 3));
    starGeo.setAttribute("color", new THREE.Float32BufferAttribute(starColors, 3));
    const starMat = new THREE.PointsMaterial({
      size: 0.7,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      depthWrite: false,
      sizeAttenuation: true,
    });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    // ---- Animación ----
    let groupRotY = 0, groupRotX = 0;
    const baseRotY = globeGroup.rotation.y;
    const baseRotX = globeGroup.rotation.x;
    const basePosX = globeGroup.position.x;
    const basePosY = globeGroup.position.y;

    const tick = () => {
      if (!running) return;
      groupRotY += 0.0015;
      groupRotX += 0.0003;
      globeGroup.rotation.y = baseRotY + groupRotY + mouseX * 0.25;
      globeGroup.rotation.x = baseRotX + groupRotX + mouseY * 0.12;
      globeGroup.position.x += (basePosX + mouseX * 0.6 - globeGroup.position.x) * 0.04;
      globeGroup.position.y += (basePosY + -mouseY * 0.3 - globeGroup.position.y) * 0.04;

      stars.rotation.y += 0.00025;
      stars.rotation.x += 0.0001;

      const t = performance.now() * 0.001;
      hubs.material.size = 0.45 + Math.sin(t * 1.6) * 0.12;
      hubs.material.opacity = (0.85 + Math.sin(t * 2.0) * 0.15) * intensity;
      arcs.children.forEach((line: any, i) => {
        if (line.material) {
          line.material.opacity = (0.25 + Math.sin(t * 1.2 + i * 0.6) * 0.18) * intensity;
        }
      });

      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // ---- Eventos ----
    const onMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    };
    window.addEventListener("mousemove", onMove);

    const onResize = () => {
      camera.aspect = W() / H();
      camera.updateProjectionMatrix();
      renderer.setSize(W(), H());
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(container);

    const onVis = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("visibilitychange", onVis);
      ro.disconnect();
      renderer.dispose();
      pointsGeo.dispose();
      hubGeo.dispose();
      coreGeo.dispose();
      atmoGeo.dispose();
      starGeo.dispose();
      pointsMat.dispose();
      hubMat.dispose();
      coreMat.dispose();
      atmoMat.dispose();
      starMat.dispose();
      arcs.children.forEach((l: any) => {
        if (l.geometry) l.geometry.dispose();
      });
      arcMat.dispose();
      dotTex.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [accentA, accentB, intensity, starDensity, pointDensity]);

  return <div ref={canvasRef} className="globe-canvas-wrapper" style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }} />;
};

export default NetworkGlobe;
