const video = document.getElementById('scrollVideo');
const firstText = document.getElementById('text-1');
const backToTopBtn = document.getElementById('backToTopBtn');
const progressCircle = backToTopBtn.querySelector('circle');
const radius = progressCircle.r.baseVal.value;
const circumference = 2 * Math.PI * radius;
let videoStarted = false;

// Set up the progress circle
progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
progressCircle.style.strokeDashoffset = circumference;

function setProgress(value) {
    const offset = circumference - (value / 100) * circumference;
    progressCircle.style.strokeDashoffset = offset;
}

function disableScroll() {
    document.body.style.overflow = 'hidden';
}

function enableScroll() {
    document.body.style.overflow = 'auto';
}

function pauseVideo() {
    video.pause();
}

function resumeVideo() {
    video.play();
}

// Reset video on page load
window.addEventListener('load', () => {
    video.pause();
    video.currentTime = 0;
    videoStarted = false;
    window.scrollTo(0, 0);
});

// Start video and handle text visibility on scroll
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY > 100 && !videoStarted) {
        video.play();
        videoStarted = true;

        // Show `text-1` after 15 seconds
        setTimeout(() => {
            firstText.style.display = 'block';
            setTimeout(() => {
                firstText.style.opacity = 1;
                const progressBar = document.getElementById('timeline-1');
                if (progressBar) progressBar.style.width = '70%'; // Fill progress bar
            }, 10);

            // Hide `text-1` after 4 seconds
            setTimeout(() => {
                firstText.style.opacity = 0;
                const progressBar = document.getElementById('timeline-1');
                if (progressBar) progressBar.style.width = '0'; // Reset progress bar
                setTimeout(() => {
                    firstText.style.display = 'none';
                }, 500); // Allow fade-out to complete
            }, 4000);
        }, 15000); // Delay for 15 seconds

        // Trigger other texts with timing
        showTextWithTiming();
    }
});

// Update progress bar for the circular button
function updateProgress() {
    const videoDuration = video.duration;
    const currentTime = video.currentTime;
    const progress = (currentTime / videoDuration) * 100;
    setProgress(progress);
}

// Listen for video progress updates
video.addEventListener('timeupdate', updateProgress);

// Reset video and scroll position on "Back to Top" button click
backToTopBtn.addEventListener('click', () => {
    video.currentTime = 0;
    window.scrollTo(0, 0);

    firstText.style.display = 'block';
    firstText.style.opacity = 1;
});

// Handle text visibility and progress bar for other texts
function showTextWithTiming() {
    const timing = [
        { id: 'text-2', barId: 'timeline-2', delay: 25000, duration: 4000 }, // Display for 4 seconds
        { id: 'text-3', barId: 'timeline-3', delay: 33000, duration: 5000 }, // Display for 5 seconds
        { id: 'text-4', barId: 'timeline-4', delay: 41000, duration: 4000 }, // Display for 4 seconds
        { id: 'text-5', barId: 'timeline-5', delay: 53000, duration: 4000 }, // Display for 4 seconds
        { id: 'text-6', barId: 'timeline-6', delay: 59000, duration: 3000 }  // Display for 4 seconds
    ];

    timing.forEach(({ id, barId, delay, duration }) => {
        setTimeout(() => {
            const text = document.getElementById(id);
            const progressBar = document.getElementById(barId);

            if (text) {
                // Show the text and start the progress bar
                text.style.display = 'block';
                setTimeout(() => {
                    text.style.opacity = 1;
                    if (progressBar) progressBar.style.width = '100%'; // Fill progress bar
                }, 10);

                // Hide the text and reset the progress bar after the specified duration
                setTimeout(() => {
                    text.style.opacity = 0;
                    if (progressBar) progressBar.style.width = '0'; // Reset progress bar
                    setTimeout(() => {
                        text.style.display = 'none';
                    }, 500); // Allow fade-out to complete
                }, duration); // Use the specified duration here
            }
        }, delay);
    });
}
