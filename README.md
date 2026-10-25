# COEP Quant Finance Club — Official Website

Welcome to the **official open-source repository of the COEP Quant Finance Club website**.

This project powers the club’s digital presence and serves as a platform for:

* Quantitative finance research
* Technology projects
* Blog publications
* Event announcements
* Community collaboration

We welcome contributions from:

* Open-source developers
* Quantitative finance enthusiasts
* Designers and product thinkers
* Students interested in finance and technology

This repository is maintained by the **COEP Quant Finance Club**.

---

# 🌐 Live Website

- https://coep-quant-finance-club.github.io/club-website/
- https://coepquantfinance.com/

---

# ⚙️ Tech Stack

The website is built using modern frontend technologies.

* React
* Vite
* TypeScript
* TailwindCSS
* Three.js (quant visualizations)
* GitHub Pages for deployment

---

# 📂 Repository Structure

```
club-website
│
├ src
│ ├ components
│ ├ pages
│ ├ hooks
│ └ lib
│
├ public
│
├ .github
│ └ workflows
│
├ README.md
└ CONTRIBUTING.md
```

---

# 🤝 Contributing

We welcome contributions from:

* developers
* designers
* quant researchers
* open-source contributors

Before contributing, please read:

```
CONTRIBUTING.md
```

It explains:

* repository rules
* branch naming conventions
* pull request process
* contributor conduct

---

# 🧠 Contribution Areas

You can contribute in multiple ways.

### Development

* frontend improvements
* performance optimizations
* new features

### Quant Visualizations

* financial simulations
* market visualizations
* quantitative tools

### Content

* blog integrations
* event updates
* club documentation

### UI / UX

* design improvements
* responsiveness fixes
* animation improvements

---

# 🐛 Reporting Issues

If you encounter a bug or want to suggest a feature:

1. Open an **Issue**
2. Provide a clear description
3. Include screenshots or reproduction steps if possible

---

# 🔒 Repository Protection

This repository uses **branch protection rules** to maintain stability.

Key protections include:

* Pull Requests required before merging
* Minimum **1 approval**
* Status checks must pass before merging
* Force pushes blocked on protected branches

This ensures the website remains stable and production deployments remain safe.

---

# 🗓️ Internal Events Manager

Club event heads can manage the public events list at `/club-website/#/events-admin` (or `https://coepquantfinance.com/#/events-admin`). This is a private, unlinked page: only invited Supabase accounts granted the `events_admin` role can manage events. TOTP multi-factor authentication is required for every write. Events are stored in Supabase and appear on the public site without a deployment; the public events layout is unchanged. A database trigger enforces a maximum of **12 events**, including simultaneous additions.

## One-time setup

1. Create a Supabase project and run [`supabase/events.sql`](./supabase/events.sql) in its SQL Editor. This creates the public-read, restricted-write events table, enforces the event limit, and seeds the current events.
2. In Supabase Authentication, disable public sign-ups. Invite each event head individually, then set that user's **app metadata** to `{"role":"events_admin"}`. Do not set this in user metadata; users can change their own user metadata. Never give event heads the Supabase service-role key.
3. Keep TOTP authenticator MFA enabled for the project. Each event head enrolls an authenticator app at their first sign-in. The database rejects event writes unless the session has both the trusted `events_admin` app-metadata role and verified MFA (`aal2`).
4. In the GitHub repository's **Settings → Secrets and variables → Actions**, add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` using the project's URL and publishable/anon key. These values are included in the public site bundle; the anon key is safe to expose only because the SQL enables row-level security. Never use a service-role or secret key here.
5. Merge/publish the setup once. The GitHub Pages build will receive those secrets. From then on, authorized event heads can add, edit, and delete events at the admin URL without GitHub access, code changes, or redeployment.

For local development, place the same URL and anon key in an ignored `.env.local` file using those variable names. Without Supabase configuration the public events list continues to load from `public/events.json`; the admin page remains unavailable.

---

# 👨‍💻 Maintainers

Maintained by the **COEP Quant Finance Club**.

Contributors include members from:

* Tech Development Portfolio
* Research & Development Portfolio
* Product Management Portfolio
* Media Portfolio
* Corporate Outreach Portfolio
* Public Relations Portfolio

---

# 📜 License

This project is open-source and intended for educational and community use.

---

# 🙌 Acknowledgements

Thanks to everyone contributing to the **quantitative finance ecosystem at COEP**.
