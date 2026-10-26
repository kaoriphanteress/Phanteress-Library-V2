# Phanteress Library: Action Overhaul, Manage Lists & Progress Architecture

Implement the rebranding to **Phanteress Library**, overhaul title action buttons with toggle undo and Showly routing rules, create the floating **Manage Lists** modal, enforce air-date validation for unreleased episodes, update the Progress switcher to **Media / Shows / Movies / Marvel**, and add the **Treat Me** PayPal integration in Settings.

---

## 1. Scope of Changes

### A. App Rebranding to "Phanteress Library"
- Update application title, meta tags, and descriptions in `index.html` and `metadata.json`.
- Update branding in `PWALandingPage.tsx` ("Welcome to Phanteress Library"), `SettingsModal.tsx`, and navigation labels.

---

### B. Title Details (`MediaModal.tsx`) Action Buttons & Toggle Behavior
- **Movie Actions**:
  - Row 1: `[Watchlist]` `[✔️]` `[♥️]`
  - Row 2: `[Manage Lists]`
- **Show Actions**:
  - Row 1: `[Add To Shows]` `[Watchlist]` `[♥️]`
  - Row 2: `[Manage Lists]`
- **Toggle / Undo Rule**:
  - Re-clicking any active state button immediately toggles/undoes it:
    - Re-clicking `[Watchlist]` removes the movie/show from watchlist.
    - Re-clicking `[✔️]` un-marks the movie as watched.
    - Re-clicking `[♥️]` un-favorites the title.
    - Re-clicking `[Add To Shows]` removes the show from in-progress tracking.
- **Routing Rules**:
  - **Movies**:
    - `Watchlist` movies appear in `Progress` (under `Movies` and `Media`).
    - `[✔️]` Watched movies appear in `Collection` -> `Completed`.
  - **Shows**:
    - `Add To Shows` is the only action that puts a show into `Progress` (under `Shows` and `Media`).
    - `Watchlist` shows appear in `Collection` -> `Watchlist` (they do not clutter the `Progress` tab).
  - Remove all legacy "Watching" selectors from title details and from the `Collection` tab.

---

### C. Floating "Manage Lists" Modal & Custom Lists Redesign
- Inside `MediaModal.tsx`, clicking `[Manage Lists]` opens a sleek floating bottom sheet / modal:
  - Lists all user's custom lists with checkboxes.
  - Tapping a list immediately adds or removes the current title from that list.
  - Displays a "+ Create New List" form (Name & optional Description) so users can create lists on the fly without navigating away.
- In `CollectionView.tsx`, update the Custom Lists visual layout:
  - Clean poster collage / preview cards with title counts, quick actions, and full list detail view.

---

### D. Air-Date Release Validation (Preventing Unreleased Episodes from Being Marked Watched)
- In `MediaModal` season/episode selector and in `ProgressView`:
  - Check the episode `air_date` against the current date.
  - If an episode hasn't aired yet (future date or unreleased), disable the watch checkmark and display an unreleased badge / premiere date so users cannot prematurely mark future episodes as watched.

---

### E. Progress Tab Switcher: "Media" "Shows" "Movies" "Marvel"
- Update the top serif switcher to 4 options:
  1. **Media**: Shows all combined in-progress TV shows (`Add To Shows`) and Watchlist movies, ordered by most recently updated/watched.
  2. **Shows**: Shows with `Add To Shows` active.
  3. **Movies**: Movies on `Watchlist`.
  4. **Marvel**: Staged empty section reserved for the upcoming Marvel chronology / Order tab integration.
- Preserve the 3 sub-tabs (`Progress`, `Calendar`, `History`), filter chips, and card anatomy.

---

### F. "Treat Me" PayPal Integration in Settings
- In `SettingsModal.tsx`, add a dedicated **Treat Me** section:
  - Link button directing to `https://www.paypal.me/IanLenard759`.
  - Styled with neon hot pink accent, heart icon, and clean tip copy.

---

## 2. File Updates Summary

1. `metadata.json` & `index.html`: Update name to "Phanteress Library".
2. `src/types/tmdb.ts`: Update `WatchStatus` and list helpers.
3. `src/context/LibraryContext.tsx`: Update status transition helpers for `add_to_shows`, `watchlist`, toggle undoing, and custom list membership.
4. `src/components/MediaModal.tsx`:
   - Replace old buttons with the exact button rows for Movies and Shows.
   - Implement toggle-undo logic.
   - Add `[Manage Lists]` button and floating bottom sheet modal.
   - Add air-date checking for episodes.
5. `src/components/ProgressView.tsx`:
   - Implement the 4-way switcher (`Media`, `Shows`, `Movies`, `Marvel`).
   - Implement combined Media ordering by most recently updated/watched.
   - Enforce air-date lock so future episodes cannot be checked off.
6. `src/components/CollectionView.tsx`:
   - Remove "Watching" tab; keep `Watchlist`, `Completed`, `Favorites`, `Lists`.
   - Enhance the Custom Lists UI.
7. `src/components/SettingsModal.tsx`:
   - Add "Treat Me" PayPal section (`https://www.paypal.me/IanLenard759`).
8. `src/components/PWALandingPage.tsx`:
   - Rename to Phanteress Library.
