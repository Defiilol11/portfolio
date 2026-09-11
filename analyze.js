import { NodeIO } from '@gltf-transform/core';
import fs from 'fs';

async function analyze() {
  const io = new NodeIO();
  const document = await io.read('./public/models/ball_bearing.glb');
  const root = document.getRoot();

  const info = {
    nodes: root.listNodes().length,
    meshes: root.listMeshes().length,
    materials: root.listMaterials().length,
    textures: root.listTextures().length,
    animations: root.listAnimations().length,
    hierarchy: [],
    nodeNames: [],
  };

  const processNode = (node) => {
    info.nodeNames.push(node.getName() || 'unnamed');
    const mesh = node.getMesh();
    return {
      name: node.getName() || 'unnamed',
      hasMesh: !!mesh,
      meshName: mesh ? mesh.getName() : null,
      children: node.listChildren().map(processNode)
    };
  };

  info.hierarchy = root.listScenes()[0].listChildren().map(processNode);

  fs.writeFileSync('./glb_analysis.json', JSON.stringify(info, null, 2));
}

analyze().catch(console.error);
