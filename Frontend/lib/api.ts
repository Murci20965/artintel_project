import { toast } from "sonner"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.artintel.ai"

export class APIError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message)
    this.name = "APIError"
  }
}

async function handleResponse(response: Response) {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new APIError(response.status, error.message || "An error occurred")
  }
  return response.json()
}

export async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    })
    return await handleResponse(response)
  } catch (error) {
    if (error instanceof APIError) {
      toast.error(error.message)
    } else {
      toast.error("Network error occurred")
    }
    throw error
  }
}

export const api = {
  // Model endpoints
  models: {
    list: () => fetchWithAuth("/models"),
    get: (id: string) => fetchWithAuth(`/models/${id}`),
    deploy: (id: string, config: any) =>
      fetchWithAuth(`/models/${id}/deploy`, {
        method: "POST",
        body: JSON.stringify(config),
      }),
    delete: (id: string) =>
      fetchWithAuth(`/models/${id}`, {
        method: "DELETE",
      }),
  },

  // Dataset endpoints
  datasets: {
    list: () => fetchWithAuth("/datasets"),
    upload: (file: File, config: any) => {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("config", JSON.stringify(config))
      return fetchWithAuth("/datasets/upload", {
        method: "POST",
        body: formData,
      })
    },
    delete: (id: string) =>
      fetchWithAuth(`/datasets/${id}`, {
        method: "DELETE",
      }),
  },

  // Training endpoints
  training: {
    start: (config: any) =>
      fetchWithAuth("/training", {
        method: "POST",
        body: JSON.stringify(config),
      }),
    status: (id: string) => fetchWithAuth(`/training/${id}/status`),
    stop: (id: string) =>
      fetchWithAuth(`/training/${id}/stop`, {
        method: "POST",
      }),
  },

  // Deployment endpoints
  deployments: {
    list: () => fetchWithAuth("/deployments"),
    status: (id: string) => fetchWithAuth(`/deployments/${id}/status`),
    logs: (id: string) => fetchWithAuth(`/deployments/${id}/logs`),
    delete: (id: string) =>
      fetchWithAuth(`/deployments/${id}`, {
        method: "DELETE",
      }),
  },

  // User management
  users: {
    profile: () => fetchWithAuth("/users/profile"),
    updateProfile: (data: any) =>
      fetchWithAuth("/users/profile", {
        method: "PUT",
        body: JSON.stringify(data),
      }),
  },

  // Team management
  team: {
    list: () => fetchWithAuth("/team/members"),
    invite: (email: string, role: string) =>
      fetchWithAuth("/team/invite", {
        method: "POST",
        body: JSON.stringify({ email, role }),
      }),
    remove: (userId: string) =>
      fetchWithAuth(`/team/members/${userId}`, {
        method: "DELETE",
      }),
  },

  // API keys
  apiKeys: {
    list: () => fetchWithAuth("/api-keys"),
    create: (name: string) =>
      fetchWithAuth("/api-keys", {
        method: "POST",
        body: JSON.stringify({ name }),
      }),
    revoke: (id: string) =>
      fetchWithAuth(`/api-keys/${id}`, {
        method: "DELETE",
      }),
  },
}

