"""Genera:
  dist/semanas.html           un único archivo autocontenido (CSS y JS embebidos; MathJax desde vendor/ o CDN);
  dist/semanas-artifact.html  variante sin <html>/<head>/<body> para publicar como Artifact (MathJax desde cdnjs).
"""
import re, pathlib
root = pathlib.Path(__file__).parent
html = (root / "index.html").read_text(encoding="utf-8")
css = (root / "css/styles.css").read_text(encoding="utf-8")
html = html.replace('<link rel="stylesheet" href="css/styles.css">', "<style>\n" + css + "\n</style>")
def inline(m):
    js = (root / m.group(1)).read_text(encoding="utf-8")
    return "<script>\n" + js.replace("</script>", "<\\/script>") + "\n</script>"
html = re.sub(r'<script src="(js/[^"]+)"></script>', inline, html)
CDN = "https://cdnjs.cloudflare.com/ajax/libs/mathjax/3.2.2/es5/tex-svg.js"
dist = root / "dist"; dist.mkdir(exist_ok=True)
# Archivo único: MathJax desde CDN (el vendor local no viaja con un solo archivo)
(dist / "semanas.html").write_text(html.replace("vendor/tex-svg.js", CDN), encoding="utf-8")
title = "<title>Observatorio SEMANAS</title>"
fonts = "\n".join(re.findall(r'<link rel="preconnect"[^>]*>|<link href="https://fonts\.googleapis\.com[^>]*>', html))
style = re.search(r"<style>.*?</style>", html, re.S).group(0)
body = re.search(r"<body>(.*)</body>", html, re.S).group(1).replace("vendor/tex-svg.js", CDN)
(dist / "semanas-artifact.html").write_text(title + "\n" + fonts + "\n" + style + "\n" + body, encoding="utf-8")
for f in ("semanas.html", "semanas-artifact.html"):
    print("OK ->", dist / f, f"({(dist/f).stat().st_size/1024:.0f} KB)")
