const $ = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));

const megaContent = {
  shop: {
    leftCols: [
      {
        title: "Shop Christmas Coffee",
        items: [
          { id: 'current', label: 'Shop Christmas' },
          { id: 'single', label: 'Single Origin Subscription' },
          { id: 'capsules', label: 'Capsules' },
          { id: 'gift', label: 'Gift Card' }
        ]
      }
    ],
    right: {
      current: [
        { img: 'header-shop-1.png', title: 'Cadence Espresso', subtitle: 'Autumn Edition' },
        { img: 'header-shop-2.png', title: 'E1 Project Espresso', subtitle: 'Finca Buena Vista' }
      ]
    }
  },

  coffee: {
    leftCols: [
      {
        title: "Current Coffees",
        items: [
          { id: 'all', label: 'All Coffee' },
          { id: 'house', label: 'House Coffees' },
          { id: 'single', label: 'Single Origin' },
          { id: 'caps', label: 'Clifton Capsules' },
          { id: 'unparalleled', label: 'Unparalleled Series' }
        ]
      },
      {
        title: "Coffees Type",
        items: [
          { id: 'whole', label: 'Wholebean' },
          { id: 'filter', label: 'Filter grind' },
          { id: 'caf', label: 'Cafetiere grind' }
        ]
      }
    ],
    right: {
      all: [
        { img: 'header-coffe-1.png', title: 'Cadence Espresso', subtitle: 'Autumn Edition' },
        { img: 'header-coffee-2.png', title: 'El Project Espresso', subtitle: 'Finca Buena Vista' }
      ]
    }
  },

  subs: {
    leftCols: [
      {
        title: "Coffee Subscriptions",
        items: [
          { id: 'monthly', label: 'Single Origin Subscription' },
          { id: 'weekly', label: 'House Coffee Subscription' },
           { id: 'monthly', label: 'Single Origin Subscription Videos' },
            { id: 'monthly', label: 'Log in' }
        ]
      },
      {
         title: "Coffees Type",
        items: [
          { id: 'whole', label: 'Wholebean' },
          { id: 'filter', label: 'Filter grind' },
          { id: 'caf', label: 'Cafetiere grind' }
        ]
      }
    ],
    right: {
      monthly: [
        { img: 'header-sub1-.png', title: 'Monthly Box', subtitle: 'Fresh Roast' },
        { img: 'header-sub-2.png', title: 'Roaster Pick', subtitle: 'Variety Pack' }
      ]
    }
  },

  acc: {
    leftCols: [
      {
        title: "All Equipment",
        items: [
          { id: 'mugs', label: 'Machines' },
          { id: 'cups', label: 'Brewers' },
          { id: 'cups', label: 'Grinders' }
        ]
      },
      {
        title: "Merchandise",
        items: [
          { id: 'tools', label: 'Kettles' },
          { id: 'filters', label: 'Scales' },
          { id: 'tools', label: 'Tools' }
        ]
      },
         {
        title: "BrandsAcaia",
        items: [
          { id: 'mugs', label: 'Aeropress' },
          { id: 'cups', label: 'Earl Of East' },
          { id: 'tools', label: 'Fellow' },
          { id: 'tools', label: 'Hario' },
          { id: 'tools', label: 'La Marzocco' },
          { id: 'tools', label: 'Miir' },
          { id: 'tools', label: 'Pesado' },
          { id: 'tools', label: 'Rural Kind' },
          { id: 'tools', label: 'Wilfa' }
        ]
      }
    ],
    right: {
      mugs: [
        { img: 'header-acces-1.png', title: 'Ceramic Mug', subtitle: 'Classic' },
        { img: 'header-acces-2.png', title: 'Travel Mug', subtitle: 'Portable' }
      ]
    }
  }
};

const topLinks = $$('.top-link');
const mega = $('#mega-menu');
const megaLeft = $('#mega-left');
const megaRight = $('#mega-right');

let activeTop = null;
let activeLeftKey = null;

