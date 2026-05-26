import { Camera, Matrix4, Vector3 } from "three";

export type ProjectedCallout = {
  id: string;
  x: number;
  y: number;
  visible: boolean;
};

const reusableWorldPoint = new Vector3();

export function projectLocalPointToScreen(
  localAnchor: [number, number, number],
  modelMatrix: Matrix4,
  camera: Camera,
  canvasRect: DOMRect,
) {
  reusableWorldPoint
    .set(localAnchor[0], localAnchor[1], localAnchor[2])
    .applyMatrix4(modelMatrix)
    .project(camera);

  return {
    x: canvasRect.left + ((reusableWorldPoint.x + 1) / 2) * canvasRect.width,
    y: canvasRect.top + ((1 - reusableWorldPoint.y) / 2) * canvasRect.height,
    visible: reusableWorldPoint.z >= -1 && reusableWorldPoint.z <= 1,
  };
}
