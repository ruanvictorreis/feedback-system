def factorial(n):
  total = 1
  for i in range(n, 0, -1):
    total = total * i
  return total
