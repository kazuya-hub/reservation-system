
import { apiFetchJson } from "@/services/apiClient";



export type User = {
    username: string;
    email: string | null;
};

export async function getCurrentUser(): Promise<User> {
    return await apiFetchJson<User>("/users/me/");
}
