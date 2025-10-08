
////////////////////////////////// EVENT PAGE JS ////////////////////////////////////////////////////////

document.addEventListener('DOMContentLoaded', () => {

  // ----------------- Corporate Section (Advertising Style) -----------------
  async function loadCorporate() {
    const container = document.getElementById('Corporate-container');
    try {
      const res = await fetch('http://localhost:3000/api/posts/section/Corporate');
      const posts = await res.json();

      if (!posts.length) {
        container.innerHTML = '<p>No Corporate posts available.</p>';
        return;
      }

      const featured = posts[0];
      const sidePosts = posts.slice(1);

      const featuredHTML = `
        <a href="post-details.html?id=${featured._id}" class="featured-card">
          <img src="http://localhost:3000/IMAGE/${featured.image}" alt="${featured.title}" />
          <div class="featured-info">
            <h3>${featured.title}</h3>
            <p>${featured.content || ''}</p>
          </div>
        </a>
      `;

      const sideHTML = sidePosts.map(post => `
        <a href="post-details.html?id=${post._id}" class="side-card">
          <div style="position:relative;">
            <img src="http://localhost:3000/IMAGE/${post.image}" alt="${post.title}" />
          </div>
          <div class="side-info">
            <div class="title">${post.title}</div>
            <p class="excerpt">${post.content ? post.content.substring(0, 100) + '...' : ''}</p>
          </div>
        </a>
      `).join("");

      container.innerHTML = featuredHTML + `<div class="side-cards">${sideHTML}</div>`;

    } catch (err) {
      console.error("Error loading Corporate posts:", err);
      container.innerHTML = '<p>Error loading Corporate posts.</p>';
    }
  }

  // ----------------- Awards Section (Marketing Style) -----------------
  async function loadAwards() {
    const container = document.getElementById('Awards-container');
    try {
      const res = await fetch('http://localhost:3000/api/posts/section/Awards');
      const posts = await res.json();

      if (!posts.length) {
        container.innerHTML = '<p>No Awards posts available.</p>';
        return;
      }

      const bigCards = posts.slice(0, 2);
      const smallCards = posts.slice(2, 5);

      const bigCardsHTML = bigCards.map(
        (post) => `
          <a href="post-details.html?id=${post._id}" class="big-card">
            <img src="http://localhost:3000/IMAGE/${post.image}" alt="${post.title}" />
            <div class="info">
              <div><span class="section"></span></div>
              <div class="title">${post.title}</div>
              <p class="politics-excerpt">${post.content ? post.content.substring(0, 100) + '...' : ''}</p>
            </div>
          </a>
        `
      ).join("");

      const smallCardsHTML = smallCards.map(
        (post) => `
          <a href="post-details.html?id=${post._id}" class="small-card">
            <img src="http://localhost:3000/IMAGE/${post.image}" alt="${post.title}" />
            <div class="info">
              <span class="section"></span>
              <div class="title">${post.title}</div>
              <p class="politics-excerpt">${post.content?.substring(0, 100) || ''}...</p>
            </div>
          </a>
        `
      ).join("");

      container.innerHTML = `
        <div class="big-cards">${bigCardsHTML}</div>
        <div class="small-cards">${smallCardsHTML}</div>
      `;

    } catch (err) {
      console.error("Error loading Awards posts:", err);
      container.innerHTML = '<p>Error loading Awards posts.</p>';
    }
  }

  // ----------------- Venue Section (Brands Style) -----------------
  async function loadVenue() {
    const container = document.getElementById('Venue-container');
    try {
      const res = await fetch('http://localhost:3000/api/posts/section/Venue');
      const posts = await res.json();

      if (!posts.length) {
        container.innerHTML = '<p>No Venue posts available.</p>';
        return;
      }

      container.innerHTML = posts.map((post, i) => `
        <a href="post-details.html?id=${post._id}" class="politics-card" style="animation-delay: ${i * 0.1}s">
          <div class="politics-image">
            <img src="http://localhost:3000/IMAGE/${post.image}" alt="${post.title}">
          </div>
          <div class="politics-content">
            <div><span class="section"></span></div>
            <h3 class="politics-title">${post.title}</h3>
            <p class="politics-excerpt">${post.content.substring(0, 100)}...</p>
          </div>
        </a>
      `).join("");

    } catch (err) {
      console.error("Error loading Venue posts:", err);
      container.innerHTML = '<p>Error loading Venue posts.</p>';
    }
  }

  // ----------------- Advertising Section -----------------
  async function loadAdvertisingPosts() {
    try {
      const res = await fetch("http://localhost:3000/api/posts/section/advertising");
      const posts = await res.json();
      const container = document.getElementById("advertising-container");

      if (!posts.length) {
        container.innerHTML = '<p style="color:white">No posts available</p>';
        return;
      }

      const featured = posts[0];
      const sidePosts = posts.slice(1);

      const featuredHTML = `
        <a href="post-details.html?id=${featured._id}" class="featured-card">
          <img src="http://localhost:3000/IMAGE/${featured.image}" alt="${featured.title}" />
          <div class="featured-info">
            <h3>${featured.title}</h3>
            <p>${featured.content || ''}</p>
          </div>
        </a>
      `;

      const sideHTML = sidePosts.map(post => `
        <a href="post-details.html?id=${post._id}" class="side-card">
          <div style="position:relative;">
            <img src="http://localhost:3000/IMAGE/${post.image}" alt="${post.title}" />
          </div>
          <div class="side-info">
            <div class="title">${post.title}</div>
            <p class="excerpt">${post.content ? post.content.substring(0, 100) + '...' : ''}</p>
          </div>
        </a>
      `).join("");

      container.innerHTML = featuredHTML + `<div class="side-cards">${sideHTML}</div>`;

    } catch (err) {
      console.error("Error loading advertising posts:", err);
      document.getElementById("advertising-container").innerHTML =
        '<p style="color:red">Error loading posts</p>';
    }
  }

  // ----------------- Marketing Section -----------------
  async function loadMarketingPosts() {
    try {
      const res = await fetch("http://localhost:3000/api/posts/section/marketing");
      const posts = await res.json();
      const container = document.getElementById("marketing-container");

      if (!posts.length) {
        container.innerHTML = "<p>No marketing posts available.</p>";
        return;
      }

      const bigCards = posts.slice(0, 2);
      const smallCards = posts.slice(2, 5);

      const bigCardsHTML = bigCards.map(
        (post) => `
          <a href="post-details.html?id=${post._id}" class="big-card">
            <img src="http://localhost:3000/IMAGE/${post.image}" alt="${post.title}" />
            <div class="info">
              <div><span class="section"></span></div>
              <div class="title">${post.title}</div>
              <p class="politics-excerpt">${post.content ? post.content.substring(0, 100) + '...' : ''}</p>
            </div>
          </a>
        `
      ).join("");

      const smallCardsHTML = smallCards.map(
        (post) => `
          <a href="post-details.html?id=${post._id}" class="small-card">
            <img src="http://localhost:3000/IMAGE/${post.image}" alt="${post.title}" />
            <div class="info">
              <span class="section"></span>
              <div class="title">${post.title}</div>
              <p class="politics-excerpt">${post.content?.substring(0, 100) || ''}...</p>
            </div>
          </a>
        `
      ).join("");

      container.innerHTML = `
        <div class="big-cards">${bigCardsHTML}</div>
        <div class="small-cards">${smallCardsHTML}</div>
      `;
    } catch (err) {
      console.error("Error loading marketing posts:", err);
      document.getElementById("marketing-container").innerHTML =
        "<p>Error loading marketing posts.</p>";
    }
  }

  // ----------------- Brands Section -----------------
  async function loadBrandsPosts() {
    try {
      const response = await fetch("http://localhost:3000/api/posts/section/brands");
      const posts = await response.json();
      const container = document.getElementById("brands-container");

      if (!posts.length) {
        container.innerHTML = "<p>No brand posts found.</p>";
        return;
      }

      container.innerHTML = posts.map((post, i) => `
        <a href="post-details.html?id=${post._id}" class="politics-card" style="animation-delay: ${i * 0.1}s">
          <div class="politics-image">
            <img src="http://localhost:3000/IMAGE/${post.image}" alt="${post.title}">
          </div>
          <div class="politics-content">
            <div><span class="section"></span></div>
            <h3 class="politics-title">${post.title}</h3>
            <p class="politics-excerpt">${post.content.substring(0, 100)}...</p>
          </div>
        </a>
      `).join("");
    } catch (error) {
      console.error("Error loading brands posts:", error);
      document.getElementById("brands-container").innerHTML =
        "<p>Error loading brand posts.</p>";
    }
  }

  // ----------------- Call all sections -----------------
  loadCorporate();
  loadAwards();
  loadVenue();
  loadAdvertisingPosts();
  loadMarketingPosts();
  loadBrandsPosts();

});


