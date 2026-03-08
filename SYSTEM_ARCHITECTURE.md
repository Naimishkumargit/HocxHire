# Admin Job Management System - Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        Client Side (React)                   │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  Navbar                    Create Jobs Page                  │
│  ├─ Profile Dropdown       ├─ Job Form                       │
│  │  ├─ Admin Link          ├─ Validation                     │
│  │  └─ Manage Jobs  ──────→├─ Submit Handler                 │
│  │                         └─ "Manage My Jobs" Link          │
│  │                                                            │
│  Job Management Dashboard  JobManagementActions              │
│  ├─ Jobs List              ├─ Edit Button                    │
│  ├─ Job Details            ├─ Delete Button                  │
│  ├─ Filter/Sort            └─ Confirmation Modal             │
│  └─ Create New Job Link                                      │
│                                                               │
└─────────────────────────────────────────────────────────────┘
                              ↓↓↓
        ┌──────────────────────────────────────────┐
        │    NextAuth Session Management            │
        │  ┌────────────────────────────────────┐  │
        │  │ session.user = {                   │  │
        │  │   id: user._id                     │  │
        │  │   email: user.email                │  │
        │  │   role: "admin" | "user"           │  │
        │  │   name: user.name                  │  │
        │  │ }                                  │  │
        │  └────────────────────────────────────┘  │
        └──────────────────────────────────────────┘
                              ↓↓↓
