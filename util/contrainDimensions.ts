export function constrainDimensions(
  originalWidth: number,
  originalHeight: number,
  maxWidth: number,
  maxHeight?: number,
): { width: number; height: number } {
  // Calculate aspect ratio
  const aspectRatio = originalWidth / originalHeight;

  let constrainedWidth = maxWidth;
  let constrainedHeight = maxWidth / aspectRatio;

  // Check against maxHeight if it is provided
  if (maxHeight !== undefined && constrainedHeight > maxHeight) {
    constrainedHeight = maxHeight;
    constrainedWidth = maxHeight * aspectRatio;
  }

  return { width: constrainedWidth, height: constrainedHeight };
}
