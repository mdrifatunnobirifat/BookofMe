const pageTurnBtn = document.querySelectorAll('.nextprev-btn');
const pages = document.querySelectorAll('.book-page.page-right');
const contactMeBtn = document.querySelector('.btn.contact-me');
const backProfileBtn = document.querySelector('.back-profile');
const coverRight = document.querySelector('.cover.cover-right');

// 1. Handle clicking Next/Prev arrows
pageTurnBtn.forEach((el, index) => {
    el.onclick = () => {
        const pageTurnId = el.getAttribute('data-page');
        const pageTurn = document.getElementById(pageTurnId);

        if (pageTurn.classList.contains('turn')) {
            pageTurn.classList.remove('turn');
            // Low Z-Index when page is closed (on the right)
            setTimeout(() => { pageTurn.style.zIndex = 10 - index; }, 500);
        } else {
            pageTurn.classList.add('turn');
            // High Z-Index when page is flipped (on the left)
            setTimeout(() => { pageTurn.style.zIndex = 10 + index; }, 500);
        }
    }
});

// 2. Contact Me Button (Flips all pages to reach the end)
if (contactMeBtn) {
    contactMeBtn.onclick = (e) => {
        e.preventDefault();
        pages.forEach((page, index) => {
            setTimeout(() => {
                page.classList.add('turn');
                setTimeout(() => {
                    page.style.zIndex = 20 + index;
                }, 500);
            }, (index + 1) * 200);
        });
    }
}

// 3. Back Profile Button (Closes all pages in reverse)
if (backProfileBtn) {
    backProfileBtn.onclick = (e) => {
        e.preventDefault();
        // Array.from(...).reverse() ensures we close the LAST page first
        Array.from(pages).reverse().forEach((page, index) => {
            setTimeout(() => {
                page.classList.remove('turn');
                setTimeout(() => {
                    page.style.zIndex = 10 + (pages.length - index);
                }, 500);
            }, (index + 1) * 200);
        });
    }
}

// 4. Opening Animation (Cover opens, then pages close into place)
setTimeout(() => {
    coverRight.classList.add('turn');
    setTimeout(() => { coverRight.style.zIndex = -1; }, 500);
}, 2100);

// Close pages from a flipped state to the starting state on load
pages.forEach((page, index) => {
    // Start them as flipped
    page.classList.add('turn'); 
    setTimeout(() => {
        page.classList.remove('turn');
        setTimeout(() => {
            page.style.zIndex = 10 - index;
        }, 500);
    }, (index + 1) * 200 + 2100);
});