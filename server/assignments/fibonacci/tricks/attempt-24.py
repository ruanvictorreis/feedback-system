def fibonacci(n):
  if n == 0:
    return 1
  
  elif n == 1:
	return 0
  
  else:
    return fibonacci(n - 2) + fibonacci(n - 1)
