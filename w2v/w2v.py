xmax = int(input("xmax = ")); xmin = int(input("xmin = "));
ymax = int(input("ymax = ")); ymin = int(input("ymin = "));

umax = int(input("umax = ")); umin = int(input("umin = "));
vmax = int(input("vmax = ")); vmin = int(input("vmin = "));

x = int(input("x = "))
y = int(input("y = "))

u = ((x - xmin) * ((umax - umin)/(xmax - xmin))) + umin
v = ((y - ymin) * ((vmax - vmin)/(ymax - ymin))) + vmin

print("u = ", u)
print("v = ", v)