# AWS Community Day Victoria

City of Builders website for https://canadiancloud.org/awsday-victoria/.

Planned custom domain: https://victoria.awsday.ca.

## Preview

Serve this directory with any static HTTP server, for example:

```sh
python -m http.server 8080
```

No framework, package installation, build step, tracking or backend is required.

## Content

`index.html` contains editable, accessible page content and dialog panels. Shared appearance lives in `styles.css`; `app.js` handles navigation and native dialogs. Images and locally hosted fonts live in `assets/`. All paths are relative, so the site also works under the GitHub project path.

Dates, venue, speakers and programme are deliberately unconfirmed. Every Get updates link opens the Victoria group's events page: https://www.meetup.com/aws-sbg-at-university-of-victoria/. Volunteer, speaker and sponsorship enquiries open the visitor’s email app addressed to the published info@awsday.ca contact.

To publish confirmed details, replace the corresponding panel and hero copy, and point the updates CTA at the confirmed registration URL. Update canonical, social metadata, sitemap and CNAME if the domain changes.

## Hosting

GitHub Pages serves `main` from `/`. The working project URL inherits the CanadianCloud organization domain. This repo is independent of the main awsday.ca site.

To enable the planned custom domain:

1. Add a DNS CNAME record: `victoria.awsday.ca` to `canadiancloud.github.io`.
2. Set the GitHub Pages custom domain to `victoria.awsday.ca` (or add a root `CNAME` file with that hostname).
3. Once GitHub issues the certificate, enforce HTTPS.
4. Update canonical/social metadata, robots.txt, sitemap.xml and the city links on all three sites to the custom domains.

Do not attach a custom domain before its DNS record is ready; GitHub would redirect visitors to an unresolved hostname.

## Assets

City artwork was generated for this design. Community photo reused from CanadianCloud/awsday.github.io, public/Instagram/ig3.jpg, and captioned as a past Canadian community event. Nunito is licensed under the SIL Open Font License; see assets/OFL.txt.
