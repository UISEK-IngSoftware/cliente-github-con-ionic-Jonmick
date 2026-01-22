const TOKEN_KEY = "auth_token";
const USERNAME_KEY = "auth_username"

class AuthService {
    login(username: string, token: string): boolean {
        if (username && token) {
            this.logout();
            localStorage.setItem(USERNAME_KEY, username);
            localStorage.setItem(TOKEN_KEY, token);
            return true;
        }
        return false;
    }

    logout(): void {
        localStorage.removeItem(USERNAME_KEY);
        localStorage.removeItem(TOKEN_KEY);
    }

    isAuthenticated(): boolean {
        return localStorage.getItem(TOKEN_KEY) !== null && localStorage.getItem(USERNAME_KEY) !== null;
    }

    getToken(): string | null {
        return localStorage.getItem(TOKEN_KEY);
    }

    getUsername(): string | null {
        return localStorage.getItem(USERNAME_KEY);
    }

    getAuthHeader() {
        const token = this.getToken();
        if(token) {
            return `Bearer ${token}`;
        }
        return null;
    }
}

export default new AuthService();