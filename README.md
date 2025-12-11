<div align="center" style="margin-bottom:28px;">
  <svg width="1024" height="260" viewBox="0 0 1024 260" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="panel" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#070b25" />
        <stop offset="100%" stop-color="#1a1440" />
      </linearGradient>
      <linearGradient id="glow" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#38f0c8" />
        <stop offset="100%" stop-color="#8b5cf6" />
      </linearGradient>
    </defs>
    <rect width="1024" height="260" rx="34" fill="url(#panel)" stroke="#272863" />
    <text x="80" y="120" font-family="'Space Grotesk', sans-serif" font-size="44" fill="#fdf4ff">Rohan Sharma Sitoula</text>
    <text x="80" y="165" font-family="'Inter', sans-serif" font-size="20" fill="#cbd5f5">Systems engineer building AI proctoring + video review tools</text>
    <text x="80" y="200" font-family="'Inter', sans-serif" font-size="16" fill="#94a3b8">Talview · Bengaluru · calm tech for exam rooms</text>
    <g>
      <circle cx="820" cy="130" r="60" fill="none" stroke="url(#glow)" stroke-width="5" stroke-dasharray="8 14">
        <animate attributeName="stroke-dashoffset" values="0;160" dur="6s" repeatCount="indefinite" />
      </circle>
      <circle cx="820" cy="130" r="42" fill="#050a1d" stroke="#38f0c8" stroke-width="3" />
      <text x="820" y="138" font-family="'JetBrains Mono', monospace" font-size="16" fill="#e0e7ff" text-anchor="middle">ships</text>
    </g>
  </svg>
</div>

<div align="center">
  <img src="https://img.shields.io/badge/location-Bengaluru,_India-0f172a?style=for-the-badge&logo=googlemaps&logoColor=38f0c8" alt="location" />
  <img src="https://img.shields.io/badge/focus-AI%20proctoring%20%26%20video%20rooms-111b52?style=for-the-badge&logo=airplayvideo&logoColor=f97316" alt="focus" />
  <img src="https://img.shields.io/badge/availability-building%20right%20now-1a103c?style=for-the-badge&logo=icloud&logoColor=facc15" alt="availability" />
</div>

## Current focus
- Tuning **Alvy AI Proctor** with clearer evidence so reviewers get fewer false alarms.
- Keeping video alerts under a second even when thousands of rooms go live.
- Baking GDPR-friendly logging into every workflow so audits stay boring.

### Quick metrics
<div align="center">
  <div style="display:flex;flex-wrap:wrap;gap:16px;justify-content:center;">
    <div style="background:#0f172a;border:1px solid #1f2a53;border-radius:18px;padding:18px 26px;min-width:140px;">
      <div style="font-size:14px;color:#38f0c8;text-transform:uppercase;letter-spacing:1px;">Rooms / month</div>
      <div style="font-size:30px;color:#fdf4ff;">2K+</div>
    </div>
    <div style="background:#0f172a;border:1px solid #2f315f;border-radius:18px;padding:18px 26px;min-width:140px;">
      <div style="font-size:14px;color:#facc15;text-transform:uppercase;letter-spacing:1px;">Uptime</div>
      <div style="font-size:30px;color:#fdf4ff;">99.99%</div>
    </div>
    <div style="background:#0f172a;border:1px solid #3e2f5f;border-radius:18px;padding:18px 26px;min-width:140px;">
      <div style="font-size:14px;color:#f97316;text-transform:uppercase;letter-spacing:1px;">Alert speed</div>
      <div style="font-size:30px;color:#fdf4ff;">&lt;1s</div>
    </div>
    <div style="background:#0f172a;border:1px solid #4b2f6e;border-radius:18px;padding:18px 26px;min-width:140px;">
      <div style="font-size:14px;color:#a855f7;text-transform:uppercase;letter-spacing:1px;">Manual review</div>
      <div style="font-size:30px;color:#fdf4ff;">95% saved</div>
    </div>
    <div style="background:#0f172a;border:1px solid #2f5f3a;border-radius:18px;padding:18px 26px;min-width:140px;">
      <div style="font-size:14px;color:#4ade80;text-transform:uppercase;letter-spacing:1px;">Releases</div>
      <div style="font-size:30px;color:#fdf4ff;">100+/yr</div>
    </div>
  </div>
