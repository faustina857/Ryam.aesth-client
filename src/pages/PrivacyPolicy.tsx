import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-cream-light dark:bg-spa-dark">
        <Helmet>
        <title>Privacy Policy | Ryam Aesthetics</title>
        <meta name="description" content="Read the Ryam Aesthetics privacy policy to understand how we collect, use, and protect your personal information." />
        </Helmet>

      {/* Page Hero */}
      <section className="bg-spa-text py-28 px-4 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-sans text-xs tracking-widest uppercase text-gold mb-3"
        >
          Legal
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-serif text-4xl md:text-5xl text-white font-light"
        >
          Privacy Policy
        </motion.h1>
      </section>

      {/* Content */}
      <section className="max-w-3xl mx-auto px-4 md:px-8 py-16">
        <div className="prose prose-sm max-w-none dark:prose-invert">

          <p className="font-sans text-xs text-spa-muted dark:text-cream-light/50 mb-8">
            Last updated: June 2026
          </p>

          <div className="flex flex-col gap-8">

            <div>
              <h2 className="font-serif text-xl text-spa-text dark:text-cream-light font-light mb-3">
                1. Information We Collect
              </h2>
              <p className="font-sans text-sm text-spa-muted dark:text-cream-light/70 leading-relaxed">
                When you book an appointment or contact us through our website, we collect personal information including your full name, email address, and phone number. We also collect the details of the service you book, your preferred date and time, and any special requests you provide.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl text-spa-text dark:text-cream-light font-light mb-3">
                2. How We Use Your Information
              </h2>
              <p className="font-sans text-sm text-spa-muted dark:text-cream-light/70 leading-relaxed">
                We use the information you provide solely to manage your appointment booking, send you confirmation and status update emails, and respond to your enquiries. We do not use your information for marketing purposes without your explicit consent.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl text-spa-text dark:text-cream-light font-light mb-3">
                3. Data Storage
              </h2>
              <p className="font-sans text-sm text-spa-muted dark:text-cream-light/70 leading-relaxed">
                Your personal information is stored securely in our database. We retain your booking information for record-keeping purposes. We do not store payment information as all transactions are handled offline or through secure third-party processors.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl text-spa-text dark:text-cream-light font-light mb-3">
                4. Sharing Your Information
              </h2>
              <p className="font-sans text-sm text-spa-muted dark:text-cream-light/70 leading-relaxed">
                We do not sell, trade, or share your personal information with third parties. Your data is only accessible to Ryam Aesthetics staff for the purpose of managing your appointment.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl text-spa-text dark:text-cream-light font-light mb-3">
                5. Your Rights
              </h2>
              <p className="font-sans text-sm text-spa-muted dark:text-cream-light/70 leading-relaxed">
                You have the right to request access to the personal information we hold about you, request that we correct or delete your information, and opt out of any communications from us. To exercise these rights, contact us at rosemaryeze1960@gmail.com.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl text-spa-text dark:text-cream-light font-light mb-3">
                6. Contact Us
              </h2>
              <p className="font-sans text-sm text-spa-muted dark:text-cream-light/70 leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at rosemaryeze1960@gmail.com or call 08105101960.
              </p>
            </div>

          </div>
        </div>
      </section>

    </main>
  )
}