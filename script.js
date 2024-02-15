// =================for responsive navbar=======================
document.addEventListener('DOMContentLoaded', function () {
  const hamburger = document.querySelector('.humbarger');
  const menuList = document.querySelector('.menu-list');
  const menuItems = document.querySelectorAll('.menu-list li a');

  hamburger.addEventListener('click', function () {
      // Toggle the visibility of the menu by changing its display property
      if (menuList.style.display === 'block') {
          menuList.style.display = 'none';
      } else {
          menuList.style.display = 'block';
      }
  });

  // Add event listener to each menu item
  menuItems.forEach(function (menuItem) {
      menuItem.addEventListener('click', function () {
          // Hide the menu after clicking on a menu item
          menuList.style.display = '';
      });
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const menuItems = document.querySelectorAll('.menu-list li');
  const indicator = document.createElement('div');
  indicator.classList.add('active-indicator');
  document.querySelector('.navigation').appendChild(indicator);

  function setActiveIndicator() {
      const scrollPosition = window.scrollY;
      const sections = document.querySelectorAll('section'); // Assuming sections have 'id' attribute
      let currentSectionIndex = 0;

      sections.forEach(function (section, index) {
          if (section.offsetTop <= scrollPosition + 100) {
              currentSectionIndex = index;
          }
      });

      menuItems.forEach(function (menuItem) {
          menuItem.classList.remove('active-section');
      });
      menuItems[currentSectionIndex].classList.add('active-section');

      const menuItemWidth = menuItems[currentSectionIndex].offsetWidth;
      const menuItemLeft = menuItems[currentSectionIndex].offsetLeft;
      indicator.style.width = menuItemWidth + 'px';
      indicator.style.transform = `translateX(${menuItemLeft}px)`;
  }

  // Initial setup
  setActiveIndicator();

  // Update indicator on window resize and scroll
  window.addEventListener('resize', setActiveIndicator);
  window.addEventListener('scroll', setActiveIndicator);

  // Update indicator on menu item click
  menuItems.forEach(function (menuItem, index) {
      menuItem.addEventListener('click', function () {
          menuItems.forEach(function (item) {
              item.classList.remove('active-section');
          });
          menuItem.classList.add('active-section');
          setActiveIndicator();
      });
  });
});



// Show the alert and image when the page loads
window.onload = function() {
  document.getElementById('alert').style.display = 'block';
};
// Close the alert when clicking anywhere on the page
document.body.addEventListener('click', function() {
  document.getElementById('alert').style.display = 'none';
});
// var mainListDiv = document.getElementById("mainListDiv"),
//     mediaButton = document.getElementById("mediaButton");

// mediaButton.onclick = function () {
    
//     "use strict";
    
//     mainListDiv.classList.toggle("show_list");
//     mediaButton.classList.toggle("active");
    
// };

document.addEventListener('DOMContentLoaded', function() {
    
    const carousels = document.querySelectorAll('.carousel');
    carousels.forEach(function( carousel ) {
  
        const ele = carousel.querySelector('ul');
        const amountvisible = Math.round(ele.offsetWidth/ele.querySelector('li:nth-child(1)').offsetWidth);
        const bullets = carousel.querySelectorAll('ol li');
        const slides = carousel.querySelectorAll('ul li');
        const nextarrow = carousel.querySelector('.next');
        const prevarrow = carousel.querySelector('.prev');
  
        // Initialize the carousel
        nextarrow.style.display = 'block';
        prevarrow.style.display = 'block';
        ele.scrollLeft = 0;
        bullets[0].classList.add('selected');
        slides[0].classList.add('selected');
        if(amountvisible>1) {
          var removeels = carousel.querySelectorAll('ol li:nth-last-child(-n + '+(amountvisible-1)+')');
          removeels.forEach(function(removeel) {
            removeel.remove();
          });
        }
  
        const setSelected = function() {
            bullets.forEach(function(bullet) {
               bullet.classList.remove('selected');
            });
            slides.forEach(function(slide) {
               slide.classList.remove('selected');
            });
            const scrolllength = carousel.querySelector('ul li:nth-child(2)').offsetLeft - carousel.querySelector('ul li:nth-child(1)').offsetLeft;
            const nthchild = (Math.round((ele.scrollLeft/scrolllength)+1));
            carousel.querySelector('ol li:nth-child('+nthchild+')').classList.add('selected'); 
            carousel.querySelector('ul li:nth-child('+nthchild+')').classList.add('selected'); 
            if(carousel.parentElement.parentElement.querySelector('.dynamictitle')) {
                const title = carousel.querySelector('ul li:nth-child('+nthchild+') img').getAttribute('title'); 
                if(title) carousel.parentElement.parentElement.querySelector('.dynamictitle').innerHTML = title;
            }
        }
  
        const scrollTo = function(event) {
            event.preventDefault();
            ele.scrollLeft = ele.querySelector(this.getAttribute('href')).offsetLeft;
        }
        
        const nextSlide = function() {
            if(!carousel.querySelector('ol li:last-child').classList.contains('selected')) {
                carousel.querySelector('ol li.selected').nextElementSibling.querySelector('a').click();
            } else {
                carousel.querySelector('ol li:first-child a').click();
            }
        }
  
        const prevSlide = function() {
            if(!carousel.querySelector('ol li:first-child').classList.contains('selected')) {
                carousel.querySelector('ol li.selected').previousElementSibling.querySelector('a').click();
            } else {
                carousel.querySelector('ol li:last-child a').click();
            }
        }
        
        const setInteracted = function() {
          ele.classList.add('interacted');
        }
            
        // Attach the handlers
        ele.addEventListener("scroll", debounce(setSelected));
        ele.addEventListener("touchstart", setInteracted);
        ele.addEventListener('keydown', function (e){
            if(e.key == 'ArrowLeft') ele.classList.add('interacted');
            if(e.key == 'ArrowRight') ele.classList.add('interacted');
        });
  
        nextarrow.addEventListener("click", nextSlide);
        nextarrow.addEventListener("mousedown", setInteracted);
        nextarrow.addEventListener("touchstart", setInteracted);
  
        prevarrow.addEventListener("click", prevSlide);
        prevarrow.addEventListener("mousedown", setInteracted);
        prevarrow.addEventListener("touchstart", setInteracted);
  
        bullets.forEach(function(bullet) {
          bullet.querySelector('a').addEventListener('click', scrollTo);
          bullet.addEventListener("mousedown", setInteracted);
          bullet.addEventListener("touchstart", setInteracted);
        });
  
        //setInterval for autoplay
        if(carousel.getAttribute('duration')) {
          setInterval(function(){ 
            if (ele != document.querySelector(".carousel:hover ul") && ele.classList.contains('interacted')==false) {
              nextarrow.click();
            }
          }, carousel.getAttribute('duration'));
        }
      
      
    }); //end foreach
  
  }); //end onload
  
  
  
  /**
  * Debounce functions for better performance
  * (c) 2021 Chris Ferdinandi, MIT License, https://gomakethings.com
  * @param  {Function} fn The function to debounce
  */
  function debounce (fn) {
  // Setup a timer
  let timeout;
  // Return a function to run debounced
  return function () {
    // Setup the arguments
    let context = this;
    let args = arguments;
    // If there's a timer, cancel it
    if (timeout) {
      window.cancelAnimationFrame(timeout);
    }
    // Setup the new requestAnimationFrame()
    timeout = window.requestAnimationFrame(function () {
      fn.apply(context, args);
    });
  };
  }

  function loadHTML(url, elementId) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById(elementId).innerHTML = this.responseText;
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

loadHTML("academics.html", "file1");