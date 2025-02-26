import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { vi } from "vitest"
import ModelsPage from "@/app/dashboard/models/page"
import { api } from "@/lib/api"

// Mock API calls
vi.mock("@/lib/api", () => ({
  api: {
    models: {
      list: vi.fn(),
      deploy: vi.fn(),
    },
  },
}))

describe("ModelsPage", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("renders loading state initially", () => {
    render(<ModelsPage />)
    expect(screen.getAllByTestId("model-card-skeleton")).toHaveLength(6)
  })

  it("loads and displays models", async () => {
    const mockModels = [
      {
        id: "1",
        name: "Test Model",
        size: "7B",
        parameters: "7 billion",
        license: "MIT",
        commercial: true,
        metrics: {
          accuracy: 0.95,
          latency: "100ms",
          memory: "16GB",
        },
        domain: ["General"],
        description: "Test description",
        tier: "free",
      },
    ]

    api.models.list.mockResolvedValueOnce(mockModels)

    render(<ModelsPage />)

    await waitFor(() => {
      expect(screen.getByText("Test Model")).toBeInTheDocument()
    })
  })

  it("filters models by domain", async () => {
    const mockModels = [
      {
        id: "1",
        name: "Finance Model",
        domain: ["Finance"],
        // ... other properties
      },
      {
        id: "2",
        name: "Healthcare Model",
        domain: ["Healthcare"],
        // ... other properties
      },
    ]

    api.models.list.mockResolvedValueOnce(mockModels)

    render(<ModelsPage />)

    await waitFor(() => {
      expect(screen.getByText("Finance Model")).toBeInTheDocument()
    })

    fireEvent.click(screen.getByText("Finance"))

    expect(screen.getByText("Finance Model")).toBeInTheDocument()
    expect(screen.queryByText("Healthcare Model")).not.toBeInTheDocument()
  })

  it("handles deployment errors", async () => {
    api.models.deploy.mockRejectedValueOnce(new Error("Deployment failed"))

    render(<ModelsPage />)

    await waitFor(() => {
      fireEvent.click(screen.getByText("Deploy Model"))
    })

    expect(screen.getByText("Failed to deploy model")).toBeInTheDocument()
  })
})

