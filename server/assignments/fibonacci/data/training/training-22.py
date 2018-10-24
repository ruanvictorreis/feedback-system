def fibonacci(n):
  if n == 0:
    return 0
  
  elif n == 1:
    return 1

  else:  
    atual = 0
    proximo = 1
  
    for i in range(n):
      temp = atual + proximo
      atual = proximo
      proximo = temp
    return atual