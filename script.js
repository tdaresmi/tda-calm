(() => {
  const slides = [
    { src: 'assets/images/lake-mountains.jpg', title: 'Dağ gölünün sessizliği' },
    { src: 'assets/images/quiet-lake.jpg', title: 'Göl evinin dinginliği' },
    { src: 'assets/images/forest-light.jpg', title: 'Sisin içindeki orman' },
    { src: 'assets/images/mountain-peaks.jpg', title: 'Dağların arasında' },
    { src: 'assets/images/soft-sunrise.jpg', title: 'Şafağın ilk ışıkları' },
    { src: 'assets/images/ocean-waves.jpg', title: 'Denizin yumuşak ritmi' },
    { src: 'assets/images/sunset-ridges.jpg', title: 'Gün batımına doğru' },
    { src: 'assets/images/waterfall.jpg', title: 'Şelalenin yanı başında' },
    { src: 'assets/images/river-flow.jpg', title: 'Sisli vadide akan su' },
    { src: 'assets/images/forest-canopy.jpg', title: 'Orman yolunda' },
    { src: 'assets/images/quiet-beach.jpg', title: 'Sahilde gün ışığı' }
  ];

  const imageA = document.getElementById('sceneA');
  const imageB = document.getElementById('sceneB');
  const title = document.getElementById('sceneTitle');
  const counter = document.getElementById('slideCount');
  const previousButton = document.getElementById('previousSlide');
  const nextButton = document.getElementById('nextSlide');
  const slideshowButton = document.getElementById('slideshowToggle');
  const slideshowLabel = document.getElementById('slideshowLabel');
  const slideshowIcon = document.getElementById('slideshowIcon');
  const audio = document.getElementById('ambientAudio');
  const audioButton = document.getElementById('audioToggle');
  const audioButtonLabel = document.getElementById('audioButtonLabel');
  const audioIcon = document.getElementById('audioIcon');
  const audioStatus = document.getElementById('audioStatus');
  const volumeControl = document.getElementById('volumeControl');
  const volumeValue = document.getElementById('volumeValue');
  const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
  const intervalMs = 12000;

  let currentSlide = 0;
  let visibleImage = imageA;
  let slideshowPlaying = !reduceMotion;
  let slideshowTimer = null;
  let imageRequest = 0;

  function renderSlide() {
    const slide = slides[currentSlide];
    title.textContent = slide.title;
    counter.textContent = `${String(currentSlide + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;

    const request = ++imageRequest;
    const incoming = visibleImage === imageA ? imageB : imageA;
    incoming.onload = () => {
      if (request !== imageRequest) return;
      incoming.classList.add('is-visible');
      visibleImage.classList.remove('is-visible');
      visibleImage = incoming;
      incoming.onload = null;
    };
    incoming.onerror = () => {
      if (request === imageRequest) title.textContent = `${slide.title} · görsel yüklenemedi`;
      incoming.onload = null;
    };
    incoming.src = slide.src;
  }

  function showSlide(offset) {
    currentSlide = (currentSlide + offset + slides.length) % slides.length;
    renderSlide();
    scheduleSlideshow();
  }

  function scheduleSlideshow() {
    window.clearTimeout(slideshowTimer);
    if (!slideshowPlaying || document.hidden) return;
    slideshowTimer = window.setTimeout(() => {
      showSlide(1);
    }, intervalMs);
  }

  function setSlideshowPlaying(playing) {
    slideshowPlaying = playing;
    slideshowButton.setAttribute('aria-pressed', String(playing));
    slideshowButton.setAttribute('aria-label', playing ? 'Fotoğraf geçişlerini duraklat' : 'Fotoğraf geçişlerini başlat');
    slideshowLabel.textContent = playing ? 'Duraklat' : 'Devam et';
    slideshowIcon.innerHTML = playing
      ? '<svg viewBox="0 0 24 24"><path d="M8 5v14M16 5v14"/></svg>'
      : '<svg viewBox="0 0 24 24"><path d="m8 5 11 7-11 7z"/></svg>';
    scheduleSlideshow();
  }

  function setAudioPlaying(playing) {
    audioButton.setAttribute('aria-pressed', String(playing));
    audioButton.setAttribute('aria-label', playing ? 'Müziği duraklat' : 'Müziği başlat');
    audioButtonLabel.textContent = playing ? 'Müziği duraklat' : 'Müziği başlat';
    audioIcon.innerHTML = playing
      ? '<svg class="pause-icon" viewBox="0 0 24 24"><path d="M9 6v12M15 6v12"/></svg>'
      : '<svg viewBox="0 0 24 24"><path d="m9 6 10 6-10 6z"/></svg>';
    audioStatus.textContent = playing ? 'Müzik çalıyor.' : 'Müzik kapalı.';
  }

  previousButton.addEventListener('click', () => showSlide(-1));
  nextButton.addEventListener('click', () => showSlide(1));
  slideshowButton.addEventListener('click', () => setSlideshowPlaying(!slideshowPlaying));

  audio.volume = Number(volumeControl.value) / 100;
  volumeControl.addEventListener('input', () => {
    const volume = Number(volumeControl.value);
    audio.volume = volume / 100;
    volumeValue.textContent = `${volume}%`;
  });

  audioButton.addEventListener('click', async () => {
    if (audio.paused) {
      try {
        await audio.play();
        setAudioPlaying(true);
      } catch {
        setAudioPlaying(false);
        audioStatus.textContent = 'Müzik başlatılamadı. Lütfen yeniden deneyin.';
      }
    } else {
      audio.pause();
      setAudioPlaying(false);
    }
  });
  audio.addEventListener('play', () => setAudioPlaying(true));
  audio.addEventListener('pause', () => setAudioPlaying(false));
  audio.addEventListener('error', () => {
    audioStatus.textContent = 'Müzik dosyası yüklenemedi.';
  });

  document.addEventListener('visibilitychange', scheduleSlideshow);
  document.addEventListener('keydown', (event) => {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.target instanceof HTMLElement && event.target.closest('input, textarea, select, button, a')) return;
    if (event.key === 'ArrowLeft') showSlide(-1);
    if (event.key === 'ArrowRight') showSlide(1);
  });

  renderSlide();
  setSlideshowPlaying(slideshowPlaying);
})();