//////home page js/////
const apiBase = "http://localhost:3000/api";

const isValidImage = (image) => image && typeof image === "string" && image.trim() !== "";

async function fetchAllData() {
  try {
    const postsRes = await fetch(`${apiBase}/posts/magazine`);
    const adsRes = await fetch(`${apiBase}/advertisements`);

    const postsData = await postsRes.json();
    const adsData = await adsRes.json();

    // Sort by createdAt descending → latest post first
    postsData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // Split posts
    const leftCount = 12;
    const centerCount = 15;
    const rightCount = 25;

    const centerPosts = postsData.slice(0, centerCount);
    const leftPosts = postsData.slice(centerCount, centerCount + leftCount);
    const rightPosts = postsData.slice(centerCount + leftCount, centerCount + leftCount + rightCount);

    renderLeftSidebar(leftPosts);
    renderCenterPosts(centerPosts); // top post = latest
    renderRightSidebar(rightPosts, adsData);

  } catch (err) {
    console.error("Error fetching data:", err);
  }
}

function renderLeftSidebar(posts) {
  const container = document.getElementById("leftSidebar");
  container.style.overflowY = "auto";

  container.innerHTML = posts.map(post => `
    <div class="sidebar-post vertical">
      <a href="post-details.html?id=${post._id}">
        <img class="fade-img" src="http://localhost:3000/IMAGE/${isValidImage(post.image) ? post.image : 'default.jpg'}" />
        <div class="info">
          <h4>${post.title}</h4>
          <p>${post.content ? post.content.substring(0, 120) : ""}...</p>
        </div>
      </a>
    </div>
  `).join("");
}

