
import { Express } from "express";
import fs from "fs";
import path from "path";
import { writeFile, unlink } from "fs/promises";

export interface IObjectStorage {
    uploadFile(file: Express.Multer.File, folder?: string): Promise<string>;
    deleteFile(key: string): Promise<boolean>;
    getSignedUrl(key: string, expiresIn?: number): Promise<string>;
}

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

        // For local storage, we keep it simple in the uploads folder
        const fileName = `${timestamp}-${sanitizedName}`;
        const targetPath = path.join(this.uploadDir, fileName);

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
            if (fs.existsSync(targetPath)) {
                await unlink(targetPath);
                return true;
            }
            return false;
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

// Fixed to Local Storage only as requested
console.log(`[ObjectStorage] Using Local Storage provider (Coolify Volume compatible)`);
export const objectStorage = new LocalObjectStorage();
