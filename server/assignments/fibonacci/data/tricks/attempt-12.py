def fibonacci(n):
  atual = 0
  proximo = 1

  if n == 0:
    return 0

  for i in range(n):
    temp = atual + proximo
    proximo = temp
    atual = proximo
  return proximo