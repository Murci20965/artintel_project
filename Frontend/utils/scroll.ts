export const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    const offset = element.offsetTop - 80 // Adjust for navbar height
    window.scrollTo({
      top: offset,
      behavior: "smooth",
    })
  }
}

