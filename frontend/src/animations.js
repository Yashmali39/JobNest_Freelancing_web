export const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } }
  };
  
  export const slideIn = (direction) => {
    return {
      hidden: { opacity: 0, x: direction === "left" ? -100 : 100 },
      visible: { opacity: 1, x: 0, transition: { duration: 1 } }
    };
  };
  
  export const zoomIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } }
  };
  