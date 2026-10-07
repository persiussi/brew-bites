"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

const mapsUrl =
  "https://www.google.com/maps/place/brew+bites/@34.5575006,76.1267568,17z/data=!3m1!4b1!4m6!3m5!1s0x38e3230d36379bd5:0x499d506de73f480a!8m2!3d34.5575006!4d76.1267568!16s%2Fg%2F11rb2sb4tr";
const mapsVideoUrl =
  "https://www.google.com/maps/place/brew+bites/@34.5574971,76.1266949,3a,75y,90t/data=!3m8!1e5!3m6!1sCIHM0ogKEICAgICOh9PAAg!2e10!3e10!6shttps:%2F%2Flh3.googleusercontent.com%2Fgps-cs-s%2FAHRPTWlLcNry4tNnVR46qvL7kwcXKMEy4LtG8xB0yR4nnDz5NfUd_r5CfUMwpSRSiLe7D_SC4rePY7zTNnIB_0JGHTggrbBpWM73eC97kSV5MZF3ptvNvIe3hJe7LFZ-A23Wj28wpGtV%3Dw224-h398-k-no!7i1080!8i1920!4m9!3m8!1s0x38e3230d36379bd5:0x499d506de73f480a!8m2!3d34.5575006!4d76.1267568!10e5!14m1!1BCgIgARICCAQ!16s%2Fg%2F11rb2sb4tr!5m1!1e1?entry=ttu&g_ep=EgoyMDI2MTAwNC4wIKXMDSoASAFQAw%3D%3D";

const categories = ["All", "Coffee", "Pizza", "Burgers", "Wraps", "Desserts"];

const products = [
  {
    id: "latte",
    name: "Mountain Latte",
    category: "Coffee",
    price: "₹160",
    image: "/business/mountain-latte.webp",
    detail: "Creamy espresso drink for a slow cafe break.",
  },
  {
    id: "pizza",
    name: "Cafe Pizza Slice",
    category: "Pizza",
    price: "₹180",
    image: "/business/cafe-pizza-slice.webp",
    detail: "Cheesy, crisp and made for sharing.",
  },
  {
    id: "burger",
    name: "Brew Burger",
    category: "Burgers",
    price: "₹220",
    image: "/business/brew-burger.webp",
    detail: "A filling burger with fries on the side.",
  },
  {
    id: "wrap",
    name: "Loaded Wrap",
    category: "Wraps",
    price: "₹190",
    image: "/business/loaded-wrap.webp",
    detail: "Grilled wrap with fresh filling and sauce.",
  },
  {
    id: "brownie",
    name: "Chocolate Brownie",
    category: "Desserts",
    price: "₹140",
    image: "/business/chocolate-brownie.webp",
    detail: "Rich chocolate bite for coffee pairings.",
  },
  {
    id: "iced-coffee",
    name: "Iced Coffee",
    category: "Coffee",
    price: "₹150",
    image: "/business/iced-coffee.webp",
    detail: "Cold, bold and easy to carry.",
  },
];

type IconName = "bag" | "bean" | "check" | "map" | "minus" | "play" | "plus" | "search" | "trash" | "x";

