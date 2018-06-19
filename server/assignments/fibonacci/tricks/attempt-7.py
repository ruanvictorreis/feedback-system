def fibonacci(n):
  a = 1
  b = 1
  for i in range(n):
    a, b = b, a+b
  return b
