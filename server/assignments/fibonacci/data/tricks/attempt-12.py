n = int(input())
atual = 0
proximo = 1

if n == 0:
  print(0)
else:
  for i in range(n):
    temp = atual + proximo
    proximo = temp
    atual = proximo
  print(proximo)