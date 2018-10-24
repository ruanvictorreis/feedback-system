def fibonacci(n):
  if n == 0:
    return 0
  
  elif n == 1 :
    return 1 
  
  else:
    atual = 1 
    anterior = 0 
  
    for i in range(n-1):
      temp = atual 
      atual = atual + anterior 
      anterior = temp 
    return atual