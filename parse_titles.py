import os, re

media_dir = r'C:\Users\user\Documents\Antigravity\portfolio-website\assets\user_media'
for f in sorted(os.listdir(media_dir), key=lambda x: int(x.split('_')[1]) if '_' in x and x.split('_')[1].isdigit() else 0):
    fp = os.path.join(media_dir, f)
    with open(fp, 'r', encoding='utf-8', errors='ignore') as file:
        html = file.read()
        m_og = re.search(r'<meta property="og:title" content="([^"]+)"', html)
        m_title = re.search(r'<title>([^<]+)</title>', html)
        
        og = m_og.group(1) if m_og else None
        title = m_title.group(1) if m_title else None
        
        print(f"{f}: og_title='{og}' | title='{title}'")
