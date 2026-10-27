#!/usr/bin/env bash
# One-time: give the admin console its own copies of the secrets it used to read
# from sparx's vault, so the wizeworks deploy can build `admin-secrets`.
#
#   bash admin/scripts/copy-secrets-from-sparx.sh
#
# Needs `az login` as someone who can read kv-sparx-prod-cus and write
# kv-wizeworks-prod-cus. Values move file-to-file and are never printed. Each
# copy is checked byte for byte at the end.
#
# The values stay in sync with sparx only as long as nobody rotates them there.
# Rotate OPERATOR_AUTH_SECRET and the operator token in BOTH vaults, or re-run
# this script. Rotating OPERATOR_AUTH_SECRET also breaks every operator's
# enrolled authenticator, since it encrypts the TOTP secrets.
set -euo pipefail

SRC="${SRC:-kv-sparx-prod-cus}"
DST="${DST:-kv-wizeworks-prod-cus}"
W="$(mktemp -d)"
trap 'rm -rf "$W"' EXIT

# Read a secret's exact value into a file (JSON, not tsv, so no byte is added
# or trimmed — operator-auth-secret-b64 is base64 of a value ending in \r).
read_secret() {
  az keyvault secret show --vault-name "$1" --name "$2" -o json > "$W/raw.json"
  python -c "import json,sys;open(sys.argv[2],'wb').write(json.load(open(sys.argv[1]))['value'].encode())" \
    "$W/raw.json" "$3"
  rm -f "$W/raw.json"
}

COPY=(
  operator-auth-secret-b64
  sparx-internal-operator-token
  operator-bootstrap-password
  next-actions-key-admin
  wizelens-key-admin
)

for name in "${COPY[@]}"; do
  read_secret "$SRC" "$name" "$W/value"
  az keyvault secret set --vault-name "$DST" --name "$name" --file "$W/value" \
    --encoding utf-8 --query name -o tsv >/dev/null
  echo "copied   $name"
done

# operator-database-url is not in sparx's vault: its release derives it from
# database-url (same password, role wize_operator, schema wize_admin). Do the
# same here, once.
read_secret "$SRC" database-url "$W/db"
python - "$W/db" "$W/value" <<'PY'
import sys
url = open(sys.argv[1], encoding='utf-8').read()
if '://sparx_app:' not in url:
    sys.exit('database-url does not connect as sparx_app; set operator-database-url by hand.')
url = url.replace('://sparx_app:', '://wize_operator:', 1)
url += ('&' if '?' in url else '?') + 'schema=wize_admin'
open(sys.argv[2], 'w', encoding='utf-8', newline='').write(url)
PY
az keyvault secret set --vault-name "$DST" --name operator-database-url --file "$W/value" \
  --encoding utf-8 --query name -o tsv >/dev/null
echo "derived  operator-database-url"

fail=0
for name in "${COPY[@]}"; do
  read_secret "$SRC" "$name" "$W/a"
  read_secret "$DST" "$name" "$W/b"
  if cmp -s "$W/a" "$W/b"; then echo "match    $name"; else echo "MISMATCH $name"; fail=1; fi
done
exit "$fail"
