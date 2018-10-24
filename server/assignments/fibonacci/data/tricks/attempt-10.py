n = int(input())
fib_list = [0, 1]
  
if n == 0:
  print(fib_list[0])
elif n == 1:
  print(fib_list[1])
else:  
  for i in range(n-1):
    temp = fib_list[0] + fib_list[1]
    fib_list[0] = fib_list[1]
    fib_list[1] = temp 
  print(fib_list[0])