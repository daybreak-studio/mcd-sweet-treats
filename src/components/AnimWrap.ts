export const AnimWrap={
  AnimParentA:{
    hidden: {
      transition: {}
    },
    visible: {
      transition: {
        staggerChildren: 0.3,
        delayChildren: .5,
      },
    },
  },
  bounceUpA:{
    //this is the animation that will be applied to the element
    hidden: {
      y:20,
      rotate:15,
      opacity:0,
      scale:0.8,
    },
    visible: {
      y:0,
      rotate:0,
      opacity:1,
      scale:1,
      transition: {
        duration: 0.3,
        type: "spring",
        bounce: 0.4,

      },
    },
  }

}
