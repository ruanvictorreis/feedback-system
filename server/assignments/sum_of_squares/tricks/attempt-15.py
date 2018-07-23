def sum_of_squares(n):
  if n == 0:
    return 1
  else:
	return n**2 + sum_of_squares(n-1)
