def sum_of_squares(n):
  total = 0
  for i in range(1, n):
    total = total + (i**2)
  return total
