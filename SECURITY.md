# Security Policy

## Reporting

If you find a vulnerability or exposed credential, contact the maintainer privately before opening a public issue.

## Secret Handling

- Never commit `.env` files or provider credentials.
- Keep Supabase service-role keys server-side only.
- Rotate any key that has ever appeared in git history or public logs.
- Use least-privilege keys for browser code. Public anon keys must rely on Row Level Security.
- Keep production secrets in the deployment provider, not in the repository.

## Known Remediation Requirement

Older commits in this repository exposed Supabase administrative credentials in utility scripts. Those credentials must be considered compromised and rotated in Supabase before any production use.
