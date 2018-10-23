n = int(input())
contador = 1

for i in range(1, n+1):
  if n % i == 0:
    contador += 1 

if contador == 2:
  print(True)
else:
  print(False)