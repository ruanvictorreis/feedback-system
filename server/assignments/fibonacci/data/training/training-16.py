def fibonacci(n):
  if n == 0:
    return 0
  
  elif n == 1:
    return 1
  
  else:  
    atual = 0
    proximo = 1
  
    while (n > 0):
      temp = atual
      atual = proximo
      proximo = temp + proximo
      n = n - 1
    return atual