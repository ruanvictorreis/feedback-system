n = int(input())
atual = 0
proximo = 1
  
while (n > 0):
  temp = atual
  atual = proximo
  proximo = temp + proximo
  n = n - 1
print(atual)