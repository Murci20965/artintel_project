import type React from "react"
import { render } from "@testing-library/react"
import { ThemeProvider } from "@/components/ThemeProvider"

const customRender = (ui: React.ReactElement, options = {}) =>
  render(ui, {
    wrapper: ({ children }) => (
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
    ),
    ...options,
  })

export * from "@testing-library/react"
export { customRender as render }

