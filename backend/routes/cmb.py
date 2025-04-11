import os

with open("all.txt", "w") as f:
    for filename in os.listdir("."):
        if os.path.isfile(filename):
            with open(filename, "r") as file:
                f.write(file.read() + "\n")
