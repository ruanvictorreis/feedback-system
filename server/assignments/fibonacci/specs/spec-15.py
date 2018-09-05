def fibonacci(n):    
  atual = 0 
  prox = 1  
    
  for i in range(n): 
    temp = atual + prox 
    atual = prox 
    prox = temp
  return atual