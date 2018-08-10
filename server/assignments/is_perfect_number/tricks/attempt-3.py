def is_perfect_number(n):
  soma = 0
  i = 1 
  while i < n:
    if n % i:
      soma += i
    i += 1 
  return soma == n
