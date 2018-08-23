def fibonacci(n):
  atual = 0
  prox = 1
  for i in range(n):
    aux = atual
    atual = prox
    prox = aux + prox
  return atual

assert fibonacci(0) == 0, '>>> fibonacci(0)\n    # Error: expected\n    #     0\n    # but got\n    #     %s' % fibonacci(0)
assert fibonacci(1) == 1, '>>> fibonacci(1)\n    # Error: expected\n    #     1\n    # but got\n    #     %s' % fibonacci(1)
assert fibonacci(2) == 1, '>>> fibonacci(2)\n    # Error: expected\n    #     1\n    # but got\n    #     %s' % fibonacci(2)
assert fibonacci(3) == 2, '>>> fibonacci(3)\n    # Error: expected\n    #     2\n    # but got\n    #     %s' % fibonacci(3)
assert fibonacci(4) == 3, '>>> fibonacci(4)\n    # Error: expected\n    #     3\n    # but got\n    #     %s' % fibonacci(4)
assert fibonacci(5) == 5, '>>> fibonacci(5)\n    # Error: expected\n    #     5\n    # but got\n    #     %s' % fibonacci(5)
assert fibonacci(6) == 8, '>>> fibonacci(6)\n    # Error: expected\n    #     8\n    # but got\n    #     %s' % fibonacci(6)
assert fibonacci(7) == 13, '>>> fibonacci(7)\n    # Error: expected\n    #     13\n    # but got\n    #     %s' % fibonacci(7)