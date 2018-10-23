n = int(input())
primo = True

if n == 1:
  primo = False

for i in range(2, n):
  if n % i == 0:
    primo = False
print(primo) 
