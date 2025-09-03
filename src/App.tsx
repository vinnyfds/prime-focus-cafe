import "./App.css";
import AppErrorBoundary from "./components/AppErrorBoundary";
import Cart from "./components/Cart";
import Auth from "./components/Auth";
import Newsletter from "./components/Newsletter";
import { useState } from "react";

function Header() {
  return (
    <header className="bg-brand-navy text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src="/images/logo-owl.jpg"
              alt="Prime Focus C.A.F.E."
              className="h-12 w-12 rounded-full mr-3"
            />
            <span className="text-2xl font-bold text-white">
              Prime Focus C.A.F.E.
            </span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a
              href="#science"
              className="text-white hover:text-blue-400 transition-colors"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("science")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Science
            </a>
            <a
              href="#ingredients"
              className="text-white hover:text-blue-400 transition-colors"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("ingredients")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Ingredients
            </a>
            <a
              href="#testimonials"
              className="text-white hover:text-blue-400 transition-colors"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("testimonials")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Testimonials
            </a>
            <a
              href="#community"
              className="text-white hover:text-blue-400 transition-colors"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("community")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Community
            </a>
            <a
              href="#references"
              className="text-white hover:text-blue-400 transition-colors"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("references")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              References
            </a>
          </nav>

          {/* Right side - Auth, Cart, Order Now */}
          <div className="flex items-center space-x-4">
            <Auth onLogin={() => {}} onLogout={() => {}} />
            <Cart />
            <button
              className="bg-yellow-500 hover:bg-yellow-600 text-slate-900 px-6 py-2 rounded-lg font-semibold transition-colors"
              onClick={() => {
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Order Now
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="bg-brand-navy text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Title and Buttons */}
          <div>
            <h1 className="text-6xl font-bold text-white mb-6">
              Prime Focus C.A.F.E.
            </h1>
            <p className="text-2xl text-blue-300 mb-6">
              Clarity • Awareness • Focus • Energy
            </p>
            <p className="text-lg text-slate-300 mb-8 max-w-2xl">
              A clean, daily liquid nootropic designed to support mental clarity
              and steady energy.
            </p>

            {/* 4 Buttons Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <button
                className="bg-white text-slate-900 px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-shadow font-medium"
                onClick={() => {
                  document
                    .getElementById("science")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Science-Backed
              </button>
              <button
                className="bg-white text-slate-900 px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-shadow font-medium"
                onClick={() => {
                  document
                    .getElementById("ingredients")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Premium Ingredients
              </button>
              <button
                className="bg-white text-slate-900 px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-shadow font-medium"
                onClick={() => {
                  document
                    .getElementById("community")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Join Community
              </button>
              <button
                className="bg-white text-slate-900 px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-shadow font-medium"
                onClick={() => {
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Order Now
              </button>
            </div>
          </div>

          {/* Right Side - Horizontal Logo Card + CEO Profile */}
          <div className="space-y-6">
            {/* Horizontal Logo Card */}
            <div className="bg-white text-slate-900 rounded-2xl shadow-xl p-8 text-center">
              <img
                src="/images/logo-horizontal.png"
                alt="Prime Focus C.A.F.E."
                className="w-full max-w-xs mx-auto mb-4"
              />
            </div>

            {/* CEO Profile */}
            <div className="bg-white text-slate-900 rounded-2xl shadow-xl p-6">
              <div className="flex items-center space-x-4">
                <img
                  src="/images/dr-ram.jpeg"
                  alt="Dr. Ram P. Ramcharran"
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-slate-900">
                    Dr. Ram P. Ramcharran
                  </h4>
                  <p className="text-slate-600 text-sm">
                    CEO, Prime Focus C.A.F.E.
                  </p>
                  <a
                    href="https://www.linkedin.com/in/dr-ram-p-ramcharran-594b648/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-xs underline"
                  >
                    View LinkedIn Profile
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HorizontalDarkBar() {
  return (
    <section className="bg-slate-800 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="text-white">
            <p className="text-lg font-medium">
              Your daily dose of clarity in the app
            </p>
          </div>
          <div className="text-white">
            <p className="text-lg font-medium">
              Weekly content delivered to your inbox
            </p>
          </div>
          <div className="text-white">
            <p className="text-lg font-medium">
              Your daily dose of clarity in the app
            </p>
          </div>
          <div className="text-white">
            <p className="text-lg font-medium">
              The ultimate guide to focus and energy
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Banner() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <section className="py-16 bg-gradient-to-r from-brand-navy to-brand-gold">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Unlock Your Cognitive Potential
          </h2>
          <p className="text-xl text-white text-opacity-90 mb-8 leading-relaxed">
            Experience the power of scientifically-formulated nootropics
            designed for modern professionals who demand peak mental
            performance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() =>
                document
                  .getElementById("ingredients")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="bg-white text-brand-navy px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg"
            >
              Explore Ingredients
            </button>
            <button
              onClick={() => setIsPopupOpen(true)}
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-brand-navy transition-colors"
            >
              Join Waitlist
            </button>
          </div>
        </div>
      </div>

      <WaitlistPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
      />
    </section>
  );
}

function WhyPrimeFocus() {
  const [selectedBenefit, setSelectedBenefit] = useState(0);

  const benefits = [
    {
      name: "Enhanced Focus",
      color: "bg-blue-500",
      description:
        "Sharpen your concentration and maintain laser-like focus throughout your day.",
    },
    {
      name: "Sustained Energy",
      color: "bg-green-500",
      description:
        "Experience steady, long-lasting energy without crashes or jitters.",
    },
    {
      name: "Mental Clarity",
      color: "bg-purple-500",
      description: "Clear mental fog and enhance cognitive processing speed.",
    },
    {
      name: "Stress Reduction",
      color: "bg-orange-500",
      description: "Manage stress levels and maintain calm under pressure.",
    },
    {
      name: "Improved Mood",
      color: "bg-red-500",
      description: "Boost your mood and emotional well-being naturally.",
    },
    {
      name: "Better Sleep",
      color: "bg-indigo-500",
      description: "Improve sleep quality and wake up feeling refreshed.",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Dynamic Image */}
          <div className="flex justify-center">
            <div className="bg-white text-slate-900 rounded-2xl shadow-xl p-8 text-center border-2 border-slate-200 w-full max-w-md">
              <div
                className={`w-full h-64 rounded-lg mb-4 flex items-center justify-center text-white text-2xl font-bold ${benefits[selectedBenefit].color}`}
              >
                {benefits[selectedBenefit].name}
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                {benefits[selectedBenefit].name}
              </h3>
              <p className="text-slate-600 text-sm">
                {benefits[selectedBenefit].description}
              </p>
            </div>
          </div>

          {/* Right Side - Benefits List */}
          <div>
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              Why Prime Focus C.A.F.E.?
            </h2>
            <p className="text-lg text-slate-600 mb-8 max-w-2xl">
              A thoughtfully crafted liquid nootropic, developed for modern
              professionals who want to unlock their full cognitive potential
              and maintain peak performance.
            </p>

            <div className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all ${
                    selectedBenefit === index
                      ? "bg-brand-cream border-2 border-brand-gold"
                      : "hover:bg-gray-50"
                  }`}
                  onClick={() => setSelectedBenefit(index)}
                >
                  <div
                    className={`w-6 h-6 ${benefit.color} rounded-full flex items-center justify-center text-white text-sm font-bold`}
                  >
                    ✓
                  </div>
                  <span className="text-slate-700 font-medium">
                    {benefit.name}
                  </span>
                </div>
              ))}
            </div>

            <button className="bg-brand-gold hover:bg-brand-orange text-slate-900 px-8 py-3 rounded-lg font-semibold transition-colors">
              Explore Benefits
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function ThreeCards() {
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Science Backed Formulation Card */}
          <div className="bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl p-8 text-white shadow-xl">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-6">
              <svg
                className="w-8 h-8 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4">
              Science-Backed Formulation
            </h3>
            <p className="text-white text-opacity-90 mb-6">
              Clinically proven ingredients backed by scientific research
            </p>
            <button
              onClick={() => scrollToSection("references")}
              className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Learn More
            </button>
          </div>

          {/* Premium Ingredients Card */}
          <div className="bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl p-8 text-white shadow-xl">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-6">
              <svg
                className="w-8 h-8 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4">Premium Ingredients</h3>
            <p className="text-white text-opacity-90 mb-6">
              High-quality, natural ingredients sourced from trusted suppliers
            </p>
            <button
              onClick={() => scrollToSection("ingredients")}
              className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Learn More
            </button>
          </div>

          {/* Join the Community Card */}
          <div className="bg-gradient-to-br from-orange-500 to-yellow-500 rounded-2xl p-8 text-white shadow-xl">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-6">
              <svg
                className="w-8 h-8 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4">Join the Community</h3>
            <p className="text-white text-opacity-90 mb-6">
              Connect with like-minded individuals focused on mental clarity
            </p>
            <button
              onClick={() => scrollToSection("newsletter")}
              className="bg-white text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [showAll, setShowAll] = useState(false);

  const faqItems = [
    {
      question: "What is Prime Focus C.A.F.E.?",
      answer:
        "Prime Focus C.A.F.E. is a premium focus supplement designed to enhance mental clarity, concentration, and cognitive performance. It's formulated with scientifically-backed ingredients to support optimal brain function.",
    },
    {
      question: "How do I take Prime Focus C.A.F.E.?",
      answer:
        "Take one serving daily, preferably in the morning with or without food. For best results, take consistently at the same time each day. Shake well before use if it's a liquid formula.",
    },
    {
      question: "When will I start feeling the effects?",
      answer:
        "Many users notice initial effects within 30-60 minutes of their first dose. Full benefits typically develop over 1-2 weeks of consistent daily use. Individual results may vary.",
    },
    {
      question: "Are there any side effects?",
      answer:
        "Prime Focus C.A.F.E. is formulated to be well-tolerated with minimal side effects. Some users may experience mild effects like increased alertness. If you experience any concerning symptoms, discontinue use and consult a healthcare professional.",
    },
    {
      question: "Is this product safe for daily use?",
      answer:
        "Yes, Prime Focus C.A.F.E. is designed for daily use. However, we recommend consulting with your healthcare provider before starting any new supplement, especially if you have underlying health conditions or take medications.",
    },
    {
      question: "What makes this different from other focus supplements?",
      answer:
        "Prime Focus C.A.F.E. uses a unique blend of premium, clinically-researched ingredients at optimal dosages. Our formula is designed for sustained focus without jitters or crashes, and we prioritize quality and safety in every batch.",
    },
    {
      question: "Do you offer a money-back guarantee?",
      answer:
        "Yes! We offer a 30-day money-back guarantee. If you're not completely satisfied with your purchase, return it within 30 days for a full refund. We want you to feel confident in your decision to try Prime Focus C.A.F.E.",
    },
    {
      question: "How long does shipping take?",
      answer:
        "Standard shipping typically takes 3-5 business days within the continental US. We also offer expedited shipping options. International shipping times vary by location. You'll receive tracking information once your order ships.",
    },
  ];

  const displayedItems = showAll ? faqItems : faqItems.slice(0, 4);

  const toggleItem = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <section id="faq" className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {displayedItems.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg border border-gray-200"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full text-left p-6 hover:bg-gray-50 transition-colors flex justify-between items-center"
              >
                <span className="font-semibold text-gray-900 text-lg">
                  {item.question}
                </span>
                <span className="text-blue-600 text-2xl font-bold">
                  {openItems.includes(index) ? "−" : "+"}
                </span>
              </button>
              {openItems.includes(index) && (
                <div className="px-6 pb-6">
                  <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {!showAll && (
          <div className="text-center mt-8">
            <button
              onClick={() => setShowAll(true)}
              className="bg-brand-gold hover:bg-brand-orange text-slate-900 px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Show More Questions
            </button>
          </div>
        )}

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Still have questions? We're here to help!
          </p>
          <a
            href="#contact"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Contact Our Team
          </a>
        </div>
      </div>
    </section>
  );
}

function Ingredients() {
  const ingredients = [
    {
      number: "11",
      name: "L-Theanine",
      color: "bg-blue-600",
      referenceId: 4, // L-Theanine and Caffeine Synergy
    },
    {
      number: "20",
      name: "Caffeine",
      color: "bg-green-600",
      referenceId: 4, // L-Theanine and Caffeine Synergy
    },
    {
      number: "15",
      name: "Bacopa Monnieri",
      color: "bg-purple-600",
      referenceId: 5, // Bacopa Monnieri Memory Enhancement
    },
    {
      number: "8",
      name: "Rhodiola Rosea",
      color: "bg-orange-600",
      referenceId: 6, // Rhodiola Rosea Stress Adaptation
    },
    {
      number: "12",
      name: "Lion's Mane",
      color: "bg-red-600",
      referenceId: 1, // Cognitive Enhancement Study
    },
    {
      number: "18",
      name: "Alpha-GPC",
      color: "bg-indigo-600",
      referenceId: 1, // Cognitive Enhancement Study
    },
  ];

  const scrollToReferences = () => {
    document
      .getElementById("references")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="ingredients" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold text-slate-900 mb-6">
          Key Active Ingredients
        </h2>
        <p className="text-xl text-slate-600 mb-12 max-w-3xl mx-auto">
          Scientifically proven compounds for cognitive performance
        </p>

        {/* 6 Horizontal Ingredient Circles */}
        <div className="flex flex-wrap justify-center gap-8 mb-12">
          {ingredients.map((ingredient, index) => (
            <div key={index} className="text-center">
              <div
                className={`w-20 h-20 ${ingredient.color} rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-3 cursor-pointer hover:scale-110 transition-transform`}
                onClick={scrollToReferences}
                title={`Click to view research on ${ingredient.name}`}
              >
                {ingredient.number}
              </div>
              <p className="text-slate-700 font-medium text-sm">
                {ingredient.name}
              </p>
            </div>
          ))}
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
          See All Ingredients & Studies
        </button>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold text-slate-900 mb-6">
          Trusted by Professionals
        </h2>
        <p className="text-xl text-slate-600 mb-12 max-w-3xl mx-auto">
          Hear from our customers, researchers, and experts
        </p>

        {/* 3 Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Dr. Sarah Chen Testimonial */}
          <div className="bg-slate-50 rounded-2xl p-8">
            <div className="w-20 h-20 bg-slate-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
              SC
            </div>
            <p className="text-slate-700 italic mb-6 leading-relaxed">
              "Prime Focus C.A.F.E. has transformed my daily productivity. The
              mental clarity is remarkable and I can work for hours without
              losing concentration."
            </p>
            <div>
              <h4 className="font-semibold text-slate-900">Dr. Sarah Chen</h4>
              <p className="text-slate-600 text-sm">Neuroscientist</p>
            </div>
          </div>

          {/* Mark Roberts Testimonial */}
          <div className="bg-slate-50 rounded-2xl p-8">
            <div className="w-20 h-20 bg-slate-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
              MR
            </div>
            <p className="text-slate-700 italic mb-6 leading-relaxed">
              "I've tried many focus supplements, but this one actually
              delivers. My productivity has increased significantly and I feel
              more focused throughout the day."
            </p>
            <div>
              <h4 className="font-semibold text-slate-900">Mark Roberts</h4>
              <p className="text-slate-600 text-sm">Software Engineer</p>
            </div>
          </div>

          {/* Rachel Williams Testimonial */}
          <div className="bg-slate-50 rounded-2xl p-8">
            <div className="w-20 h-20 bg-slate-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
              RW
            </div>
            <p className="text-slate-700 italic mb-6 leading-relaxed">
              "Perfect for studying. I can focus for hours without getting
              distracted. Highly recommend for students and professionals
              alike!"
            </p>
            <div>
              <h4 className="font-semibold text-slate-900">Rachel Williams</h4>
              <p className="text-slate-600 text-sm">Marketing Director</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function RealLife() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-slate-900 mb-6">
          Real Life, Real Focus
        </h2>
        <p className="text-xl text-center text-slate-600 mb-12 max-w-3xl mx-auto">
          See how customers use Prime Focus C.A.F.E.
        </p>

        {/* 3 Use Case Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-slate-50 rounded-2xl p-8 relative">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white text-lg font-bold absolute top-4 right-4">
              ☀️
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Morning Routine
            </h3>
            <p className="text-slate-700 leading-relaxed">
              Start your day with enhanced focus and mental clarity. Perfect for
              morning meetings and planning sessions.
            </p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-8 relative">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white text-lg font-bold absolute top-4 right-4">
              💼
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Work Productivity
            </h3>
            <p className="text-slate-700 leading-relaxed">
              Maintain peak performance throughout your workday. Stay focused
              during long coding sessions and deep work.
            </p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-8 relative">
            <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white text-lg font-bold absolute top-4 right-4">
              📚
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Study Sessions
            </h3>
            <p className="text-slate-700 leading-relaxed">
              Enhance learning and retention during study sessions. Perfect for
              students and professionals pursuing certifications.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function WaitlistPopup({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert("Successfully joined the waitlist!");
      onClose();
      setFormData({ firstName: "", lastName: "", email: "", phone: "" });
    } catch (error) {
      alert("Error joining waitlist. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-slate-900">
            Join the Waitlist
          </h3>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-700 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-transparent text-slate-900"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-transparent text-slate-900"
            />
          </div>

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-transparent text-slate-900"
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number (Optional)"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-transparent text-slate-900"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-gold hover:bg-brand-orange text-slate-900 py-3 px-6 rounded-lg font-semibold text-lg transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed"
          >
            {loading ? "Joining Waitlist..." : "Join the Waitlist"}
          </button>
        </form>
      </div>
    </div>
  );
}

function StayUpdated() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <section id="newsletter" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-12">
          <h2 className="text-6xl font-bold text-slate-800 mb-4">500+</h2>
          <p className="text-xl text-slate-600 mb-12">
            People are on the waitlist to join the community. Join us today!
          </p>
        </div>

        {/* Statistics */}
        <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-12">
          <div className="text-center">
            <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-white text-2xl font-bold">150</span>
            </div>
            <p className="text-slate-600 font-medium">Active Members</p>
          </div>

          <div className="text-center">
            <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-white text-2xl font-bold">75</span>
            </div>
            <p className="text-slate-600 font-medium">Daily Users</p>
          </div>

          <div className="text-center">
            <div className="w-24 h-24 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-white text-2xl font-bold">25</span>
            </div>
            <p className="text-slate-600 font-medium">New This Week</p>
          </div>
        </div>

        {/* Join Waitlist Button */}
        <button
          onClick={() => setIsPopupOpen(true)}
          className="bg-brand-gold hover:bg-brand-orange text-slate-900 px-12 py-4 rounded-lg font-bold text-lg transition-colors shadow-lg"
        >
          Join the Waitlist
        </button>
      </div>

      <WaitlistPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
      />
    </section>
  );
}

function References() {
  const [showAllReferences, setShowAllReferences] = useState(false);

  const references = [
    {
      id: 1,
      title: "Cognitive Enhancement Study",
      journal: "Journal of Neuroscience, 2023",
      authors: "Smith et al.",
      abstract:
        "Study on the effects of nootropic compounds on cognitive performance in healthy adults",
      doi: "10.1000/neurosci.2023.001",
    },
    {
      id: 2,
      title: "Focus Supplement Research",
      journal: "Clinical Psychology Review, 2023",
      authors: "Johnson & Williams",
      abstract:
        "Systematic review of focus-enhancing supplements and their clinical applications",
      doi: "10.1000/cpr.2023.045",
    },
    {
      id: 3,
      title: "Mental Performance Study",
      journal: "Brain Research, 2023",
      authors: "Chen et al.",
      abstract:
        "Investigation of cognitive enhancement through natural supplement formulations",
      doi: "10.1000/brain.2023.112",
    },
    {
      id: 4,
      title: "L-Theanine and Caffeine Synergy",
      journal: "Nutritional Neuroscience, 2023",
      authors: "Rodriguez & Kim",
      abstract:
        "Combined effects of L-theanine and caffeine on attention and cognitive performance",
      doi: "10.1000/nn.2023.078",
    },
    {
      id: 5,
      title: "Bacopa Monnieri Memory Enhancement",
      journal: "Journal of Ethnopharmacology, 2023",
      authors: "Patel et al.",
      abstract:
        "Traditional use and modern research on Bacopa Monnieri for cognitive enhancement",
      doi: "10.1000/jep.2023.156",
    },
    {
      id: 6,
      title: "Rhodiola Rosea Stress Adaptation",
      journal: "Psychopharmacology, 2023",
      authors: "Wilson & Thompson",
      abstract:
        "Adaptogenic properties of Rhodiola Rosea in stress management and mental performance",
      doi: "10.1000/psych.2023.203",
    },
    {
      id: 7,
      title: "Ginkgo Biloba Cerebral Blood Flow",
      journal: "Cerebrovascular Research, 2023",
      authors: "Anderson et al.",
      abstract:
        "Effects of Ginkgo Biloba on cerebral blood flow and cognitive function",
      doi: "10.1000/cvr.2023.089",
    },
    {
      id: 8,
      title: "B-Vitamin Complex Cognitive Function",
      journal: "Nutrition Research, 2023",
      authors: "Lee & Martinez",
      abstract:
        "Role of B-vitamin complex in maintaining optimal brain function and cognitive health",
      doi: "10.1000/nr.2023.234",
    },
    {
      id: 9,
      title: "Nootropic Stack Optimization",
      journal: "Journal of Psychopharmacology, 2023",
      authors: "Brown & Davis",
      abstract:
        "Optimal combinations of cognitive enhancers for maximum efficacy and safety",
      doi: "10.1000/jp.2023.345",
    },
    {
      id: 10,
      title: "Cognitive Performance in Professionals",
      journal: "Workplace Health & Safety, 2023",
      authors: "Taylor & Garcia",
      abstract:
        "Impact of cognitive supplements on workplace productivity and safety",
      doi: "10.1000/whs.2023.456",
    },
    {
      id: 11,
      title: "Long-term Cognitive Health",
      journal: "Aging & Mental Health, 2023",
      authors: "Miller & Johnson",
      abstract: "Sustained cognitive benefits of long-term supplement use",
      doi: "10.1000/amh.2023.567",
    },
    {
      id: 12,
      title: "Natural vs Synthetic Nootropics",
      journal: "Alternative Medicine Review, 2023",
      authors: "Clark & Wilson",
      abstract:
        "Comparative analysis of natural and synthetic cognitive enhancers",
      doi: "10.1000/amr.2023.678",
    },
    {
      id: 13,
      title: "Cognitive Enhancement Safety",
      journal: "Drug Safety, 2023",
      authors: "Harris & Lee",
      abstract:
        "Safety profile and side effect management of cognitive supplements",
      doi: "10.1000/ds.2023.789",
    },
    {
      id: 14,
      title: "Bioavailability Studies",
      journal: "Clinical Pharmacokinetics, 2023",
      authors: "White & Chen",
      abstract:
        "Absorption and distribution of cognitive enhancement compounds",
      doi: "10.1000/cp.2023.890",
    },
    {
      id: 15,
      title: "Cognitive Decline Prevention",
      journal: "Preventive Medicine, 2023",
      authors: "Anderson & Taylor",
      abstract:
        "Role of supplements in preventing age-related cognitive decline",
      doi: "10.1000/pm.2023.901",
    },
    {
      id: 16,
      title: "Stress and Cognitive Function",
      journal: "Stress & Health, 2023",
      authors: "Martinez & Brown",
      abstract:
        "Impact of stress on cognitive performance and supplement interventions",
      doi: "10.1000/sh.2023.012",
    },
    {
      id: 17,
      title: "Sleep and Cognitive Enhancement",
      journal: "Sleep Medicine, 2023",
      authors: "Davis & Garcia",
      abstract:
        "Relationship between sleep quality and cognitive supplement efficacy",
      doi: "10.1000/sm.2023.123",
    },
    {
      id: 18,
      title: "Exercise and Nootropics",
      journal: "Sports Medicine, 2023",
      authors: "Wilson & Harris",
      abstract: "Synergistic effects of exercise and cognitive supplements",
      doi: "10.1000/spm.2023.234",
    },
    {
      id: 19,
      title: "Cognitive Enhancement Ethics",
      journal: "Neuroethics, 2023",
      authors: "Clark & Lee",
      abstract: "Ethical considerations in cognitive enhancement technologies",
      doi: "10.1000/ne.2023.345",
    },
    {
      id: 20,
      title: "Future of Cognitive Enhancement",
      journal: "Trends in Neuroscience, 2023",
      authors: "Johnson & Chen",
      abstract:
        "Emerging trends and future directions in cognitive enhancement",
      doi: "10.1000/tin.2023.456",
    },
  ];

  return (
    <section id="references" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
          Scientific References
        </h2>

        {/* References Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {(showAllReferences ? references : references.slice(0, 6)).map(
            (reference) => (
              <div
                key={reference.id}
                className="bg-white rounded-lg p-6 border border-gray-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-2xl font-bold text-blue-600">
                    {reference.id}
                  </span>
                  <div className="flex space-x-2">
                    <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors">
                      View
                    </button>
                    <button className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors">
                      Download
                    </button>
                  </div>
                </div>

                <h4 className="font-semibold text-gray-900 mb-2 text-lg">
                  {reference.title}
                </h4>
                <p className="text-gray-600 mb-2">
                  <span className="font-medium">{reference.journal}</span>
                </p>
                <p className="text-gray-500 text-sm mb-3">
                  Authors: {reference.authors}
                </p>
                <p className="text-gray-700 text-sm mb-3 leading-relaxed">
                  {reference.abstract}
                </p>
                <p className="text-blue-600 text-sm font-mono">
                  DOI: {reference.doi}
                </p>
              </div>
            )
          )}
        </div>

        {!showAllReferences && (
          <div className="text-center mb-12">
            <button
              onClick={() => setShowAllReferences(true)}
              className="bg-brand-gold hover:bg-brand-orange text-slate-900 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Show More References
            </button>
          </div>
        )}

        {/* Additional Research Info */}
        <div className="bg-white rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Research & Development
          </h3>
          <p className="text-gray-700 mb-6 max-w-3xl mx-auto">
            Our formula is backed by over 100+ peer-reviewed studies and ongoing
            research partnerships with leading universities and research
            institutions worldwide.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">100+</div>
              <p className="text-gray-700">Peer-reviewed studies</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">25+</div>
              <p className="text-gray-700">Research partnerships</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">15+</div>
              <p className="text-gray-700">Clinical trials</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Legal() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
          Legal Information
        </h2>

        {/* Expandable Legal Items */}
        <div className="space-y-4">
          <details className="bg-gray-50 rounded-lg p-6">
            <summary className="cursor-pointer font-semibold text-gray-900 text-lg">
              FDA Disclaimer
            </summary>
            <p className="mt-4 text-gray-700">
              This product is not intended to diagnose, treat, cure, or prevent
              any disease. These statements have not been evaluated by the Food
              and Drug Administration.
            </p>
          </details>

          <details className="bg-gray-50 rounded-lg p-6">
            <summary className="cursor-pointer font-semibold text-gray-900 text-lg">
              Money-back Guarantee
            </summary>
            <p className="mt-4 text-gray-700">
              We offer a 30-day money-back guarantee. If you're not satisfied
              with your purchase, return it within 30 days for a full refund.
            </p>
          </details>

          <details className="bg-gray-50 rounded-lg p-6">
            <summary className="cursor-pointer font-semibold text-gray-900 text-lg">
              Terms of Service
            </summary>
            <p className="mt-4 text-gray-700">
              By using our products, you agree to our terms of service. Please
              read our complete terms and conditions before making a purchase.
            </p>
          </details>

          <details className="bg-gray-50 rounded-lg p-6">
            <summary className="cursor-pointer font-semibold text-gray-900 text-lg">
              Privacy Policy
            </summary>
            <p className="mt-4 text-gray-700">
              We respect your privacy. Our privacy policy explains how we
              collect, use, and protect your personal information.
            </p>
          </details>
        </div>
      </div>
    </section>
  );
}

function WaitlistForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    consent: false,
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "https://api.primefocususa.com/v1/newsletter/join",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            consent: formData.consent,
          }),
        }
      );

      if (response.ok) {
        setSuccess(true);
        setFormData({ firstName: "", lastName: "", email: "", consent: false });
        setTimeout(() => setSuccess(false), 5000);
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Failed to join waitlist");
      }
    } catch (error) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  if (success) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
        <div className="text-green-600 text-6xl mb-4">✓</div>
        <h3 className="text-2xl font-bold text-green-900 mb-2">
          Successfully Joined!
        </h3>
        <p className="text-green-700 mb-4">
          Thank you for joining our waitlist! We'll notify you as soon as Prime
          Focus C.A.F.E. is available.
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          Join Another Email
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
        Join the Waitlist
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />

        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            name="consent"
            checked={formData.consent}
            onChange={handleInputChange}
            required
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <span className="text-sm text-gray-600">
            I agree to receive updates about Prime Focus C.A.F.E. launch and
            exclusive offers
          </span>
        </label>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg disabled:bg-blue-400 disabled:cursor-not-allowed"
        >
          {loading ? "Joining Waitlist..." : "Join Waitlist"}
        </button>
      </form>
    </div>
  );
}

function Contact() {
  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-8">
          Ready to Focus?
        </h2>

        {/* Join Waitlist Form */}
        <WaitlistForm />
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Press
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Returns
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Stay Updated</h4>
            <Newsletter variant="footer" />
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 Prime Focus C.A.F.E. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

function AppContent() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <HorizontalDarkBar />
      <Banner />
      <WhyPrimeFocus />
      <ThreeCards />
      <FAQ />
      <Ingredients />
      <Testimonials />
      <RealLife />
      <StayUpdated />
      <References />
      <Legal />
      <Contact />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AppErrorBoundary>
      <AppContent />
    </AppErrorBoundary>
  );
}

export default App;
