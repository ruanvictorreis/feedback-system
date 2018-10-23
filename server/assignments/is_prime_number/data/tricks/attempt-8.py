n = int(input())
i = 1
contador = 0
  
while i <= n:
  if n % i == 0:
    contador += i
  i += 1 

if contador == 2:
  print(True)
else:
  print(False)
