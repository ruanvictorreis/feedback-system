def is_perfect_number(n):
  soma = 0   
  i = 2 
  while i * i <= n:
    if n % i == 0:
      soma = soma + i + n/i
    i += 1 
  return soma == n and n != 1
