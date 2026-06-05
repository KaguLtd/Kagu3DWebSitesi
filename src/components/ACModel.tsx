import { useEffect, useMemo, useRef, useState } from "react";
import { ThreeEvent, useFrame } from "@react-three/fiber";
import { Clone, useGLTF } from "@react-three/drei";
import {
  Box3,
  CanvasTexture,
  Group,
  LinearFilter,
  Material,
  MathUtils,
  Mesh,
  MeshStandardMaterial,
  Object3D,
  SRGBColorSpace,
  Vector3,
} from "three";
import { callouts } from "../data/callouts";
import { clampModelRotation, type ModelRotation } from "../lib/clampRotation";
import {
  projectLocalPointToScreen,
  type ProjectedCallout,
} from "../lib/projection";

const MODEL_URL = "/models/split-ac-indoor.glb";
const TARGET_MODEL_WIDTH = 5.8;
const DRAG_SENSITIVITY = 0.0042;
const BASE_MODEL_Y_ROTATION = -Math.PI / 2;

type ACModelProps = {
  onProjectedCalloutsChange?: (positions: ProjectedCallout[]) => void;
};

type DragState = {
  pointerId: number;
  x: number;
  y: number;
};

function createKaguLogoTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 384;

  const context = canvas.getContext("2d");
  if (!context) {
    return null;
  }

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "#050f1f";
  context.font = '700 180px "Horizon", sans-serif';
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText("KAGU", canvas.width / 2, canvas.height / 2 + 8);

  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.flipY = false;
  texture.magFilter = LinearFilter;
  texture.minFilter = LinearFilter;
  texture.needsUpdate = true;

  return texture;
}

function materialUsesDaikinTexture(material: MeshStandardMaterial) {
  const image = material.map?.image as
    | { currentSrc?: string; height?: number; src?: string; width?: number }
    | undefined;
  const imageSource = `${image?.currentSrc ?? ""} ${image?.src ?? ""}`;
  const hasLogoTextureAspect =
    image?.width === 671 && image?.height === 239;

  return (
    material.name.toLowerCase().includes("daikin") ||
    imageSource.toLowerCase().includes("daikin.jpg") ||
    hasLogoTextureAspect
  );
}

function prepareModel(root: Object3D, logoTexture: CanvasTexture | null) {
  root.traverse((child) => {
    if (child instanceof Mesh) {
      child.castShadow = true;
      child.receiveShadow = true;
      const hasMaterialArray = Array.isArray(child.material);
      const materials: Material[] = hasMaterialArray
        ? child.material
        : [child.material];

      child.material = materials.map((material) => {
        if (
          logoTexture &&
          material instanceof MeshStandardMaterial &&
          materialUsesDaikinTexture(material)
        ) {
          const decalMaterial = material.clone();
          decalMaterial.map = logoTexture;
          decalMaterial.transparent = true;
          decalMaterial.alphaTest = 0.08;
          decalMaterial.depthWrite = false;
          decalMaterial.color.set("#ffffff");
          decalMaterial.roughness = 0.54;
          decalMaterial.metalness = 0;
          decalMaterial.needsUpdate = true;
          return decalMaterial;
        }

        material.needsUpdate = true;
        return material;
      });

      if (!hasMaterialArray && Array.isArray(child.material)) {
        child.material = child.material[0];
      }
    }
  });
}

