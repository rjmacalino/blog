'use strict';

// hobby blog. card data lives here, rendering below.
// to use real posters, drop assets/<name>.jpg and it replaces the gradient placeholder.

(function () {
  const DATA = {
    games: [
      { title: 'Dota 2', emoji: '⚔️', img: 'dota2', url: 'https://www.dota2.com',
        blurb: 'The deepest MOBA there is. 100+ heroes, endless strategy, and the highest highs after a clutch teamfight.',
        tags: ['MOBA', 'Ranked', 'Valve'], theme: 'crimson' },
      { title: 'Resident Evil', emoji: '🧟', img: 'residentevil', url: 'https://www.residentevil.com',
        blurb: 'Survival horror at its finest. From Raccoon City to the village. Tense, gory and endlessly replayable.',
        tags: ['Survival Horror', 'Capcom', 'Franchise'], theme: 'toxic' },
      { title: 'Genshin Impact', emoji: '🗡️', img: 'genshin', url: 'https://genshin.hoyoverse.com',
        blurb: 'A gorgeous open world I keep coming back to. Teyvat, elemental combos, and one more wish on the banner.',
        tags: ['Open World', 'Gacha', 'miHoYo'], theme: 'aether' },
    ],
    anime: [
      { title: 'Naruto', emoji: '🍥', img: 'naruto', url: 'https://www.viz.com/naruto',
        blurb: 'The ninja way. Grew up with this one, and the Pain arc still goes unbelievably hard.',
        tags: ['Shonen', 'Classic'], theme: 'ember' },
      { title: 'One Piece', emoji: '🏴‍☠️', img: 'onepiece', url: 'https://www.viz.com/one-piece',
        blurb: 'The greatest adventure ever told. The Straw Hats, the world-building, the emotional gut-punches.',
        tags: ['Shonen', 'Adventure'], theme: 'ocean' },
      { title: 'Attack on Titan', emoji: '🗡️', img: 'aot', url: 'https://shingeki.tv',
        blurb: 'Peak storytelling. Every reveal flips the board. Few shows stick the landing like this.',
        tags: ['Dark', 'Thriller'], theme: 'iron' },
      { title: 'Hunter x Hunter', emoji: '🐸', img: 'hxh', url: 'https://www.viz.com/hunter-x-hunter',
        blurb: 'Nen, the Chimera Ant arc, and the smartest power system in anime. Gon and Killua forever.',
        tags: ['Shonen', 'Strategy'], theme: 'aether' },
    ],
    shows: [
      { title: 'Friends', emoji: '☕', img: 'friends', url: 'https://en.wikipedia.org/wiki/Friends',
        blurb: 'The one I rewatch on loop. Could it BE any more comforting?',
        tags: ['Sitcom', '90s'], theme: 'ember' },
      { title: 'The Big Bang Theory', emoji: '⚛️', img: 'bigbang', url: 'https://en.wikipedia.org/wiki/The_Big_Bang_Theory',
        blurb: 'Bazinga. Nerd humor that hits home a little too often.',
        tags: ['Sitcom', 'Nerdy'], theme: 'aether' },
      { title: 'How I Met Your Mother', emoji: '☂️', img: 'himym', url: 'https://en.wikipedia.org/wiki/How_I_Met_Your_Mother',
        blurb: 'Legen, wait for it, dary. The Playbook, the slaps, the feels.',
        tags: ['Sitcom', 'Drama'], theme: 'ocean' },
      { title: 'Brooklyn Nine-Nine', emoji: '🚓', img: 'b99', url: 'https://en.wikipedia.org/wiki/Brooklyn_Nine-Nine',
        blurb: 'Cool cool cool cool. The best ensemble comedy of its era. Noice. Toit.',
        tags: ['Sitcom', 'Workplace'], theme: 'toxic' },
    ],
    screen: [
      { title: 'Game of Thrones', emoji: '🐉', img: 'got', url: 'https://www.hbo.com/game-of-thrones',
        blurb: 'Westeros at its peak was untouchable. Dragons, politics, betrayal, and winter came hard.',
        tags: ['Fantasy', 'Epic'], theme: 'iron' },
      { title: 'Marvel (MCU)', emoji: '🕷️', img: 'mcu', url: 'https://www.marvel.com/movies',
        blurb: 'A decade-long saga that paid off in Endgame. I was there for every "I am Iron Man."',
        tags: ['Superhero', 'Cinematic Universe'], theme: 'crimson' },
      { title: 'Justice League', emoji: '🦇', img: 'justiceleague', url: 'https://www.dc.com/movies/justice-league-2017',
        blurb: 'The DC trinity and friends. The Snyder Cut redemption arc was real.',
        tags: ['Superhero', 'DC'], theme: 'ocean' },
    ],
  };

  function cardHTML(item) {
    const isWiki = item.url.includes('wikipedia.org');
    const linkLabel = isWiki ? 'Wikipedia ↗' : 'Official site ↗';
    return `
      <a class="hcard theme-${item.theme}" href="${item.url}" target="_blank" rel="noopener"
         aria-label="${item.title}, ${isWiki ? 'read on Wikipedia' : 'visit official site'}">
        <div class="hcard-media">
          <img src="assets/${item.img}.jpg" alt="${item.title}" loading="lazy"
               onerror="this.style.display='none'" />
          <span class="hcard-emoji" aria-hidden="true">${item.emoji}</span>
          <span class="hcard-visit" aria-hidden="true">${linkLabel}</span>
        </div>
        <div class="hcard-body">
          <h3>${item.title}</h3>
          <p>${item.blurb}</p>
          <ul class="hcard-tags" role="list">
            ${item.tags.map(t => `<li>${t}</li>`).join('')}
          </ul>
        </div>
      </a>`;
  }

  function render(target, list) {
    const el = document.getElementById(target);
    if (!el) return;
    el.innerHTML = list.map(cardHTML).join('');
  }

  // mobile menu toggle
  function initNav() {
    const toggle = document.querySelector('.nav-toggle');
    const menu = document.querySelector('.nav-menu');
    toggle?.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    menu?.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => menu.classList.remove('open')));
  }

  // solidify navbar + highlight the section you're on
  function initScroll() {
    const navbar = document.getElementById('navbar');
    const links = document.querySelectorAll('.nav-menu a');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    });

    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${e.target.id}`));
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(s => obs.observe(s));
  }

  // fade cards in as they enter the viewport
  function initReveal() {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.15 });
    document.querySelectorAll('.hcard, .about-card').forEach(el => {
      el.classList.add('reveal');
      obs.observe(el);
    });
  }

  // lean the card toward the cursor
  function initTilt() {
    document.querySelectorAll('.card-grid').forEach(grid => {
      grid.addEventListener('mousemove', (e) => {
        const card = e.target.closest('.hcard');
        if (!card) return;
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `perspective(700px) rotateY(${px * 6}deg) rotateX(${-py * 6}deg) translateY(-4px)`;
      });
      grid.addEventListener('mouseleave', () => {
        grid.querySelectorAll('.hcard').forEach(c => c.style.transform = '');
      });
      grid.addEventListener('mouseout', (e) => {
        const card = e.target.closest('.hcard');
        if (card && !card.contains(e.relatedTarget)) card.style.transform = '';
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    console.log('%c🎮 Player 1 has entered. GG. ', 'color:#b14cff;font-size:1.2rem;font-weight:bold;');
    render('games-grid', DATA.games);
    render('anime-grid', DATA.anime);
    render('shows-grid', DATA.shows);
    render('screen-grid', DATA.screen);
    initNav();
    initScroll();
    initReveal();
    initTilt();
  });
})();
