def fibonacci(n):
  atual = 0
  proximo = 1
  count = 0

  while (count < n):
    temp = atual
    atual = proximo
    proximo = atual + proximo
    count = count + 1
  return atual