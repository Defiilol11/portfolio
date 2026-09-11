import * as THREE from 'three';

export interface PartData {
  id: string;
  name: string;
  type: string;
  parent: string | null;
  originalPosition: THREE.Vector3;
  originalRotation: THREE.Euler;
  originalScale: THREE.Vector3;
  boundingBox: THREE.Box3;
  center: THREE.Vector3;
  explosionDirection: THREE.Vector3;
  manualExplosionDirection: THREE.Vector3 | null;
  materialReferences: string[];
  visibility: boolean;
  selectable: boolean;
}

export class ModelRegistry {
  public parts: Map<string, PartData> = new Map();
  public globalBoundingBox: THREE.Box3 = new THREE.Box3();
  public globalCenter: THREE.Vector3 = new THREE.Vector3();

  analyze(scene: THREE.Group | THREE.Scene) {
    this.parts.clear();
    this.globalBoundingBox.makeEmpty();

    // First pass: collect bounding boxes
    scene.traverse((node) => {
      if ((node as THREE.Mesh).isMesh) {
        const mesh = node as THREE.Mesh;
        mesh.updateMatrixWorld(true);
        if (!mesh.geometry.boundingBox) mesh.geometry.computeBoundingBox();

        const box = new THREE.Box3();
        box.copy(mesh.geometry.boundingBox!).applyMatrix4(mesh.matrixWorld);

        this.globalBoundingBox.expandByPoint(box.min);
        this.globalBoundingBox.expandByPoint(box.max);
      }
    });

    this.globalBoundingBox.getCenter(this.globalCenter);

    // Second pass: assign parts
    scene.traverse((node) => {
      if ((node as THREE.Mesh).isMesh) {
        const mesh = node as THREE.Mesh;
        
        const box = new THREE.Box3();
        box.copy(mesh.geometry.boundingBox!).applyMatrix4(mesh.matrixWorld);
        const center = new THREE.Vector3();
        box.getCenter(center);

        // Auto direction
        const dir = new THREE.Vector3().subVectors(center, this.globalCenter);
        if (dir.lengthSq() > 0.0001) {
          dir.normalize();
        } else {
          // If the piece is perfectly dead-center (like the inner/outer rings of a bearing),
          // spread them out along the Z and Y axes based on how many central pieces we've found
          const centralIndex = Array.from(this.parts.values()).filter(p => p.explosionDirection.lengthSq() === 1 && Math.abs(p.center.distanceTo(this.globalCenter)) < 0.001).length;
          const axisFallback = [
            new THREE.Vector3(0, 0, 1),
            new THREE.Vector3(0, 0, -1),
            new THREE.Vector3(0, 1, 0),
            new THREE.Vector3(0, -1, 0),
          ];
          dir.copy(axisFallback[centralIndex % axisFallback.length]);
        }

        const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
        
        this.parts.set(mesh.uuid, {
          id: mesh.uuid,
          name: mesh.name || 'Unnamed_Mesh',
          type: mesh.type,
          parent: mesh.parent ? (mesh.parent.name || mesh.parent.uuid) : null,
          originalPosition: mesh.position.clone(),
          originalRotation: mesh.rotation.clone(),
          originalScale: mesh.scale.clone(),
          boundingBox: box,
          center: center,
          explosionDirection: dir,
          manualExplosionDirection: null,
          materialReferences: materials.map(m => m.name || m.uuid),
          visibility: mesh.visible,
          selectable: true,
        });
      }
    });

    return {
      totalParts: this.parts.size,
      globalCenter: this.globalCenter,
      globalSize: this.globalBoundingBox.getSize(new THREE.Vector3())
    };
  }

  getPart(id: string) {
    return this.parts.get(id);
  }

  getAllParts() {
    return Array.from(this.parts.values());
  }
}