function openMega(menuKey) {
  const data = megaContent[menuKey];
  if (!data) return;

 
  megaLeft.innerHTML = data.leftCols.map(col => {
    return `
      <div class="left-col">
        <h4>${col.title}</h4>
        ${col.items.map(item => `
          <div class="left-item" data-id="${item.id}">${item.label}</div>
        `).join('')}
      </div>
    `;
  }).join('');

 
  const defaultKey = data.leftCols[0].items[0].id;


  renderMegaRight(menuKey, defaultKey);


  megaLeft.querySelectorAll('.left-item').forEach(el => {
    el.style.cursor = "default"; 
  });

 
  mega.classList.remove('hidden');
  mega.classList.add('show');
}

function renderMegaRight(menuKey, leftId) {
  const block =
    megaContent[menuKey].right[leftId] ||
    megaContent[menuKey].right.current ||
    [];
  megaRight.innerHTML = block.map(it => {
    return `
      <div class="mega-product">
        <img src="${it.img}" alt="">
        <h5>${it.title}</h5>
        ${it.subtitle ? `<p>${it.subtitle}</p>` : ''}
      </div>
    `;
  }).join('');
}


topLinks.forEach(t => {
  t.addEventListener('click', e => {
    e.preventDefault();
    const key = t.dataset.menu;

    if (activeTop === key) {
      activeTop = null;
      mega.classList.remove('show');
      mega.classList.add('hidden');
      t.querySelector('.arrow').style.transform = '';
      return;
    }

   
    topLinks.forEach(x => x.querySelector('.arrow').style.transform = '');
    t.querySelector('.arrow').style.transform = 'rotate(180deg)';

    activeTop = key;
    openMega(key);
  });
});


document.addEventListener('click', (ev) => {
  const target = ev.target;
  if (!target.closest('.nav-container') && !target.closest('.mega-menu')) {
    topLinks.forEach(x => x.querySelector('.arrow').style.transform = '');
    mega.classList.remove('show');
    mega.classList.add('hidden');
    activeTop = null;
  }
});

const cartBtn = document.getElementById('cart-btn');
const cartSidebar = document.getElementById('cart-sidebar');
const closeCart = document.getElementById('close-cart');
const overlay = document.getElementById('overlay');

cartBtn.addEventListener('click', () => {
    cartSidebar.classList.add('active');
    overlay.classList.add('active');
});

closeCart.addEventListener('click', () => {
    cartSidebar.classList.remove('active');
    overlay.classList.remove('active');
});

overlay.addEventListener('click', () => {
    cartSidebar.classList.remove('active');
    overlay.classList.remove('active');
});
document.addEventListener("DOMContentLoaded", () => {
  const searchBtn = document.getElementById("search-btn");
  const searchBar = document.getElementById("search-bar");
  const searchClose = document.getElementById("search-close");

  searchBtn.addEventListener("click", () => {
    searchBar.classList.add("show");
  });

  searchClose.addEventListener("click", () => {
    searchBar.classList.remove("show");
  });
});


const prevBtn = document.getElementById('collection-prev');
const nextBtn = document.getElementById('collection-next');
const dots = document.querySelectorAll('.dots .dot');

let currentIndex = 0; 
const totalSlides = dots.length;

function updateDots() {
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentIndex);
  });
}

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % totalSlides; 
  updateDots();
});

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + totalSlides) % totalSlides; 
  updateDots();
});


dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    currentIndex = index;
    updateDots();
  });
});


