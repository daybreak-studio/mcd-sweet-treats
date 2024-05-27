export const AnimWrap={
  AnimParentA:{
    hidden: {
      transition: {}
    },
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: .5,
      },
    },
  },
  AnimParentB:{
    hidden: {
    },
    visible: {
      transition: {
        staggerChildren: 0.2,
        delayChildren: .25,
      },
    },
    
  
  },
  bounceUpA:{
    //this is the animation that will be applied to the element
    hidden: {
      y:20,
      rotate:12,
      opacity:0,
      scale:0.8,
    },
    visible: {
      y:0,
      rotate:0,
      opacity:1,
      scale:1,
      transition: {

      },
    },
  },
    bounceUpB:{
    //this is the animation that will be applied to the element
    hidden: {
      y:5,
      rotate:10,
      opacity:0,
      scale:0.8,
blur:10,
    },
    visible: {
      blur:0,
      y:0,
      rotate:0,
      opacity:1,
      scale:1,
      transition: {

      },
    },
  }

  }