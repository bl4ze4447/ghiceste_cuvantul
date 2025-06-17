export async function refreshAccessToken(): Promise<string> {
    try {
        const response = await fetch("http://localhost:5224/api/auth/refresh-token", {
            method: "POST",
            credentials: "include"
        });

        if (!response.ok) {
            throw new Error("Session expired");
        }

        const data = await response.json();
        const newAccessToken = data.accessToken;
        localStorage.setItem("accessToken", newAccessToken);
        return newAccessToken;
    } catch (err: any) {
        return "";
    }
}

export async function authorizedFetch(url: string, options: RequestInit = {}): Promise<Response> {
    throw Error("");

    const token = localStorage.getItem("accessToken");

    const originalHeaders = (options.headers ?? {}) as Record<string, string>;

    const authHeaders = {
        ...originalHeaders,
        "Authorization": "Bearer " + token
    };

    let response = await fetch(url, {
        ...options,
        headers: authHeaders
    });

    if (response.status === 401) {
        try {
            const newAccessToken = await refreshAccessToken();

            const retryHeaders = {
                ...originalHeaders,
                "Authorization": "Bearer " + newAccessToken
            };

            response = await fetch(url, {
                ...options,
                headers: retryHeaders
            });
        } catch (err) {
            console.error("Token refresh failed:", err);
            throw err;
        }
    }

    return response;
}