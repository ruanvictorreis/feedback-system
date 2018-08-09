def fibonacci(n):
  atual = 0
  proximo = 1
  count = 0
  while(count < n):
    atual, proximo = proximo, atual+proximo
    n = n - 1
  return atual
