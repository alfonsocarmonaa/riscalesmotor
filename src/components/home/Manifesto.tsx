import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import manifestoImage from "@/assets/manifesto-lifestyle.jpg";

export function Manifesto() {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative aspect-square lg:aspect-[4/5] rounded-lg overflow-hidden">
            <img 
              src={manifestoImage} 
              alt="Persona con camiseta Riscales en un garaje vintage"
              loading="lazy"
              className="w-full h-full object-cover"
            />
            {/* Subtle overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
          </div>

          {/* Content */}
          <div className="space-y-6">
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-tight">
              Más que una camiseta
            </h2>
            
            <div className="w-16 h-0.5 bg-accent" />
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              En Riscales Motor Co. no solo rendimos homenaje a los vehículos clásicos. 
              Nuestra esencia va más allá del motor: es amor por lo que hacemos, 
              es arte en cada trazo, es diseño con alma.
            </p>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              Cada camiseta que creamos cuenta una historia. La historia de máquinas 
              que marcaron época, de emociones que perduran, de pasión que se transmite 
              de generación en generación.
            </p>

            <blockquote className="border-l-4 border-accent pl-6 py-2 my-8">
              <p className="font-display text-2xl md:text-3xl italic text-foreground">
                "Porque cada camiseta que llevas<br />cuenta una historia. La tuya."
              </p>
            </blockquote>

            <Button 
              asChild 
              className="bg-foreground text-background hover:bg-foreground/90 font-bold uppercase tracking-wide"
            >
              <Link to="/sobre-riscales">
                Conoce Nuestra Historia
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
