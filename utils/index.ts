export const handleAnimationDelay = (index: number, width: number): number => {
  if (width >= 1536) {
    if (index < 8) return 1.2 + index * 0.2
    else return index * 0.2
  } else if (width >= 1280) {
    if (index < 3) return 1.2 + index * 0.2
    else return index * 0.2
  } else if (width >= 768) {
    if (index < 4) return 1.2 + index * 0.2
    else return index * 0.2
  } else {
    if (index < 1) return 1.2 + index * 0.2
    else return index * 0.2
  }
}
