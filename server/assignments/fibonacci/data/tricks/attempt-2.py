n = int(input())
atual = 0
proximo = 1
  
for i in range(n):
  atual = proximo
  proximo = atual + proximo
print(atual)