def is_perfect_number(n):
  soma = 0
  i = 0 
  while i < n:
    if n % i == 0:
      soma = soma + i
    i += 1 
  return soma == n
