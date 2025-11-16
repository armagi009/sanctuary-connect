import { Link, NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Feather } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/discover', label: 'Discover' },
  { to: '/community', label: 'Community' },
  { to: '/about', label: 'About' },
];
export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 text-xl font-bold text-foreground">
              <Feather className="h-6 w-6 text-primary" />
              <span className="hidden sm:inline">Sanctuary Connect</span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors hover:text-primary ${
                    isActive ? 'text-primary' : 'text-muted-foreground'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle className="relative" />
            <div className="hidden md:flex items-center gap-2">
              <Button variant="ghost">Log In</Button>
              <Button>Sign Up</Button>
            </div>
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <div className="flex flex-col space-y-4 p-4">
                    <Link to="/" className="flex items-center gap-2 text-lg font-bold">
                      <Feather className="h-6 w-6 text-primary" />
                      <span>Sanctuary Connect</span>
                    </Link>
                    <nav className="flex flex-col space-y-2">
                      {navLinks.map((link) => (
                        <NavLink
                          key={link.to}
                          to={link.to}
                          className={({ isActive }) =>
                            `text-base font-medium transition-colors hover:text-primary ${
                              isActive ? 'text-primary' : 'text-muted-foreground'
                            }`
                          }
                        >
                          {link.label}
                        </NavLink>
                      ))}
                    </nav>
                    <div className="border-t pt-4 flex flex-col space-y-2">
                      <Button variant="ghost">Log In</Button>
                      <Button>Sign Up</Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}