import subprocess, os

ids = [
    '1CgTIRrbNjyfurAEHP79O-Pp1zwMjeGeB',
    '1ChKkI37BoBy6wt-_igmZZYSQldBXShQ5',
    '1JHcxuomzlXM3s4JKoB1T46bTtpA-KBgy',
    '1H-hCSyzeBb6B_poQMkI837d5tG29RB4H',
    '11CcicRkPu9XCnFZbSD35M8FvY4pk0kGR',
    '1nLJ6gfAy5RLEoifwm9dei2EQW_SJXE5Q',
    '1Ni4MkoIS6nWgLlmSPAmulmtv1KFIHHFT',
    '1yZK97A2kL4QTEEZgEGN3l6Uo_2pgSMZK',
    '15Svm-MnSvMEuNmoktd3WUoPwavnOMELi',
    '1XpOKBkuoTcYIeEYiHy7oHx1U4zyPohG8',
    '1890JvVToPd6ks9qoGm1pm24NWGqz-ivr',
    '1ofdZ6asMUFp4YHxWHaREwVEzkb8PN8BR',
    '1ouVNAf2I0-tiff1mXzsdULXeVx_Rd9if',
    '1MIvTiqfjgwOL59Yx4t4hBbUvyyXFOC3l',
    '1tJnF746TY0dwJcvXiwfpk5O1Gm9har8D',
    '1i1USOWyfGXvfTKBTSwzBmR3qVDtX_iUm',
    '19xVM2rDYYhV7EHseUm4FbNevXiZjK6Pg'
]

out_dir = r'C:\Users\user\Documents\Antigravity\portfolio-website\assets\drive_certs'
os.makedirs(out_dir, exist_ok=True)

for i, fid in enumerate(ids):
    cmd = f'gdown https://drive.google.com/uc?id={fid} -O {os.path.join(out_dir, f"cert_{i+1}")}'
    res = subprocess.run(cmd, shell=True, capture_output=True, text=True)
    print(f"Cert {i+1} ({fid}): {res.stdout.strip()[:100]} | {res.stderr.strip()[:100]}")
