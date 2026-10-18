"use client";

import { useEffect, useRef } from "react";
import type * as Three from "three";

// `engraving` is the word pressed into the foil when it differs from the menu label.
type GumTopic = { label: string; hash: string; image: string; engraving?: string };

// One gum per Work menu category; the image is wrapped onto the gum drop inside.
const topics: GumTopic[] = [
  { label: "SOCIAL", hash: "social-content", image: "/portfolio/wix/social/tiktok-live-cover.jpg" },
  { label: "FILM", hash: "film", image: "/portfolio/wix/film/henry.jpg" },
  { label: "DESIGN", hash: "design", image: "/portfolio/wix/graphic/bittersweet/07-poster-1.jpg" },
  { label: "GAME", hash: "game", image: "/portfolio/wix/game/latrinalia-cover.jpg" },
  { label: "PHOTOGRAPHY", engraving: "PHOTO", hash: "photography", image: "/portfolio/wix/photo/sold-utopia/IMG_5182-2.jpg" },
];

// Resting pose of each piece (x, y, z rotation) so they read as different gums.
const poses: [number, number, number][] = [
  [0.3, -0.28, 0.26],
  [-0.24, 0.3, -0.32],
  [0.16, 0.22, 0.5],
  [0.34, -0.24, -0.46],
  [-0.26, -0.32, 0.18],
];

// Body radii: long axis along x, like a wrapped sweet.
const BODY = { a: 1.05, b: 0.78, c: 0.72 };
const HOVER_SCALE = 1.1;
const INTRO_SECONDS = 2.4;
// Where the foil tears open: the top-front of the body.
const TEAR_DIRECTION = [0.1, 0.6, 0.79];

// Cheap deterministic "noise" for foil crumples; position based so seams line up.
function foilNoise(x: number, y: number, z: number) {
  return (
    Math.sin(x * 9.3 + y * 4.1) * Math.sin(y * 8.7 - z * 5.9) * Math.sin(z * 7.7 + x * 3.3) +
    0.5 * Math.sin(x * 17.1 - z * 11.3 + y * 6.7)
  );
}

// Uncorrelated per-vertex jitter in [-1, 1], used to crumple the foil ends.
function foilJitter(x: number, y: number, z: number) {
  const s = Math.sin(x * 127.1 + y * 311.7 + z * 74.7) * 43758.5453;
  return (s - Math.floor(s)) * 2 - 1;
}

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

// Each wrapper has its own foil "voice" so the five pieces sound different.
const foilVoices = [
  { pitch: 0.9, brightness: 3600, crinkle: 150, ripLength: 0.34, grain: 41 },
  { pitch: 1.04, brightness: 4500, crinkle: 210, ripLength: 0.24, grain: 53 },
  { pitch: 1.14, brightness: 5300, crinkle: 120, ripLength: 0.4, grain: 47 },
  { pitch: 0.96, brightness: 3900, crinkle: 185, ripLength: 0.28, grain: 37 },
  { pitch: 1.08, brightness: 4900, crinkle: 240, ripLength: 0.36, grain: 59 },
];

const vary = (value: number, amount: number) => value * (1 + (Math.random() * 2 - 1) * amount);

// Synthesised foil unwrapping, generated fresh every time: a low crumple as the
// foil gives, clusters of crinkle clicks, and one to three tearing rips at
// random moments. Panned toward the side of the screen the piece is on.
let audioContext: AudioContext | null = null;

