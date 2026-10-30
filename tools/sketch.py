"""Turns project photos into line drawings for the home page.

    pip install opencv-python-headless pillow
    python3 tools/sketch.py assets/img/projects/ortakoy-dansresim/01.jpg [more.jpg ...]

For each NN.jpg it writes NN-line.webp (the lines) and NN-tone.webp (the hatching).
Both are transparent masks: the site colours them with the theme's ink and accent,
so the drawings switch with light and dark mode like the journal illustrations.
"""
import sys

import cv2
import numpy as np
from PIL import Image


def masks(path, width=1600):
    im = cv2.imread(path)
    h, w = im.shape[:2]
    im = cv2.resize(im, (width, int(h * width / w)), interpolation=cv2.INTER_CUBIC if w < width else cv2.INTER_AREA)
    g = cv2.bilateralFilter(cv2.cvtColor(im, cv2.COLOR_BGR2GRAY), 7, 30, 7)
    # pencil lines: the photo dodged against its own blurred negative
    sketch = cv2.divide(g, cv2.GaussianBlur(g, (0, 0), 2.2), scale=256).astype(np.float32)
    line = np.clip((255 - sketch - 10) * 3.2, 0, 255)
    edges = cv2.Canny(cv2.GaussianBlur(g, (0, 0), 1.2), 35, 100).astype(np.float32)
    line = cv2.GaussianBlur(np.maximum(line, edges * 0.85), (0, 0), 0.5)
    # diagonal hatching in the darker areas
    shade = cv2.GaussianBlur(np.clip((165 - g.astype(np.float32)) / 120, 0, 1), (0, 0), 3)
    yy, xx = np.mgrid[0:g.shape[0], 0:g.shape[1]]
    tone = ((xx - yy) % 8 < 1.6) * shade * 255 * 0.85
    return line.astype(np.uint8), tone.astype(np.uint8)


def save(alpha, out):
    rgba = np.zeros((*alpha.shape, 4), np.uint8)
    rgba[..., 3] = alpha
    Image.fromarray(rgba).save(out, "WEBP", quality=72, method=6)


for src in sys.argv[1:]:
    line, tone = masks(src)
    stem = src.rsplit(".", 1)[0]
    save(line, stem + "-line.webp")
    save(tone, stem + "-tone.webp")
    print("wrote", stem + "-line.webp", stem + "-tone.webp")
