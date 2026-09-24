/** A labelme export: rectangles in the pixel space of the image they were drawn on. */
export interface Labelme {
  imageWidth: number;
  imageHeight: number;
  shapes: { label: string; shape_type: string; points: number[][] }[];
}

export interface Box {
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

/** The export holds a few stray clicks: zero-area and single-point shapes. */
export function labelmeBoxes({ shapes }: Labelme): Box[] {
  return shapes.flatMap(({ label, shape_type, points }) => {
    if (shape_type !== 'rectangle' || points.length !== 2) return [];
    const [[x1, y1], [x2, y2]] = points;
    const width = Math.abs(x2 - x1);
    const height = Math.abs(y2 - y1);
    return width && height
      ? [{ label, x: Math.min(x1, x2), y: Math.min(y1, y2), width, height }]
      : [];
  });
}