function renderCenterPosts(posts) {
  const container = document.getElementById("centerPosts");
  container.style.overflowY = "auto";

  if (!posts.length) return;

  const topPost = posts[0];          // latest post = main
  const otherPosts = posts.slice(1); // rest

  const topHTML = `
    <div class="main-post-item large">
      <a href="post-details.html?id=${topPost._id}">
        <img class="fade-img" src="http://localhost:3000/IMAGE/${isValidImage(topPost.image) ? topPost.image : 'default.jpg'}" />
        <div class="content">
          <h2>${topPost.title}</h2>
          <p>${topPost.content ? topPost.content.substring(0, 200) : ""}...</p>
        </div>
      </a>
    </div>
  `;

  const otherHTML = otherPosts.length > 0 ? `<div class="other-main-posts">
    ${otherPosts.map(post => `
      <div class="main-post-item small">
        <a href="post-details.html?id=${post._id}">
          <img class="fade-img" src="http://localhost:3000/IMAGE/${isValidImage(post.image) ? post.image : 'default.jpg'}" />
          <div class="content">
            <h3>${post.title}</h3>
            <p>${post.content ? post.content.substring(0, 100) : ""}...</p>
          </div>
        </a>
      </div>
    `).join('')}
  </div>` : "";

  container.innerHTML = topHTML + otherHTML;
}

function renderRightSidebar(posts, ads) {
  const adContainer = document.getElementById("rightSidebarAdContent");
  const postsContainer = document.getElementById("rightSidebarPosts");

  adContainer.innerHTML = '';
  ads.forEach(ad => {
    let adHTML = '';
    if (ad.mediaType === 'image') {
      adHTML = `<img class="fade-img" src="http://localhost:3000/MEDIA/${ad.mediaFile}" />`;
    } else if (ad.mediaType === 'video') {
      adHTML = `<video autoplay muted loop controls>
                  <source src="http://localhost:3000/MEDIA/${ad.mediaFile}" type="video/mp4"/>
                </video>`;
    }
    adContainer.innerHTML += `<div class="ad-item">${adHTML}</div>`;
  });

  postsContainer.innerHTML = '';
  posts.forEach(post => {
    postsContainer.innerHTML += `
      <div class="sidebar-post horizontal">
        <a href="post-details.html?id=${post._id}" style="display:flex; gap:10px; align-items:center;">
          <img class="fade-img" src="http://localhost:3000/IMAGE/${isValidImage(post.image) ? post.image : 'default.jpg'}" 
               style=" width: 101px;  height: 71px; object-fit:cover; border-radius:5px;" />
          <div class="info">
            <h4>${post.title}</h4>
            <p>${post.content ? post.content.substring(0, 50) : ''}...</p>
          </div>
        </a>
      </div>
    `;


  });
}

document.addEventListener("DOMContentLoaded", fetchAllData);




/////////


// ================== BANNER SLIDER FUNCTIONALITY ========================///
let currentBannerIndex = 0;
let bannerSlides = [];
let bannerInterval;

