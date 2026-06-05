import { Suspense, useLayoutEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { ContactShadows, Float, OrthographicCamera } from "@react-three/drei";
import { MathUtils } from "three";
import { ACModel } from "./ACModel";
import type { ProjectedCallout } from "../lib/projection";

function ResponsiveCamera() {
  const { size, camera } = useThree();
  const zoom = MathUtils.clamp(
    Math.min(size.width / 7.2, size.height / 4.4),
    72,
    168,
  );

  useLayoutEffect(() => {
    if ("zoom" in camera) {
      camera.zoom = zoom;
      camera.updateProjectionMatrix();
    }
  }, [camera, zoom]);

  return null;
}

type SceneRootProps = {
  onProjectedCalloutsChange: (positions: ProjectedCallout[]) => void;
  onSceneBackgroundClick: () => void;
};

export function SceneRoot({
  onProjectedCalloutsChange,
  onSceneBackgroundClick,
}: SceneRootProps) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[34vh] w-[min(78vw,920px)] -translate-x-1/2 -translate-y-[38%] rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(103,232,249,0.2),rgba(14,116,144,0.11)_36%,transparent_72%)] blur-2xl" />
      <Canvas
        className="relative z-10 h-full w-full cursor-grab active:cursor-grabbing"
        dpr={[1, 1.8]}
        shadows
        gl={{ antialias: true, alpha: true }}
        onPointerMissed={onSceneBackgroundClick}
      >
        <OrthographicCamera makeDefault position={[0, 0.85, 8]} zoom={112} />
        <ResponsiveCamera />
        <ambientLight intensity={0.72} />
        <hemisphereLight intensity={1.45} color="#e8fbff" groundColor="#071426" />
        <directionalLight
          castShadow
          intensity={3}
          position={[3.5, 4.5, 5]}
          shadow-mapSize={[1024, 1024]}
        />
        <pointLight intensity={1.8} position={[-3.8, 1.5, 3.6]} color="#4ee7ff" />
        <pointLight intensity={0.82} position={[3.2, -1.4, 4]} color="#2a87ff" />
        <Float floatIntensity={0.16} rotationIntensity={0} speed={1.15}>
          <Suspense fallback={<ACModelFallback />}>
            <ACModel
              onProjectedCalloutsChange={onProjectedCalloutsChange}
            />
          </Suspense>
        </Float>
        <ContactShadows
          position={[0, -1.25, 0]}
          opacity={0.28}
          scale={7}
          blur={2.7}
          far={2.4}
          color="#0ea5c6"
        />
      </Canvas>
    </div>
  );
}

function ACModelFallback() {
  return (
    <group>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[5.4, 1.08, 0.72]} />
        <meshStandardMaterial color="#dff6ff" roughness={0.38} metalness={0.06} />
      </mesh>
    </group>
  );
}
