n = int(input())
if n == 0:
  print(0)  
elif n == 1:
  print(1) 
else:
  atual = 1 
  anterior = 0 
  
  for i in range(n-1):
    temp = atual 
    atual = atual + anterior 
    anterior = temp 
  print(atual)
