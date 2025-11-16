import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, BookOpen, Users, Zap, ShieldQuestion } from 'lucide-react';
const bridgeContent = [
  {
    icon: BookOpen,
    title: "Stuck in Your Meditation Practice?",
    description: "You've built a consistent practice, but now your sits feel flat, or difficult emotions are arising that you don't know how to handle. It might be time for a teacher.",
    cta: "Connect with a Mindfulness Teacher",
    link: "/discover?modality=Mindfulness&query=teacher"
  },
  {
    icon: Zap,
    title: "Beyond the Reiki Hand Positions",
    description: "You've completed your initial Reiki attunements and know the basic techniques, but you feel a calling to deepen your connection to the energy and refine your intuitive skills.",
    cta: "Find a Reiki Master for Mentorship",
    link: "/discover?modality=Reiki&query=master"
  },
  {
    icon: Users,
    title: "Your Tarot Journal is Full of Patterns",
    description: "You're pulling cards daily and seeing recurring themes, but you're struggling to synthesize the messages into actionable wisdom. A guide can help you see the bigger picture.",
    cta: "Get a Reading from a Tarot Expert",
    link: "/discover?modality=Tarot&query=reading"
  },
  {
    icon: ShieldQuestion,
    title: "Healing Crisis vs. Spiritual Awakening?",
    description: "Intense experiences can be part of the journey, but navigating them alone can be confusing and overwhelming. A trained guide can provide essential support and context.",
    cta: "Explore Somatic & Shamanic Guidance",
    link: "/discover?modality=Somatic+Healing&modality=Shamanic+Journeying"
  }
];
export function BridgePage() {
  return (
    <div className="bg-background text-foreground">
      <section className="bg-secondary border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-20 md:py-28 text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              From Information to Transformation
            </h1>
            <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
              Self-guided learning is a powerful start. When you're ready to move beyond a plateau and deepen your practice, personalized guidance is the key.
            </p>
          </div>
        </div>
      </section>
      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight">Common Plateaus on the Path</h2>
            <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
              Recognizing where you are is the first step toward your next breakthrough. See if any of these resonate with your journey.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {bridgeContent.map((item, index) => (
              <Card key={index} className="flex flex-col">
                <CardHeader className="flex-row items-start gap-4 space-y-0">
                  <div className="flex-shrink-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <item.icon className="h-6 w-6" />
                    </div>
                  </div>
                  <div>
                    <CardTitle>{item.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-between">
                  <p className="text-muted-foreground mb-6">{item.description}</p>
                  <Button asChild className="w-full mt-auto">
                    <Link to={item.link}>
                      {item.cta} <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}