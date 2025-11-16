import { Link } from 'react-router-dom';
import { Feather, Twitter, Instagram, Facebook } from 'lucide-react';
export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 text-xl font-bold">
              <Feather className="h-6 w-6 text-primary" />
              <span>Sanctuary Connect</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Your trusted space for healing and connection.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary"><Twitter size={20} /></a>
              <a href="#" className="text-muted-foreground hover:text-primary"><Instagram size={20} /></a>
              <a href="#" className="text-muted-foreground hover:text-primary"><Facebook size={20} /></a>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase">Seekers</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="/discover" className="text-sm text-muted-foreground hover:text-primary">Find a Practitioner</Link></li>
              <li><Link to="/community" className="text-sm text-muted-foreground hover:text-primary">Community</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase">Practitioners</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="/apply" className="text-sm text-muted-foreground hover:text-primary">Join as a Practitioner</Link></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary">Our Pledge</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary">Resources</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase">Company</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary">About Us</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary">Contact</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Sanctuary Connect. All rights reserved.</p>
          <p className="mt-1">Built with ❤️ at Cloudflare</p>
        </div>
      </div>
    </footer>
  );
}