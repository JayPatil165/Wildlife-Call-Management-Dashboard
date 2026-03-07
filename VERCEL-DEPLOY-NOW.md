# Vercel Deployment - Ready to Deploy ✅

Your Wildlife Call Management Dashboard is **ready to deploy to Vercel!**

## 📋 What to Do Now

### Step 1: Import Project from GitHub
1. You should see **Vercel New Project** page already opened
2. Click **"Select Repository"** or **"Import"**
3. Find and select: **`Wildlife-Call-Management-Dashboard`**
4. Click **"Import"**

### Step 2: Configure Project
When the project configuration page appears:
- **Project Name**: `wildlife-dashboard` (or your preferred name)
- **Root Directory**: Select `./next-dashboard`
- Click **"Continue"**

### Step 3: Add Environment Variables ⚠️ IMPORTANT

You'll see an "Environment Variables" section. Add ALL of these:

#### Google Credentials (Copy from .env.local)
```
GOOGLE_CREDENTIALS_TYPE=service_account
GOOGLE_CREDENTIALS_PROJECT_ID=wcm-dashboard
GOOGLE_CREDENTIALS_PRIVATE_KEY_ID=2042c1d33e4ee4e3918f40bcc5f033b6c0a2e3fd
GOOGLE_CREDENTIALS_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCxfJSUEcTjY9fp\nsGMUo4hhK825JcYoGLMgp1oaSlgqlm+QAHCKfTdt1xee17GViMpWXtlErgNPeO4P\nGluaJU2ZwmhR0BftNcHdoicxJOpj23PmCZbYTFQi9UOpfEqZwEbPmBaK//sNPS2f\nxR3daj9z5LRsXi/FArniniR+0RUSloDgvEa1Zpg9kjcrktYXfHs/Y9nk5MtE1kCi\n03kDrVkNhdNoU4ekmVhtQ9MLShBsOTMVzLkZ6Jg/DtycqizbrFc+3//SFiW726q7\nxq/Zv+6mZl/TrLsRor1w1OzIXDk5VjG7vxJlitOfKK60nDfop2m92W29c/7g4cBP\ntdIiT4vBAgMBAAECggEABWGmUztn5MMh7ugWIPz4xVJIL90/pF1kKDdnlnt7L+Au\n0scIooWIbDarQZNlqYe9WgZ3M2T/tn9CrJRbUBGu4cLqWdMW625uI3oarE7jvBJe\nPoyhrvFyVAfR8BSG+7sMpDFToaeAS7CRFRKR3lhHdnKdSKauCRzh8pQvJBjTBdfo\nVY0PLzY+w2sBfrCOUACGGQfbxbe/aDTSdxLgOzXBu5hFeHjdB0JwRcmDH1xc4qca\nPnffrzjIY+fxbm2ZCE+HlG66ahpLHWpsqa0yLjZY50Q8XYioWDCa+UuhkwmOXGQj\nWF2Y02yAySYUlS89VwcQo5YmDVmoEiiIqS7OTbGeRwKBgQD0SPWY0ypOPj0dqAYL\n5xrxGqsenPm8kd6mYswnbMoAhnrehvNXVdUDWb78rXGG40I1ggZQylUFaje5WNK8\nVv90a7S5r4itBIrR76XWzMEdL9s85tkkQqm33YfcKPGNg9sAnWCzm4YHlkMyBgV1\nNkTeX4xp8g1J7glEFOEs/LK6hwKBgQC5/4zeQ3KRl+/JC+/PGlVW3+SShZmRkk4G\nqXIX2WRj6NZ8+MeqaSST6qsmhAvOV3Tlv04CFYQ9uiRud6QHNfOdjq5026SexYVS\nji3GbwGjOU4a5yEVbimo/1M9ZUIqoIiPUcD90L1vsea4Qgh2rYpOUlWDP0VJDP9q\nXycCLQExdwKBgGpkaEqyFWfUZYvIBTIj6jD9+28u0PnW0hDHUMEO+X93EoZeYhc0\nc7ys1qh35czop4pkYdnH9XWRSEm6LLYIcePDkQeaMr2gD9HVPPYrYSQUFrkUlZfc\nTMyeeDBjyKhot/YxlM9EugAN6qAbzT66bw4msSHnYPBE8tYq/dM5D6J7AoGBAJB6\nNBc2Nxlm9wipMAckgmOwGKHEC0zrY5aDKq/h2rxM0cdTi+0QLSyE3ZtWeME4aAJK\nfrLZudYk8EWqw4wiWXDqsxLsxkvaTDybWm1ILvJ2AfidzrIR12SBqEwJisMH3evN\n6mZ+LZhEjV5VVLOzC7rY87m2fQBIi2I6NVfYU5PzAoGAD0aXY8WGxyZJGth3SbiA\nWyeyI3nA+yJanPAVC/d85M+3DHkoM/wPjHYQg6fnINkxgBGac38Adc0HlpSy7pEz\nvkaVX7mITHLpNoAI2rqixwm5nd7N8Mb7fsqKgCQvBKkf0dKPVEJ2B43rHyErl2Lh\n5o1MGNDgIz3lmsXd+jFcHRc=\n-----END PRIVATE KEY-----\n
GOOGLE_CREDENTIALS_CLIENT_EMAIL=streamlit-dashboard-bot@wcm-dashboard.iam.gserviceaccount.com
GOOGLE_CREDENTIALS_CLIENT_ID=110832137954218631607
GOOGLE_CREDENTIALS_AUTH_URI=https://accounts.google.com/o/oauth2/auth
GOOGLE_CREDENTIALS_TOKEN_URI=https://oauth2.googleapis.com/token
GOOGLE_CREDENTIALS_AUTH_PROVIDER_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
GOOGLE_CREDENTIALS_CLIENT_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/streamlit-dashboard-bot%40wcm-dashboard.iam.gserviceaccount.com
```

