def fibonacci(n):
  atual = 1
  proximo = 0
  for i in range(n):
    temp = atual
    atual = proximo
    proximo = temp + proximo
  return atual