def fibonacci(n):
  a = 0
  b = 1
  for i in range(n):
    a = b
    c = a
    b = c + b
  return a
