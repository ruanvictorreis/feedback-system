def fibonacci(n): 
  if n == 0: 
    return 0 
  if n == 1: 
    return 1 
  else: 
    atual = 0 
    proximo = 1 
    temp = 0
    for i in range(n - 1): 
      temp = atual + proximo 
      atual = proximo 
      proximo = temp 
    return temp