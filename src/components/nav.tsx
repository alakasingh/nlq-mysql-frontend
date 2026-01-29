import { useState } from "react";
import { Cpu, Menu, X } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex: 50,
        background: "transparent",
backdropFilter: "blur(12px)",
        

      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "1.25rem 1.5rem",
        }}
      >
        {/* Top Row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div
              style={{
                background: "linear-gradient(to bottom right, #06b6d4, #7c3aed)",
                padding: "0.6rem",
                borderRadius: "0.75rem",
                boxShadow: "0 8px 30px rgba(6,182,212,0.45)",
              }}
            >
              <Cpu size={22} color="white" />
            </div>

            <span
              style={{
                fontWeight: 900,
                fontSize: "1.15rem",
                background: "linear-gradient(to right, white, #a5f3fc)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              NLQ MySQL
            </span>
          </div>

          {/* Desktop Links */}
          <div className="desktop-nav">
            {["Product", "Features", "Docs"].map((item) => (
              <a key={item} href="#product">
                {item}
              </a>
            ))}
            <a href="/dashboard" className="cta">
              Sign In
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="mobile-toggle"
            aria-label="Toggle Menu"
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="mobile-menu">
            {["Product", "Features", "Docs"].map((item) => (
              <a key={item} href="#product">
                {item}
              </a>
            ))}
            <a href="/dashboard" className="cta">
              Sign In
            </a>
          </div>
        )}
      </div>

      {/* Styles */}
      <style>
        {`
          .desktop-nav {
            display: flex;
            align-items: center;
            gap: 2rem;
            font-size: 0.875rem;
            font-weight: 600;
          }

          .desktop-nav a {
            color: white;
            text-decoration: none;
            position: relative;
          }

          .desktop-nav a::after {
            content: "";
            position: absolute;
            width: 0;
            height: 2px;
            background: linear-gradient(to right, #06b6d4, #7c3aed);
            left: 0;
            bottom: -6px;
            transition: width 0.3s;
          }

          .desktop-nav a:hover::after {
            width: 100%;
          }

          .cta {
            padding: 0.55rem 1.4rem;
            border-radius: 9999px;
            background: linear-gradient(to right, #06b6d4, #7c3aed);
            color: white !important;
            box-shadow: 0 10px 30px rgba(6,182,212,0.45);
          }

          .mobile-toggle {
            display: none;
            background: none;
            border: none;
            color: white;
            cursor: pointer;
          }

          .mobile-menu {
            margin-top: 1rem;
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
            background: rgba(15,23,42,0.95);
            border-radius: 1rem;
            padding: 1rem;
          }

          .mobile-menu a {
            color: white;
            font-weight: 600;
            text-decoration: none;
            padding: 0.75rem;
            border-radius: 0.75rem;
            background: rgba(255,255,255,0.06);
          }

          @media (max-width: 768px) {
            .desktop-nav {
              display: none;
            }
            .mobile-toggle {
              display: block;
            }
          }
        `}
      </style>
    </nav>
  );
};

export default Navbar;
