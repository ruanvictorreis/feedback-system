n = int(input())
i = 1
contador = 0
while i <= n:
  if n % i == 0:
    contador += 1
  i += 1 
print(contador == 2)
