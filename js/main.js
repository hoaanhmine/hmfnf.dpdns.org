// Lấy danh sách truyện từ file JSON tĩnh
const DATA_URL = 'https://corsproxy.io/?https://docs.otruyenapi.com/otruyen.json';

async function fetchStories() {
  const res = await fetch(DATA_URL);
  if (!res.ok) throw new Error('Không lấy được danh sách truyện');
  return res.json();
}

function renderStories(stories) {
  const list = document.getElementById('story-list');
  list.innerHTML = '';
  stories.forEach(story => {
    const li = document.createElement('li');
    li.innerHTML = `<b>${story.name}</b> <span style="color:#888">(${story.author})</span>`;
    list.appendChild(li);
  });
}

async function loadHome() {
  document.getElementById('main').innerHTML = `
    <h1>Danh sách truyện (demo)</h1>
    <ul id="story-list"></ul>
  `;
  try {
    const data = await fetchStories();
    renderStories(data);
  } catch (e) {
    document.getElementById('main').innerHTML = 'Lỗi tải truyện!<br>' + e;
  }
}

window.onload = loadHome;
