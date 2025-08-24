import qrcode

# The URL or data you want to encode
data = "https://phanquykhang.github.io/The-letter"

# Generate the QR code image
img = qrcode.make(data)

# Save the image to a file (e.g., in the same folder as the script)
img.save("./product/qr.png")

print("QR code has been generated and saved as qr.png")