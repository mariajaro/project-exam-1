document.addEventListener('DOMContentLoaded', () => {
  const apiUrl = 'https://www.mariaj.one/wp-json/wp/v2/posts';
  const latestPostsContainer = document.getElementById('latestPostsContainer');

  const fetchLatestPosts = () => {
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        data.forEach(post => {
          const imageUrl = post.featured_media;
          fetch(`https://www.mariaj.one/wp-json/wp/v2/media/${imageUrl}`)
            .then(response => response.json())
            .then(mediaData => {
              const postElement = document.createElement('div');
              postElement.className = 'swiper-slide';
              postElement.innerHTML = `
                <div class="post-item">
                  <h3>${post.title.rendered}</h3>
                  <img src="${mediaData.source_url}" alt="${post.title.rendered}">
                </div>
              `;
              latestPostsContainer.appendChild(postElement);
              initializeSwiper();
            });
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const initializeSwiper = () => {
    new Swiper('.swiper-container', {
      slidesPerView: 'auto',
      spaceBetween: 20,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  };

  fetchLatestPosts();
});
