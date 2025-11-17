import { useEffect } from 'react'

function SEO({
  title = 'Sammenlign lån i Norge – moderne lånekalkulator med effektiv rente',
  description = 'Sammenlign lån fra flere banker. Se månedskostnad, effektiv rente og totalkostnad. Gratis, transparent og uten innlogging.',
  url = typeof window !== 'undefined' ? window.location.href : 'https://example.com',
  image = '/favicon.svg',
  locale = 'nb_NO'
}) {
  useEffect(() => {
    document.title = title

    const setMeta = (name, content, attr = 'name') => {
      if (!content) return
      let el = document.querySelector(`meta[${attr}='${name}']`)
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attr, name)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }

    setMeta('description', description)
    setMeta('og:title', title, 'property')
    setMeta('og:description', description, 'property')
    setMeta('og:type', 'website', 'property')
    setMeta('og:url', url, 'property')
    setMeta('og:image', image, 'property')
    setMeta('og:locale', locale, 'property')
    setMeta('twitter:card', 'summary_large_image')
    setMeta('twitter:title', title)
    setMeta('twitter:description', description)
    setMeta('twitter:image', image)

    const ld = {
      '@context': 'https://schema.org',
      '@type': 'FinancialService',
      name: 'Finno Compare',
      url,
      description,
      areaServed: 'NO',
      currenciesAccepted: 'NOK',
      sameAs: ['https://www.unofinans.no/'],
      offers: {
        '@type': 'AggregateOffer',
        priceCurrency: 'NOK',
        lowPrice: '50000',
        highPrice: '1000000'
      }
    }

    let script = document.querySelector('script[type="application/ld+json"]')
    if (!script) {
      script = document.createElement('script')
      script.type = 'application/ld+json'
      document.head.appendChild(script)
    }
    script.textContent = JSON.stringify(ld)
  }, [title, description, url, image, locale])

  return null
}

export default SEO
