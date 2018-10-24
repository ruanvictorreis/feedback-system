def fibonacci(n):
  atual = 0 
  prox = 1  

  if n == 0: 
    return 0 

  elif n == 1:
    return 1
  
  else:     
    for i in range(n-1): 
      temp = atual + prox 
      atual = prox 
      prox = temp
    return prox