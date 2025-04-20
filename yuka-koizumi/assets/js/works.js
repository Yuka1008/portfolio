// scrollUpButton
const scrollUpButton = () => {
  const button = document.querySelector(".js-button");
  const translatedTrigger = document.querySelector(".js-button-trigger");

  ScrollTrigger.create({
    trigger: translatedTrigger,
    start: "top bottom",
    end: "bottom bottom",
    toggleClass: {
      targets: button,
      className: "is-scroll",
    },
  });
};

scrollUpButton();


// imageParallax
const targetWrapper = document.querySelector(".js-parallax");

if (targetWrapper !== null) {
  const imageParallax = () => {
    const targetImage = targetWrapper.querySelector("img");
    let Y_PARAM;

    if (mediaQuery.matches) {
      Y_PARAM = -100;
    } else {
      Y_PARAM = -30;
    }

    gsap.fromTo(
      targetImage,
      { y: 0 },
      {
        y: Y_PARAM,
        ease: "none",
        scrollTrigger: {
          trigger: targetWrapper,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      }
    );
  };

  imageParallax();
}