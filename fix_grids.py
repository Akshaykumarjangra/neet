import os
import glob
import re

d3_dir = r'c:\Users\aksha\OneDrive\Documents\ZERO AI\neet\client\src\visuals'
files = glob.glob(d3_dir + '/**/*.tsx', recursive=True)
count = 0
for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    new_content = content
    
    # 2. Fix grid-cols-2 -> grid-cols-1 sm:grid-cols-2
    # Ensure it doesn't already have sm:grid-cols-2 or md:grid-cols-2 immediately preceding it
    new_content = re.sub(r'className="([^"]*?)(?<!sm:)(?<!md:)(?<!lg:)\bgrid-cols-2\b([^"]*)"', r'className="\1grid-cols-1 sm:grid-cols-2\2"', new_content)
    new_content = re.sub(r'className="([^"]*?)(?<!sm:)(?<!md:)(?<!lg:)\bgrid-cols-3\b([^"]*)"', r'className="\1grid-cols-1 sm:grid-cols-3\2"', new_content)

    if content != new_content:
        with open(f, 'w', encoding='utf-8') as file:
            file.write(new_content)
        count += 1

print(f'Fixed grids in {count} files.')
