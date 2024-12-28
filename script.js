window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 0) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

function loadTemplate(templatePath, containerID) {
    return fetch(templatePath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            document.getElementById(containerID).innerHTML = data;
            console.log(`Loaded template: ${templatePath}`); // Log to verify loading
        })
        .catch(error => console.error(`Error loading ${templatePath}:`, error));
}
Promise.all([
    loadTemplate('navbar.html', 'navbar-sidebar'),
    loadTemplate('header.html', 'header'),
    loadTemplate('footer.html', 'footer')
]).then(() => {
    const navbar = document.getElementById('navbar');
    const sidebar = document.getElementById('sidebar');
    const sidebarUnder = document.getElementById('sidebarUnder');
    const navbarToggler = document.getElementById('navbarToggler');
    const dropdownBtns = document.querySelectorAll('.dropdownButton');

    setActiveLink();

    dropdownBtns.forEach(dropdownBtn => {
        dropdownBtn.addEventListener('click', () => {
            const dropdownList = dropdownBtn.nextElementSibling;
            dropdownList.classList.toggle('active');
            const svg = dropdownBtn.querySelector('span svg');
            svg.classList.toggle('rotate');
        });
    });
});

function setActiveLink() {
    let currentPath = window.location.pathname;
    if (currentPath.startsWith('/')) {
        currentPath = currentPath.substring(1);
        console.log(currentPath);
    }
    if (window.location.hostname.includes('github.com') || window.location.hostname.includes('github.io')) {
        currentPath = currentPath.split('/').pop();
        console.log(currentPath);

        if (currentPath === '') {
            currentPath = 'index.html';
        }
    }
    const sidebarLinks = document.querySelectorAll('.sidebar .link');

    sidebarLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    const navbarLinks = document.querySelectorAll('.navbar .navbar-nav li.nav-item a.nav-link');
    navbarLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    const dropdownLinks = document.querySelectorAll('.navbar .dropdown-menu li a');
    let isDropdownItemActive = false;

    dropdownLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPath) {
            link.parentElement.classList.add('active');
            link.closest('.dropdown').parentElement.classList.add('active');
            isDropdownItemActive = true;
        } else {
            link.parentElement.classList.remove('active');
        }
    });

    if (isDropdownItemActive) {
        const dropdownParent = document.querySelector('.navbar .dropdown-toggle');
        if (dropdownParent) {
            dropdownParent.classList.add('active');
        }
    } else {
        const dropdownParent = document.querySelector('.navbar .dropdown-toggle');
        if (dropdownParent) {
            dropdownParent.classList.remove('active');
        }
    }
}

  
function sidebarToggle() {
    sidebar.classList.toggle('show');
    sidebarUnder.classList.toggle('show');

    closeAllSidebarDropdowns();
}

function navbarTogglerToggle() {
    navbarToggler.classList.toggle('clicked');
}

function closeAllSidebarDropdowns() {
    const dropdownBtns = document.querySelectorAll('.dropdownButton');

    dropdownBtns.forEach(dropdownBtn => {
        const dropdownList = dropdownBtn.nextElementSibling;
        const svg = dropdownBtn.querySelector('span svg');
        dropdownList.classList.remove('active');
        svg.classList.remove('rotate');
        }
    );
}

window.addEventListener('resize', () => {
    if (this.window.innerWidth > 992) {
        sidebar.classList.remove('show');
        navbarToggler.classList.remove('clicked');
        sidebarUnder.classList.remove('show');
    }
});