</div>
<div align="center" style="margin-top:14px;">
  <svg width="520" height="18" viewBox="0 0 520 18" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="metricPulse" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#38f0c8" />
        <stop offset="50%" stop-color="#f97316" />
        <stop offset="100%" stop-color="#8b5cf6" />
      </linearGradient>
    </defs>
    <rect x="2" y="6" width="516" height="6" rx="3" fill="#141b3c" />
    <rect x="-120" y="6" width="160" height="6" rx="3" fill="url(#metricPulse)">
      <animate attributeName="x" values="-120;480;-120" dur="8s" repeatCount="indefinite" />
    </rect>
  </svg>
</div>

---

## Highlights
1. **Built an exam guardian:** Designed the Alvy AI agent with Llama-based retrieval, multi-stream video checks, and self-review loops so the team reviews far fewer flags.
2. **Kept the lights on:** Shipped multi-AZ AWS setups, autoscaling rules, and blue/green deploys that keep latency steady while we experiment.
3. **Made onboarding instant:** Turned LMS + SSO setup into guided templates, cutting customer rollout from weeks to a few hours.
4. **Reduced guesswork:** Rolled out Prometheus and Grafana dashboards that page us before students notice anything.

---

## Open source spotlight
### blocknote-py — BlockNote content for Python backends
<div align="center" style="margin-bottom:12px;">
  <a href="https://pypi.org/project/blocknote-py/"><img src="https://img.shields.io/pypi/v/blocknote-py?color=38f0c8&label=PyPI&style=for-the-badge" alt="PyPI version" /></a>
  <a href="https://pypi.org/project/blocknote-py/"><img src="https://img.shields.io/pypi/dm/blocknote-py?color=f97316&label=Downloads&style=for-the-badge" alt="downloads" /></a>
  <a href="https://rohansharmasitoula.github.io/blocknote-py/"><img src="https://img.shields.io/badge/docs-available-4ade80?style=for-the-badge&logo=readthedocs&logoColor=fff" alt="docs" /></a>
  <a href="https://github.com/rohansharmasitoula/blocknote-py"><img src="https://img.shields.io/github/stars/rohansharmasitoula/blocknote-py?label=GitHub%20stars&style=for-the-badge" alt="stars" /></a>
</div>

BlockNote-py turns BlockNote.js content into HTML, Markdown, PDF, or JSON without needing Node.js on the server. Typed Pydantic models keep payloads safe across FastAPI, Django, or Flask.

- Handles HTML/Markdown/PDF conversion while preserving styles and colors.
- Ships with 95%+ test coverage, CI, and docs so teams can trust the library.
- Optional extras pull in PDF tooling or docs builders only when needed.

---

