export const variantsTopFadeIn = {
  visible: {
    opacity: 1,
    y: 0
  },
  hidden: {
    opacity: 0,
    y: -50
  }
};

export const variantsZoomIn = {
  visible: {
    opacity: 1,
    scale: 1
  },
  hidden: {
    opacity: 0,
    scale: 0
  }
};

export const variantsMoveFromLeft = {
  visible: {
    x: -5000,
    display: 'block'
  },
  hidden: {
    x: 0,
    display: 'none'
  }
};

export const variantsMoveFromRight = {
  visible: {
    x: 5000,
    display: 'block'
  },
  hidden: {
    x: 0,
    display: 'none'
  }
};