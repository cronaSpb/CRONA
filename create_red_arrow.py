import struct, zlib, math

W = 40
H = 40

# circle center, radius
CX, CY = W/2, H/2
R = 18
STROKE = 2.2

# arrow: vertical line (CX, 28) -> (CX, 12)
# arrowhead: (CX, 12) -> (CX-6, 20) and (CX+6, 20)
segments = [
    (CX, 28, CX, 12),
    (CX, 12, CX-6, 20),
    (CX, 12, CX+6, 20),
]

def dist_to_segment(x, y, x1, y1, x2, y2):
    # distance from point (x,y) to segment
    dx = x2 - x1
    dy = y2 - y1
    if dx == 0 and dy == 0:
        return math.hypot(x-x1, y-y1)
    t = max(0, min(1, ((x-x1)*dx + (y-y1)*dy) / (dx*dx + dy*dy)))
    projx = x1 + t*dx
    projy = y1 + t*dy
    return math.hypot(x-projx, y-projy)

raw_rows = []
for y in range(H):
    row = b'\x00'  # filter type 0
    for x in range(W):
        # distance to circle
        d = abs(math.hypot(x+0.5-CX, y+0.5-CY) - R)
        if d < STROKE:
            alpha = 255
        elif d < STROKE + 1.0:
            alpha = int(255 * (STROKE + 1.0 - d))
        else:
            alpha = 0
        # distance to arrow segments
        for seg in segments:
            ds = dist_to_segment(x+0.5, y+0.5, *seg)
            if ds < STROKE:
                alpha = 255
            elif ds < STROKE + 1.0:
                alpha = max(alpha, int(255 * (STROKE + 1.0 - ds)))
        if alpha > 0:
            r, g, b = 255, 0, 0
        else:
            r, g, b, alpha = 0, 0, 0, 0
        row += bytes([r, g, b, alpha])
    raw_rows.append(row)

raw_data = b''.join(raw_rows)
compressed = zlib.compress(raw_data)

def chunk(chunk_type, data):
    return struct.pack('>I', len(data)) + chunk_type + data + struct.pack('>I', zlib.crc32(chunk_type + data) & 0xffffffff)

with open('img/red-arrow.png', 'wb') as f:
    f.write(b'\x89PNG\r\n\x1a\n')
    f.write(chunk(b'IHDR', struct.pack('>IIBBBBB', W, H, 8, 6, 0, 0, 0)))
    f.write(chunk(b'IDAT', compressed))
    f.write(chunk(b'IEND', b''))

print('created img/red-arrow.png')
