const gallery = document.getElementById("galleryGrid");
const fileInput = document.getElementById("fileInput");
const uploadBtn = document.getElementById("uploadBtn");
const dropZone = document.getElementById("dropZone");
const countLabel = document.getElementById("countLabel");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const closeLightbox = document.getElementById("closeLightbox");
const exploreBtn = document.getElementById("exploreBtn");

let items = [
  {src:"https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1000&q=85", category:"gaming", title:"Gaming atmosphere"},
  {src:"https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=85", category:"nature", title:"Open world"},
  {src:"https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1000&q=85", category:"photography", title:"Night lights"},
  {src:"https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=85", category:"gaming", title:"Digital world"},
  {src:"https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1000&q=85", category:"nature", title:"Wild landscape"},
  {src:"https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1000&q=85", category:"nature", title:"Forest"},
  {src:"https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1000&q=85", category:"photography", title:"Mountain view"},
  {src:"https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=1000&q=85", category:"gaming", title:"Future city"}
];

let activeFilter = "all";

function render() {
  gallery.innerHTML = "";
  const visible = items.filter(x => activeFilter === "all" || x.category === activeFilter);
  visible.forEach(item => {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <img src="${item.src}" alt="${item.title}" loading="lazy">
      <div class="meta"><strong>${item.title}</strong><span>${item.category}</span></div>
    `;
    card.addEventListener("click", () => {
      lightboxImg.src = item.src;
      lightbox.classList.add("open");
      lightbox.setAttribute("aria-hidden", "false");
    });
    gallery.appendChild(card);
  });
  countLabel.textContent = `${visible.length} image${visible.length === 1 ? "" : "s"}`;
}

document.querySelectorAll(".nav-link").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".nav-link").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    activeFilter = btn.dataset.filter;
    render();
  });
});

uploadBtn.addEventListener("click", () => fileInput.click());
dropZone.addEventListener("click", () => fileInput.click());

fileInput.addEventListener("change", e => addFiles(e.target.files));

["dragenter","dragover"].forEach(type => dropZone.addEventListener(type, e => {
  e.preventDefault(); dropZone.classList.add("drag");
}));
["dragleave","drop"].forEach(type => dropZone.addEventListener(type, e => {
  e.preventDefault(); dropZone.classList.remove("drag");
}));
dropZone.addEventListener("drop", e => addFiles(e.dataTransfer.files));

function addFiles(files) {
  [...files].filter(f => f.type.startsWith("image/")).forEach(file => {
    items.unshift({
      src: URL.createObjectURL(file),
      category: "photography",
      title: file.name.replace(/\.[^/.]+$/, "")
    });
  });
  activeFilter = "all";
  document.querySelectorAll(".nav-link").forEach(b => b.classList.toggle("active", b.dataset.filter === "all"));
  render();
}

exploreBtn.addEventListener("click", () => document.getElementById("gallery").scrollIntoView({behavior:"smooth"}));
closeLightbox.addEventListener("click", () => lightbox.classList.remove("open"));
lightbox.addEventListener("click", e => { if (e.target === lightbox) lightbox.classList.remove("open"); });
document.addEventListener("keydown", e => { if (e.key === "Escape") lightbox.classList.remove("open"); });

render();
