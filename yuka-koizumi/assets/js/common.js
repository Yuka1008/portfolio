// -------------------------
// ① 定数定義・グローバル変数
// -------------------------

const mediaQuery = window.matchMedia("(min-width: 768px)");
const targetVisibleModifier = "is-show";
let observer = null;
const footer = document.querySelector(".js-footer");

// -------------------------
// ② IntersectionObserver によるアニメーション制御
// -------------------------

const setupObserver = () => {
  const rootMargin = mediaQuery.matches ? "0px 0px -10%" : "0px 0px 0px";
  const options = { rootMargin };
  const targets = document.querySelectorAll(".js-observe-target");

  if (observer) observer.disconnect();

  observer = new IntersectionObserver((entries, observerInstance) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add(targetVisibleModifier);
        observerInstance.unobserve(entry.target);
      }
    });
  }, options);

  targets.forEach((target) => observer.observe(target));
};

// -------------------------
// ②.1 フッターのパララックス制御
// -------------------------

const footerParallax = () => {
  const parallaxTrigger = document.querySelector(".js-parallax-trigger");
  const others = document.querySelector(".js-others");

  if (!parallaxTrigger || !footer) return;

  let scrollerEnd = mediaQuery.matches ? "bottom 30%" : "bottom center";
  let Y_PERCENT_VALUE = others
    ? mediaQuery.matches ? -30 : -5
    : -55;

  gsap.set(footer, {
    opacity: 0.5,
    yPercent: Y_PERCENT_VALUE,
  });

  gsap.to(footer, {
    opacity: 1,
    yPercent: 0,
    scrollTrigger: {
      trigger: parallaxTrigger,
      start: "bottom bottom",
      end: scrollerEnd,
      scrub: true,
    },
  });
};

// -------------------------
// ③ ローディング画面 + 初期処理
// -------------------------

$(window).on("load", () => {
  if (!sessionStorage.getItem("loadingDisplayed")) {
    setTimeout(() => {
      $("#loading").fadeOut(1000, () => {
        setupObserver();
        footerParallax();
      });
    }, 8000);
    sessionStorage.setItem("loadingDisplayed", "true");
  } else {
    $("#loading").hide();
    setupObserver();
    footerParallax();
  }
});

// -------------------------
// ④ メディアクエリ変更時の再登録
// -------------------------

mediaQuery.addEventListener("change", () => {
  setupObserver();
  footerParallax();
});

// -------------------------
// ⑤ ドロワーメニュー
// -------------------------

$(".header__burger-button").on("click", function () {
  $(".js-drawer-open").fadeToggle(300);
  $(".header__burger-text--menu").toggleClass("menu");
  $(".header__burger-text--close").toggleClass("close");
  $(".header__nav").toggleClass("on");
  $("body").toggleClass("is-fixed");
});

$(".header__nav a").on("click", function () {
  setTimeout(() => {
    $(".js-drawer-open").fadeOut(300);
    $(".header__burger-text--menu").removeClass("menu");
    $(".header__burger-text--close").removeClass("close");
    $(".header__nav").removeClass("on");
    $("body").removeClass("is-fixed");
  }, 200);
});

// -------------------------
// ⑥ トップに戻るボタン表示
// -------------------------

const topBtn = $(".header__title");
topBtn.hide();

$(window).on("scroll", () => {
  $(window).scrollTop() > 70 ? topBtn.fadeIn() : topBtn.fadeOut();
});

// -------------------------
// ⑦ カスタムカーソル（Worksセクション用）
// -------------------------

const worksList = document.querySelector(".js-works-list");

if (worksList) {
  const cursor = document.querySelector(".js-cursor-element");
  const cursorWidth = cursor.clientWidth;
  const cursorHeight = cursor.clientHeight;
  const cursorPos = { x: 0, y: 0 };

  const onMouseMove = (e) => {
    cursorPos.x = e.clientX;
    cursorPos.y = e.clientY;

    gsap.to(cursor, {
      x: cursorPos.x - cursorWidth / 2,
      y: cursorPos.y - cursorHeight / 2,
      duration: 0.6,
      ease: "power2.out",
    });
  };

  const worksItems = document.querySelectorAll(".js-works-item");

  worksItems.forEach((item) => {
    item.addEventListener("mouseenter", (e) => {
      onMouseMove(e);
      gsap.to(cursor, { opacity: 1, scale: 1.0, duration: 0.3 });
    });
    item.addEventListener("mouseleave", () => {
      gsap.to(cursor, { opacity: 0, scale: 0, duration: 0.3 });
    });
  });

  const intersection = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      entry.isIntersecting
        ? window.addEventListener("mousemove", onMouseMove)
        : window.removeEventListener("mousemove", onMouseMove);
    });
  });

  intersection.observe(worksList);
}
