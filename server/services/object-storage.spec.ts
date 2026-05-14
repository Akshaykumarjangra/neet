import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { LocalObjectStorage } from './object-storage.js';

describe('LocalObjectStorage', () => {
    let storage: LocalObjectStorage;

    beforeEach(() => {
        storage = new LocalObjectStorage();
    });

    it('should upload a file successfully', async () => {
        const file = {
            originalname: 'test.txt',
            buffer: Buffer.from('hello world')
        };

        const fileName = await storage.uploadFile(file);
        assert.ok(fileName.endsWith('-test.txt'));

        // Cleanup
        await storage.deleteFile(fileName);
    });

    it('should throw an error when uploadFile fails', async () => {
        // Trigger a write failure by setting uploadDir to an invalid path
        (storage as any).uploadDir = '/invalid-dir-that-does-not-exist/test';

        const file = {
            originalname: 'test.txt',
            buffer: Buffer.from('hello world')
        };

        await assert.rejects(
            storage.uploadFile(file),
            { message: 'Failed to save file locally' }
        );
    });

    it('should delete a file successfully', async () => {
        const file = {
            originalname: 'delete-test.txt',
            buffer: Buffer.from('delete me')
        };

        const fileName = await storage.uploadFile(file);
        const result = await storage.deleteFile(fileName);

        assert.equal(result, true);
    });

    it('should return false when deleting a non-existent file', async () => {
        const result = await storage.deleteFile('non-existent-file.txt');
        assert.equal(result, false);
    });

    it('should block path traversal attempts when deleting', async () => {
        const result = await storage.deleteFile('../../../etc/passwd');
        assert.equal(result, false);
    });

    it('should return a signed URL', async () => {
        const url = await storage.getSignedUrl('test.txt');
        assert.ok(url.includes('/uploads/test.txt'));
    });
});
