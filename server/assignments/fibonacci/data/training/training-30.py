def fibonacci(n):
  atual = 0 
  proximo = 1 
  contador = 1 

  if n == 0: 
    return atual 
  elif n == 1: 
    return proximo
  else:
    while contador < n: 
      temp = atual + proximo
      atual = proximo
      proximo = temp
      contador = contador + 1
  return proximo