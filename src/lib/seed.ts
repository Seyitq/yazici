import getDb, { generateSlug } from './db'

function seed() {
  const db = getDb()

  // Check if already seeded
  const existingProjects = db.prepare('SELECT COUNT(*) as count FROM projects').get() as any
  if (existingProjects.count > 0) {
    console.log('Veritabanı zaten dolu. Seed atlanıyor.')
    return
  }

  console.log('Seed verileri ekleniyor...')

  // Projects
  const projects = [
    {
      title: 'Yeşil Vadi Konutları',
      description: 'Doğayla iç içe, lüks yaşam alanları. Modern mimari ve sürdürülebilir tasarımın buluştuğu benzersiz konut projesi.',
      content: `Yeşil Vadi Konutları, İstanbul'un en değerli bölgelerinden birinde, doğayla bütünleşik yaşam sunuyor.

Proje, 120.000 m² arazi üzerine kurulu olup toplamda 450 bağımsız bölümden oluşmaktadır. 2+1, 3+1 ve 4+1 daire seçenekleri ile her aileye uygun çözümler sunulmaktadır.

Projemizde enerji verimli sistemler, güneş panelleri ve yağmur suyu toplama sistemleri gibi sürdürülebilir teknolojiler kullanılmaktadır. LEED Gold sertifikası hedeflenmektedir.

Sosyal alanlar arasında yüzme havuzu, fitness merkezi, çocuk oyun alanları, yürüyüş parkurları ve sosyal tesis bulunmaktadır.`,
      location: 'Sarıyer, İstanbul',
      price: '₺3,500,000\'den',
      area: '120-280 m²',
      rooms: '2+1, 3+1, 4+1',
      status: 'aktif',
      features: ['Yüzme Havuzu', 'Spor Salonu', '24/7 Güvenlik', 'Otopark', 'Çocuk Oyun Alanı', 'Yeşil Alan', 'Akıllı Ev Sistemi', 'LEED Sertifikası'],
    },
    {
      title: 'Green Tower İstanbul',
      description: 'Şehrin kalbinde, premium ofis ve rezidans konseptli karma kullanımlı gökdelen projesi.',
      content: `Green Tower İstanbul, Levent iş merkezinin tam ortasında yükselen 45 katlı premium karma proje.

Alt katlar A+ sınıfı ofis alanlarından, üst katlar ise lüks rezidans dairelerinden oluşmaktadır. Her detayında kalite ve konforu hissedeceksiniz.

Projenin konumu, toplu taşıma bağlantıları ve şehrin merkezindeki stratejik yerleşimi ile yatırım değeri her geçen gün artmaktadır.`,
      location: 'Levent, İstanbul',
      price: '₺8,900,000\'den',
      area: '85-350 m²',
      rooms: '1+1, 2+1, 3+1',
      status: 'aktif',
      features: ['Concierge Hizmet', 'SPA & Wellness', 'İş Merkezi', 'Valet Otopark', 'Roof Bar', 'Helipad', 'Akıllı Bina Sistemi'],
    },
    {
      title: 'Eko Park Villaları',
      description: 'Enerji bağımsız, akıllı ev teknolojili lüks villalar. Doğaya saygılı, modern yaşam.',
      content: `Eko Park Villaları, çevre dostu malzemeler ve yenilenebilir enerji sistemleri ile tasarlanmış lüks villa projesidir.

Her villa, güneş panelleri, yer ısı pompası ve akıllı ev otomasyon sistemi ile donatılmıştır. Enerji tüketiminde %80'e varan tasarruf sağlanmaktadır.

500-800 m² arsa alanlarına sahip müstakil villalar, geniş bahçeler ve özel havuzlar ile eşsiz bir yaşam deneyimi sunmaktadır.`,
      location: 'Zekeriyaköy, İstanbul',
      price: '₺12,000,000\'den',
      area: '350-600 m²',
      rooms: '4+2, 5+2',
      status: 'yakında',
      features: ['Özel Havuz', 'Güneş Paneli', 'Akıllı Ev', 'Geniş Bahçe', 'Garaj', 'Jeotermal Isıtma', 'Güvenlikli Site'],
    },
    {
      title: 'Sahil Residence',
      description: 'Deniz manzaralı, merkezi konumda premium rezidans projesi.',
      content: `Sahil Residence, İstanbul Boğazı manzaralı konumu ile eşsiz bir yaşam deneyimi sunuyor.

Projede 1+1'den 4+1'e kadar farklı daire tipleri bulunmaktadır. Her daireden deniz manzarası garantisi verilmektedir.`,
      location: 'Beylikdüzü, İstanbul',
      price: '₺2,800,000\'den',
      area: '75-220 m²',
      rooms: '1+1, 2+1, 3+1, 4+1',
      status: 'tamamlandi',
      features: ['Deniz Manzarası', 'Yüzme Havuzu', 'Fitness', 'Marina Yakını', 'AVM Yakını'],
    },
  ]

  const insertProject = db.prepare(
    `INSERT INTO projects (title, slug, description, content, location, price, area, rooms, status, features)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  )

  for (const p of projects) {
    insertProject.run(
      p.title,
      generateSlug(p.title),
      p.description,
      p.content,
      p.location,
      p.price,
      p.area,
      p.rooms,
      p.status,
      JSON.stringify(p.features)
    )
  }

  // Blog Posts
  const posts = [
    {
      title: '2026\'da Gayrimenkul Yatırımı: Nereye, Nasıl?',
      excerpt: 'Yeni yılda gayrimenkul yatırımı planlayanlar için stratejik rehber. Hangi bölgeler değer kazanacak?',
      content: `2026 yılı, gayrimenkul sektöründe yeni fırsatların kapılarını aralıyor. Değişen ekonomik dinamikler ve kentsel dönüşüm projeleri, akıllı yatırımcılar için önemli fırsatlar oluşturuyor.

Öne Çıkan Bölgeler

İstanbul'un kuzey aksı, yeni havalimanı ve bağlantı yolları ile birlikte değer kazanmaya devam ediyor. Özellikle Arnavutköy, Çatalca ve Silivri bölgeleri, arazi yatırımları için dikkat çekici fırsatlar sunuyor.

Dikkat Edilmesi Gerekenler

- Lokasyon analizini mutlaka yapın
- Projenin yasal durumunu araştırın
- Geliştiricinin geçmiş projelerini inceleyin
- Ödeme koşullarını detaylı değerlendirin

Yazıcı 55 İnşaat olarak, müşterilerimize her aşamada profesyonel danışmanlık hizmeti sunuyoruz. Doğru inşaat, doğru zamanlama ve doğru partner ile mümkün.`,
      category: 'Yatırım',
    },
    {
      title: 'Sürdürülebilir Yaşam Alanları: Geleceğin Konutları',
      excerpt: 'Yeşil bina standartları ve enerji verimli konutlar hakkında bilmeniz gerekenler.',
      content: `Sürdürülebilir konut, sadece bir trend değil, geleceğin standardı. Yazıcı 55 İnşaat olarak, projelerimizde çevre dostu teknolojileri ön planda tutuyoruz.

Yeşil Bina Nedir?

Yeşil binalar, enerji tüketimini minimize eden, doğal kaynakları verimli kullanan ve çevreye minimum etki bırakan yapılardır. LEED, BREEAM gibi uluslararası sertifikalar, bu binaların kalite göstergesidir.

Avantajları

1. Enerji maliyetlerinde %40-60 tasarruf
2. Su tüketiminde %30-50 azalma
3. Daha sağlıklı iç mekan havası
4. Gayrimenkulün değer artışını destekleme
5. Çevreye pozitif katkı

Projelerimiz

Yazıcı 55 İnşaat projelerinin tamamında sürdürülebilirlik ilkeleri uygulanmaktadır. Güneş panelleri, yağmur suyu toplama, akıllı bina yönetim sistemleri standart özelliklerimiz arasındadır.`,
      category: 'Sürdürülebilirlik',
    },
    {
      title: 'Akıllı Ev Teknolojileri ile Konfor ve Ekonomi',
      excerpt: 'Modern konutlarda akıllı ev sistemlerinin avantajları ve yatırım değerine etkisi.',
      content: `Akıllı ev sistemleri, modern yaşamın vazgeçilmez bir parçası haline geldi. Peki bu teknolojiler sadece konfor mu sağlıyor, yoksa yatırım değerinizi de artırıyor mu?

Akıllı Ev Neler Sunuyor?

- Otomatik iklim kontrolü ile enerji tasarrufu
- Uzaktan erişimli güvenlik sistemleri
- Aydınlatma ve perde otomasyonu
- Enerji tüketim takibi ve optimizasyonu
- Sesli asistan entegrasyonu

Yatırım Değerine Etkisi

Araştırmalar, akıllı ev özelliklerine sahip konutların, benzer konutlara göre %8-12 daha yüksek fiyatla satıldığını göstermektedir. Kiralama piyasasında da bu oran %5-10 arasında.

Yazıcı 55 İnşaat projelerinde, tüm daireler akıllı ev altyapısı ile teslim edilmektedir. Bu, hem yaşam kalitenizi artırmakta hem de yatırımınızın değerini korumaktadır.`,
      category: 'Teknoloji',
    },
  ]

  const insertPost = db.prepare(
    `INSERT INTO blog_posts (title, slug, excerpt, content, category)
     VALUES (?, ?, ?, ?, ?)`
  )

  for (const p of posts) {
    insertPost.run(p.title, generateSlug(p.title), p.excerpt, p.content, p.category)
  }

  console.log(`✅ ${projects.length} proje ve ${posts.length} blog yazısı eklendi.`)
}

seed()
