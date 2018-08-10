def is_perfect_number(n):
  soma = 0
  for i in range(1, n+1):
    if n % i == 0:
      soma = soma + i
  return soma == n
