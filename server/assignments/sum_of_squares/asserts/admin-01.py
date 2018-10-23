def sum_of_squares(n):
  total = 0
  for i in range(1, n+1):
    total = total + i**2
  return(total)

assert sum_of_squares(5) == 55, '>>> sum_of_squares(5)\n    # Error: expected\n    #     55\n    # but got\n    #     %s' % sum_of_squares(5)
assert sum_of_squares(4) == 30, '>>> sum_of_squares(4)\n    # Error: expected\n    #     30\n    # but got\n    #     %s' % sum_of_squares(4)
assert sum_of_squares(3) == 14, '>>> sum_of_squares(3)\n    # Error: expected\n    #     14\n    # but got\n    #     %s' % sum_of_squares(3)
assert sum_of_squares(2) == 5, '>>> sum_of_squares(2)\n    # Error: expected\n    #     5\n    # but got\n    #     %s' % sum_of_squares(2)
assert sum_of_squares(1) == 1, '>>> sum_of_squares(1)\n    # Error: expected\n    #     1\n    # but got\n    #     %s' % sum_of_squares(1)