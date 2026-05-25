
import * as auth from "@/services/auth";

const API_BASE_URL = "http://127.0.0.1:8000";

export type ApiFetchOptions = RequestInit & {
    skipAuth?: boolean;
};

export class ApiError extends Error {
    readonly status: number;

    constructor(message: string, status: number) {
        super(message);
        this.name = "ApiError";
        this.status = status;
    }
}

function resolveUrl(input: RequestInfo | URL): RequestInfo | URL {
    if (typeof input !== "string") {
        return input;
    }

    if (/^https?:\/\//.test(input)) {
        return input;
    }

    return `${API_BASE_URL}${input.startsWith("/") ? input : `/${input}`}`;
}

export async function apiFetch(input: RequestInfo | URL, init: ApiFetchOptions = {}) {
    const { skipAuth = false, ...requestInit } = init;
    const headers = new Headers(init.headers ?? {});

    if (!headers.has("Accept")) {
        headers.set("Accept", "application/json");
    }

    if (!skipAuth) {
        try {
            const token = auth.getToken();
            headers.set("Authorization", `Bearer ${token}`);
        } catch {
            // ログインしていないものとみなし、トークン無しでリクエストする
        }
    }

    const response = await fetch(resolveUrl(input), { ...requestInit, headers });

    if (response.status === 401) {
        auth.logout();
        throw new ApiError("認証エラーが発生しました。再ログインしてください。", response.status);
    }

    if (!response.ok) {
        throw new ApiError(`API request failed: ${response.status}`, response.status);
    }

    return response;
}

export async function apiFetchJson<T>(input: RequestInfo | URL, init: ApiFetchOptions = {}): Promise<T> {
    const response = await apiFetch(input, init);

    if (response.status === 204) {
        return undefined as T;
    }

    return await response.json() as T;
}
