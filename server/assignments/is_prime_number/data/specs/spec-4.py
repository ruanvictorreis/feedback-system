n = int(input())
primo = True

for i in range(2, n):
  if n % i == 0:
    primo = False
print(primo and n != 1)
