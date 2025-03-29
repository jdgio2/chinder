
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Heart, MapPin, User, Church } from "lucide-react";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  const navItems = [
    { icon: Home, path: "/", label: "Home" },
    { icon: Church, path: "/discover", label: "Discover" },
    { icon: Heart, path: "/saved", label: "Saved" },
    { icon: MapPin, path: "/visits", label: "Visits" },
    { icon: User, path: "/profile", label: "Profile" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b border-border">
        <div className="container mx-auto flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <Church className="h-6 w-6 text-church-purple" />
            <h1 className="text-xl font-bold bg-gradient-to-r from-church-purple to-church-blue bg-clip-text text-transparent">
              ChurchConnect
            </h1>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto py-6 px-4">{children}</main>

      <footer className="border-t border-border">
        <nav className="container mx-auto">
          <ul className="flex justify-between items-center py-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex flex-col items-center p-2 ${
                      isActive
                        ? "text-church-purple"
                        : "text-muted-foreground hover:text-church-purple"
                    }`}
                  >
                    <Icon className="h-6 w-6" />
                    <span className="text-xs mt-1">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </footer>
    </div>
  );
};

export default Layout;
