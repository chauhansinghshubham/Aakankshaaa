# For Aakanksha ❤️ — Project Setup Guide

> [!IMPORTANT]
> Node.js was not found in PATH on this system. You must run the install commands yourself in a terminal **with Node.js available**.

---

## 1. Install Dependencies

Open a terminal in `D:\Aakanksha` and run:

```bash
npm install
```

This installs everything declared in `package.json` (React 18, Framer Motion, Tailwind CSS v4, Lucide React, React Hot Toast, Vite).

---

## 2. Start the Dev Server

```bash
npm run dev
```

The website will be available at **http://localhost:5173**

---

## 3. Add Your Photos

Place photos in `D:\Aakanksha\public\` following this structure:

```
public/
  photos/
    hero.jpg              ← (optional) Hero background — not used yet, available for future
    profile.jpg           ← HerSection — main profile card photo
    ho_kaun_tum.jpg       ← HoKaunTum — full-screen cinematic background
    final.jpg             ← FinalPage — full-screen ending background
    gallery/
      1.jpg … 12.jpg      ← Polaroid gallery (12 photos)
    memories/
      1.jpg … 6.jpg       ← 4 Months scrapbook (6 photos)
    timeline/
      1.jpg … 5.jpg       ← Our Story timeline (5 photos)
  music/
    song.mp3              ← Your chosen song
```

> [!NOTE]
> Every image has an `onError` fallback — a beautiful pink/purple gradient placeholder appears automatically if an image file is missing. The site works fine without any photos while you're setting up.

---

## 4. Add Music

Drop your `.mp3` file into `public/music/` and update the path in:

**`src/config/content.js`** → `music:` field

```js
music: '/music/your-song-name.mp3',
```

---

## 5. Personalise Content

**Everything editable lives in one file:** [`src/config/content.js`](file:///D:/Aakanksha/src/config/content.js)

| Field | What to edit |
|---|---|
| `name` | Her name (currently `'Aakanksha'`) |
| `music` | Music file path |
| `photos.*` | All photo paths |
| `timeline[]` | 5 memory entries — date, title, description, photo |
| `loveThings[]` | 15 flip card messages |
| `breakingNews[]` | 6 funny newspaper articles |
| `apologyLines[]` | The sincere apology text (line by line) |
| `letter` | The full handwritten letter body |
| `finalMessage` | The closing message on the final page |

---

## 6. Build for Production

```bash
npm run build
```

Output goes to `dist/`. You can host it on **Netlify**, **Vercel**, or any static host by dragging the `dist/` folder.

---

## Architecture Summary

```
src/
  config/
    content.js           ← ALL editable content
  components/
    Opening.jsx          ← Page 1: Cinematic landing with letter-by-letter reveal
    HerSection.jsx       ← Page 2: The Aakanksha Edition + personality tags
    Gallery.jsx          ← Page 3: Polaroid photo gallery + lightbox
    OurStory.jsx         ← Page 4: Expandable timeline
    LoveThings.jsx       ← Page 5: 15 flip cards
    HoKaunTum.jsx        ← Page 6: Cinematic Hindi section with typing animation
    FourMonths.jsx       ← Page 7: Scattered scrapbook photos
    BreakingNews.jsx     ← Page 8: Fake newspaper with ticker tape
    Apology.jsx          ← Page 9: Line-by-line scroll reveal apology
    Letter.jsx           ← Page 10: Typewriter handwritten letter
    Surprise.jsx         ← Page 11: 3 interactive buttons + confetti
    FinalPage.jsx        ← Final: Sequential fade-in cinematic ending
    MusicPlayer.jsx      ← Floating bottom-right music widget
    ParticleSystem.jsx   ← Canvas hearts/stars particles
    Cursor.jsx           ← Custom glowing cursor (desktop only)
    Lightbox.jsx         ← Photo lightbox with keyboard + swipe navigation
    ScrollReveal.jsx     ← Scroll-trigger animation wrapper
```

---

## Known Limitations

- **Node.js required**: Must have Node.js ≥ 18 installed to run the dev server
- **Music autoplay**: Browsers block autoplay — user must click the ▶ button manually
- **Photos**: Until you add real photos, gradient placeholders display instead
- **Timeline dates**: Currently placeholder text — fill in `content.js`
- **Letter**: The letter body is placeholder text — replace it with your personal letter in `content.js`

---

*Built with React 18 + Vite 5 + Tailwind CSS v4 + Framer Motion 11*
