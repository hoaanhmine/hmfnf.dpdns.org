// Lấy danh sách truyện từ otruyenapi.com và render ra trang chủ
const API_BASE = 'https://api.otruyenapi.com/v1';

async function fetchStories(page = 1) {
  const res = await fetch(`${API_BASE}/stories?page=${page}`);
  if (!res.ok) throw new Error('Không lấy được danh sách truyện');
  return res.json();
}

function renderStories(stories) {
  const list = document.getElementById('story-list');
  list.innerHTML = '';
  stories.forEach(story => {
    const li = document.createElement('li');
    li.innerHTML = `<a href="#" onclick="showStory('${story.slug}')">${story.name}</a>`;
    list.appendChild(li);
  });
}

async function loadHome() {
  document.getElementById('main').innerHTML = `
    <h1>Danh sách truyện</h1>
    <ul id="story-list"></ul>
  `;
  try {
    const data = await fetchStories();
    renderStories(data.data);
  } catch (e) {
    document.getElementById('main').innerHTML = 'Lỗi tải truyện!';
  }
}

async function showStory(slug) {
  document.getElementById('main').innerHTML = 'Đang tải chi tiết truyện...';
  const res = await fetch(`${API_BASE}/stories/${slug}`);
  if (!res.ok) {
    document.getElementById('main').innerHTML = 'Không tìm thấy truyện!';
    return;
  }
  const data = await res.json();
  document.getElementById('main').innerHTML = `
    <button onclick="loadHome()">← Quay lại</button>
    <h2>${data.data.name}</h2>
    <div><b>Tác giả:</b> ${data.data.author}</div>
    <div><b>Mô tả:</b> ${data.data.description || ''}</div>
    <div><b>Chương:</b> <ul id="chapter-list"></ul></div>
  `;
  // Lấy danh sách chương
  const chapRes = await fetch(`${API_BASE}/stories/${slug}/chapters`);
  if (chapRes.ok) {
    const chapData = await chapRes.json();
    const chapList = document.getElementById('chapter-list');
    chapData.data.forEach(chap => {
      const li = document.createElement('li');
      li.innerHTML = `<a href="#" onclick="showChapter('${slug}','${chap.number}')">${chap.name}</a>`;
      chapList.appendChild(li);
    });
  }
}

async function showChapter(slug, number) {
  document.getElementById('main').innerHTML = 'Đang tải chương...';
  const res = await fetch(`${API_BASE}/stories/${slug}/chapters/${number}`);
  if (!res.ok) {
    document.getElementById('main').innerHTML = 'Không tìm thấy chương!';
    return;
  }
  const data = await res.json();
  document.getElementById('main').innerHTML = `
    <button onclick="showStory('${slug}')">← Quay lại truyện</button>
    <h3>${data.data.name}</h3>
    <div>${data.data.content.replace(/\n/g,'<br>')}</div>
  `;
}

// Khởi động trang chủ khi load
window.onload = loadHome;