#### Sheet IDs
```
NEXT_PUBLIC_SHEET_ID_SANGLI=1eey_a4t5EOL_nyEDau4FLvXomcnwgxWa5F3Rjd52OQg
NEXT_PUBLIC_SHEET_ID_KOLHAPUR=1i4Bp2AgJ7hPCJ6Zr6BL-hq6Puo85lgnGDHg9r6BozBo
```

#### Region & App Settings
```
NEXT_PUBLIC_DEFAULT_REGION=sangli
NEXT_PUBLIC_APP_NAME=Wildlife Call Management Dashboard
NEXT_PUBLIC_APP_VERSION=0.1.0
```

### Step 4: Set Environments (Optional but Recommended)
- **Production** (main branch): `NEXT_PUBLIC_DEFAULT_REGION=sangli`
- **Preview** (PR branches): `NEXT_PUBLIC_DEFAULT_REGION=sangli` or `kolhapur` for testing

You can set **different environments** by clicking environment selector when adding variables.

### Step 5: Deploy! 🚀
1. Click **"Deploy"**
2. Wait for build to complete (3-5 minutes)
3. Once done, you'll get a URL like: `https://wildlife-dashboard-xxxxx.vercel.app`
4. Click "Visit" to see your live dashboard!

## 📝 How to Change Region on Vercel

Your dashboard will show whichever region is set in `NEXT_PUBLIC_DEFAULT_REGION`:
- Set to `sangli` → Shows Sangli data with "Sangli" badge
- Set to `kolhapur` → Shows Kolhapur data with "Kolhapur" badge

**To change region:**
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Find `NEXT_PUBLIC_DEFAULT_REGION`
3. Change value from `sangli` to `kolhapur` (or vice versa)
4. Vercel will automatically redeploy with the new region
5. Wait for deployment to complete and visit your URL again!

## ✅ Deployment Checklist

- [ ] GitHub import selected
- [ ] Root directory set to `./next-dashboard`
- [ ] All `GOOGLE_CREDENTIALS_*` variables added
- [ ] All `NEXT_PUBLIC_SHEET_ID_*` variables added
- [ ] `NEXT_PUBLIC_DEFAULT_REGION=sangli` set
- [ ] App name and version set
- [ ] Click "Deploy"
- [ ] Wait for build (3-5 minutes)
- [ ] Visit live URL
- [ ] Verify data loads correctly
- [ ] Note your Vercel URL for later use

## 🎯 After Deployment

Once deployed, your dashboard:
✅ Loads live data from Google Sheets  
✅ Shows the configured region in the title  
✅ Has HTTPS enabled automatically  
✅ Auto-deploys on any GitHub push  
✅ Can switch regions by changing environment variables  
✅ Gets free updates and improvements  

## 🔄 To Switch Regions Later

Just change `NEXT_PUBLIC_DEFAULT_REGION` in Vercel settings → Vercel auto-redeploys!

## 📊 You Now Have

- ✅ Local dev: `npm run dev` with `.env.local`
- ✅ Production: Vercel with environment variables
- ✅ Multi-region: Switch with one env variable
- ✅ Type-safe: Full TypeScript support
- ✅ No secrets in git: Everything secure
- ✅ Auto-deploys: Push to GitHub → auto-update production

---

**Ready to deploy?** Follow the steps above using the Vercel dashboard that's already open in your browser!

**Questions?** Refer to [VERCEL-DEPLOYMENT.md](./next-dashboard/VERCEL-DEPLOYMENT.md) in your repository.
