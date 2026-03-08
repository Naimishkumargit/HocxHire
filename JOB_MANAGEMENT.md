# Admin Job Management System

## Overview

Complete admin-only job management system with full CRUD operations, cascading deletes, and secure access control.

## Features

✅ **Create Jobs** - Only admins can create job listings  
✅ **Read/View Jobs** - Admins can view all their created jobs  
✅ **Update/Edit Jobs** - Admins can modify their own jobs  
✅ **Delete Jobs** - Admins can remove their jobs  
✅ **Cascading Delete** - When an admin user is deleted, all their jobs are automatically deleted  
✅ **Job Ownership** - Admins can only edit/delete their own jobs  
✅ **Job Management Dashboard** - View and manage all created jobs  
✅ **Secure Access Control** - Multiple layers of authentication and authorization  

## Architecture

### Database Models

**User Model** (`src/models/User.js`)
```javascript
{
  name: String,
  email: String,
  image: String,
  role: "user" | "admin",
  jobs: [ObjectId], // References to Job objects
  createdAt: Date
}
```

**Job Model** (`src/models/Job.js`)
```javascript
{
  title: String,
  description: String,
  summary: String,
  company: String,
  category: String,
  type: String,
  experience: String,
  email: String,
  skills: [String],
  budget: Number,
  location: String,
  featured: Boolean,
  owner: ObjectId, // Reference to User (admin who created it)
  draft: Boolean,
  createdAt: Date
}
```

### API Endpoints

#### POST /api/jobs
**Create a new job (Admin only)**
- Requires: Admin role
- Body: Job data (title, description, etc.)
- Returns: Created job object
- Sets `owner` field to current user's ID

#### GET /api/jobs
**Get all published jobs**
- Public endpoint
- Returns: All non-draft jobs
- Includes: owner info (populated)

#### GET /api/jobs/my-jobs
**Get current admin's jobs**
- Requires: Admin role
- Returns: All jobs created by current user
- Includes: Draft and published jobs

#### PATCH /api/jobs
**Update a job (Admin only)**
- Requires: Admin role + Job ownership
- Body: { jobId, ...updatedFields }
- Returns: Updated job object
- Security: Verifies user owns the job before allowing update

#### DELETE /api/jobs
**Delete a job (Admin only)**
- Requires: Admin role + Job ownership
- Body: { jobId }
- Returns: Success message
- Security: Verifies user owns the job before allowing delete

#### DELETE /api/admin/users/[userId]
**Delete user and cascade delete their jobs (Admin only)**
- Requires: Admin role
- Returns: Confirmation message
- Behavior: Deletes user AND all their created jobs

### Frontend Components

#### NavBar (`src/components/Navbar.tsx`)
- Shows "Manage Jobs" link in profile dropdown for admins
- Desktop and mobile versions
- Shows "Admin" badge for admin users

#### JobManagementActions (`src/components/JobManagementActions.tsx`)
- Reusable component for edit/delete buttons
- Checks admin role and job ownership
- Confirmation modal for deletes
- Only renders for admin + job owner

#### Manage Jobs Page (`src/app/admin/jobs/page.tsx`)
- Dashboard for admins to manage all their jobs
- Shows: Title, description, company, type, category, creation date
- Actions: Edit, Delete, Create New Job
- Displays job status (Draft, Featured)
- Empty state with CTA

#### Create Jobs Page (`src/app/create-jobs/page.tsx`)
- Form to create new jobs
- Added "Manage My Jobs" button for quick navigation
- Only accessible to admins on desktop

### Middleware (`middleware.ts`)

Protects routes:
- `/create-jobs/:path*` - Admins only, desktop only
- `/admin/:path*` - Admins only

Checks:
1. User authentication
2. Admin role verification
3. Mobile device detection (for /create-jobs)

## Security Features

### Multi-Layer Authorization

1. **API Level** - `verifyAdmin()` function checks:
   - Session exists
   - User email matches
   - User role is "admin"
   - Job ownership (for update/delete)

2. **Middleware Level** - Protects routes before they reach components:
   - Authentication check
   - Admin role verification
   - Mobile device blocking

3. **Component Level** - Client-side checks:
   - Session role verification
   - UI elements hidden for non-admins

### Job Ownership Verification

Users can only:
- Edit jobs they created
- Delete jobs they created
- See their own jobs in dashboard

### Cascading Deletes

When an admin is deleted:
1. All jobs with `owner` = deleted user's ID are deleted
2. No orphan job records remain
3. Implemented via `/api/admin/users/[userId]` DELETE endpoint

## User Workflows

### Creating a Job (Admin)

1. Admin navigates to `/create-jobs` (desktop only)
2. Middleware verifies: authenticated + admin + desktop
3. Fills out job form
4. Clicks "Post Job" or "Save as Draft"
5. API verifies admin role, saves job with `owner` field
6. Success message shown
7. Redirects to `/find-jobs`

### Managing Jobs (Admin)

1. Admin clicks "Manage Jobs" in profile dropdown (or `/admin/jobs`)
2. Page fetches all jobs from `/api/jobs/my-jobs`
3. Shows list of all jobs created by admin
4. For each job: displays info + Edit/Delete buttons
5. Can click Edit to modify job details (future enhancement)
6. Can click Delete with confirmation modal

