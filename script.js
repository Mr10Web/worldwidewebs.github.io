document.getElementById('searchButton').addEventListener('click', function() {
    const searchContainer = document.querySelector('.search-container');
    const searchInput = document.getElementById('searchInput');

    if (searchContainer.style.width === '40px' || searchContainer.style.width === '') {
        searchContainer.style.width = '300px'; // Expand to desired width
        searchInput.style.width = '100%';
        searchInput.style.opacity = '1'; // Show the input field
        searchInput.focus();
    } else {
        searchContainer.style.width = '40px'; // Collapse back to initial width
        searchInput.style.width = '0';
        searchInput.style.opacity = '0'; // Hide the input field

        // Focus on the text and image
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

    // Restore normal visibility after the fade duration
    setTimeout(function() {
        document.querySelectorAll('.faded').forEach(function(el) {
            el.classList.remove('faded');
        });
    }, 1500); // Duration should be longer than the transition
}

function isAncestorOfFocus(element) {
    // Check if the element is an ancestor of a focused element
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
                span.classList.add('focus'); // Add focus class to matching text
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
        window.scrollBy(0, -100); // Adjust this value to better center the element
    }, 1000); // Delay to match the scroll animation duration
}


document.addEventListener('DOMContentLoaded', function() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const bodyElement = document.body;

    // Check for saved user preference, if any, on load of the website
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        bodyElement.classList.add(savedTheme);
        if (savedTheme === 'dark-theme') {
            themeToggleBtn.classList.remove('sun');
            themeToggleBtn.classList.add('moon');
        }
    }

    themeToggleBtn.addEventListener('click', function() {
        bodyElement.classList.toggle('dark-theme');
        if (bodyElement.classList.contains('dark-theme')) {
            themeToggleBtn.classList.remove('sun');
            themeToggleBtn.classList.add('moon');
            localStorage.setItem('theme', 'dark-theme');
        } else {
            themeToggleBtn.classList.remove('moon');
            themeToggleBtn.classList.add('sun');
            localStorage.removeItem('theme');
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
