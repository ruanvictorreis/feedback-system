def sum_of_squares(n):
  total = 0
  i = 1
  while i <= n:
    total = total + (i**i)
    i = i + 1
  return total
