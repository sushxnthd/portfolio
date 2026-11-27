"""Unauthenticated evidence audit; HTTP reachability is not proof of artifact validity."""
import concurrent.futures, json, urllib.request, urllib.error
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit
class Links(HTMLParser):
    def __init__(self):
        super().__init__()
        self.urls=set()
    def handle_starttag(self, tag, attrs):
        if tag=="a":
            url=dict(attrs).get("href","")
            if url.startswith(("https://","http://")): self.urls.add(url.split("#")[0])
parser=Links()
pages=[Path("index.html"),*Path("work").glob("*/index.html"),*[Path(x)/"index.html" for x in ("research","building","projects","recognition")]]
for page in pages: parser.feed(page.read_text())
def check(url):
    row={"url":url}
    try:
        req=urllib.request.Request(url,headers={"User-Agent":"PortfolioEvidenceAudit/1.0","Range":"bytes=0-65535"})
        with urllib.request.urlopen(req,timeout=18) as response:
            data=response.read(65536); dest=response.geturl(); mime=response.headers.get("Content-Type","")
            row.update(status=response.status,final_url=dest,content_type=mime)
            sample=data.decode("utf-8",errors="ignore").lower()
            if "accounts.google.com" in urlsplit(dest).netloc or "github.com/login" in dest or ("request access" in sample and "drive.google.com" in url):
                row["result"]="access-wall"
            elif urlsplit(url).path.lower().endswith(".pdf") and not ("github.com/" in url and "/blob/" in url) and not data.startswith(b"%PDF"):
                row["result"]="pdf-review"
            else: row["result"]="reachable"
    except urllib.error.HTTPError as e:
        row.update(status=e.code,result="review-bot-block-or-rate-limit" if e.code in (403,429) else "http-error")
    except Exception as e:
        row.update(result="network-review",error=str(e))
    return row
with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool:
    rows=list(pool.map(check,sorted(parser.urls)))
Path("link-audit.json").write_text(json.dumps(rows,indent=2)+"\n")
for row in rows:
    if row["result"]!="reachable": print(row["result"],row["url"])
print("Audited",len(rows),"public URLs;",sum(r["result"]=="reachable" for r in rows),"reachable")
