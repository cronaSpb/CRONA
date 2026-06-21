import struct, zlib, sys

with open('img/200.png', 'rb') as f:
    data = f.read()

if data[:8] != b'\x89PNG\r\n\x1a\n':
    print('not png')
    sys.exit(1)

pos = 8
width = height = bit_depth = color_type = 0
idat_data = b''
while pos < len(data):
    length = struct.unpack('>I', data[pos:pos+4])[0]
    chunk_type = data[pos+4:pos+8]
    chunk_data = data[pos+8:pos+8+length]
    if chunk_type == b'IHDR':
        width, height, bit_depth, color_type, comp, filt, interlace = struct.unpack('>IIBBBBB', chunk_data)
        print('IHDR', width, height, bit_depth, color_type)
    elif chunk_type == b'IDAT':
        idat_data += chunk_data
    elif chunk_type == b'IEND':
        break
    pos += 12 + length

if not idat_data:
    print('no IDAT')
    sys.exit(1)

raw = zlib.decompress(idat_data)
print('raw len', len(raw))
# sample center pixels
stride = width * 4  # assume RGBA8
for y in [150, 200, 250, 300, 400, 500, 600]:
    for x in [width//2 - 20, width//2, width//2 + 20]:
        idx = y * stride + x * 4
        if idx + 3 < len(raw):
            r, g, b, a = raw[idx:idx+4]
            if a > 100:
                print(f'pixel {x},{y}: rgba({r},{g},{b},{a})')
# bounding box of non-transparent
minx = miny = 9999
maxx = maxy = 0
for y in range(height):
    for x in range(width):
        idx = y * stride + x * 4
        a = raw[idx+3]
        if a > 10:
            minx = min(minx, x)
            miny = min(miny, y)
            maxx = max(maxx, x)
            maxy = max(maxy, y)
print('bbox', minx, miny, maxx, maxy)
# average inside bbox
reds = greens = blues = count = 0
for y in range(miny, maxy+1, 10):
    for x in range(minx, maxx+1, 10):
        idx = y * stride + x * 4
        r, g, b, a = raw[idx:idx+4]
        if a > 100:
            reds += r
            greens += g
            blues += b
            count += 1
print('avg rgb in bbox', reds//count if count else 0, greens//count if count else 0, blues//count if count else 0, 'samples', count)
