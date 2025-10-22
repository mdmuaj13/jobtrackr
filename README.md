# JobTrackr

A modern, full-stack job application tracking system built with Next.js, React, TypeScript, and MongoDB. Track your job applications, interviews, deadlines, and career progress all in one place.

## Features

### Core Functionality
- **Job Management** - Track job applications through multiple stages (saved, applied, interviewing, offered, rejected, accepted, withdrawn)
- **Activity Timeline** - Automatic activity logging with detailed history for each application
- **Calendar Integration** - Schedule and manage interviews, assessments, follow-ups, and deadlines
- **Company Management** - Maintain a database of companies with contact info, industry, and locations
- **Vendor Management** - Track recruiting agencies and third-party vendors
- **Dashboard Analytics** - Visualize your job search progress with charts and statistics

### Technical Features
- **Authentication** - Secure JWT-based authentication with bcrypt password hashing
- **Email Integration** - Resend integration for password reset emails with professional templates
- **Rate Limiting** - Built-in rate limiting on auth endpoints to prevent brute force attacks
- **Responsive Design** - Mobile-friendly interface with collapsible sidebar navigation
- **Real-time Validation** - Form validation with Zod schemas
- **Image Uploads** - Cloudinary integration for company logos and profile images
- **Soft Deletes** - Data recovery capability for all entities
- **Advanced Search** - Full-text search across jobs with multiple filters
- **Pagination** - Efficient data loading for large datasets

## Tech Stack

### Frontend
- **Framework**: Next.js 15.5.3 (App Router) + React 19.1.0
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI, Tabler Icons, Lucide React
- **State Management**: Zustand 5.0.8
- **Forms**: React Hook Form 7.63.0 + Zod 4.1.11
- **Data Fetching**: SWR 2.3.6
- **Charts**: Recharts 3.2.1
- **Calendar**: React Big Calendar 1.19.4
- **Notifications**: Sonner 2.0.7

### Backend
- **Runtime**: Node.js (Next.js API Routes)
- **Database**: MongoDB 6.20.0 + Mongoose 8.18.2
- **Authentication**: JWT (jsonwebtoken 9.0.2) + bcryptjs 3.0.2
- **Email Service**: Resend 6.2.2
- **File Upload**: Cloudinary 2.7.0
- **Validation**: Zod 4.1.11

### Development
- **Package Manager**: Bun
- **Linting**: ESLint 9
- **Type Checking**: TypeScript

## Getting Started

