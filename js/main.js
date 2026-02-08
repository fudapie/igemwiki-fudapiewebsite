document.addEventListener("DOMContentLoaded", () => {
  const ring = document.getElementById("ring-gallery");
  const cards = ring.getElementsByClassName("ring-card");
  const totalCards = cards.length;

  const radius = 700;

  for (let i = 0; i < totalCards; i++) {
    const card = cards[i];

    // 计算角度
    const angle = (360 / totalCards) * i;

    card.style.transform = `rotateY(${angle}deg) translateZ(-${radius}px)`;
  }

  // 1. 门开闭逻辑

  const wallTrigger = document.getElementById("wall-trigger");
  const door = document.getElementById("rotating-door");

  let isScrolling = false;

  function handleDoorScroll() {
    if (!wallTrigger || !door) return;

    // 获取墙体相对于视口的位置
    const rect = wallTrigger.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    // 定义触发区域:
    // 上界 (Top 1/3): viewportHeight * 0.33
    // 下界 (Bottom 1/3): viewportHeight * 0.66
    const topLimit = viewportHeight * 0.33;
    const bottomLimit = viewportHeight * 0.66;

    // 门的当前位置中心点
    const wallCenter = rect.top + rect.height / 2;

    let rotation = 0;

    // 逻辑：
    // 1. 如果墙在屏幕下方 (未进入视口)，门关闭 (0deg)
    // 2. 如果墙在 Bottom 1/3 到 Top 1/3 之间，门完全打开 (30deg)

    if (wallCenter > bottomLimit) {
      // 假设视口底部到 bottomLimit 之间是 "打开阶段"
      const enterDistance = viewportHeight - bottomLimit;
      const currentProgress = viewportHeight - wallCenter;

      // 归一化进度 0 -> 1
      let progress = Math.min(Math.max(currentProgress / enterDistance, 0), 1);
    } else {
      // 在中间区域，保持最大开启
      rotation = 30;
    }

    // 应用旋转
    door.style.transform = `rotate(-${rotation}deg)`;

    isScrolling = false;
  }

  // 滚动监听器
  window.addEventListener("scroll", () => {
    if (!isScrolling) {
      window.requestAnimationFrame(handleDoorScroll);
      isScrolling = true;
    }
  });

  // 2. 内容区域渐入效果
  const contentObserverOptions = {
    threshold: 0.2, // 元素进入20%时触发
    rootMargin: "0px",
  };

  const contentObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // 只触发一次
      }
    });
  }, contentObserverOptions);

  const contentBlocks = document.querySelectorAll(".observe-me");
  contentBlocks.forEach((block) => {
    contentObserver.observe(block);
  });
});

//album//
document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("intro-overlay");
  const line = document.getElementById("intro-line");
  const content = document.getElementById("album-content");

  // 1. 开场动画逻辑
  setTimeout(() => {
    line.style.transition = "width 0.5s ease, opacity 0.2s 0.5s";
    line.style.width = "100%";

    setTimeout(() => {
      line.style.opacity = "0";
      overlay.style.transition = "opacity 1s";
      overlay.style.opacity = "0";

      // 显示相册内容
      content.style.opacity = "1";

      setTimeout(() => {
        overlay.remove();
      }, 1000);
    }, 600);
  }, 2000);

  // 2. 点击放大逻辑
  const imgs = document.querySelectorAll(".album-img");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");

  imgs.forEach((img) => {
    img.addEventListener("click", () => {
      lightboxImg.src = img.src;
      lightbox.style.display = "flex";
    });
  });
});