## Experience timeline
<div style="display:flex;flex-direction:column;gap:18px;">
  <div style="display:flex;gap:16px;align-items:flex-start;background:#0f172a;border-radius:18px;border:1px solid #1f2a53;padding:18px;">
    <div style="background:#38f0c8;color:#050a1d;padding:8px 14px;border-radius:999px;font-size:14px;">Mar 2025 → Now</div>
    <div style="display:flex;gap:14px;align-items:flex-start;">
      <img src="https://avatars.githubusercontent.com/u/5830358?s=80&v=4" alt="Talview logo" width="46" height="46" style="border-radius:12px;border:1px solid #1f2a53;background:#050a1d;padding:6px;" />
      <div>
        <div style="color:#fdf4ff;font-size:18px;font-weight:600;">Software Engineer · Talview</div>
        <div style="color:#cbd5f5;font-size:15px;margin-top:6px;">Guiding the AI proctor agent, rebuilding the reviewer surface, and keeping planning + reviews moving.</div>
        <div style="margin-top:12px;">
          <svg width="220" height="8" viewBox="0 0 220 8" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="timelinePulse1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#38f0c8" />
                <stop offset="100%" stop-color="#8b5cf6" />
              </linearGradient>
            </defs>
            <rect width="220" height="8" rx="4" fill="#11173a" />
            <rect width="80" height="8" rx="4" fill="url(#timelinePulse1)">
              <animate attributeName="width" values="40;180;80" dur="5s" repeatCount="indefinite" />
            </rect>
          </svg>
        </div>
      </div>
    </div>
  </div>
  <div style="display:flex;gap:16px;align-items:flex-start;background:#0d1230;border-radius:18px;border:1px solid #22295a;padding:18px;">
    <div style="background:#f97316;color:#050a1d;padding:8px 14px;border-radius:999px;font-size:14px;">May 2023 → Mar 2025</div>
    <div style="display:flex;gap:14px;align-items:flex-start;">
      <img src="https://avatars.githubusercontent.com/u/5830358?s=80&v=4" alt="Talview logo" width="46" height="46" style="border-radius:12px;border:1px solid #22295a;background:#050a1d;padding:6px;" />
      <div>
        <div style="color:#fdf4ff;font-size:18px;font-weight:600;">Associate SWE · Talview</div>
        <div style="color:#cbd5f5;font-size:15px;margin-top:6px;">Built event-driven services, LMS/LTI integrations, no-code onboarding, and calmer deploy paths.</div>
        <div style="margin-top:12px;">
          <svg width="220" height="8" viewBox="0 0 220 8" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="timelinePulse2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#f97316" />
                <stop offset="100%" stop-color="#38f0c8" />
              </linearGradient>
            </defs>
            <rect width="220" height="8" rx="4" fill="#10163c" />
            <rect width="120" height="8" rx="4" fill="url(#timelinePulse2)">
              <animate attributeName="width" values="60;200;120" dur="6s" repeatCount="indefinite" />
            </rect>
          </svg>
        </div>
      </div>
    </div>
  </div>
  <div style="display:flex;gap:16px;align-items:flex-start;background:#0b0f26;border-radius:18px;border:1px solid #1c1f45;padding:18px;">
    <div style="background:#8b5cf6;color:#050a1d;padding:8px 14px;border-radius:999px;font-size:14px;">Jan 2023 → May 2023</div>
    <div style="display:flex;gap:14px;align-items:flex-start;">
      <img src="https://avatars.githubusercontent.com/u/5830358?s=80&v=4" alt="Talview logo" width="46" height="46" style="border-radius:12px;border:1px solid #1c1f45;background:#050a1d;padding:6px;" />
      <div>
        <div style="color:#fdf4ff;font-size:18px;font-weight:600;">Engineering Intern · Talview</div>
        <div style="color:#cbd5f5;font-size:15px;margin-top:6px;">Built the Slack attendance bot, rolled out tracing, upgraded to GraphQL, and lifted test coverage.</div>
        <div style="margin-top:12px;">
          <svg width="220" height="8" viewBox="0 0 220 8" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="timelinePulse3" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#8b5cf6" />
                <stop offset="100%" stop-color="#38f0c8" />
              </linearGradient>
            </defs>
            <rect width="220" height="8" rx="4" fill="#0c1232" />
            <rect width="60" height="8" rx="4" fill="url(#timelinePulse3)">
              <animate attributeName="width" values="30;150;60" dur="4.5s" repeatCount="indefinite" />
            </rect>
          </svg>
        </div>
      </div>
    </div>
  </div>
</div>

---

