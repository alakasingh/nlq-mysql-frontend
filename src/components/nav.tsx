import { useState } from "react";
import { Menu, X, Cpu } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex: 50,
        background: "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(203, 213, 225, 0.5)",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0.25rem 0.5rem",
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
          <div style={{ display: "flex", alignItems: "center", gap: "0.01rem" }}>
            <img src="/db.png" alt="OpenDB Logo" height={52} width={52} style={{ display: 'block' }} />

            <span
              style={{
                fontWeight: 900,
                fontSize: "1.25rem",
                color: "#0a173a",
              }}
            >
              OpenDB
            </span>
          </div>

          {/* Desktop Links */}
          <div className="desktop-nav">
            <a href="/auth" className="">
              Register
            </a>
            <a href="/auth" className="cta">
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
           
            <a href="/auth" className="cta" style={{ textAlign: "center" }}>
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
            color: #0f172a;
            text-decoration: none;
            position: relative;
          }

          .desktop-nav a::after {
            content: "";
            position: absolute;
            width: 0;
            height: 2px;
            background: linear-gradient(to right, #1e3a8a, #3b82f6);
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
            background: linear-gradient(to right, #1e3a8a, #3b82f6);
            color: white !important;
            box-shadow: 0 4px 15px rgba(37, 99, 235, 0.3);
            border: none;
            transition: transform 0.2s, box-shadow 0.2s;
          }

          .cta:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(37, 99, 235, 0.4);
          }

          .cta::after {
            display: none !important;
          }

          .mobile-toggle {
            display: none;
            background: none;
            border: none;
            color: #0f172a;
            cursor: pointer;
          }

          .mobile-menu {
            margin-top: 1rem;
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
            background: rgba(255, 255, 255, 0.95);
            border: 1px solid rgba(203, 213, 225, 0.5);
            border-radius: 1rem;
            padding: 1rem;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
          }

          .mobile-menu a {
            color: #0f172a;
            font-weight: 600;
            text-decoration: none;
            padding: 0.75rem;
            border-radius: 0.75rem;
            background: rgba(241, 245, 249, 1);
            transition: background 0.2s;
          }

          .mobile-menu a:hover {
             background: rgba(226, 232, 240, 1);
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
