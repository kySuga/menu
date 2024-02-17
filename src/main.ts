interface MenuItem {
  id: number;
  title: string;
  category: string;
  price: number;
  img: string;
  alt: string;
  desc: string;
}

const menu: MenuItem[] = [
  {
    id: 1,
    title: "buttermilk pancakes",
    category: "breakfast",
    price: 15.99,
    img: "https://res.cloudinary.com/do9qt3sjt/image/upload/v1708041260/item-1_fcesxu.jpg",
    alt: "Stack of buttermilk pancakes.",
    desc: "I'm baby woke mlkshk wolf bitters live-edge blue bottle, hammock freegan copper mug whatever cold-pressed.",
  },
  {
    id: 2,
    title: "diner double",
    category: "lunch",
    price: 13.99,
    img: "https://res.cloudinary.com/do9qt3sjt/image/upload/v1708041260/item-2_ed9lnk.jpg",
    alt: "A juicy burger with fries.",
    desc: "Vaporware iPhone mumblecore selvage raw denim slow-carb leggings gochujang helvetica man braid jianbing. Marfa thundercats.",
  },
  {
    id: 3,
    title: "godzilla milkshake",
    category: "dessert",
    price: 6.99,
    img: "https://res.cloudinary.com/do9qt3sjt/image/upload/v1708041260/item-2_ed9lnk.jpg",
    alt: "A milkshake that King Kong would struggle to take on.",
    desc: "Ombucha chillwave fanny pack 3 wolf moon street art photo booth before they sold out organic viral.",
  },
  {
    id: 4,
    title: "country delight",
    category: "breakfast",
    price: 20.99,
    img: "https://res.cloudinary.com/do9qt3sjt/image/upload/v1708041260/item-4_ryiqtf.jpg",
    alt: "Hash browns, eggs, and toast.",
    desc: "Shabby chic keffiyeh neutra snackwave pork belly shoreditch. Prism austin mlkshk truffaut.",
  },
  {
    id: 5,
    title: "egg attack",
    category: "lunch",
    price: 22.99,
    img: "https://res.cloudinary.com/do9qt3sjt/image/upload/v1708041260/item-5_wr41kv.jpg",
    alt: "A burger with an egg.",
    desc: "Franzen vegan pabst bicycle rights kickstarter pinterest meditation farm-to-table 90's pop-up.",
  },
  {
    id: 6,
    title: "oreo dream",
    category: "dessert",
    price: 18.99,
    img: "https://res.cloudinary.com/do9qt3sjt/image/upload/v1708041260/item-6_mihocg.jpg",
    alt: "A chocolate oreo milkshake.",
    desc: "Portland chicharrones ethical edison bulb, palo santo craft beer chia heirloom iPhone everyday.",
  },
  {
    id: 7,
    title: "bacun overflow",
    category: "breakfast",
    price: 8.99,
    img: "https://res.cloudinary.com/do9qt3sjt/image/upload/v1708041261/item-7_tvvck2.jpg",
    alt: "A vegan bacun and egg breakfast sandwich.",
    desc: "Carry jianbing normcore freegan. Viral single-origin coffee live-edge, pork belly cloud bread iceland put a bird.",
  },
  {
    id: 8,
    title: "american classic",
    category: "dinner",
    price: 12.99,
    img: "https://res.cloudinary.com/do9qt3sjt/image/upload/v1708041261/item-8_qlcpkv.jpg",
    alt: "The go to cheeseburger and fries.",
    desc: "On it tumblr kickstarter thundercats migas everyday carry squid palo santo leggings. Food truck truffaut.",
  },
  {
    id: 9,
    title: "quarantine buddy",
    category: "dessert",
    price: 12.99,
    img: "https://res.cloudinary.com/do9qt3sjt/image/upload/v1708041261/item-9_dzjhdd.jpg",
    alt: "Two people wearing masks, enjoying a milkshake together.",
    desc: "On it tumblr kickstarter thundercats migas everyday carry squid palo santo leggings. Food truck truffaut.",
  },
  {
    id: 10,
    title: "steak dinner",
    category: "dinner",
    price: 39.99,
    img: "https://res.cloudinary.com/do9qt3sjt/image/upload/v1708041261/item-10_ctvjol.jpg",
    alt: "A juicy steak and vegetables.",
    desc: "Skateboard fam synth authentic semiotics. Live-edge lyft af, edison bulb yuccie crucifix microdosing.",
  },
];

const sectionCenter = document.querySelector(".section-center");
const btnContainer = document.querySelector(".btn__container");

// load menu items
window.addEventListener("DOMContentLoaded", () => {
  buildDisplayMenu(menu);
  buildDisplayBtns();
});

function buildDisplayMenu(menuItems: MenuItem[]): void {
  let buildMenu = menuItems.map((menuItem: any) => {
    
    return `<article class="menu-item">
        <img class="menu-item__photo" src="${menuItem.img}" alt="${menuItem.alt}">
        <div class="menu-item__info">
          <header>
            <h2>
              ${menuItem.title}
            </h2>
            <h3 class="price">
              $${menuItem.price}
            </h3>
          </header>
          <p class="menu-item__description">
            ${menuItem.desc}
          </p>
        </div>
      </article>`;
  });
  // duplicate buildMenu array, and join into one string 
  // quotes within join removes commas between articles
  const displayMenu = buildMenu.join("");
  // check if sectionCenter is available
  if (sectionCenter) {
    sectionCenter.innerHTML = displayMenu;
  }
};

function buildDisplayBtns() {

  const categories = menu.reduce((values, menuItem) => {
    // values array ["all"] does not include item category, add item category
    if (!values.includes(menuItem.category)) {
      values.push(menuItem.category);
    }
    return values;
  },["all"]);
  const categoryBtns = categories.map((category) => {
    return `<button class="btn__filter" type="button" data-id="${category}">${category}</button>`
  }).join("");
  if (btnContainer) {
    btnContainer.innerHTML = categoryBtns;
  }

  const btnFilterAll = document.querySelectorAll(".btn__filter");

  // filter menu items
  btnFilterAll.forEach((btn: Element) => {
    btn.addEventListener("click", (e: Event) => {
      // asserts that e.currentTarget is an HTMLElement, carefully use type assertions as they bypass TS's type checks
      const target = e.currentTarget as HTMLElement;
      const category = target.dataset.id;
      const menuCategory = menu.filter((menuCategoryItem: MenuItem) => {
        // console.log(menuItem.category);
        if (menuCategoryItem.category === category) {
          return menuCategoryItem;
        }
        
      });
      // console.log(menuCategory);
      if (category === "all") {
        buildDisplayMenu(menu);
      } else {
        buildDisplayMenu(menuCategory);
      }
    });
  });

};