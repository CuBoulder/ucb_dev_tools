# CU Boulder Localized Links

Petite module designed to, when synced to a Pantheon site, localize any absolute paths.

**Example:**
- Local DDEV project titled `sync` is synced to the production site at colorado.edu/strategicrelations.
- Any non-relative links are converted to relative by removing the domain and subpath, resolving to sync.ddev.site/*.
- Localization uses the synced site's subpath found in the `pantheon_domain_masking` module.
- The following conditions are accounted for during localization:
  - Protocol type (both http and https links will work)
  - Omitted 'www' (e.g. colorado.edu/strategicrelations and www.colorado.edu/strategicrelations both work)
  - Trailing slashes (e.g. colorado.edu/strategicrelations/ works the same as colorado.edu/strategicrelations)
  - Paths (e.g. colorado.edu/strategicrelations/contact turns into /contact)
  - Partially-matching subpaths (e.g. colorado.edu/strategicrelations-team is **not** localized)