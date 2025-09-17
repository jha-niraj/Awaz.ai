import { Star, Quote, TrendingUp, Users } from "lucide-react"

export function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "Our payment collection improved by 40% after using voice reminders in Hindi. Customers appreciate the personal touch!",
      author: "Priya Sharma",
      role: "Kirana Shop Owner",
      location: "Mumbai",
      rating: 5,
      metric: "40% better collection",
      avatar: "PS",
    },
    {
      quote:
        "Appointment no-shows dropped significantly. The automated Marathi reminders work perfectly for our local patients.",
      author: "Dr. Ramesh Kumar",
      role: "Clinic Manager",
      location: "Pune",
      rating: 5,
      metric: "60% fewer no-shows",
      avatar: "RK",
    },
    {
      quote:
        "Festival promotions in Bengali brought 3x more customers. The voice quality is amazing - sounds completely natural!",
      author: "Asha Patel",
      role: "Boutique Owner",
      location: "Kolkata",
      rating: 5,
      metric: "3x more customers",
      avatar: "AP",
    },
    {
      quote: "Credit reminders in Nepali helped us recover ₹2 lakhs in pending payments. ROI was incredible!",
      author: "Bikash Thapa",
      role: "Electronics Store",
      location: "Kathmandu",
      rating: 5,
      metric: "₹2L recovered",
      avatar: "BT",
    },
    {
      quote: "The Tamil voice sequences for our delivery updates reduced customer calls by 70%. Saves us so much time!",
      author: "Meera Krishnan",
      role: "Restaurant Owner",
      location: "Chennai",
      rating: 5,
      metric: "70% fewer calls",
      avatar: "MK",
    },
    {
      quote:
        "Wedding booking confirmations in Telugu increased our conversion rate. Customers love the personal touch!",
      author: "Suresh Reddy",
      role: "Event Planner",
      location: "Hyderabad",
      rating: 5,
      metric: "25% higher conversion",
      avatar: "SR",
    },
  ]

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Users className="h-4 w-4" />
            <span>Trusted by 500+ Local Businesses</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-balance mb-4">Real Results from Real Businesses</h2>
          <p className="text-xl text-muted-foreground text-pretty">
            See how local businesses across India & Nepal are growing with AI voice outreach.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group bg-card/50 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-border hover:shadow-2xl hover:scale-105 transition-all duration-300 hover:border-primary/20"
            >
              {/* Quote icon */}
              <div className="flex items-center justify-between mb-6">
                <Quote className="h-8 w-8 text-primary/30 group-hover:text-primary/50 transition-colors" />
                <div className="flex items-center space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>

              {/* Metric highlight */}
              <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold mb-4">
                <TrendingUp className="h-3 w-3" />
                <span>{testimonial.metric}</span>
              </div>

              {/* Quote */}
              <blockquote className="text-lg mb-6 text-pretty leading-relaxed group-hover:text-foreground transition-colors">
                "{testimonial.quote}"
              </blockquote>

              {/* Author info */}
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center shadow-lg">
                  <span className="font-bold text-white text-sm">{testimonial.avatar}</span>
                </div>
                <div>
                  <div className="font-semibold text-foreground">{testimonial.author}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  <div className="text-xs text-muted-foreground flex items-center space-x-1">
                    <span>📍</span>
                    <span>{testimonial.location}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-2">
            <div className="text-3xl font-bold text-primary">500+</div>
            <div className="text-sm text-muted-foreground">Active Businesses</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-primary">50K+</div>
            <div className="text-sm text-muted-foreground">Calls Delivered</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-primary">95%</div>
            <div className="text-sm text-muted-foreground">Success Rate</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-primary">4.9/5</div>
            <div className="text-sm text-muted-foreground">Average Rating</div>
          </div>
        </div>
      </div>
    </section>
  )
}