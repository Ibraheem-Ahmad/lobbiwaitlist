import { useState, useEffect } from "react";
import { ChevronDown, Sprout, MapPin, Users, Filter, Coffee, Palette, Volleyball, Lightbulb, Check } from "lucide-react";
import WaitlistForm from "@/components/waitlist-form";
import SuccessModal from "@/components/success-modal";
import activityMapVideo from '../assets/activity_map_loop.mp4';
import lobbiesVideo from '../assets/join_lobbies_loop.mp4';
import filterVideo from '../assets/categories_loop.mp4';
import testimonialImage from '../assets/candid.png';

export default function Home() {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [animationStarted, setAnimationStarted] = useState(false);

  const scrollToForm = () => {
    const formElement = document.getElementById("waitlist-form");
    formElement?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // Start animations after component mounts
    setAnimationStarted(true);

    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    // Observe all slide-up elements
    document.querySelectorAll('.slide-up').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-background text-foreground font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-border" data-testid="navigation">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2" data-testid="logo">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Sprout className
                ="text-white text-sm" />
              </div>
              <span className="text-xl font-bold text-primary">Frenz</span>
            </div>
            <button 
              onClick={scrollToForm}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-lg font-medium transition-all duration-200"
              data-testid="button-join-waitlist-nav"
            >
              Join Waitlist
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-bg pt-16" data-testid="hero-section">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-16 h-16 border-2 border-white rounded-full floating-icon"></div>
          <div className="absolute top-40 right-20 w-12 h-12 bg-white/20 rounded-full floating-icon"></div>
          <div className="absolute bottom-32 left-1/4 w-20 h-20 border border-white rounded-lg floating-icon"></div>
          <div className="absolute bottom-20 right-1/3 w-14 h-14 bg-white/15 rounded-full floating-icon"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className={`fade-in ${animationStarted ? 'animate-in' : ''}`} style={{animationDelay: '0.2s'}}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight" data-testid="text-hero-title">
              Find Things to Do.<br />
              <span className="text-white/90">Meet New People.</span><br />
              <span className="text-white/80">Discover Your City.</span>
            </h1>
          </div>
          
          <div className={`fade-in ${animationStarted ? 'animate-in' : ''}`} style={{animationDelay: '0.4s'}}>
            <p className="text-xl sm:text-2xl text-white/90 mb-4 max-w-2xl mx-auto" data-testid="text-hero-subtitle">
              The map-based social discovery app that turns spontaneous moments into real connections
            </p>
            <p className="text-lg text-white/80 mb-8" data-testid="text-hero-location">
              Starting in Philadelphia • More cities coming soon
            </p>
          </div>

          {/* Waitlist Form */}
          <div className={`fade-in max-w-md mx-auto ${animationStarted ? 'animate-in' : ''}`} style={{animationDelay: '0.6s'}} id="waitlist-form">
            <WaitlistForm onSuccess={() => setShowSuccessModal(true)} />
            
            <p className="text-white/70 text-sm mt-4" data-testid="text-waitlist-count">
              Be among the first to join the waitlist
            </p>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/70 animate-bounce">
          <ChevronDown className="text-2xl" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background" data-testid="features-section">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 slide-up">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" data-testid="text-features-title">Why Frenz is Different</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="text-features-subtitle">
              Unlike typical event apps, Frenz is built for spontaneity and real connection
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="slide-up bg-white p-8 rounded-2xl shadow-lg border border-border hover:shadow-xl transition-all duration-300" style={{animationDelay: '0.1s'}} data-testid="card-feature-map">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                <MapPin className="text-primary text-2xl" />
              </div>
              <h3 className="text-2xl font-semibold mb-4" data-testid="text-feature-map-title">Live Activity Map</h3>
              <video
                src={activityMapVideo}         // import or public path
                className="rounded-xl mb-4 w-full h-96 object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label="Interactive map demo video"
                data-testid="video-feature-map"
              />
              <p className="text-muted-foreground" data-testid="text-feature-map-description">Browse a live map of activities, events, and hidden gems happening right now in your city.</p>
            </div>

            {/* Feature 2 */}
            <div className="slide-up bg-white p-8 rounded-2xl shadow-lg border border-border hover:shadow-xl transition-all duration-300" style={{animationDelay: '0.2s'}} data-testid="card-feature-lobbies">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                <Users className="text-primary text-2xl" />
              </div>
              <h3 className="text-2xl font-semibold mb-4" data-testid="text-feature-lobbies-title">Join or Create Lobbies</h3>
              <video
                src={lobbiesVideo}         // import or public path
                className="rounded-xl mb-4 w-full h-96 object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label="Interactive map demo video"
                data-testid="video-feature-map"
              />
              <p className="text-muted-foreground" data-testid="text-feature-lobbies-description">Join small group meetups or create your own lobby to rally people around activities you love.</p>
            </div>

            {/* Feature 3 */}
            <div className="slide-up bg-white p-8 rounded-2xl shadow-lg border border-border hover:shadow-xl transition-all duration-300" style={{animationDelay: '0.3s'}} data-testid="card-feature-filter">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                <Filter className="text-primary text-2xl" />
              </div>
              <h3 className="text-2xl font-semibold mb-4" data-testid="text-feature-filter-title">Find Your Vibe</h3>
              <video
                src={filterVideo}         // import or public path
                className="rounded-xl mb-4 w-full h-96 object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label="Interactive map demo video"
                data-testid="video-feature-map"
              />
              <p className="text-muted-foreground" data-testid="text-feature-filter-description">Filter by categories like Outdoors, Social, Creative, and Interest to discover exactly what you're looking for.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Activity Categories */}
      <section className="py-20 bg-muted" data-testid="categories-section">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 slide-up">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" data-testid="text-categories-title">Activities for Everyone</h2>
            <p className="text-xl text-muted-foreground" data-testid="text-categories-subtitle">From pickup basketball to coffee chats, find your perfect activity</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="slide-up bg-white p-6 rounded-2xl text-center hover:shadow-lg transition-all duration-300" style={{animationDelay: '0.1s'}} data-testid="card-category-social">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Volleyball className="text-orange-500 text-2xl" />
              </div>
              <h3 className="font-semibold mb-2" data-testid="text-category-social-title">Social</h3>
              <p className="text-sm text-muted-foreground" data-testid="text-category-social-description">Pickup games, group workouts, sports activities</p>
            </div>

            <div className="slide-up bg-white p-6 rounded-2xl text-center hover:shadow-lg transition-all duration-300" style={{animationDelay: '0.2s'}} data-testid="card-category-creative">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Palette className="text-purple-500 text-2xl" />
              </div>
              <h3 className="font-semibold mb-2" data-testid="text-category-creative-title">Creative</h3>
              <p className="text-sm text-muted-foreground" data-testid="text-category-creative-description">Art workshops, music sessions, creative meetups</p>
            </div>

            <div className="slide-up bg-white p-6 rounded-2xl text-center hover:shadow-lg transition-all duration-300" style={{animationDelay: '0.3s'}} data-testid="card-category-everyday">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Coffee className="text-blue-500 text-2xl" />
              </div>
              <h3 className="font-semibold mb-2" data-testid="text-category-everyday-title">Everyday</h3>
              <p className="text-sm text-muted-foreground" data-testid="text-category-everyday-description">Coffee chats, morning jogs, casual hangouts</p>
            </div>

            <div className="slide-up bg-white p-6 rounded-2xl text-center hover:shadow-lg transition-all duration-300" style={{animationDelay: '0.4s'}} data-testid="card-category-interest">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="text-green-500 text-2xl" />
              </div>
              <h3 className="font-semibold mb-2" data-testid="text-category-interest-title">Interest</h3>
              <p className="text-sm text-muted-foreground" data-testid="text-category-interest-description">Niche hobbies, special interests, unique activities</p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 bg-background" data-testid="social-proof-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="slide-up">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6" data-testid="text-social-proof-title">Starting Right Here in Philadelphia</h2>
            <p className="text-lg text-muted-foreground mb-8">Founded by a Philly native, your feedback is welcome - DM @zaratbuilds on Instagram</p>
          </div>

          <div className="grid sm:grid-cols-3 gap-8 mb-16">
            <div className="slide-up" style={{animationDelay: '0.1s'}} data-testid="stat-waitlist">
              <div className="text-4xl font-bold text-primary mb-2" data-testid="text-stat-waitlist-count">50+</div>
              <p className="text-muted-foreground" data-testid="text-stat-waitlist-label">People on waitlist</p>
            </div>
            <div className="slide-up" style={{animationDelay: '0.2s'}} data-testid="stat-cities">
              <div className="text-4xl font-bold text-primary mb-2" data-testid="text-stat-cities-count">1</div>
              <p className="text-muted-foreground" data-testid="text-stat-cities-label">City ready to launch</p>
            </div>
            <div className="slide-up" style={{animationDelay: '0.3s'}} data-testid="stat-activities">
              <div className="text-4xl font-bold text-primary mb-2" data-testid="text-stat-activities-count">100+</div>
              <p className="text-muted-foreground" data-testid="text-stat-activities-label">Activities mapped</p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg border border-border slide-up" style={{animationDelay: '0.4s'}} data-testid="testimonial">
            <img 
              src={testimonialImage}
              alt="Group of people at social meetup" 
              className="rounded-xl w-full h-64 object-cover mb-6" 
              data-testid="img-testimonial"
            />
            <blockquote className="text-lg italic text-muted-foreground mb-4" data-testid="text-testimonial-quote">
              "After college, it felt almost impossible to make new friends. Everyone seemed busy with work or stuck in their own circles. When I found Frenz, it was such a relief. I joined a food hopping lobby just for fun, thinking I’d try a few new spots, but it turned into one of the best nights I’ve had in the city. We went from dumplings to tacos to dessert, and by the end I’d made a group of friends I still keep in touch with. Honestly, it’s exactly what our city needed."
            </blockquote>
            <div className="flex items-center justify-center">
              <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
              <div className="text-left">
                <div className="font-semibold" data-testid="text-testimonial-author">Yassine M.</div>
                <div className="text-sm text-muted-foreground" data-testid="text-testimonial-role">Beta Tester, Philadelphia</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 gradient-bg" data-testid="final-cta-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="slide-up">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6" data-testid="text-final-cta-title">
              Ready to Discover Your City?
            </h2>
            <p className="text-xl text-white/90 mb-8" data-testid="text-final-cta-subtitle">
              Be among the first to experience spontaneous social discovery
            </p>
            
            <button 
              onClick={scrollToForm}
              className="bg-white hover:bg-white/90 text-primary font-semibold px-12 py-4 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg text-lg"
              data-testid="button-join-waitlist-cta"
            >
              Join the Waitlist Now
            </button>
            
            <p className="text-white/70 text-sm mt-6" data-testid="text-final-cta-benefits">
              Get early access • Exclusive updates • Help shape the future
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-foreground text-white" data-testid="footer">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0" data-testid="footer-logo">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Sprout className="text-white text-sm" />
              </div>
              <span className="text-xl font-bold">Frenz</span>
            </div>
            <div className="text-center md:text-right">
              <p className="text-white/70" data-testid="text-footer-copyright">&copy; 2024 Frenz. All rights reserved.</p>
              <p className="text-white/70 text-sm" data-testid="text-footer-tagline">Building the future of social discovery</p>
            </div>
          </div>
        </div>
      </footer>

      <SuccessModal 
        isOpen={showSuccessModal} 
        onClose={() => setShowSuccessModal(false)} 
      />
    </div>
  );
}
