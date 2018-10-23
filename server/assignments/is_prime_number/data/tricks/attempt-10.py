n = int(input())

if n == 1:
  print(False)
else:
  primo = False
  
  for i in range(2, n):
    if n % i == 0:
      primo = True
  print(primo)