function Icon({ name }: { name: IconName }) {
  const paths: Record<IconName, React.ReactNode> = {
    bag: (
      <>
        <path d="M7 9h10l-1 10H8L7 9Z" />
        <path d="M9 9a3 3 0 0 1 6 0" />
      </>
    ),
    bean: (
      <>
        <path d="M16 3c4 5 1 15-7 18C5 16 4 7 16 3Z" />
        <path d="M9 17c3-3 4-7 3-11" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    map: (
      <>
        <path d="M12 21s7-4.6 7-11a7 7 0 1 0-14 0c0 6.4 7 11 7 11Z" />
        <path d="M12 10.5h.01" />
      </>
    ),
    minus: <path d="M5 12h14" />,
    play: <path d="m8 5 11 7-11 7V5Z" />,
    plus: (
      <>
        <path d="M12 5v14" />
        <path d="M5 12h14" />
      </>
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="6" />
        <path d="m16 16 4 4" />
      </>
    ),
    trash: (
      <>
        <path d="M5 7h14" />
        <path d="M9 7V5h6v2" />
        <path d="m8 7 1 12h6l1-12" />
      </>
    ),
    x: (
      <>
        <path d="M6 6l12 12" />
        <path d="M18 6 6 18" />
      </>
    ),
  };

  return (
    <svg aria-hidden="true" className="icon" viewBox="0 0 24 24">
      {paths[name]}
    </svg>
  );
}

export default function Home() {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState<Record<string, number>>({ latte: 1, pizza: 1 });
  const [cartOpen, setCartOpen] = useState(false);
  const [status, setStatus] = useState("Order list ready for cafe pickup.");

  const visibleProducts = useMemo(() => {
    const q = query.trim().toLowerCase();

    return products.filter((product) => {
      const categoryMatch = category === "All" || product.category === category;
      const queryMatch =
        q.length === 0 ||
        product.name.toLowerCase().includes(q) ||
        product.category.toLowerCase().includes(q) ||
        product.detail.toLowerCase().includes(q);

      return categoryMatch && queryMatch;
    });
  }, [category, query]);

  const cartItems = products
    .map((product) => ({ ...product, quantity: cart[product.id] ?? 0 }))
    .filter((product) => product.quantity > 0);

  const totalItems = cartItems.reduce((sum, product) => sum + product.quantity, 0);
  const subtotal = cartItems.reduce((sum, product) => sum + Number(product.price.replace(/\D/g, "")) * product.quantity, 0);

  function addItem(id: string) {
    const product = products.find((item) => item.id === id);
    setCart((current) => ({ ...current, [id]: (current[id] ?? 0) + 1 }));
    setStatus(`${product?.name ?? "Item"} added.`);
  }

  function removeItem(id: string) {
    const product = products.find((item) => item.id === id);
    setCart((current) => {
      const next = { ...current };
      const quantity = Math.max((current[id] ?? 0) - 1, 0);

      if (quantity === 0) {
        delete next[id];
      } else {
        next[id] = quantity;
      }

      return next;
    });
    setStatus(`${product?.name ?? "Item"} updated.`);
  }

  function clearCart() {
    setCart({});
    setStatus("Basket cleared.");
  }

  function confirmPickup() {
    setStatus(
      totalItems > 0
        ? `${totalItems} item${totalItems === 1 ? "" : "s"} ready to confirm at Brew Bites.`
        : "Add menu items before confirming.",
    );
    setCartOpen(true);
  }

  return (
    <main>
      <header className="topbar">
        <Link className="brand" href="#top" aria-label="Brew Bites home">
          <span>BB</span>
          <strong>Brew Bites</strong>
        </Link>
        <label className="search" aria-label="Search menu">
          <Icon name="search" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search coffee, pizza, wraps" />
        </label>
        <nav>
          <Link href="#menu">Menu</Link>
          <Link href="#media">Media</Link>
          <Link href="#location">Visit</Link>
        </nav>
        <button className="cart-button" onClick={() => setCartOpen(true)} type="button">
          <Icon name="bag" />
          Cart <span>{totalItems}</span>
        </button>
      </header>

      {cartOpen ? (
        <div className="cart-modal" role="dialog" aria-modal="true" aria-label="Cart">
          <button className="modal-backdrop" onClick={() => setCartOpen(false)} type="button" aria-label="Close cart" />
          <aside className="drawer">
            <div className="drawer-head">
              <div>
                <p className="kicker">
                  <Icon name="bag" /> Your order
                </p>
                <h2>Cafe pickup</h2>
              </div>
              <button className="icon-button" onClick={() => setCartOpen(false)} type="button">
                <Icon name="x" />
              </button>
            </div>
            <div className="drawer-items">
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <article className="drawer-item" key={item.id}>
                    <Image src={item.image} alt={item.name} width={72} height={72} />
                    <div>
                      <span>{item.category}</span>
                      <strong>{item.name}</strong>
                      <small>{item.price}</small>
                    </div>
                    <div className="quantity">
                      <button onClick={() => removeItem(item.id)} type="button" aria-label={`Remove ${item.name}`}>
                        <Icon name="minus" />
                      </button>
                      <strong>{item.quantity}</strong>
                      <button onClick={() => addItem(item.id)} type="button" aria-label={`Add ${item.name}`}>
                        <Icon name="plus" />
                      </button>
                    </div>
                  </article>
                ))
              ) : (
                <div className="empty">
                  <Icon name="bag" />
                  <strong>Your cart is empty</strong>
                  <span>Add something delicious from the menu.</span>
                </div>
              )}
            </div>
            <div className="summary">
              <div>
                <span>Items</span>
                <strong>{totalItems}</strong>
              </div>
              <div>
                <span>Estimated subtotal</span>
                <strong>{subtotal > 0 ? `₹${subtotal}` : "₹0"}</strong>
              </div>
            </div>
            <p className="status">
              <Icon name="check" /> {status}
            </p>
            <button className="primary-button" onClick={confirmPickup} type="button">
              <Icon name="check" />
              Confirm pickup list
            </button>
            <a className="secondary-button" href={mapsUrl} target="_blank" rel="noreferrer">
              <Icon name="map" />
              Navigate to cafe
            </a>
            <button className="clear-button" onClick={clearCart} type="button">
              <Icon name="trash" />
              Clear cart
            </button>
          </aside>
        </div>
      ) : null}

      <section className="hero" id="top">
        <video className="hero-video" autoPlay loop muted playsInline poster="/business/brew-bites-hero.png">
          <source src="/business/brew-bites-loop.mp4" type="video/mp4" />
        </video>
        <div className="shade" />
        <div className="hero-content">
          <p className="kicker">
            <Icon name="bean" /> Coffee, pizza, wraps and quick bites
          </p>
          <h1>Brew Bites</h1>
          <p>
            A cozy cafe-style menu experience for coffee breaks, fast food cravings
            and relaxed meetups in Kargil.
          </p>
          <div className="hero-actions">
            <Link className="primary-button" href="#menu">
              <Icon name="bag" />
              Order from menu
            </Link>
            <a className="ghost-button" href={mapsUrl} target="_blank" rel="noreferrer">
              <Icon name="map" />
              Get directions
            </a>
          </div>
        </div>
      </section>

      <section className="media-strip" aria-label="Cafe highlights">
        <div>
          <Icon name="bean" />
          <strong>Fresh coffee</strong>
          <span>Hot and iced drinks</span>
        </div>
        <div>
          <Icon name="bag" />
          <strong>Fast bites</strong>
          <span>Pizza, burgers, wraps</span>
        </div>
        <div>
          <Icon name="play" />
          <strong>Visual menu</strong>
          <span>Photos and video inside</span>
        </div>
      </section>

      <section className="menu-section" id="menu">
        <div className="section-head">
          <div>
            <p className="kicker">
              <Icon name="search" /> Browse menu
            </p>
            <h2>Pick your bite</h2>
          </div>
          <button className="cart-link" onClick={() => setCartOpen(true)} type="button">
            <Icon name="bag" />
            View cart
          </button>
        </div>
        <div className="categories">
          {categories.map((item) => (
            <button className={item === category ? "active" : ""} key={item} onClick={() => setCategory(item)} type="button">
              {item}
            </button>
          ))}
        </div>
        <div className="product-grid">
          {visibleProducts.map((product) => (
            <article className="product-card" key={product.id}>
              <div className="product-image">
                <Image src={product.image} alt={product.name} fill sizes="(max-width: 900px) 100vw, 33vw" />
                <span>{product.category}</span>
              </div>
              <div className="product-copy">
                <h3>{product.name}</h3>
                <p>{product.detail}</p>
                <div>
                  <strong>{product.price}</strong>
                  <button onClick={() => addItem(product.id)} type="button">
                    <Icon name="plus" />
                    Add
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="media-section" id="media">
        <div>
          <p className="kicker">
            <Icon name="play" /> Photos and video
          </p>
          <h2>A warm cafe mood before customers arrive.</h2>
          <p>
            The media below pairs the cafe visuals with the Google Maps view you shared.
          </p>
        </div>
        <div className="media-grid">
          <div className="photo-card tall">
            <Image src="/business/brew-bites-hero.png" alt="Brew Bites cafe interior" fill sizes="(max-width: 900px) 100vw, 50vw" />
          </div>
          <div className="photo-card">
            <Image src="/business/brew-bites-menu.png" alt="Brew Bites menu items" fill sizes="(max-width: 900px) 100vw, 50vw" />
          </div>
          <a className="video-card maps-video-card" href={mapsVideoUrl} target="_blank" rel="noreferrer" aria-label="Open Brew Bites Google Maps video">
            <Image src="/business/brew-bites-google-maps-view.jpg" alt="Brew Bites Google Maps view" fill sizes="(max-width: 900px) 100vw, 50vw" />
            <span>
              <Icon name="play" />
              Google Maps video
            </span>
          </a>
        </div>
      </section>

      <section className="location-section" id="location">
        <div>
          <p className="kicker">
            <Icon name="map" /> Find the cafe
          </p>
          <h2>Visit Brew Bites.</h2>
          <p>
            Use the map for directions. For current menu, pricing, offers and
            timing, confirm directly with the cafe.
          </p>
          <a className="primary-button dark" href={mapsUrl} target="_blank" rel="noreferrer">
            <Icon name="map" />
            Navigate now
          </a>
        </div>
        <div className="map-frame">
          <iframe
            title="Map showing Brew Bites"
            src="https://www.google.com/maps?q=34.5575006,76.1267568&z=17&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

      <footer className="footer">
        <strong>Brew Bites</strong>
        <span>Cafe website with photos, video and interactive menu</span>
      </footer>
    </main>
  );
}
