# Astro Migration Guide for hiro-equipment.com

## Session Summary

### Key Decisions Made

#### 1. Framework Choice: Astro (SSG Mode)
- **Why**: Perfect for content-heavy sites with minimal interactivity
- **Benefits**: 
  - 99% smaller bundles than Angular (2KB vs 200KB)
  - Islands architecture (JS only where needed)
  - Perfect SEO (static HTML)
  - Fast builds (~30s for 103 reviews)
  - Framework-agnostic (use web components + Svelte islands)

#### 2. Your Tech Stack
```
Frontend: Astro
├── Static pages: .astro files (zero JS)
├── Complex interactivity: Svelte islands (filters, forms)
├── UI components: nuke-design-system (web components)
└── Styling: Your design system

Backend: nuke-cms (PocketBase clone)
├── Headless CMS with relations
├── REST API
└── Webhooks for build triggers

Tooling: Bun or pnpm
```

#### 3. Content Workflow (SSG with CMS)
```
1. Create review in nuke-cms
2. Click "Publish"
3. Webhook triggers Netlify/Vercel build
4. Astro fetches all reviews from CMS (server-side during build)
5. Generates static HTML for each review (/reviews/slug/index.html)
6. Deploys to CDN
7. Live in 30-60 seconds
```

#### 4. Key Concepts Learned

**Islands Architecture:**
- Most of your site = pure HTML (0KB JS)
- Interactive parts = "islands" with JS (filters, toggles)
- Control when islands load: `client:load`, `client:visible`, `client:idle`

**Meta-Framework:**
- Astro is a standalone framework (not built on React/Vue)
- Built on Vite (build tool)
- Can optionally use any UI framework as islands

**Dynamic Routes with SSG:**
- At build time, Astro fetches all content from CMS
- Generates static HTML file for each item
- No server needed in production
- Rebuild on content changes (via webhook)

**Component Syntax:**
- Single curly braces: `{title}` (not `{{title}}` like Angular)
- Frontmatter for logic: `---` JavaScript here `---`
- Just HTML + JS, no special directives

---

## Proof of Concept: Migrating hiro-equipment.com

### Phase 1: Initial Setup (30 minutes)

#### 1.1 Create New Astro Project
```bash
# Using Bun (or npm/pnpm)
bun create astro@latest hiro-equipment-astro

# Choose:
# - Empty template
# - TypeScript: Yes (strict)
# - Install dependencies: Yes
# - Git repository: No (you'll migrate existing repo)

cd hiro-equipment-astro
```

#### 1.2 Add Integrations
```bash
# Add Svelte for interactive islands
bunx astro add svelte

# If using Tailwind
bunx astro add tailwind

# For Node.js SSR (if needed for fahrrad-hoss later)
bunx astro add node
```

#### 1.3 Project Structure
```
src/
├── components/          # Reusable Astro components
│   ├── Header.astro
│   ├── Footer.astro
│   └── RelatedReviews.astro
├── islands/            # Interactive Svelte components
│   ├── ReviewFilter.svelte
│   └── NewsletterSignup.svelte
├── layouts/            # Page layouts
│   └── BaseLayout.astro
├── pages/              # File-based routing
│   ├── index.astro
│   ├── about.astro
│   └── reviews/
│       ├── index.astro        # /reviews
│       └── [slug].astro       # /reviews/osprey-backpack
├── styles/             # Global styles
│   └── global.css
└── lib/                # Utilities
    └── api.ts          # CMS API client
```

---

### Phase 2: Core Setup (1 hour)

#### 2.1 Configure Astro

**`astro.config.mjs`**
```js
import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  output: 'static', // SSG mode for hiro-equipment
  integrations: [svelte(), tailwind()],
  site: 'https://hiro-equipment.com',
  
  // Optional: Image optimization
  image: {
    domains: ['your-cms-domain.com'],
  }
});
```

#### 2.2 Create API Client

