import './App.css'
import AppErrorBoundary from './components/AppErrorBoundary'
import SafeImage from './components/SafeImage'

function Hero() {
  return (
    <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white min-h-screen flex items-center">
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <SafeImage 
            src="/images/logo-horizontal.png" 
            alt="Prime Focus C.A.F.E. Logo" 
            className="mx-auto mb-8 h-20 w-auto"
          />
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            Prime Focus C.A.F.E.
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-slate-300 font-light">
            Clarity • Awareness • Focus • Energy
          </p>
          <p className="text-lg mb-12 text-slate-400 max-w-2xl mx-auto">
            A clean, daily liquid nootropic designed to support mental clarity, enhanced awareness, laser focus, and steady energy throughout your day.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
              Shop Now
            </button>
            <button className="border border-slate-500 hover:border-slate-400 text-slate-300 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

function Features() {
  const features = [
    {
      title: "Mental Clarity",
      description: "Clear mental fog and enhance cognitive function",
      icon: "🧠"
    },
    {
      title: "Enhanced Awareness", 
      description: "Heightened focus and mindful presence",
      icon: "👁️"
    },
    {
      title: "Laser Focus",
      description: "Sustained attention and concentration",
      icon: "🎯"
    },
    {
      title: "Steady Energy",
      description: "Balanced energy without crashes",
      icon: "⚡"
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            The Power of C.A.F.E.
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Experience the synergistic benefits of our carefully crafted nootropic blend
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-6 rounded-lg border border-slate-200 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-slate-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function About() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                Clean. Natural. Effective.
              </h2>
              <p className="text-lg text-slate-600 mb-6">
                Prime Focus C.A.F.E. represents a new generation of nootropics - clean, 
                natural ingredients carefully selected and blended to support optimal 
                cognitive function without the jitters or crashes of traditional stimulants.
              </p>
              <p className="text-lg text-slate-600 mb-8">
                Our liquid formula provides rapid absorption and bioavailability, 
                ensuring you get the maximum benefit from every drop.
              </p>
              <button className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                View Ingredients
              </button>
            </div>
            <div className="lg:text-right">
              <SafeImage 
                src="/images/PFC horizontal logo.png" 
                alt="Prime Focus C.A.F.E. Product" 
                className="rounded-lg shadow-lg max-w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section className="py-20 bg-slate-900 text-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-6">Ready to Focus?</h2>
        <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
          Join thousands who have transformed their daily performance with Prime Focus C.A.F.E.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
            Order Now
          </button>
          <button className="border border-slate-500 hover:border-slate-400 text-slate-300 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
            Contact Us
          </button>
        </div>
      </div>
    </section>
  )
}

function AppContent() {
  return (
    <div className="App">
      <Hero />
      <Features />
      <About />
      <Contact />
    </div>
  )
}

function App() {
  return (
    <AppErrorBoundary>
      <AppContent />
    </AppErrorBoundary>
  )
}

export default App
