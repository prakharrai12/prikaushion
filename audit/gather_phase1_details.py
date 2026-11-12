import os
import re
import json
import subprocess

report_data = {}

# 1. Image audit
public_assets = []
for root, dirs, files in os.walk('public'):
    for f in files:
        fp = os.path.join(root, f)
        size_kb = os.path.getsize(fp) / 1024
        ext = os.path.splitext(f)[1].lower()
        public_assets.append({
            'path': fp.replace('\\', '/'),
            'size_kb': round(size_kb, 2),
            'ext': ext,
            'flag': size_kb > 150 or ext not in ['.webp', '.svg', '.png', '.ico']
        })
report_data['images'] = public_assets

# 2. Secret scan across git history
try:
    log_p = subprocess.run(['git', 'log', '-p'], capture_output=True, text=True, encoding='utf-8', errors='ignore')
    git_history = log_p.stdout
    patterns = {
        'api_key': r'(?i)(api[_-]?key|secret|token)\s*[:=]\s*[\'"][A-Za-z0-9_\-]{8,}[\'"]',
        'bearer': r'(?i)bearer\s+[A-Za-z0-9_\-\.]{15,}',
        'github_pat': r'ghp_[A-Za-z0-9]{36}',
        'google_key': r'AIza[0-9A-Za-z-_]{35}',
        'aws_key': r'AKIA[0-9A-Z]{16}'
    }
    secrets_found = []
    for pat_name, pat in patterns.items():
        matches = re.findall(pat, git_history)
        if matches:
            secrets_found.append({'type': pat_name, 'count': len(matches)})
    report_data['secrets_scan'] = secrets_found
except Exception as e:
    report_data['secrets_scan'] = str(e)

# 3. npm audit
try:
    npm_audit = subprocess.run(['npm', 'audit', '--json'], capture_output=True, text=True, shell=True)
    report_data['npm_audit'] = json.loads(npm_audit.stdout) if npm_audit.stdout else {}
except Exception as e:
    report_data['npm_audit'] = str(e)

# 4. Check target="_blank" without rel="noopener noreferrer" in src
blank_links = []
for root, dirs, files in os.walk('src'):
    for f in files:
        if f.endswith(('.tsx', '.ts', '.html')):
            fp = os.path.join(root, f)
            with open(fp, 'r', encoding='utf-8') as file_content:
                text = file_content.read()
                # Find <a tags with target="_blank"
                matches = re.findall(r'<a[^>]*target=["\']_blank["\'][^>]*>', text)
                for m in matches:
                    has_rel = 'rel=' in m and 'noopener' in m
                    blank_links.append({
                        'file': fp.replace('\\', '/'),
                        'tag': m,
                        'safe': has_rel
                    })
report_data['blank_links'] = blank_links

# 5. Check dangerouslySetInnerHTML
dangerous = []
for root, dirs, files in os.walk('src'):
    for f in files:
        if f.endswith(('.tsx', '.ts')):
            fp = os.path.join(root, f)
            with open(fp, 'r', encoding='utf-8') as file_content:
                text = file_content.read()
                if 'dangerouslySetInnerHTML' in text:
                    dangerous.append(fp.replace('\\', '/'))
report_data['dangerouslySetInnerHTML'] = dangerous

with open('audit/phase1_details.json', 'w', encoding='utf-8') as f:
    json.dump(report_data, f, indent=2)

print('Saved audit/phase1_details.json')
