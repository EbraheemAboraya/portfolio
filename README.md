# Ibrahim Aboraya — Portfolio

A responsive, dependency-free static portfolio. The main page is `html/index.html`; the root `index.html` forwards to it, preserving section links.

## Preview locally

Run `python -m http.server 8000 --bind 127.0.0.1` from the project root, then open http://127.0.0.1:8000/.

## Edit

- Content and links: `html/index.html`
- Styles: `assets/css/portfolio.css`
- Navigation and contact form: `assets/js/app.js`
- Resume: `assets/docs/Ibrahim_Aboraya_CV_2026.pdf`

The project diagrams are architecture illustrations, not application screenshots. PlantMind AI is the lead final-year capstone, followed by Amazon Data Lakehouse. Project repository buttons are intentionally omitted; the general GitHub link goes to the profile.

## Contact form

The existing AWS Lambda URL is configured in the form's `data-endpoint`. It receives JSON with `email` and `description`. The UI handles pending requests, duplicate submissions, timeouts and failures, and keeps a direct email link available.

Delivery depends on the existing Lambda and its email provider. Ensure the deployed origin is allowed by the Lambda's CORS policy and maintain validation and abuse protection on the server. A successful HTTP response confirms submission, not inbox delivery. Browser checks should mock the endpoint unless a real test message is explicitly intended.

## Deploy

Publish the project root, including `html`, `assets/css/portfolio.css`, `assets/js/app.js`, images and the PDF. Existing legacy CSS and vendor files are retained but are no longer loaded by the redesigned page. Update the Open Graph image URL in the main HTML if the public domain changes.
