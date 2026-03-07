# 🚀 Vercel Deployment - Sangli & Kolhapur Dashboards

Both dashboards are deployed from the **same GitHub repo**, with different environment variables to switch regions.

---

## Quick Copy-Paste Environment Variables

### For Sangli Dashboard

Copy all of these into Vercel Environment Variables:

```
NEXT_PUBLIC_DEFAULT_REGION=sangli
NEXT_PUBLIC_SHEET_ID_SANGLI=1eey_a4t5EOL_nyEDau4FLvXomcnwgxWa5F3Rjd52OQg
NEXT_PUBLIC_SHEET_ID_KOLHAPUR=1i4Bp2AgJ7hPCJ6Zr6BL-hq6Puo85lgnGDHg9r6BozBo
GOOGLE_CREDENTIALS_TYPE=service_account
GOOGLE_CREDENTIALS_PROJECT_ID=wcm-dashboard
GOOGLE_CREDENTIALS_PRIVATE_KEY_ID=2042c1d33e4ee4e3918f40bcc5f033b6c0a2e3fd
GOOGLE_CREDENTIALS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCxfJSUEcTjY9fp\nsGMUo4hhK825JcYoGLMgp1oaSlgqlm+QAHCKfTdt1xee17GViMpWXtlErgNPeO4P\nGluaJU2ZwmhR0BftNcHdoicxJOpj23PmCZbYTFQi9UOpfEqZwEbPmBaK//sNPS2f\nxR3daj9z5LRsXi/FArniniR+0RUSloDgvEa1Zpg9kjcrktYXfHs/Y9nk5MtE1kCi\n03kDrVkNhdNoU4ekmVhtQ9MLShBsOTMVzLkZ6Jg/DtycqizbrFc+3//SFiW726q7\nxq/Zv+6mZl/TrLsRor1w1OzIXDk5VjG7vxJlitOfKK60nDfop2m92W29c/7g4cBP\ntdIiT4vBAgMBAAECggEABWGmUztn5MMh7ugWIPz4xVJIL90/pF1kKDdnlnt7L+Au\n0scIooWIbDarQZNlqYe9WgZ3M2T/tn9CrJRbUBGu4cLqWdMW625uI3oarE7jvBJe\nPoyhrvFyVAfR8BSG+7sMpDFToaeAS7CRFRKR3lhHdnKdSKauCRzh8pQvJBjTBdfo\nVY0PLzY+w2sBfrCOUACGGQfbxbe/aDTSdxLgOzXBu5hFeHjdB0JwRcmDH1xc4qca\nPnffrzjIY+fxbm2ZCE+HlG66ahpLHWpsqa0yLjZY50Q8XYioWDCa+UuhkwmOXGQj\nWF2Y02yAySYUlS89VwcQo5YmDVmoEiiIqS7OTbGeRwKBgQD0SPWY0ypOPj0dqAYL\n5xrxGqsenPm8kd6mYswnbMoAhnrehvNXVdUDWb78rXGG40I1ggZQylUFaje5WNK8\nVv90a7S5r4itBIrR76XWzMEdL9s85tkkQqm33YfcKPGNg9sAnWCzm4YHlkMyBgV1\nNkTeX4xp8g1J7glEFOEs/LK6hwKBgQC5/4zeQ3KRl+/JC+/PGlVW3+SShZmRkk4G\nqXIX2WRj6NZ8+MeqaSST6qsmhAvOV3Tlv04CFYQ9uiRud6QHNfOdjq5026SexYVS\nji3GbwGjOU4a5yEVbimo/1M9ZUIqoIiPUcD90L1vsea4Qgh2rYpOUlWDP0VJDP9q\nXycCLQExdwKBgGpkaEqyFWfUZYvIBTIj6jD9+28u0PnW0hDHUMEO+X93EoZeYhc0\nc7ys1qh35czop4pkYdnH9XWRSEm6LLYIcePDkQeaMr2gD9HVPPYrYSQUFrkUlZfc\nTMyeeDBjyKhot/YxlM9EugAN6qAbzT66bw4msSHnYPBE8tYq/dM5D6J7AoGBAJB6\nNBc2Nxlm9wipMAckgmOwGKHEC0zrY5aDKq/h2rxM0cdTi+0QLSyE3ZtWeME4aAJK\nfrLZudYk8EWqw4wiWXDqsxLsxkvaTDybWm1ILvJ2AfidzrIR12SBqEwJisMH3evN\n6mZ+LZhEjV5VVLOzC7rY87m2fQBIi2I6NVfYU5PzAoGAD0aXY8WGxyZJGth3SbiA\nWyeyI3nA+yJanPAVC/d85M+3DHkoM/wPjHYQg6fnINkxgBGac38Adc0HlpSy7pEz\nvkaVX7mITHLpNoAI2rqixwm5nd7N8Mb7fsqKgCQvBKkf0dKPVEJ2B43rHyErl2Lh\n5o1MGNDgIz3lmsXd+jFcHRc=\n-----END PRIVATE KEY-----\n"
GOOGLE_CREDENTIALS_CLIENT_EMAIL=streamlit-dashboard-bot@wcm-dashboard.iam.gserviceaccount.com
GOOGLE_CREDENTIALS_CLIENT_ID=110832137954218631607
GOOGLE_CREDENTIALS_AUTH_URI=https://accounts.google.com/o/oauth2/auth
GOOGLE_CREDENTIALS_TOKEN_URI=https://oauth2.googleapis.com/token
GOOGLE_CREDENTIALS_AUTH_PROVIDER_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
GOOGLE_CREDENTIALS_CLIENT_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/streamlit-dashboard-bot%40wcm-dashboard.iam.gserviceaccount.com
```