**`src/lib/api.ts`**
```typescript
// Adjust based on your nuke-cms API
const API_BASE = import.meta.env.PUBLIC_CMS_URL || 'https://cms.hiro-equipment.com';

export interface Review {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  rating: number;
  price?: number;
  category: string;
  brand: string;
  tags: string[];
  metaDescription: string;
  metaKeywords?: string;
  publishedAt: string;
}

export async function getAllReviews(): Promise<Review[]> {
  const response = await fetch(`${API_BASE}/api/reviews?expand=category,brand,tags`);
  if (!response.ok) throw new Error('Failed to fetch reviews');
  return response.json();
}

export async function getReviewBySlug(slug: string): Promise<Review> {
  const response = await fetch(`${API_BASE}/api/reviews/${slug}?expand=category,brand,tags`);
  if (!response.ok) throw new Error('Failed to fetch review');
  return response.json();
}

export async function getRelatedReviews(reviewId: string, category: string, limit = 3): Promise<Review[]> {
  const response = await fetch(
    `${API_BASE}/api/reviews?category=${category}&exclude=${reviewId}&limit=${limit}`
  );
  if (!response.ok) throw new Error('Failed to fetch related reviews');
  return response.json();
}
```

**`.env`**
```env
PUBLIC_CMS_URL=https://cms.hiro-equipment.com
```

#### 2.3 Base Layout

**`src/layouts/BaseLayout.astro`**
```astro
---
// Import your nuke-design-system web components
import '@yourorg/nuke-design-system';

interface Props {
  title: string;
  description?: string;
  keywords?: string;
  image?: string;
}

const { 
  title, 
  description = 'Comprehensive gear reviews for EDC and outdoor enthusiasts',
  keywords,
  image = '/images/og-default.jpg'
} = Astro.props;

const canonicalURL = new URL(Astro.url.pathname, Astro.site);
---

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="generator" content={Astro.generator} />
    
    <!-- SEO -->
    <title>{title} | Hiro Equipment</title>
    <meta name="description" content={description} />
    {keywords && <meta name="keywords" content={keywords} />}
    <link rel="canonical" href={canonicalURL} />
    
    <!-- Open Graph -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content={canonicalURL} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={new URL(image, Astro.site)} />
    
    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={new URL(image, Astro.site)} />
    
    <!-- Your global styles -->
    <link rel="stylesheet" href="/styles/global.css" />
  </head>
  <body>
    <Header />
    
    <main>
      <slot />
    </main>
    
    <Footer />
  </body>
</html>
```

#### 2.4 Header Component

**`src/components/Header.astro`**
```astro
---
// Static header - no JS needed
---

<header class="site-header">
  <nav>
    <a href="/" class="logo">
      <img src="/images/logo.svg" alt="Hiro Equipment" />
    </a>
    
    <ul class="nav-links">
      <li><a href="/">Home</a></li>
      <li><a href="/reviews">Reviews</a></li>
      <li><a href="/categories">Categories</a></li>
      <li><a href="/about">About</a></li>
    </ul>
    
    <!-- Using your web component toggle for dark mode -->
    <nuke-toggle id="dark-mode" label="Dark Mode"></nuke-toggle>
  </nav>
</header>

<script>
  // Client-side JS for dark mode toggle
  const toggle = document.getElementById('dark-mode');
  
  // Check saved preference
  const isDark = localStorage.getItem('dark-mode') === 'true';
  if (isDark) {
    document.body.classList.add('dark');
    toggle?.setAttribute('checked', '');
  }
  
  toggle?.addEventListener('toggle-change', (e) => {
    const { checked } = e.detail;
    document.body.classList.toggle('dark', checked);
    localStorage.setItem('dark-mode', checked.toString());
  });
</script>

<style>
  .site-header {
    /* Your styles */
  }
</style>
```

#### 2.5 Footer Component

**`src/components/Footer.astro`**
```astro
---
const currentYear = new Date().getFullYear();
---

<footer class="site-footer">
  <div class="footer-content">
    <p>&copy; {currentYear} Hiro Equipment. All rights reserved.</p>
    <nav>
      <a href="/privacy">Privacy</a>
      <a href="/terms">Terms</a>
      <a href="/contact">Contact</a>
    </nav>
  </div>
</footer>

<style>
  .site-footer {
    /* Your styles */
  }
</style>
```

---

### Phase 3: Pages (2 hours)

#### 3.1 Homepage

**`src/pages/index.astro`**
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import { getAllReviews } from '../lib/api';

// Fetch featured reviews at build time
const allReviews = await getAllReviews();
const featuredReviews = allReviews
  .sort((a, b) => b.rating - a.rating)
  .slice(0, 6);
---

