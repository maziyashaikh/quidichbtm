document.addEventListener('DOMContentLoaded', () => {
      const video = document.getElementById('preloaderVideo');
      const preloader = document.getElementById('preloader');
      const progressBar = document.getElementById('progressBar');
      const leftBlob = document.querySelector('.blob.left');
      const rightBlob = document.querySelector('.blob.right');
      const textSpans = document.querySelectorAll('#preloaderText span');
      const preloaderText = document.getElementById('preloaderText');

      // Blobs Animation
      function animateBlobs() {
        gsap.timeline({ repeat: -1, yoyo: true })
          .to(leftBlob, { y: '-50vh', duration: 6, ease: 'power1.inOut' })
          .to(leftBlob, { y: '50vh', duration: 6, ease: 'power1.inOut' });
        gsap.timeline({ repeat: -1, yoyo: true })
          .to(rightBlob, { y: '50vh', duration: 6, ease: 'power1.inOut' })
          .to(rightBlob, { y: '-50vh', duration: 6, ease: 'power1.inOut' });
      }

      // Video Animation
      function animateVideo() {
        gsap.to(video, {
          top: "50%",
          transform: 'translate(-50%, -50%)',
          opacity: 1,
          duration: 1,
          delay: 1,
          ease: "power3.out",
          onComplete: animateText
        });
      }

      // Text Animation
      function animateText() {
        gsap.to(preloaderText, {
          opacity: 1,
          duration: 0.5,
          ease: "power2.inOut",
        });
        gsap.fromTo(
          textSpans,
          { y: '100%', opacity: 0 },
          {
            y: '0%',
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out"
          }
        );
      }

      // Progress Bar
      function startProgressBar() {
        video.addEventListener('timeupdate', () => {
          const progress = (video.currentTime / video.duration) * 100;
          progressBar.style.width = `${progress}%`; 
        });

        video.addEventListener('ended', () => {
          gsap.to(preloader, {
            opacity: 0,
            duration: 1,
            onComplete: () => {
              preloader.style.display = 'none';
            }
          });
        });
      }

      animateBlobs();
      animateVideo();
      startProgressBar();
    });
