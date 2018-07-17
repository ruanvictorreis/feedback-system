def sum_of_squares(n):
  if n == 1:
    return 1
  return n**2 + sum_of_squares(n - 1)
