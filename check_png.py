import struct, hashlib

def parse_png(path):
    with open(path, 'rb') as f:
        data = f.read()
    h = hashlib.sha256(data).hexdigest()[:16]
    if data[:8] != b'\x89PNG\r\n\x1a\n':
        print(f'{path}: Not PNG')
        return
    pos = 8
    width = height = 0
    while pos < len(data):
        length = struct.unpack('>I', data[pos:pos+4])[0]
        chunk_type = data[pos+4:pos+8].decode('ascii', errors='replace')
        chunk_data = data[pos+8:pos+8+length]
        if chunk_type == 'IHDR':
            width, height = struct.unpack('>II', chunk_data[:8])
            print(f'{path}: {width}x{height} sha={h}')
        if chunk_type == 'IDAT':
            break
        if chunk_type == 'IEND':
            break
        pos += 12 + length

for p in ['img/200.png', 'udalenie-derevev/img/200.png', 'H2O/img/200.png']:
    parse_png(p)
