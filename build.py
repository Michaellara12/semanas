"""Genera:
  dist/semanas.html           un único archivo autocontenido (CSS y JS embebidos; MathJax desde CDN);
  dist/semanas-artifact.html  variante sin <html>/<head>/<body> para publicar como Artifact.

El sitio vive en una carpeta por sección (ver js/routes.js). Este script las
concatena en un solo documento y lo marca con <html data-single>, atributo que
routes.js usa para volver a resolver la navegación con anclas (#historia) en
lugar de rutas (historia/). Opcional: el sitio publicado no lo necesita.
"""
import re, pathlib

root = pathlib.Path(__file__).parent
css = (root / "css/styles.css").read_text(encoding="utf-8")
portada = (root / "index.html").read_text(encoding="utf-8")

# --- orden de las secciones, leído de js/routes.js ------------------------
rutas_js = (root / "js/routes.js").read_text(encoding="utf-8")
IDS = re.findall(r'\{ n:"\d+", id:"([a-z0-9]+)"', rutas_js)
assert IDS, "no se pudieron leer las rutas de js/routes.js"


def cuerpo(archivo):
    """Devuelve el contenido de <main> de una página, sin el <main> mismo."""
    html = archivo.read_text(encoding="utf-8")
    m = re.search(r"<main>(.*)</main>", html, re.S)
    return m.group(1) if m else ""


# La portada aporta el héroe; el índice de tarjetas sobra en un documento único.
inicio = cuerpo(root / "index.html")
inicio = re.sub(r'<!-- ===== ÍNDICE DE SECCIONES ===== -->.*?</section>', "", inicio, flags=re.S)

partes = [inicio]
for rid in IDS:
    f = root / rid / "index.html"
    if not f.exists():
        print("!! falta", f)
        continue
    partes.append(cuerpo(f))

# Enlaces entre páginas -> anclas del mismo documento.
todo = "\n".join(partes)
todo = re.sub(r'href="\.\./([a-z0-9]+)/"', r'href="#\1"', todo)
todo = re.sub(r'href="([a-z0-9]+)/"', r'href="#\1"', todo)
todo = todo.replace('href="../"', 'href="#inicio"')

# --- armado del archivo único --------------------------------------------
CDN = "https://cdnjs.cloudflare.com/ajax/libs/mathjax/3.2.2/es5/tex-svg.js"
fonts = "\n".join(re.findall(
    r'<link rel="preconnect"[^>]*>|<link href="https://fonts\.googleapis\.com[^>]*>', portada))
icon = re.search(r'<link rel="icon"[^>]*>', portada).group(0)
mathjax = ('<script>window.MathJax={tex:{inlineMath:[["\\\\(","\\\\)"]],'
           'displayMath:[["\\\\[","\\\\]"]]},svg:{fontCache:"global"},'
           'options:{skipHtmlTags:["script","noscript","style","textarea","pre","code"]}};</script>\n'
           '<script src="%s" id="MathJax-script" async></script>' % CDN)

scripts = []
for js in ("js/data.js", "js/glossary.js", "js/routes.js", "js/shell.js",
           "js/charts.js", "js/models.js", "js/app.js"):
    src = (root / js).read_text(encoding="utf-8").replace("</script>", "<\\/script>")
    scripts.append("<script>\n" + src + "\n</script>")
scripts = "\n".join(scripts)

title = "<title>Observatorio SEMANAS</title>"
desc = re.search(r'<meta name="description"[^>]*>', portada).group(0)
style = "<style>\n" + css + "\n</style>"
body = "<main>\n" + todo + "\n</main>\n" + scripts

completo = (
    '<!DOCTYPE html>\n<html lang="es" data-single data-route="inicio">\n<head>\n'
    '<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n'
    + title + "\n" + desc + "\n" + fonts + "\n" + icon + "\n" + style + "\n" + mathjax
    + "\n</head>\n<body>\n" + body + "\n</body>\n</html>\n")

dist = root / "dist"
dist.mkdir(exist_ok=True)
(dist / "semanas.html").write_text(completo, encoding="utf-8")
(dist / "semanas-artifact.html").write_text(
    title + "\n" + fonts + "\n" + style + "\n" + mathjax + "\n" + body, encoding="utf-8")

for f in ("semanas.html", "semanas-artifact.html"):
    print("OK ->", dist / f, "(%.0f KB)" % ((dist / f).stat().st_size / 1024))
