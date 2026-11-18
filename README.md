# Ibrahim Aboraya — Software Engineering Portfolio

> Selected work across full-stack development, backend engineering, data platforms, and connected devices.

[**View my GitHub profile**](https://github.com/EbraheemAboraya) · [**LinkedIn**](https://www.linkedin.com/in/ibrahem-aboraya/)

## About this portfolio
A responsive static site built with HTML, CSS and JavaScript. It presents my engineering background, selected projects, and contact information without requiring a frontend build system.

## Featured projects

| Project | Engineering focus | Source |
| --- | --- | --- |
| Smart Greenhouse / PlantMind AI | Sensors, embedded control, Python, Raspberry Pi and system integration | [Repository](https://github.com/EbraheemAboraya/Greenhouse-project-) |
| Amazon Data Lakehouse | Spark, Kafka, Iceberg, Airflow and Docker | [Repository](https://github.com/EbraheemAboraya/data) |
| Volunteer Coordination | Node.js, Express, MongoDB, React and Socket.IO | [Backend](https://github.com/EbraheemAboraya/volunteers) · [Frontend](https://github.com/EbraheemAboraya/volunter_fronted) |
| Takalot | Issue-management web application | [Repository](https://github.com/EbraheemAboraya/final_project_taklot) |

## Site structure
| File | Purpose |
| --- | --- |
| `html/index.html` | Main site content |
| `assets/css/portfolio.css` | Site presentation |
| `assets/js/app.js` | Navigation and contact interactions |
| `assets/docs/Ibrahim_Aboraya_CV_2026.pdf` | Downloadable résumé |
| `index.html` | Root entry/forwarding page |

## Run locally
From the repository root:
```bash
python -m http.server 8000 --bind 127.0.0.1
```
Open `http://localhost:8000`.

## Deployment notes
Publish the entire repository root so linked assets resolve correctly. The contact form calls a configured AWS Lambda endpoint; sending an HTTP request does not by itself guarantee delivery to an inbox. Check CORS and server-side abuse prevention before deployment.

**Note:** Project diagrams are architectural illustrations rather than screenshots of deployed applications.

---
*Built to make engineering work easy to discover and understand.*
