# Pre-Deployment Checklist

## Code Changes ✅

### Models
- [x] User.js - Has `role` field (enum: "user" | "admin")
- [x] Job.js - Has `owner` field (references User._id)

### API Routes
- [x] POST /api/jobs - Create job (admin only, sets owner)
- [x] GET /api/jobs - Get all public jobs
- [x] PATCH /api/jobs - Update job (admin + owner only)
- [x] DELETE /api/jobs - Delete job (admin + owner only)
- [x] GET /api/jobs/my-jobs - Get admin's jobs
- [x] DELETE /api/admin/users/[userId] - Delete user + cascade

### Middleware
- [x] Protects /create-jobs (admin + desktop only)
- [x] Protects /admin (admin only)
- [x] Redirects unauthorized users
- [x] Mobile device detection

### Components
- [x] Navbar - Shows Manage Jobs link for admins
- [x] Create-Jobs page - Added dashboard link
- [x] JobManagementActions - Edit/Delete buttons with confirmation
- [x] Admin Jobs Dashboard - View and manage jobs

### Security
- [x] All APIs verify admin role
- [x] All edit/delete operations verify job ownership
- [x] Cascading delete prevents orphan data
- [x] Session-based authentication
- [x] Multi-layer authorization

## Database Setup

### Step 1: Check Existing Users
```bash
mongo
use hocxhire
db.users.find({}, { email: 1, role: 1 })
```

**Expected output:**
```
{ "_id": ObjectId(...), "email": "user@example.com", "role": "user" }
{ "_id": ObjectId(...), "email": "admin@example.com", "role": "admin" }
```

### Step 2: Make Admin User(s)
```bash
db.users.updateOne(
  { email: "your-admin@example.com" },
  { $set: { role: "admin" } }
)

# Verify
db.users.findOne({ email: "your-admin@example.com" })
# Should show: role: "admin"
```

### Step 3: Check Jobs Have Owner (Optional)
```bash
db.jobs.find({}, { owner: 1 }).limit(5)

# If any jobs don't have owner field, they were created before this update
# New jobs will have owner field automatically
```

## Testing Checklist

### Non-Admin User Testing
- [ ] Log in as non-admin user
- [ ] "Create Jobs" link NOT visible in navbar (desktop)
- [ ] "Manage Jobs" link NOT visible in profile dropdown
- [ ] Try accessing /create-jobs directly → redirected to home
- [ ] Try accessing /admin/jobs directly → redirected to home
- [ ] Can still view all published jobs

### Admin User Testing (Desktop)
- [ ] Log in as admin user
- [ ] "Create Jobs" link IS visible in navbar
- [ ] "Manage Jobs" link IS visible in profile dropdown
- [ ] Can access /create-jobs page
- [ ] Can fill out and submit job form
- [ ] Job appears in "Manage Jobs" dashboard
- [ ] Can see "Edit" and "Delete" buttons for own jobs
- [ ] Can delete job with confirmation modal
- [ ] Deleted job no longer appears in dashboard
- [ ] Can see "Manage My Jobs" button on Create Jobs page

### Admin User Testing (Mobile)
- [ ] Log in as admin on mobile device
- [ ] "Create Jobs" link NOT visible
- [ ] "Manage Jobs" link IS visible in profile dropdown
- [ ] Can access /admin/jobs on mobile
- [ ] Can manage jobs (view, edit, delete) on mobile
- [ ] Try accessing /create-jobs directly → redirected to home

### Session Refresh Testing
- [ ] Sign in as regular user
- [ ] Change their role in database: role: "admin"
- [ ] WITHOUT signing out, "Create Jobs" link NOT visible yet
- [ ] Sign out and sign back in
- [ ] NOW "Create Jobs" link IS visible
- [ ] Role changed successfully persisted in session

### Cascading Delete Testing
- [ ] Create multiple jobs as admin user A
- [ ] Verify jobs appear in dashboard
- [ ] Make DELETE request: /api/admin/users/[adminA_userId]
- [ ] All jobs by admin A should be deleted
- [ ] Check database: `db.jobs.find({ owner: adminA_userId })` → empty
- [ ] No orphan data remaining

### Edge Cases
- [ ] Try to edit/delete another admin's job → 403 Forbidden
- [ ] Try to delete job that doesn't exist → 404 Not Found
- [ ] Try to create job while not authenticated → 401 Unauthorized
- [ ] Try to create job on mobile → blocked by middleware
- [ ] Create job, then manually remove owner field → operations fail safely
- [ ] Make concurrent requests → handled correctly

