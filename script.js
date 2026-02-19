const cards = [...document.querySelectorAll(".project-card")];
const nodes = [...document.querySelectorAll(".graph-node")];
const filterButtons = [...document.querySelectorAll(".filter-btn")];

const setHighlight = (projectId) => {
  cards.forEach((card) => {
    card.classList.toggle("is-highlighted", card.dataset.project === projectId);
  });

  nodes.forEach((node) => {
    const isTarget = node.dataset.project === projectId;
    node.classList.toggle("is-active", isTarget);
    node.classList.toggle("is-muted", !isTarget);
  });
};

const clearHighlight = () => {
  cards.forEach((card) => card.classList.remove("is-highlighted"));
  nodes.forEach((node) => {
    node.classList.remove("is-active");
    node.classList.remove("is-muted");
  });
};

nodes.forEach((node) => {
  node.addEventListener("mouseenter", () => setHighlight(node.dataset.project));
  node.addEventListener("mouseleave", clearHighlight);
});

cards.forEach((card) => {
  card.addEventListener("mouseenter", () => setHighlight(card.dataset.project));
  card.addEventListener("mouseleave", clearHighlight);
});

const applyFilter = (filter) => {
  cards.forEach((card) => {
    if (filter === "all") {
      card.classList.remove("is-hidden");
      return;
    }

    const tags = card.dataset.tags.split(" ");
    card.classList.toggle("is-hidden", !tags.includes(filter));
  });
};

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("is-active"));
    button.classList.add("is-active");
    applyFilter(button.dataset.filter);
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll("[data-reveal]").forEach((block) => {
  revealObserver.observe(block);
});

const yearText = document.querySelector("#yearText");
if (yearText) {
  yearText.textContent = `Last updated ${new Date().getFullYear()}`;
}
