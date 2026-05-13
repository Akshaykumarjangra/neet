import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {
  DEFAULT_CAMERA_CONFIG,
  createDefaultLights,
  MATERIAL_PRESETS,
  createGlowMaterial
} from './three.ts';

describe('three.ts utilities', () => {
  describe('DEFAULT_CAMERA_CONFIG', () => {
    it('has expected camera properties', () => {
      assert.ok(DEFAULT_CAMERA_CONFIG.position instanceof THREE.Vector3);
      assert.equal(DEFAULT_CAMERA_CONFIG.position.x, 0);
      assert.equal(DEFAULT_CAMERA_CONFIG.position.y, 0);
      assert.equal(DEFAULT_CAMERA_CONFIG.position.z, 8);
      assert.equal(DEFAULT_CAMERA_CONFIG.fov, 50);
      assert.equal(DEFAULT_CAMERA_CONFIG.near, 0.1);
      assert.equal(DEFAULT_CAMERA_CONFIG.far, 1000);
    });
  });

  describe('createDefaultLights', () => {
    it('returns an array of exactly three lights', () => {
      const lights = createDefaultLights();
      assert.equal(lights.length, 3);

      const [ambient, directional, point] = lights;

      // Check AmbientLight
      assert.ok(ambient instanceof THREE.AmbientLight);
      assert.equal(ambient.color.getHex(), 0xffffff);
      assert.equal(ambient.intensity, 0.6);

      // Check DirectionalLight
      assert.ok(directional instanceof THREE.DirectionalLight);
      assert.equal(directional.color.getHex(), 0xffffff);
      assert.equal(directional.intensity, 0.8);
      assert.equal(directional.position.x, 10);
      assert.equal(directional.position.y, 10);
      assert.equal(directional.position.z, 10);

      // Check PointLight
      assert.ok(point instanceof THREE.PointLight);
      assert.equal(point.color.getHex(), 0xffffff);
      assert.equal(point.intensity, 0.5);
      assert.equal(point.position.x, -10);
      assert.equal(point.position.y, -10);
      assert.equal(point.position.z, -10);
    });
  });

  describe('MATERIAL_PRESETS', () => {
    it('contains physics presets', () => {
      assert.ok(MATERIAL_PRESETS.physics.metallic instanceof THREE.MeshStandardMaterial);
      assert.equal(MATERIAL_PRESETS.physics.metallic.color.getHex(), 0x3b82f6);
      assert.equal(MATERIAL_PRESETS.physics.metallic.metalness, 0.7);
      assert.equal(MATERIAL_PRESETS.physics.metallic.roughness, 0.3);

      assert.ok(MATERIAL_PRESETS.physics.glass instanceof THREE.MeshPhysicalMaterial);
      assert.equal(MATERIAL_PRESETS.physics.glass.color.getHex(), 0x60a5fa);
      assert.equal(MATERIAL_PRESETS.physics.glass.metalness, 0);
      assert.equal(MATERIAL_PRESETS.physics.glass.roughness, 0);
      assert.equal(MATERIAL_PRESETS.physics.glass.transmission, 0.9);
      assert.equal(MATERIAL_PRESETS.physics.glass.thickness, 0.5);
    });

    it('contains chemistry presets', () => {
      assert.ok(MATERIAL_PRESETS.chemistry.atom instanceof THREE.MeshStandardMaterial);
      assert.equal(MATERIAL_PRESETS.chemistry.atom.color.getHex(), 0x8b5cf6);
      assert.equal(MATERIAL_PRESETS.chemistry.atom.metalness, 0.5);
      assert.equal(MATERIAL_PRESETS.chemistry.atom.roughness, 0.4);

      assert.ok(MATERIAL_PRESETS.chemistry.molecule instanceof THREE.MeshPhongMaterial);
      assert.equal(MATERIAL_PRESETS.chemistry.molecule.color.getHex(), 0xa78bfa);
      assert.equal(MATERIAL_PRESETS.chemistry.molecule.shininess, 100);
    });

    it('contains biology presets', () => {
      assert.ok(MATERIAL_PRESETS.biology.cell instanceof THREE.MeshLambertMaterial);
      assert.equal(MATERIAL_PRESETS.biology.cell.color.getHex(), 0x10b981);
      assert.equal(MATERIAL_PRESETS.biology.cell.transparent, true);
      assert.equal(MATERIAL_PRESETS.biology.cell.opacity, 0.8);

      assert.ok(MATERIAL_PRESETS.biology.membrane instanceof THREE.MeshPhysicalMaterial);
      assert.equal(MATERIAL_PRESETS.biology.membrane.color.getHex(), 0x34d399);
      assert.equal(MATERIAL_PRESETS.biology.membrane.metalness, 0);
      assert.equal(MATERIAL_PRESETS.biology.membrane.roughness, 0.5);
      assert.equal(MATERIAL_PRESETS.biology.membrane.transmission, 0.5);
    });
  });

  describe('createGlowMaterial', () => {
    it('returns a configured ShaderMaterial', () => {
      const color = 0xff0000;
      const material = createGlowMaterial(color);

      assert.ok(material instanceof THREE.ShaderMaterial);

      // Check uniforms
      assert.ok(material.uniforms);
      assert.ok(material.uniforms.glowColor);
      assert.ok(material.uniforms.glowColor.value instanceof THREE.Color);
      assert.equal(material.uniforms.glowColor.value.getHex(), color);

      assert.ok(material.uniforms.viewVector);
      assert.ok(material.uniforms.viewVector.value instanceof THREE.Vector3);

      // Check blending and transparent properties
      assert.equal(material.side, THREE.FrontSide);
      assert.equal(material.blending, THREE.AdditiveBlending);
      assert.equal(material.transparent, true);

      // Check that shaders are present
      assert.ok(material.vertexShader);
      assert.ok(material.vertexShader.includes('void main()'));
      assert.ok(material.fragmentShader);
      assert.ok(material.fragmentShader.includes('void main()'));
    });
  });
});