function playUnwrapSound(voiceIndex: number, pan: number) {
  try {
    audioContext ??= new AudioContext();
    const ctx = audioContext;
    if (ctx.state === "suspended") void ctx.resume();
    const voice = foilVoices[voiceIndex % foilVoices.length];
    const sampleRate = ctx.sampleRate;
    const duration = vary(0.85, 0.2);
    const buffer = ctx.createBuffer(1, Math.floor(sampleRate * duration), sampleRate);
    const data = buffer.getChannelData(0);

    const rips = Array.from({ length: 1 + Math.floor(Math.random() * 3) }, (_, index) => ({
      start: 0.06 + index * vary(0.16, 0.4) + Math.random() * 0.08,
      length: vary(voice.ripLength, 0.35) / (index + 1),
      level: vary(0.34, 0.3) / (1 + index * 0.4),
      grain: vary(voice.grain, 0.2),
    }));
    const crinklePeak = vary(0.16, 0.35);
    const crinkleSpread = vary(0.02, 0.5);
    const density = vary(voice.crinkle, 0.25);

    let crackle = 0;
    let crumple = 0;
    for (let i = 0; i < data.length; i += 1) {
      const t = i / sampleRate;
      const rate = 25 + density * Math.exp(-((t - crinklePeak) ** 2) / crinkleSpread);
      if (Math.random() < rate / sampleRate) crackle = 0.3 + 0.7 * Math.random();
      crackle *= 0.991 + Math.random() * 0.003;
      let rip = 0;
      for (const segment of rips) {
        const phase = (t - segment.start) / segment.length;
        if (phase > 0 && phase < 1) {
          const grain = 0.5 + 0.5 * Math.sin(2 * Math.PI * segment.grain * t + Math.random() * 0.8);
          rip += Math.sin(Math.PI * phase) * grain * segment.level;
        }
      }
      // A soft, low crumple of the whole wrapper at the start.
      crumple = crumple * 0.995 + (Math.random() * 2 - 1) * 0.005;
      const body = t < 0.25 ? crumple * 14 * (1 - t / 0.25) : 0;
      const fade = 1 - t / duration;
      data[i] = ((Math.random() * 2 - 1) * (crackle + rip) + body) * fade;
    }

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.playbackRate.value = vary(voice.pitch, 0.08);
    const highpass = ctx.createBiquadFilter();
    highpass.type = "highpass";
    highpass.frequency.value = vary(900, 0.3);
    const presence = ctx.createBiquadFilter();
    presence.type = "peaking";
    presence.frequency.value = vary(voice.brightness, 0.12);
    presence.Q.value = vary(1.2, 0.3);
    presence.gain.value = vary(6, 0.3);
    const volume = ctx.createGain();
    volume.gain.value = vary(0.3, 0.15);
    const panner = ctx.createStereoPanner();
    panner.pan.value = Math.max(-0.7, Math.min(0.7, pan));
    source.connect(highpass).connect(presence).connect(volume).connect(panner).connect(ctx.destination);
    source.start();
  } catch {
    // Audio is a flourish; never let it break the interaction.
  }
}

// Jumps straight to the section (the fade hides the jump, so no visible scroll).
function jumpToSection(hash: string) {
  document.getElementById(hash)?.scrollIntoView({ behavior: "instant" });
  history.replaceState(null, "", `#${hash}`);
}

export default function GumHero() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let disposed = false;
    let cleanup = () => {};

    import("three").then(async (THREE) => {
      const { RoomEnvironment } = await import("three/examples/jsm/environments/RoomEnvironment.js");
      if (disposed) return;
      cleanup = buildScene(THREE, RoomEnvironment, host);
    });

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return (
    <div className="gumHero" ref={hostRef}>
      <nav className="visuallyHidden" aria-label="Work categories">
        {topics.map((topic) => (
          <a href={`#${topic.hash}`} key={topic.hash}>
            {topic.label}
          </a>
        ))}
      </nav>
    </div>
  );
}