const products = {
  coffee: [
    { img: "Product-coffee-1.png", name: "Panama Coffee", desc: "Introducing El Vergel Estate, a vibrant new coffee from the Bayter family’s innovative farm in Fresno, Tolima. This Red and Yellow Caturra variety.", price: "£15.50" },
    { img: "Product-coffee-2.png", name: "Peru Coffee", desc: "Introducing El Vergel Estate, a vibrant new coffee from the Bayter family’s innovative farm in Fresno, Tolima. This Red and Yellow Caturra variety.", price: "£13.50" }
  ],
  capsule: [
    { img: "capsule-image 1.png ", name: "House Espresso Capsule", desc: "Introducing El Vergel Estate, a vibrant new coffee from the Bayter family’s innovative farm in Fresno, Tolima. This Red and Yellow Caturra variety.", price: "£13.50" },
    { img: "capsule-image 1.png ", name: "House Espresso Capsule", desc: "Introducing El Vergel Estate, a vibrant new coffee from the Bayter family’s innovative farm in Fresno, Tolima. This Red and Yellow Caturra variety.", price: "£16.50" }
  ],
  all: [
    { img: "Product-coffee-1.png", name: "Panama Coffee", desc: "Introducing El Vergel Estate, a vibrant new coffee from the Bayter family’s innovative farm in Fresno, Tolima. This Red and Yellow Caturra variety.", price: "£15.50" },
    { img: "capsule-image 1.png", name: "House Espresso Capsule", desc: "Introducing El Vergel Estate, a vibrant new coffee from the Bayter family’s innovative farm in Fresno, Tolima. This Red and Yellow Caturra variety.", price: "£16.90" }
  ]
};

const filterBtns = document.querySelectorAll(".filters button");
const productCards = document.querySelectorAll(".product-card");
const collageContainer = document.querySelector(".left-collage");



const collageHTML = `
  <div class="collage-item"><img src="collage1.png"><span>View More</span></div>
  <div class="collage-item"><img src="collage 2.png"><span>View More</span></div>
  <div class="collage-item"><img src="collage3.png"><span>View More</span></div>
  <div class="collage-item"><img src="collage4.png"><span>View More</span></div>
`;

const singleImageHTML = `
  <div class="single-image">
    <img src="Product-capsule.png" alt="Capsule Banner">
    <span>View More</span>
  </div>
`;


filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const type = btn.dataset.type;
    const selected = products[type];

   
    if (type === "coffee") {
      collageContainer.innerHTML = collageHTML;
      collageContainer.classList.add("grid-layout");
      collageContainer.classList.remove("single-layout");
    } else {
      collageContainer.innerHTML = singleImageHTML;
      collageContainer.classList.remove("grid-layout");
      collageContainer.classList.add("single-layout");
    }

   
    productCards.forEach((card, i) => {
      const img = card.querySelector("img");
      const name = card.querySelector("h4");
      const desc = card.querySelector("p");
      const price = card.querySelector(".price");

      img.src = selected[i].img;
      name.textContent = selected[i].name;
      desc.textContent = selected[i].desc;
      price.textContent = selected[i].price;
    });
  });
});


document.querySelectorAll('.start-tour-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        alert('Starting virtual tour...');
    });
});


const mainText = document.getElementById('main-text');
const mainDesc = document.getElementById('main-desc');
const nextText = document.getElementById('next-text');
const nextDesc = document.getElementById('next-desc');
const slideImage = document.getElementById('slide-image');
const dotsClifton = document.querySelectorAll('.dot-clifton');

const slides = [
    {
        title: "Clifton Capsules",
        desc: "The wait is finally over, our capsules are back and better than ever. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout...",
        img: "clifton capsule.png",
        nextTitle: "Clifton Coffee",
        nextDesc: "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Why do we use it?"
    },
    {
        title: "Clifton Coffee",
        desc: "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Why do we use it?",
        img: "Clifton Coffee.png",
        nextTitle: "Clifton Tea",
        nextDesc: "Our bright and zingy Earl Grey combines a traditional blend of high-quality Sicilian bergamot oil with Keemun tea harvested from the Qimen county of Anhui."
    },
    {
        title: "Clifton Tea",
        desc: "Our bright and zingy Earl Grey combines a traditional blend of high-quality Sicilian bergamot oil with Keemun tea harvested from the Qimen county of Anhui.",
        img: "Cifton tea.png",
        nextTitle: "Clifton Chai",
        nextDesc: "Chai is one of the most popular drinks in India, used in Ayurvedic medicine for its calming and revitalizing effect on the body and mind."
    },
      {
        title: "Clifton Chai",
        desc: "Chai is one of the most popular drinks in India, used in Ayurvedic medicine for its calming and revitalizing effect on the body and mind.",
        img: "chay.png",
        nextTitle: "Explore More",
        nextDesc: "Visit our collection for more products."
    }
];

