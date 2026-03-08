# Admin Feature Setup Guide

## Overview

This document explains how to set up and manage the admin feature for the "Create Jobs" functionality in HocxHire.

## Architecture

### Components

1. **Database Model** (`src/models/User.js`)
   - Added `isAdmin` field (Boolean, default: false)
   - Added `createdAt` field for tracking

2. **Authentication** (`src/lib/authOptions.ts`)
   - Session callback now includes `isAdmin` status
   - Admin status automatically passed to frontend

3. **Utilities** (`src/lib/adminUtils.ts`)
   - `isUserAdmin()` - Check admin status from session
   - `checkAdminByEmail()` - Server-side admin check
   - `isMobileDevice()` - Detect mobile devices

4. **Middleware** (`middleware.ts`)
   - Protects `/create-jobs` route
   - Verifies admin status before allowing access
   - Blocks mobile users from accessing the page
   - Redirects unauthorized users

5. **Navbar Component** (`src/components/Navbar.tsx`)
   - Conditionally shows "Create Jobs" link only for admins
   - Hides link on mobile devices (< 768px)
   - Shows "Admin" badge in user profile dropdown

6. **Create Jobs Page** (`src/app/create-jobs/page.tsx`)
   - Client-side authorization checks
   - Mobile device detection with user feedback
   - Redirects unauthorized users

## How to Manually Set Admins

### Option 1: MongoDB Compass (GUI)

1. Open MongoDB Compass
2. Connect to your database
3. Navigate to: `hocxhire` > `users` collection
4. Find the user you want to make admin
5. Click the edit icon (pencil icon)
6. Change `isAdmin` from `false` to `true`
7. Click "Update"

### Option 2: MongoDB Shell (Terminal)

```bash
# Connect to your MongoDB instance
mongosh "your-connection-string"

# Switch to database
use hocxhire

# Find user by email
db.users.findOne({ email: "user@example.com" })

# Make user admin
db.users.updateOne(
  { email: "user@example.com" },
  { $set: { isAdmin: true } }
)

# Verify change
db.users.findOne({ email: "user@example.com" })
```

### Option 3: Node.js Script (Create `scripts/makeAdmin.js`)

```javascript
import mongoose from "mongoose";
import User from "../src/models/User.js";

const EMAIL = process.argv[2];

if (!EMAIL) {
  console.error("Usage: node scripts/makeAdmin.js <email>");
  process.exit(1);
}

mongoose.connect(process.env.MONGODB_URI).then(async () => {
  try {
    const user = await User.findOneAndUpdate(
      { email: EMAIL },
      { isAdmin: true },
      { new: true }
    );

    if (!user) {
      console.error(`User not found: ${EMAIL}`);
    } else {
      console.log(`✓ ${user.email} is now an admin`);
    }
  } finally {
    mongoose.connection.close();
  }
});
```

Run with:
```bash
node scripts/makeAdmin.js user@example.com
```

## Remove Admin Status

```javascript
// MongoDB Shell
db.users.updateOne(
  { email: "user@example.com" },
  { $set: { isAdmin: false } }
)

// Or Node.js
await User.findOneAndUpdate(
  { email: EMAIL },
  { isAdmin: false }
);
```

## View All Admins

```javascript
// MongoDB Shell
db.users.find({ isAdmin: true })

// Or Node.js
const admins = await User.find({ isAdmin: true });
console.log(admins);
```

## Security Features

✅ **Multi-Layer Protection**
- Middleware verification (server-side)
- Session-based checks (NextAuth)
- Component-level guards (React)
- Database verification

✅ **Mobile Prevention**
- User-Agent based detection
- Window size detection on client
- Server-side mobile blocking via middleware

✅ **Non-Admin Prevention**
- Direct database checks
- Session object validation
- Automatic redirects for unauthorized users

✅ **Admin Badge**
- Visible in user profile dropdown
- Shows admin status after login

## Testing the Feature

### Test 1: Non-Admin User
1. Sign in with a regular user account (not admin)
2. Verify "Create Jobs" link is NOT visible in navbar
3. Try accessing `/create-jobs` directly
4. Should redirect to home page

### Test 2: Admin User (Desktop)
1. Make yourself admin in database
2. Refresh browser or sign out and back in
3. Verify "Create Jobs" link appears in navbar (desktop only)
4. Click link and verify you can access the form
5. Verify "Admin" badge shows in profile dropdown

### Test 3: Admin User (Mobile)
1. Open website on mobile device as admin
2. Verify "Create Jobs" link is NOT visible
3. Try accessing `/create-jobs` directly on mobile
4. Should redirect to home page

### Test 4: Non-Authenticated User
1. Log out
2. Try accessing `/create-jobs` directly
3. Should redirect to login page

## Session Refresh

After making someone an admin:
1. User needs to sign out and sign back in
2. Or refresh the browser (may need to clear session)
3. New session will include updated `isAdmin` status

To immediate refresh: User can sign out and sign in again.

## Troubleshooting

### Create Jobs link not showing for admins
- Check `isAdmin` is `true` in database
- User needs to sign out and back in
- Check browser console for errors
- Verify middleware is running

### Mobile blocking not working
- Check middleware.ts is in root directory
- Verify User-Agent header includes mobile device name
- Clear browser cache and restart server

### Authorization errors
- Verify MongoDB connection in middleware
- Check `MONGODB_URI` environment variable
- Review server logs for connection errors

## File Summary

| File | Purpose |
|------|---------|
| `src/models/User.js` | User schema with `isAdmin` field |
| `src/lib/authOptions.ts` | NextAuth session setup |
| `src/lib/adminUtils.ts` | Admin utility functions |
| `middleware.ts` | Route protection and mobile blocking |
| `src/components/Navbar.tsx` | Conditional nav links |
| `src/app/create-jobs/page.tsx` | Client-side authorization checks |

## API Integration

If you need to add admin management features later:

### Suggested API Route
```
/api/admin/users
  - GET: List all users with admin status
  - PATCH: Update user admin status (admin-only)
```

### Example Admin Panel Page
```
/admin
  - List all users
  - Toggle admin status
  - View user activity
```

## Next Steps (Optional)

1. Create an admin dashboard at `/admin`
2. Add ability to toggle admin status via UI (secure)
3. Add audit logging for admin actions
4. Implement admin statistics/analytics
5. Add role-based permissions (e.g., Super Admin, Editor, Viewer)
