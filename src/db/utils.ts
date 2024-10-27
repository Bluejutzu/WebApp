import z from "zod";

export function generateUUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"
        .replace(/[xy]/g, function (c) {
            const r = (Math.random() * 16) | 0;
            const v = c === "x" ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        })
        .slice(0, 16); // Truncate to 16 characters
}

export const passwordSchema = z.string().max(12, { message: "Password must be 12 characters or fewer." });
export const userIdSchema = z.string().max(16, { message: "User ID must be 16 characters or fewer." });
