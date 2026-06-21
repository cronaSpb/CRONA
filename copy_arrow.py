import shutil, os
src = r'c:\Users\DELL\CRONA\img\red-arrow.png'
dst = r'c:\Users\DELL\CRONA\udalenie-derevev\img\red-arrow.png'
shutil.copy2(src, dst)
print('copied', dst)
