def repeated(f, n):
  """YOUR CODE HERE"""

def compose1(f, g):
  def h(x):
    return f(g(x))
  return h

def square(x):
  return x * x

def tripple(x):
  return 3 * x

def identity(x):
  return x

def increment(x):
  return x + 1

def add(a, b):
  return a + b

def mul(a, b):
  return a * b
