def sum_of_squares(n):
  total = 0
  for i in range(n, 1, -1):
    total = total + (n**2)
  return total
