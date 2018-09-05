def fibonacci(n):
  if n == 1:
    return 1
    
  if n == 0: 
    return 0 
    
  atual = 0 
  prox = 1  
    
  for i in range(n - 1): 
    temp = atual + prox 
    atual = prox 
    prox = temp
  return prox