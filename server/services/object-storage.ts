
import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Readable } from "stream";

export interface IObjectStorage {
    uploadFile(file: Express.Multer.File, folder?: string): Promise<string>;
    deleteFile(key: string): Promise<boolean>;
    getSignedUrl(key: string, expiresIn?: number): Promise<string>;
}

export class S3ObjectStorage implements IObjectStorage {
    private client: S3Client;
    private bucket: string;
    private publicUrl?: string;

    constructor() {
        const endpoint = process.env.S3_ENDPOINT;
        const region = process.env.S3_REGION || "us-east-1"; // Default for MinIO often ignores this, but SDK needs it
        const accessKeyId = process.env.S3_ACCESS_KEY;
        const secretAccessKey = process.env.S3_SECRET_KEY;

        this.bucket = process.env.S3_BUCKET || "storage";
        this.publicUrl = process.env.S3_PUBLIC_URL; // Optional, for direct public serving

        if (!endpoint || !accessKeyId || !secretAccessKey) {
            console.warn("⚠️ S3 Object Storage not fully configured (Missing Endpoint/Keys). Uploads may fail.");
        }

        this.client = new S3Client({
            region,
            endpoint,
            credentials: {
                accessKeyId: accessKeyId || "",
                secretAccessKey: secretAccessKey || "",
            },
            forcePathStyle: true, // Required for MinIO
        });
    }

    async uploadFile(file: Express.Multer.File, folder: string = "uploads"): Promise<string> {
        const timestamp = Date.now();
        const sanitizedName = file.originalname.replace(/[^a-zA-Z0-9.-]/g, "_");
        const key = `${folder}/${timestamp}-${sanitizedName}`;

        try {
            await this.client.send(new PutObjectCommand({
                Bucket: this.bucket,
                Key: key,
                Body: file.buffer,
                ContentType: file.mimetype,
                // ACL: "public-read", // Uncomment if bucket allows public reads via ACL
            }));

            console.log(`[S3] Uploaded ${key}`);
            return key;
        } catch (error) {
            console.error("[S3] Upload failed:", error);
            throw new Error(`Failed to upload file: ${error instanceof Error ? error.message : "Unknown error"}`);
        }
    }

    async deleteFile(key: string): Promise<boolean> {
        try {
            await this.client.send(new DeleteObjectCommand({
                Bucket: this.bucket,
                Key: key,
            }));
            return true;
        } catch (error) {
            console.error("[S3] Delete failed:", error);
            return false;
        }
    }

    async getSignedUrl(key: string, expiresIn = 3600): Promise<string> {
        // If we have a public URL configured (e.g., CDN or direct bucket access), use it for speed
        if (this.publicUrl) {
            return `${this.publicUrl}/${key}`;
        }

        try {
            const command = new GetObjectCommand({
                Bucket: this.bucket,
                Key: key,
            });
            return await getSignedUrl(this.client, command, { expiresIn });
        } catch (error) {
            console.error("[S3] Signing URL failed:", error);
            throw error;
        }
    }
}

import fs from "fs";
import path from "path";
import { mkdir, writeFile, unlink } from "fs/promises";

export class LocalObjectStorage implements IObjectStorage {
    private uploadDir: string;
    private baseUrl: string;

    constructor() {
        this.uploadDir = path.join(process.cwd(), "uploads");
        this.baseUrl = process.env.APP_BASE_URL || "http://localhost:5001";

        // Ensure upload directory exists
        if (!fs.existsSync(this.uploadDir)) {
            fs.mkdirSync(this.uploadDir, { recursive: true });
            console.log(`[LocalStorage] Created upload directory at ${this.uploadDir}`);
        }
    }

    async uploadFile(file: Express.Multer.File, folder: string = "misc"): Promise<string> {
        const timestamp = Date.now();
        const sanitizedName = file.originalname.replace(/[^a-zA-Z0-9.-]/g, "_");

        // Create subdirectories if needed? For now flat structure or simplified
        // Let's support formatting key as "folder/filename" but safe file system usage
        const fileName = `${timestamp}-${sanitizedName}`;
        const targetPath = path.join(this.uploadDir, fileName); // We'll ignore 'folder' arg for simple local storage flat struct, or implement subdirs

        try {
            await writeFile(targetPath, file.buffer);
            console.log(`[LocalStorage] Saved ${fileName}`);
            return fileName;
        } catch (error) {
            console.error("[LocalStorage] Write failed:", error);
            throw new Error("Failed to save file locally");
        }
    }

    async deleteFile(key: string): Promise<boolean> {
        try {
            const targetPath = path.join(this.uploadDir, key);
            await unlink(targetPath);
            return true;
        } catch (error) {
            console.error("[LocalStorage] Delete failed:", error);
            return false;
        }
    }

    async getSignedUrl(key: string, _expiresIn?: number): Promise<string> {
        // For local storage, "signed URL" is just the static serve path
        // url = BASE_URL / uploads / key
        return `${this.baseUrl}/uploads/${key}`;
    }
}

// Factory to choose provider
const provider = process.env.STORAGE_PROVIDER || "local";
console.log(`[ObjectStorage] Using provider: ${provider}`);

export const objectStorage = provider === "s3"
    ? new S3ObjectStorage()
    : new LocalObjectStorage();
