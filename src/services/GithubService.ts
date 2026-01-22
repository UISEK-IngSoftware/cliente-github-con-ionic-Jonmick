import axios from "axios";
import { RepositoryItem } from "../interfaces/RepositoryItem";
import { UserInfo } from "../interfaces/UserInfo";
import AuthService from "./AuthService";

const GITHUB_API_URL = import.meta.env.VITE_GITHUB_API_URL;

const githubApi = axios.create({
    baseURL: GITHUB_API_URL,
});

githubApi.interceptors.request.use((config) => {
    const authHeader = AuthService.getAuthHeader();
    if (authHeader) {
        config.headers.Authorization = authHeader;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

/**
 * Obtener repositorios del usuario autenticado
 * @returns 
 */

export const fetchRepositories = async (): Promise<RepositoryItem[]> => {
    try {
        const response = await githubApi.get(`/user/repos`, {
            params: {
                per_page: 100,
                sort: "created",
                direction: "desc",
                affiliation: "owner",
            }
        });
        return response.data.map((repo: any) => ({
            name: repo.name,
            description: repo.description || null,
            imageUrl: repo.owner?.avatar_url || null,
            owner: repo.owner?.login || null,
            language: repo.language || null,
        }));
    } catch (error) {
        console.error("Error fetching repositories:", error);
        return [];
    }
};

export const createRepository = async (repo: RepositoryItem): Promise<void> => {
    try {
        const repoData = {
            name: repo.name,
            description: repo.description || "",
        };
        await githubApi.post(`/user/repos`, repoData);
    } catch (error: any) {
        console.error("Error creando repository:", error.response?.data?.message || error.message);
        throw error;
    }
};

export const updateRepository = async (owner: string, repoName: string, data: { name?: string; description?: string }): Promise<void> => {
    try {
        const updateData: any = {};
        if (data.name) updateData.name = data.name;
        if (data.description !== undefined) updateData.description = data.description;
        
        console.log('Actualizando repo:', owner, repoName, updateData);
        await githubApi.patch(`/repos/${owner}/${repoName}`, updateData);
    } catch (error: any) {
        console.error("Error editando repository:", error.response?.data?.message || error.message);
        throw error;
    }
};

export const deleteRepository = async (owner: string, repoName: string): Promise<void> => {
    try {
        await githubApi.delete(`/repos/${owner}/${repoName}`);
    } catch (error: any) {
        console.error("Error eliminando repository:", error.response?.data?.message || error.message);
        throw error;
    }
};

/**
 * Obtener información del usuario autenticado
 * @returns 
 */
export const getUserInfo = async (): Promise<UserInfo | null> => {
    try {
        const response = await githubApi.get(`/user`);
        return response.data;
    } catch (error) {
        console.error("Error fetching user info:", error);
        return null;
    }
}