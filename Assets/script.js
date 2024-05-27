window.addEventListener("load", function () {
  // Check if 'load_tabs' variable exists
  if (typeof load_tabs !== "undefined" && load_tabs) {
    // Check local storage for the name of the saved tab window
    var savedTab = localStorage.getItem("saved_tab_window");
    // If there's a saved tab window, set 'tab-window-display' class to it
    if (savedTab) {
      var tabWindowToDisplay = document.querySelector(
        '.tab-window[name="' + savedTab + '"]'
      );
      if (tabWindowToDisplay) {
        tabWindowToDisplay.classList.add("tab-window-display");
        // Add 'opened-tab' class to the corresponding tab
        var correspondingTab = document.querySelector(
          '.tabs[name="' + savedTab + '"]'
        );
        if (correspondingTab) {
          correspondingTab.classList.add("opened-tab");
        }
      }
    } else {
      // If no saved tab window, set 'tab-window-display' to the highest in the hierarchy
      var highestTabWindow = document.querySelector(".tab-window");
      if (highestTabWindow) {
        highestTabWindow.classList.add("tab-window-display");
        // Add 'opened-tab' class to the corresponding tab
        var correspondingTab = document.querySelector(
          '.tabs[name="' + highestTabWindow.getAttribute("name") + '"]'
        );
        if (correspondingTab) {
          correspondingTab.classList.add("opened-tab");
        }
      }
    }
  }

  // Verify the existence of elements with the class 'tabs'
  var tabs = document.getElementsByClassName("tabs");
  if (tabs.length > 0) {
    // Iterate over all elements with the class 'tabs'
    for (var j = 0; j < tabs.length; j++) {
      var tabName = tabs[j].getAttribute("name");
      // Add event listener for clicks to the 'tabs'
      tabs[j].addEventListener("click", function () {
        // Get the name attribute of the clicked tab
        var clickedTabName = this.getAttribute("name");
        console.log("Clicked tab:", clickedTabName); // Log the clicked tab name
        // Remove 'tab-window-display' from all tab windows
        var allTabWindows = document.getElementsByClassName("tab-window");
        for (var k = 0; k < allTabWindows.length; k++) {
          allTabWindows[k].classList.remove("tab-window-display");
        }
        // Apply 'tab-window-display' to the tab window with the corresponding name
        var tabWindowToShow = document.querySelector(
          '.tab-window[name="' + clickedTabName + '"]'
        );
        if (tabWindowToShow) {
          tabWindowToShow.classList.add("tab-window-display");
          // Save the displayed tab window's name to local storage
          localStorage.setItem("saved_tab_window", clickedTabName);
          console.log("Displayed tab window:", clickedTabName); // Log the displayed tab window name
        }
        // Remove 'opened-tab' class from all tabs
        for (var l = 0; l < tabs.length; l++) {
          tabs[l].classList.remove("opened-tab");
        }
        // Add 'opened-tab' class to the clicked tab
        this.classList.add("opened-tab");
      });
    }
  }
});

function tabFunc(event, tabName) {
  var i, tabWindow, tablinks;

  // Hide all tab windows
  tabWindow = document.getElementsByClassName("tab-window");
  for (i = 0; i < tabWindow.length; i++) {
    tabWindow[i].style.display = "none";
  }

  // Remove the "openedTab" class from all tab links
  tablinks = document.getElementsByClassName("tab-link");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].classList.remove("opened-tab");
  }

  // Display the selected tab window
  document.getElementById(tabName).style.display = "block";

  // Add the "openedTab" class to the clicked tab link
  event.currentTarget.classList.add("opened-tab");
}

function rembTabFunc(event, tabName) {
  var i, tabWindow, tablinks;

  // Hide all tab windows
  tabWindow = document.getElementsByClassName("tab-window");
  for (i = 0; i < tabWindow.length; i++) {
    tabWindow[i].style.display = "none";
  }

  // Remove the "openedTab" class from all tab links
  tablinks = document.getElementsByClassName("tab-link");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].classList.remove("opened-tab");
  }

  // Display the selected tab window
  document.getElementById(tabName).style.display = "block";

  // Add the "openedTab" class to the clicked tab link
  event.currentTarget.classList.add("opened-tab");

  // Remember the last selected tab using localStorage
  localStorage.setItem("lastTab", tabName);
}

