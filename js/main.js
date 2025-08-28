// Lấy danh sách anime mới nhất từ Anime-API
const ANIME_API = 'https://corsproxy.io/?https://anime-api-one.vercel.app/api/anime/gogoanime/recent-episodes';

async function fetchAnime() {
  const res = await fetch(ANIME_API);
  if (!res.ok) throw new Error('Không lấy được danh sách anime');
  return res.json();
}

function renderAnime(animeList) {
  const main = document.getElementById('main');
  main.innerHTML = `<h1>Anime mới cập nhật</h1><div id="anime-list" style="display:flex;flex-wrap:wrap;gap:18px;"></div>`;
  const list = document.getElementById('anime-list');
  animeList.forEach(anime => {
    const div = document.createElement('div');
    div.style = 'width:160px;background:#fff;border-radius:8px;box-shadow:0 2px 8px #0001;padding:10px;text-align:center;';
    div.innerHTML = `
      <img src="${anime.animeImg}" alt="${anime.animeTitle}" style="width:100%;border-radius:6px;object-fit:cover;aspect-ratio:3/4;">
      <div style="margin:8px 0 4px 0;font-weight:bold;">${anime.animeTitle}</div>
      <a href="${anime.episodeUrl}" target="_blank" style="color:#3a86ff;text-decoration:none;">Xem ngay</a>
    `;
    list.appendChild(div);
  });
}

async function loadHome() {
  document.getElementById('main').innerHTML = 'Đang tải anime...';
  try {
    const data = await fetchAnime();
    renderAnime(data.results || []);
  } catch (e) {
    document.getElementById('main').innerHTML = 'Lỗi tải anime!<br>' + e;
  }
}

window.onload = loadHome;