function showSlide(index) {
    
    dotsClifton.forEach(dot => dot.classList.remove('active'));
    dotsClifton[index].classList.add('active');

    
    mainText.parentElement.style.opacity = 0;
    nextText.parentElement.style.opacity = 0;
    slideImage.style.opacity = 0;

    setTimeout(() => {
       
        mainText.textContent = slides[index].title;
        mainDesc.textContent = slides[index].desc;
        nextText.textContent = slides[index].nextTitle;
        nextDesc.textContent = slides[index].nextDesc;

        slideImage.src = slides[index].img;

        mainText.parentElement.style.opacity = 1;
        nextText.parentElement.style.opacity = slides[index].nextTitle ? 0.3 : 0;
        slideImage.style.opacity = 1;
    }, 300);
}


dotsClifton.forEach(dot => {
    dot.addEventListener('click', () => {
        let index = parseInt(dot.getAttribute('data-index'));
        showSlide(index);
    });
});



document.addEventListener("DOMContentLoaded", () => {
 
  const buyButtons = document.querySelectorAll(".buy-btn");

  buyButtons.forEach(button => {
    button.addEventListener("click", (e) => {
      e.stopPropagation(); 

   
      const favCard = button.closest(".fav-card");

     
      document.querySelectorAll(".fav-card").forEach(card => {
        card.classList.remove("clicked");
      });

     
      favCard.classList.add("clicked");
    });
  });

  
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".fav-card")) {
      document.querySelectorAll(".fav-card").forEach(card => {
        card.classList.remove("clicked");
      });
    }
  });
});
document.querySelectorAll(".quantity").forEach(qtyContainer => {
    const minusBtn = qtyContainer.querySelector(".minusBtn");
    const plusBtn = qtyContainer.querySelector(".plusBtn");
    const qtyValue = qtyContainer.querySelector(".qtyValue");

    let quantity = 1;

    plusBtn.addEventListener("click", () => {
        quantity++;
        qtyValue.textContent = quantity;
    });

    minusBtn.addEventListener("click", () => {
        if (quantity > 1) {
            quantity--;
            qtyValue.textContent = quantity;
        }
    });
});


document.addEventListener('DOMContentLoaded', () => {
  const prevBtn = document.querySelector('.prev-btn') || document.getElementById('fav-prev');
  const nextBtn = document.querySelector('.next-btn') || document.getElementById('fav-next');

  const dots = Array.from(document.querySelectorAll('.fav-dots .dot'));

  if (dots.length === 0) return;

  let currentIndex = 0;
  const totalSlides = dots.length;

  function updateDots() {
    dots.forEach((dot, i) => dot.classList.toggle('active', i === currentIndex));
  }

  function goTo(index) {
    currentIndex = ((index % totalSlides) + totalSlides) % totalSlides;
    updateDots();
  
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => goTo(currentIndex + 1));
  }
  if (prevBtn) {
    prevBtn.addEventListener('click', () => goTo(currentIndex - 1));
  }

  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => goTo(idx));
  });

  updateDots();
});

const reviewCards = document.querySelectorAll('.reviews-container .review-card');
const reviewDots = document.querySelectorAll('.review-dots .dot');

function showReviewSlide(index) {
  const cardsPerSlide = 3;


  reviewCards.forEach((card, i) => {
    card.style.display = (i < cardsPerSlide) ? 'block' : 'none';
  });


  reviewDots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}


reviewDots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    showReviewSlide(i);
  });
});

showReviewSlide(0);


const instaImages = document.querySelectorAll('.insta-gallery img');
const instaDots = document.querySelectorAll('.insta-dots .dot');

function showInstaSlide(index) {
  const cardsPerSlide = 5;

  instaImages.forEach((img, i) => {
    
    img.style.display = (i < cardsPerSlide) ? 'inline-block' : 'none';
  });

  instaDots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}

instaDots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    showInstaSlide(i);
  });
});

showInstaSlide(0);


document.querySelector('.newsletter-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for subscribing!');
});

