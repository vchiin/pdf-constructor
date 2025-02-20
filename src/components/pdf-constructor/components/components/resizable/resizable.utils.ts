type CalculateWidthsProps = {
  previousWidths: number[];
  delta: number;
  id: number;
  itemsAmount: number;
  calculateCallback: (prev: number, delta: number) => number;
  minWidth?: number;
};

export const calculateWidths = ({
  id,
  delta,
  itemsAmount,
  previousWidths,
  calculateCallback,
  minWidth = 0,
}: CalculateWidthsProps) => {
  const newWidths = [...previousWidths];

  // Don't allow resizing the last element
  if (id >= itemsAmount - 1) {
    return previousWidths;
  }

  // Calculate current element's new size
  const currentWidth = calculateCallback(previousWidths[id], delta);

  // Calculate next element's new size
  const nextElementIndex = id + 1;
  const nextElementNewSize =
    previousWidths[nextElementIndex] - (currentWidth - previousWidths[id]);

  // Check if the new sizes would violate min width constraints
  if (currentWidth < minWidth || nextElementNewSize < minWidth) {
    return previousWidths;
  }

  // Update only current and next element
  newWidths[id] = currentWidth;
  newWidths[nextElementIndex] = nextElementNewSize;

  return newWidths;
};
