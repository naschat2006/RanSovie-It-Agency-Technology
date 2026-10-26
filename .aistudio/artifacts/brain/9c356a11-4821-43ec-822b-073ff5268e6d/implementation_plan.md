# Implementation Plan - Dynamic Portfolio Management

## Objective
Enable full CRUD (Create, Read, Update, Delete) capabilities in the Admin Panel for Portfolio projects.

## Proposed Changes
1. **Database Update**: The schema already supports `portfolio_col`.
2. **Backend (src/server/routes/admin.ts)**:
   - Add routes:
     - `GET /rsadminn/portfolio/add` (Render add form)
     - `POST /rsadminn/portfolio/add` (Process add)
     - `GET /rsadminn/portfolio/edit/:id` (Render edit form)
     - `POST /rsadminn/portfolio/edit/:id` (Process update)
     - `POST /rsadminn/portfolio/delete/:id` (Process delete)
3. **Frontend (views/admin/portfolio.ejs)**:
   - Create a table to list projects.
   - Create forms for Add/Edit actions.

## Verification
- Verify that projects can be added, updated, and deleted via the admin interface.
- Verify changes reflect on the frontend `/portfolio` page.
