def sum_of_squares(n):
  num = 0
  while num > n:
    num = num + (n**2)
    n = n - 1
  return num