function useHorizonFontReady() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    if (!("fonts" in document)) {
      setReady(true);
      return;
    }

    document.fonts
      .load('700 180px "Horizon"')
      .then(() => {
        if (!cancelled) {
          setReady(true);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setReady(true);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return ready;
}

export function ACModel({
  onProjectedCalloutsChange,
}: ACModelProps) {
  return (
    <LoadedACModel
      onProjectedCalloutsChange={onProjectedCalloutsChange}
    />
  );
}

function LoadedACModel({
  onProjectedCalloutsChange,
}: ACModelProps) {
  const { scene } = useGLTF(MODEL_URL);
  const horizonFontReady = useHorizonFontReady();
  const interactionGroup = useRef<Group>(null);
  const modelGroup = useRef<Group>(null);
  const anchorGroup = useRef<Group>(null);
  const dragState = useRef<DragState | null>(null);
  const targetRotation = useRef<ModelRotation>({ pitch: 0, yaw: 0 });
  const lastProjectedKey = useRef("");

  const modelTransform = useMemo(() => {
    const model = scene.clone(true);
    const logoTexture = horizonFontReady ? createKaguLogoTexture() : null;
    prepareModel(model, logoTexture);

    const box = new Box3().setFromObject(model);
    const size = new Vector3();
    const center = new Vector3();
    box.getSize(size);
    box.getCenter(center);

    const maxAxis = Math.max(size.x, size.y, size.z) || 1;
    const scale = TARGET_MODEL_WIDTH / maxAxis;

    return { model, center, scale };
  }, [horizonFontReady, scene]);

  useFrame(({ camera, gl }, delta) => {
    if (!interactionGroup.current) {
      return;
    }

    const damping = 1 - Math.exp(-delta * 12);
    interactionGroup.current.rotation.x = MathUtils.lerp(
      interactionGroup.current.rotation.x,
      targetRotation.current.pitch,
      damping,
    );
    interactionGroup.current.rotation.y = MathUtils.lerp(
      interactionGroup.current.rotation.y,
      targetRotation.current.yaw,
      damping,
    );
    interactionGroup.current.rotation.z = 0;

    if (anchorGroup.current && onProjectedCalloutsChange) {
      anchorGroup.current.updateWorldMatrix(true, false);
      const canvasRect = gl.domElement.getBoundingClientRect();
      const currentPitch = interactionGroup.current.rotation.x;
      const currentYaw = interactionGroup.current.rotation.y;
      const projectedCallouts = callouts.map((callout) => {
        const projected = projectLocalPointToScreen(
          callout.localAnchor,
          anchorGroup.current!.matrixWorld,
          camera,
          canvasRect,
        );

        return {
          id: callout.id,
          pitch: Number(currentPitch.toFixed(4)),
          x: Math.round(projected.x),
          y: Math.round(projected.y),
          visible: projected.visible,
          yaw: Number(currentYaw.toFixed(4)),
        };
      });
      const projectedKey = projectedCallouts
        .map(
          (callout) =>
            `${callout.id}:${callout.x}:${callout.y}:${callout.visible}:${callout.pitch}:${callout.yaw}`,
        )
        .join("|");

      if (projectedKey !== lastProjectedKey.current) {
        lastProjectedKey.current = projectedKey;
        onProjectedCalloutsChange(projectedCallouts);
      }
    }
  });

  const handlePointerDown = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    const pointerTarget = event.nativeEvent.target;
    if (pointerTarget instanceof Element) {
      pointerTarget.setPointerCapture(event.pointerId);
    }
    dragState.current = {
      pointerId: event.pointerId,
      x: event.clientX,
      y: event.clientY,
    };
  };

  const handlePointerMove = (event: ThreeEvent<PointerEvent>) => {
    if (!dragState.current || dragState.current.pointerId !== event.pointerId) {
      return;
    }

    event.stopPropagation();

    const deltaX = event.clientX - dragState.current.x;
    const deltaY = event.clientY - dragState.current.y;
    dragState.current.x = event.clientX;
    dragState.current.y = event.clientY;

    targetRotation.current = clampModelRotation({
      pitch: targetRotation.current.pitch + deltaY * DRAG_SENSITIVITY,
      yaw: targetRotation.current.yaw + deltaX * DRAG_SENSITIVITY,
    });
  };

  const handlePointerUp = (event: ThreeEvent<PointerEvent>) => {
    if (dragState.current?.pointerId === event.pointerId) {
      event.stopPropagation();
      const pointerTarget = event.nativeEvent.target;
      if (pointerTarget instanceof Element) {
        pointerTarget.releasePointerCapture(event.pointerId);
      }
      dragState.current = null;
    }
  };

  return (
    <group
      ref={interactionGroup}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      <group
        ref={modelGroup}
        rotation={[0, BASE_MODEL_Y_ROTATION, 0]}
        scale={modelTransform.scale}
      >
        <Clone
          object={modelTransform.model}
          position={[
            -modelTransform.center.x,
            -modelTransform.center.y,
            -modelTransform.center.z,
          ]}
        />
      </group>
      <group ref={anchorGroup} rotation={[0, BASE_MODEL_Y_ROTATION, 0]} />
    </group>
  );
}

useGLTF.preload(MODEL_URL);