### For Kolhapur Dashboard

**Only change this one variable** (rest stays the same):

```
NEXT_PUBLIC_DEFAULT_REGION=kolhapur
```

All other environment variables are identical between the two projects.

---

## Step-by-Step Setup

### 1️⃣ Create Sangli Project

You're on Vercel Dashboard now. Follow these steps:

1. Click **"Add New..."** → **"Project"**
2. **Select your GitHub repository**: `Wildlife-Call-Management-Dashboard`
3. Configure settings:
   - **Project Name**: `wildlife-dashboard-sangli` (or whatever you prefer)
   - **Framework**: Next.js (auto-detected)
   - **Root Directory**: `next-dashboard`
4. Click **"Deploy"**
5. ⏳ Wait for build to finish
6. Go to **Settings** → **Environment Variables**
7. **Copy-paste ALL the variables** from the "For Sangli Dashboard" section above
8. Click **"Save"** - automatic redeploy will start

### 2️⃣ Create Kolhapur Project

1. Go back to **Vercel Dashboard**
2. Click **"Add New..."** → **"Project"**
3. **Select the SAME repository** again: `Wildlife-Call-Management-Dashboard`
4. Configure settings:
   - **Project Name**: `wildlife-dashboard-kolhapur`
   - **Framework**: Next.js
   - **Root Directory**: `next-dashboard`
5. Click **"Deploy"**
6. ⏳ Wait for build to finish
7. Go to **Settings** → **Environment Variables**
8. **Copy-paste all variables from Sangli**, but change `NEXT_PUBLIC_DEFAULT_REGION=kolhapur`
9. Click **"Save"** - automatic redeploy will start

---

## ✅ Verification

Once both deployments finish:

1. **Sangli Dashboard URL**: Open it -> Should show "Sangli" badge in title, display Sangli data
2. **Kolhapur Dashboard URL**: Open it -> Should show "Kolhapur" badge in title, display Kolhapur data
3. Both should load incident data from their respective Google Sheets
4. All statistics should display correctly with proper dates (DD/MM/YYYY format)

---

## 🔄 Why Same Repo?

- ✅ Single codebase to maintain
- ✅ Easy to deploy both regions simultaneously
- ✅ One GitHub repo, two live dashboards
- ✅ Only difference: environment variable for `NEXT_PUBLIC_DEFAULT_REGION`

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Build fails | Check that `next-dashboard/` folder has `package.json` and `next.config.ts` |
| Data not loading | Verify Google Sheets credentials are correct in environment variables |
| Wrong region showing | Check `NEXT_PUBLIC_DEFAULT_REGION` is set correctly (`sangli` or `kolhapur`) |
| Multiple deployments creating errors | Each project is independent - don't worry if one redeployment happens |
| Need to redeploy after changes | Use **Deployments** tab → click redeploy on a previous deployment |

---

Done! Both Sangli and Kolhapur dashboards are now live on Vercel from a single repository. 🎉
