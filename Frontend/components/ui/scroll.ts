export const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    const offset = element.offsetTop - 100
    window.scrollTo({
      top: offset,
      behavior: "smooth",
    })
  }
}

