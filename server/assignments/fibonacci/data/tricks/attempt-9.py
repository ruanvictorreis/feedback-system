n = int(input())
atual = 0
proximo = 1
contador = 0

while (contador < n):
  temp = atual
  atual = proximo
  proximo = atual + proximo
  contador = contador + 1
print(atual)