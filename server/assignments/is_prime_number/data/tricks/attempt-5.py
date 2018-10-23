n = int(input())
i = 1
primo = True

while n > i :
  if n % i == 0:
    primo = False
  i += 1

if n == 1:
  print(False)
else:
  print(primo)