<BaseLayout title="Home" description="Comprehensive gear reviews for EDC and outdoor enthusiasts">
  <section class="hero">
    <h1>Honest Gear Reviews</h1>
    <p>Over 100 in-depth reviews for outdoor and EDC enthusiasts</p>
    <a href="/reviews" class="cta-button">Browse Reviews</a>
  </section>
  
  <section class="featured-reviews">
    <h2>Featured Reviews</h2>
    <div class="reviews-grid">
      {featuredReviews.map(review => (
        <a href={`/reviews/${review.slug}`} class="review-card">
          <img src={review.featuredImage} alt={review.title} />
          <h3>{review.title}</h3>
          <div class="rating">★ {review.rating}/5</div>
          <p>{review.excerpt}</p>
        </a>
      ))}
    </div>
  </section>
</BaseLayout>

<style>
  /* Your styles */
</style>
```

#### 3.2 Reviews Overview (with Filter)

**`src/pages/reviews/index.astro`**
```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import ReviewFilter from '../../islands/ReviewFilter.svelte';
import { getAllReviews } from '../../lib/api';

// Fetch all reviews at build time
const reviews = await getAllReviews();

// Get unique categories for filter
const categories = [...new Set(reviews.map(r => r.category))];
---

<BaseLayout 
  title="All Reviews" 
  description="Browse our complete collection of gear reviews"
>
  <h1>All Reviews ({reviews.length})</h1>
  
  <!-- Svelte island for interactive filtering -->
  <ReviewFilter 
    reviews={reviews} 
    categories={categories}
    client:load 
  />
</BaseLayout>
```

#### 3.3 Review Filter (Svelte Island)

**`src/islands/ReviewFilter.svelte`**
```svelte
<script lang="ts">
  export let reviews = [];
  export let categories = [];
  
  let search = '';
  let selectedCategory = 'all';
  let sortBy = 'rating';
  
  // Reactive filtering and sorting
  $: filteredReviews = reviews
    .filter(review => {
      const matchesSearch = review.title.toLowerCase().includes(search.toLowerCase()) ||
                           review.excerpt.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || review.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'date') return new Date(b.publishedAt) - new Date(a.publishedAt);
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      return 0;
    });
</script>

