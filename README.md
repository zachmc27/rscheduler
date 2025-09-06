# RScheduler - Restaurant Schedule Maker

A web-based restaurant scheduling tool that automatically generates employee schedules based on restaurant needs, employee availability, and approved requests.

## Features

- **Dashboard**: 7shifts-inspired schedule table with week navigation
- **Restaurant Configuration**: Operating hours, roles, and staffing requirements
- **Team Management**: Employee data with availability and request management
- **Auto-Schedule Generation**: Rule-based algorithm considering all constraints
- **Export Functionality**: Google Sheets integration with email delivery
- **Theme Support**: Light/dark mode toggle
- **Responsive Design**: Mobile-friendly interface

## Tech Stack

- **Frontend**: Next.js 14 with React 18
- **Backend**: Supabase (PostgreSQL + Auth)
- **Styling**: Tailwind CSS with custom design system
- **Forms**: React Hook Form with Zod validation
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **TypeScript**: Full type safety

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd restaurant_scheduler
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp env.template .env.local
```

4. Configure your Supabase project:
   - Create a new Supabase project
   - Copy your project URL and anon key to `.env.local`
   - Set up the database schema (see Database Setup below)

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Database Setup

The application requires the following Supabase tables:

- `users` - User accounts
- `restaurants` - Restaurant configurations
- `employees` - Employee data and availability
- `time_off_requests` - PTO requests
- `schedules` - Generated schedules

See `src/types/supabase.ts` for the complete schema definition.

## Project Structure

```
src/
├── app/                 # Next.js app router pages
├── components/         # React components
│   ├── ui/            # Reusable UI components
│   ├── auth/          # Authentication components
│   ├── dashboard/     # Dashboard-specific components
│   ├── team/          # Team management components
│   └── settings/      # Settings components
├── lib/               # Utility libraries
│   ├── supabase/     # Supabase client configuration
│   ├── utils/        # Helper functions
│   └── validations/  # Zod schemas
├── types/            # TypeScript type definitions
├── hooks/            # Custom React hooks
└── contexts/         # React contexts
```

## Development

### Code Formatting

The project uses Prettier for code formatting:

```bash
npm run format
```

### Type Checking

```bash
npm run type-check
```

### Linting

```bash
npm run lint
```

## Design System

The application uses a custom design system with:

- **Light Mode**: Deep blue primary (#1E2761), light blue secondary (#89ABE3)
- **Dark Mode**: Lighter blue primary (#5C87B2), teal secondary (#40B5AD)
- **Typography**: Inter font family, 16px base size
- **Border Radius**: 0.625rem (10px) for consistent rounded corners

See `docs/design_json.json` for complete design specifications.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
