n = int(input())

if n == 1:
  print(True)
else:
  primo = True
  
  for i in range(2, n):
    if n % i == 0:
      primo = False
  print(primo)