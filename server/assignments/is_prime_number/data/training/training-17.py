def is_prime_number(n):
  divisores = [] 
  for i in range(1, n+1):
    if n % i == 0:
      divisores.append(i) 

  if n == 1:
    return False
  else:
    return len(divisores) == 2