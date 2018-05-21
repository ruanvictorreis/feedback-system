def factorial(n):
  total = 1
  count = n
  while count <= n:
    total = total * count
    count = count - 1
  return total
