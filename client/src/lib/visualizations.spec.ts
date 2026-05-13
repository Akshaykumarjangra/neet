import { describe, it, mock, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import {
  getChapterVisualizations,
  getAllVisualizations,
  getVisualizationsByLibrary,
  getVisualizationById,
  visualizationRegistry,
  type Visualization
} from './visualizations.ts';

describe('Visualizations Registry Lookup', () => {
  // Store the original registry so we can manipulate visualizationRegistry safely
  const originalRegistryKeys = Object.keys(visualizationRegistry);

  afterEach(() => {
    // We clean up any extra keys we add during testing
    const currentKeys = Object.keys(visualizationRegistry);
    for (const key of currentKeys) {
      if (!originalRegistryKeys.includes(key)) {
        delete visualizationRegistry[key];
      }
    }
  });

  describe('getChapterVisualizations', () => {
    it('returns visualizations for an existing chapter from the registry', () => {
      const mockViz: Visualization = {
        id: 'test-viz-1',
        title: 'Test Viz',
        description: 'Test description',
        component: 'TestComponent',
        library: 'React',
        difficulty: '🟢',
        category: 'Test Category'
      };

      visualizationRegistry['test-chapter-1'] = [mockViz];

      const result = getChapterVisualizations('test-chapter-1');
      assert.deepEqual(result.visualizations, [mockViz]);
    });

    it('returns an empty array for a non-existent chapter', () => {
      const result = getChapterVisualizations('non-existent-test-chapter');
      assert.deepEqual(result.visualizations, []);
    });
  });

  describe('getAllVisualizations', () => {
    it('returns a flattened array of all visualizations', () => {
      // Given we are working with the actual registry object,
      // let's verify it matches flattening all current values
      const result = getAllVisualizations();
      const expectedLength = Object.values(visualizationRegistry).reduce((acc, arr) => acc + arr.length, 0);

      assert.equal(result.length, expectedLength);

      if (expectedLength > 0) {
        // Just spot checking the first one exists
        const firstExpected = Object.values(visualizationRegistry)[0][0];
        const found = result.find(v => v.id === firstExpected.id);
        assert.ok(found);
      }
    });
  });

  describe('getVisualizationsByLibrary', () => {
    it('returns visualizations matching the given library', () => {
      const mockViz: Visualization = {
        id: 'test-library-viz',
        title: 'Library Viz',
        description: 'Desc',
        component: 'Comp',
        library: 'React',
        difficulty: '🟡',
        category: 'Cat'
      };
      visualizationRegistry['test-lib-chapter'] = [mockViz];

      const result = getVisualizationsByLibrary('React');
      assert.ok(result.some(v => v.id === 'test-library-viz'));
      assert.ok(result.every(v => v.library === 'React'));
    });

    it('returns an empty array for a non-existent library', () => {
      const result = getVisualizationsByLibrary('NonExistentLibrary');
      assert.deepEqual(result, []);
    });
  });

  describe('getVisualizationById', () => {
    it('returns the visualization matching the given id', () => {
      const mockViz: Visualization = {
        id: 'test-find-me',
        title: 'Find Me',
        description: 'Desc',
        component: 'Comp',
        library: 'PixiJS',
        difficulty: '🔴',
        category: 'Cat'
      };
      visualizationRegistry['test-find-chapter'] = [mockViz];

      const result = getVisualizationById('test-find-me');
      assert.ok(result);
      assert.equal(result?.id, 'test-find-me');
      assert.equal(result?.title, 'Find Me');
    });

    it('returns undefined for a non-existent id', () => {
      const result = getVisualizationById('non-existent-id');
      assert.equal(result, undefined);
    });
  });
});