<div class="filter-controls">
  <input 
    type="text" 
    bind:value={search} 
    placeholder="Search reviews..."
    class="search-input"
  />
  
  <select bind:value={selectedCategory} class="category-select">
    <option value="all">All Categories</option>
    {#each categories as category}
      <option value={category}>{category}</option>
    {/each}
  </select>
  
  <div class="sort-buttons">
    <button 
      class:active={sortBy === 'rating'}
      on:click={() => sortBy = 'rating'}
    >
      Rating
    </button>
    <button 
      class:active={sortBy === 'date'}
      on:click={() => sortBy = 'date'}
    >
      Newest
    </button>
    <button 
      class:active={sortBy === 'title'}
      on:click={() => sortBy = 'title'}
    >
      A-Z
    </button>
  </div>
</div>

<div class="results-info">
  Showing {filteredReviews.length} of {reviews.length} reviews
</div>

<div class="reviews-grid">
  {#each filteredReviews as review}
    <a href={`/reviews/${review.slug}`} class="review-card">
      <img src={review.featuredImage} alt={review.title} loading="lazy" />
      <h3>{review.title}</h3>
      <div class="meta">
        <span class="rating">★ {review.rating}/5</span>
        <span class="category">{review.category}</span>
      </div>
      <p>{review.excerpt}</p>
    </a>
  {/each}
</div>

{#if filteredReviews.length === 0}
  <div class="no-results">
    <p>No reviews found matching your criteria.</p>
  </div>
{/if}

<style>
  .filter-controls {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
  }
  
  .search-input {
    flex: 1;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  .sort-buttons button {
    padding: 0.5rem 1rem;
    border: 1px solid #ddd;
    background: white;
    cursor: pointer;
  }
  
  .sort-buttons button.active {
    background: #007bff;
    color: white;
  }
  
  .reviews-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
  }
  
  /* Add your styles */
</style>
```

#### 3.4 Review Detail Page (Dynamic Route)

**`src/pages/reviews/[slug].astro`**
```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import RelatedReviews from '../../components/RelatedReviews.astro';
import { getAllReviews, getReviewBySlug } from '../../lib/api';

// Generate static paths for all reviews at build time
export async function getStaticPaths() {
  const reviews = await getAllReviews();
  
  return reviews.map(review => ({
    params: { slug: review.slug },
    props: { review }
  }));
}

const { review } = Astro.props;

// Build meta description from review fields
const metaDescription = review.metaDescription || 
  `${review.category} review: ${review.excerpt.slice(0, 140)}...`;
---

<BaseLayout 
  title={review.title}
  description={metaDescription}
  keywords={review.metaKeywords || review.tags.join(', ')}
  image={review.featuredImage}
>
  <article class="review-detail">
    <header class="review-header">
      <h1>{review.title}</h1>
      
      <div class="review-meta">
        <span class="category">{review.category}</span>
        <span class="brand">{review.brand}</span>
        <span class="rating">★ {review.rating}/5</span>
        {review.price && <span class="price">${review.price}</span>}
        <time datetime={review.publishedAt}>
          {new Date(review.publishedAt).toLocaleDateString()}
        </time>
      </div>
      
      <div class="tags">
        {review.tags.map(tag => (
          <a href={`/tags/${tag}`} class="tag">{tag}</a>
        ))}
      </div>
    </header>
    
    <img 
      src={review.featuredImage} 
      alt={review.title}
      class="featured-image"
    />
    
    <div class="review-content" set:html={review.content} />
    
    <!-- Using your web component accordion for specs -->
    <nuke-accordion>
      <nuke-accordion-item title="Technical Specifications">
        <!-- Specs content -->
      </nuke-accordion-item>
      <nuke-accordion-item title="Pros & Cons">
        <!-- Pros/cons content -->
      </nuke-accordion-item>
    </nuke-accordion>
  </article>
  
  <!-- Related reviews component -->
  <RelatedReviews 
    currentReviewId={review.id}
    category={review.category}
  />
  
  <!-- Structured data for SEO -->
  <script type="application/ld+json" set:html={JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Review",
    "itemReviewed": {
      "@type": "Product",
      "name": review.title,
      "brand": review.brand,
      "image": review.featuredImage
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": review.rating,
      "bestRating": "5"
    },
    "author": {
      "@type": "Person",
      "name": "Kiki"
    },
    "datePublished": review.publishedAt
  })} />
</BaseLayout>

<style>
  .review-detail {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
  }
  
  .review-header {
    margin-bottom: 2rem;
  }
  
  .review-meta {
    display: flex;
    gap: 1rem;
    margin: 1rem 0;
    color: #666;
  }
  
  .featured-image {
    width: 100%;
    border-radius: 8px;
    margin-bottom: 2rem;
  }
  
  .review-content {
    line-height: 1.8;
  }
  
  /* Add your styles */
</style>
```

#### 3.5 Related Reviews Component

**`src/components/RelatedReviews.astro`**
```astro
---
import { getRelatedReviews } from '../lib/api';

interface Props {
  currentReviewId: string;
  category: string;
  limit?: number;
}

const { currentReviewId, category, limit = 3 } = Astro.props;

const relatedReviews = await getRelatedReviews(currentReviewId, category, limit);
---

{relatedReviews.length > 0 && (
  <aside class="related-reviews">
    <h2>You Might Also Like</h2>
    <div class="reviews-grid">
      {relatedReviews.map(review => (
        <a href={`/reviews/${review.slug}`} class="review-card">
          <img src={review.featuredImage} alt={review.title} loading="lazy" />
          <h3>{review.title}</h3>
          <span class="rating">★ {review.rating}/5</span>
        </a>
      ))}
    </div>
  </aside>
)}

<style>
  .related-reviews {
    margin-top: 4rem;
    padding-top: 2rem;
    border-top: 1px solid #eee;
  }
  
  .reviews-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-top: 1.5rem;
  }
  
  /* Add your styles */
</style>
```

---

### Phase 4: Deployment (30 minutes)

#### 4.1 Netlify Setup

**Create `netlify.toml`:**
```toml
[build]
  command = "bun run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "20"

[[redirects]]
  from = "/*"
  to = "/404.html"
  status = 404
```

**Deploy:**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

#### 4.2 Environment Variables

In Netlify dashboard:
```
Site Settings → Environment Variables
→ Add: PUBLIC_CMS_URL = https://cms.hiro-equipment.com
```

#### 4.3 Build Hook for CMS Webhook

```
Site Settings → Build & Deploy → Build Hooks
→ Create "CMS Content Update"
→ Copy URL: https://api.netlify.com/build_hooks/xxxxx
```

Add this URL to your nuke-cms webhook configuration.

---

### Phase 5: CMS Webhook Integration

#### In Your nuke-cms

**Add webhook trigger when content publishes:**

```javascript
// Example: PocketBase-style hook
pb.collection('reviews').on('afterCreate', (e) => {
  triggerBuild();
});

