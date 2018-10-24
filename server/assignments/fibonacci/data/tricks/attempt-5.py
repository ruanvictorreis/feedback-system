n = int(input())
atual = 0
proximo = 1

while (n > 0):
  atual = proximo
  proximo = atual + proximo
  n = n - 1
print(atual)