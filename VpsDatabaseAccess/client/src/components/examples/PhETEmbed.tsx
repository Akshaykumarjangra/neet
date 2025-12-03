import { PhETEmbed } from '../PhETEmbed'

export default function PhETEmbedExample() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <PhETEmbed
        title="Projectile Motion"
        simUrl="https://phet.colorado.edu/sims/html/projectile-motion/latest/projectile-motion_en.html"
        subject="Physics"
        description="Explore projectile motion by firing various objects. Set the angle, initial speed, mass, and diameter. Add air resistance and observe how it affects the trajectory."
      />
    </div>
  )
}