// Function to retrieve the last selected tab when the page loads
function loadTab() {
  var lastTab = localStorage.getItem("lastTab");
  if (lastTab) {
    var allTabs = document.getElementsByClassName("tab-window");
    for (var i = 0; i < allTabs.length; i++) {
      // Hide all tabs except for the last selected one
      if (allTabs[i].id === lastTab) {
        allTabs[i].style.display = "block";
      } else {
        allTabs[i].style.display = "none";
      }
    }

    // Remove the "openedTab" class from all tab links
    var tablinks = document.getElementsByClassName("tab-link");
    for (var j = 0; j < tablinks.length; j++) {
      tablinks[j].classList.remove("opened-tab");
    }

    // Add the "openedTab" class to the corresponding tab link
    var tabLink = document.querySelector(`[data-tab="${lastTab}"]`);
    if (tabLink) {
      tabLink.classList.add("opened-tab");
    }
  }
}

function dragElement(elmnt) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  var dragWindow = elmnt.querySelector(".dragElWind");
  var header = elmnt.querySelector(".dragElHeader");
  var main = elmnt.querySelector(".dragElMain");

  if (header) {
    header.onmousedown = dragMouseDown;
  } else {
    elmnt.onmousedown = dragMouseDown;
  }

  // Set additional styles
  elmnt.style.overflow = "auto";
  elmnt.style.position = "absolute";
  elmnt.style.resize = "both";
  header.style.position = "sticky";
  header.style.top = 0;
  header.style.zIndex = 1;
  dragWindow.style.transition = "width 0s, height 0s";

  function createOverlay() {
    var overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = 0;
    overlay.style.right = 0;
    overlay.style.bottom = 0;
    overlay.style.left = 0;
    overlay.style.opacity = 0;
    overlay.style.zIndex = 2;
    document.body.appendChild(overlay);
    return overlay;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;

    // Create transparent overlay for drag
    var dragOverlay = createOverlay();

    document.onmouseup = function () {
      // Remove overlay for drag
      if (dragOverlay.parentNode) {
        dragOverlay.parentNode.removeChild(dragOverlay);
      }

      closeDragElement();
    };
    document.onmousemove = elementDrag;

    // Add resize event listener
    window.addEventListener("resize", handleResize);
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;

    // Calculate new position
    var newTop = elmnt.offsetTop - pos2;
    var newLeft = elmnt.offsetLeft - pos1;

    // Check if the element is going outside the screen boundaries
    var maxX = window.innerWidth - elmnt.offsetWidth;
    var maxY = window.innerHeight - elmnt.offsetHeight;

    // Adjust position to keep it within the visible area
    elmnt.style.top = Math.max(0, Math.min(newTop, maxY)) + "px";
    elmnt.style.left = Math.max(0, Math.min(newLeft, maxX)) + "px";
  }

  function handleResize() {
    // Create transparent overlay for resize
    var resizeOverlay = createOverlay();

    // Remove overlay for resize after a short delay
    setTimeout(function () {
      if (resizeOverlay.parentNode) {
        resizeOverlay.parentNode.removeChild(resizeOverlay);
      }
    }, 200);
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;

    // Remove resize event listener
    window.removeEventListener("resize", handleResize);
  }
}

// Apply dragElement to all elements with class "dragElWind"
var draggableElements = document.querySelectorAll(".dragElWind");
draggableElements.forEach(function (element) {
  dragElement(element);
});

// Cocell's Show Hide Script
function CShowHide(arg) {
  var args = arg.split(", ");
  var targetId = args[0];
  var displayValue = args[1];

  var targetElement = document.getElementById(targetId);

  if (targetElement) {
    if (
      targetElement.style.display === "none" ||
      getComputedStyle(targetElement).display === "none"
    ) {
      targetElement.style.display = displayValue;
    } else {
      targetElement.style.display = "none";
    }
  }
}

// Close Parent Script
function closeParent(elementId) {
  if (elementId) {
    var specificElement = document.getElementById(elementId);
    if (specificElement) {
      specificElement.style.display = "none";
    } else {
      console.error("Element with ID " + elementId + " not found.");
    }
  } else {
    var parentElement = this.parentElement;

    if (parentElement) {
      parentElement.style.display = "none";
    }
  }
}

