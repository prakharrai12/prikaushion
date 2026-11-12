# PRIKAUSHION PORTFOLIO — V2 STATUS & BLOCKERS

| ID | Phase | Item / Dependency | Status | Details / Owner Action |
|---|---|---|---|---|
| **B-01** | Phase 6 | Domain verification (`prikaushion.studio` vs `prikaushion.vercel.app`) | RESOLVED | Canonical URL set to `https://prikaushion.vercel.app/` matching active production deployment. When `prikaushion.studio` is pointed in Vercel DNS, update `link[rel="canonical"]` and sitemap URL. |
| **B-02** | Phase 7 | Contact form dispatch | RESOLVED | Configured dual-layer handler: `/api/contact.ts` serverless endpoint with input validation and bot honeypot, with automatic graceful fallback to prefilled `mailto:` client composition. |
| **B-03** | Phase 5 | Radix Aroma live URL | RESOLVED | Disabled "Link coming soon" button pattern maintained in accordance with spec, complete with high-resolution product screenshot preview. |
| **B-04** | Terminal | Windows PowerShell Script Execution Policy | RESOLVED | `npm.ps1` blocked by default Windows ExecutionPolicy. Solved by running `npm.cmd run dev` or executing `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned`. |

---
