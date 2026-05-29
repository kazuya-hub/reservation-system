
import { apiFetch } from "@/services/apiClient";



export type User = {
    username: string;
    email: string | null;
};

export async function getCurrentUser(): Promise<User> {
    return await apiFetch<User>("/users/me");
}
