export const createScrollObserver = (
  element: HTMLElement,
  onIntersect: () => void,
  threshold = 0.1,
  rootMargin = "0px",
) => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          onIntersect()
          observer.unobserve(entry.target)
        }
      })
    },
    {
      threshold,
      rootMargin,
    },
  )

  observer.observe(element)
  return observer
}

export const observeElements = (
  elements: NodeListOf<Element> | Element[],
  className: string,
  threshold = 0.1,
  rootMargin = "0px",
) => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(className)
          observer.unobserve(entry.target)
        }
      })
    },
    {
      threshold,
      rootMargin,
    },
  )

  elements.forEach((element) => observer.observe(element))
  return observer
}

export const createScrollTimeline = (
  element: HTMLElement,
  onProgress: (progress: number) => void,
  threshold = 0.1,
  rootMargin = "0px",
) => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const progress = entry.intersectionRatio
          onProgress(progress)
        }
      })
    },
    {
      threshold: Array.from({ length: 100 }, (_, i) => i / 100),
      rootMargin,
    },
  )

  observer.observe(element)
  return observer
}