### Prerequisites
- Node.js 18+ or Bun
- MongoDB database (local or MongoDB Atlas)
- Cloudinary account (for image uploads)
- Resend account (for password reset emails) - [Sign up here](https://resend.com)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/jobtrackr.git
cd jobtrackr
```

2. Install dependencies:
```bash
bun install
# or
npm install
```

3. Set up environment variables:
```bash
cp example.env .env.local
```

Edit `.env.local` with your configuration:
```env
MONGODB_URI=mongodb+srv://your-connection-string
JWT_SECRET=your-super-secret-jwt-key-min-32-chars
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXTAUTH_URL=http://localhost:3000
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-secret
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_PATH=jobtrackr
CLOUDINARY_PUBLIC_URL=https://res.cloudinary.com/your-cloud-name/image/upload
RESEND_API_KEY=re_your_resend_api_key_here
RESEND_FROM_EMAIL=JobTrackr <noreply@yourdomain.com>
```

See [EMAIL_INTEGRATION.md](./EMAIL_INTEGRATION.md) for detailed email setup instructions.

4. Start the development server:
```bash
bun run dev
# or
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
bun run build
bun run start
```

## Project Structure

```
jobtrackr/
├── app/                      # Next.js App Router
│   ├── (auth)/              # Authentication routes (login, signup, etc.)
│   ├── app/                 # Protected application routes
│   │   ├── jobs/           # Job management pages
│   │   ├── companies/      # Company management
│   │   ├── vendors/        # Vendor management
│   │   ├── calendar/       # Calendar view
│   │   └── page.tsx        # Dashboard
│   └── api/                 # API Routes
│       ├── auth/           # Authentication endpoints
│       ├── jobs/           # Job CRUD operations
│       ├── activities/     # Activity tracking
│       ├── events/         # Calendar events
│       ├── companies/      # Company management
│       ├── vendors/        # Vendor management
│       ├── dashboard/      # Analytics & stats
│       └── upload/         # File uploads
│
├── components/              # React components
│   ├── ui/                 # Reusable UI components
│   ├── jobs/               # Job-related components
│   ├── activities/         # Activity timeline
│   ├── events/             # Event management
│   ├── companies/          # Company components
│   ├── vendors/            # Vendor components
│   ├── dashboard/          # Dashboard components
│   ├── auth/               # Auth forms
│   ├── auth-guard.tsx      # Protected route wrapper
│   └── app-sidebar.tsx     # Navigation sidebar
│
├── models/                  # Mongoose schemas
│   ├── User.ts             # User model
│   ├── Job.ts              # Job application model
│   ├── Activity.ts         # Activity log model
│   ├── Event.ts            # Calendar event model
│   ├── Company.ts          # Company model
│   └── Vendor.ts           # Vendor model
│
├── lib/                     # Utilities and configurations
│   ├── db.ts               # MongoDB connection
│   ├── jwt.ts              # JWT utilities
│   ├── auth.ts             # Auth middleware
│   ├── api.ts              # API client
│   ├── cloudinary.ts       # Cloudinary config
│   ├── validations/        # Zod schemas
│   └── helpers/            # Helper functions
│
├── hooks/                   # Custom React hooks
│   ├── jobs.ts             # Job operations
│   ├── companies.ts        # Company operations
│   ├── vendors.ts          # Vendor operations
│   ├── dashboard.ts        # Dashboard data
│   └── calendar.ts         # Calendar data
│
├── store/                   # Zustand state management
│   └── store.ts            # Auth store
│
└── types/                   # TypeScript types
    └── payload.ts          # API response types
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password with token
- `GET /api/auth/whoami` - Get current user

### Jobs
- `GET /api/jobs` - List jobs (with pagination, search, filters)
- `POST /api/jobs` - Create job
- `GET /api/jobs/[id]` - Get job details
- `PUT /api/jobs/[id]` - Update job
- `DELETE /api/jobs/[id]` - Delete job
- `POST /api/jobs/[id]/mark-applied` - Mark job as applied

### Activities
- `GET /api/activities` - List activities
- `POST /api/activities` - Create activity
- `GET /api/activities/[id]` - Get activity
- `PUT /api/activities/[id]` - Update activity
- `DELETE /api/activities/[id]` - Delete activity

### Events
- `GET /api/events` - List events
- `POST /api/events` - Create event
- `GET /api/events/[id]` - Get event
- `PUT /api/events/[id]` - Update event
- `DELETE /api/events/[id]` - Delete event

### Companies
- `GET /api/companies` - List companies
- `POST /api/companies` - Create company
- `GET /api/companies/[id]` - Get company
- `PUT /api/companies/[id]` - Update company
- `DELETE /api/companies/[id]` - Delete company

### Vendors
- `GET /api/vendors` - List vendors
- `POST /api/vendors` - Create vendor
- `GET /api/vendors/[id]` - Get vendor
- `PUT /api/vendors/[id]` - Update vendor
- `DELETE /api/vendors/[id]` - Delete vendor

### Dashboard
- `GET /api/dashboard/stats` - General statistics
- `GET /api/dashboard/job-stats` - Job-specific statistics

### Other
- `POST /api/upload` - Upload image to Cloudinary
- `GET /api/calendar/jobs` - Calendar view data

## Database Models

### User
- Email/password authentication
- Profile information
- Password reset tokens
- Soft delete support

### Job
- Job title, description, company
- Location, job type, work mode
- Salary range with currency
- Application status tracking
- Skills and requirements
- Deadlines and dates
- Notes and URLs

### Activity
- 16 activity types (saved, applied, interview_scheduled, etc.)
- Automatic logging on job creation/updates
- Manual activity creation
- Timeline view

### Event
- 6 event types (interview, submission, follow_up, assessment, offer_deadline, other)
- Date, time, duration
- Location and meeting links
- Contact information
- Reminder support
- Status tracking

### Company
- Company information
- Industry and location
- Contact details
- Logo URL

### Vendor
- Vendor/recruiter information
- Contact details
- Notes

## Features in Detail

### Job Tracking
- Track applications through 7 stages
- Filter by status, job type, work mode
- Search by title, company, location, description
- Set deadlines and application dates
- Add salary expectations
- Track skills and requirements
- Add notes and links

### Activity Timeline
- Automatically logs job creation
- Automatically logs status changes
- Manual activity creation
- View complete history per job
- 16 different activity types

### Calendar Management
- Schedule interviews and assessments
- Set follow-up reminders
- Track offer deadlines
- Link events to jobs
- Add meeting links and locations
- Contact person tracking

### Dashboard Analytics
- Total jobs overview
- Application status breakdown
- Job statistics visualization
- Recent jobs table
- Interactive charts

## Security Features

- JWT-based authentication with secure token generation
- Bcrypt password hashing (cost factor 12)
- Protected API routes with authentication middleware
- Rate limiting on authentication endpoints (prevents brute force attacks)
- Password reset with SHA-256 hashed tokens (1-hour expiration)
- Secure email delivery via Resend with professional templates
- File upload validation (type, size restrictions)
- User enumeration prevention on password reset
- Soft deletes for data recovery

See [RATE_LIMITING.md](./RATE_LIMITING.md) for rate limiting details.

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support, please open an issue in the GitHub repository.

## Roadmap

### Planned Features
- [ ] Email notifications for job deadlines and interview reminders
- [ ] Welcome emails and email verification on signup
- [ ] Export jobs to CSV/PDF
- [ ] Integration with LinkedIn, Indeed
- [ ] Resume matching with AI
- [ ] Mobile application
- [ ] Multi-user support with teams
- [ ] Advanced analytics and insights
- [ ] Document management
- [ ] Interview preparation tools
- [ ] Salary negotiation tracker

### Known Issues
- No automated tests (coming soon)
- Email templates need testing across all email clients

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [Radix UI](https://www.radix-ui.com/)
- Icons from [Tabler Icons](https://tabler-icons.io/) and [Lucide](https://lucide.dev/)
- Charts powered by [Recharts](https://recharts.org/)
