# PRIKAUSHION PORTFOLIO — QA BLOCKERS & OWNER ACTION ITEMS

**Site:** https://prikaushion.vercel.app  
**Owner:** Prakhar Kaushik ("VishRim")  
**Official Email:** prikaushionv@gmail.com

The automated QA process has resolved all code-level defects (Tailwind numeric spacing scale collision, dock button distortion, header descender clipping, drag momentum physics, mobile touch target sizes, and `<noscript>` semantic fallbacks).

The following non-blocking external action items require your credentials or dashboard-level configuration:

---

## 1. Project Live Demo URLs (When Launched)
Several projects in `src/config/projects.ts` currently feature a graceful "Link coming soon" disabled state. When ready to publish live deployments for these projects, update their URLs in `src/config/projects.ts`:
- **Radix Aroma:** Update `liveUrl: "TODO_RADIX_AROMA_LIVE"`
- **nooq:** Update `liveUrl: "TODO_NOOQ_LIVE"`
- **DesiCal:** Update `liveUrl: "TODO_DESICAL_LIVE"` / `repoUrl: "TODO_DESICAL_REPO"`
- **NOVA:** Update `liveUrl: "TODO_NOVA_LIVE"` / `repoUrl: "TODO_NOVA_REPO"`
- **P4-EYE Access Control:** Update `liveUrl: "TODO_ACCESS_CONTROL_LIVE"` / `repoUrl: "TODO_ACCESS_CONTROL_REPO"`
- **Joyra:** Update `liveUrl: "TODO_JOYRA_LIVE"` / `repoUrl: "TODO_JOYRA_REPO"`
- **Wellness Creator Demo:** Update `liveUrl: "TODO_AKANSHA_DEMO_LIVE"` / `repoUrl: "TODO_AKANSHA_DEMO_REPO"`

---

## 2. Resume / CV PDF File
- **Location:** `src/config/site.ts` (`resumeUrl`)
- **Current State:** Set to `"/assets/resume-prakhar-kaushik.pdf"`.
- **Action Required:** Ensure your latest PDF resume is placed in `/public/assets/resume-prakhar-kaushik.pdf` so the "Download CV" button in the Hero section serves the physical file.

---

## 3. Contact Form Backend (Optional)
- **Current State:** The form seamlessly submits via client-side `mailto:prikaushionv@gmail.com` with encoded name, email, project type, and message.
- **Action Required:** If you wish to receive submissions directly via a headless email service (e.g. Resend, Formspree, or SendGrid) without opening the visitor's mail client, deploy an API route at `/api/contact` (e.g. on Vercel Serverless Functions) with your API key.

---

## 4. Google Search Console & Custom Domain (Optional)
- **Current State:** Canonical URL and OpenGraph metadata are configured for `https://prikaushion.vercel.app/`.
- **Action Required:**
  1. Add and verify `https://prikaushion.vercel.app/` in [Google Search Console](https://search.google.com/search-console).
  2. If attaching a custom domain (e.g. `prikaushion.com`), update `site.url` in `src/config/site.ts` and `canonical` in `index.html`.
