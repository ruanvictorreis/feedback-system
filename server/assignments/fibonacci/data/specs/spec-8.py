n = int(input())
atual = 0
proximo = 1
  
for i in range(n):
  temp = atual + proximo
  atual = proximo
  proximo = temp
print(atual)