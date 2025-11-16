import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, ArrowRight, HeartHandshake, ShieldCheck, Sparkles } from 'lucide-react';
import { PractitionerCard } from '@/components/PractitionerCard';
import { MOCK_PRACTITIONERS } from '@/data/mockData';
export function HomePage() {
  const featuredPractitioners = MOCK_PRACTITIONERS.slice(0, 3);
  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative bg-secondary">
        <div className="absolute inset-0 opacity-50" style={{backgroundImage: 'radial-gradient(circle, rgba(196, 164, 132, 0.1) 0%, transparent 60%)'}}></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="py-24 md:py-32 lg:py-40 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-tight">
              Find Your Path to <span className="text-primary">Healing</span> and <span className="text-primary">Growth</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground">
              Connect with verified, compassionate practitioners for spiritual guidance, meditation, and holistic healing services.
            </p>
            <div className="mt-8 max-w-xl mx-auto flex flex-col sm:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input placeholder="Search by modality (e.g., Reiki, Tarot)" className="pl-12 h-12 text-base" />
              </div>
              <Button size="lg" className="h-12" asChild>
                <Link to="/discover">
                  Discover Practitioners
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight">A Sacred Space for Connection</h2>
            <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
              We're more than a marketplace. We're a community built on trust, authenticity, and shared intention.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary mx-auto">
                <HeartHandshake className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-lg font-semibold">Authentic Connections</h3>
              <p className="mt-2 text-muted-foreground">
                Discover practitioners whose philosophies and modalities resonate with your personal journey.
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary mx-auto">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-lg font-semibold">Verified & Trusted</h3>
              <p className="mt-2 text-muted-foreground">
                Every practitioner is carefully vetted, with verified credentials and a commitment to ethical practice.
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary mx-auto">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-lg font-semibold">Transformative Experiences</h3>
              <p className="mt-2 text-muted-foreground">
                Engage in sessions designed for deep presence, security, and profound personal insight.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Featured Practitioners Section */}
      <section className="bg-secondary py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight">Featured Practitioners</h2>
            <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
              Explore a selection of highly-rated practitioners from our community.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPractitioners.map((practitioner) => (
              <PractitionerCard key={practitioner.id} practitioner={practitioner} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button asChild size="lg" variant="outline">
              <Link to="/discover">
                Explore All Practitioners <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight">Ready to Begin Your Journey?</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Join Sanctuary Connect today to find the support you need or to share your unique gifts with the world.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button asChild size="lg">
              <Link to="/discover">Find a Practitioner</Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link to="/apply">Join as a Practitioner</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}