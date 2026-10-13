const screens = document.querySelectorAll('.screen');
function go(id){
  screens.forEach(s => s.classList.toggle('active', s.id === id));
  if (id !== 'screenMusica') stopVideo();   // para la canción al salir
}
document.querySelectorAll('[data-go]').forEach(b =>
  b.addEventListener('click', () => go(b.dataset.go))
);

// Contenido de cada regalo (cambia los textos cuando los tengas)
const regalos = {
  carta:  {screen:'screenCarta', img:'iconocarta.png',  t:'Una carta para ti',  m:'Aquí va tu carta 💛'},
  flores: {screen:'screenFlores', img:'iconoflores.png', t:'Unas flores para ti', m:''},
  fotos:  {screen:'screenFotos', img:'iconofotos.png',  t:'Nuestras fotos',      m:'Aquí van nuestras fotos 📸'},
  musica: {screen:'screenMusica', img:'iconomusica.png', t:'Una canción para ti', m:'Aquí va tu canción 🎵'},
};
const modal = document.getElementById('modal');
document.querySelectorAll('.gift').forEach(g =>
  g.addEventListener('click', () => {
    const r = regalos[g.dataset.gift];
    g.classList.add('opened');
    if (r.screen) { go(r.screen); return; }   // regalos con pantalla propia
    document.getElementById('modalImg').src = r.img;
    document.getElementById('modalTitle').textContent = r.t;
    document.getElementById('modalText').textContent = r.m;
    g.classList.add('opened');
    modal.classList.add('show');
  })
);
document.getElementById('closeModal').addEventListener('click', () => modal.classList.remove('show'));

// Si aún no existe capiflores.png, muestra un 💐 provisional
const bouquetImg = document.querySelector('.bouquet img');
function bouquetFallback(){
  const s = document.createElement('span');
  s.className = 'fallback'; s.textContent = '💐';
  bouquetImg.replaceWith(s);
}
bouquetImg.addEventListener('error', bouquetFallback);
if (bouquetImg.complete && !bouquetImg.naturalWidth) bouquetFallback();

// ---------- Música ----------
// Pega aquí SOLO el ID del video de YouTube.
// Ej: si el link es https://www.youtube.com/watch?v=AbC123xyz  ->  'AbC123xyz'
const YOUTUBE_ID = 'niKF-24rpGs';

const videoBox = document.getElementById('video');
if (YOUTUBE_ID) {
  videoBox.innerHTML =
    '<iframe src="https://www.youtube.com/embed/' + YOUTUBE_ID + '?rel=0" ' +
    'title="Canción" allow="accelerometer; autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>';
}
function stopVideo(){
  const f = videoBox && videoBox.querySelector('iframe');
  if (f) f.src = f.src;   // recarga el iframe y detiene el audio
}

// Si una foto (foto1.jpg ... foto8.jpg) aún no existe, se muestra la imagen de ejemplo
document.querySelectorAll('.polaroid .photo').forEach(img => {
  const sinFoto = () => { img.removeAttribute('src'); img.alt = ''; };
  img.addEventListener('error', sinFoto);
  if (img.complete && !img.naturalWidth) sinFoto();
})