(function () {
  function slugify(text) {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");
  }

  function setupSidebarNavigation() {
    var sidebar = document.getElementById("site-sidebar");
    if (!sidebar) return;

    sidebar.querySelectorAll(".nav-subgroup-toggle").forEach(function (button) {
      button.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();
        var group = button.closest(".nav-subgroup");
        var isOpen = group.classList.toggle("is-open");
        button.setAttribute("aria-expanded", isOpen ? "true" : "false");
      });
    });

    var currentPath = window.location.pathname.replace(/\/+$/, "");

    sidebar.querySelectorAll(".sidebar-link, .sidebar-group-title, .sidebar-subitem").forEach(function (link) {
      var linkPath = link.pathname.replace(/\/+$/, "");
      if (linkPath === currentPath) {
        link.classList.add("is-active");
        var group = link.closest(".nav-subgroup");
        if (group) {
          group.classList.add("is-open");
          var groupToggle = group.querySelector(".nav-subgroup-toggle");
          if (groupToggle) groupToggle.setAttribute("aria-expanded", "true");
        }
      }
    });

    document.querySelectorAll(".top-nav-link").forEach(function (link) {
      var linkPath = link.pathname.replace(/\/+$/, "");
      if (linkPath === currentPath) {
        link.classList.add("is-active");
      }
    });
  }

  function setupSidebarToggle() {
    var sidebar = document.getElementById("site-sidebar");
    var toggle = document.querySelector(".sidebar-toggle");
    var backdrop = document.querySelector(".sidebar-backdrop");
    if (!sidebar || !toggle) return;

    function setOpen(isOpen) {
      sidebar.classList.toggle("is-open", isOpen);
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      if (backdrop) backdrop.hidden = !isOpen;
      document.body.classList.toggle("sidebar-open", isOpen);
    }

    toggle.addEventListener("click", function (event) {
      event.stopPropagation();
      setOpen(!sidebar.classList.contains("is-open"));
    });

    if (backdrop) {
      backdrop.addEventListener("click", function () {
        setOpen(false);
      });
    }

    sidebar.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        if (window.matchMedia("(max-width: 799px)").matches) {
          setOpen(false);
        }
      });
    });
  }

  function setupTableOfContents() {
    var content = document.querySelector(".post-content");
    var tocList = document.getElementById("post-toc-list");
    if (!content || !tocList) return;

    var headings = content.querySelectorAll("h2, h3");
    if (headings.length < 2) {
      var toc = document.querySelector(".post-toc");
      if (toc) toc.style.display = "none";
      return;
    }

    headings.forEach(function (heading, index) {
      if (!heading.id) {
        heading.id = slugify(heading.textContent || "secao-" + index);
      }

      var link = document.createElement("a");
      link.href = "#" + heading.id;
      link.textContent = heading.textContent;
      link.className = "post-toc-link" + (heading.tagName === "H3" ? " post-toc-h3" : "");
      tocList.appendChild(link);
    });

    var tocLinks = tocList.querySelectorAll(".post-toc-link");
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            tocLinks.forEach(function (link) {
              link.classList.toggle("is-active", link.getAttribute("href") === "#" + entry.target.id);
            });
          }
        });
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );

    headings.forEach(function (heading) {
      observer.observe(heading);
    });
  }

  function setupBackToTop() {
    var button = document.getElementById("back-to-top");
    if (!button) return;

    window.addEventListener("scroll", function () {
      if (window.scrollY > 400) {
        button.hidden = false;
      } else {
        button.hidden = true;
      }
    });

    button.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    setupSidebarNavigation();
    setupSidebarToggle();
    setupTableOfContents();
    setupBackToTop();
  });
})();
