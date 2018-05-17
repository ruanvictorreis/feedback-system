def sum_of_squares_base(base, n):
  total = base
  for i in range(1, n+1):
    total = total + i**2
  return total


assert sum_of_squares_base(0, 4) == 30, '>>> sum_of_squares_base(0, 4)\n    # Error: expected\n    #     30\n    # but got\n    #     %s' % sum_of_squares_base(0, 4)
assert sum_of_squares_base(5, 3) == 19, '>>> sum_of_squares_base(5, 3)\n    # Error: expected\n    #     19\n    # but got\n    #     %s' % sum_of_squares_base(5, 3)
assert sum_of_squares_base(11, 0) == 11, '>>> sum_of_squares_base(11, 0)\n    # Error: expected\n    #     11\n    # but got\n    #     %s' % sum_of_squares_base(11, 0)
assert sum_of_squares_base(11, 2) == 16, '>>> sum_of_squares_base(11, 2)\n    # Error: expected\n    #     16\n    # but got\n    #     %s' % sum_of_squares_base(11, 2)