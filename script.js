document.getElementById('searchButton').addEventListener('click', function() {
    const searchContainer = document.querySelector('.search-container');
    const searchInput = document.getElementById('searchInput');

    if (searchContainer.style.width === '40px' || searchContainer.style.width === '') {
        searchContainer.style.width = '300px';
        searchInput.style.width = '100%';
        searchInput.style.opacity = '1';
        searchInput.focus();
    } else {
        searchContainer.style.width = '40px';
        searchInput.style.width = '0';
        searchInput.style.opacity = '0';

        // Focus on text and image
        var searchText = searchInput.value.toLowerCase();
        focusOnTextAndImage(searchText);
    }
});


document.getElementById('searchInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        var searchText = event.target.value.toLowerCase();
        focusOnTextAndImage(searchText);
    }
});

function focusOnTextAndImage(searchText) {
    // Reset previously focused elements
    var focusedElements = document.querySelectorAll('.focus');
    focusedElements.forEach(function(el) {
        el.classList.remove('focus');
    });

    // Find matching text and images
    if (searchText.trim() === "") {
        return;
    }
    
    var categories = document.querySelectorAll('.category');
    var firstMatch = null;
    categories.forEach(function(category) {
        var match = findTextInElement(category, searchText);
        if (match && !firstMatch) {
            firstMatch = match;
        }
    });

    // Scroll to the first match if found
    if (firstMatch) {
        scrollToElement(firstMatch);

        // Apply the fade effect after scrolling
        setTimeout(function() {
            fadeOutOtherContent();
        }, 600); // Delay to allow the scroll animation to complete
    }
}

function fadeOutOtherContent() {
    // Apply the faded class to all elements that are not focused
    var allElements = document.querySelectorAll('.category *');
    allElements.forEach(function(el) {
        if (!el.classList.contains('focus') && !isAncestorOfFocus(el)) {
            el.classList.add('faded');
        }
    });

    // To restore normal visibility after the fade duration
    setTimeout(function() {
        document.querySelectorAll('.faded').forEach(function(el) {
            el.classList.remove('faded');
        });
    }, 1500);
}

function isAncestorOfFocus(element) {
    // To check if the element is an ancestor of a focused element
    return Array.from(element.querySelectorAll('.focus')).length > 0;
}

function findTextInElement(element, searchText) {
    let firstMatch = null;
    element.childNodes.forEach(function(node) {
        if (node.nodeType === 3) { // Text node
            var text = node.nodeValue;
            var regex = new RegExp(searchText, 'gi');
            if (regex.test(text)) {
                var span = document.createElement('span');
                span.classList.add('focus');
                span.innerHTML = text.replace(regex, function(matched) {
                    return '<span class="focus">' + matched + '</span>';
                });
                node.parentNode.replaceChild(span, node);

                // Capture the first match
                if (!firstMatch) {
                    firstMatch = span;
                }
            }
        } else if (node.nodeType === 1) { // Element node
            if (node.tagName === 'IMG' && node.alt.toLowerCase().includes(searchText)) {
                node.classList.add('focus'); // Add focus class to images
                if (!firstMatch) {
                    firstMatch = node;
                }
            } else {
                var match = findTextInElement(node, searchText);
                if (match && !firstMatch) {
                    firstMatch = match;
                }
            }
        }
    });
    return firstMatch;
}


function scrollToElement(element) {
    // Scroll the element into view
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Adjust the scroll position
    setTimeout(function() {
        window.scrollBy(0, -100);
    }, 1000); // Delay to match the scroll animation duration
}


document.addEventListener('DOMContentLoaded', function() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const bodyElement = document.body;
    const backgroundVideo = document.getElementById('backgroundVideo');

    // Set default to dark theme
    bodyElement.classList.add('dark-theme');
    themeToggleBtn.classList.add('moon');
    backgroundVideo.style.display = 'block';

    // Check for saved user preference on load
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light-theme') {
        bodyElement.classList.remove('dark-theme');
        themeToggleBtn.classList.remove('moon');
        themeToggleBtn.classList.add('sun');
        backgroundVideo.style.display = 'none';
    }

    themeToggleBtn.addEventListener('click', function() {
        bodyElement.classList.toggle('dark-theme');
        if (bodyElement.classList.contains('dark-theme')) {
            themeToggleBtn.classList.remove('sun');
            themeToggleBtn.classList.add('moon');
            backgroundVideo.style.display = 'block';
            localStorage.setItem('theme', 'dark-theme');
        } else {
            themeToggleBtn.classList.remove('moon');
            themeToggleBtn.classList.add('sun');
            backgroundVideo.style.display = 'none';
            localStorage.setItem('theme', 'light-theme');
        }
    });
});


window.addEventListener('load', () => {
    let infoIcon = document.getElementById('info-icon');
    let directions = document.getElementById('directions');
    let closeDirections = document.getElementById('close-directions');

    // Show instructions when the info icon is clicked
    infoIcon.addEventListener('click', () => {
        directions.classList.remove('hidden');
    });

    // Close the instructions section
    closeDirections.addEventListener('click', () => {
        directions.classList.add('hidden');
    });
});

function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.content');
    sections.forEach(section => section.style.display = 'none');

    // Show the selected section
    document.getElementById(sectionId).style.display = 'block';
}


function toggleVideo() {
    const video = document.getElementById("backgroundVideo");
    if (video.style.display === "none") {
        video.style.display = "block";
    } else {
        video.style.display = "none";
    }
}