// Your crucial function for dark mode
function darkModeInitialization(callback) {
  try {
    const savedDarkMode = localStorage.getItem("darkMode");
    const body = document.body;

    if (savedDarkMode === null) {
      const prefersDarkMode = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;

      if (prefersDarkMode) {
        body.classList.add("dark");
        localStorage.setItem("darkMode", true);
      }
    } else {
      if (savedDarkMode === "true") {
        body.classList.add("dark");
      }
    }

    // Call the callback to signal that dark mode initialization is done
    callback();
  } catch (error) {
    console.error("An error occurred during dark mode initialization:", error);
    // Still call the callback in case of error
    callback();
  }
}

// Call the dark mode initialization function
darkModeInitialization(function () {
  // This code will execute only after the dark mode initialization is done
  const darkModeToggle = document.getElementById("dark-mode-toggle");

  if (darkModeToggle) {
    darkModeToggle.addEventListener("click", darkmode);
  } else {
    console.error("Dark mode toggle button not found");
  }
});

// Fullscreen Script
function fullscreen() {
  try {
    var docElement = document.documentElement;

    if (
      !document.fullscreenElement &&
      !document.mozFullScreenElement &&
      !document.webkitFullscreenElement
    ) {
      if (docElement.requestFullscreen) {
        docElement.requestFullscreen();
      } else if (docElement.mozRequestFullScreen) {
        docElement.mozRequestFullScreen();
      } else if (docElement.webkitRequestFullscreen) {
        docElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
      } else if (docElement.msRequestFullscreen) {
        docElement.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  } catch (error) {
    console.error("An error occurred while toggling fullscreen:", error);
  }
}

// $Fullscreen Script
// This is a new version which adds a class to the body to indicate fullscreen which can be
// Used for styling purposes.
function $Fullscreen() {
  // Check if fullscreen mode is currently active
  var isInFullScreen =
    (document.fullscreenElement && document.fullscreenElement !== null) ||
    (document.webkitFullscreenElement &&
      document.webkitFullscreenElement !== null) ||
    (document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
    (document.msFullscreenElement && document.msFullscreenElement !== null);

  // If not in fullscreen, request fullscreen
  if (!isInFullScreen) {
    var element = document.documentElement;
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      /* Firefox */
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      /* Chrome, Safari & Opera */
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      /* IE/Edge */
      element.msRequestFullscreen();
    }

    // Add the 'in-fullscreen' class to the body
    document.body.classList.add("in-fullscreen");
  } else {
    // If already in fullscreen, exit fullscreen
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      /* Safari */
      document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      /* Firefox */
      document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
      /* IE/Edge */
      document.msExitFullscreen();
    }

    // Remove the 'in-fullscreen' class from the body
    document.body.classList.remove("in-fullscreen");
  }
}

function modalImage() {
  var modalImages = document.querySelectorAll(".modal-image");

  modalImages.forEach(function (modalImage) {
    modalImage.style.cursor = "pointer"; // Set cursor to pointer for modal images

    modalImage.addEventListener("click", function () {
      var imageUrl = this.getAttribute("src");

      // Background container
      var backgroundContainer = document.createElement("div");
      backgroundContainer.className = "modal-image-background-container";

      // Modal container
      var modalContainer = document.createElement("div");
      modalContainer.className = "modal-image-container";

      // Image element
      var imageElement = document.createElement("img");
      imageElement.src = imageUrl;
      imageElement.alt = "Modal Image";

      // Append image to modal container
      modalContainer.appendChild(imageElement);

      // Append modal container to background container
      backgroundContainer.appendChild(modalContainer);

      // Append background container to body
      document.body.appendChild(backgroundContainer);

      // Apply styles to the modal elements
      backgroundContainer.style.display = "flex";
      backgroundContainer.style.position = "fixed";
      backgroundContainer.style.top = "0";
      backgroundContainer.style.left = "0";
      backgroundContainer.style.bottom = "0";
      backgroundContainer.style.right = "0";
      backgroundContainer.style.width = "100%";
      backgroundContainer.style.height = "100%";
      backgroundContainer.style.background = "#00000098";
      backgroundContainer.style.justifyContent = "center";
      backgroundContainer.style.alignItems = "center";
      backgroundContainer.style.zIndex = "9999999999"; // You might want to adjust this value
      backgroundContainer.style.transition = "background 0.5s";
      backgroundContainer.style.cursor = "zoom-out";

      modalContainer.style.maxWidth = "80%";
      modalContainer.style.maxHeight = "80%";
      modalContainer.style.transform = "scale(0)";
      modalContainer.style.transition = "transform 0.25s";

      imageElement.style.width = "100%";
      imageElement.style.height = "auto";
      imageElement.style.cursor = "zoom-out";

      // Open modal with zoom effect
      setTimeout(function () {
        backgroundContainer.style.background = "#000000cc";
        modalContainer.style.transform = "scale(1.2)"; // Start with zoomed-in scale
        setTimeout(function () {
          modalContainer.style.transform = "scale(1)"; // Animate to normal scale
        }, 180); // Adjust the time based on your preference
      }, 10);

      // Close modal on background click with zoom out effect
      backgroundContainer.addEventListener("click", closeModal);

      // Close modal on Escape key press
      document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
          closeModal();
        }
      });

      // Prevent mouse scroll while the modal is open
      document.body.style.overflow = "hidden";

      function closeModal() {
        backgroundContainer.style.background = "#00000000";
        modalContainer.style.transform = "scale(0)";
        setTimeout(function () {
          backgroundContainer.style.display = "none";
          document.body.removeChild(backgroundContainer);
        }, 300);

        // Allow mouse scroll when the modal is closed
        document.body.style.overflow = "auto";
      }
    });
  });
}

