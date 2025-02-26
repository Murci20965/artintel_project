import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { vi } from "vitest"
import DataPage from "@/app/dashboard/data/page"
import { api } from "@/lib/api"

// Mock API calls
vi.mock("@/lib/api", () => ({
  api: {
    datasets: {
      list: vi.fn(),
      delete: vi.fn(),
    },
  },
}))

describe("DataPage", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("renders loading state initially", () => {
    render(<DataPage />)
    expect(screen.getAllByTestId("dataset-card-skeleton")).toHaveLength(3)
  })

  it("loads and displays datasets", async () => {
    const mockDatasets = [
      {
        id: "1",
        name: "Test Dataset",
        type: "CSV",
        size: "1GB",
        records: 1000,
        tags: ["Test"],
        lastModified: "2024-02-23",
        versions: 1,
      },
    ]

    api.datasets.list.mockResolvedValueOnce(mockDatasets)

    render(<DataPage />)

    await waitFor(() => {
      expect(screen.getByText("Test Dataset")).toBeInTheDocument()
    })
  })

  it("handles dataset deletion", async () => {
    const mockDatasets = [
      {
        id: "1",
        name: "Test Dataset",
        type: "CSV",
        size: "1GB",
        records: 1000,
        tags: ["Test"],
        lastModified: "2024-02-23",
        versions: 1,
      },
    ]

    api.datasets.list.mockResolvedValueOnce(mockDatasets)
    api.datasets.delete.mockResolvedValueOnce({ success: true })

    render(<DataPage />)

    await waitFor(() => {
      const deleteButton = screen.getByLabelText("Delete dataset")
      fireEvent.click(deleteButton)
    })

    expect(api.datasets.delete).toHaveBeenCalledWith("1")
    await waitFor(() => {
      expect(screen.getByText("Dataset deleted successfully")).toBeInTheDocument()
    })
  })

  it("toggles PII redaction", () => {
    render(<DataPage />)
    \
    const
    switch = screen.getByRole("switch", { name: /PII Redaction/i }
    )
    fireEvent.click(
    switch)

    expect(switch).not.toBeChecked()
  })
})

