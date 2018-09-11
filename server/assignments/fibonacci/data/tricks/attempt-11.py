def fibonacci(n):
  atual = 0
  prox = 1

  for i in range(n-1): 
    temp = atual + prox 
    atual = prox 
    prox = temp
  return prox