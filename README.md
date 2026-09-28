# FrameFind

FrameFind is a fast, responsive image-search web application built with vanilla HTML, CSS, and JavaScript. Powered by the Wikimedia Commons API, users can search and discover visual concepts with no API key or external dependencies required.

The application features resilient state management covering four distinct UI phases:
- **Idle State:** Welcomes users with an initial visual discovery prompt and category suggestion chips.
- **Loading State:** Immediately displays an animated teal CSS spinner and status indicator while fetching results.
- **Empty State:** Informs users when a search returns zero results without leaving an unexplained blank grid.
- **Error State:** Catches network or API exceptions and presents a clear, user-friendly recovery notice.

Visually, FrameFind utilizes a dark charcoal background with vibrant teal/cyan accents, a responsive CSS Grid with subtle card fade-in animations, and accessible controls.

## Live Deployment
- **GitHub Pages:** https://Saqib-Hussain-xo.github.io/framefind/
*(To activate: Repository Settings → Pages → Build and deployment source: Deploy from branch `main` / root)*