async function loadBanners() {
  try {
    const response = await fetch('http://localhost:3000/api/banners');
    const banners = await response.json();

    if (banners.length === 0) {
      document.getElementById('bannerSlider').innerHTML =
        '<div class="banner-slide"><p>No banners available</p></div>';
      return;
    }

    bannerSlides = banners;
    renderBanners();
    startBannerAutoSlide();

    // Hover pause/resume
    const bannerSlider = document.getElementById('bannerSlider');
    bannerSlider.addEventListener('mouseenter', stopBannerAutoSlide);
    bannerSlider.addEventListener('mouseleave', startBannerAutoSlide);
  } catch (error) {
    console.error('Error loading banners:', error);
    document.getElementById('bannerSlider').innerHTML =
      '<div class="banner-slide"><p>Error loading banners</p></div>';
  }
}

function renderBanners() {
  const slider = document.getElementById('bannerSlider');
  slider.innerHTML = '';

  bannerSlides.forEach((banner, index) => {
    const link = banner.link ? banner.link : '#';

    const slideDiv = document.createElement('div');
    slideDiv.className = 'banner-slide';
    if (index === 0) slideDiv.classList.add('active'); // first image show hogi

    const anchor = document.createElement('a');
    anchor.href = link;
    anchor.className = 'banner-link';

    const img = document.createElement('img');
    img.src = `http://localhost:3000/IMAGE/${banner.image}`;
    img.alt = 'Banner';
    img.className = 'banner-image';
    img.style.objectFit = 'cover';

    anchor.appendChild(img);
    slideDiv.appendChild(anchor);
    slider.appendChild(slideDiv);
  });
}

function goToBannerSlide(index) {
  const slides = document.querySelectorAll('.banner-slide');
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });
  currentBannerIndex = index;
}

function nextBannerSlide() {
  currentBannerIndex = (currentBannerIndex + 1) % bannerSlides.length;
  goToBannerSlide(currentBannerIndex);
}

function prevBannerSlide() {
  currentBannerIndex =
    (currentBannerIndex - 1 + bannerSlides.length) % bannerSlides.length;
  goToBannerSlide(currentBannerIndex);
}

function startBannerAutoSlide() {
  clearInterval(bannerInterval);
  bannerInterval = setInterval(nextBannerSlide, 3000); // 3 sec me change
}

function stopBannerAutoSlide() {
  clearInterval(bannerInterval);
}

document.addEventListener('DOMContentLoaded', loadBanners);


// ================== POST DETAILS CLICK ========================///
async function loadPostsBySection(sectionName, containerId) {
  try {
    const res = await fetch(`http://localhost:3000/api/posts/section/${sectionName}`);
    if (!res.ok) throw new Error("Failed to fetch posts");
    const posts = await res.json();

    if (!posts.length) {
      document.getElementById(containerId).innerHTML = `<p>No posts in ${sectionName} section.</p>`;
      return;
    }

    let html = "";
    posts.forEach(post => {
      html += `
        <div class="post-card">
          <a href="post-details.html?id=${post._id}">
            <img src="http://localhost:3000/IMAGE/${post.image}" alt="${post.title}" />
            <h3>${post.title}</h3>
          </a>
          <p>${post.content.substring(0, 100)}...</p>
        </div>`;
    });

    document.getElementById(containerId).innerHTML = html;
  } catch (err) {
    console.error(err);
    document.getElementById(containerId).innerHTML = `<p>Error loading posts.</p>`;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadSportsPosts();
  loadEventPosts();
  loadPostsBySection('magazine', 'newsContainer');
  loadPostsBySection('politics', 'politics-container');
  loadPostsBySection('digital', 'digital-container');
  loadPostsBySection('social', 'social-container');
  loadPostsBySection('tv', 'televisionNewsSection');
  loadRightSidebarAdvertisements();
});



// ///////ADVERSTING JS/////////////////
// async function loadAdvertisingPosts() {
//   try {
//     const res = await fetch("http://localhost:3000/api/posts/section/advertising");
//     const posts = await res.json();
//     console.log(posts);

//     const container = document.getElementById("advertising-container");

//     if (!posts.length) {
//       container.innerHTML = '<p style="color:white">No posts available</p>';
//       return;
//     }

//     const featured = posts[0];
//     const sidePosts = posts.slice(1);

//     const featuredHTML = `
//   <a href="post-details.html?id=${featured._id}" class="featured-card">
//       <img src="http://localhost:3000/IMAGE/${featured.image}" alt="${featured.title}" />
//       <div class="featured-info">
//           <h3>${featured.title}</h3>
//           <p>${featured.content || ''}</p>
//       </div>
//   </a>
// `;