pb.collection('reviews').on('afterUpdate', (e) => {
  triggerBuild();
});

function triggerBuild() {
  fetch(process.env.NETLIFY_BUILD_HOOK, {
    method: 'POST'
  });
}
```

---

## Migration Checklist

### Before Migration
- [ ] Backup current Angular site
- [ ] Export all content from current CMS
- [ ] Document current routes and redirects
- [ ] Test nuke-cms API endpoints
- [ ] List all integrations (analytics, etc.)

### During PoC
- [ ] Set up Astro project
- [ ] Create base layout with header/footer
- [ ] Build homepage
- [ ] Build reviews overview with filter
- [ ] Build single review page template
- [ ] Test with 5-10 reviews
- [ ] Verify web components work
- [ ] Test Svelte islands
- [ ] Check SEO meta tags

### Before Going Live
- [ ] Migrate all 103 reviews
- [ ] Set up 301 redirects (if URLs change)
- [ ] Configure webhook in nuke-cms
- [ ] Test build process end-to-end
- [ ] Performance audit (Lighthouse)
- [ ] Test on mobile devices
- [ ] Set up monitoring/analytics
- [ ] Create 404 page
- [ ] Update DNS when ready

---

## Testing the PoC

### Local Development
```bash
bun run dev
# Visit http://localhost:4321
```

### Build Test
```bash
bun run build
bun run preview
# Verify build output in dist/
```

### Check Build Output
```bash
ls -la dist/reviews/
# Should see index.html for each review
```

---

## Performance Comparison

### Before (Angular)
- **Bundle size**: ~200KB (framework) + your code
- **Time to Interactive**: 2-4 seconds
- **Lighthouse Score**: 70-85
- **Build time**: ~2-3 minutes

### After (Astro)
- **Bundle size**: ~2KB (base) + ~8KB (filter island) = 10KB total
- **Time to Interactive**: 0.1-0.5 seconds
- **Lighthouse Score**: 95-100
- **Build time**: ~30 seconds for 103 pages

---

## Common Issues & Solutions

### Issue: Web Components not working
**Solution**: Ensure they're imported in layout or component:
```astro
---
import '@yourorg/nuke-design-system';
---
```

### Issue: Svelte island not hydrating
**Solution**: Check you added `client:load` directive:
```astro
<ReviewFilter reviews={reviews} client:load />
```

### Issue: CMS images not loading
**Solution**: Use full URLs or configure image domains in `astro.config.mjs`

### Issue: Build failing on fetch
**Solution**: Ensure CMS_URL is set in environment variables

---

## Next Steps After PoC

1. **If PoC is successful:**
   - Migrate all content
   - Set up production domain
   - Configure webhooks
   - Go live!

2. **Additional features to add:**
   - Search functionality (Algolia/Pagefind)
   - Newsletter signup
   - Comments (third-party service)
   - Image optimization
   - RSS feed

3. **For fahrrad-hoss.de:**
   - Same setup but use `output: 'server'` in config
   - Deploy to VPS/Railway/Render with Docker

---

## Resources

- **Astro Docs**: https://docs.astro.build
- **Svelte Tutorial**: https://svelte.dev/tutorial
- **Web Components**: https://lit.dev
- **Deployment**: https://docs.astro.build/en/guides/deploy/

---

## Questions to Ask Claude Code

When starting the migration, you can ask:

1. "Help me set up the initial Astro project with Svelte integration"
2. "Create the API client for fetching reviews from nuke-cms"
3. "Build the review filter Svelte component with search and category filtering"
4. "Set up dynamic routes for review pages with proper SEO"
5. "Configure Netlify deployment with build hooks"
6. "Integrate my nuke-design-system web components"
7. "Optimize images and add lazy loading"
8. "Set up proper TypeScript types for my CMS data"

---

## Final Thoughts

This migration will give you:
- ⚡ **10x faster** page loads
- 🎯 **Perfect SEO** (static HTML)
- 💰 **Free hosting** (Netlify/Vercel free tier)
- 🧹 **Cleaner codebase** (less boilerplate)
- 🔧 **More flexibility** (web components + Svelte)
- 📦 **Smaller bundles** (99% reduction)

The PoC should take about 4-6 hours to complete. If it works well, full migration is another 1-2 days.

Good luck! 🚀
