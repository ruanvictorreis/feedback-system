def fibonacci(n):
  atual = 0
  proximo = 1
  contador = 0

  while (contador < n):
    temp = atual
    atual = proximo
    proximo = temp + proximo
    contador = contador + 1
  return atual