//     const sideHTML = sidePosts.map(post => `
//    <a href="post-details.html?id=${post._id}" class="side-card">
//       <div style="position:relative;">
//         <img src="http://localhost:3000/IMAGE/${post.image}" alt="${post.title}" />
//       </div>
//       <div class="side-info">
//         <div class="title">${post.title}</div>
//         <p class="excerpt">${post.content ? post.content.substring(0, 100) + '...' : ''}</p>
//       </div>
//    </a>
// `).join("");

//     container.innerHTML = featuredHTML + `<div class="side-cards">${sideHTML}</div>`;

//   } catch (err) {
//     console.error("Error loading advertising posts:", err);
//     document.getElementById("advertising-container").innerHTML =
//       '<p style="color:red">Error loading posts</p>';
//   }
// }

// // Marketing Section
// async function loadMarketingPosts() {
//   try {
//     const res = await fetch("http://localhost:3000/api/posts/section/marketing");
//     const posts = await res.json();
//     const container = document.getElementById("marketing-container");

//     if (!posts.length) {
//       container.innerHTML = "<p>No marketing posts available.</p>";
//       return;
//     }

//     // First 2 posts for big cards
//     const bigCards = posts.slice(0, 2);
//     // Next 3 posts for small cards
//     const smallCards = posts.slice(2, 5);

//     const bigCardsHTML = bigCards
//       .map(
//         (post) => `
//       <a href="post-details.html?id=${post._id}" class="big-card">
//         <img src="http://localhost:3000/IMAGE/${post.image}" alt="${post.title}" />
//         <div class="info">
//           <div><span class="section"></span></div>
//           <div class="title">${post.title}</div>
//           <p class="politics-excerpt">${post.content ? post.content.substring(0, 100) + '...' : ''}</p>
//         </div>
//       </a>
//     `
//       )
//       .join("");

//     const smallCardsHTML = smallCards
//       .map(
//         (post) => `
//            <a href="post-details.html?id=${post._id}" class="small-card">
//           <img src="http://localhost:3000/IMAGE/${post.image}" alt="${post.title}" />
//           <div class="info">
//             <span class="section"></span>
//             <div class="title">${post.title}</div>
//             <p class="politics-excerpt">${post.content?.substring(0, 100) || ''}...</p>
//           </div>
//         </a>
//       `
//       )
//       .join("");

//     container.innerHTML = `
//       <div class="big-cards">${bigCardsHTML}</div>
//       <div class="small-cards">${smallCardsHTML}</div>
//     `;
//   } catch (err) {
//     console.error("Error loading marketing posts:", err);
//     document.getElementById("marketing-container").innerHTML =
//       "<p>Error loading marketing posts.</p>";
//   }
// }

// // Brands Section
// async function loadBrandsPosts() {
//   try {
//     const response = await fetch("http://localhost:3000/api/posts/section/brands");
//     const posts = await response.json();
//     const container = document.getElementById("brands-container");

//     if (!posts.length) {
//       container.innerHTML = "<p>No brand posts found.</p>";
//       return;
//     }

//     container.innerHTML = posts
//       .map((post, i) => `
//           <a href="post-details.html?id=${post._id}" class="politics-card" style="animation-delay: ${i * 0.1}s">
//           <div class="politics-image">
//             <img src="http://localhost:3000/IMAGE/${post.image}" alt="${post.title}">
//           </div>
//           <div class="politics-content">
//             <div>
//               <span class="section"></span>
//             </div>
//             <h3 class="politics-title">${post.title}</h3>
//             <p class="politics-excerpt">${post.content.substring(0, 100)}...</p>
//           </div>
//        </a>
//       `)
//       .join("");

//   } catch (error) {
//     console.error("Error loading brands posts:", error);
//     document.getElementById("brands-container").innerHTML =
//       "<p>Error loading brand posts.</p>";
//   }
// }

// loadAdvertisingPosts();
// loadMarketingPosts();
// loadBrandsPosts();

////////////////////////////////// TELEVISION JS //////////////////////////////////////

