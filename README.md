# TDA Calm

TDA Calm, kısa bir mola vermek için hazırlanmış, mobil uyumlu ve sade bir rahatlama sayfasıdır. 11 doğa fotoğrafı yumuşak geçişlerle sırayla görünür; kullanıcı isterse isteğe bağlı ambient parçayı başlatıp duraklatabilir ve ses seviyesini ayarlayabilir.

> Müzik, tarayıcıların otomatik ses oynatma kısıtları nedeniyle sayfa açılır açılmaz başlamaz. Çalması için **Müziği başlat** düğmesine dokun.

## Özellikler

- 11 yerel manzara fotoğrafı; yaklaşık 12 saniyede bir değişir.
- Önceki/sonraki manzara ve fotoğraf geçişlerini duraklatma/devam ettirme kontrolleri.
- İsteğe bağlı, döngüye alınmış ambient müzik; başlat/duraklat ve ses seviyesi kontrolü.
- Telefon, tablet ve masaüstüne uyumlu arayüz.
- Klavyede sol/sağ ok tuşlarıyla manzara değiştirme.
- Cihazda “hareketi azalt” tercihi açıksa otomatik fotoğraf geçişleri duraklatılmış başlar.
- Derleme adımı, JavaScript paketi veya sunucu tarafı kod gerekmez.

## Dosyalar

```text
tda-calm/
├── index.html
├── styles.css
├── script.js
├── README.md
├── LICENSE
├── ASSET_CREDITS.md
└── assets/
    ├── audio/
    │   └── 001_Synthwave_4k.mp3
    └── images/
        ├── forest-canopy.jpg
        ├── forest-light.jpg
        ├── lake-mountains.jpg
        ├── mountain-peaks.jpg
        ├── ocean-waves.jpg
        ├── quiet-beach.jpg
        ├── quiet-lake.jpg
        ├── river-flow.jpg
        ├── soft-sunrise.jpg
        ├── sunset-ridges.jpg
        └── waterfall.jpg
```

## Bilgisayarda çalıştırma

1. Bu klasördeki tüm dosya ve `assets` klasörünü birlikte tut.
2. Terminali bu klasörde aç.
3. Python kuruluysa şu komutu çalıştır:

   ```bash
   python3 -m http.server 8000
   ```

4. Tarayıcıda `http://localhost:8000` adresini aç.

Dosyayı doğrudan çift tıklayarak açmak bazı tarayıcılarda çalışabilir; yerel bir web sunucusu kullanmak daha güvenilirdir.

## Düzenleme

- Fotoğraf sırası, ekrandaki adları ve dosya yolları `script.js` içindeki `slides` listesinde.
- Otomatik geçiş aralığı aynı dosyada `intervalMs = 12000` satırında (milisaniye cinsinden).
- Fotoğraf eklemek veya değiştirmek için dosyayı `assets/images/` içine koy ve `slides` listesine ekle.
- Müzik dosyası ve parça yolu `index.html` içindeki `<audio>` etiketinde. Başka bir ses dosyası kullanırken lisansını ayrıca kontrol et.
- Renkler, yazı boyutları ve telefon görünümü `styles.css` içinde.
- Harici fontlar için Google Fonts kullanılır; bağlantı olmazsa sistem yazı tiplerine düşer. Fotoğraf ve müzik dosyaları proje içindedir.

## GitHub Pages ile yayımlama

1. GitHub'da yeni bir depo oluştur.
2. Bu klasördeki tüm dosyaları ve `assets` klasörünü deponun **kök dizinine** yükle (sadece `index.html` yüklemek yeterli olmaz).
3. Depoda **Settings → Pages** bölümüne git.
4. **Deploy from a branch** seçeneğini kullan; `main` dalını ve `/(root)` klasörünü seçip kaydet.
5. GitHub Pages sayfası yayımlandıktan sonra aynı ayarlar ekranındaki site bağlantısından aç.

## Vercel ile yayımlama

1. Depoyu GitHub'a yükle ve Vercel'de bu depoyu içe aktar.
2. Proje kök dizini, `index.html` dosyasının ve `assets/` klasörünün bulunduğu klasör olsun.
3. Framework preset olarak **Other** seç. Build command boş bırakılabilir; Output Directory alanını `.` veya projenin kök dizini olarak ayarla.
4. Deploy adımını tamamla ve Vercel'in verdiği bağlantıyı aç.

Bu proje adına herhangi bir yere yayınlama veya dağıtım yapılmadı; adımlar kullanıcı tarafından uygulanmak üzere bırakılmıştır.

## Lisans ve fotoğraf/müzik notu

Orijinal HTML, CSS ve JavaScript kodu [MIT Lisansı](LICENSE) ile sunulur. Unsplash fotoğrafları ve OpenGameArt müzik dosyası bu lisansın parçası değildir; kendi kaynak ve lisans koşullarına tabidir. Kaynaklar, müzik için önerilen eser kredisi ve lisans ayrıntıları [ASSET_CREDITS.md](ASSET_CREDITS.md) dosyasındadır.
