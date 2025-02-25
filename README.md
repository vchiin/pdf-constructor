# PDF Constructor

## Requirements

- Node 18.x or later
- PNPM

## How to run

Clone the repository and run `pnpm install`. After successful dependencies installation, start the application with `pnpm run dev`. You will be able to see the application port in your terminal (usually it is _localhost:5173_)

## TODO

- [x] Page Orientation
- [x] Block deselection on outside click
- [x] Test Iberio Backend integration (Tested on Object Loan Table)
- [ ] Add header/footer
- [ ] Fix table column resizing (it works only when the first column gets resized)
- [ ] Blocks Toolbar
- [ ] UI Updates

_Not sure how can be implemented_

- [ ] Automatic page split detection

## Definitions

_Block_ - entity of a PDF document (e. g. text, image, table)
_Element_ - visual representation of a _Block_ in a canvas
_Edge_ - drop area of an _Element_
