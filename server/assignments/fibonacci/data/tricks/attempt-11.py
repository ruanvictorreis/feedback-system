n = int(input())
atual = 0
proximo = 1

for i in range(n-1): 
  temp = atual + proximo 
  atual = proximo 
  proximo = temp
print(proximo)