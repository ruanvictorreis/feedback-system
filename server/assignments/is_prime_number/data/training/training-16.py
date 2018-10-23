def is_prime_number(n):
  if n == 1:
    return False
  else:
    divisores = [] 
    for i in range(1,n+1):
      if n % i == 0:
        divisores.append(i) 
    
    if(len(divisores) == 2):
      return True
    else:
      return False