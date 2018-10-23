n = int(input())
if n == 0: 
  print(0) 
elif n == 1:
  print(1)
else:
  atual = 0 
  proximo = 1
        
  for i in range(n-1): 
    temp = atual + proximo 
    atual = proximo 
    proximo = temp
  print(proximo)