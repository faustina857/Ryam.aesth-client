import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

const values = [
  {
    title: 'Expert Care',
    description: 'Every treatment is performed by a trained and certified aesthetician who understand your skin deeply, not just on the surface.',
  },
  {
    title: 'Premium Products',
    description: 'We use only high-quality, skin-safe products carefully selected to deliver visible results without compromising your health.',
  },
  {
    title: 'Your Comfort First',
    description: 'From the moment you walk in, every detail of your experience is designed to make you feel at ease, valued, and cared for.',
  },
  {
    title: 'Hygiene Standards',
    description: 'We maintain strict hygiene protocols across every service. Your safety is not an afterthought, it is our foundation.',
  },
]

export default function About() {
  return (
    <main className="min-h-screen bg-cream-light dark:bg-spa-dark">
      <Helmet>
        <title>About Us | Ryam Aesthetics</title>
        <meta name="description" content="Learn about Ryam Aesthetics — a luxury spa and wellness sanctuary in Ajah, Lagos. Built for everyone who values expert care and genuine results." />
        <meta property="og:title" content="About Us | Ryam Aesthetics" />
        <meta property="og:url" content="https://ryamaesthetics.com/about" />
      </Helmet>

      {/* Page Hero */}
      <section className="bg-spa-text py-24 px-4 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-sans text-xs tracking-widest uppercase text-gold mb-3"
        >
          Our Story
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-serif text-4xl md:text-5xl text-white font-light max-w-xl mx-auto leading-snug"
        >
          Beauty Is Not a Luxury. It Is Self-Respect.
        </motion.h1>
      </section>

      {/* Brand Story */}
      <section className="py-20 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="order-2 md:order-1"
          >
            <div className="overflow-hidden h-80 md:h-[520px] rounded-3xl">
              <img
                src="/home-img.jpeg"
                alt="Inside Ryam Aesthetics"
                loading='lazy'
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="order-1 md:order-2 flex flex-col gap-5"
          >
            <p className="font-sans text-xs tracking-widest uppercase text-gold">
              Who We Are
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-spa-text dark:text-cream-light font-light leading-snug">
              Born From a Passion for Care, Built for Everyone
            </h2>
            <p className="font-sans text-sm md:text-base text-spa-muted dark:text-cream-light/70 leading-relaxed">
              Ryam Aesthetics, born from a simple but powerful belief, opened its doors just one year ago with a single conviction — 
              that great skin care and genuine relaxation should be accessible to everyone, 
              regardless of gender.
            </p>
            <p className="font-sans text-sm md:text-base text-spa-muted dark:text-cream-light/70 leading-relaxed">
              Founded with a passion for skin health and holistic beauty. From precision facials and brow treatments to deep tissue massages and waxing 
              services, every treatment at Ryam Aesthetics is designed with one goal in mind 
              — to help you leave feeling better than when you walked in.
            </p>
            <p className="font-sans text-sm md:text-base text-spa-muted dark:text-cream-light/70 leading-relaxed">
              At Ryam 
              Aesthetics, you are never just another booking. You are the reason we show up 
              every day.
            </p>
            <Link
              to="/book"
              className="inline-block self-start bg-gold text-white font-sans text-xs tracking-widest uppercase px-8 py-3.5 rounded-pill hover:bg-gold-light transition-colors duration-300 mt-2"
            >
              Book an Appointment
            </Link>
          </motion.div>

        </div>
      </section>

      {/* Values Section */}
      <section className="bg-white dark:bg-spa-surface py-20 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-14">
            <p className="font-sans text-xs tracking-widest uppercase text-gold mb-3">
              What Sets Us Apart
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-spa-text dark:text-cream-light font-light">
              The Ryam Promise
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col gap-4 p-6 rounded-2xl border border-spa-border dark:border-spa-surface hover:border-gold dark:hover:border-gold transition-colors duration-300"
              >
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <span className="font-serif text-gold text-lg">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="font-serif text-xl text-spa-text dark:text-cream-light font-light">
                  {value.title}
                </h3>
                <p className="font-sans text-sm text-spa-muted dark:text-cream-light/60 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="bg-spa-text py-20 px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-serif text-3xl md:text-4xl text-white font-light mb-4 max-w-lg mx-auto leading-snug"
        >
          Ready to Experience the Ryam Difference?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-sans text-sm text-white/60 mb-8 max-w-md mx-auto"
        >
          Book your first appointment today and discover why our clients keep coming back.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <Link
            to="/book"
            className="inline-block bg-gold text-white font-sans text-xs tracking-widest uppercase px-10 py-4 rounded-pill hover:bg-gold-light transition-colors duration-300"
          >
            Book Appointment
          </Link>
        </motion.div>
      </section>

    </main>
  )
}