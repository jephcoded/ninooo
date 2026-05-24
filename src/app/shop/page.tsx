"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

import { ADMIN_DATA_EVENT, ManagedProduct, SHOP_PRODUCTS_KEY, readManagedProducts } from "@/lib/admin-data";
import {
  readStoredOrders,
  readStoredValue,
  SHOP_CART_KEY,
  SHOP_EVENT,
  SHOP_PINNED_KEY,
  StoredCartItem,
  StoredOrder,
  writeStoredOrders,
  writeStoredValue,
} from "@/lib/shop-storage";
import { InfoTicker } from "@/components/ui/info-ticker";
import { CONTACT_EMAILS, CONTACT_PHONE_LOCAL, CONTACT_PHONE_LOCAL_ALT } from "@/lib/site-contact";

type ModalStep = "checkout" | "success" | "payment" | null;

type ReceiptState = {
  order: StoredOrder;
  product: ManagedProduct;
  quantity: number;
  color: string;
  size: string;
};

function formatNaira(value: number) {
  return new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(value);
}

function ShopActionIcon({ type }: { type: "cart" | "history" | "pins" | "delivery" | "reminder" | "search" | "placeholder" }) {
  if (type === "cart") {
    return (
      <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="9" cy="20" r="1.5" />
        <circle cx="18" cy="20" r="1.5" />
        <path d="M3 4h2l2.1 9.3a1 1 0 0 0 1 .7h8.8a1 1 0 0 0 1-.8L20 7H7.1" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (type === "history") {
    return (
      <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4.5 12A7.5 7.5 0 1 0 7 6.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4.5 4.5v4h4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 8.5v4l2.5 1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (type === "pins") {
    return (
      <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="m12 3 2.2 5.2 5.8.5-4.4 3.8 1.3 5.6L12 15.1 7.1 18l1.3-5.6L4 8.7l5.8-.5Z" strokeLinejoin="round" />
      </svg>
    );
  }

  if (type === "delivery") {
    return (
      <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 7h12v9H3z" strokeLinejoin="round" />
        <path d="M15 10h3l3 3v3h-6" strokeLinejoin="round" />
        <circle cx="8" cy="18" r="1.5" />
        <circle cx="18" cy="18" r="1.5" />
      </svg>
    );
  }

  if (type === "reminder") {
    return (
      <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 5v7" strokeLinecap="round" />
        <path d="M8.5 3.5h7" strokeLinecap="round" />
        <path d="M6.5 18h11a1.5 1.5 0 0 0 1.2-2.4l-1.4-1.9V10a5.3 5.3 0 0 0-10.6 0v3.7l-1.4 1.9A1.5 1.5 0 0 0 6.5 18Z" strokeLinejoin="round" />
        <path d="M10 20a2.3 2.3 0 0 0 4 0" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === "search") {
    return (
      <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="size-7" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="5" y="5" width="14" height="14" rx="2.5" strokeDasharray="3 3" />
      <path d="M8.5 15.5 11 13l1.8 1.8 2.7-3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function ShopPage() {
  const [products, setProducts] = useState<ManagedProduct[]>([]);
  const [orders, setOrders] = useState<StoredOrder[]>([]);
  const [cart, setCart] = useState<StoredCartItem[]>([]);
  const [pins, setPins] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState<ManagedProduct | null>(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [modalStep, setModalStep] = useState<ModalStep>(null);
  const [receipt, setReceipt] = useState<ReceiptState | null>(null);
  const [isReminderOpen, setIsReminderOpen] = useState(false);

  useEffect(() => {
    const syncShop = async () => {
      const hasExplicitProducts = Boolean(window.localStorage.getItem(SHOP_PRODUCTS_KEY));
      setProducts(hasExplicitProducts ? await readManagedProducts() : []);
      setOrders(await readStoredOrders());
      setCart(readStoredValue<StoredCartItem[]>(SHOP_CART_KEY, []));
      setPins(readStoredValue<string[]>(SHOP_PINNED_KEY, []));
    };

    void syncShop();
    window.addEventListener("storage", syncShop);
    window.addEventListener(ADMIN_DATA_EVENT, syncShop);
    window.addEventListener(SHOP_EVENT, syncShop);

    return () => {
      window.removeEventListener("storage", syncShop);
      window.removeEventListener(ADMIN_DATA_EVENT, syncShop);
      window.removeEventListener(SHOP_EVENT, syncShop);
    };
  }, []);

  useEffect(() => {
    if (modalStep !== "success") {
      return;
    }

    const timer = window.setTimeout(() => {
      setModalStep("payment");
    }, 1400);

    return () => {
      window.clearTimeout(timer);
    };
  }, [modalStep]);

  const categories = useMemo(() => ["All", ...new Set(products.map((product) => product.category))], [products]);

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCategory = activeCategory === "All" || product.category === activeCategory;
      const matchesQuery =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query);

      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, products, searchQuery]);

  const visibleSlots = Array.from({ length: 12 }, (_, index) => filteredProducts[index] ?? null);
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const searchHasNoResult = searchQuery.trim().length > 0 && filteredProducts.length === 0;

  const sidebarItems = [
    { id: "cart", icon: "cart" as const, value: `${cartCount}` },
    { id: "history", icon: "history" as const, value: `${orders.length}` },
    { id: "pins", icon: "pins" as const, value: `${pins.length}` },
    { id: "delivery", icon: "delivery" as const, value: "1-3d" },
  ];

  const openCheckout = (product: ManagedProduct) => {
    setSelectedProduct(product);
    setSelectedColor(product.colors[0] ?? "Admin confirms");
    setSelectedSize(product.sizes[0] ?? "Admin confirms");
    setQuantity(1);
    setModalStep("checkout");
  };

  const closeModal = () => {
    setModalStep(null);
    setSelectedProduct(null);
    setReceipt(null);
  };

  const togglePin = (productId: string) => {
    const nextPins = pins.includes(productId) ? pins.filter((item) => item !== productId) : [...pins, productId];
    setPins(nextPins);
    writeStoredValue(SHOP_PINNED_KEY, nextPins);
  };

  const addToCart = () => {
    if (!selectedProduct) {
      return;
    }

    const nextItem: StoredCartItem = {
      productId: selectedProduct.id,
      quantity,
      color: selectedColor || "Admin confirms",
      size: selectedSize || "Admin confirms",
    };

    const nextCart = [...cart];
    const existingIndex = nextCart.findIndex(
      (item) => item.productId === nextItem.productId && item.color === nextItem.color && item.size === nextItem.size,
    );

    if (existingIndex >= 0) {
      nextCart[existingIndex] = { ...nextCart[existingIndex], quantity: nextCart[existingIndex].quantity + nextItem.quantity };
    } else {
      nextCart.unshift(nextItem);
    }

    setCart(nextCart);
    writeStoredValue(SHOP_CART_KEY, nextCart);
    setModalStep(null);
  };

  const checkoutProduct = async () => {
    if (!selectedProduct) {
      return;
    }

    const order: StoredOrder = {
      id: `NINO-ORD-${Date.now().toString().slice(-6)}`,
      createdAt: new Date().toISOString(),
      status: "pending secretary payment",
      items: [
        {
          productId: selectedProduct.id,
          productName: selectedProduct.name,
          quantity,
          color: selectedColor || "Admin confirms",
          size: selectedSize || "Admin confirms",
          price: selectedProduct.price,
        },
      ],
    };

    const nextOrders = [order, ...(await readStoredOrders())];
    await writeStoredOrders(nextOrders);
    setOrders(nextOrders);
    setReceipt({
      order,
      product: selectedProduct,
      quantity,
      color: selectedColor || "Admin confirms",
      size: selectedSize || "Admin confirms",
    });
    setModalStep("success");
  };

  return (
    <main className="bg-[linear-gradient(180deg,#f8fafc_0%,#ffffff_40%,#f8fafc_100%)] text-[var(--foreground)]">
      <section className="w-full pb-12 pl-[4.7rem] pr-4 pt-2 sm:pb-14 sm:pl-[5.1rem] sm:pr-6 sm:pt-3 lg:pb-16 lg:pl-[7.25rem] lg:pr-8 lg:pt-4">
        <div className="mx-auto max-w-[1280px]">
          <aside className="fixed left-0 top-[5.05rem] z-30 h-[calc(100vh-5.05rem)] w-[4.25rem] sm:top-[5.25rem] sm:h-[calc(100vh-5.25rem)] sm:w-[4.55rem] lg:w-[6.25rem]">
            <div className="flex h-full flex-col gap-2 overflow-hidden rounded-r-[1.4rem] border-y border-r border-white/8 bg-[var(--navy-soft)] p-2 shadow-[0_18px_50px_rgba(15,23,42,0.06)] lg:gap-3 lg:rounded-r-[2rem] lg:p-2">
              {sidebarItems.map((item) => (
                <div key={item.id} className="flex min-w-0 flex-col items-center justify-center rounded-[1rem] bg-white px-2 py-3 text-center text-[var(--accent)] lg:min-h-[5rem] lg:rounded-[1.3rem] lg:px-3 lg:py-4">
                  <ShopActionIcon type={item.icon} />
                  <span className="mt-2 text-[0.68rem] font-semibold text-white lg:text-[0.72rem]">{item.value}</span>
                </div>
              ))}
            </div>
          </aside>

          <div>
            <div>
              <div className="mx-auto mt-1 max-w-[58rem] rounded-[1.7rem] border border-slate-200 bg-white p-3 shadow-[0_24px_70px_rgba(15,23,42,0.06)] sm:mt-2 sm:p-4 lg:max-w-[60rem]">
                <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-[linear-gradient(180deg,#f8fafc,#ffffff)] px-4 py-2.5 sm:px-5 sm:py-3">
                  <span className="text-[var(--accent)]"><ShopActionIcon type="search" /></span>
                  <input
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="Search for items, categories, or parts if available"
                    className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                  />
                </div>

                <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setActiveCategory(category)}
                      className={`rounded-full border px-4 py-2 text-[0.66rem] font-semibold uppercase tracking-[0.18em] transition-colors duration-300 ${
                        activeCategory === category
                          ? "border-[var(--accent)] bg-[var(--accent)] text-white"
                          : "border-slate-200 bg-white text-[var(--foreground)]"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>

                <div className="mt-3 text-center text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-slate-500 sm:text-[0.72rem]">
                  {searchHasNoResult
                    ? "Not available"
                    : `${filteredProducts.length} item${filteredProducts.length === 1 ? "" : "s"} available in ${activeCategory}`}
                </div>
              </div>

              <section className="mt-6 grid grid-cols-2 gap-4 sm:mt-7 sm:grid-cols-3 xl:grid-cols-4">
                {visibleSlots.map((product, index) => {
                  const isPinned = product ? pins.includes(product.id) : false;

                  return (
                    <button
                      key={product?.id ?? `slot-${index}`}
                      type="button"
                      onClick={() => {
                        if (product) {
                          openCheckout(product);
                        }
                      }}
                      className={`group relative flex aspect-[0.82] flex-col justify-between overflow-hidden rounded-[1.2rem] border p-3 text-left transition-all duration-300 ${
                          product
                            ? "border-slate-100 bg-white hover:-translate-y-1 hover:border-[var(--accent)]/35"
                            : "border-slate-100 bg-[var(--background)] text-[var(--muted)]"
                        }`}
                    >
                      {product ? (
                        <>
                          <button
                            type="button"
                            onClick={(event) => {
                              event.stopPropagation();
                              togglePin(product.id);
                            }}
                            className={`absolute right-3 top-3 inline-flex size-9 items-center justify-center rounded-full border ${
                              isPinned ? "border-[var(--accent)] bg-[var(--accent)] text-black" : "border-slate-200 bg-white/90 text-[var(--accent)]"
                            }`}
                            aria-label={isPinned ? "Remove pin" : "Pin product"}
                          >
                            <ShopActionIcon type="pins" />
                          </button>

                          <div className="relative flex-1">
                            {product.image ? (
                              <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                sizes="(max-width: 1024px) 50vw, 20vw"
                                className="object-contain p-4 opacity-95 transition-transform duration-300 group-hover:scale-105"
                              />
                            ) : (
                              <div className="flex h-full items-center justify-center text-[var(--accent)]/70">
                                <ShopActionIcon type="placeholder" />
                              </div>
                            )}
                          </div>

                          <div>
                            <p className="text-[0.58rem] font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">{product.category}</p>
                            <p className="mt-2 line-clamp-2 text-[0.8rem] font-semibold text-slate-900">{product.name}</p>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex flex-1 items-center justify-center text-[var(--accent)]/55">
                            <ShopActionIcon type="placeholder" />
                          </div>
                          <div>
                            <p className="text-[0.58rem] font-semibold uppercase tracking-[0.2em] text-slate-400">Awaiting upload</p>
                            <p className="mt-2 text-sm font-semibold text-slate-400">Admin product slot</p>
                          </div>
                        </>
                      )}
                    </button>
                  );
                })}
              </section>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell pb-12 sm:pb-16">
        <InfoTicker />
      </section>

      <button
        type="button"
        onClick={() => setIsReminderOpen((value) => !value)}
        className="fixed bottom-24 right-5 z-40 inline-flex size-14 items-center justify-center rounded-full border border-[var(--accent)]/25 bg-[#fff6e8] text-[var(--accent)] shadow-[0_18px_50px_rgba(255,122,24,0.18)] transition-transform duration-300 hover:-translate-y-1 sm:bottom-28 sm:right-6"
        aria-label="Open reminder details"
      >
        <ShopActionIcon type="reminder" />
      </button>

      {isReminderOpen ? (
        <div className="fixed bottom-40 right-5 z-40 max-w-xs rounded-[1.5rem] border border-slate-200 bg-white p-4 text-sm leading-7 text-slate-600 shadow-[0_18px_50px_rgba(15,23,42,0.12)] sm:right-6">
          Keep reminder prompts here for restocks, delivery updates, and secretary payment confirmation messages.
        </div>
      ) : null}

      {modalStep && selectedProduct ? (
        <div className="fixed inset-0 z-[95] flex items-center justify-center bg-[rgba(15,23,42,0.42)] px-4 py-8 backdrop-blur-sm">
          <div className="w-full max-w-xl rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_26px_80px_rgba(15,23,42,0.18)] sm:p-7">
            {modalStep === "checkout" ? (
              <>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">Checkout form</p>
                    <h2 className="mt-3 font-display text-[1.8rem] font-semibold tracking-[-0.04em] text-slate-950">{selectedProduct.name}</h2>
                    <p className="mt-3 text-sm leading-7 text-slate-600">Choose quantity, size, and color before saving to cart or submitting the checkout.</p>
                  </div>
                  <button type="button" onClick={closeModal} className="text-sm font-semibold text-slate-500">Close</button>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[1.3rem] border border-slate-200 bg-[linear-gradient(180deg,#fff8ee,#ffffff)] p-4">
                    <p className="text-[0.64rem] font-semibold uppercase tracking-[0.18em] text-slate-500">Amount</p>
                    <div className="mt-3 inline-flex items-center rounded-full border border-slate-200 bg-white px-2 py-2">
                      <button type="button" onClick={() => setQuantity((current) => Math.max(1, current - 1))} className="inline-flex size-9 items-center justify-center rounded-full text-slate-500">-</button>
                      <span className="min-w-10 text-center text-sm font-semibold text-slate-950">{quantity}</span>
                      <button type="button" onClick={() => setQuantity((current) => current + 1)} className="inline-flex size-9 items-center justify-center rounded-full text-slate-500">+</button>
                    </div>
                  </div>

                  <div className="rounded-[1.3rem] border border-slate-200 bg-[linear-gradient(180deg,#fff8ee,#ffffff)] p-4">
                    <p className="text-[0.64rem] font-semibold uppercase tracking-[0.18em] text-slate-500">Price</p>
                    <p className="mt-3 font-display text-[1.55rem] font-semibold tracking-[-0.04em] text-slate-950">{formatNaira(selectedProduct.price * quantity)}</p>
                  </div>
                </div>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-[0.64rem] font-semibold uppercase tracking-[0.18em] text-slate-500">Color</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {(selectedProduct.colors.length ? selectedProduct.colors : ["Admin confirms"]).map((color) => (
                        <button
                          key={color}
                          type="button"
                          onClick={() => setSelectedColor(color)}
                          className={`rounded-full border px-3 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.18em] ${
                            selectedColor === color ? "border-[var(--accent)] bg-[var(--accent)] text-black" : "border-slate-200 text-slate-600"
                          }`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-[0.64rem] font-semibold uppercase tracking-[0.18em] text-slate-500">Size</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {(selectedProduct.sizes.length ? selectedProduct.sizes : ["Admin confirms"]).map((size) => (
                        <button
                          key={size}
                          type="button"
                          onClick={() => setSelectedSize(size)}
                          className={`rounded-full border px-3 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.18em] ${
                            selectedSize === size ? "border-[var(--accent)] bg-[var(--accent)] text-black" : "border-slate-200 text-slate-600"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <button type="button" onClick={addToCart} className="inline-flex items-center justify-center rounded-full border border-slate-200 px-5 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-slate-700">
                    Save to cart
                  </button>
                  <button type="button" onClick={() => void checkoutProduct()} className="inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-5 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-black">
                    Complete checkout
                  </button>
                </div>
              </>
            ) : null}

            {modalStep === "success" ? (
              <div className="py-10 text-center">
                <div className="mx-auto inline-flex size-16 items-center justify-center rounded-full bg-[var(--accent)]/14 text-[var(--accent)]">
                  <ShopActionIcon type="delivery" />
                </div>
                <p className="mt-5 text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">Checkout successful</p>
                <h2 className="mt-3 font-display text-[1.8rem] font-semibold tracking-[-0.04em] text-slate-950">Your checkout was saved successfully.</h2>
                <p className="mt-4 text-sm leading-7 text-slate-600">Payment details and receipt information are loading next.</p>
              </div>
            ) : null}

            {modalStep === "payment" && receipt ? (
              <>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">Payment information</p>
                    <h2 className="mt-3 font-display text-[1.8rem] font-semibold tracking-[-0.04em] text-slate-950">Receipt and secretary payment steps</h2>
                  </div>
                  <button type="button" onClick={closeModal} className="text-sm font-semibold text-slate-500">Close</button>
                </div>

                <div className="mt-6 rounded-[1.4rem] border border-slate-200 bg-[linear-gradient(180deg,#fff8ee,#ffffff)] p-5">
                  <p className="text-[0.64rem] font-semibold uppercase tracking-[0.18em] text-slate-500">Receipt</p>
                  <p className="mt-3 text-sm text-slate-700">Order ID: {receipt.order.id}</p>
                  <p className="mt-2 text-sm text-slate-700">Item: {receipt.product.name}</p>
                  <p className="mt-2 text-sm text-slate-700">Quantity: {receipt.quantity}</p>
                  <p className="mt-2 text-sm text-slate-700">Color: {receipt.color}</p>
                  <p className="mt-2 text-sm text-slate-700">Size: {receipt.size}</p>
                  <p className="mt-2 text-sm font-semibold text-slate-950">Total: {formatNaira(receipt.product.price * receipt.quantity)}</p>
                </div>

                <div className="mt-5 space-y-3 text-sm leading-7 text-slate-600">
                  <p>Payment is completed directly between the customer and the Nino company secretary after this receipt is confirmed.</p>
                  <p>Call {CONTACT_PHONE_LOCAL} or {CONTACT_PHONE_LOCAL_ALT} to confirm the product, payment method, and delivery arrangement.</p>
                  <p>Email support is available through {CONTACT_EMAILS.join(" and ")} if a receipt copy or follow-up note is needed.</p>
                  <p>Address: Abuja, Airport Road.</p>
                </div>
              </>
            ) : null}
          </div>
        </div>
      ) : null}
    </main>
  );
}
