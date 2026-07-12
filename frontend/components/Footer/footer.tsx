"use client";

import React from "react";
import Link from "next/link";
import { ShoppingBag, GitBranch, Globe, Share2 } from "lucide-react";

const LINKS = {
  Shop: [
    { label: "New Arrivals", href: "/category" },
    { label: "Men's", href: "/category" },
    { label: "Women's", href: "/category" },
    { label: "Sale", href: "/category" },
  ],
  Support: [
    { label: "FAQ", href: "/" },
    { label: "Shipping & Returns", href: "/" },
    { label: "Track Order", href: "/" },
    { label: "Contact Us", href: "/" },
  ],
};

const SOCIALS = [
  { icon: Globe, href: "#", label: "Twitter" },
  { icon: Share2, href: "#", label: "Instagram" },
  { icon: GitBranch, href: "#", label: "GitHub" },
];

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">

        {/* Brand */}
        <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-2 select-none w-fit">
            <div className="size-6 rounded-md bg-[#8b5cf6] flex items-center justify-center">
              <ShoppingBag className="size-3 text-foreground" />
            </div>
            <span className="text-sm font-bold text-foreground">
              Shop<span className="text-[#8b5cf6]">Bag</span>
            </span>
          </Link>
          <p className="text-xs text-muted-foreground leading-relaxed max-w-[180px]">
            Curated fashion & electronics for the modern world.
          </p>
          <div className="flex items-center gap-2">
            {SOCIALS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="size-7 rounded-lg border border-border bg-transparent flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-border transition-colors duration-150"
              >
                <Icon className="size-3" />
              </a>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(LINKS).map(([title, items]) => (
          <div key={title} className="flex flex-col gap-3">
            <p className="text-xs font-bold uppercase tracking-widest text-[#444]">{title}</p>
            {items.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-150"
              >
                {label}
              </Link>
            ))}
          </div>
        ))}

        {/* Newsletter */}
        <div className="col-span-2 md:col-span-1 flex flex-col gap-3">
          <p className="text-xs font-bold uppercase tracking-widest text-[#444]">Newsletter</p>
          <p className="text-xs text-muted-foreground">Get deals & new arrivals in your inbox.</p>
          <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="you@email.com"
              className="flex-1 min-w-0 h-8 px-3 text-xs rounded-lg bg-card border border-border text-foreground placeholder:text-[#444] focus:outline-none focus:border-[#8b5cf6]/50 transition-colors"
            />
            <button
              type="submit"
              className="h-8 px-3 text-xs font-bold bg-[#8b5cf6] hover:bg-[#7c3aed] text-foreground rounded-lg transition-colors duration-150 shrink-0"
            >
              Join
            </button>
          </form>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[11px] text-[#444]">Â© {new Date().getFullYear()} ShopBag. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-[11px] text-[#444] hover:text-muted-foreground transition-colors">Privacy Policy</Link>
            <Link href="/" className="text-[11px] text-[#444] hover:text-muted-foreground transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
