# Job Management System - Quick Setup

## What's New

Admin users can now:
- ✅ Create jobs (desktop only)
- ✅ View all their jobs in a dashboard
- ✅ Edit/update jobs
- ✅ Delete jobs
- ✅ When admin is deleted, all their jobs are automatically deleted

## Implementation Summary

### 1. **Database Changes**
- Updated User model with `role` field (enum: "user" | "admin")
- Updated Job model with `owner` field (references User)

### 2. **API Endpoints**
- `POST /api/jobs` - Create job (admin only)
- `GET /api/jobs` - Get all public jobs
- `GET /api/jobs/my-jobs` - Get current admin's jobs (admin only)
- `PATCH /api/jobs` - Update job (admin only, owner only)
- `DELETE /api/jobs` - Delete job (admin only, owner only)
- `DELETE /api/admin/users/[userId]` - Delete user + cascade delete jobs

### 3. **UI Changes**
- **Navbar**: "Manage Jobs" link for admins in profile dropdown
- **Create Jobs Page**: Added "Manage My Jobs" button
- **New Page**: `/admin/jobs` - Job management dashboard
- **New Component**: JobManagementActions (edit/delete buttons)

### 4. **Security**
- Multi-layer authorization (API + Middleware + Component)
- Job ownership verification
- Admin-only access to protected routes
- Cascading deletes prevent orphan data

## How to Use

### For End Users (Admins)

1. **Create a Job**
   - Click "Create Jobs" (desktop only)
   - Fill out the form
   - Click "Post Job" or "Save as Draft"
   - Job is now created with your ID as owner

2. **Manage Your Jobs**
   - Click profile → "Manage Jobs"
   - See all jobs you created
   - Edit or delete any job
   - Click edit button to modify
   - Click delete button with confirmation

3. **Edit a Job**
   - Go to Manage Jobs
   - Click "Edit" button on any job
   - (Edit functionality coming soon)

### For Developers

**Make someone an admin:**
```bash
# MongoDB Shell
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

**Check if job has owner:**
```bash
db.jobs.findOne({ _id: ObjectId("...") }, { owner: 1, title: 1 })
```

**Find orphan jobs (shouldn't exist):**
```bash
db.jobs.find({ owner: { $exists: false } })
```

## Key Files Modified/Created

| File | Purpose |
|------|---------|
| `src/models/User.js` | Updated to use `role` field |
| `src/models/Job.js` | Added `owner` field |
| `src/app/api/jobs/route.ts` | Added PATCH & DELETE, admin checks |
| `src/app/api/jobs/my-jobs/route.ts` | New: Get admin's jobs |
| `src/app/api/admin/users/[userId]/route.ts` | New: Delete user + cascade |
| `src/components/JobManagementActions.tsx` | New: Edit/Delete UI |
| `src/app/admin/jobs/page.tsx` | New: Job dashboard |
| `src/components/Navbar.tsx` | Updated: Add Manage Jobs link |
| `middleware.ts` | Updated: Protect /admin routes |

## Testing

### Test 1: Non-Admin User
- [ ] Cannot see "Create Jobs" link
- [ ] Cannot access `/create-jobs`
- [ ] Cannot access `/admin/jobs`

### Test 2: Admin User (Desktop)
- [ ] See "Create Jobs" link in navbar
- [ ] Can access and use `/create-jobs`
- [ ] Can access `/admin/jobs` dashboard
- [ ] Can see list of their jobs
- [ ] Can click edit/delete buttons
- [ ] Can delete jobs with confirmation

### Test 3: Admin User (Mobile)
- [ ] Cannot see "Create Jobs" link
- [ ] Cannot access `/create-jobs` directly
- [ ] Can see "Manage Jobs" in profile dropdown
- [ ] Can access `/admin/jobs` to manage jobs

### Test 4: Cascading Delete
- [ ] Create multiple jobs as admin user
- [ ] Delete the user via API: `DELETE /api/admin/users/[userId]`
- [ ] Verify all their jobs are deleted
- [ ] Check database - no jobs with deleted user's ID

## Important Notes

1. **Session Refresh Required**
   - After changing `role` in database, user must sign out and back in
   - This refreshes their session with new `role` value

2. **Job Ownership**
   - When creating a job, `owner` is automatically set to current user's ID
   - Users can only edit/delete their own jobs
   - Other admins cannot modify jobs they didn't create

3. **Cascading Delete**
   - When an admin user is deleted via API, ALL their jobs are deleted
   - This is automatic - no orphan job data remains
   - Super admin only feature

4. **Mobile Blocking**
   - `/create-jobs` cannot be accessed on mobile (redirects to home)
   - Admin can still manage jobs on mobile via `/admin/jobs`
   - Applies both server-side (middleware) and client-side

## Troubleshooting

### "Create Jobs" link not showing
- User must be admin in database: `db.users.findOne({email: "..."})`
- Check `role` field equals `"admin"` (string, not boolean)
- User must sign out and back in to refresh session
- Must be on desktop screen (> 768px)

### Cannot edit/delete job
- Verify you own the job (you created it)
- Check that `owner` field matches your user ID
- Verify you're still authenticated

### Cascading delete not working
- User must be deleted via API: `DELETE /api/admin/users/[userId]`
- Verify jobs have `owner` field set
- Check MongoDB for orphan jobs: `db.jobs.find({ owner: null })`

## Next Steps

1. **Test thoroughly** before deploying
2. **Backup database** before making admin changes
3. **Monitor API logs** for unauthorized access attempts
4. **Consider adding** audit logging for admin actions
5. **Plan migration** if you have existing jobs without `owner` field

## Documentation

Full detailed docs available in:
- `JOB_MANAGEMENT.md` - Complete feature documentation
- `ADMIN_SETUP.md` - Admin user setup guide

Run `npm run dev` and test the features!
