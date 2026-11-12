# PRIKAUSHION PORTFOLIO — V2 BLOCKERS & PENDING OWNER INPUTS

| ID | Phase | Item / Dependency | Current Status | Action Required from Owner |
|---|---|---|---|---|
| **B-01** | Phase 6 | Domain verification (`prikaushion.studio` vs `prikaushion.vercel.app`) | Site serves from `prikaushion.vercel.app`. Spec lists `prikaushion.studio`. | If `prikaushion.studio` is not attached in Vercel domains, canonical URL will use `https://prikaushion.vercel.app`. |
| **B-02** | Phase 5 / 7 | Contact form email service credentials (Resend / Formspree / SendGrid API Key) | Form currently handles state in client React. Serverless endpoint will provide mock/webhook fallback if API key is not supplied in environment variables. | Provide `RESEND_API_KEY` or preferred mailing service credentials if real emails should dispatch directly to Prakhar's inbox. |
| **B-03** | Phase 5 | Radix Aroma live URL | Project marked in development. | Kept as spec-compliant disabled "Link coming soon" state until live URL is provided. |

---