### Deleting Admin User (Super Admin)

1. Super admin makes DELETE request to `/api/admin/users/[userId]`
2. Database automatically:
   - Finds all jobs with `owner = userId`
   - Deletes all those jobs
   - Deletes the user record
3. No orphan data remains

## Usage Examples

### Create Job (API)

```bash
curl -X POST http://localhost:3000/api/jobs \
  -H "Content-Type: application/json" \
  -B "Authorization: Bearer session_token" \
  -d '{
    "title": "Senior Developer",
    "description": "We are hiring...",
    "company": "Tech Corp",
    "category": "Software Development",
    "type": "Full-time",
    "draft": false
  }'
```

### Get My Jobs (API)

```bash
curl http://localhost:3000/api/jobs/my-jobs \
  -H "Authorization: Bearer session_token"
```

### Update Job (API)

```bash
curl -X PATCH http://localhost:3000/api/jobs \
  -H "Content-Type: application/json" \
  -d '{
    "jobId": "639a8c3d9f1a2e3c4b5d6e7f",
    "title": "Senior Developer (Updated)",
    "budget": 5000
  }'
```

### Delete Job (API)

```bash
curl -X DELETE http://localhost:3000/api/jobs \
  -H "Content-Type: application/json" \
  -d '{ "jobId": "639a8c3d9f1a2e3c4b5d6e7f" }'
```

## Error Handling

### 401 Unauthorized
- User not authenticated
- Missing session

### 403 Forbidden
- User is not an admin
- User doesn't own the job (for update/delete)

### 404 Not Found
- Job doesn't exist
- User doesn't exist

### 400 Bad Request
- Missing required fields
- Invalid job ID

## Testing Checklist

- [ ] Non-admin cannot see "Create Jobs" link
- [ ] Non-admin cannot access `/create-jobs` directly
- [ ] Non-admin cannot see "Manage Jobs" option
- [ ] Admin can see "Create Jobs" link (desktop only)
- [ ] Admin cannot see "Create Jobs" link (mobile)
- [ ] Admin cannot access `/create-jobs` on mobile
- [ ] Admin can create jobs
- [ ] Admin can view all their jobs on dashboard
- [ ] Admin can edit their own jobs
- [ ] Admin can delete their own jobs
- [ ] Admin cannot edit/delete other admin's jobs
- [ ] When admin is deleted, all their jobs are deleted
- [ ] Job ownership is correctly assigned

## File Structure

```
src/
├── app/
│   ├── api/
│   │   ├── jobs/
│   │   │   ├── route.ts (POST, GET, PATCH, DELETE)
│   │   │   └── my-jobs/
│   │   │       └── route.ts (GET)
│   │   └── admin/
│   │       └── users/
│   │           └── [userId]/
│   │               └── route.ts (DELETE)
│   ├── admin/
│   │   └── jobs/
│   │       └── page.tsx (Job management dashboard)
│   └── create-jobs/
│       └── page.tsx (Create job form)
├── components/
│   ├── Navbar.tsx (Updated with admin links)
│   └── JobManagementActions.tsx (Edit/Delete buttons)
├── lib/
│   └── adminUtils.ts (Helper functions)
└── models/
    ├── Job.js (Updated with owner field)
    └── User.js (Has role field)

middleware.ts (Route protection)
```

## Future Enhancements

1. **Edit Jobs Page** - `/admin/jobs/[jobId]/edit`
   - Pre-populate form with job data
   - Update functionality

2. **Job Statistics Dashboard**
   - Views count per job
   - Applications received
   - Performance metrics

3. **Bulk Operations**
   - Bulk delete jobs
   - Bulk change featured status

4. **Admin Dashboard**
   - User management interface
   - Job statistics
   - Analytics

5. **Role-Based Permissions**
   - Super Admin (manage all)
   - Editor (create/edit jobs)
   - Viewer (read-only)

6. **Audit Logging**
   - Track all admin actions
   - Timestamp all changes
   - User action history

## Troubleshooting

### Jobs not showing on dashboard
- Verify user is admin: `db.users.findOne({ email: "user@example.com" })`
- Check `role` field is `"admin"`, not `"role"`
- Ensure jobs have `owner` field populated

### Cannot delete jobs
- Verify job `owner` matches current user's `_id`
- Check user is actually admin in database
- Look for API errors in browser console

### Admin links not showing in navbar
- Sign out and back in to refresh session
- Check `role` field in session: Open DevTools > Application > Session
- Verify user's `role` is "admin" in database

### API returns 403 Forbidden
- Check authentication: User must be signed in
- Check role: User must have `role: "admin"`
- Check ownership: For update/delete, user must own the job

## Database Queries

### Find all jobs by admin
```javascript
db.jobs.find({ owner: ObjectId("user_id") })
```

### Find orphan jobs (without owner)
```javascript
db.jobs.find({ owner: { $exists: false } })
```

### Delete all jobs by user (manual)
```javascript
db.jobs.deleteMany({ owner: ObjectId("user_id") })
```

### Check user role
```javascript
db.users.findOne({ email: "user@example.com" }, { role: 1 })
```