const loadTVPosts = () => {
  fetch("http://localhost:3000/api/posts/section/tv")
    .then(res => res.json())
    .then(posts => {
      const tvSection = document.getElementById("televisionNewsSection");
      if (!tvSection) return;

      tvSection.innerHTML = '';

      const gridContainer = document.createElement('div');
      gridContainer.className = 'tv-news-grid';

      const featuredDiv = document.createElement('div');
      featuredDiv.className = 'featured-news';

      const secondaryDiv = document.createElement('div');
      secondaryDiv.className = 'secondary-news';

      gridContainer.appendChild(featuredDiv);
      gridContainer.appendChild(secondaryDiv);

      const cardsContainer = document.createElement('div');
      cardsContainer.className = 'tv-news-cards';

      tvSection.appendChild(gridContainer);
      tvSection.appendChild(cardsContainer);

      posts.forEach((post, index) => {
        const postUrl = `television.html?id=${post._id}`;

        if (index === 0) {
          // Featured news
          featuredDiv.innerHTML = `
           <a href="post-details.html?id=${post._id}" class="featured-link">
              <img src="/IMAGE/${post.image}" alt="${post.title}">
              <div class="featured-overlay">
                <h2>${post.title}</h2>
                <p>${post.content || ''}</p>
              </div>
            </a>
          `;
        } else if (index === 1) {
          // Secondary news
          secondaryDiv.innerHTML = `
            <a href="post-details.html?id=${post._id}" class="secondary-link">
              <img src="/IMAGE/${post.image}" alt="${post.title}">
              <div class="secondary-content">
                <h3>${post.title}</h3>
                <p>${post.content || ''}</p>
              </div>
            </a>
          `;
        } else {
          // Remaining posts as cards
          const card = document.createElement('div');
          card.className = 'tv-card';
          card.innerHTML = `
           <a href="post-details.html?id=${post._id}" class="card-link">
              <h4>${post.title}</h4>
              <p>${post.content || ''}</p>
              <div class="tv-card-meta">
                <span>${post.date || ''}</span>
                <span>${post.author || ''}</span>
              </div>
              <img src="/IMAGE/${post.image}" alt="${post.title}">
            </a>
          `;
          cardsContainer.appendChild(card);
        }
      });
    })
    .catch(err => console.error("TV Posts Error:", err));
};

window.addEventListener('load', loadTVPosts);

// Digital Section
async function loadDigitalPosts() {
  try {
    const res = await fetch("http://localhost:3000/api/posts/section/digital");
    const posts = await res.json();

    const left = document.getElementById("leftColumn");
    const center = document.getElementById("centerColumn");
    const right = document.getElementById("rightColumn");

    left.innerHTML = '';
    center.innerHTML = '';
    right.innerHTML = '';

    if (!posts.length) return;

    posts.forEach((post, index) => {
      const card = `
          <a href="post-details.html?id=${post._id}">
            <div class="article-card">
              <img src="/IMAGE/${post.image}" alt="${post.title}">
              <div class="article-title">${post.title}</div>
              <p>${post.content || ''}</p>
            </div>
          </a>
      `;
      if (index % 3 === 0) left.innerHTML += card;
      else if (index % 3 === 1) center.innerHTML += card;
      else right.innerHTML += card;
    });
  } catch (err) {
    console.error("Digital posts load error:", err);
  }
}

window.addEventListener('load', loadDigitalPosts);

// Social Media Section
async function loadSocialMediaPosts() {
  try {
    const res = await fetch("http://localhost:3000/api/posts/section/social");
    const posts = await res.json();

    const leftMain = document.getElementById("leftMain");
    const rightGrid = document.getElementById("rightGrid");

    console.log("Total Posts Fetched:", posts.length);
    console.log("All Posts:", posts);

    leftMain.innerHTML = '';
    rightGrid.innerHTML = '';

    if (!posts || posts.length === 0) return;

    // First post -> big card
    const mainPost = posts[0];
    const mainPostUrl = `post-details.html?id=${mainPost._id}`;

    leftMain.innerHTML = `
      <a href="${mainPostUrl}" class="main-post-link">
        <img src="/IMAGE/${mainPost.image}" alt="${mainPost.title}">
        <div class="content">
          <div class="title">${mainPost.title}</div>
          <div class="meta"></div>
        </div>
      </a>
    `;

    // Remaining posts -> small cards in rightGrid
    const smallPosts = posts.slice(1);
    smallPosts.forEach((post, index) => {
      const postUrl = `post-details.html?id=${post._id}`;
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <a href="${postUrl}" class="card-link">
          <img src="/IMAGE/${post.image}" alt="${post.title}">
          <div class="content">
            <div class="article-title">${post.title}</div>
            <p>${post.content || ''}</p>
          </div>
        </a>
      `;

      rightGrid.appendChild(card);
      console.log(`Card ${index + 1} appended to rightGrid`);
    });

  } catch (err) {
    console.error("Error loading social media posts:", err);
  }
}

window.addEventListener('load', loadSocialMediaPosts);



// ✅ Category Posts Loader (Sports, Event, Politics)
const loadPosts = (category, containerId) => {
  fetch(`${apiBase}/posts/section/${category}`)
    .then((res) => res.json())
    .then((posts) => {
      const container = document.getElementById(containerId);
      if (!container) return;

      posts.forEach((post) => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
          <img src="http://localhost:3000/IMAGE/${post.image || "default.jpg"}" alt="${post.title}" />
          <div class="content">
            <h3>${post.title}</h3>
            <p>${post.content?.substring(0, 100) || ""}...</p>
          </div>
        `;
        container.appendChild(card);
      });
    })
    .catch((err) => console.error(`Error loading ${category} posts:`, err));
};

