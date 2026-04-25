# requirements.md

# Project Name
Sivakami Josiyam  
(Birth Chart + Good Time for Marriage Finder)

---

# 1. Project Overview

Build a Minimum Viable Product (MVP) web application focused on Tamil / Indian families that provides:

1. Birth Chart Generator (Jathagam / Horoscope)
2. Good Marriage Time Finder (Muhurtham Dates)

This product should be simple, fast, mobile-friendly, and monetizable.

---

# 2. Business Goal

Solve two common user needs:

- Generate accurate horoscope charts from birth details
- Find suitable marriage dates and timings quickly

Target users:

- Parents
- Marriage seekers
- Families
- Astrologers
- Wedding planners
- Tamil diaspora users

---

# 3. MVP Scope

## Core Modules

### Module A: Birth Chart Generator

Users enter:

- Full Name
- Gender (optional)
- Date of Birth
- Time of Birth
- Birth Place

System generates:

- Rasi Chart
- Lagna
- Nakshatra
- Moon Sign
- Sun Sign
- Navamsa Chart (optional in MVP Phase 2)
- Basic planetary positions
- PDF report

---

### Module B: Marriage Muhurtham Finder

Users enter:

- Bride Name
- Bride DOB / Star (optional)
- Groom Name
- Groom DOB / Star (optional)
- Preferred Month
- Preferred City
- Weekend Only (Yes/No)

System returns:

- Best marriage dates
- Auspicious timings
- Avoid Rahu Kalam
- Avoid Yamagandam
- Avoid Gulikai
- Weekend suggestions
- Downloadable PDF

---

# 4. Functional Requirements

## User Side

### Home Page

Must contain:

- Hero section
- Birth Chart CTA
- Marriage Date Finder CTA
- Tamil + English language switch
- Mobile responsive layout

---

### Birth Chart Form

Validation required:

- Date must be valid
- Time required
- Birth place required
- Prevent future date entries

---

### Birth Chart Result Page

Display:

- User details
- Horoscope summary
- Planet positions
- Chart image/grid
- Download PDF button
- Share via WhatsApp button

---

### Marriage Date Finder Form

Validation required:

- Preferred month required
- City required

Optional:

- Bride/Groom star or DOB

---

### Marriage Results Page

Display:

- Top 10 dates
- Exact auspicious time slots
- Notes on avoided timings
- Download PDF
- Share via WhatsApp

---

# 5. Admin Requirements

Admin panel should support:

- View users
- View paid orders
- Download reports
- Manage pricing
- Manage language content
- View analytics

---

# 6. Technical Requirements

## Frontend

- Next.js
- TypeScript
- Tailwind CSS
- Responsive design
- SEO friendly pages

## Backend

- Python FastAPI

## Astrology Engine

- pyswisseph

Use for:

- Planetary calculations
- Sunrise / Sunset
- Nakshatra
- Lagna
- Tithi
- Muhurtham calculations

## Database

PostgreSQL

## File Generation

- PDF reports using ReportLab or WeasyPrint

## Payments

- Razorpay

## Hosting

- Frontend: Vercel
- Backend: Render / Railway / AWS
- DB: Supabase / Neon / RDS

---

# 7. Non Functional Requirements

- Fast page load (<3 sec)
- Mobile first
- Secure payment flow
- Clean UI for elders also
- Scalable API architecture
- SEO optimized
- Tamil Unicode support

---

# 8. User Roles

## Guest User

- Use free tools
- View limited results

## Paid User

- Full reports
- PDF downloads
- Unlimited access

## Admin

- Dashboard access

---

# 9. Revenue Model

## Free Tier

- Basic birth chart summary
- Limited marriage dates

## Paid Tier

### ₹99

Detailed birth chart PDF

### ₹199

Marriage Muhurtham next 12 months

### ₹499

Premium astrologer verified report

---

# 10. API Requirements

## Public APIs

### POST /api/birth-chart

Input:

- name
- dob
- tob
- place

Returns:

- horoscope data

---

### POST /api/marriage-dates

Input:

- bride details
- groom details
- month
- city

Returns:

- top dates + timings

---

### POST /api/payment/create-order

Creates Razorpay order

---

### GET /api/report/:id

Returns PDF

---

# 11. Database Tables

## users

- id
- name
- email
- phone
- created_at

## birth_chart_requests

- id
- user_id
- payload
- result
- created_at

## marriage_requests

- id
- user_id
- payload
- result
- created_at

## payments

- id
- user_id
- amount
- status
- gateway_id

---

# 12. Localization

Support:

- English
- Tamil

Tamil examples:

- ஜாதகம் உருவாக்கு
- திருமண நாள் கண்டுபிடி
- நல்ல நேரம்

---

# 13. SEO Pages

Create pages for:

- Tamil Jathagam Online
- Marriage Muhurtham Dates 2026
- Free Horoscope Generator Tamil
- Nakshatra Matching Tamil

---

# 14. Security

- Input sanitization
- Rate limiting
- Payment webhook verification
- CAPTCHA for abuse prevention
- Secure env variables

---

# 15. MVP Timeline

## Week 1

- UI wireframe
- DB schema
- API setup

## Week 2

- Birth chart module

## Week 3

- Marriage date finder

## Week 4

- Payments + PDF + Launch

---

# 16. Future Features

- Horoscope matching
- Daily predictions
- Numerology
- Tamil calendar app
- Astrologer marketplace
- AI explanation of charts
- WhatsApp chatbot

---

# 17. Success Metrics

Month 1:

- 100 users
- 20 paid reports

Month 3:

- 1000 users
- 200 paid reports

Month 6:

- B2B astrologer subscriptions

---

# 18. Final Product Positioning

Do NOT market as generic astrology website.

Market as:

## Tamil Marriage Planning + Jathagam Tool

This creates stronger trust and conversion.

---