function buildScene(
  THREE: typeof Three,
  RoomEnvironment: typeof import("three/examples/jsm/environments/RoomEnvironment.js").RoomEnvironment,
  host: HTMLDivElement,
) {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  // Chrome on a white page washes out, so light mode renders a touch darker.
  let lightMode = false;
  const applyTheme = () => {
    lightMode = document.documentElement.dataset.theme === "light";
    renderer.toneMappingExposure = lightMode ? 0.72 : 1;
  };
  applyTheme();
  const themeObserver = new MutationObserver(applyTheme);
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  renderer.domElement.setAttribute("aria-hidden", "true");
  host.prepend(renderer.domElement);

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const room = new RoomEnvironment();
  const envMap = pmrem.fromScene(room, 0.04).texture;
  scene.environment = envMap;

  const keyLight = new THREE.DirectionalLight(0xffffff, 1.4);
  keyLight.position.set(-4, 6, 8);
  scene.add(keyLight);

  // Glints: now and then a small, intense light sweeps across one wrapper
  // (chrome turns it into a gliding highlight) with a sparkle at its peak.
  const glintLight = new THREE.PointLight(0xffffff, 0, 2.4, 2);
  scene.add(glintLight);
  const sparkleTexture = (() => {
    const size = 128;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    const centre = size / 2;
    const glow = ctx.createRadialGradient(centre, centre, 0, centre, centre, centre);
    glow.addColorStop(0, "rgba(255,255,255,1)");
    glow.addColorStop(0.18, "rgba(255,255,255,0.55)");
    glow.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = "#fff";
    for (const [w, h] of [
      [3, size],
      [size, 3],
    ]) {
      const ray = ctx.createLinearGradient(centre - w / 2, centre - h / 2, centre + w / 2, centre + h / 2);
      ray.addColorStop(0, "rgba(255,255,255,0)");
      ray.addColorStop(0.5, "rgba(255,255,255,1)");
      ray.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = ray;
      ctx.fillRect(centre - w / 2, centre - h / 2, w, h);
    }
    return new THREE.CanvasTexture(canvas);
  })();
  const sparkleMaterial = new THREE.SpriteMaterial({
    map: sparkleTexture,
    blending: THREE.AdditiveBlending,
    depthTest: false,
    depthWrite: false,
    transparent: true,
    opacity: 0,
  });
  const sparkle = new THREE.Sprite(sparkleMaterial);
  sparkle.renderOrder = 10;
  scene.add(sparkle);
  const heroLogo = host.parentElement?.querySelector(".heroMark") ?? null;

  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
  camera.position.set(0, 0, 13);

  const textureLoader = new THREE.TextureLoader();
  const disposables: { dispose: () => void }[] = [envMap, pmrem];

  // A soft purple shadow sits beneath each piece (both themes).
  const shadowTexture = (() => {
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 128;
    const ctx = canvas.getContext("2d")!;
    ctx.scale(1, 0.5);
    const shade = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
    shade.addColorStop(0, "rgba(90, 68, 175, 0.42)");
    shade.addColorStop(0.55, "rgba(90, 68, 175, 0.16)");
    shade.addColorStop(1, "rgba(90, 68, 175, 0)");
    ctx.fillStyle = shade;
    ctx.fillRect(0, 0, 256, 256);
    return new THREE.CanvasTexture(canvas);
  })();
  const shadowGeometry = new THREE.PlaneGeometry(2.8, 1.1);
  // Kept on the pieces' own plane: a shadow set further back is pulled toward
  // the screen centre by perspective and hides behind the lower pieces. Depth
  // testing still lets each wrapper cover the part of its shadow behind it.
  const shadowMaterial = new THREE.MeshBasicMaterial({
    map: shadowTexture,
    transparent: true,
    depthWrite: false,
    opacity: 0,
  });
  disposables.push(shadowTexture, shadowGeometry, shadowMaterial);

  const endMaterial = new THREE.MeshStandardMaterial({
    color: 0xeaeaf0,
    metalness: 1,
    roughness: 0.16,
    flatShading: true,
    side: THREE.DoubleSide,
  });
  disposables.push(endMaterial);

  // Engraving: the label is embossed into the foil with a bump map, and the
  // letters are slightly brushed (rougher) so they stay legible in reflections.
  function engraving(text: string) {
    const width = 1024;
    const height = Math.round((width * BODY.b) / BODY.a);
    const draw = (background: string, groove: string, raised: string, brand: string) => {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d")!;
      ctx.fillStyle = background;
      ctx.fillRect(0, 0, width, height);
      let size = 250;
      const font = (px: number) => `700 ${px}px "Helvetica Neue", Helvetica, Arial, sans-serif`;
      ctx.font = font(size);
      while (ctx.measureText(text).width > width * 0.8 && size > 60) {
        size -= 6;
        ctx.font = font(size);
      }
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.lineJoin = "round";
      ctx.filter = "blur(2px)";
      const y = height * 0.47;
      ctx.lineWidth = size * 0.14;
      ctx.strokeStyle = groove;
      ctx.strokeText(text, width / 2, y);
      ctx.fillStyle = raised;
      ctx.fillText(text, width / 2, y);
      ctx.font = font(Math.max(40, size * 0.3));
      ctx.fillStyle = brand;
      ctx.fillText("BeGummy", width / 2, y + size * 0.66);
      const texture = new THREE.CanvasTexture(canvas);
      texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
      disposables.push(texture);
      return texture;
    };
    return {
      bumpMap: draw("#808080", "#2c2c2c", "#e2e2e2", "#b4b4b4"),
      roughnessMap: draw("#2a2a2a", "#3a3a3a", "#7a7a7a", "#5a5a5a"),
    };
  }

  // The wrapper body. Planar UVs from the front keep the engraving undistorted.
  function bodyShell(seed: number) {
    const geometry = new THREE.SphereGeometry(1, 128, 96);
    const position = geometry.attributes.position;
    const uv = geometry.attributes.uv;
    const v = new THREE.Vector3();
    for (let i = 0; i < position.count; i += 1) {
      v.fromBufferAttribute(position, i);
      if (v.z > -0.05) uv.setXY(i, v.x * 0.5 + 0.5, v.y * 0.5 + 0.5);
      else uv.setXY(i, 0.01, 0.01);
      const edge = Math.max(0, Math.abs(v.x) - 0.62) / 0.38;
      // Foil gathers into creased pleats where it is pinched into each neck.
      const around = Math.atan2(v.z, v.y);
      const pleats = Math.abs(Math.sin(around * 7 + seed + v.x * 3)) * 0.22 * edge * edge;
      const pinch = 1 - 0.4 * edge * edge - pleats;
      // Keep the engraved front smooth; crumple the foil toward the twisted ends.
      const amplitude = 0.003 + 0.05 * edge * edge;
      const n = foilNoise(v.x * 4 + seed, v.y * 4 - seed, v.z * 4) * amplitude;
      position.setXYZ(
        i,
        v.x * BODY.a + v.x * n,
        v.y * BODY.b * pinch + v.y * n,
        v.z * BODY.c * pinch + v.z * n,
      );
    }
    geometry.computeVertexNormals();
    disposables.push(geometry);
    return geometry;
  }

  // Twisted foil end: a tight, spiral-creased neck that flares into a sheet of
  // crumpled foil with a few large, sharply creased folds. Flat shading on the
  // jittered vertices gives the faceted look of scrunched metal foil.
  function wrapperEnd(seed: number, side: 1 | -1) {
    const length = 0.86;
    const profile = [
      [0.2, 0],
      [0.1, 0.09],
      [0.085, 0.16],
      [0.15, 0.3],
      [0.32, 0.5],
      [0.5, 0.68],
      [0.6, 0.8],
      [0.57, length],
    ].map(([r, h]) => new THREE.Vector2(r, h));
    const points = new THREE.SplineCurve(profile).getPoints(30);
    const geometry = new THREE.LatheGeometry(points, 60);
    const position = geometry.attributes.position;
    const v = new THREE.Vector3();
    for (let i = 0; i < position.count; i += 1) {
      v.fromBufferAttribute(position, i);
      const t = v.y / length;
      const angle = Math.atan2(v.z, v.x);
      let radius = Math.hypot(v.x, v.z);
      let height = v.y;

      const neck = 1 - smoothstep(0.04, 0.34, t);
      radius *= 1 + neck * 0.2 * Math.abs(Math.sin(angle * 6 + t * 16 + seed));

      const flare = smoothstep(0.22, 1, t);
      radius *=
        1 +
        flare *
          (0.46 * Math.abs(Math.sin(angle * 2.5 + seed * 1.3 + t * 1.5)) +
            0.2 * Math.abs(Math.sin(angle * 5 + seed * 2.1)) -
            0.3);

      const jitter = foilJitter(v.x * 7 + seed, v.y * 7, v.z * 7);
      radius *= 1 + jitter * 0.1 * flare;
      height += jitter * 0.05 * flare;
      // The torn-looking rim folds back toward the body in places.
      height -= 0.2 * smoothstep(0.84, 1, t) * Math.abs(Math.sin(angle * 3 + seed));

      const twist = angle + t * 1.2 + seed * 0.3;
      position.setXYZ(i, Math.cos(twist) * radius, height, Math.sin(twist) * radius);
    }
    geometry.rotateZ(side === 1 ? -Math.PI / 2 : Math.PI / 2);
    geometry.computeVertexNormals();
    disposables.push(geometry);
    const mesh = new THREE.Mesh(geometry, endMaterial);
    mesh.position.x = side * BODY.a * 0.84;
    return mesh;
  }

  // Tears the foil open: fragments inside a jagged, growing hole are discarded,
  // the foil around the tear lifts and peels outward, and the inner face of the
  // foil picks up the purple of the gum.
  function tearFoil(material: Three.MeshStandardMaterial, seed: number) {
    const uniforms = { uOpen: { value: 0 }, uSeed: { value: seed } };
    const tearCommon = /* glsl */ `
      uniform float uOpen;
      uniform float uSeed;
      const vec3 tearAxis = normalize(vec3(${TEAR_DIRECTION.join(", ")}));
      float tearReach(vec3 dir, float detail) {
        vec3 across = normalize(cross(tearAxis, vec3(0.0, 1.0, 0.0)));
        vec3 up = cross(across, tearAxis);
        float side = dot(dir, across);
        float lift = dot(dir, up);
        float angle = atan(lift, side);
        // Ragged, uneven edge: a few big bites plus fine torn teeth.
        float jagged = 0.07 * sin(angle * 3.0 + uSeed)
          + 0.05 * sin(angle * 5.0 + uSeed * 1.7)
          + detail * (0.06 * sin(angle * 11.0 + uSeed * 2.3)
          + 0.045 * sin(angle * 19.0 + uSeed * 3.1)
          + 0.03 * sin(angle * 37.0 + uSeed * 4.7)
          + 0.02 * sin(angle * 61.0 + uSeed * 6.1));
        // Stretch the tear sideways along the wrapper, like a split in the foil.
        return dot(dir, tearAxis) + 0.2 * side * side - 0.12 * lift * lift + jagged;
      }
      float tearEdge() {
        return 1.12 - uOpen * 0.3;
      }
      // Some flaps peel out further than others.
      float flapLift(vec3 dir) {
        vec3 across = normalize(cross(tearAxis, vec3(0.0, 1.0, 0.0)));
        vec3 up = cross(across, tearAxis);
        float angle = atan(dot(dir, up), dot(dir, across));
        return 0.6 + 0.4 * sin(angle * 4.0 + uSeed * 2.0);
      }
    `;
    const scale = `vec3(${BODY.a}, ${BODY.b}, ${BODY.c})`;
    material.onBeforeCompile = (shader) => {
      Object.assign(shader.uniforms, uniforms);
      shader.vertexShader = shader.vertexShader
        .replace("#include <common>", `#include <common>\n${tearCommon}\nvarying vec3 vTearDir;`)
        .replace(
          "#include <begin_vertex>",
          `#include <begin_vertex>
          vec3 tearDir = normalize(position / ${scale});
          vTearDir = tearDir;
          float reach = tearReach(tearDir, 0.0);
          float peel = smoothstep(tearEdge() - 0.2, tearEdge(), reach) * step(0.001, uOpen);
          vec3 awayFromHole = normalize(tearDir - tearAxis * dot(tearDir, tearAxis) + 1e-4);
          transformed += (normal * 0.16 + awayFromHole * 0.08) * peel * peel * flapLift(tearDir) * uOpen;`,
        );
      shader.fragmentShader = shader.fragmentShader
        .replace("#include <common>", `#include <common>\n${tearCommon}\nvarying vec3 vTearDir;`)
        .replace(
          "#include <color_fragment>",
          `#include <color_fragment>
          if (uOpen > 0.001 && tearReach(normalize(vTearDir), 1.0) > tearEdge()) discard;
          if (!gl_FrontFacing) diffuseColor.rgb *= vec3(0.62, 0.45, 0.95);`,
        );
    };
    material.customProgramCacheKey = () => "torn-foil";
    return uniforms;
  }

  type Gum = {
    topic: GumTopic;
    group: Three.Group;
    tear: { uOpen: { value: number } };
    shadow: Three.Mesh;
    drop: Three.Mesh;
    pose: [number, number, number];
    scale: number;
    hover: number;
    eatStart: number | null;
    targetScale: number;
    open: number;
    targetOpen: number;
    phase: number;
  };

  const gums: Gum[] = topics.map((topic, index) => {
    const seed = index * 1.7 + 0.4;
    const { bumpMap, roughnessMap } = engraving(topic.engraving ?? topic.label);
    const foil = new THREE.MeshStandardMaterial({
      color: 0xeaeaf0,
      metalness: 1,
      roughness: 1,
      roughnessMap,
      bumpMap,
      bumpScale: 5,
      side: THREE.DoubleSide,
    });
    disposables.push(foil);
    const tear = tearFoil(foil, seed);

    const group = new THREE.Group();
    group.add(new THREE.Mesh(bodyShell(seed), foil));

    group.add(wrapperEnd(seed, 1), wrapperEnd(seed + 5, -1));

    // The gum drop: the topic image wrapped twice around a glossy sphere so
    // the whole picture faces the viewer.
    const photo = textureLoader.load(topic.image);
    photo.colorSpace = THREE.SRGBColorSpace;
    photo.wrapS = THREE.RepeatWrapping;
    photo.repeat.set(2, 1);
    photo.offset.set(0.5, 0);
    photo.anisotropy = renderer.capabilities.getMaxAnisotropy();
    const dropGeometry = new THREE.SphereGeometry(0.6, 64, 48);
    const dropMaterial = new THREE.MeshPhysicalMaterial({
      map: photo,
      roughness: 0.28,
      clearcoat: 1,
      clearcoatRoughness: 0.06,
    });
    disposables.push(photo, dropGeometry, dropMaterial);
    const drop = new THREE.Mesh(dropGeometry, dropMaterial);
    drop.rotation.y = -Math.PI / 2;
    group.add(drop);

    group.traverse((object) => {
      object.userData.gumIndex = index;
    });
    scene.add(group);
    const shadow = new THREE.Mesh(shadowGeometry, shadowMaterial);
    shadow.renderOrder = -1;
    scene.add(shadow);

    return {
      topic,
      group,
      tear,
      drop,
      shadow,
      pose: poses[index],
      scale: 1,
      targetScale: 1,
      open: 0,
      targetOpen: 0,
      phase: index * 1.3,
      eatStart: null,
      hover: 0,
    };
  });

  // Arrange the five pieces in a ring around the centre logo, fitted to the viewport.
  let baseScale = 1;
  const ring = { radiusX: 1, radiusY: 1, centreY: 0 };
  function layout() {
    const width = host.clientWidth;
    const height = host.clientHeight;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    const visibleHeight = 2 * camera.position.z * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    const visibleWidth = visibleHeight * camera.aspect;
    // Tall phone screens get a wider ring and smaller pieces so neighbours don't touch.
    const portrait = camera.aspect < 0.8;
    baseScale = THREE.MathUtils.clamp(
      Math.min(visibleWidth / (portrait ? 10.8 : 9.6), visibleHeight / 7.4),
      0.26,
      0.9,
    );
    ring.radiusX = Math.min(visibleWidth * (portrait ? 0.32 : 0.3), 3.2);
    ring.radiusY = Math.min(visibleHeight * (portrait ? 0.3 : 0.27), 2.2);
    // Nudge the ring down so the top piece clears the fixed header.
    ring.centreY = -visibleHeight * 0.03;
  }

  // Scroll progress through the hero (0 at the top, 1 once the pieces have gathered).
  const hero = host.closest(".aurenHero");
  function gatherProgress() {
    if (!hero || reduceMotion) return 0;
    const scrolled = -hero.getBoundingClientRect().top;
    // Finish just after the stage stops being pinned, whatever the screen height.
    const pinned = Math.max(1, (hero as HTMLElement).offsetHeight - window.innerHeight);
    return THREE.MathUtils.clamp(scrolled / (pinned * 1.1), 0, 1);
  }
  layout();
  const resizeObserver = new ResizeObserver(layout);
  resizeObserver.observe(host);

  // Pointer: the nearest piece grows; a hit on a piece makes it clickable.
  const pointer = new THREE.Vector2();
  let pointerInside = false;
  const raycaster = new THREE.Raycaster();
  const screen = new THREE.Vector3();
  // Where the pointer sits on the z = 0 plane the pieces live on.
  const pointerWorld = new THREE.Vector3();
  const ray = new THREE.Vector3();

  function hitIndex(): number | null {
    raycaster.setFromCamera(pointer, camera);
    const hit = raycaster.intersectObjects(gums.map((gum) => gum.group), true)[0];
    return hit ? (hit.object.userData.gumIndex as number) : null;
  }

  function onPointerMove(event: PointerEvent) {
    const rect = renderer.domElement.getBoundingClientRect();
    pointer.set(((event.clientX - rect.left) / rect.width) * 2 - 1, -((event.clientY - rect.top) / rect.height) * 2 + 1);
    pointerInside = true;
    // A class rather than an inline cursor, so the pressed (scrunched hand) cursor still wins.
    renderer.domElement.classList.toggle("isOverGum", hitIndex() !== null);
  }

  function onPointerLeave() {
    pointerInside = false;
    renderer.domElement.classList.remove("isOverGum");
  }

  function onClick(event: MouseEvent) {
    onPointerMove(event as PointerEvent);
    const index = hitIndex();
    if (index === null) {
      gums.forEach((gum) => (gum.targetOpen = 0));
      return;
    }
    const gum = gums[index];
    if (gums.some((item) => item.eatStart !== null)) return;
    if (gum.targetOpen === 1) {
      if (reduceMotion) jumpToSection(gum.topic.hash);
      else gum.eatStart = performance.now();
      return;
    }
    gums.forEach((other) => (other.targetOpen = other === gum ? 1 : 0));
    screen.copy(gum.group.position).project(camera);
    playUnwrapSound(index, screen.x * 0.8);
  }

  // Full-screen fade that hides the jump from the hero to the chosen section.
  const fade = document.createElement("div");
  fade.className = "gumFade";
  fade.setAttribute("aria-hidden", "true");
  document.body.append(fade);

  renderer.domElement.addEventListener("pointermove", onPointerMove);
  renderer.domElement.addEventListener("pointerleave", onPointerLeave);
  renderer.domElement.addEventListener("click", onClick);

  // Only render while the hero is on screen.
  let visible = true;
  const visibilityObserver = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
  });
  visibilityObserver.observe(host);

  const timer = new THREE.Timer();
  timer.connect(document);
  let frame = 0;
  const ease = (current: number, target: number, rate: number, delta: number) =>
    reduceMotion ? target : current + (target - current) * (1 - Math.exp(-rate * delta));

  type Glint = { target: number | "logo"; start: number };
  let glint: Glint | null = null;
  // One shine every 4-7 seconds (random), starting shortly after load.
  const nextGlintGap = () => 4 + Math.random() * 3;
  let nextGlintAt = 2;
  let lastGlintTarget: number | "logo" | null = null;
  const GLINT_DURATION = 0.9;
  const glintFrom = new THREE.Vector3();
  const glintTo = new THREE.Vector3();

  function scheduleGlint(time: number, gather: number) {
    if (reduceMotion || glint || time < nextGlintAt) return;
    nextGlintAt = time + nextGlintGap();
    if (gather > 0.05 || gums.some((gum) => gum.targetOpen === 1)) return;
    let target: number | "logo" = Math.random() < 0.2 ? "logo" : Math.floor(Math.random() * gums.length);
    if (target === lastGlintTarget) target = target === "logo" ? 0 : (Number(target) + 1) % gums.length;
    lastGlintTarget = target;
    glint = { target, start: time };
    if (target === "logo" && heroLogo) {
      heroLogo.classList.remove("isShining");
      void (heroLogo as HTMLElement).offsetWidth;
      heroLogo.classList.add("isShining");
    }
  }

  function updateGlint(time: number) {
    glintLight.intensity = 0;
    sparkleMaterial.opacity = 0;
    if (!glint) return;
    const t = (time - glint.start) / GLINT_DURATION;
    if (t >= 1) {
      if (glint.target === "logo") heroLogo?.classList.remove("isShining");
      glint = null;
      return;
    }
    if (glint.target === "logo") return;
    const gum = gums[glint.target];
    const peak = Math.sin(Math.PI * t);
    // Sweep across the front of the wrapper, top-left to lower-right.
    gum.group.localToWorld(glintFrom.set(-1.2, 0.6, 1.05));
    gum.group.localToWorld(glintTo.set(1.2, -0.2, 1.05));
    glintLight.position.lerpVectors(glintFrom, glintTo, t);
    glintLight.intensity = 55 * peak;
    // The sparkle rides the surface just under the moving highlight.
    gum.group.localToWorld(sparkle.position.set(THREE.MathUtils.lerp(-0.55, 0.55, t), THREE.MathUtils.lerp(0.42, 0.05, t), BODY.c * 0.98));
    const sparklePeak = Math.max(0, 1 - Math.abs(t - 0.55) / 0.22);
    sparkleMaterial.opacity = sparklePeak;
    sparkleMaterial.rotation = t * 1.6;
    sparkle.scale.setScalar(0.8 * baseScale * gum.scale * (0.4 + sparklePeak));
  }

  // "Eating" the gum: the drop is lifted out of the torn wrapper toward the
  // viewer, squashed in a quick bite and gone, then the page fades to the section.
  const EAT_LIFT = 0.6;
  const EAT_BITE = 0.95;
  const FADE_AT = 0.75;
  const JUMP_AT = 1.15;
  function eat(gum: Gum) {
    const elapsed = (performance.now() - (gum.eatStart ?? 0)) / 1000;
    const lift = smoothstep(0, EAT_LIFT, elapsed);
    gum.drop.position.set(0, 0.06 + lift * 0.95, lift * 0.9);
    gum.drop.rotation.y = -Math.PI / 2 + lift * 0.8;
    let size = 1 + lift * 0.3;
    if (elapsed > EAT_LIFT) {
      const bite = smoothstep(EAT_LIFT, EAT_BITE, elapsed);
      const chomp = Math.sin(Math.min(1, bite * 2) * Math.PI);
      size *= 1 - bite;
      gum.drop.scale.set(size * (1 + chomp * 0.25), size * (1 - chomp * 0.3), size);
    } else {
      gum.drop.scale.setScalar(size);
    }
    if (elapsed > FADE_AT) fade.classList.add("isOn");
    if (elapsed > JUMP_AT) {
      jumpToSection(gum.topic.hash);
      gum.eatStart = null;
      gum.targetOpen = 0;
      gum.open = 0;
      requestAnimationFrame(() => fade.classList.remove("isOn"));
    }
  }

  function tick(timestamp?: number) {
    frame = requestAnimationFrame(tick);
    timer.update(timestamp);
    if (!visible || document.hidden) return;
    const delta = Math.min(timer.getDelta(), 0.05);
    const time = timer.getElapsed();

    // Scrolling spirals the pieces into the centre: they orbit inward, shrink,
    // spin and fade, like the photo spiral this replaced.
    // On first load the pieces play the spiral in reverse: they start gathered
    // in the centre and unwind out to the ring. Scrolling takes over from there.
    const intro = reduceMotion ? 1 : Math.min(1, time / INTRO_SECONDS);
    const introGather = (1 - intro) ** 3; // eases out: fast unwind, gentle landing
    const gather = Math.max(gatherProgress(), introGather);
    const gatherEase = gather * gather * (3 - 2 * gather);
    if (gather > 0.04) gums.forEach((gum) => (gum.targetOpen = 0));
    gums.forEach((gum, index) => {
      const angle = (index * Math.PI * 2) / gums.length + gatherEase * 2.6;
      const radius = 1 - gatherEase * 0.94;
      gum.group.position.set(
        Math.sin(angle) * ring.radiusX * radius,
        ring.centreY * (1 - gatherEase) + Math.cos(angle) * ring.radiusY * radius,
        0,
      );
    });
    renderer.domElement.style.opacity = String(1 - gatherEase * 0.66);
    shadowMaterial.opacity = ease(shadowMaterial.opacity, 1, 5, delta);

    if (pointerInside) {
      ray.set(pointer.x, pointer.y, 0.5).unproject(camera).sub(camera.position).normalize();
      pointerWorld.copy(camera.position).addScaledVector(ray, -camera.position.z / ray.z);
    }

    scheduleGlint(time, gather);
    updateGlint(time);

    let nearest = -1;
    if (pointerInside && gather < 0.04) {
      let best = Infinity;
      gums.forEach((gum, index) => {
        screen.copy(gum.group.position).project(camera);
        const distance = Math.hypot(screen.x - pointer.x, (screen.y - pointer.y) / camera.aspect);
        if (distance < best) {
          best = distance;
          nearest = index;
        }
      });
    }

    gums.forEach((gum, index) => {
      gum.targetScale = index === nearest || gum.targetOpen === 1 ? HOVER_SCALE : 1;
      gum.scale = ease(gum.scale, gum.targetScale, 9, delta);
      gum.open = ease(gum.open, gum.targetOpen, 4.5, delta);
      const size = gum.scale * baseScale * (1 - gatherEase * 0.58);
      gum.group.scale.setScalar(size);
      // Contact shadow sized to the piece; positioned below once its tilt is known.
      gum.shadow.scale.set(size * 0.9, size * 0.8, 1);

      // While open, the piece turns to face the viewer so the drop is visible.
      const bob = reduceMotion ? 0 : Math.sin(time * 0.8 + gum.phase) * 0.06;
      // The hovered piece twists so its engraved face turns toward the cursor.
      gum.hover = ease(gum.hover, index === nearest && gum.targetOpen === 0 ? 1 : 0, 6, delta);
      const toPointerX = THREE.MathUtils.clamp((pointerWorld.x - gum.group.position.x) * 0.5, -0.7, 0.7);
      const toPointerY = THREE.MathUtils.clamp(-(pointerWorld.y - gum.group.position.y) * 0.5, -0.55, 0.55);
      const [poseX, poseY, rz] = gum.pose;
      const rx = THREE.MathUtils.lerp(poseX + bob, toPointerY, gum.hover);
      const ry = THREE.MathUtils.lerp(poseY + bob * 0.6, toPointerX, gum.hover);
      gum.group.rotation.set(
        THREE.MathUtils.lerp(rx, 0.3, gum.open),
        THREE.MathUtils.lerp(ry, 0, gum.open),
        THREE.MathUtils.lerp(rz * (1 - gum.hover * 0.6), 0, gum.open) + gatherEase * 2.5,
      );
      // Tucked just under the lowest point of the (tilted) wrapper body, so it
      // stays visible under strongly rotated pieces too.
      const tilt = gum.group.rotation.z;
      const lowest = Math.hypot(BODY.a * Math.sin(tilt), BODY.b * Math.cos(tilt));
      gum.shadow.position.set(gum.group.position.x, gum.group.position.y - lowest * 0.95 * size, 0);
      gum.tear.uOpen.value = gum.open;
      gum.drop.position.set(0, 0.06 * gum.open, 0);
      gum.drop.rotation.x = -0.4 * gum.open;
      gum.drop.scale.setScalar(1);
      if (gum.eatStart !== null) eat(gum);
    });

    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(frame);
    timer.dispose();
    resizeObserver.disconnect();
    themeObserver.disconnect();
    visibilityObserver.disconnect();
    renderer.domElement.removeEventListener("pointermove", onPointerMove);
    renderer.domElement.removeEventListener("pointerleave", onPointerLeave);
    renderer.domElement.removeEventListener("click", onClick);
    disposables.forEach((item) => item.dispose());
    sparkleTexture.dispose();
    sparkleMaterial.dispose();
    heroLogo?.classList.remove("isShining");
    fade.remove();
    room.dispose();
    renderer.dispose();
    renderer.domElement.remove();
  };
}
