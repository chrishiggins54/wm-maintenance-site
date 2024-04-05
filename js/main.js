// Toggle dropdown menu
function toggleDropdownMenu() {
  const menuBtn = document.querySelector('.nav__menu-btn');
  menuBtn.addEventListener('click', function() {
    const dropdown = document.getElementById('dropdownMenu');
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
  });

  const dropdownMenuItems = document.querySelectorAll('.nav__dropdown-menu-item');
  dropdownMenuItems.forEach(item => item.addEventListener('click', function() {
    const dropdown = document.getElementById('dropdownMenu');
    dropdown.style.display = 'none';
  }));
}

// Scroll to section and Set active navlink on scroll
function handleNavigation() {
  const navLinks = document.querySelectorAll(".nav__menu-item a");
  const navDropdownLinks = document.querySelectorAll(".nav__dropdown-menu-item a");
  const sections = document.querySelectorAll("section");
  const activeClassName = "active";

  navLinks.forEach(link => link.addEventListener("click", scrollToSection));
  navDropdownLinks.forEach(link => link.addEventListener("click", scrollToSection));

  function scrollToSection(event) {
    event.preventDefault();
    const targetId = event.currentTarget.getAttribute("href");
    const targetSection = document.querySelector(targetId);
    targetSection.scrollIntoView({ behavior: "smooth" });
  }

  document.addEventListener("scroll", function() {
    let currentActive = null;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const scrollPosition = window.scrollY;

      if (scrollPosition >= sectionTop - 200 && scrollPosition < sectionTop + sectionHeight - 200) {
        currentActive = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      const linkHref = link.getAttribute("href").slice(1);
      link.parentElement.classList.toggle(activeClassName, currentActive === linkHref);
    });

    navDropdownLinks.forEach(link => {
      const linkHref = link.getAttribute("href").slice(1);
      link.classList.toggle(activeClassName, currentActive === linkHref);
    });
  });
}

function handleLightbox() {
  document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-link');
    const popup = document.getElementById('lightbox-modal');
    const lightboxContent = document.querySelector('.lightbox-content');
    const prevButton = document.querySelector('.lightbox-prev');
    const nextButton = document.querySelector('.lightbox-next');
    let currentIndex = 0; // Keep track of the current index

    galleryItems.forEach((item, index) => {
      item.addEventListener('click', function(e) {
        e.preventDefault();
        showLightbox(index);
      });
    });

    document.querySelector('.lightbox-close').addEventListener('click', function() {
      popup.style.display = 'none';
    });

    window.addEventListener('click', function(e) {
      if (e.target === popup) {
        popup.style.display = 'none';
      }
    });

    if (prevButton) {
      prevButton.addEventListener('click', function() {
        changeImage(-1);
      });
    }

    if (nextButton) {
      nextButton.addEventListener('click', function() {
        changeImage(1);
      });
    }

    function showLightbox(index) {
      currentIndex = index;
      const imageSrc = galleryItems[currentIndex].getAttribute('href');
      popup.style.display = 'flex';
      lightboxContent.src = imageSrc;
    }

    function changeImage(step) {
      let newIndex = currentIndex + step;
      
      // Loop back to the first item if the index is out of range
      if (newIndex < 0) newIndex = galleryItems.length - 1;
      if (newIndex >= galleryItems.length) newIndex = 0;
      
      showLightbox(newIndex);
    }
  });
}


document.addEventListener('DOMContentLoaded', function() {
  let lastScrollTop = 0;

  window.addEventListener('scroll', function() {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    let navUpper = document.querySelector('.nav__upper');

    const topThreshold = 100;

    if (currentScroll > lastScrollTop && currentScroll > topThreshold) {
      navUpper.classList.add('hidden');
    } else if (currentScroll <= lastScrollTop && currentScroll < topThreshold) {
      navUpper.classList.remove('hidden');
    }
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  }, false);
});

function initApp() {
  toggleDropdownMenu();
  handleNavigation();
  handleLightbox();
  
  document.addEventListener('DOMContentLoaded', function() {
    AOS.init();
  });
}

initApp();