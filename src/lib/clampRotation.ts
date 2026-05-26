import { MathUtils } from "three";

export const ROTATION_LIMITS = {
  pitch: MathUtils.degToRad(10),
  yaw: MathUtils.degToRad(20),
  roll: 0,
} as const;

export type ModelRotation = {
  pitch: number;
  yaw: number;
};

export function clampModelRotation(rotation: ModelRotation): ModelRotation {
  return {
    pitch: MathUtils.clamp(
      rotation.pitch,
      -ROTATION_LIMITS.pitch,
      ROTATION_LIMITS.pitch,
    ),
    yaw: MathUtils.clamp(rotation.yaw, -ROTATION_LIMITS.yaw, ROTATION_LIMITS.yaw),
  };
}
