"""Derive a compact profile chart from the website's full Lowlighter SVG."""

from copy import deepcopy
from pathlib import Path
import re
import xml.etree.ElementTree as ET


SVG = "http://www.w3.org/2000/svg"
HTML = "http://www.w3.org/1999/xhtml"
ET.register_namespace("", SVG)
source = ET.parse("github-metrics.svg").getroot()
bar = next(element for element in source.iter(f"{{{SVG}}}svg")
           if "bar" in element.get("class", "").split())
languages = []
for entry in source.iter(f"{{{HTML}}}div"):
    if not {"language", "details"}.issubset(entry.get("class", "").split()):
        continue
    label = entry.find(f"{{{HTML}}}div")
    detail = entry.find(f"{{{HTML}}}small")
    color = entry.find(f".//{{{SVG}}}path").get("fill")
    percentage = re.search(r"([\d.]+)%", " ".join(detail.itertext()))
    line_count = next((" ".join(child.itertext()).strip() for child in detail
                       if "line" in " ".join(child.itertext()).lower()), None)
    if label is None or not color or percentage is None:
        raise ValueError("Lowlighter language details are missing")
    languages.append((" ".join(" ".join(label.itertext()).split()),
                      percentage.group(1), color, line_count))
if not languages:
    raise ValueError("No language distribution found; retaining the previous chart")
languages.sort(key=lambda item: float(item[1]), reverse=True)
width = int(bar.get("width")) + 16
height = 60 + 40 * ((len(languages) + 3) // 4)
chart = ET.Element(f"{{{SVG}}}svg", {
    "width": str(width), "height": str(height),
    "viewBox": f"0 0 {width} {height}", "role": "img",
    "aria-labelledby": "title",
})
ET.SubElement(chart, f"{{{SVG}}}title", id="title").text = "Language distribution — Lowlighter Metrics"
ET.SubElement(chart, f"{{{SVG}}}style").text = (
    "text{font:14px -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif;fill:#57606a}"
    "@media(prefers-color-scheme:dark){text{fill:#c9d1d9}}"
)
ET.SubElement(chart, f"{{{SVG}}}text", x="8", y="18").text = "Language distribution"
chart.append(deepcopy(bar))
chart[-1].set("x", "8")
chart[-1].set("y", "30")
for index, (name, percentage, color, line_count) in enumerate(languages):
    x, y = 8 + (index % 4) * ((width - 16) // 4), 62 + (index // 4) * 40
    ET.SubElement(chart, f"{{{SVG}}}circle", cx=str(x + 5), cy=str(y - 5), r="5", fill=color)
    ET.SubElement(chart, f"{{{SVG}}}text", x=str(x + 18), y=str(y)).text = f"{name} {percentage}%"
    if line_count:
        ET.SubElement(chart, f"{{{SVG}}}text", x=str(x + 18), y=str(y + 17)).text = line_count
ET.indent(chart)
Path("github-languages.svg").write_text(ET.tostring(chart, encoding="unicode") + "\n")