## Performance Testing

- [ ] Dashboard loads quickly (< 1s for 10+ jobs)
- [ ] Job creation responds within 2s
- [ ] Delete operation completes in < 1s
- [ ] No console errors or warnings
- [ ] Images load properly
- [ ] Responsive on different screen sizes

## Security Testing

- [ ] Try accessing API directly without session → 401
- [ ] Try spoofing admin role in session → API rejects
- [ ] Try accessing other user's data → 403
- [ ] Try SQL injection in search → not applicable (MongoDB)
- [ ] Try modifying job ownership in browser → ignored (server-side only)
- [ ] Check password in localStorage → none stored
- [ ] Check sensitive data in session → only role, email, name, id

## Browser Testing

- [ ] Chrome (desktop + mobile)
- [ ] Firefox (desktop + mobile)
- [ ] Safari (desktop + mobile)
- [ ] Edge (desktop)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

## Deployment Steps

1. **Backup Database**
   ```bash
   mongodump --uri="mongodb://..." --out=./backup
   ```

2. **Stop Current Instance**
   ```bash
   npm stop
   # or
   # Kill the PM2 process
   pm2 stop hocxhire
   ```

3. **Deploy New Code**
   ```bash
   git pull origin main
   npm install
   ```

4. **Verify Database**
   ```bash
   node scripts/verifyDatabase.js
   # or manually: db.users.findOne({ role: "admin" })
   ```

5. **Start Application**
   ```bash
   npm run dev
   # or
   npm run build && npm start
   ```

6. **Verify Running**
   - [ ] No startup errors
   - [ ] Application loads
   - [ ] Can navigate to home page
   - [ ] Can log in

7. **Run Smoke Tests**
   - [ ] Admin can see Create Jobs
   - [ ] Non-admin cannot
   - [ ] Can create a test job
   - [ ] Job appears in Manage Jobs
   - [ ] Can delete test job

## Post-Deployment Monitoring

- [ ] Monitor error logs for API failures
- [ ] Check database for orphan data: `db.jobs.find({ owner: null })`
- [ ] Monitor API response times
- [ ] Check for repeated 403 errors (suspicious activity)
- [ ] Monitor user feedback in support channel

## Rollback Plan

If issues occur:

1. **Stop Application**
   ```bash
   npm stop
   ```

2. **Restore Previous Code**
   ```bash
   git revert HEAD
   npm install
   ```

3. **Restore Database**
   ```bash
   mongorestore --uri="mongodb://..." ./backup
   ```

4. **Restart Application**
   ```bash
   npm run dev
   ```

## Important Notes

### ⚠️ DO NOT
- [ ] Delete admin users without backup
- [ ] Manually change `owner` field on jobs
- [ ] Run migrations on production without backup
- [ ] Skip database verification before deployment
- [ ] Deploy without testing all user roles

### ✅ DO
- [ ] Backup database before deployment
- [ ] Test thoroughly in staging environment
- [ ] Verify at least one admin exists
- [ ] Monitor logs after deployment
- [ ] Communicate changes to team
- [ ] Document any custom modifications

## Support Resources

### Documentation Files
1. `IMPLEMENTATION_COMPLETE.md` - Overview of what was implemented
2. `JOB_MANAGEMENT.md` - Complete technical documentation
3. `JOB_MANAGEMENT_SETUP.md` - Quick setup guide
4. `SYSTEM_ARCHITECTURE.md` - Architecture diagrams
5. `ADMIN_SETUP.md` - Admin user setup guide

### Common Issues

**"Create Jobs" link not showing**
- Verify user role is "admin" in database
- Check user has signed out and back in
- Verify using desktop (> 768px width)

**Cannot create/edit/delete jobs**
- Check API response: Open DevTools → Network → click request
- Look for 401 (not authenticated) or 403 (not admin/not owner)
- Verify session has correct role

**Jobs disappearing**
- Check middleware logs
- Verify cache not interfering: hard refresh (Ctrl+Shift+R)
- Check for JavaScript errors in console

**Permission denied errors**
- Verify you're accessing your own jobs
- Check owner field in database matches your user ID
- Sign out and back in to refresh session

---

## Sign-Off

- [ ] Code reviewed
- [ ] All tests passing
- [ ] Database backup taken
- [ ] Documentation complete
- [ ] Team notified
- [ ] Deployment approved

**Ready to deploy!** 🚀
