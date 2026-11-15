# PRIKAUSHION QA & TEST HARNESS GUIDE

This document outlines how to execute the automated QA suites, test physics, and verify responsive layout across viewports.

---

## 1. Quick Verification Command
To run the automated **Phase C Drag & Interaction Physics Suite** locally:
```bash
# 1. Build production bundle
npm run build

# 2. Run test executor
node tests/run_drag_tests.cjs
```

All 13 physics and interaction scenarios will run against a headless Chromium browser instance.

---

## 2. Automated Test Matrix
- `tests/music-drag.spec.ts`: 13 interaction scenarios (8px deadband, vertical scroll pass-through, horizontal orbit drag, momentum throw, snapping, mobile touch, click vs drag, keyboard controls, circular modulo wrap-around).
- `tests/layout.spec.ts`: Multi-viewport layout integrity check (iPhone SE, iPhone 14, 1440p Desktop).
- `tests/mobile.spec.ts`: Mobile menu open/close, focus management, Escape key dismiss.

---

## 3. Continuous Integration
All pushes to `main` run automated typechecks, production builds, and verification suites via GitHub Actions workflow (`.github/workflows/ci.yml`).
