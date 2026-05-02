import os
import re

pages_dir = r"c:\Users\aksha\OneDrive\Documents\ZERO AI\neet\client\src\pages"

fixed_files = []

for fname in os.listdir(pages_dir):
    if not fname.endswith('.tsx'):
        continue
    fpath = os.path.join(pages_dir, fname)
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check if file uses the <> ... </> fragment pattern with a Seo component
    if '<Seo' not in content:
        continue
    
    lines = content.split('\n')
    
    # Find the pattern: <> then <Seo.../> then <div className="min-h-screen..."> 
    # where the div is never closed before </>
    
    # Count opening tags vs closing tags between <> and </>
    fragment_start = None
    fragment_end = None
    outer_div_line = None
    
    for i, line in enumerate(lines):
        stripped = line.strip()
        if stripped == '<>' or stripped.startswith('<>\n') or stripped == '<>':
            fragment_start = i
        if stripped == '</>' and fragment_start is not None:
            fragment_end = i
            break
    
    if fragment_start is None or fragment_end is None:
        continue
    
    # Find the first <div after the Seo component (within the fragment)
    seo_end = None
    for i in range(fragment_start, fragment_end):
        stripped = lines[i].strip()
        if '/>' in stripped and '<Seo' in content[sum(len(l)+1 for l in lines[:i]):]:
            seo_end = i
    
    # Simpler approach: count div opens and closes between fragment_start and fragment_end
    div_opens = 0
    div_closes = 0
    for i in range(fragment_start + 1, fragment_end):
        line = lines[i]
        # Count <div (but not self-closing)
        div_opens += len(re.findall(r'<div\b', line))
        div_closes += len(re.findall(r'</div>', line))
    
    mismatch = div_opens - div_closes
    
    if mismatch > 0:
        # Need to add {mismatch} closing </div> tags before the </> line
        indent = '    '  # Match the indentation of </>
        closing_divs = '\n'.join([indent + '</div>' for _ in range(mismatch)])
        lines.insert(fragment_end, closing_divs)
        
        new_content = '\n'.join(lines)
        with open(fpath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        fixed_files.append(f"{fname} (added {mismatch} closing </div>)")
        print(f"FIXED: {fname} - added {mismatch} closing </div> tag(s)")
    elif mismatch < 0:
        print(f"WARNING: {fname} has {abs(mismatch)} EXTRA closing </div> tags")
    else:
        # Fine
        pass

if not fixed_files:
    print("No files needed fixing.")
else:
    print(f"\nFixed {len(fixed_files)} file(s):")
    for f in fixed_files:
        print(f"  - {f}")
