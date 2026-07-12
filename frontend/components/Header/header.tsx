// (old commented-out code removed)

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, Search, Menu, X, ShoppingBag, User, LogOut, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/category" },
  { label: "New Arrivals", href: "/category" },
  { label: "Sale", href: "/category", badge: "HOT" },
];

interface HeaderProps {
  user?: {
    name?: string;
    email?: string;
    picture?: string;
  };
}

const Header: React.FC<HeaderProps> = ({ user }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => { setMounted(true); }, []);

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Purple accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#8b5cf6] to-transparent" />

      <div className="bg-background/90 backdrop-blur-xl border-b border-border transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between gap-4">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 select-none shrink-0 group">
            <div className="size-7 rounded-lg bg-[#8b5cf6] flex items-center justify-center transition-all duration-150 group-hover:bg-[#7c3aed]">
              <ShoppingBag className="size-3.5 text-white" />
            </div>
            <span className="text-sm font-bold tracking-tight text-foreground">
              Shop<span className="text-[#8b5cf6]">Bag</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-0.5">
            {NAV_LINKS.map(({ label, href, badge }) => (
              <Link
                key={label}
                href={href}
                className="px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground rounded-md hover:bg-accent transition-colors duration-150 flex items-center gap-1.5"
              >
                {label}
                {badge && (
                  <span className="text-[10px] font-bold bg-[#8b5cf6]/20 text-[#8b5cf6] border border-[#8b5cf6]/30 px-1.5 py-0.5 rounded leading-none">
                    {badge}
                  </span>
                )}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-0.5">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Search"
              className="text-muted-foreground hover:text-foreground hover:bg-accent size-8"
            >
              <Search className="size-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Cart"
              className="relative text-muted-foreground hover:text-foreground hover:bg-accent size-8"
              asChild
            >
              <Link href="/cart">
                <ShoppingCart className="size-3.5" />
                <span className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-[#8b5cf6]" />
              </Link>
            </Button>

            {/* Theme toggle */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
              className="size-[34px] rounded-lg border border-border bg-transparent flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition-colors duration-150 ml-0.5"
            >
              {!mounted ? (
                <span className="size-4" />
              ) : theme === "dark" ? (
                <Sun className="size-4 transition-transform duration-200" />
              ) : (
                <Moon className="size-4 transition-transform duration-200" />
              )}
            </button>

            {/* Auth */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 ml-1 rounded-lg border border-border px-2.5 py-1.5 hover:bg-accent transition-all duration-150">
                    {user.picture ? (
                      <img src={user.picture} alt={user.name ?? "User"} className="size-5 rounded-full" />
                    ) : (
                      <div className="size-5 rounded-full bg-[#8b5cf6]/20 flex items-center justify-center">
                        <User className="size-3 text-[#8b5cf6]" />
                      </div>
                    )}
                    <span className="text-xs font-medium text-muted-foreground hidden sm:block">
                      {user.name ?? user.email}
                    </span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <div className="px-2 py-2">
                    <p className="text-xs font-semibold text-foreground">{user.name}</p>
                    <p className="text-[11px] text-muted-foreground truncate mt-0.5">{user.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link href="/profile">
                      <User className="size-3.5 mr-2" /> Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild className="text-red-500 focus:text-red-500 cursor-pointer">
                    <a href="/auth/logout">
                      <LogOut className="size-3.5 mr-2" /> Logout
                    </a>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <a
                href="/auth/login"
                className="hidden md:flex ml-1 items-center px-3 py-1.5 text-xs font-semibold bg-[#8b5cf6] hover:bg-[#7c3aed] text-white rounded-lg transition-colors duration-150"
              >
                Sign in
              </a>
            )}

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-muted-foreground hover:text-foreground hover:bg-accent size-8"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="size-3.5" /> : <Menu className="size-3.5" />}
            </Button>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="md:hidden border-t border-border bg-background px-4 py-3 flex flex-col gap-0.5 transition-colors duration-300">
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors duration-150"
              >
                {label}
              </Link>
            ))}
            <div className="pt-2 border-t border-border mt-1">
              {user ? (
                <a href="/auth/logout" className="px-3 py-2 text-sm font-medium text-red-500 hover:bg-accent rounded-lg transition-colors block">
                  Logout
                </a>
              ) : (
                <a href="/auth/login" className="px-3 py-2 text-sm font-medium text-[#8b5cf6] hover:bg-accent rounded-lg transition-colors block">
                  Sign in
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
