import Link from 'next/link'
import AnimatedSection from '@/components/ui/AnimatedSection'

export default function CTASection() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon/5 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        <AnimatedSection>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-gray-800 mb-5">
              Hayalinizdeki <span className="text-neon text-glow">Yatırıma</span>
              <br />
              Bir Adım Kaldı
            </h2>
            <p className="text-gray-600 text-lg mb-10 max-w-xl mx-auto">
              Uzman ekibimizle iletişime geçin, size özel yatırım fırsatlarını
              birlikte değerlendirelim.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/iletisim" className="btn-primary text-base px-10 py-4">
                Hemen İletişime Geçin
              </Link>
              <Link href="/projeler" className="btn-outline text-base px-10 py-4">
                Projeleri İnceleyin
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