// Copy Text OnClick Function
function copyText(copyEl) {
  let textToCopy;

  if (copyEl === undefined || copyEl === null) {
    console.error("Invalid element provided");
    return;
  }

  if (typeof copyEl === "string") {
    const elementById = document.getElementById(copyEl);

    if (!elementById) {
      console.error(`Element with ID '${copyEl}' not found`);
      return;
    }

    textToCopy = elementById.textContent || elementById.innerText;
  } else if (copyEl instanceof Element) {
    textToCopy = copyEl.textContent || copyEl.innerText;
  } else {
    console.error("Invalid parameter provided");
    return;
  }

  const tempTextarea = document.createElement("textarea");
  tempTextarea.value = textToCopy;
  document.body.appendChild(tempTextarea);
  tempTextarea.select();
  tempTextarea.setSelectionRange(0, 99999); // For mobile devices
  document.execCommand("copy");
  document.body.removeChild(tempTextarea);
  console.log(`Text copied to clipboard: ${textToCopy}`);
}

// Close Elements Function
function closeEl(element) {
  if (element === undefined || element === null) {
    const parent = this.parentElement;
    if (parent) {
      parent.style.display = "none";
    } else {
      console.error("Parent element not found");
    }
  } else if (typeof element === "string") {
    const elementById = document.getElementById(element);

    if (!elementById) {
      console.error(`Element with ID '${element}' not found`);
      return;
    }

    elementById.style.display = "none";
  } else {
    const parent = element.parentElement;
    if (parent) {
      parent.style.display = "none";
    } else {
      console.error("Parent element not found");
    }
  }
}

// Show Elements Function
function showEl(elementId, displayValue = "block") {
  const element = document.getElementById(elementId);

  if (!element) {
    console.error(`Element with ID '${elementId}' not found`);
    return;
  }

  element.style.display = displayValue;
}

// Function Calls
modalImage();

// Function to truncate text to a specified number of words
function truncateText(text, maxLength) {
  const words = text.split(" ");
  if (words.length <= maxLength) {
    return text;
  }
  return words.slice(0, maxLength).join(" ");
}

function search(containerId) {
  var filter = document.querySelector('input[type="text"]').value;
  var container, elements, i, querElement, querText, serElement, serText;

  // Remove special characters from the search query using regular expression
  filter = filter
    .replace(/[^\w\s]/g, "")
    .trim()
    .toLowerCase();

  container = document.getElementById(containerId);
  elements = container.querySelectorAll("[quer]");

  for (i = 0; i < elements.length; i++) {
    querElement = elements[i].getAttribute("quer");
    serElement = elements[i].querySelector("[ser]"); // Get the first element with ser attribute

    if (serElement) {
      serText = serElement.textContent || serElement.innerText;
      // Remove special characters from text content using regular expression
      querText = serText.replace(/[^\w\s]/g, "").toLowerCase();
    } else {
      querText = querElement.toLowerCase();
    }

    // Use includes() for case-insensitive comparison
    if (querText.includes(filter)) {
      elements[i].style.display = "";
    } else {
      elements[i].style.display = "none";
    }
  }
}
