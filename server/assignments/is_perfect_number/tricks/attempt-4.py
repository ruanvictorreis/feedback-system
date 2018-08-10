def is_perfect_number(n):
  soma = 1
  for i in range(1, n):
    if n % i == 0:
      soma += i
  
  if soma == n:
    return True
  else:
    return False