## Skill map
<div align="center" style="margin:12px 0 18px 0;">
  <svg width="520" height="30" viewBox="0 0 520 30" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="skillWave" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#38f0c8" />
        <stop offset="30%" stop-color="#facc15" />
        <stop offset="60%" stop-color="#f97316" />
        <stop offset="100%" stop-color="#8b5cf6" />
      </linearGradient>
    </defs>
    <path d="M0 20 Q 60 5 120 18 T 240 18 T 360 18 T 520 12" fill="none" stroke="#111b3e" stroke-width="4" />
    <path d="M0 20 Q 60 5 120 18 T 240 18 T 360 18 T 520 12" fill="none" stroke="url(#skillWave)" stroke-width="4">
      <animate attributeName="stroke-dasharray" values="20 180;40 160;20 180" dur="6s" repeatCount="indefinite" />
      <animate attributeName="stroke-dashoffset" values="0;-200;0" dur="6s" repeatCount="indefinite" />
    </path>
  </svg>
</div>
<div style="display:flex;flex-wrap:wrap;gap:18px;justify-content:center;">
  <div style="flex:1 1 260px;min-width:240px;background:#0f172a;border-radius:18px;border:1px solid #1f2a53;padding:18px;">
    <div style="font-size:14px;color:#38f0c8;text-transform:uppercase;letter-spacing:1px;">🎥 AI & video</div>
    <div style="color:#e0e7ff;margin-top:8px;line-height:1.4;">Llama-based RAG, computer vision models, agent loops, anomaly scoring.</div>
  </div>
  <div style="flex:1 1 260px;min-width:240px;background:#0f172a;border-radius:18px;border:1px solid #1f2a53;padding:18px;">
    <div style="font-size:14px;color:#f97316;text-transform:uppercase;letter-spacing:1px;">🛠 Services</div>
    <div style="color:#e0e7ff;margin-top:8px;line-height:1.4;">Python, Node.js/TypeScript, Express/Nest, Kafka, Temporal, REST + GraphQL.</div>
  </div>
  <div style="flex:1 1 260px;min-width:240px;background:#0f172a;border-radius:18px;border:1px solid #1f2a53;padding:18px;">
    <div style="font-size:14px;color:#facc15;text-transform:uppercase;letter-spacing:1px;">☁️ Cloud & ops</div>
    <div style="color:#e0e7ff;margin-top:8px;line-height:1.4;">AWS (Lambda, S3, EC2, SQS/SNS, CloudWatch), Azure Blob, Docker, Kubernetes, CI/CD.</div>
  </div>
  <div style="flex:1 1 260px;min-width:240px;background:#10163a;border-radius:18px;border:1px solid #1f2a53;padding:18px;">
    <div style="font-size:14px;color:#a855f7;text-transform:uppercase;letter-spacing:1px;">🗄 Storage & data</div>
    <div style="color:#e0e7ff;margin-top:8px;line-height:1.4;">PostgreSQL, Redis, Firebase, Amazon S3, Azure storage.</div>
  </div>
  <div style="flex:1 1 260px;min-width:240px;background:#10163a;border-radius:18px;border:1px solid #1f2a53;padding:18px;">
    <div style="font-size:14px;color:#4ade80;text-transform:uppercase;letter-spacing:1px;">📈 Observability</div>
    <div style="color:#e0e7ff;margin-top:8px;line-height:1.4;">Prometheus, Grafana, Sentry, log pipelines.</div>
  </div>
  <div style="flex:1 1 260px;min-width:240px;background:#10163a;border-radius:18px;border:1px solid #1f2a53;padding:18px;">
    <div style="font-size:14px;color:#e0e7ff;text-transform:uppercase;letter-spacing:1px;">🔐 Domain know-how</div>
    <div style="color:#e0e7ff;margin-top:8px;line-height:1.4;">Low-latency video streaming, LMS/LTI hooks, secure data governance, GDPR compliance.</div>
  </div>
</div>

---

