import requests
from bs4 import BeautifulSoup
import os
import urllib.request

# Base URL of the site
base_url = "https://infinitediscs.com/"

response = requests.get(base_url)

soup = BeautifulSoup(response.text, 'html.parser')

# Get all image tags
img_tags = soup.find_all('img')

# Filter out the URLs of specific disc images (This may vary based on the site's structure)
urls = [img['src'] for img in img_tags if "disc_images" in img['src']]

# Create a directory to store the images
if not os.path.exists('disc_images'):
    os.makedirs('disc_images')

# Loop over each URL and save each image
for url in urls:
    response = requests.get(url)
    with open('disc_images/' + url.split('/')[-1], 'wb') as f:
        f.write(response.content)
