# Quick Reference Guide

## 🚀 Get Started in 5 Minutes

### 1. Make Admin User
```bash
mongo
use hocxhire
db.users.updateOne(
  { email: "your-email@example.com" },
  { $set: { role: "admin" } }
)
```

### 2. Start App
```bash
npm run dev
```

### 3. Test It
- Sign in as admin
- Click "Create Jobs" (desktop only)
- Create a job
- Go to "Manage Jobs"
- Edit or delete job

**Done!** ✅

---

## 📍 Key Locations

| What | Where |
|------|-------|
| Create Jobs | `/create-jobs` |
| Manage Jobs | `/admin/jobs` |
| Admin API | `/api/jobs/*` |
| Middleware | `middleware.ts` |

---

## 🔑 Key Concepts

### Admin Only
- Create jobs
- View their jobs
- Edit their jobs
- Delete their jobs
- Access `/admin/*`

### Non-Admin
- Can view all published jobs
- Cannot create jobs
- Cannot access `/admin/*`
- Cannot see "Create Jobs" link

### Mobile
- Cannot create jobs (blocked)
- Can manage jobs
- Cannot access `/create-jobs` directly

---

## 🔐 Security Rules

1. **Must be admin** to create/edit/delete jobs
2. **Must own job** to edit or delete it
3. **Must be on desktop** to create jobs
4. **When admin deleted** → all their jobs deleted

---

## 📊 Database Fields

### User
- `_id` - User ID
- `email` - Email address
- `role` - "user" or "admin" ← NEW
- `jobs` - Array of job IDs

### Job
- `_id` - Job ID
- `title` - Job title
- `owner` - User ID who created it ← NEW
- `draft` - Published or draft

---

## 🛠️ Common Tasks

### Make User Admin
```bash
db.users.updateOne({email: "..."}, {$set: {role: "admin"}})
```

### Remove Admin Status
```bash
db.users.updateOne({email: "..."}, {$set: {role: "user"}})
```

### Check if User is Admin
```bash
db.users.findOne({email: "..."}, {role: 1})
```

### Find Admin's Jobs
```bash
db.jobs.find({owner: ObjectId("user_id")})
```

### Delete Admin + Cascade
```bash
DELETE /api/admin/users/[user_id]
```

### Find Orphan Jobs
```bash
db.jobs.find({owner: null})
```

---

## ❌ Common Mistakes

### ❌ Don't
- Change `role` then expect it to work without re-login
- Give non-admin roles to try creating jobs
- Try to edit another admin's jobs
- Delete admin without backup

### ✅ Do
- Sign out/in after role changes
- Only admins create jobs
- Only edit your own jobs
- Backup before deleting users

---

## 🐛 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| "Create Jobs" not visible | Check: admin role + desktop + session refreshed |
| Cannot create job | Check: 403? = not admin; 401? = not logged in |
| Cannot delete job | Check: do you own it? Are you admin? |
| Job still appears | Hard refresh browser (Ctrl+Shift+R) |
| Cascading delete didn't work | Used DELETE /api/admin/users endpoint? |

---

## 📞 Documentation

Start here based on your need:

| Need | Document |
|------|----------|
| Just start using | This file ← You are here |
| Setup admin users | `ADMIN_SETUP.md` |
| Quick setup | `JOB_MANAGEMENT_SETUP.md` |
| Full details | `JOB_MANAGEMENT.md` |
| Architecture | `SYSTEM_ARCHITECTURE.md` |
| Deploy | `DEPLOYMENT_CHECKLIST.md` |
| See all changes | `CHANGES_SUMMARY.md` |

---

## 🎯 What Each User Role Can Do

### Visitor (Not Logged In)
- ✅ View published jobs
- ❌ Create jobs
- ❌ Manage jobs

### Regular User
- ✅ View published jobs
- ✅ See profile
- ❌ Create jobs
- ❌ Manage jobs

### Admin User
- ✅ View published jobs
- ✅ Create jobs (desktop only)
- ✅ View their jobs
- ✅ Edit their jobs
- ✅ Delete their jobs
- ✅ Access admin panel

---

## 📱 Mobile Behavior

**What Works on Mobile:**
- ✅ Browse jobs
- ✅ View published job details
- ✅ See "Manage Jobs" link
- ✅ Go to `/admin/jobs`
- ✅ Edit/delete jobs on dashboard
- ✅ Sign in/out

**What Doesn't Work on Mobile:**
- ❌ "Create Jobs" link (hidden)
- ❌ Creating new jobs (`/create-jobs` redirects)
- ❌ Middleware blocks create jobs on mobile

---

## 🔄 User Workflows

### Creating a Job (5 Steps)
1. Click "Create Jobs" (desktop only)
2. Fill form with job details
3. Click "Post Job" or "Save as Draft"
4. See success message
5. Job appears in "Manage Jobs"

### Editing a Job (4 Steps)
1. Go to "Manage Jobs"
2. Find job in list
3. Click "Edit" button
4. Update and save

### Deleting a Job (4 Steps)
1. Go to "Manage Jobs"
2. Find job in list
3. Click "Delete"
4. Confirm in modal

---

## 🔧 API Quick Reference

### Create Job
```bash
POST /api/jobs
Authorization: Session required
Body: {title, description, company, ...}
```

### Get My Jobs
```bash
GET /api/jobs/my-jobs
Authorization: Admin required
```

### Update Job
```bash
PATCH /api/jobs
Authorization: Admin required
Body: {jobId, title, ...}
```

### Delete Job
```bash
DELETE /api/jobs
Authorization: Admin required
Body: {jobId}
```

### Delete User (Cascade)
```bash
DELETE /api/admin/users/[userId]
Authorization: Admin required
Deletes: User + all their jobs
```

---

## ✨ New Features at a Glance

| Feature | Before | After |
|---------|--------|-------|
| Create Jobs | Anyone | Admin only |
| Edit Jobs | Not possible | Admin only |
| Delete Jobs | Not possible | Admin only |
| Job Dashboard | Not available | ✅ Available |
| Job Ownership | Not tracked | ✅ Tracked |
| Cascading Delete | Not available | ✅ Available |
| Mobile Create | No restriction | ✅ Blocked |
| Admin Badge | Not visible | ✅ Visible |

---

## 📈 Benefits

✅ **Security** - Only admins can manage jobs  
✅ **Accountability** - Know who created each job  
✅ **Data Integrity** - No orphan jobs  
✅ **Scalability** - Support multiple admins  
✅ **User Control** - Admins control their jobs  
✅ **Mobile Friendly** - Can manage on any device  

---

## 🎓 Learn More

All documentation is in files in root directory:
- `ADMIN_SETUP.md`
- `JOB_MANAGEMENT.md`
- `JOB_MANAGEMENT_SETUP.md`
- `SYSTEM_ARCHITECTURE.md`
- `DEPLOYMENT_CHECKLIST.md`
- `CHANGES_SUMMARY.md`
- `README_IMPLEMENTATION.md`

---

## ❓ FAQ

**Q: Can I revert to non-admin?**
A: Yes: `db.users.updateOne({...}, {$set: {role: "user"}})`

**Q: What if I forget to sign out before role change?**
A: Session won't update. Sign out and back in.

**Q: Can I edit jobs on mobile?**
A: Yes, via /admin/jobs. Can't create on mobile.

**Q: What if I accidentally delete all jobs?**
A: Use database backup if available.

**Q: Can admins see each other's jobs?**
A: No. Dashboard only shows YOUR jobs.

**Q: Is there an edit page?**
A: Not yet - edit functionality coming in future update.

---

**Status: Ready to Use** ✅

Start with step 1 above!