## Education
<div style="display:flex;flex-direction:column;gap:16px;">
  <div style="display:flex;gap:16px;align-items:center;background:#0f172a;border-radius:18px;border:1px solid #1f2a53;padding:16px 20px;">
    <img src="https://erp.smu.edu.in/images/logo.png" alt="SMIT logo" width="60" height="60" style="background:#ffffff;border-radius:12px;padding:8px;" />
    <div>
      <div style="color:#fdf4ff;font-size:18px;font-weight:600;">MCA · Sikkim Manipal Institute of Technology</div>
      <div style="color:#cbd5f5;font-size:15px;margin-top:4px;">2021 – 2023 · Sikkim, India</div>
    </div>
  </div>
  <div style="display:flex;gap:16px;align-items:center;background:#0d1230;border-radius:18px;border:1px solid #22295a;padding:16px 20px;">
    <img src="https://erp.smu.edu.in/images/logo.png" alt="SMIT logo" width="60" height="60" style="background:#ffffff;border-radius:12px;padding:8px;" />
    <div>
      <div style="color:#fdf4ff;font-size:18px;font-weight:600;">BCA · Sikkim Manipal Institute of Technology</div>
      <div style="color:#cbd5f5;font-size:15px;margin-top:4px;">2018 – 2021 · Sikkim, India</div>
    </div>
  </div>
  <div style="display:flex;gap:16px;align-items:center;background:#0b0f26;border-radius:18px;border:1px solid #1c1f45;padding:16px 20px;">
    <img src="https://jyothiscentralschool.org/public/assets/images/main/logo.png" alt="Jyothis Central School logo" width="60" height="60" style="background:#ffffff;border-radius:12px;padding:8px;" />
    <div>
      <div style="color:#fdf4ff;font-size:18px;font-weight:600;">Class 12 · Jyothis Central School</div>
      <div style="color:#cbd5f5;font-size:15px;margin-top:4px;">2017 · Kerala, India</div>
    </div>
  </div>
</div>

---

## GitHub rhythm
<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=rohansharmasitoula&show_icons=true&theme=tokyonight&count_private=true" alt="stats" />
  <img src="https://github-readme-streak-stats.herokuapp.com/?user=rohansharmasitoula&theme=tokyonight" alt="streak" />
  <img src="https://github-readme-activity-graph.vercel.app/graph?username=rohansharmasitoula&bg_color=050221&color=f97316&line=38f0c8&point=8b5cf6&area=true" alt="activity" />
  <img src="https://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=rohansharmasitoula&theme=tokyonight" alt="profile" />
  <img src="https://github-profile-trophy.vercel.app/?username=rohansharmasitoula&theme=darkhub&no-bg=true&no-frame=true&margin-w=8&margin-h=8" alt="trophy" />
</div>

---

## How I work
- Keep everyone in the loop with short updates, dashboards, and runbooks.
- Ship small slices behind flags, then harden them with tests and docs.
- Measure latency, quality, and on-call noise so we know what to fix next.
- Automate recovery: scripts and bots fix common issues before humans wake up.
- Always give reviewers the story behind each AI alert so they stay in control.

---

## Say hi
<div align="center">
  <a href="mailto:sitoularohansharma@gmail.com"><img src="https://img.shields.io/badge/email-sitoularohansharma%40gmail.com-0f172a?style=for-the-badge&logo=gmail&logoColor=ff4d6d" alt="email" /></a>
  <a href="https://linkedin.com/in/rohan-sharma-sitoula"><img src="https://img.shields.io/badge/linkedin-rohan%20sharma%20sitoula-111827?style=for-the-badge&logo=linkedin&logoColor=38f0c8" alt="linkedin" /></a>
  <a href="https://github.com/rohansharmasitoula"><img src="https://img.shields.io/badge/github-@rohansharmasitoula-020617?style=for-the-badge&logo=github&logoColor=f8fafc" alt="github" /></a>
  <a href="https://t.me/rohansharmasitoula"><img src="https://img.shields.io/badge/telegram-@rohansharmasitoula-050827?style=for-the-badge&logo=telegram&logoColor=8b5cf6" alt="telegram" /></a>
</div>

If you are wrestling with video rooms, AI review loops, or a broken UI, I am probably debugging the same thing—reach out.
