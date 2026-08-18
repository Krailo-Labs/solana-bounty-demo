# ⚡ Solana Explained: Interactive UX Theater & Edge AI Companion

> **Live Demo:** [https://solana-explained.krailo.sh](https://solana-explained.krailo.sh)  
> **Live AI Worker Endpoint:** `https://solana-ai.krailo.sh`

---

## 🎯 Primary Focus & Value Proposition

Traditional Web3 onboarding fails because it starts with technical jargon. **Solana Explained** flips this paradigm by offering a **UX-First Interactive Theater**: a narrative-driven, visual journey that contrasts traditional banking bottlenecks with Solana's high-speed, sub-cent consensus.

Designed for non-technical users, students, and Web3 newcomers to grasp Solana's core value in under 2 minutes.

---

## ✨ Key Highlights

* **🎬 Interactive Vertical UX Theater:** Linear, visual comparison between TradFi friction (manual delays, high wire fees) and Solana's instant sub-second transactions.
* **⚡ Hybrid AI Architecture:**
  * **Instant Preset Engine:** Pre-compiled, zero-latency answers for common questions without rate limits or API dependencies.
  * **Pluggable Edge AI Worker:** Open field allowing users/judges to attach any custom Cloudflare AI Worker or AI Gateway endpoint on the fly.
* **🔊 Dynamic Controls & Audio UX:** Custom playback speeds (`0.8x`, `1.0x`, `1.25x`), sound feedback, and native **EN/UA localization**.
* **📱 Universal Responsive Interface:** Clean, dark-mode native feel optimized across desktop and mobile devices.

---

## 🛠 Architecture & Tech Stack

```text
[ Frontend: React / Vite ] ──► [ Instant Presets (Zero-Latency) ]
            │
            └──► (Optional) ──► [ Cloudflare AI Worker (Llama 3.1 8B FP8) ]
                                          │
                                          └──► [ Cloudflare AI Gateway ]
