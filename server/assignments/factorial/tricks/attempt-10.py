def factorial(n):
  total = 1
  count = 0
  while count <= n:
    total = total * count
    count = count + 1
  return total
