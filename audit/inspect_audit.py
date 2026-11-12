import json

with open('audit/audit_data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

print(f"Console logs ({len(data['consoleLogs'])}):", data['consoleLogs'])
print(f"Network failures ({len(data['networkFailures'])}):", data['networkFailures'])

print(f"\nHeadings ({len(data['headings'])}):")
for h in data['headings']:
    print(f"  [{h['level']}] {h['text']}")

links = data['linkAudit']
pass_c = sum(1 for l in links if l['verdict'] == 'PASS')
warn_c = sum(1 for l in links if 'WARN' in l['verdict'])
fail_c = sum(1 for l in links if l['verdict'] == 'FAIL')
print(f"\nTotal links: {len(links)} | PASS: {pass_c} | WARN: {warn_c} | FAIL: {fail_c}")

for l in links:
    if l['verdict'] != 'PASS':
        print(f"  Flagged: {l['text']} -> {l['href']} ({l['status']}) - {l['verdict']}")

print("\nBreakpoint Layout & Overflow Metrics:")
for w, metrics in data['layoutMetrics'].items():
    cw = metrics['clientWidth']
    sw = metrics['scrollWidth']
    ov = metrics['hasOverflow']
    st = len(metrics['interactives'])
    print(f"  Width {w}px: clientW={cw}, scrollW={sw}, hasOverflow={ov}, smallTargets={st}")

print("\nTypography Summary:")
print("  Font Families:", data['typography']['fontFamilies'])
print("  Font Sizes:", data['typography']['fontSizes'])

print("\nSection Paddings (at 1440px):")
for s in data['layoutMetrics']['1440']['sections']:
    print(f"  {s['id']}: top={s['paddingTop']}, bottom={s['paddingBottom']}, left={s['paddingLeft']}, right={s['paddingRight']}")
