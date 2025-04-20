// horizontalScroll
const horizontalScroll = () => {
    const triggerSection = document.querySelector(".js-scroll-trigger");
    const listContainer = document.querySelector(".js-list-container");
    const listElement = document.querySelector(".js-list-element");

    const scrollValue = listElement.clientWidth - listContainer.clientWidth;

    gsap.to(listElement, {
        x: -scrollValue,
        ease: "none",
        scrollTrigger: {
        trigger: triggerSection,
        start: "top top",
        end: `+=${scrollValue}`,
        scrub: true,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        },
    });
};

horizontalScroll();