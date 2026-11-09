document.addEventListener("DOMContentLoaded", async () => {
  try {
    const headerElement = document.querySelector("#site-header");
    const footerElement = document.querySelector("#site-footer");

    // Load header
    const headerResponse = await fetch("components/header.html");

    if (!headerResponse.ok) {
      throw new Error(`Header fetch failed: ${headerResponse.status}`);
    }

    const headerHtml = await headerResponse.text();

    console.log("HEADER LOADED:");
    console.log(headerHtml);

    if (headerElement) {
      headerElement.innerHTML = headerHtml;
    } else {
      console.error("#site-header not found");
    }

    // Load footer
    const footerResponse = await fetch("components/footer.html");

    if (!footerResponse.ok) {
      throw new Error(`Footer fetch failed: ${footerResponse.status}`);
    }

    const footerHtml = await footerResponse.text();

    console.log("FOOTER LOADED:");
    console.log(footerHtml);

    if (footerElement) {
      footerElement.innerHTML = footerHtml;
    } else {
      console.error("#site-footer not found");
    }

    // Highlight current page
    const currentPage =
      window.location.pathname.split("/").pop() || "index.html";

    document
      .querySelectorAll("#site-header nav a")
      .forEach(link => {
        const href = link.getAttribute("href");

        if (href === currentPage) {
          link.setAttribute("aria-current", "page");
        }
      });

  } catch (error) {
    console.error("Layout loading error:", error);
  }
});