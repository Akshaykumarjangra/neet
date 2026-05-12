# SECURITY: Credentials To Rotate Immediately

The file `.env` was previously committed to this repository (tracked by git) with **plaintext production credentials**. Even after removing it from tracking, the values remain in git history and must be considered **compromised**. Rotate every credential below before doing anything else.

> Status check: `.env` was confirmed tracked in git (`git ls-files --error-unmatch .env` succeeded). It has been added to `.gitignore`, but you must run `git rm --cached .env` and commit, then rotate.

---

## 1. Gemini API Key (HIGH PRIORITY)

- **Exposed value:** `<REDACTED>`
- **Why it matters:** Anyone with this key can call Gemini on your billing account.
- **Rotate steps:**
  1. Go to https://aistudio.google.com/app/apikey
  2. Delete the exposed key.
  3. Create a new key.
  4. Update `GEMINI_API_KEY` in your local `.env` (and any deployment secret store: Coolify, Vercel, etc.).
  5. Optionally restrict the new key by API and referrer.

## 2. Database Password (HIGH PRIORITY)

- **Exposed connection:** `postgresql://postgres:<REDACTED>@82.25.104.62:8001/postgres`
- **Exposed password:** `<REDACTED>`
- **Why it matters:** The host (82.25.104.62:8001) is reachable on the public internet. Treat the database as compromised.
- **Rotate steps:**
  1. SSH to your Coolify VPS (82.25.104.62).
  2. Connect to Postgres as a superuser and run:
     ```sql
     ALTER USER postgres WITH PASSWORD 'NEW_STRONG_PASSWORD_HERE';
     ```
  3. Update `DATABASE_URL` in your local `.env` and in Coolify environment variables for every service that uses it.
  4. Restart dependent services.
  5. Audit Postgres logs (`pg_stat_activity`, server logs) for unknown clients since the leak.
  6. Consider firewalling port 8001 to known IPs only — exposing Postgres directly to the internet is risky regardless of password strength.

## 3. Owner Account Password (HIGH PRIORITY)

- **Exposed email:** `<REDACTED>`
- **Exposed password:** `<REDACTED>`
- **Why it matters:** This is the application's owner/admin login. If reused anywhere else, rotate there too.
- **Rotate steps:**
  1. Pick a new strong password (password manager generated, 20+ chars).
  2. Log into the app as owner and change the password through the UI, OR update the hash directly in the DB.
  3. Update `OWNER_PASSWORD` in `.env` and in deployment secrets.
  4. If this password was reused on any other site/service, rotate those too.
  5. Enable 2FA on the linked Gmail account if not already.

## 4. Session Secret (MEDIUM PRIORITY)

- **Exposed value:** `<REDACTED>`
- **Why it matters:** Anyone with this can forge session cookies and impersonate users.
- **Rotate steps:**
  1. Generate a new 64-char random value:
     ```bash
     node -e "console.log(require('crypto').randomBytes(48).toString('base64'))"
     ```
  2. Update `SESSION_SECRET` in `.env` and in deployment secrets.
  3. Restart the server. All existing sessions will be invalidated (users will need to log in again — this is expected and desirable).

---

## Post-Rotation Cleanup Checklist

- [ ] All four credentials above rotated.
- [ ] Run `git rm --cached .env` and commit the removal.
- [ ] Verify `.env` is now ignored: `git check-ignore -v .env` should print the matching rule.
- [ ] Consider purging `.env` from git history with `git filter-repo` or BFG, then force-pushing — required if the repo is or ever was public/shared.
- [ ] Audit access logs (Gemini API usage dashboard, Postgres connections, app login history) for unauthorized activity since the leak.
- [ ] Confirm new `.env` values work in all environments (local, staging, production).

## Going Forward

- Never commit `.env`. The `.gitignore` now blocks it.
- Use `.env.example` as the committed template — keys only, no real values.
- For production, use a secrets manager (Coolify env vars, Vercel env vars, AWS Secrets Manager, etc.) rather than checked-in files.