loadPosts("sports", "sports-container");
loadPosts("event", "event-container");
loadPosts("politics", "politics-container");
window.addEventListener("DOMContentLoaded", fetchAllPosts);

///////////////////// SPORTS JS/////////////
async function loadSportsPosts() {
  try {
    const res = await fetch("http://localhost:3000/api/posts/section/sports");
    const posts = await res.json();
    if (!posts.length) {
      document.getElementById("sports-container").innerHTML =
        '<p style="color:white">No posts available</p>';
      return;
    }
    const featured = posts[0];
    const sidePosts = posts.slice(1);
    const container = document.getElementById("sports-container");
    const featuredHTML = `
<a href="post-details.html?id=${featured._id}" class="featured-card">
  <img src="http://localhost:3000/IMAGE/${featured.image}" alt="${featured.title}" />
  <div class="featured-info">
    <div class="section"></div>
    <h3>${featured.title}</h3>
  </div>
</a>
      `;
    // Create side cards HTML
    const sideHTML = sidePosts
      .map(
        (post) => `
      <div class="side-card">
        <div style="position:relative;">
          <a href="post-details.html?id=${post._id}">
            <img src="http://localhost:3000/IMAGE/${post.image}" alt="${post.title}" />
          </a>
        </div>
        <div class="side-info">
          <div class="section"></div>
          <div class="title">
            <a href="post-details.html?id=${post._id}">${post.title}</a>
          </div>
          <p class="politics-excerpt">${post.content.substring(0, 100)}...</p>
        </div>
      </div>
    `
      )
      .join("");
    container.innerHTML =
      featuredHTML + `<div class="side-cards">${sideHTML}</div>`;
  } catch (err) {
    console.error("Error loading posts:", err);
    document.getElementById("sports-container").innerHTML =
      '<p style="color:red">Error loading posts</p>';
  }
}

loadSportsPosts();

////////////////////////  EVNET JS//////////
async function loadEventPosts() {
  try {
    const res = await fetch("http://localhost:3000/api/posts/section/event");
    const posts = await res.json();
    const container = document.getElementById("event-container");

    if (!posts.length) {
      container.innerHTML = "<p>No event posts available.</p>";
      return;
    }

    // First 2 posts for big cards
    const bigCards = posts.slice(0, 2);
    // Next 3 posts for small cards
    const smallCards = posts.slice(2, 5);

    const bigCardsHTML = bigCards
      .map(
        (post) => `
         <div class="big-card" onclick="window.location.href='post-details.html?id=${post._id}'">
          <img src="http://localhost:3000/IMAGE/${post.image}" alt="${post.title}" />
          <div class="info">
            <div>
              <span class="section"></span>
            </div>
            <div class="title">${post.title}</div>
            <p class="politics-excerpt">${post.content.substring(0, 100)}...</p>
          </div>
        </div>
      `
      )
      .join("");

    const smallCardsHTML = smallCards
      .map(
        (post) => `
        <div class="small-card" onclick="window.location.href='post-details.html?id=${post._id}'">
          <img src="http://localhost:3000/IMAGE/${post.image}" alt="${post.title}" />
          <div class="info">
            <span class="section"></span>
            <div class="title">${post.title}</div>
            <p class="politics-excerpt">${post.content.substring(0, 100)}...</p>
          </div>
        </div>
      `
      )
      .join("");

    container.innerHTML = `
        <div class="big-cards">${bigCardsHTML}</div>
        <div class="small-cards">${smallCardsHTML}</div>
      `;
  } catch (err) {
    console.error("Error loading event posts:", err);
    document.getElementById("event-container").innerHTML =
      "<p>Error loading events.</p>";
  }
}

loadEventPosts();

// ////////////////////////////    POLITICS JS///////////////////
async function loadPoliticsPosts() {
  try {
    const response = await fetch("http://localhost:3000/api/posts/section/politics");
    const posts = await response.json();
    const container = document.getElementById("politics-container");

    if (!posts.length) {
      container.innerHTML = "<p>No politics posts found.</p>";
      return;
    }

    container.innerHTML = posts
      .map(
        (post, i) => `
        <div class="politics-card" style="animation-delay: ${i * 0.1}s" onclick="window.location.href='post-details.html?id=${post._id}'">
          <div class="politics-image">
            <img src="http://localhost:3000/IMAGE/${post.image}" alt="${post.title}">
          </div>
          <div class="politics-content">
            <div>
              <span class="section"></span>
            </div>
            <h3 class="politics-title">${post.title}</h3>
            <p class="politics-excerpt">${post.content.substring(0, 100)}...</p>
          </div>
        </div>
      `
      )
      .join("");

  } catch (error) {
    console.error("Error loading politics posts:", error);
    document.getElementById("politics-container").innerHTML =
      "<p>Error loading posts.</p>";
  }
}

