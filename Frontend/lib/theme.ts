export const lightTheme = {
  background: "bg-white",
  text: "text-gray-900",
  primary: "text-blue-600",
  secondary: "text-gray-600",
  accent: "text-purple-600",
  card: "bg-white",
  cardHover: "hover:bg-gray-50",
  border: "border-gray-200",
  input: "bg-white border-gray-300",
  button: "bg-blue-600 hover:bg-blue-700 text-white",
  navbar: "bg-white/80 backdrop-blur-xl border-gray-200",
  footer: "bg-gray-50",
}

export const darkTheme = {
  background: "bg-gray-900",
  text: "text-gray-50",
  primary: "text-blue-400",
  secondary: "text-gray-400",
  accent: "text-purple-400",
  card: "bg-gray-800",
  cardHover: "hover:bg-gray-700",
  border: "border-gray-700",
  input: "bg-gray-800 border-gray-600 text-white",
  button: "bg-blue-500 hover:bg-blue-600 text-white",
  navbar: "bg-gray-900/80 backdrop-blur-xl border-gray-800",
  footer: "bg-gray-800",
}

export const theme = {
  light: lightTheme,
  dark: darkTheme,
}

export type ThemeType = typeof lightTheme

