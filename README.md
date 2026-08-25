# Please My Cheese

Name the cheese. Get the bottle.

A static web app — no server, no API keys, no database. 90 cheeses are built
in, so it works instantly and offline once loaded.

---

## Run it on your own machine

You need [Node.js](https://nodejs.org) (version 18 or newer). Then:

```bash
npm install
npm run dev
```

Open the address it prints, usually `http://localhost:5173`.

To make the production files:

```bash
npm run build
```

That writes everything into `dist/`. To check the built version before
deploying:

```bash
npm run preview
```

---

## Put it on your domain

### 1. Push it to GitHub

Create a free account, make a new empty repository, then from this folder:

```bash
git init
git add .
git commit -m "Please My Cheese"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/please-my-cheese.git
git push -u origin main
```

### 2. Connect Netlify

Sign in to [netlify.com](https://netlify.com) with GitHub, choose
**Add new site → Import an existing project**, pick the repository.

It reads `netlify.toml` in this folder, so the build command and publish
directory are already filled in. Deploy.

You get a temporary address like `random-name-123.netlify.app`. **Test the
app properly there before touching DNS** — search a few cheeses, check it
looks right on your phone.

> Vercel works identically and reads `vercel.json` instead. Either is fine.

### 3. Add your domain in Netlify

**Domain management → Add a domain →** type your domain.

Netlify then shows you the exact DNS records to create. Use the values it
gives you — they differ per site, so don't copy them from a guide.

### 4. Point GoDaddy at it

Sign in to GoDaddy → **My Products** → your domain → **DNS**.

**Delete GoDaddy's parking records first.** There's usually an `A` record for
`@` pointing at a GoDaddy holding page, and sometimes a `CNAME` for `www`.
Leaving them in place will conflict.

Then pick one of two approaches:

**Option A — let Netlify run your DNS (simplest)**
In GoDaddy, change the **nameservers** to the ones Netlify gives you.
Everything else is handled for you, including the certificate.

**Option B — keep GoDaddy's DNS**
Add the records Netlify showed you in step 3. This is normally:

| Type  | Name | Value                        |
| ----- | ---- | ---------------------------- |
| A     | `@`  | the IP Netlify gives you     |
| CNAME | `www`| `your-site.netlify.app`      |

### 5. Wait

Usually live within 10–30 minutes, occasionally a few hours. Netlify issues
a free HTTPS certificate automatically once DNS resolves — **don't buy an
SSL certificate from GoDaddy**, you don't need one.

If it hasn't worked after a few hours, check Netlify's Domain management
page; it tells you which record is wrong.

---

## Adding cheeses

Everything lives in `src/data/cheeses.js`. Copy any entry and change it:

```js
{
  name: "Wensleydale",
  aka: ["yorkshire wensleydale"],   // other names people might type
  family: "Hard pressed",
  origin: "Yorkshire, England",
  milk: "Cow",
  wine: "Off-dry Riesling",
  style: "Germany · off-dry white",
  color: "#E3C053",                 // the wine's colour — it fills the glass
  rule: "Sweet against salt",
  why: "One or two sentences.",
  also: [["Wine", "one short line"], ["Wine", "one short line"]],
  avoid: ["Wine or style", "one short line on why it fails"],
},
```

`aka` is what makes search forgiving — accents and capitals are handled for
you, so `comte` finds `Comté`.

If someone searches for a cheese that isn't listed, `src/data/families.js`
catches it by family keyword ("blue", "washed rind", "goat") and gives the
family-level pairing instead. Nothing ever dead-ends.

---

## What's in here

```
index.html              page shell, meta tags, icons
src/main.jsx            React entry point
src/App.jsx             the whole interface
src/styles.css          all styling
src/data/cheeses.js     the 90 pairings
src/data/families.js    fallback pairings by cheese family
src/lib/search.js       accent-insensitive matching
public/                 icons and web app manifest
netlify.toml            Netlify build settings
vercel.json             Vercel build settings
```

---

## The pairing logic

Four principles do most of the work, drawn from Decanter, Wine Enthusiast,
Wine Spectator and French fromagerie guides:

1. **White before red.** Tannin collides with the fat and protein in cheese
   and turns metallic. Reds are for hard aged styles only.
2. **Acid cuts fat.** The richer the paste, the brighter the wine. Bubbles
   do the same job, which is why sparkling is the safest single bottle.
3. **Grows together, goes together.** Sancerre with Loire chèvre, Vin Jaune
   with Comté, Lambrusco with Parmigiano.
4. **Sweet against salt.** Blues want sugar, not tannin — Sauternes with
   Roquefort, Port with Stilton.

---

## Installing it on a phone

The manifest and icons are already set up. Once it's on your domain, open it
in Safari or Chrome and choose **Add to Home Screen**. It gets an icon and
opens without browser chrome, like an app.