┌─────────────────────────────────────────────────────────────┐
│                   Middleware (Edge)                          │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  Route Protection:                                            │
│  ├─ /create-jobs/* → Verify admin + desktop                 │
│  ├─ /admin/* → Verify admin                                 │
│  └─ All others → Pass through                               │
│                                                               │
│  Actions:                                                    │
│  ├─ Authenticated? YES → Continue | NO → Redirect /login    │
│  ├─ Admin role? YES → Continue | NO → Redirect /            │
│  └─ Mobile on /create-jobs? YES → Redirect / | NO → Cont.  │
│                                                               │
└─────────────────────────────────────────────────────────────┘
                              ↓↓↓
┌─────────────────────────────────────────────────────────────┐
│                   API Routes (Server)                        │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  /api/jobs (Multi-method)                                   │
│  ├─ POST   → verifyAdmin() → Create job                     │
│  ├─ GET    → Fetch all public jobs                          │
│  ├─ PATCH  → verifyAdmin() + ownership → Update job         │
│  └─ DELETE → verifyAdmin() + ownership → Delete job         │
│                                                               │
│  /api/jobs/my-jobs                                          │
│  └─ GET    → verifyAdmin() → Get user's jobs               │
│                                                               │
│  /api/admin/users/[userId]                                  │
│  └─ DELETE → verifyAdmin() → Delete user + cascade          │
│                                                               │
│  verifyAdmin() Function:                                    │
│  1. Get session from NextAuth                              │
│  2. Find user in database                                  │
│  3. Check role === "admin"                                 │
│  4. Return { isAdmin, user, error }                        │
│                                                               │
└─────────────────────────────────────────────────────────────┘
                              ↓↓↓
┌─────────────────────────────────────────────────────────────┐
│                  MongoDB Database                           │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  Users Collection                                            │
│  ┌────────────────────────────────┐                         │
│  │ {                              │                         │
│  │   _id: ObjectId                │                         │
│  │   email: "admin@example.com"   │                         │
│  │   name: "John Admin"           │                         │
│  │   role: "admin"           ──┐  │                         │
│  │   jobs: [job_id_1, ...]   ↓ │  │                         │
│  │ }                          │ │  │                         │
│  └────────────────────────────┼──┘  │                         │
│                               │     │                         │
│  Jobs Collection              │     │                         │
│  ┌────────────────────────────┼──┐  │                         │
│  │ {                          │  │  │                         │
│  │   _id: job_id_1           │  │  │                         │
│  │   title: "Dev Job"        │  │  │                         │
│  │   description: "..."      │  │  │                         │
│  │   owner: ─────────────────┘  │  │                         │
│  │   company: "Tech Corp"       │  │                         │
│  │   ...                        │  │                         │
│  │ }                            │  │                         │
│  └────────────────────────────┘  │                         │
│                                   │                         │
│  Indexes:                         │                         │
│  - users: { email: 1 }           │                         │
│  - jobs: { owner: 1 }     ←──────┘                         │
│  - jobs: { createdAt: -1 }                                 │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow Diagrams

### Creating a Job (Admin)

```
Admin User
    ↓
[Create Jobs Form]
    ↓ (fill fields)
[Submit Button]
    ↓
validateEmail()
validateBudget()
    ↓ (valid)
POST /api/jobs
    ↓
[Middleware]
├─ Is authenticated?
├─ Is admin?
└─ Not mobile?
    ↓ (all YES)
verifyAdmin()
    ↓
User.findOne({email})
    ↓
Is role === "admin"?
    ↓ (YES)
new Job({
  title, description, ...,
  owner: user._id          ← Set owner here
})
    ↓
job.save()
    ↓
User.findByIdAndUpdate()
  $push: { jobs: job._id }  ← Add to user's jobs
    ↓
revalidatePath()
    ↓
Return 201 + job
    ↓
Success message
→ Redirect /find-jobs
```

### Managing Jobs (Admin)

```
Admin User clicks "Manage Jobs"
    ↓
Route: /admin/jobs
    ↓
[Middleware]
├─ Is authenticated?
├─ Is admin?
    ↓ (both YES)
[ManageJobsPage loads]
    ↓
useEffect()
    ↓
GET /api/jobs/my-jobs
    ↓
verifyAdmin()
    ↓
Job.find({ owner: user._id })
    ↓
Return jobs array
    ↓
Display in Dashboard:
├─ Job title
├─ Company
├─ Status (draft/featured)
├─ [Edit] button
└─ [Delete] button
    ↓
If click [Delete]:
    ↓
[Confirmation Modal]
    ↓
DELETE /api/jobs
  body: { jobId }
    ↓
verifyAdmin()
    ↓
Job.findById(jobId)
    ↓
Check: job.owner === user._id?
    ↓ (YES)
Job.findByIdAndDelete()
    ↓
User.findByIdAndUpdate()
  $pull: { jobs: jobId }  ← Remove from user's jobs
    ↓
Return 200
    ↓
Job removed from list
```

### Cascading Delete (Delete Admin)

```
Super Admin makes request:
DELETE /api/admin/users/[userId]
    ↓
verifyAdmin()
    ↓
Is current user admin?
    ↓ (YES)
User.findById(userId)
    ↓
Get all jobs where owner = userId:
Job.deleteMany({ owner: userId })
    ↓
Delete all matching jobs
    ↓
User.findByIdAndDelete(userId)
    ↓
Delete the user
    ↓
Return 200 + confirmation
```

## Authorization Matrix

```
┌─────────────────┬────────────┬──────────────┬─────────────┐
│ Action          │ Visitor    │ User         │ Admin       │
├─────────────────┼────────────┼──────────────┼─────────────┤
│ View Jobs       │ ✅ Public  │ ✅ Public    │ ✅ Public   │
│ Create Job      │ ❌         │ ❌           │ ✅ Desktop  │
│ See My Jobs     │ ❌         │ ❌           │ ✅          │
│ Edit Own Job    │ ❌         │ ❌           │ ✅          │
│ Delete Own Job  │ ❌         │ ❌           │ ✅          │
│ Edit Other Job  │ ❌         │ ❌           │ ❌          │
│ Delete Other    │ ❌         │ ❌           │ ❌          │
│ Delete User     │ ❌         │ ❌           │ ✅ (Admin)  │
│ Access /admin   │ ❌         │ ❌           │ ✅          │
└─────────────────┴────────────┴──────────────┴─────────────┘
```

## Component Hierarchy

```
App
├── Navbar
│   ├── Logo
│   ├── Nav Links
│   │   ├── Home
│   │   ├── Find Jobs
│   │   ├── Create Jobs (admin + desktop only)
│   │   └── About Us
│   ├── Profile Dropdown (if logged in)
│   │   ├── User Name
│   │   ├── User Email
│   │   ├── "Admin" Badge (if admin)
│   │   ├── "Manage Jobs" Link (admin only)
│   │   ├── Settings
│   │   └── Sign Out
│   └── Mobile Menu
│       ├── Same nav links (no Create Jobs)
│       └── Same profile dropdown
│
├── Create Jobs Page
│   ├── Authorization Check
│   │   ├─ Is admin? → Show page : Redirect home
│   │   └─ Is mobile? → Redirect home : Show page
│   ├── "Manage My Jobs" Button
│   └── Job Form
│
├── Admin Jobs Dashboard
│   ├── Header + Stats
│   ├── "Create New Job" Button
│   ├── Jobs List
│   │   └── Job Card (for each job)
│   │       ├── Title
│   │       ├── Description
│   │       ├── Status badges
│   │       ├── Metadata (company, type, etc)
│   │       └── JobManagementActions
│   │           ├── Edit Button
│   │           └── Delete Button
│   │               └── Confirmation Modal
│   └── Empty State (if no jobs)
│
└── Find Jobs
    └── Job Cards (read-only for all users)
```

## Security Verification Points

```
Layer 1: Middleware
├─ Token exists? → Continue : Redirect /login
├─ User ID valid? → Continue : Redirect /login
├─ Admin role? → Continue : Redirect /
└─ (For /create-jobs) Mobile? → Redirect / : Continue

Layer 2: API Handler
├─ Get session
├─ Get user from DB
├─ Check role === "admin" → Continue : 403
└─ (For update/delete) Own job? → Continue : 403

Layer 3: Component
├─ Session has role? → Show controls : Hide
├─ Role === "admin"? → Show controls : Hide
└─ Own the job? → Show controls : Hide
```

## State Management

```
NextAuth Session:
  session {
    user {
      id: "user_object_id"
      email: "admin@example.com"
      name: "John Admin"
      image: "profile_url"
      role: "admin"           ← Critical for auth checks
    }
    expires: "2024-..."
  }

Component State (ManageJobsPage):
  - jobs: Job[]
  - loading: boolean
  - error: string | null

Component State (JobManagementActions):
  - showDeleteConfirm: boolean
  - isDeleting: boolean
```

## Error Handling Flow

```
User Action
    ↓
Try {
    API Call
    ↓
    Is authenticated?
    ├─ YES → Continue
    └─ NO → 401 Unauthorized
    ↓
    Is admin?
    ├─ YES → Continue
    └─ NO → 403 Forbidden
    ↓
    Own the resource?
    ├─ YES → Continue
    └─ NO → 403 Forbidden
    ↓
    Database Operation
    ├─ SUCCESS → 200/201 + data
    └─ FAILURE → 500 + error message
} Catch {
    console.error()
    Display error to user
    Return 500
}
```

---

This architecture ensures:
- ✅ Security through multi-layer verification
- ✅ Data integrity through ownership checks
- ✅ No orphan data through cascading deletes
- ✅ Good UX through responsive UI
- ✅ Performance through optimized queries
- ✅ Maintainability through clean separation of concerns
