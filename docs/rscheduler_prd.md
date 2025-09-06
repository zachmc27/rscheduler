# RScheduler - Product Requirements Document

## Product Overview

**Product Name:** RScheduler (Restaurant Schedule Maker)

**One-Sentence Description:** A web-based restaurant scheduling tool that automatically generates employee schedules based on restaurant needs, employee availability, and approved requests - eliminating the tedious spreadsheet process.

## Target Audience

Restaurant managers at all levels (small local to big chains) who currently spend entire weeks creating schedules manually in spreadsheets, only publishing them days before the new week starts.

## Problem Statement

**Core Problems Solved:**
- Eliminates tedious spreadsheet-based scheduling
- Balances employee needs with proper restaurant staffing through automated generation

## User Journey & Flow

1. Manager creates account and logs in
2. Sets up restaurant configuration (roles, operating hours, staffing needs)
3. Adds team members with availability and employment status
4. Reviews/approves employee time-off requests
5. Clicks "Generate" to auto-create schedule based on all constraints
6. Reviews and exports schedule to Google Sheets
7. Repeats weekly with minimal setup time

## Core Features

### Dashboard
- 7shifts-inspired schedule table with week navigation
- Restaurant name display with edit functionality
- Week view arrows for navigation
- Convert to Google Sheets button with email export
- Schedule table showing days at top, employee names on side
- Entry types: shift times, PTO, OFF

### Restaurant Configuration Panel (Slide-out Modal)
- Schedule start/end days configuration (Wednesday-Tuesday, Monday-Sunday, etc.)
- Roles management with add/edit functionality
- Operating hours for each day of the week
- Staffing requirements per day per role
- Shift wave options:
  - **Open:** Scheduled at start of operating hours
  - **Mid:** Scheduled 30% into operating hours (rounded to nearest hour)
  - **Closing:** Scheduled after 60% of operating hours (rounded to nearest hour)
- Employee request management with approve/deny functionality
- **Generate Button:** Auto-fills schedule table based on configurations

### Team Management Page
- Employee cards displaying: name, phone number, employment status (FT/PT)
- Click card to view modal with: email, weekly availability, submitted requests
- Manual request addition capability
- Employee removal with confirmation modal
- Add new employee functionality with form:
  - Name, employment status, weekly availability
  - Phone number, email address

### Settings Page
- **User Preferences:**
  - Light/Dark mode toggle
  - Change email, name, password
- **Team Settings:**
  - Preferred communication method (Phone/Email)
  - Disable email entry option

## Technical Requirements

### Tech Stack
- **Frontend:** React + Next.js (responsive web app)
- **Backend/Database:** Supabase (authentication + data storage)
- **Styling:** Tailwind CSS or similar
- **Email:** Built-in email service for exports
- **Algorithm:** Custom rule-based scheduling logic

### Platform
- Primary: Web application (desktop/laptop optimized)
- Secondary: Mobile-friendly responsive design

### Data Storage Requirements
- **User Accounts:** Manager credentials (name, email, password)
- **Restaurant Configuration:** Operating hours, roles, staffing requirements, schedule preferences
- **Employee Data:** Names, phone numbers, emails, employment status (FT/PT), weekly availability
- **Schedule Data:** Weekly schedules with shift assignments
- **Request Management:** PTO/time-off requests with approval status and reasons (500 word limit)

### Algorithm Specifications
- **Rule-based scheduling system** considering:
  - Employee availability (day/time constraints)
  - Employment status (full-time vs part-time)
  - Approved time-off requests
  - Restaurant staffing requirements per role per day
  - Shift wave preferences (open/mid/closing)

## Design Specifications

### Design Philosophy
- Clean, professional, dashboard-style interface
- Serious and efficient (trustworthy business tool feel)
- Familiar UI patterns (inspired by 7shifts scheduling interface)

### Color Palettes

**Light Mode:**
- **Primary:** Deep Blue (#1E2761, #00246B)
- **Secondary:** Light Blue (#89ABE3, #A7BEAE)
- **Accent:** Subtle Gold/Mustard (#FEE715, #E7D7A4)
- **Neutral:** Off-White/Light Gray (#F4F6F6, #D5DBDB)

**Dark Mode:**
- **Primary Background:** Soft Black/Dark Charcoal (#1A1A1A)
- **Primary UI:** Lighter Blue (#5C87B2)
- **Secondary UI:** Light Teal (#40B5AD)
- **Accent:** Vibrant Gold (#FFD700)
- **Text Color:** Off-White/Light Gray (#E0E0E0)

## Navigation Structure

### Top Navigation Bar
- Dashboard (main schedule view)
- Team (employee management)
- Settings (user preferences)

### Page Layouts
- **Dashboard:** Schedule table with left sidebar configuration panel
- **Team:** Card-based employee overview with modal details
- **Settings:** Form-based preference management

## User Authentication & Accounts

### MVP Scope
- Single manager per restaurant account
- Standard email/password authentication via Supabase
- Account creation with name, email, password

### Future Development
- Multi-manager access via email invitation system
- Manager confirmation and account linking workflow

## Export & Communication Features

### Current Scope
- Google Sheets export functionality
- Email delivery of exported schedules
- In-app request management system

### Future Development
- WhatsApp AI chatbot integration for employee request collection
- Automated approval/denial notifications via WhatsApp

## Success Metrics

### Key Performance Indicators
- **Time to Generate Schedule:** Target under 5 minutes (vs. current week-long process)
- **User Adoption:** Monthly active users and retention rates
- **Schedule Accuracy:** Meeting both employee availability and restaurant staffing needs
- **User Satisfaction:** Reduction in scheduling conflicts and employee complaints

## Development Priorities

### MVP Features (Phase 1)
- User authentication and account creation
- Restaurant configuration setup
- Employee management system
- Request approval workflow
- Auto-schedule generation algorithm
- Google Sheets export functionality

### Future Development (Phase 2+)
- Multi-manager access system
- WhatsApp chatbot integration
- Advanced analytics and reporting
- Mobile app development

## Technical Constraints

- **Budget:** Free-to-run initially (utilizing free tiers)
- **Hosting:** Leverage Supabase free tier for backend services
- **No Real-time Requirements:** No collaborative editing needed for MVP
- **No External Integrations:** No payroll or POS system connections required initially

## Acceptance Criteria

### Core Functionality
- [ ] Managers can create accounts and log in securely
- [ ] Restaurant configuration can be set up and saved
- [ ] Employee data can be added, edited, and stored with availability
- [ ] Time-off requests can be submitted, approved, and tracked
- [ ] Schedule generation produces conflict-free schedules meeting all constraints
- [ ] Generated schedules can be exported to Google Sheets and emailed
- [ ] Application is responsive and works on mobile devices
- [ ] Light/dark mode toggle functions properly

### User Experience
- [ ] Interface matches design specifications and color palettes
- [ ] Navigation between pages is intuitive and fast
- [ ] Schedule generation completes in under 30 seconds
- [ ] All forms include proper validation and error handling
- [ ] Application loads quickly and performs well under normal usage