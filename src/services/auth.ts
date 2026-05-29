
const LOCALSTORAGE_KEY_TOKEN = "token";

declare const epochSecondsBrand: unique symbol;
type EpochSeconds = number & { readonly [epochSecondsBrand]: "EpochSeconds" }

function nowEpochSeconds() {
    return Math.floor(Date.now() / 1000) as EpochSeconds;
}


export async function requestEmailVerification(email: string): Promise<void> {
    const params = new URLSearchParams();
    params.append("email", email);

    const response = await fetch(
        "http://127.0.0.1:8000/register-request",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        }
    );

    if (!response.ok) {
        throw new Error("メール認証リクエストに失敗しました");
    }
}


export async function requestRegisterComplete(token: string, publicUserId: string, password: string): Promise<void> {
    const response = await fetch(
        "http://127.0.0.1:8000/register-complete-request",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                token,
                public_user_id: publicUserId,
                password
            }),
        }
    );

    if (!response.ok) {
        throw new Error("登録完了リクエストに失敗しました");
    }
}

export type JwtPayload = {
    sub: string,
    exp: number,
}

function isJwtPayload(value: unknown): value is JwtPayload {
    if (typeof value !== "object" || value === null) {
        return false;
    }

    const payload = value as Record<string, unknown>;
    return typeof payload.sub === "string"
        && typeof payload.exp === "number"
        && Number.isFinite(payload.exp);
}


export type Jwt = string;

function isValidJwt(token: string): token is Jwt {
    try {
        const payload = parseJwtPayload(token);
        return isJwtPayload(payload);
    } catch {
        return false;
    }
}



export function setToken(token: string): void {
    if (!isValidJwt(token)) {
        throw new Error("不正なJWTトークンの形式です");
    }

    localStorage.setItem(LOCALSTORAGE_KEY_TOKEN, token);
}

export function getToken(): string {
    const token = localStorage.getItem(LOCALSTORAGE_KEY_TOKEN);
    if (token === null
        || !isValidJwt(token)
    ) {
        throw new Error("有効なアクセストークンが取得されていません");
    }

    return token;
}

export function clearToken(): void {
    localStorage.removeItem(LOCALSTORAGE_KEY_TOKEN);
}

function decodeBase64Url(base64url: string): unknown {
    const base64 = base64url
        .replace(/-/g, "+")
        .replace(/_/g, "/")
        + "=".repeat((4 - (base64url.length % 4)) % 4);

    const json = decodeURIComponent(
        atob(base64)
            .split("")
            .map(c => "%" + c.charCodeAt(0).toString(16).padStart(2, "0"))
            .join("")
    );

    return JSON.parse(json);
}

function parseJwtPayload(token: string): JwtPayload {
    const parts = token.split(".");
    if (parts.length !== 3) {
        throw new Error("不正なJWTトークンの形式です");
    }

    const [header, payload, signature] = parts as [string, string, string];
    const parsedPayload = decodeBase64Url(payload);
    if (!isJwtPayload(parsedPayload)) {
        throw new Error("不正なJWTトークンの形式です");
    }

    return parsedPayload;

}

export function isTokenExpired(token: string, skewSeconds = 30) {
    const payload = parseJwtPayload(token);
    const now = nowEpochSeconds();

    if (!payload) {
        return true;
    }

    return ((payload.exp as EpochSeconds) <= now + skewSeconds);
}

export function isLoggedIn() {
    try {
        const token = getToken();
        return !isTokenExpired(token);
    } catch {
        return false;
    }
}



/**
 * サーバーにログイン認証リクエストを行い、成功したらトークンを保管する
 * @param username ユーザー名
 * @param password パスワード
 * @returns ログインに成功したか否か
 */
export async function tryLogin(username: string, password: string): Promise<boolean> {
    const params = new URLSearchParams();
    params.append("username", username);
    params.append("password", password);

    const response = await fetch(
        "http://127.0.0.1:8000/token",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: params.toString(),
        }
    );

    if (!response.ok) {
        return false;
    }

    try {
        const data = await response.json();
        const accessToken: string = data.access_token;
        setToken(accessToken);
        return true;
    } catch {
        return false;
    }
}

export function logout() {
    clearToken();
}