loadPoliticsPosts();

////////////// about js///////

fetch("/api/about")
  .then((res) => res.json())
  .then((data) => {
    document.getElementById("teamImage").src = data.teamImage;
    document.getElementById("aboutDesc").innerText = data.description;

    const container = document.getElementById("articlesContainer");

    data.articles.forEach((article) => {
      const div = document.createElement("div");
      div.className = "trending-box";
      div.innerHTML = `
        <img src="${article.img}" alt="Article Image">
        <h3>${article.title}</h3>
        <p>${article.subtitle}</p>
      `;

      container.appendChild(div);
    });
  });

//////mission/visson////

fetch("/api/mission-vision")
  .then((res) => res.json())
  .then((data) => {
    document.getElementById("missionTitle").innerText = data.mission.title;
    document.getElementById("missionContent").innerText = data.mission.content;
    document.getElementById("visionTitle").innerText = data.vision.title;
    document.getElementById("visionContent").innerText = data.vision.content;
  })
  .catch((err) => {
    console.error("Error fetching mission/vision:", err);
  });

//// about bottom css//
fetch("/api/section")
  .then((res) => res.json())
  .then((data) => {
    document.getElementById("featureImg").src = data.image;
    document.getElementById("featureTitle").innerText = data.title;
    document.getElementById("featureContent").innerText = data.content;
    document.getElementById("featureButton").innerText = data.buttonText;
    document.getElementById("featureButton").href = data.buttonLink;
  })
  .catch((err) => console.error("Fetch error:", err));

// member //
document.addEventListener("DOMContentLoaded", () => {
  fetch("/api/team")
    .then((res) => res.json())
    .then((data) => {
      console.log("Team data received:", data);

      const container = document.getElementById("teamContainer");
      data.forEach((member) => {
        console.log("Member image src:", member.image);

        const card = document.createElement("div");
        card.className = "team-member";
        card.innerHTML = `
          <img src="${member.image}" alt="${member.name}">
          <h3>${member.name}</h3>
          <p class="role">${member.role}</p>
          <p class="desc">${member.description}</p>
        `;

        container.appendChild(card);
      });
    })
    .catch((err) => {
      console.error("Error fetching team data:", err);
    });
});

///contact page js//
document.addEventListener("DOMContentLoaded", () => {
  fetch("/api/contact")
    .then((res) => res.json())
    .then((data) => {
      const headingDiv = document.getElementById("contactHeading");
      headingDiv.innerHTML = `
        <h2>${data.heading}</h2>
        <p>${data.subheading}</p>
      `;

      const infoDiv = document.getElementById("contactInfo");
      infoDiv.innerHTML = `
  <div class="info-item">
    <i class="fas fa-envelope"></i>
    <div>
      <h4>Email</h4>
      <p>${data.email}</p>
    </div>
  </div>

  <div class="info-item">
    <i class="fas fa-phone"></i>
    <div>
      <h4>Phone</h4>
      <p>${data.phone}</p>
    </div>
  </div>

  <div class="info-item">
    <i class="fas fa-map-marker-alt"></i>
    <div>
      <h4>Address</h4>
      <p>${data.address}</p>
    </div>
  </div>
`;

    })
    .catch((err) => {
      console.error("Failed to load contact info:", err);
    });
});

////media js////
document.addEventListener("DOMContentLoaded", () => {
  fetch("/api/media-hero-intro")
    .then((res) => res.json())
    .then((data) => {
      const container = document.getElementById("mediaHeroContainer");

      container.innerHTML = `
        <section class="media-hero" style="background-image: url('${data.heroImage}')">
          <div class="overlay">
            <h1>${data.overlayText}</h1>
          </div>
        </section>

        <section class="media-intro-split">
          <div class="intro-left">
            <h2>${data.introTitle}</h2>
            ${data.introParagraphs.map((p) => `<p>${p}</p>`).join("")}
          </div>
          <div class="intro-right">
            <img src="${data.introRightImage}" alt="Media Overview Image" />
          </div>
        </section>
      `;

    })
    .catch((err) => console.error("Error loading hero intro:", err));
});




/* =============================================================
   End of unified script.js
   ============================================================= */
