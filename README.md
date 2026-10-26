# berknazlim.com

Website of architect **Berk Nazlım**: a static site (plain HTML, CSS and JavaScript, no build step) hosted on GitHub Pages at [berknazlim.com](https://berknazlim.com).

## Pages

| Page | File |
| --- | --- |
| Home | `index.html` |
| Portfolio (filterable grid + index) | `portfolio.html` |
| Project detail | `project.html?p=<slug>` |
| Services & process | `services.html` |
| About, timeline, awards | `about.html` |
| Journal (blog) | `journal.html` |
| Journal article | `post.html?p=<slug>` |
| Contact | `contact.html` |

## Editing content

Almost everything you will want to change lives in **`assets/js/data.js`**:

- `PROJECTS`: the portfolio. The current projects are placeholders. Replace them with Berk's real work. To use real photos, put them in `assets/img/` and add `image: "assets/img/…jpg"` (cover) and `gallery: ["…", "…", "…"]` to a project. Without images, a generated architectural drawing is shown.
- `POSTS`: journal articles. Add a new object with `slug`, `title`, `date` (YYYY-MM-DD), `category`, `excerpt` and `body` (HTML). Posts are sorted by date automatically, newest first.
- `SITE`: email and social links used by the contact form.

Static text (About bio, Services, awards) is directly in the HTML files. Email and social links also appear in the footer of each HTML page.

## Contact form

The form opens the visitor's email app with a prefilled message to `hello@berknazlim.com`. To receive messages without an email app, connect a form service such as [Formspree](https://formspree.io) and point the form's `action` at it.

## Run locally

```sh
python3 -m http.server 8000
# open http://localhost:8000
```

## Hosting

GitHub Pages serves the `main` branch root. The `CNAME` file sets the custom domain `berknazlim.com`.
