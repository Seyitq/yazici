# Green Yatırım — Yayına Alma Kılavuzu

## İçindekiler
1. [Teknik Altyapı](#teknik-altyapı)
2. [Önce Bunları Yap (Güvenlik)](#önce-bunları-yap-güvenlik)
3. [Ortam Değişkenleri](#ortam-değişkenleri)
4. [Lokal Build Testi](#lokal-build-testi)
5. [Hosting Seçenekleri](#hosting-seçenekleri)
6. [VPS ile Deploy (Önerilen)](#vps-ile-deploy-önerilen)
7. [Vercel ile Deploy (Sınırlı)](#vercel-ile-deploy-sınırlı)
8. [Alan Adı & SSL](#alan-adı--ssl)
9. [Admin Paneli](#admin-paneli)
10. [Bakım & Yedekleme](#bakım--yedekleme)
11. [Sorun Giderme](#sorun-giderme)

---

## Teknik Altyapı

| Katman | Teknoloji |
|---|---|
| Framework | Next.js 14 (App Router) |
| Veritabanı | SQLite (`better-sqlite3`) |
| Stil | Tailwind CSS |
| Animasyon | Framer Motion |
| Görsel Yükleme | Yerel disk (`/public/uploads`) |
| Auth | Cookie tabanlı (`ADMIN_TOKEN`) |

**Kritik:** SQLite veritabanı ve yüklenen görseller **sunucu diskine** yazıldığı için bu proje Vercel/Netlify gibi **serverless** platformlarda tam olarak çalışmaz. En sağlıklı seçenek bir **VPS** (sanal sunucu) üzerinde çalıştırmaktır.

---

## Önce Bunları Yap (Güvenlik)

> ⚠️ Yayına almadan önce aşağıdaki varsayılan değerleri mutlaka değiştir.

`.env.local` dosyasını aç ve şu 3 değeri güçlü, özgün değerlerle değiştir:

```env
ADMIN_USERNAME=senin_kullanici_adin
ADMIN_PASSWORD=Guclu_Bir_Sifre_2026!
ADMIN_TOKEN=tamamen-rastgele-uzun-bir-string-buraya
```

Token için rastgele bir değer üretmek istersen terminalde şunu çalıştır:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## Ortam Değişkenleri

Sunucuda ayarlanması gereken tüm değişkenler:

```env
# Zorunlu — Admin girişi
ADMIN_USERNAME=         # Admin kullanıcı adı
ADMIN_PASSWORD=         # Admin şifresi
ADMIN_TOKEN=            # Oturum doğrulama token'ı (uzun, rastgele string)

# Zorunlu — Site URL'i (SSL sertifikası sonrası doldur)
NEXT_PUBLIC_SITE_URL=https://siteadiniz.com

# İsteğe bağlı — İletişim sayfası haritası
NEXT_PUBLIC_GOOGLE_MAPS_URL=https://www.google.com/maps/embed?...

# İsteğe bağlı — WhatsApp butonu (başında ülke kodu)
NEXT_PUBLIC_WHATSAPP=905XXXXXXXXX

# İsteğe bağlı — Instagram linki
NEXT_PUBLIC_INSTAGRAM=kullanici_adi
```

---

## Lokal Build Testi

Sunucuya göndermeden önce localda production build'i test et:

```bash
# Bağımlılıkları yükle
npm install

# Production build al
npm run build

# Production modda başlat
npm start
```

`http://localhost:3000` adresinde sorunsuz açılıyorsa sunucuya geçebilirsin.

---

## Hosting Seçenekleri

### ✅ Önerilen: VPS (DigitalOcean, Hetzner, Linode, Contabo)

SQLite ve dosya yükleme tam desteklenir. Aylık ~5-15$ arası seçenekler mevcut.

**Minimum Sunucu Gereksinimleri:**
- 1 vCPU
- 1 GB RAM
- 20 GB SSD
- Ubuntu 22.04 LTS

### ⚠️ Vercel (Kısıtlı)

Vercel'de site açılır ancak:
- Veritabanına yazılan veriler (projeler, blog, mesajlar) kalıcı olmaz, her deploy'da sıfırlanır
- Yüklenen görseller kaybolur

Sadece test/önizleme amaçlı kullanılabilir.

---

## VPS ile Deploy (Önerilen)

### 1. Sunucuya Bağlan

```bash
ssh root@SUNUCU_IP_ADRESI
```

### 2. Node.js Yükle (v20 LTS)

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
node -v   # v20.x.x görmeli
```

### 3. PM2 Yükle (Process Manager)

```bash
npm install -g pm2
```

### 4. Projeyi Sunucuya Gönder

**Seçenek A — Git ile (önerilir):**
```bash
# Sunucuda:
git clone https://github.com/kullanici_adi/greeninvestment.git /var/www/greeninvestment
cd /var/www/greeninvestment
```

**Seçenek B — SCP ile (Git yoksa):**

Localda **proje klasöründe** PowerShell veya Terminal aç ve çalıştır:

```powershell
# Adım 1 — Sunucuda klasörü oluştur
ssh root@SUNUCU_IP "mkdir -p /var/www/greeninvestment"

# Adım 2 — Kaynak ve yapılandırma dosyalarını gönder (node_modules ve .next hariç)
scp -r src public .env.local next.config.mjs tailwind.config.ts tsconfig.json postcss.config.js package.json package-lock.json root@SUNUCU_IP:/var/www/greeninvestment/
```

> `SUNUCU_IP` yerine gerçek IP adresini yaz, örn. `root@45.12.34.56`

Sunucuda devam et:
```bash
cd /var/www/greeninvestment
npm install
npm run build
pm2 restart greeninvestment   # zaten çalışıyorsa
# VEYA ilk kurulumsa:
pm2 start npm --name "greeninvestment" -- start
pm2 save
```

**Sonraki güncellemelerde** (kod değişikliği sonrası) aynı `scp` komutunu tekrar çalıştır, ardından sunucuda:
```bash
cd /var/www/greeninvestment
npm run build
pm2 restart greeninvestment
```

> Not: `node_modules/` ve `.next/` klasörlerini gönderme, sunucuda yeniden oluşturulacak.

### 5. Ortam Değişkenlerini Ayarla

```bash
cd /var/www/greeninvestment
nano .env.local
# Değişkenleri doldur, CTRL+X ile kaydet
```

### 6. Bağımlılıkları Yükle ve Build Al

```bash
npm install
npm run build
```

### 7. PM2 ile Başlat

```bash
pm2 start npm --name "greeninvestment" -- start
pm2 save
pm2 startup   # Sunucu yeniden başladığında otomatik çalışması için
```

Durumu kontrol et:
```bash
pm2 status
pm2 logs greeninvestment
```

Uygulama varsayılan olarak `http://SUNUCU_IP:3000` adresinde çalışır.

### 8. Nginx Reverse Proxy Kur

```bash
sudo apt install nginx -y
sudo nano /etc/nginx/sites-available/greeninvestment
```

Aşağıdaki içeriği yapıştır (alan adını değiştir):

```nginx
server {
    listen 80;
    server_name greenyatirim.com www.greenyatirim.com;

    # Yükleme boyutu limiti (5MB'ı karşıla)
    client_max_body_size 100M;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/greeninvestment /etc/nginx/sites-enabled/
sudo nginx -t   # Konfigürasyonu test et
sudo systemctl reload nginx
```

---

## Alan Adı & SSL

### Alan Adı Yönlendirme

Alan adı sağlayıcında DNS yönetimine gir ve şu kayıtları ekle:

| Tip | İsim | Değer |
|-----|------|-------|
| A | @ | `SUNUCU_IP_ADRESI` |
| A | www | `SUNUCU_IP_ADRESI` |

DNS yayılması 5 dakika - 24 saat sürebilir.

### SSL Sertifikası (Let's Encrypt — Ücretsiz)

```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d siteadiniz.com -d www.siteadiniz.com
```

Certbot otomatik olarak:
- SSL sertifikasını alır
- Nginx konfigürasyonunu HTTPS olarak günceller
- 90 günde bir otomatik yeniler

Kurulum sonrası `.env.local` içindeki `NEXT_PUBLIC_SITE_URL` adresini `https://` ile güncelle ve rebuild al:
```bash
npm run build
pm2 restart greeninvestment
```

---

## Admin Paneli

- **URL:** `https://siteadiniz.com/admin/giris`
- **Kullanıcı adı ve şifre:** `.env.local` içinde tanımladığın değerler
- Oturum 7 gün geçerlidir, tarayıcı cookie'si silinirse yeniden giriş yapılır

Admin panelinde yapılabilecekler:
- Proje ekleme / düzenleme / silme
- Blog yazısı oluşturma
- Galeri görseli yükleme
- Gelen mesajları görüntüleme

---

## Bakım & Yedekleme

### Veritabanını Yedekle

SQLite dosyası `data/database.sqlite` konumundadır. Günlük yedek için:

```bash
# Elle yedek al
cp /var/www/greeninvestment/data/database.sqlite /backup/db-$(date +%Y%m%d).sqlite

# Crontab ile her gece saat 02:00'de otomatik yedek
crontab -e
# Şu satırı ekle:
0 2 * * * cp /var/www/greeninvestment/data/database.sqlite /backup/db-$(date +\%Y\%m\%d).sqlite
```

### Yüklenen Görselleri Yedekle

```bash
cp -r /var/www/greeninvestment/public/uploads /backup/uploads-$(date +%Y%m%d)
```

### Güncelleme (Kod Değişikliği Sonrası)

#### Git ile güncelleme (önerilen)

**1. Localda değişiklikleri GitHub'a gönder:**
```bash
# Proje klasöründe (localda)
git add .
git commit -m "güncelleme açıklaması"
git push origin main
```

**2. Sunucuda çek ve yeniden başlat:**
```bash
cd /var/www/greeninvestment
git pull origin main
npm install          # yeni paket eklendiyse gerekli, yoksa atlayabilirsin
npm run build
pm2 restart greeninvestment
```

> `.env.local` dosyası `.gitignore`'da olduğu için Git ile **gönderilmez** — sunucudaki `.env.local` korunur, üzerine yazılmaz. Veritabanı ve yüklenen görseller de aynı şekilde dokunulmaz kalır.

---

**İlk kez Git ile kuracaksan** (sunucuda proje yoksa):
```bash
# Sunucuda
git clone https://github.com/KULLANICI/greeninvestment.git /var/www/greeninvestment
cd /var/www/greeninvestment
nano .env.local        # env değişkenlerini gir
npm install
npm run build
pm2 start npm --name "greeninvestment" -- start
pm2 save
```

### Logları Görüntüle

```bash
pm2 logs greeninvestment          # Uygulama logları
sudo tail -f /var/log/nginx/error.log   # Nginx hataları
```

---

## Hızlı Kontrol Listesi

Yayına almadan önce işaretle:

- [ ] `ADMIN_PASSWORD` varsayılan değerden değiştirildi
- [ ] `ADMIN_TOKEN` güçlü rastgele bir değere ayarlandı
- [ ] `NEXT_PUBLIC_SITE_URL` gerçek alan adıyla güncellendi
- [ ] `npm run build` hatasız tamamlandı
- [ ] SSL sertifikası alındı (HTTPS çalışıyor)
- [ ] Admin panel girişi test edildi
- [ ] Proje ekleme ve görsel yükleme test edildi
- [ ] Mobil görünüm kontrol edildi
- [ ] `data/` klasörü yedekleme planına alındı

---

## Sorun Giderme

### Cloudflare 521 — "Web server is down"

**Ne anlama gelir:** DNS Cloudflare üzerinden doğru yönlendirilmiş, ancak Cloudflare sunucuna bağlanmaya çalışırken web servisi cevap vermiyor.

**Neden olur:** Nginx veya Next.js uygulaması çalışmıyor ya da güvenlik duvarı bağlantıyı bloke ediyor.

---

**Adım 1 — Nginx durumunu kontrol et:**
```bash
sudo systemctl status nginx
```
Çalışmıyorsa (`inactive` / `failed`):
```bash
sudo systemctl start nginx
# Hata varsa logları gör:
sudo journalctl -u nginx --no-pager -n 50
```

---

**Adım 2 — PM2 / Next.js durumunu kontrol et:**
```bash
pm2 status
```
`stopped` veya listede yoksa:
```bash
cd /var/www/greeninvestment
pm2 start npm --name "greeninvestment" -- start
pm2 save
```

---

**Adım 3 — Güvenlik duvarını kontrol et:**
```bash
sudo ufw status
```
Port 80 ve 443 kapalıysa:
```bash
sudo ufw allow 22      # SSH — önce bunu yap, kilitlenme olmasın
sudo ufw allow 80
sudo ufw allow 443
sudo ufw enable
```

---

**Adım 4 — Uygulamanın gerçekten çalışıp çalışmadığını test et:**
```bash
curl http://localhost:3000
```
Bir HTML cevabı dönüyorsa uygulama ayakta demektir; sorun Nginx konfigürasyonundadır.

---

**Adım 5 — Cloudflare SSL modunu kontrol et:**

Cloudflare panelinde **SSL/TLS → Overview** bölümüne git.  
Sunucunda henüz SSL sertifikası yoksa modu **"Flexible"** olarak ayarla.  
Certbot ile sertifika aldıktan sonra **"Full (Strict)"** yapabilirsin.
