# Contributing to the COEP Quant Finance Club Website

Thank you for your interest in contributing to the **COEP Quant Finance Club Website**.

We welcome contributions from:

* Open-source contributors
* Quantitative finance enthusiasts
* Developers and designers
* Students interested in finance and technology

---

# Repository Ruleset

This repository follows a protected workflow to ensure code quality and stability.

The **main branch is protected** using GitHub branch protection rules.

The following rules apply:

* Direct commits to `main` are not allowed
* All changes must go through **Pull Requests**
* At least **one approval** is required before merging
* **Status checks must pass before merging**
* Force pushes to protected branches are blocked

---

# Status Check Requirement

Pull requests trigger an automated **GitHub Actions build pipeline**.

Before a pull request can be merged:

```
PR opened
      ↓
GitHub Actions build runs
      ↓
Status check passes
      ↓
Pull request eligible for merge
```

If the build fails, the pull request **cannot be merged**.

This ensures broken builds never reach production.

---

### **Code of Conduct**

This repository represents the COEP Quant Finance Club. Contributors must maintain a professional and respectful environment. The following are strictly prohibited:

* **Foul Language in Commits:** Keep your commit messages cleaner than a high-frequency trading algorithm. 
* **Offensive Branch Names:** If your branch name requires a trigger warning, it will be `rm -rf`’d on sight.
* **Abusive Behavior:** Aggression in Pull Requests or Issues will result in an immediate and non-negotiable `liquidation` of your contributor status.
* **Disrespectful Communication:** We value high-alpha ideas, but zero-beta attitudes. Be civil.

#### **The "Anti-Rogue-Trader" Security Clause**
We appreciate "creative" engineering, but this repository is not a sandbox for your Zero-Day exploits. 

* **No Cyber-Sabotage:** Any attempt to inject **logic bombs, SQL injections, hidden cryptominers, or recursive fork-bombs** will be treated as a "Force Push to your Career."
* **Site Stability:** If your PR contains more obfuscated shellcode than actual financial logic, or if you try to `rm -rf /` our deployment server or intentionally take the site down via a GitHub Action, your access will be `403 Forbidden` for eternity.
* **The Bottom Line:** We are a Quant club; the only "crashing" allowed here should be the market price of a bad option strategy, not our production server.



---

### **Violation Consequences**
Violation of these rules may result in:
1.  **Pull Request Removal:** Your code will be closed without merge.
2.  **Contributor Ban:** Permanent blacklisting from the all repos of club org.
3.  **Club Expulsion:** For COEP students, violation will lead to removal from the COEP Quant Finance Club roles and official records.

# Branch Naming Guidelines

Branch naming is not strictly enforced but **contributors are strongly encouraged to follow the conventions below**.

Consistent branch names help maintain repository clarity.

---

# Bug Fix Branches

Used for fixing reported issues.

### External contributors

```
bug/<username>/issue-id/*
```

Example

```
bug/rahul/42/navbar-fix
```

---

### COEP students (non club members)

```
bug/<mis>/issue-id/*
```

Example

```
bug/123456/navbar-overlap
```

---

### Quant club coordinators or heads

```
bug/<name>/issue-id/*
```

Example

```
bug/abhi/42
```

Issue IDs may optionally be replaced with a short description.

---

# Feature Branches

Used for new functionality.

Examples include:

* new pages
* integrations
* visualizations

### Naming Convention

External contributors

```
feature/<username>/issue-id/*
```

COEP students

```
feature/<mis>/issue-id/*
```

Club coordinators / heads

```
feature/<name>/issue-id/*
```

Example

```
feature/sarah/blog-page
```

---

# Content Update Branches

Used for updating:

* events
* team members
* blog links
* announcements

Naming format

```
content/<username>/description
```

Example

```
content/rahul/update-events
```

---

# UI / Design Branches

Used for visual improvements.

Examples:

* layout improvements
* styling fixes
* responsiveness updates

Naming format

```
ui/<username>/description
```

Example

```
ui/sarah/navbar-redesign
```

---

# Documentation Branches

Used for improving repository documentation.

Naming format

```
docs/<username>/description
```

Example

```
docs/rahul/contribution-guide
```

---

# Hotfix Branches

Used for urgent production fixes.

Examples include:

* deployment failures
* broken homepage
* critical UI bugs

Naming format

```
hotfix/<username>/description
```

Example

```
hotfix/abhi/fix-deployment
```

---

# Pull Request Guidelines

Before opening a pull request:

1. Ensure your branch follows naming guidelines
2. Write meaningful commit messages
3. Link related issues where possible
4. Provide a clear explanation of your changes

Example PR title

```
Fix navbar overlap on mobile devices (#42)
```

---

# Contribution Workflow

Typical workflow

```
fork repository
create branch
make changes
push branch
open pull request
review
merge
```

---

# Thank You

Every contribution helps strengthen the **quant ecosystem at COEP**.

We appreciate your effort and participation in improving this project.
